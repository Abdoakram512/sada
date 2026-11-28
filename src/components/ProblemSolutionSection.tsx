import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, CheckCircle2, TrendingUp, Users, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

export const ProblemSolutionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-02-challenge');

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const cards = cardsRef.current;
    if (!section || !stage || !cards) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(stage, {
        y: 22,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          once: true,
        },
      });

      gsap.from(cards.children, {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: cards,
          start: 'top 96%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-scene-id="scene-02-challenge"
      className="sada-scene bg-sada-surface"
    >
      <div className="max-w-7xl mx-auto">
        {/* Scene Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-3">
            <Sparkles size={14} />
            <span>المشهد 02 · فهم التحدي اليومي</span>
          </div>
          <h2 className="sada-section-title font-black text-sada-ink mb-4">
            لماذا يبدأ كل شيء <span className="text-sada-violet">بالإصغاء المنظّم</span>؟
          </h2>
          <p className="sada-body-copy text-sada-ink/75 font-medium text-center">
            تأهيل الطفل الأصم أو ضعيف السمع شغل يومي مشترك بين البيت والأخصائي؛ يسأل زين ليه بنحتاج متابعة منظمة، وتوضح جنى ونور إزاي تطبيق صدى بيجمع التقييم والتدريب والمتابعة في مكان واحد.
          </p>
        </div>

        {/* Character Conversation Cast — Unified horizontal dialogue stage on mobile & desktop */}
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-end justify-items-center sm:justify-center gap-1.5 sm:gap-10 mb-8 sm:mb-10">
          <CharacterStageActor
            characterId="zain"
            heightClass="h-44 sm:h-56 md:h-64"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'zain'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'zain')}
            bubbleText={!activeSpeakerId ? 'ليه المتابعة مهمة؟' : undefined}
          />
          <CharacterStageActor
            characterId="jana"
            heightClass="h-44 sm:h-56 md:h-64"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'jana'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'jana')}
          />
          <CharacterStageActor
            characterId="nour"
            heightClass="h-44 sm:h-56 md:h-64"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'nour'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'nour')}
          />
        </div>

        {/* Interactive Perspective Switch */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="w-full sm:w-auto bg-sada-cream p-1.5 rounded-2xl border border-sada-violet/15 grid grid-cols-2 sm:flex sm:flex-nowrap items-center justify-center shadow-inner gap-1.5">
            <button
              type="button"
              onClick={() => {
                soundEngine.playPop();
                setActiveTab('problem');
              }}
              className={`min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 ${
                activeTab === 'problem'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-sada-ink/75 hover:text-sada-ink'
              }`}
            >
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>المشكلة</span>
              <span className="hidden sm:inline">(التحديات)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playPop();
                setActiveTab('solution');
              }}
              className={`min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 ${
                activeTab === 'solution'
                  ? 'bg-sada-teal text-white shadow-md'
                  : 'text-sada-ink/75 hover:text-sada-ink'
              }`}
            >
              <CheckCircle2 size={16} className="flex-shrink-0" />
              <span>تطبيق صدى (الحل)</span>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Visual Story Illustration */}
          <div ref={stageRef} className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-sada-lavender via-white to-sada-cream-warm p-5 sm:p-6 border-2 border-sada-violet/15 shadow-xl flex flex-col items-center justify-center overflow-hidden">
              <img
                src="/assets/group_reading_transparent.webp"
                srcSet="/assets/group_reading_transparent-sm.webp 426w, /assets/group_reading_transparent.webp 760w"
                sizes="(max-width: 639px) 320px, 400px"
                alt="جنى وعمر ومريم وزين يقرؤون ويتابعون رحلة التعلم"
                width={760}
                height={517}
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full h-auto object-contain"
              />
              <div className="mt-4 w-full bg-white/95 px-4 py-3 rounded-2xl border border-sada-violet/15 text-center shadow-xs">
                <span className="text-xs sm:text-sm font-extrabold text-sada-ink">
                  «صدى يربط التقييم بالمتابعة في تجربة تفاعلية واحدة»
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Narrative Cards */}
          <div ref={cardsRef} className="lg:col-span-7 flex flex-col gap-4">
            {activeTab === 'problem' ? (
              <>
                {[
                  {
                    num: '١',
                    title: 'صعوبة تنظيم الاستجابات ومقارنتها عبر الجلسات',
                    body: 'اعتماد التقييمات السمعية على أوراق متفرقة يصعّب تتبع تطور استجابة الطفل لأصوات الكلام عبر الأشهر بدقة منظمة.',
                  },
                  {
                    num: '٢',
                    title: 'الحاجة لأنشطة منزلية مشجعة دون ضغط',
                    body: 'تبحث الأسر عن أنشطة تفاعلية لطيفة تتناسب مع قدرات الطفل السمعية في المنزل دون تحويل الوقت الأسري إلى اختبار جاف.',
                  },
                  {
                    num: '٣',
                    title: 'توحيد الرؤية بين الأسرة والأخصائي',
                    body: 'الحاجة إلى سجل رقمي واضح يعكس أداء كل مهارة سمعية بصورة مستقلة مع توثيق ظروف كل جلسة.',
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-rose-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 font-black text-lg">
                        {item.num}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-sada-ink mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-sada-ink/75 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {[
                  {
                    icon: TrendingUp,
                    tone: 'bg-sada-teal/10 text-sada-teal border-sada-teal/20',
                    title: 'تقييمات منظمة وسجل رقمي لكل طفل',
                    body: 'ملف موحد يحفظ نتائج أصوات لينج والمهارات السمعية الخمس مع التواريخ وظروف الجلسة ونسب الاستجابة.',
                  },
                  {
                    icon: Users,
                    tone: 'bg-sada-violet/10 text-sada-violet border-sada-violet/20',
                    title: 'مهام تفاعلية وألعاب تعزيزية بالنجوم',
                    body: 'تحويل الأنشطة إلى تجربة مشوقة ترفع دافعية الطفل بالمكافآت البصرية دون استخدام الألعاب كأداة تشخيص طبي.',
                  },
                  {
                    icon: HeartHandshake,
                    tone: 'bg-sada-yellow/20 text-amber-800 border-sada-yellow/40',
                    title: 'تكامل واعي بين ولي الأمر والأخصائي',
                    body: 'أدلة استخدام مخصصة لكل من الأسرة والأخصائي للحفاظ على بيئة استماع هادئة ومتابعة مهنية مستمرة.',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-5 sm:p-6 rounded-3xl bg-white border shadow-sm hover:shadow-md transition-shadow ${item.tone.split(' ')[2]}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.tone.split(' ').slice(0, 2).join(' ')}`}>
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-extrabold text-sada-ink mb-1.5">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-sada-ink/75 leading-relaxed">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* Scientific disclaimer */}
            <div className="mt-1 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 flex items-start gap-3">
              <ShieldCheck className="text-amber-700 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                <strong className="font-bold">تنويه علمي معتمد:</strong> تطبيق صدى وسيلة مساعدة للتقييم الوظيفي والمتابعة والتدريب السمعي، ولا يحل محل التقييم السمعي المتخصص أو ضبط السماعات الطبية أو جلسات التأهيل تحت إشراف المختصين.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
