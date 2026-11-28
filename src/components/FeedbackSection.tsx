import React from 'react';
import {
  MessageSquareHeart,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { FEEDBACK_CONFIG } from '../data/feedbackConfig';

export const FeedbackSection: React.FC = () => {
  const activeGoogleUrl = FEEDBACK_CONFIG.googleFormUrl;

  return (
    <div
      id="feedback"
      className="mt-10 sm:mt-14 max-w-2xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-sada-violet/20 shadow-xl text-right relative overflow-hidden"
    >
      {/* Decorative top ambient bar */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sada-violet via-sada-teal to-sada-yellow"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-sada-ink/5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-sada-violet/10 text-sada-violet flex items-center justify-center flex-shrink-0 shadow-xs">
            <MessageSquareHeart size={22} />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sada-violet mb-0.5">
              <Sparkles size={13} className="text-sada-yellow" />
              <span>رأيكم يهمنا ويدعمنا</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-sada-ink">
              شاركنا رأيك في تجربة صَـدَى
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-sada-teal-dark">استمارة تقييم Google Form مدمجة:</span>
            <a
              href={activeGoogleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sada-violet font-bold hover:underline"
            >
              <ExternalLink size={13} />
              <span>فتح في نافذة كاملة</span>
            </a>
          </div>

          <p className="text-xs text-sada-ink/75 leading-relaxed">
            الإرسال والحفظ يتمان داخل Google Forms. إذا تعذر تحميل الاستمارة، افتحها في نافذة كاملة.
          </p>
          {/* Embedded Iframe */}
          <div className="w-full h-[650px] sm:h-[720px] rounded-2xl overflow-hidden border border-sada-ink/10 shadow-inner bg-sada-surface">
            <iframe
              src={`${activeGoogleUrl}?embedded=true`}
              loading="lazy"
              referrerPolicy="no-referrer"
              title="استمارة تقييم تجربة صدى"
              width="100%"
              height="100%"
              className="w-full h-full"
            >
              جارٍ تحميل الاستمارة...
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
