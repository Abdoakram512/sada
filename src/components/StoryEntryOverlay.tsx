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
      className="mx-auto max-w-2xl mb-5 bg-white/95 rounded-2xl border border-sada-violet/20 px-4 py-2.5 shadow-sm flex flex-wrap items-center justify-center sm:justify-between gap-2.5 min-h-[48px]"
    >
      <div className="flex items-center gap-2 text-right">
        <Sparkles size={15} className="text-sada-violet flex-shrink-0" />
        <span className="text-xs font-bold text-sada-ink/85">
          {mode === 'pending'
            ? 'اختر وضع الرحلة: القصة بالصوت والترجمة أو التصفح الحر'
            : mode === 'story'
            ? 'وضع القصة مفعّل مع تفاعل الشخصيات والترجمة المتزامنة'
            : 'وضع التصفح الحر مفعّل — يمكنك تفعيل القصة في أي وقت'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => storyAudioController.chooseEntryMode('story')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition-colors ${
            mode === 'story'
              ? 'bg-sada-teal text-white shadow-sm'
              : 'bg-sada-violet hover:bg-sada-violet-dark text-white shadow-sm'
          }`}
        >
          <Volume2 size={14} />
          <span>ابدأ الرحلة بالصوت</span>
        </button>

        <button
          type="button"
          onClick={() => storyAudioController.chooseEntryMode('free')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-colors ${
            mode === 'free'
              ? 'bg-sada-ink text-white border-sada-ink'
              : 'bg-sada-surface hover:bg-sada-lavender/40 text-sada-ink border-sada-violet/20'
          }`}
        >
          <Compass size={14} />
          <span>تصفح بدون صوت</span>
        </button>
      </div>
    </div>
  );
};
