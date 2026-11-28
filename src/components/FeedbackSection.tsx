import React, { useState } from 'react';
import {
  MessageSquareHeart,
  Star,
  Send,
  ExternalLink,
  FileText,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { FEEDBACK_CONFIG } from '../data/feedbackConfig';

export const FeedbackSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quick' | 'googleForm'>('quick');
  const [rating, setRating] = useState<number>(5);
  const [name, setName] = useState('');
  const [role, setRole] = useState('زائر مهتم');
  const [message, setMessage] = useState('');
  const [customFormUrl, setCustomFormUrl] = useState(FEEDBACK_CONFIG.googleFormUrl);

  const roles = ['ولي أمر', 'أخصائي تخاطب', 'مهتم بالتقنية', 'زائر'];

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const starString = '⭐'.repeat(rating);
    const text = [
      'السلام عليكم يا بشمهندس، حابب أشارك رأيي في تجربة صَـدَى:',
      `• الاسم: ${name.trim() || 'فاعل خير'}`,
      `• الصفة: ${role}`,
      `• التقييم: ${starString} (${rating}/5)`,
      message.trim() ? `• الملاحظات والإنطباع:\n${message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/${FEEDBACK_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const activeGoogleUrl = customFormUrl || FEEDBACK_CONFIG.googleFormUrl;

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
        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          <p className="text-xs sm:text-sm text-sada-ink/75 font-medium leading-relaxed">
            ملاحظاتك وانطباعك يصلان مباشرة لفريق التطوير لتحسين تجربة الأطفال الصم وضعاف السمع.
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
              <span>يتم إرسال الرأي مباشرة لفريق تطوير صدى</span>
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-sada-teal hover:bg-sada-teal-dark text-white text-xs sm:text-sm font-black shadow-md transition-all hover:shadow-lg active:scale-95"
            >
              <Send size={15} />
              <span>إرسال الرأي لفريق التطوير</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Embedded Google Form */}
      {activeTab === 'googleForm' && (
        <div className="space-y-4">
          {activeGoogleUrl ? (
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

              {/* Embedded Iframe */}
              <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-sada-ink/10 shadow-inner bg-sada-surface">
                <iframe
                  src={activeGoogleUrl}
                  title="استمارة تقييم تجربة صدى"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="w-full h-full"
                >
                  جارٍ تحميل الاستمارة...
                </iframe>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-2xl bg-sada-lavender/30 border border-sada-violet/20 text-sada-ink space-y-3">
              <div className="flex items-center gap-2 text-sada-violet font-black text-sm">
                <FileText size={18} />
                <span>ربط استمارة Google Form بحسابك الشخصي</span>
              </div>

              <p className="text-xs sm:text-sm text-sada-ink/80 leading-relaxed font-medium">
                لربط استمارتك الخاصة من حساب Google الخاص بك في دقيقة واحدة:
              </p>

              <ol className="text-xs text-sada-ink/85 space-y-1.5 list-decimal list-inside pr-1 font-semibold">
                <li>
                  افتح{' '}
                  <a
                    href="https://forms.new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sada-violet underline font-black"
                  >
                    forms.new
                  </a>{' '}
                  على حساب Google الخاص بك.
                </li>
                <li>اكتب عنواناً بسيطاً: «استمارة تقييم تجربة تطبيق صدى».</li>
                <li>
                  أضف الأسئلة: (الاسم، صفتك، تقييمك للتطبيق، رأيك وملاحظاتك).
                </li>
                <li>اضغط إرسال (Send) &gt; تبويب الرابط أو التضمين (`&lt; &gt;`) وانسخ الرابط.</li>
              </ol>

              {/* Live URL Input for immediate preview */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-sada-ink mb-1">
                  ضع رابط الـ Google Form الخاص بك هنا للمعاينة الفورية:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customFormUrl}
                    onChange={(e) => setCustomFormUrl(e.target.value)}
                    placeholder="https://docs.google.com/forms/d/e/.../viewform"
                    className="flex-1 px-3 py-2 rounded-xl border border-sada-ink/20 text-xs focus:border-sada-violet focus:outline-none bg-white dir-ltr text-left"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customFormUrl.trim()) {
                        setActiveTab('googleForm');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-sada-violet text-white text-xs font-bold shadow-xs hover:bg-sada-violet-dark"
                  >
                    تطبيق
                  </button>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <a
                  href="https://forms.new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-sada-violet/30 text-sada-violet text-xs font-bold hover:bg-sada-violet/5"
                >
                  <ExternalLink size={13} />
                  <span>إنشاء استمارة جديدة على حسابك (forms.new)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveTab('quick')}
                  className="text-xs text-sada-ink/70 hover:text-sada-ink underline"
                >
                  أو استخدم الرأي المباشر
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
