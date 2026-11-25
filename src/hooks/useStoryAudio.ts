import { useEffect, useState } from 'react';
import { storyAudioController, type StoryAudioState } from '../utils/storyAudioController';
import type { CharacterId } from '../data/storyManifest';

export function useStoryAudio(): StoryAudioState {
  const [state, setState] = useState<StoryAudioState>(() => storyAudioController.getState());

  useEffect(() => {
    return storyAudioController.subscribe(setState);
  }, []);

  return state;
}

// Lightweight selector hook for scene components: ignores high-frequency progressRatio ticks
export function useStorySceneFocus(sceneId: string): {
  isSceneActive: boolean;
  activeSpeakerId: CharacterId | null;
  mode: StoryAudioState['mode'];
  status: StoryAudioState['status'];
} {
  const [focus, setFocus] = useState(() => {
    const s = storyAudioController.getState();
    return {
      isSceneActive: s.activeSceneId === sceneId,
      activeSpeakerId: s.activeSceneId === sceneId ? s.activeSpeakerId : null,
      mode: s.mode,
      status: s.status,
    };
  });

  useEffect(() => {
    return storyAudioController.subscribe((s) => {
      const nextActive = s.activeSceneId === sceneId;
      const nextSpeaker = nextActive ? s.activeSpeakerId : null;
      setFocus((prev) => {
        if (
          prev.isSceneActive === nextActive &&
          prev.activeSpeakerId === nextSpeaker &&
          prev.mode === s.mode &&
          prev.status === s.status
        ) {
          return prev;
        }
        return {
          isSceneActive: nextActive,
          activeSpeakerId: nextSpeaker,
          mode: s.mode,
          status: s.status,
        };
      });
    });
  }, [sceneId]);

  return focus;
}
