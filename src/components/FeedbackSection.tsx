import React, { useState } from 'react';
import { MessageSquareHeart, Star, Send, Sparkles, ExternalLink } from 'lucide-react';
import { FEEDBACK_CONFIG } from '../data/feedbackConfig';

export const FeedbackSection: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const inputClass = 'w-full rounded-xl border border-sada-ink/15 bg-sada-surface px-3.5 py-3 text-sm text-sada-ink focus:border-sada-violet focus:outline-none focus:ring-2 focus:ring-sada-violet/20';

  return (
    <div id="feedback" className="mt-10 sm:mt-14 max-w-2xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-sada-violet/20 shadow-xl text-right relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sada-violet via-sada-teal to-sada-yellow" />
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-sada-ink/5">
        <div className="w-11 h-11 rounded-2xl bg-sada-violet/10 text-sada-violet flex items-center justify-center shrink-0">
          <MessageSquareHeart size={22} />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sada-violet mb-1">
            <Sparkles size={13} className="text-sada-yellow" />
            <span>رأيكم يهمنا ويدعمنا</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-sada-ink">شاركنا رأيك في تجربة صَـدَى</h3>
        </div>
      </div>

      <form action={FEEDBACK_CONFIG.submitUrl} method="post" target="_blank" rel="noopener noreferrer" onSubmit={() => setSubmitted(true)} className="space-y-5">
        <p className="text-xs sm:text-sm text-sada-ink/70 leading-relaxed">
          رأيك يساعدنا نطوّر تجربة صدى. لا تكتب بيانات طفل أو معلومات صحية أو بيانات اتصال خاصة.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="feedback-name" className="block text-sm font-bold text-sada-ink mb-2">الاسم <span className="text-sada-violet">(مطلوب)</span></label>
            <input id="feedback-name" name={FEEDBACK_CONFIG.fields.name} type="text" autoComplete="name" required maxLength={100} pattern=".*\S.*" title="اكتب اسمك؛ لا يمكن ترك الاسم فارغًا أو إدخال مسافات فقط." placeholder="اسمك الكريم" className={inputClass} />
          </div>
          <div>
            <label htmlFor="feedback-role" className="block text-sm font-bold text-sada-ink mb-2">صفتك</label>
            <select id="feedback-role" name={FEEDBACK_CONFIG.fields.role} required defaultValue="زائر" className={inputClass}>
              {['ولي أمر', 'أخصائي تخاطب', 'مهتم بالتقنية', 'زائر'].map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>
        </div>
        <fieldset>
          <legend className="text-sm font-bold text-sada-ink mb-2">تقييمك لتجربة صدى</legend>
          <div className="flex flex-wrap items-center gap-2" dir="ltr">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="relative cursor-pointer rounded-xl p-2 hover:bg-sada-yellow/10">
                <input type="radio" name={FEEDBACK_CONFIG.fields.rating} value={value} checked={rating === value} onChange={() => setRating(value)} required aria-label={`${value} من 5 نجوم`} className="peer sr-only" />
                <Star aria-hidden="true" size={28} className={`rounded-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-sada-violet ${value <= rating ? 'fill-sada-yellow stroke-sada-yellow' : 'stroke-sada-ink/25'}`} />
              </label>
            ))}
            <span className="text-sm font-bold text-sada-ink/70" aria-live="polite">{rating} / 5</span>
          </div>
        </fieldset>
        <div>
          <label htmlFor="feedback-message" className="block text-sm font-bold text-sada-ink mb-2">رأيك واقتراحاتك</label>
          <textarea id="feedback-message" name={FEEDBACK_CONFIG.fields.message} required maxLength={3000} rows={4} placeholder="شاركنا رأيك أو فكرة تساعدنا نطوّر صدى..." className={`${inputClass} resize-y`} />
        </div>
        <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sada-teal hover:bg-sada-teal-dark text-white text-sm font-black shadow-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sada-violet">
          <Send size={16} aria-hidden="true" />
          <span>إرسال رأيك</span>
        </button>
        <p className="text-xs text-sada-ink/60 leading-relaxed">تُحفظ الردود في Google Forms لدى فريق صدى. عند الإرسال تُفتح نافذة لتأكيد تسجيل ردك.</p>
        {submitted && (
          <p role="status" className="rounded-xl bg-sada-violet/5 p-3 text-sm text-sada-ink/80 leading-relaxed">
            تأكد من ظهور «لقد تم تسجيل ردك» في النافذة الجديدة. إذا لم تظهر، احتفظ بالنص وحاول مجددًا أو <a href={FEEDBACK_CONFIG.googleFormUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-sada-violet underline inline-flex items-center gap-1">افتح الاستمارة مباشرة <ExternalLink size={13} /></a>.
          </p>
        )}
      </form>
    </div>
  );
};
