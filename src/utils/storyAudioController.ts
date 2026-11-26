import { STORY_SCENES, type CharacterId, type DialogueLine, type StoryScene } from '../data/storyManifest';
import { soundEngine } from './audioEngine';

export type StoryMode = 'pending' | 'story' | 'free';
export type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'ended' | 'awaiting-audio';

export interface StoryAudioState {
  mode: StoryMode;
  activeSceneId: string;
  activeDialogueIndex: number;
  activeDialogue: DialogueLine | null;
  activeSpeakerId: CharacterId | null;
  status: PlaybackStatus;
  isMuted: boolean;
  volume: number;
  subtitlesEnabled: boolean;
  progressRatio: number;
  audioAvailable: boolean;
  completedScenes: string[];
}

type Listener = (state: StoryAudioState) => void;

const PREF_KEY = 'sada_story_prefs_v1';

class StoryAudioController {
  private state: StoryAudioState;
  private listeners = new Set<Listener>();
  private audioEl: HTMLAudioElement | null = null;
  private preloadCache = new Map<string, HTMLAudioElement>();
  private sceneDebounceTimer: number | null = null;
  private fallbackTimer: number | null = null;
  private fallbackTickTimer: number | null = null;
  private fallbackStartMs = 0;
  private fallbackPausedElapsedMs = 0;
  private audioFileCache = new Map<string, boolean>();
  private pendingSceneActivationId: string | null = null;

  constructor() {
    let savedVolume = 0.85;
    let savedSubtitles = true;
    try {
      const raw = localStorage.getItem(PREF_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { volume?: number; subtitlesEnabled?: boolean };
        if (typeof parsed.volume === 'number') savedVolume = Math.min(1, Math.max(0, parsed.volume));
        if (typeof parsed.subtitlesEnabled === 'boolean') savedSubtitles = parsed.subtitlesEnabled;
      }
    } catch {}

    this.state = {
      mode: 'pending',
      activeSceneId: STORY_SCENES[0].id,
      activeDialogueIndex: 0,
      activeDialogue: STORY_SCENES[0].dialogue[0] ?? null,
      activeSpeakerId: null,
      status: 'idle',
      isMuted: false,
      volume: savedVolume,
      subtitlesEnabled: savedSubtitles,
      progressRatio: 0,
      audioAvailable: false,
      completedScenes: [],
    };

    if (typeof window !== 'undefined') {
      this.audioEl = new Audio();
      this.audioEl.preload = 'auto';
      this.audioEl.volume = savedVolume;

      this.audioEl.addEventListener('timeupdate', () => {
        if (!this.audioEl || !this.audioEl.duration || Number.isNaN(this.audioEl.duration)) return;
        const ratio = Math.min(1, Math.max(0, this.audioEl.currentTime / this.audioEl.duration));
        this.patchState({ progressRatio: ratio });
      });

      this.audioEl.addEventListener('ended', () => {
        this.advanceDialogueQueue();
      });

      this.audioEl.addEventListener('error', () => {
        // Audio asset not generated yet or missing -> fall back cleanly to timed subtitle cadence
        const dlg = this.state.activeDialogue;
        if (dlg && this.state.status === 'playing') {
          this.audioFileCache.set(dlg.audioPath, false);
          this.startTimedSubtitleFallback(dlg);
        }
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden && this.state.status === 'playing') {
          this.pause();
        }
      });
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): StoryAudioState {
    return this.state;
  }

  private emit(): void {
    this.listeners.forEach((fn) => fn(this.state));
  }

  private patchState(partial: Partial<StoryAudioState>): void {
    this.state = { ...this.state, ...partial };
    this.emit();
  }

  private savePreferences(): void {
    try {
      localStorage.setItem(
        PREF_KEY,
        JSON.stringify({
          volume: this.state.volume,
          subtitlesEnabled: this.state.subtitlesEnabled,
        })
      );
    } catch {}
  }

  public chooseEntryMode(mode: 'story' | 'free'): void {
    if (mode === 'story') {
      this.patchState({ mode: 'story', isMuted: false });
      soundEngine.setMuted(false);
      this.playScene(this.state.activeSceneId, true);
    } else {
      this.stopCurrentPlayback();
      this.patchState({
        mode: 'free',
        status: 'idle',
        activeSpeakerId: null,
        progressRatio: 0,
      });
    }
  }

  public toggleStoryMode(): void {
    if (this.state.mode === 'story') {
      this.stopCurrentPlayback();
      this.patchState({
        mode: 'free',
        status: 'idle',
        activeSpeakerId: null,
        progressRatio: 0,
      });
    } else {
      this.patchState({ mode: 'story', isMuted: false });
      soundEngine.setMuted(false);
      this.playScene(this.state.activeSceneId, true);
    }
  }

