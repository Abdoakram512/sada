import React, { useState } from 'react';
import {
  Smartphone,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Ear,
  Save,
  CheckCircle2,
  TrendingUp,
  CalendarCheck
} from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';

export const AppWorkflowSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      id: '01',
      title: 'ملف الطفل',
      englishTitle: 'Child Profile',
      desc: 'إنشاء ملف رقمي متكامل للطفل يتضمن معلومات العمر السمعي، نوع المعين السمعي (سماعة طبية أو زراعة قوقعة)، وتاريخ بدء التأهيل.',
      icon: UserCheck,
      screenImage: '/assets/screens/screen_welcome.png',
      color: '#7357D9'
    },
    {
      id: '02',
      title: 'تقييم أصوات لينج',
      englishTitle: 'Ling Sound Check',
      desc: 'تقديم الأصوات الستة منفصلة عبر الواجهة وتسجيل استجابة الطفل الفورية لمتابعة كفاءة التقاط الطيف الصوتي.',
      icon: Ear,
      screenImage: '/assets/screens/screen_ling_test.png',
      color: '#159D98'
    },
    {
      id: '03',
      title: 'حفظ النتائج والتوثيق',
      englishTitle: 'Save Results',
      desc: 'أرشفة فورية لنتائج كل جلسة وتوثيق تاريخها وظروف التقديم السمعي لضمان مقارنة علمية موثوقة مستقبلاً.',
      icon: Save,
      screenImage: '/assets/screens/screen_ling_results.png',
      color: '#FF886F'
    },
    {
      id: '04',
      title: 'تقييم وتدريب المهارات',
      englishTitle: 'Auditory Skills',
      desc: 'الانتقال إلى المهارات السمعية الخمس (إدراك، تمييز، تعرف، فهم، إغلاق) عبر مهام تفاعلية وألعاب تعزيزية مناسبة.',
      icon: CheckCircle2,
      screenImage: '/assets/screens/screen_skills_list.png',
      color: '#8F75EC'
    },
    {
      id: '05',
      title: 'لوحة مؤشرات الأداء',
      englishTitle: 'Performance Dashboard',
      desc: 'قراءة نسب الإنجاز التراكمية (مثل نسبة 78% ومعدل الاستجابات الصحيحة) ومقارنة الجلسات لمعرفة نقاط القوة ومواطن الدعم.',
      icon: TrendingUp,
      screenImage: '/assets/screens/screen_dashboard.png',
      color: '#FFC552'
    },
    {
      id: '06',
      title: 'خطة المتابعة الدورية',
      englishTitle: 'Assessment Timeline',
      desc: 'جدولة محطات التقييم (قبلي، متابعة دورية كل 3 أشهر، بعدي) مع تذكيرات آلية لولي الأمر والأخصائي للحفاظ على ثبات الخطة.',
      icon: CalendarCheck,
      screenImage: '/assets/screens/screen_timeline.png',
      color: '#55D6BE'
    }
  ];

  const activeStepData = steps[currentStep];

  const handleStepClick = (idx: number) => {
    soundEngine.playPop();
    setCurrentStep(idx);
  };

  const nextStep = () => {
    soundEngine.playPop();
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    soundEngine.playPop();
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section id="app" className="relative py-28 px-4 md:px-8 bg-sada-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-4">
            <Smartphone size={14} />
            <span>Workflow & App Journey · رحلة الاستخدام داخل التطبيق</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-sada-ink leading-tight mb-4">
            تسلسل متقن من <span className="text-sada-teal">إنشاء الملف إلى قراءة النتائج</span>
          </h2>
          <p className="text-base sm:text-lg text-sada-ink/75 leading-relaxed font-medium">
            ست مراحل متتابعة ومترابطة داخل التطبيق تضمن متابعة سلسة وشاملة لمسار تأهيل الطفل السمعي عبر الزمن.
          </p>
        </div>

        {/* 6 Step Interactive Journey Track */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-14">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isCurrent = idx === currentStep;

            return (
              <button
                key={st.id}
                onClick={() => handleStepClick(idx)}
                className={`p-3.5 rounded-2xl border-2 text-right transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white shadow-lg scale-102 border-sada-violet ring-2 ring-sada-violet/20'
                    : 'bg-white/70 hover:bg-white border-transparent text-sada-ink/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                      isCurrent ? 'bg-sada-violet text-white' : 'bg-gray-100 text-sada-ink/60'
                    }`}
                  >
                    {st.id}
                  </span>
                  <Icon
                    size={16}
                    className={isCurrent ? 'text-sada-violet' : 'text-sada-ink/40'}
                  />
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-sada-ink block line-clamp-1">
                  {st.title}
                </span>
                <span className="text-[10px] text-sada-ink/50 mt-0.5 block">
                  {st.englishTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Live Phone Mockup & Storytelling Stage */}
        <div className="bg-white rounded-[2.5rem] border-2 border-sada-violet/15 p-6 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Phone Screen Mockup (Center Left) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* Outer Phone Bezel */}
              <div className="relative w-64 sm:w-72 aspect-[9/19] rounded-[3rem] bg-sada-ink p-3 shadow-2xl border-4 border-gray-800 ring-8 ring-sada-violet/15 flex flex-col items-center justify-between overflow-hidden">
                {/* Dynamic Island / Notch */}
                <div className="w-24 h-5 bg-black rounded-full mb-2 z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>

                {/* Cropped Screen Image with smooth fade-in */}
                <div className="relative w-full flex-1 rounded-[2.2rem] overflow-hidden bg-sada-surface flex items-center justify-center">
                  <img
                    key={activeStepData.screenImage}
                    src={activeStepData.screenImage}
                    alt={activeStepData.title}
                    className="w-full h-full object-cover animate-fade-in"
                  />
                </div>

                {/* Bottom Home Indicator */}
                <div className="w-28 h-1 bg-white/40 rounded-full mt-2" />
              </div>

              {/* Conceptual UI disclaimer note from PDF */}
              <span className="text-[11px] text-sada-ink/50 text-center mt-3 font-semibold">
                * تصوّر مبدئي لواجهة التطبيق (UI Concept) معتمد في ملف المشروع.
              </span>
            </div>

            {/* Step Storytelling & Explanation (Right Column) */}
            <div className="lg:col-span-7 flex flex-col text-right">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-black px-3.5 py-1.5 rounded-xl shadow-xs"
                  style={{
                    backgroundColor: `${activeStepData.color}20`,
                    color: activeStepData.color
                  }}
                >
                  المرحلة {activeStepData.id} من 06 · {activeStepData.englishTitle}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevStep}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sada-ink transition-colors"
                    aria-label="الخطوة السابقة"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={nextStep}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sada-ink transition-colors"
                    aria-label="الخطوة التالية"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-sada-ink mb-4">
                {activeStepData.title}
              </h3>

              <p className="text-base sm:text-lg text-sada-ink/80 leading-relaxed font-medium mb-8">
                {activeStepData.desc}
              </p>

              {/* Additional Context Box based on step */}
              <div className="p-5 rounded-2xl bg-sada-surface border border-sada-violet/10 mb-6">
                <h4 className="text-xs font-bold text-sada-ink/60 uppercase tracking-wider mb-2">
                  ماذا يحدث في هذه الخطوة؟
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-sada-ink/80 font-medium">
                  {currentStep === 0 && (
                    <>
                      <li>• تسجيل الاسم والعمر ونوع الجهاز المساعد وتاريخ أول ارتداء.</li>
                      <li>• تعيين تفضيلات التنبيهات الصوتية ونوع المكافآت التي يفضلها الطفل.</li>
                    </>
                  )}
                  {currentStep === 1 && (
                    <>
                      <li>• تقديم أصوات لينج /m/, /u/, /a/, /i/, /ʃ/, /s/ بدون منبهات بصرية مضللة.</li>
                      <li>• تدوين الاستجابة السلوكية المباشرة عبر زر (استجاب) أو (لم يستجب).</li>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <li>• حساب نسبة الاستجابة التلقائية استناداً لمعادلة (المستجاب لها ÷ 6) × 100.</li>
                      <li>• ربط النتيجة بملف الطفل السحابي الآمن مع تسجيل ظروف الفحص.</li>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <li>• اختيار المهارة المستهدفة في الجلسة من قائمة المهارات الخمس المستقلة.</li>
                      <li>• خوض الطفل للمهام التفاعلية مع تعزيز فوري بالنجوم والشارات اللطيفة.</li>
                    </>
                  )}
                  {currentStep === 4 && (
                    <>
                      <li>• استعراض مؤشرات الأداء الشاملة ومخطط المقارنة البياني بين الجلسات.</li>
                      <li>• مساعدة الأخصائي في تحديد المهارات التي حققت نمواً ملحوظاً.</li>
                    </>
                  )}
                  {currentStep === 5 && (
                    <>
                      <li>• تثبيت مواعيد التقييم الدوري (القبلي، المتابعة كل 3 أشهر، والبعدي).</li>
                      <li>• إشعار متبادل للأسرة والمركز الطبي لضمان التنسيق المستمر.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Mascot Guide commentary */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-sada-lavender/30 border border-sada-violet/15">
                <div className="w-10 h-10 rounded-full bg-sada-violet text-white font-bold flex items-center justify-center flex-shrink-0">
                  ص
                </div>
                <p className="text-xs text-sada-ink/80 font-semibold leading-relaxed">
                  تضمن دورة العمل توثيق كل محاولة ليكون لكل استجابة صوتية أثر ملموس في رحلة تطور الطفل.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
