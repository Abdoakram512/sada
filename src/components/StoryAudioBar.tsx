import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Subtitles,
  SkipForward,
  Mic,
  BookOpen,
  Compass,
} from 'lucide-react';
import { STORY_SCENES, CHARACTER_VOICE_PROFILES } from '../data/storyManifest';
import { storyAudioController } from '../utils/storyAudioController';
import { useStoryAudio } from '../hooks/useStoryAudio';

interface StoryAudioBarProps {
  onOpenAuditions: () => void;
}

export const StoryAudioBar: React.FC<StoryAudioBarProps> = ({ onOpenAuditions }) => {
  const state = useStoryAudio();
  const [showVolume, setShowVolume] = useState(false);

  if (state.mode === 'pending') return null;

  const scene = STORY_SCENES.find((s) => s.id === state.activeSceneId) || STORY_SCENES[0];
  const sceneIdx = STORY_SCENES.findIndex((s) => s.id === scene.id);
  const activeDlg = state.activeDialogue;
  const speakerProfile = activeDlg ? CHARACTER_VOICE_PROFILES[activeDlg.speakerId] : null;
  const showSubtitlePill =
    state.subtitlesEnabled &&
    activeDlg &&
    (state.mode === 'story' || state.status === 'playing' || state.status === 'paused');

  return (
    <aside
      aria-label="وحدة التحكم في القصة والصوت"
      className="fixed bottom-0 pb-safe inset-x-0 px-2.5 sm:px-0 sm:inset-x-auto sm:bottom-4 sm:pb-0 sm:left-1/2 sm:-translate-x-1/2 z-40 flex flex-col items-center gap-1.5 sm:gap-2 max-w-3xl sm:w-[92vw] pointer-events-none transform-gpu"
    >
      {/* Live RTL Subtitle Pill */}
      {showSubtitlePill && activeDlg && speakerProfile && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto w-full bg-sada-ink/95 text-white rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 border border-white/15 shadow-xl flex items-start gap-2.5"
        >
          <img
            src={speakerProfile.avatarImage}
            alt={speakerProfile.name}
            className="hidden sm:block w-10 h-10 rounded-xl object-contain bg-white/10 p-0.5 flex-shrink-0"
          />
          <div className="flex-1 min-w-0 text-right">
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-0.5 sm:mb-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-black px-2 py-0.5 rounded-md text-white"
                  style={{ backgroundColor: speakerProfile.accentColor }}
                >
                  {speakerProfile.name}
                </span>
                <span className="text-[11px] text-white/70 font-semibold truncate max-w-[180px] sm:max-w-none">
                  {scene.title}
                </span>
              </div>
              {!state.audioAvailable && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sada-yellow/20 text-sada-yellow font-bold">
                  ترجمة نصية متزامنة
                </span>
              )}
            </div>
            <p className="text-[14px] sm:text-sm font-medium leading-relaxed text-white/95 line-clamp-3">
              {activeDlg.subtitleText}
            </p>
            {/* Subtle dialogue progress line */}
            <div className="w-full h-1 bg-white/15 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${Math.round(state.progressRatio * 100)}%`,
                  backgroundColor: speakerProfile.accentColor,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Touch-Friendly Floating Controller Dock (>= 44px touch targets) */}
      <div className="pointer-events-auto w-full sm:w-auto bg-white/95 rounded-full px-2 sm:px-4 py-1 border border-sada-violet/20 shadow-xl flex items-center justify-between gap-1 sm:gap-3">
        {/* Mode Pill */}
        <button
          type="button"
          onClick={() => storyAudioController.toggleStoryMode()}
          className={`min-h-[44px] sm:min-h-[34px] flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-colors active:scale-95 ${
            state.mode === 'story'
              ? 'bg-sada-violet text-white'
              : 'bg-sada-lavender/60 text-sada-violet hover:bg-sada-lavender'
          }`}
          title={state.mode === 'story' ? 'التبديل إلى التصفح الحر' : 'تفعيل وضع القصة'}
        >
          {state.mode === 'story' ? <BookOpen size={14} /> : <Compass size={14} />}
          <span className="sm:hidden">{state.mode === 'story' ? 'القصة' : 'حر'}</span>
          <span className="hidden sm:inline">{state.mode === 'story' ? 'وضع القصة' : 'استكشاف حر'}</span>
        </button>

        {/* Playback Controls (>= 44px mobile touch targets) */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={() => storyAudioController.togglePlayPause()}
            aria-label={state.status === 'playing' ? 'إيقاف مؤقت' : 'تشغيل المشهد'}
            className="w-10 h-11 min-[390px]:w-11 sm:w-9 sm:h-9 rounded-full bg-sada-teal text-white flex items-center justify-center hover:bg-sada-teal-dark transition-colors shadow-sm active:scale-95"
          >
            {state.status === 'playing' ? <Pause size={17} /> : <Play size={17} />}
          </button>

          <button
            type="button"
            onClick={() => storyAudioController.replayCurrentScene()}
            aria-label="إعادة تشغيل المشهد الحالي"
            title="إعادة المشهد"
            className="w-9 h-11 min-[390px]:w-11 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sada-ink/75 hover:bg-sada-lavender/50 hover:text-sada-violet transition-colors active:scale-95"
          >
            <RotateCcw size={16} />
          </button>

          <button
            type="button"
            onClick={() => storyAudioController.goToNextScene()}
            disabled={sceneIdx >= STORY_SCENES.length - 1}
            aria-label="الانتقال للمشهد التالي"
            title="المشهد التالي"
            className="w-9 h-11 min-[390px]:w-11 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sada-ink/75 hover:bg-sada-lavender/50 hover:text-sada-violet disabled:opacity-35 transition-colors active:scale-95"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Progress Counter */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sada-surface border border-sada-violet/10 text-[11px] font-bold text-sada-ink/80">
          <span>
            المشهد {sceneIdx + 1} / {STORY_SCENES.length}
          </span>
        </div>

        {/* Subtitles, Mute, Volume, Auditions */}
        <div className="flex items-center gap-0.5 sm:gap-1 relative">
          <button
            type="button"
            onClick={() => storyAudioController.toggleSubtitles()}
            aria-label={state.subtitlesEnabled ? 'إخفاء الترجمة النصية' : 'إظهار الترجمة النصية'}
            aria-pressed={state.subtitlesEnabled}
            title="الترجمة النصية"
            className={`w-9 h-11 min-[390px]:w-11 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors active:scale-95 ${
              state.subtitlesEnabled
                ? 'bg-sada-lavender text-sada-violet'
                : 'text-sada-ink/50 hover:bg-gray-100'
            }`}
          >
            <Subtitles size={16} />
          </button>

          <button
            type="button"
            onClick={() => storyAudioController.toggleMute()}
            aria-label={state.isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
            className={`w-9 h-11 min-[390px]:w-11 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors active:scale-95 ${
              state.isMuted
                ? 'bg-rose-100 text-rose-600'
                : 'text-sada-ink/75 hover:bg-sada-lavender/50 hover:text-sada-violet'
            }`}
          >
            {state.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setShowVolume((v) => !v)}
            aria-label="مستوى الصوت"
            className="min-w-[40px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center text-[11px] font-bold px-1.5 sm:px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sada-ink/80 active:scale-95"
          >
            {Math.round(state.volume * 100)}%
          </button>

          {showVolume && (
            <div className="absolute bottom-14 left-0 bg-white p-3.5 rounded-2xl shadow-xl border border-sada-violet/15 flex items-center gap-2.5 z-50">
              <label htmlFor="sada-vol-slider" className="text-xs font-bold text-sada-ink whitespace-nowrap">
                مستوى الصوت
              </label>
              <input
                id="sada-vol-slider"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={state.volume}
                onChange={(e) => storyAudioController.setVolume(parseFloat(e.target.value))}
                className="w-28 h-6 accent-sada-violet"
              />
            </div>
          )}

          {import.meta.env.DEV && (
            <button
              type="button"
              onClick={onOpenAuditions}
              className="flex items-center gap-1 px-2.5 py-1.5 min-h-[40px] sm:min-h-0 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
              title="معاينة أصوات الشخصيات الخمس"
            >
              <Mic size={14} />
              <span className="hidden sm:inline">أصوات الشخصيات</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