  // Called by ScrollSpy/ScrollTrigger when user enters a scene
  public notifySceneInView(sceneId: string): void {
    if (sceneId === this.pendingSceneActivationId && this.sceneDebounceTimer !== null) {
      return;
    }

    if (this.sceneDebounceTimer !== null) {
      window.clearTimeout(this.sceneDebounceTimer);
      this.sceneDebounceTimer = null;
    }

    // Immediate clean stop if leaving the currently playing scene
    if (sceneId !== this.state.activeSceneId && this.state.status === 'playing') {
      this.stopCurrentPlayback();
      this.patchState({
        status: 'idle',
        activeSpeakerId: null,
        progressRatio: 0,
      });
    }

    const scene = STORY_SCENES.find((s) => s.id === sceneId);
    if (!scene) return;

    this.pendingSceneActivationId = sceneId;

    // 450ms stability threshold: prevents triggering clips during rapid scrolling
    this.sceneDebounceTimer = window.setTimeout(() => {
      this.sceneDebounceTimer = null;
      this.pendingSceneActivationId = null;

      const firstDialogue = scene.dialogue[0] ?? null;
      const alreadyCompleted = this.state.completedScenes.includes(sceneId);

      this.patchState({
        activeSceneId: sceneId,
        activeDialogueIndex: 0,
        activeDialogue: firstDialogue,
      });

      this.preloadAroundScene(scene);

      if (this.state.mode === 'story' && !alreadyCompleted && !document.hidden) {
        this.playDialogueAt(sceneId, 0);
      }
    }, 450);
  }

  public playScene(sceneId: string, forceRestart: boolean = true): void {
    const scene = STORY_SCENES.find((s) => s.id === sceneId);
    if (!scene || scene.dialogue.length === 0) return;

    if (forceRestart) {
      this.playDialogueAt(sceneId, 0);
    } else {
      this.playDialogueAt(sceneId, this.state.activeDialogueIndex);
    }
  }

  public replayCurrentScene(): void {
    if (this.state.mode === 'pending') {
      this.patchState({ mode: 'story' });
    }
    this.playScene(this.state.activeSceneId, true);
  }

  public togglePlayPause(): void {
    if (this.state.mode === 'pending') {
      this.chooseEntryMode('story');
      return;
    }

    if (this.state.status === 'playing') {
      this.pause();
    } else if (this.state.status === 'paused') {
      this.resume();
    } else {
      if (this.state.mode === 'free') {
        this.patchState({ mode: 'story' });
      }
      this.playScene(this.state.activeSceneId, true);
    }
  }

  public pause(): void {
    if (this.audioEl && !this.audioEl.paused) {
      this.audioEl.pause();
    }
    if (this.fallbackTimer !== null) {
      window.clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
      this.fallbackPausedElapsedMs += performance.now() - this.fallbackStartMs;
    }
    if (this.fallbackTickTimer !== null) {
      window.clearInterval(this.fallbackTickTimer);
      this.fallbackTickTimer = null;
    }
    soundEngine.setAmbientDucked(false);
    this.patchState({ status: 'paused' });
  }

  public resume(): void {
    const dlg = this.state.activeDialogue;
    if (!dlg) return;

    if (this.state.audioAvailable && this.audioEl && this.audioEl.src) {
      soundEngine.setAmbientDucked(true);
      this.audioEl.muted = this.state.isMuted;
      this.audioEl.volume = this.state.volume;
      void this.audioEl.play().catch(() => {
        this.startTimedSubtitleFallback(dlg, this.fallbackPausedElapsedMs);
      });
      this.patchState({ status: 'playing', activeSpeakerId: dlg.speakerId });
    } else {
      this.startTimedSubtitleFallback(dlg, this.fallbackPausedElapsedMs);
    }
  }

  public toggleMute(): void {
    const nextMuted = !this.state.isMuted;
    soundEngine.setMuted(nextMuted);
    if (this.audioEl) {
      this.audioEl.muted = nextMuted;
    }
    this.patchState({ isMuted: nextMuted });
  }

  public setVolume(vol: number): void {
    const clamped = Math.min(1, Math.max(0, vol));
    if (this.audioEl) {
      this.audioEl.volume = clamped;
    }
    this.patchState({ volume: clamped });
    this.savePreferences();
  }

  public toggleSubtitles(): void {
    const next = !this.state.subtitlesEnabled;
    this.patchState({ subtitlesEnabled: next });
    this.savePreferences();
  }

