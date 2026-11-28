import React, { useState } from 'react';
import {
  MessageSquareHeart,
  Star,
  Send,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { FEEDBACK_CONFIG } from '../data/feedbackConfig';

export const FeedbackSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quick' | 'googleForm'>('quick');
  const [rating, setRating] = useState<number>(5);
  const [name, setName] = useState('');
  const [role, setRole] = useState('زائر');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const roles = ['ولي أمر', 'أخصائي تخاطب', 'مهتم بالتقنية', 'زائر'];
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

        {/* Tab Switcher */}
        <div className="inline-flex p-1 rounded-2xl bg-sada-ink/5 w-full sm:w-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'quick'
                ? 'bg-white text-sada-ink shadow-xs font-black'
                : 'text-sada-ink/65 hover:text-sada-ink'
            }`}
          >
            كتابة الرأي
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('googleForm')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'googleForm'
                ? 'bg-white text-sada-violet shadow-xs font-black'
                : 'text-sada-ink/65 hover:text-sada-ink'
            }`}
          >
            Google Form 📝
          </button>
        </div>
      </div>

      {/* TAB 1: Quick Interactive Feedback */}
      {activeTab === 'quick' && (
        <form
          action={FEEDBACK_CONFIG.submitUrl}
          method="post"
          target="_blank"
          rel="noopener noreferrer"
          onSubmit={() => setSubmitted(true)}
          className="space-y-4"
        >
          <input type="hidden" name={FEEDBACK_CONFIG.fields.rating} value={rating} />
          <p className="text-xs sm:text-sm text-sada-ink/75 font-medium leading-relaxed">
            تُحفظ ملاحظاتك في Google Forms لدى فريق صدى. لا تكتب بيانات طفل أو معلومات صحية أو بيانات اتصال خاصة.
          </p>

          {/* Rating Stars */}
          <div>
            <label className="block text-xs font-bold text-sada-ink mb-1.5">
              تقييمك الإجمالي لتجربة صدى:
            </label>
            <div className="flex items-center gap-1.5" dir="ltr">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-sada-yellow hover:scale-110 transition-transform focus:outline-none"
                  aria-label={`${star} من 5 نجوم`}
                  aria-pressed={star === rating}
                >
                  <Star
                    size={26}
                    className={
                      star <= rating ? 'fill-sada-yellow stroke-sada-yellow' : 'stroke-sada-ink/25'
                    }
                  />
                </button>
              ))}
              <span className="text-xs font-black text-sada-ink/75 mr-2">
                {rating === 5
                  ? 'ممتاز جداً 🌟'
                  : rating === 4
                  ? 'جيد جداً 👍'
                  : rating === 3
                  ? 'جيد'
                  : 'يحتاج تحسين'}
              </span>
            </div>
          </div>

          {/* Name & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="feedback-name" className="block text-xs font-bold text-sada-ink mb-1">
                الاسم (اختياري):
              </label>
              <input
                id="feedback-name"
                name={FEEDBACK_CONFIG.fields.name}
                maxLength={100}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك الكريم"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sada-ink/15 text-xs sm:text-sm focus:border-sada-violet focus:outline-none bg-sada-surface"
              />
            </div>

            <div>
              <label htmlFor="feedback-role" className="block text-xs font-bold text-sada-ink mb-1">
                صفتك:
              </label>
              <select
                id="feedback-role"
                name={FEEDBACK_CONFIG.fields.role}
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sada-ink/15 text-xs sm:text-sm focus:border-sada-violet focus:outline-none bg-sada-surface"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Feedback Message */}
          <div>
            <label htmlFor="feedback-message" className="block text-xs font-bold text-sada-ink mb-1">
              رأيك واقتراحاتك لتطوير التطبيق:
            </label>
            <textarea
              id="feedback-message"
              name={FEEDBACK_CONFIG.fields.message}
              required
              maxLength={3000}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="شاركنا رأيك في التصميم، القصة التفاعلية، أصوات لينج، أو أي فكرة تود إضافتها..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-sada-ink/15 text-xs sm:text-sm focus:border-sada-violet focus:outline-none bg-sada-surface leading-relaxed resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-sada-ink/60 flex items-center gap-1 font-medium">
              <CheckCircle2 size={13} className="text-sada-teal" />
              <span>تأكد من ظهور «لقد تم تسجيل ردك» في نافذة Google</span>
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-sada-teal hover:bg-sada-teal-dark text-white text-xs sm:text-sm font-black shadow-md transition-all hover:shadow-lg active:scale-95"
            >
              <Send size={15} />
              <span>إرسال الرأي عبر Google Forms</span>
            </button>
          </div>
          {submitted && (
            <p role="status" className="text-xs text-sada-ink/75 leading-relaxed">
              تم فتح نافذة Google لإتمام الإرسال. لا يُعد الرأي محفوظًا إلا بعد ظهور رسالة «لقد تم تسجيل ردك» هناك.
              إذا لم تظهر النافذة، استخدم تبويب Google Form لإرسال رأيك. بياناتك ما زالت هنا لتتمكن من المحاولة مجددًا.
            </p>
          )}
        </form>
      )}

      {/* TAB 2: Embedded Google Form */}
      {activeTab === 'googleForm' && (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
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
            <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-sada-ink/10 shadow-inner bg-sada-surface">
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
      )}
    </div>
  );
};
