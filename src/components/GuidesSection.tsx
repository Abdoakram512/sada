import React, { useState } from 'react';
import { Home, Stethoscope, CheckCircle, ShieldAlert, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';

export const GuidesSection: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<'parent' | 'specialist'>('parent');

  return (
    <section className="relative py-28 px-4 md:px-8 bg-sada-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-4">
            <Heart size={14} />
            <span>Guides & Collaboration · أدلة الاستخدام والقيمة المشتركة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-sada-ink leading-tight mb-4">
            تكامل مهني بين <span className="text-sada-teal">المنزل والعيادة التأهيلية</span>
          </h2>
          <p className="text-base sm:text-lg text-sada-ink/75 leading-relaxed font-medium">
            صُمم صدى ليضمن لغة مشتركة واضحة؛ بحيث تمارس الأسرة أنشطة المتابعة المنزلية بوعي، ويتابع الأخصائي البيانات بدقة سريرية منظمة.
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-2xl border border-sada-violet/15 flex items-center shadow-md gap-1">
            <button
              onClick={() => {
                soundEngine.playPop();
                setActiveGuide('parent');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm transition-all ${
                activeGuide === 'parent'
                  ? 'bg-sada-teal text-white shadow-md'
                  : 'text-sada-ink/70 hover:text-sada-ink'
              }`}
            >
              <Home size={18} />
              <span>دليل ولي الأمر (مشاركة منزلية واعية)</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playPop();
                setActiveGuide('specialist');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm transition-all ${
                activeGuide === 'specialist'
                  ? 'bg-sada-violet text-white shadow-md'
                  : 'text-sada-ink/70 hover:text-sada-ink'
              }`}
            >
              <Stethoscope size={18} />
              <span>دليل الأخصائي (متابعة منظمة ومهنية)</span>
            </button>
          </div>
        </div>

        {/* Guide Content Card */}
        <div className="bg-white rounded-[2.5rem] border-2 border-sada-violet/15 p-6 sm:p-12 shadow-xl">
          {activeGuide === 'parent' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-6 text-right">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sada-teal/15 text-sada-teal text-xs font-black">
                  <span>إرشادات للأسرة في البيئة المنزلية</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-sada-ink">
                  مشاركة منزلية واعية تدعم جلسات المركز
                </h3>
                <p className="text-base text-sada-ink/80 leading-relaxed font-medium">
                  المنزل هو المساحة الطبيعية التي يقضي فيها الطفل معظم وقته؛ لذا يوفر صدى لولي الأمر خطوات واضحة ومبسطة:
                </p>

                <div className="space-y-3.5">
                  {[
                    'إنشاء ملف الطفل واختيار التقييم المناسب لعمره السمعي.',
                    'اتباع طريقة تسجيل الاستجابات بدقة فور ملاحظة حركة الطفل.',
                    'تهيئة البيئة المنزلية الهادئة وتجنب المشتتات البصرية أو التلفاز أثناء الجلسة.',
                    'قراءة النتائج الدورية ومراجعة الأخصائي لمناقشة التطور دون قلق أو تخمين.'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-sada-surface border border-gray-100">
                      <CheckCircle size={18} className="text-sada-teal flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-sada-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border border-sada-teal/20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-sada-teal text-white flex items-center justify-center mb-4 shadow-md">
                  <Home size={32} />
                </div>
                <h4 className="text-xl font-black text-sada-ink mb-2">دور الأسرة المحوري</h4>
                <p className="text-xs sm:text-sm text-sada-ink/75 leading-relaxed font-medium mb-4">
                  «أنت لست فاحصاً طبياً، بل الشريك الأهم في تحفيز الطفل وخلق بيئة استماع يومية محبة ومشجعة.»
                </p>
                <span className="text-xs font-bold text-sada-teal px-3 py-1 rounded-full bg-white shadow-2xs">
                  دعم مستمر بدون إرهاق
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-6 text-right">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sada-violet/15 text-sada-violet text-xs font-black">
                  <span>أدوات سريرية وتنظيمية للأخصائي</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-sada-ink">
                  متابعة منظمة ومهنية تساند اتخاذ القرار التأهيلي
                </h3>
                <p className="text-base text-sada-ink/80 leading-relaxed font-medium">
                  يمنح صدى أخصائي السمع والتخاطب مرجعاً موثوقاً لتقييم كل مهارة بصورة مستقلة ومقارنة المنحنيات:
                </p>

                <div className="space-y-3.5">
                  {[
                    'مراجعة ملف الطفل الشامل وتاريخ التقييمات السابقة عبر جدول زمني.',
                    'قراءة استجابات لينج لكل صوت ومقارنة الترددات التي تحتاج إلى ضبط أو تدريب مكثف.',
                    'مراجعة أداء المهارات السمعية بصورة مستقلة دون اشتراط ترتيب موحد.',
                    'تحديد المهام الملائمة لقدرات الطفل ومتابعة التغير التراكمي بمرور الوقت.'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-sada-surface border border-gray-100">
                      <CheckCircle size={18} className="text-sada-violet flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-sada-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-white border border-sada-violet/20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-sada-violet text-white flex items-center justify-center mb-4 shadow-md">
                  <Stethoscope size={32} />
                </div>
                <h4 className="text-xl font-black text-sada-ink mb-2">الدقة العلمية والموضوعية</h4>
                <p className="text-xs sm:text-sm text-sada-ink/75 leading-relaxed font-medium mb-4">
                  «بيانات رقمية موثقة تدعم جلساتك وتمنحك رؤية واضحة لتعديل الخطط التأهيلية بدقة وبناءً على شواهد.»
                </p>
                <span className="text-xs font-bold text-sada-violet px-3 py-1 rounded-full bg-white shadow-2xs">
                  كفاءة مهنية أعلى
                </span>
              </div>
            </div>
          )}

          {/* Scientific Disclaimer Banner (Mandatory as per PDF Page 16) */}
          <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-4">
            <ShieldAlert className="text-amber-600 flex-shrink-0 mt-1" size={22} />
            <div className="text-right">
              <span className="text-xs sm:text-sm font-black text-amber-950 block mb-1">
                تنويه علمي معتمد من فريق صدى:
              </span>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                تطبيق صدى وسيلة مساعدة للتقييم الوظيفي والمتابعة والتدريب السمعي، ولا يحل محل التقييم السمعي المتخصص أو ضبط السماعات الطبية وزراعة القوقعة أو جلسات التأهيل تحت إشراف المختصين.
              </p>
            </div>
          </div>
        </div>

        {/* SADA Value Added Banner */}
        <div className="mt-12 text-center p-6 rounded-3xl bg-gradient-to-r from-sada-violet to-sada-teal text-white shadow-xl">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest text-sada-yellow">
              القيمة المضافة للمشروع
            </span>
          </div>
          <p className="text-base sm:text-lg font-black max-w-3xl mx-auto leading-relaxed">
            «يجمع صدى في مكان واحد تقييم الاستجابة السمعية، وتقييم المهارات السمعية، وتوثيق النتائج، وأدلة الاستخدام، والألعاب التعزيزية؛ ليكون لكل صوت حكاية.. ولكل طفل فرصة.»
          </p>
        </div>
      </div>
    </section>
  );
};
