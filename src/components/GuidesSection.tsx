import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Stethoscope, CheckCircle, ShieldAlert, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

export const GuidesSection: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<'parent' | 'specialist'>('parent');
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-08-parents-specialists');

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from(card, {
        y: 24,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        force3D: true,
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: card,
          start: 'top 94%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="guides"
      data-scene-id="scene-08-parents-specialists"
      className="sada-scene bg-sada-cream"
    >
      <div className="max-w-7xl mx-auto">
        {/* Scene Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-3">
            <Heart size={14} />
            <span>المشهد 08 · شراكة الأسرة والأخصائي</span>
          </div>
          <h2 className="sada-section-title font-black text-sada-ink mb-4">
            تكامل واعٍ بين <span className="text-sada-teal">المنزل وجلسات المختص</span>
          </h2>
          <p className="sada-body-copy text-sada-ink/75 font-medium text-center">
            تشارك نور نصائح المتابعة المنزلية الهادئة للأسرة، بينما تستعرض مريم أدوات التنظيم والمتابعة المهنية للأخصائي.
          </p>
        </div>

        {/* Characters Duo — Prominent Family & Specialist Hosts */}
        <div className="flex items-end justify-center gap-6 sm:gap-12 mb-8 sm:mb-10">
          <CharacterStageActor
            characterId="nour"
            heightClass="h-48 sm:h-56 md:h-64"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'nour'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'nour')}
            onClick={() => setActiveGuide('parent')}
          />
          <CharacterStageActor
            characterId="maryam"
            heightClass="h-48 sm:h-56 md:h-64"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'maryam'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'maryam')}
            onClick={() => setActiveGuide('specialist')}
          />
        </div>

        {/* Dual Switcher */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="w-full sm:w-auto bg-white p-1.5 rounded-2xl border border-sada-violet/15 grid grid-cols-2 sm:flex sm:flex-nowrap items-center justify-center shadow-md gap-1.5">
            <button
              type="button"
              onClick={() => {
                soundEngine.playPop();
                setActiveGuide('parent');
              }}
              className={`min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all active:scale-95 ${
                activeGuide === 'parent'
                  ? 'bg-sada-teal text-white shadow-md'
                  : 'text-sada-ink/75 hover:text-sada-ink'
              }`}
            >
              <Home size={16} className="flex-shrink-0" />
              <span>دليل ولي الأمر</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playPop();
                setActiveGuide('specialist');
              }}
              className={`min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all active:scale-95 ${
                activeGuide === 'specialist'
                  ? 'bg-sada-violet text-white shadow-md'
                  : 'text-sada-ink/75 hover:text-sada-ink'
              }`}
            >
              <Stethoscope size={16} className="flex-shrink-0" />
              <span>دليل الأخصائي</span>
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div ref={cardRef} className="bg-white rounded-[2.25rem] border-2 border-sada-violet/15 p-6 sm:p-10 shadow-xl">
          {activeGuide === 'parent' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-5 text-right">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sada-teal/15 text-sada-teal-dark text-xs font-black">
                  إرشادات للأسرة في البيئة المنزلية
                </span>
                <h3 className="sada-card-title font-black text-sada-ink">
                  مشاركة منزلية واعية تدعم جلسات المركز
                </h3>
                <div className="space-y-3">
                  {[
                    'إنشاء ملف الطفل واختيار التقييم المناسب.',
                    'اتباع طريقة تسجيل الاستجابات كما هو موضح.',
                    'تهيئة البيئة المنزلية الهادئة وتجنب المشتتات.',
                    'قراءة النتائج ومراجعة الأخصائي عند الحاجة.',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-sada-surface border border-gray-100">
                      <CheckCircle size={18} className="text-sada-teal flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-sada-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border border-sada-teal/20 text-center">
                <img
                  src="/assets/char_guide.webp"
                  srcSet="/assets/char_guide-sm.webp 346w, /assets/char_guide.webp 617w"
                  sizes="(max-width: 639px) 176px, 210px"
                  alt="نور تحمل كتاب الإرشادات"
                  width={617}
                  height={760}
                  loading="lazy"
                  decoding="async"
                  className="w-44 sm:w-52 h-auto object-contain mb-3"
                />
                <h4 className="text-lg font-black text-sada-ink mb-1.5">دور الأسرة الداعم</h4>
                <p className="text-xs sm:text-sm text-sada-ink/75 leading-relaxed font-medium text-center">
                  مشاركة منزلية بسيطة تشجع الطفل وتُكمل جلسات التأهيل المتخصصة.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-5 text-right">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sada-violet/15 text-sada-violet text-xs font-black">
                  أدوات تنظيمية للأخصائي
                </span>
                <h3 className="sada-card-title font-black text-sada-ink">
                  متابعة منظمة ومهنية لكل مهارة عبر الزمن
                </h3>
                <div className="space-y-3">
                  {[
                    'مراجعة ملف الطفل وتاريخ التقييمات.',
                    'قراءة استجابات لينج لكل صوت ومقارنتها.',
                    'مراجعة أداء المهارات السمعية بصورة مستقلة.',
                    'تحديد المهام الملائمة ومتابعة التغير بمرور الوقت.',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-sada-surface border border-gray-100">
                      <CheckCircle size={18} className="text-sada-violet flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-sada-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-7 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-white border border-sada-violet/20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-sada-violet text-white flex items-center justify-center mb-4 shadow-md">
                  <Stethoscope size={32} />
                </div>
                <h4 className="text-lg font-black text-sada-ink mb-2">متابعة منظمة وموضوعية</h4>
                <p className="text-xs sm:text-sm text-sada-ink/75 leading-relaxed font-medium text-center">
                  توثيق الجلسات والظروف يمنح الأخصائي مرجعاً واضحاً لتوجيه الخطة التأهيلية الملائمة لقدرات الطفل.
                </p>
              </div>
            </div>
          )}

          {/* Mandatory Scientific Disclaimer */}
          <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5">
            <ShieldAlert className="text-amber-700 flex-shrink-0 mt-0.5" size={22} />
            <div className="text-right">
              <span className="text-xs sm:text-sm font-black text-amber-950 block mb-1">
                تنويه علمي معتمد:
              </span>
              <p className="text-xs text-amber-950 leading-relaxed font-medium">
                تطبيق صدى وسيلة مساعدة للتقييم الوظيفي والمتابعة والتدريب السمعي، ولا يحل محل التقييم السمعي المتخصص أو ضبط السماعات الطبية وزراعة القوقعة أو جلسات التأهيل تحت إشراف المختصين.
              </p>
            </div>
          </div>
        </div>

        {/* Value Added Banner */}
        <div className="mt-10 text-center p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-sada-violet to-sada-teal text-white shadow-xl">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles size={16} />
            <span className="text-xs font-bold text-sada-yellow">القيمة المضافة للمشروع</span>
          </div>
          <p className="text-sm sm:text-lg font-black max-w-3xl mx-auto leading-relaxed text-center">
            «يجمع صدى في مكان واحد تقييم الاستجابة السمعية، وتقييم المهارات السمعية، وتوثيق النتائج، وأدلة الاستخدام، والألعاب التعزيزية؛ ويساعد في تحقيق تعاون أفضل بين الطفل وولي الأمر والأخصائي، إلى جانب الجلسات التأهيلية.»
          </p>
        </div>
      </div>
    </section>
  );
};
