import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, CheckCircle2, Sparkles, CalendarClock } from 'lucide-react';
import { PROJECT_GOALS } from '../data/sadaData';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

export const GoalsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-09-progress');

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    if (!section || !timeline) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(timeline.children, {
        y: 18,
        opacity: 0,
        stagger: 0.1,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 96%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const timelineStages = [
    {
      badge: '01 · قبلي',
      title: 'نقطة البداية',
      desc: 'قبل بدء خطة التأهيل لتوثيق أداء الطفل في المهارات المستهدفة.',
      tone: 'bg-emerald-50 text-sada-teal-dark border-sada-teal/25',
    },
    {
      badge: '02 · متابعة',
      title: 'قياس التقدم',
      desc: 'خلال التأهيل دورياً، مثل كل 3 أشهر (قابل للتعديل)، لمراجعة تطور الأداء وتعديل الخطة.',
      tone: 'bg-amber-50 text-amber-800 border-amber-300',
    },
    {
      badge: '03 · بعدي',
      title: 'حصيلة التأهيل',
      desc: 'عند انتهاء الفترة المحددة، لمقارنة النتائج المسجلة مع التقييم القبلي في ظروف متسقة.',
      tone: 'bg-sada-lavender text-sada-violet border-sada-violet/25',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="progress"
      data-scene-id="scene-09-progress"
      className="sada-scene bg-sada-surface"
    >
      <div className="max-w-7xl mx-auto">
        {/* Scene Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-3">
            <Target size={14} />
            <span>المشهد 09 · رحلة التطور والأهداف السبعة</span>
          </div>
          <h2 className="sada-section-title font-black text-sada-ink mb-4">
            متابعة <span className="text-sada-violet">التطور عبر الزمن</span> وليس الاكتفاء بنتيجة واحدة
          </h2>
          <p className="sada-body-copy text-sada-ink/75 font-medium text-center">
            ترتبط كل جلسة بملف الطفل ليستطيع الأخصائي وولي الأمر متابعة التغير في الأداء عبر فترة التأهيل في ظروف متسقة.
          </p>
        </div>

        {/* Characters + High Five Celebration */}
        <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-8 mb-10">
          <CharacterStageActor
            characterId="maryam"
            sizeClass="w-36 sm:w-48 md:w-56"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'maryam'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'maryam')}
          />
          <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-sada-violet/15 shadow-md">
            <img
              src="/assets/screens/screen_dashboard.png"
              alt="لوحة مؤشرات الأداء في تطبيق صدى"
              loading="lazy"
              decoding="async"
              className="w-20 sm:w-28 rounded-2xl border border-gray-200"
            />
            <img
              src="/assets/group_highfive.webp"
              alt="سارة ومريم تحتفلان بكل خطوة"
              loading="lazy"
              decoding="async"
              className="w-28 sm:w-36 h-auto object-contain"
            />
            <img
              src="/assets/screens/screen_timeline.png"
              alt="خطة المتابعة الدورية في تطبيق صدى"
              loading="lazy"
              decoding="async"
              className="w-20 sm:w-28 rounded-2xl border border-gray-200"
            />
          </div>
          <CharacterStageActor
            characterId="nour"
            sizeClass="w-36 sm:w-48 md:w-56"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'nour'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'nour')}
          />
        </div>

        {/* Longitudinal Assessment Timeline (Pre -> Follow-up -> Post) */}
        <div className="bg-white rounded-[2rem] border-2 border-sada-violet/15 p-6 sm:p-8 shadow-lg mb-10">
          <div className="flex items-center gap-2 mb-5">
            <CalendarClock className="text-sada-violet" size={20} />
            <h3 className="text-lg sm:text-xl font-black text-sada-ink">
              الجدول الزمني للتقييم: قبلي، متابعة دورية، وبعدي
            </h3>
          </div>

          <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {timelineStages.map((st, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-sada-surface border border-sada-violet/10 flex flex-col justify-between">
                <div>
                  <span className={`inline-block text-xs font-black px-3 py-1 rounded-full border mb-3 ${st.tone}`}>
                    {st.badge}
                  </span>
                  <h4 className="text-base font-black text-sada-ink mb-1.5">{st.title}</h4>
                  <p className="text-xs sm:text-sm text-sada-ink/75 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs font-medium text-amber-950 bg-amber-50 p-3.5 rounded-xl border border-amber-200">
            <strong>ملاحظة منهجية: </strong>
            مدة الثلاثة أشهر مثال قابل للتعديل حسب خطة الطفل. مقارنة النتائج تستلزم مراعاة ثبات ظروف ومهام التقييم، ولا تمثل وحدها حكماً طبياً أو ضماناً قاطعاً لنتيجة علاجية.
          </p>
        </div>

        {/* 7 Project Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {PROJECT_GOALS.map((goal, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white border border-sada-violet/15 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="dir-ltr font-mono text-xl font-black" style={{ color: goal.color }}>
                  {goal.number}
                </span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: goal.color }} />
              </div>
              <div>
                <h3 className="text-base font-black text-sada-ink mb-1.5">{goal.title}</h3>
                <p className="text-xs text-sada-ink/75 leading-relaxed">{goal.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-sada-ink/60">
                <CheckCircle2 size={13} style={{ color: goal.color }} />
                <span>هدف موثق في المشروع</span>
              </div>
            </div>
          ))}

          {/* Target Audience Card completing the 8-cell 4-col grid cleanly */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-sada-ink to-[#332A52] text-white shadow-lg flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-sada-yellow text-[11px] font-bold mb-3">
                <Sparkles size={12} />
                <span>لمن صُمم صدى؟</span>
              </span>
              <h3 className="text-base font-black mb-2">الفئة المستهدفة</h3>
              <p className="text-xs text-white/85 leading-relaxed">
                الأطفال ضعاف السمع من مستخدمي السماعات الطبية أو زراعة القوقعة الإلكترونية، مع مراعاة الفروق الفردية.
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-white/15 text-xs font-extrabold text-sada-yellow">
              «لأن كل استجابة صوتية تستحق أن تُسمع وتُتابع»
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