  public goToNextScene(): void {
    const idx = STORY_SCENES.findIndex((s) => s.id === this.state.activeSceneId);
    const nextScene = STORY_SCENES[idx + 1];
    if (!nextScene) return;

    const el = document.getElementById(nextScene.anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.patchState({
      activeSceneId: nextScene.id,
      activeDialogueIndex: 0,
      activeDialogue: nextScene.dialogue[0] ?? null,
    });
    if (this.state.mode === 'story') {
      this.playDialogueAt(nextScene.id, 0);
    }
  }

  private async playDialogueAt(sceneId: string, index: number): Promise<void> {
    this.stopCurrentPlayback();

    const scene = STORY_SCENES.find((s) => s.id === sceneId);
    if (!scene) return;
    const dlg = scene.dialogue[index];
    if (!dlg) return;

    this.fallbackPausedElapsedMs = 0;

    this.patchState({
      activeSceneId: sceneId,
      activeDialogueIndex: index,
      activeDialogue: dlg,
      activeSpeakerId: dlg.speakerId,
      progressRatio: 0,
      status: 'playing',
    });

    soundEngine.setAmbientDucked(true);

    // Check if pre-generated MP3 exists before triggering <audio> load error
    const exists = await this.checkAudioExists(dlg.audioPath);
    // Abort if scene/line changed while checking
    if (this.state.activeDialogue?.id !== dlg.id || this.state.status !== 'playing') {
      return;
    }

    if (exists && this.audioEl) {
      this.patchState({ audioAvailable: true });
      this.audioEl.src = dlg.audioPath;
      this.audioEl.muted = this.state.isMuted;
      this.audioEl.volume = this.state.volume;
      try {
        await this.audioEl.play();
      } catch {
        this.startTimedSubtitleFallback(dlg);
      }
    } else {
      // No fabricated TTS — use clean timed visual subtitle & speaker highlight cadence
      this.patchState({ audioAvailable: false });
      this.startTimedSubtitleFallback(dlg);
    }
  }

  private async checkAudioExists(url: string): Promise<boolean> {
    if (this.audioFileCache.has(url)) {
      return this.audioFileCache.get(url) ?? false;
    }
    try {
      const res = await fetch(url, { method: 'HEAD' });
      const contentType = res.headers.get('content-type') || '';
      const ok = res.ok && !contentType.includes('text/html');
      this.audioFileCache.set(url, ok);
      return ok;
    } catch {
      this.audioFileCache.set(url, false);
      return false;
    }
  }

  private startTimedSubtitleFallback(dlg: DialogueLine, initialElapsedMs: number = 0): void {
    const totalMs = Math.max(2500, Math.round(dlg.estimatedDurationSec * 1000));
    const remainingMs = Math.max(200, totalMs - initialElapsedMs);

    this.fallbackStartMs = performance.now();
    this.fallbackPausedElapsedMs = initialElapsedMs;

    this.patchState({
      status: 'playing',
      activeSpeakerId: dlg.speakerId,
      audioAvailable: false,
    });

    this.fallbackTickTimer = window.setInterval(() => {
      const elapsed = this.fallbackPausedElapsedMs + (performance.now() - this.fallbackStartMs);
      const ratio = Math.min(1, elapsed / totalMs);
      this.patchState({ progressRatio: ratio });
    }, 250);

    this.fallbackTimer = window.setTimeout(() => {
      this.advanceDialogueQueue();
    }, remainingMs);
  }

  private advanceDialogueQueue(): void {
    this.stopCurrentPlayback();
    const scene = STORY_SCENES.find((s) => s.id === this.state.activeSceneId);
    if (!scene) return;

    const nextIdx = this.state.activeDialogueIndex + 1;
    if (nextIdx < scene.dialogue.length) {
      void this.playDialogueAt(scene.id, nextIdx);
    } else {
      const completed = this.state.completedScenes.includes(scene.id)
        ? this.state.completedScenes
        : [...this.state.completedScenes, scene.id];
      soundEngine.setAmbientDucked(false);
      this.patchState({
        status: 'ended',
        activeSpeakerId: null,
        progressRatio: 1,
        completedScenes: completed,
      });
    }
  }

  private stopCurrentPlayback(): void {
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
    }
    if (this.fallbackTimer !== null) {
      window.clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
    if (this.fallbackTickTimer !== null) {
      window.clearInterval(this.fallbackTickTimer);
      this.fallbackTickTimer = null;
    }
    soundEngine.setAmbientDucked(false);
  }

  // Preload only current and next scene's first audio clip (max 3 cached elements)
  private preloadAroundScene(scene: StoryScene): void {
    const candidates: string[] = [];
    if (scene.dialogue[0]) candidates.push(scene.dialogue[0].audioPath);
    const nextScene = STORY_SCENES.find((s) => s.order === scene.order + 1);
    if (nextScene?.dialogue[0]) candidates.push(nextScene.dialogue[0].audioPath);

    candidates.forEach(async (url) => {
      if (this.preloadCache.has(url)) return;
      const ok = await this.checkAudioExists(url);
      if (!ok) return;
      if (this.preloadCache.size >= 3) {
        const firstKey = this.preloadCache.keys().next().value;
        if (firstKey) this.preloadCache.delete(firstKey);
      }
      const el = new Audio();
      el.preload = 'auto';
      el.src = url;
      this.preloadCache.set(url, el);
    });
  }
}

export const storyAudioController = new StoryAudioController();
