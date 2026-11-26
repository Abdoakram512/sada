import React from 'react';
import { Volume2, Compass, Sparkles } from 'lucide-react';
import { storyAudioController } from '../utils/storyAudioController';
import { useStoryAudio } from '../hooks/useStoryAudio';

// Non-blocking inline choice pill inside Hero with constant height (prevents CLS)
export const StoryEntryOverlay: React.FC = () => {
  const { mode } = useStoryAudio();

  return (
    <div
      role="region"
      aria-label="اختيار وضع تجربة صدى"
      className="mx-auto w-full max-w-2xl mb-2.5 sm:mb-3.5 bg-white/95 rounded-2xl border border-sada-violet/20 px-3.5 py-2 shadow-sm flex flex-wrap items-center justify-center sm:justify-between gap-2 min-h-[48px]"
    >
      <div className="flex items-center gap-1.5 text-right">
        <Sparkles size={14} className="text-sada-violet flex-shrink-0" />
        <span className="text-[11px] sm:text-xs font-bold text-sada-ink/85">
          {mode === 'pending'
            ? 'اختر وضع الرحلة: بالصوت أو تصفح حر'
            : mode === 'story'
            ? 'وضع القصة مفعّل مع الترجمة المتزامنة'
            : 'وضع التصفح الحر مفعّل'}
        </span>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
        <button
          type="button"
          onClick={() => storyAudioController.chooseEntryMode('story')}
          className={`flex-1 sm:flex-initial min-h-[44px] sm:min-h-[34px] flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition-colors active:scale-95 ${
            mode === 'story'
              ? 'bg-sada-teal text-white shadow-sm'
              : 'bg-sada-violet hover:bg-sada-violet-dark text-white shadow-sm'
          }`}
        >
          <Volume2 size={15} />
          <span>ابدأ الرحلة بالصوت</span>
        </button>

        <button
          type="button"
          onClick={() => storyAudioController.chooseEntryMode('free')}
          className={`flex-1 sm:flex-initial min-h-[44px] sm:min-h-[34px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-colors active:scale-95 ${
            mode === 'free'
              ? 'bg-sada-ink text-white border-sada-ink'
              : 'bg-sada-surface hover:bg-sada-lavender/40 text-sada-ink border-sada-violet/20'
          }`}
        >
          <Compass size={15} />
          <span>تصفح بدون صوت</span>
        </button>
      </div>
    </div>
  );
};
