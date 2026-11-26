import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Smartphone,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Ear,
  Save,
  CheckCircle2,
  TrendingUp,
  CalendarCheck,
} from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

export const AppWorkflowSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-03-discovering-sada');

  const steps = [
    {
      id: '01',
      title: 'ملف الطفل',
      englishTitle: 'Child Profile',
      desc: 'إنشاء ملف رقمي منظم للطفل يضم بياناته الأساسية ونوع المعين السمعي وتاريخ المتابعة.',
      icon: UserCheck,
      screenImage: '/assets/screens/screen_welcome.png',
      color: '#7357D9',
      bullets: [
        'البدء من ملف الطفل لحفظ جميع التقييمات والنتائج في مكان واحد.',
        'ربط كل جلسة لاحقة بالملف نفسه لمتابعة الأداء عبر الزمن.',
      ],
    },
    {
      id: '02',
      title: 'تقييم أصوات لينج',
      englishTitle: 'Ling Sound Check',
      desc: 'تقديم الأصوات الستة /m/, /u/, /a/, /i/, /ʃ/, /s/ كل صوت على حدة وتسجيل استجابة الطفل.',
      icon: Ear,
      screenImage: '/assets/screens/screen_ling_test.png',
      color: '#159D98',
      bullets: [
        'تشغيل الصوت في بيئة هادئة دون إشارات بصرية مضللة.',
        'تسجيل الاستجابة السلوكية مباشرة عبر خيار (استجاب) أو (لم يستجب).',
      ],
    },
    {
      id: '03',
      title: 'حفظ النتائج والتوثيق',
      englishTitle: 'Save Results',
      desc: 'حساب نسبة الاستجابة آلياً وفق المعادلة المعتمدة وتوثيق تاريخ الجلسة وظروفها.',
      icon: Save,
      screenImage: '/assets/screens/screen_ling_results.png',
      color: '#FF886F',
      bullets: [
        'تطبيق معادلة: نسبة الاستجابة = (عدد الأصوات المستجاب لها ÷ 6) × 100.',
        'مقارنة الجلسات السابقة لمعرفة التغير في التقاط الترددات.',
      ],
    },
    {
      id: '04',
      title: 'تقييم المهارات السمعية',
      englishTitle: 'Auditory Skills',
      desc: 'اختيار أي من المهارات السمعية الخمس الأساسية بصورة مستقلة دون فرض ترتيب موحد.',
      icon: CheckCircle2,
      screenImage: '/assets/screens/screen_skills_list.png',
      color: '#8F75EC',
      bullets: [
        'تقييم نوعي مستقل للإدراك، التمييز، التعرف والربط، الفهم، والإغلاق السمعي.',
        'مكافآت بصرية لطيفة بالنجوم لرفع حماس الطفل أثناء المشاركة.',
      ],
    },
    {
      id: '05',
      title: 'لوحة مؤشرات الأداء',
      englishTitle: 'Performance Dashboard',
      desc: 'عرض مبسط لنسب الأداء وعدد الإجابات الصحيحة لمساعدة الأسرة والأخصائي على القراءة السريعة.',
      icon: TrendingUp,
      screenImage: '/assets/screens/screen_dashboard.png',
      color: '#D99200',
      bullets: [
        'عرض نسبة أداء المهارات واستجابة لينج جنباً إلى جنب في تقارير واضحة.',
        'تحديد المهارات التي تحتاج إلى دعم ومتابعة إضافية في الخطة التأهيلية.',
      ],
    },
    {
      id: '06',
      title: 'خطة المتابعة الدورية',
      englishTitle: 'Assessment Timeline',
      desc: 'متابعة منظمة تشمل التقييم القبلي والمتابعة الدورية (مثل كل 3 أشهر، قابل للتعديل) والتقييم البعدي.',
      icon: CalendarCheck,
      screenImage: '/assets/screens/screen_timeline.png',
      color: '#32B8B3',
      bullets: [
        'جدولة المواعيد وإرسال تذكيرات لولي الأمر والأخصائي.',
        'مقارنة النتائج في ظروف متسقة عبر فترة التأهيل.',
      ],
    },
  ];

  const activeStepData = steps[currentStep];

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    if (!section || !phone) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        phone,
        { y: 24, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            end: 'top 30%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="app"
      data-scene-id="scene-03-discovering-sada"
      className="sada-scene bg-sada-cream-warm"
    >
      <div className="max-w-7xl mx-auto">
        {/* Scene Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-3">
            <Smartphone size={14} />
            <span>المشهد 03 · اكتشاف تطبيق صدى</span>
          </div>
          <h2 className="sada-section-title font-black text-sada-ink mb-4">
            رحلة <span className="text-sada-teal">مترابطة في التطبيق</span> من البداية إلى المتابعة
          </h2>
          <p className="sada-body-copy text-sada-ink/75 font-medium text-center">
            يكشف عمر ومريم كيف يجمع تطبيق صدى ملف الطفل، وتقييم لينج، والمهارات السمعية، والتقارير في ست خطوات واضحة.
          </p>
        </div>

        {/* Cast + Tablet Discovery Bridge — Prominent Character Framing */}
        <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-8 mb-10">
          <CharacterStageActor
            characterId="omar"
            sizeClass="w-36 sm:w-48 md:w-56"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'omar'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'omar')}
          />
          <div className="w-48 sm:w-64 bg-white/90 rounded-3xl p-3 border border-sada-violet/15 shadow-md">
            <img
              src="/assets/group_tablet.webp"
              alt="عمر وزين يستكشفان تطبيق صدى على الجهاز اللوحي"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-contain"
            />
          </div>
          <CharacterStageActor
            characterId="maryam"
            sizeClass="w-36 sm:w-48 md:w-56"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'maryam'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'maryam')}
          />
        </div>

        {/* 6-Stage Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isCurrent = idx === currentStep;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  soundEngine.playPop();
                  setCurrentStep(idx);
                }}
                className={`p-3.5 rounded-2xl border-2 text-right transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white shadow-lg border-sada-violet ring-2 ring-sada-violet/15'
                    : 'bg-white/75 hover:bg-white border-transparent text-sada-ink/75'
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
                  <Icon size={16} className={isCurrent ? 'text-sada-violet' : 'text-sada-ink/45'} />
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-sada-ink block">
                  {st.title}
                </span>
                <span className="dir-ltr text-[10px] text-sada-ink/55 mt-0.5 block text-right">
                  {st.englishTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Phone Mockup & Stage Details */}
        <div className="bg-white rounded-[2.25rem] border-2 border-sada-violet/15 p-6 md:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div ref={phoneRef} className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-64 sm:w-72 flex items-center justify-center">
                <img
                  key={activeStepData.screenImage}
                  src={activeStepData.screenImage}
                  alt={activeStepData.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain rounded-[2rem] drop-shadow-xl animate-fade-in"
                />
              </div>
              <span className="text-[11px] text-sada-ink/60 text-center mt-3 font-semibold">
                * تصوّر مبدئي لواجهة التطبيق (Concept UI) معتمد في وثيقة المشروع.
              </span>
            </div>

            <div className="lg:col-span-7 flex flex-col text-right">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span
                  className="text-xs font-black px-3.5 py-1.5 rounded-xl"
                  style={{
                    backgroundColor: `${activeStepData.color}1F`,
                    color: activeStepData.color,
                  }}
                >
                  المرحلة {activeStepData.id} من 06 · {activeStepData.englishTitle}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playPop();
                      setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
                    }}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sada-ink transition-colors"
                    aria-label="المرحلة السابقة"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playPop();
                      setCurrentStep((prev) => (prev + 1) % steps.length);
                    }}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sada-ink transition-colors"
                    aria-label="المرحلة التالية"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>
              </div>

              <h3 className="sada-card-title font-black text-sada-ink mb-3">
                {activeStepData.title}
              </h3>

              <p className="sada-body-copy text-sada-ink/80 font-medium mb-6">
                {activeStepData.desc}
              </p>

              <div className="p-5 rounded-2xl bg-sada-surface border border-sada-violet/10">
                <h4 className="text-xs font-extrabold text-sada-ink/65 mb-2.5">
                  تفاصيل هذه المرحلة:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-sada-ink/85 font-medium">
                  {activeStepData.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: activeStepData.color }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
