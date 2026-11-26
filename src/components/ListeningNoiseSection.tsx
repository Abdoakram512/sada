import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX, ShieldAlert, Sparkles, CheckCircle2, PlayCircle } from 'lucide-react';
import { AUDITORY_SKILLS, type AuditorySkill } from '../data/sadaData';
import { soundEngine } from '../utils/audioEngine';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

interface ListeningNoiseSectionProps {
  onPlayGame?: (skill: AuditorySkill) => void;
}

export const ListeningNoiseSection: React.FC<ListeningNoiseSectionProps> = ({ onPlayGame }) => {
  const noiseSkill = AUDITORY_SKILLS[5];
  const [ambientOn, setAmbientOn] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const layersRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId, status } = useStorySceneFocus('scene-06-listening-noise');

  useEffect(() => {
    const section = sectionRef.current;
    const layers = layersRef.current;
    if (!section || !layers) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(layers.children, {
        y: 26,
        opacity: 0,
        stagger: 0.12,
        duration: 0.55,
        ease: 'power2.out',
        force3D: true,
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          once: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      soundEngine.stopAmbient();
    };
  }, []);

  // Automatically turn off subtle ambient murmur when leaving scene
  useEffect(() => {
    if (!isSceneActive && ambientOn) {
      soundEngine.stopAmbient();
    }
  }, [isSceneActive, ambientOn]);

  const isAmbientEffective = isSceneActive && ambientOn;

  const toggleAmbient = () => {
    if (isAmbientEffective) {
      soundEngine.stopAmbient();
      setAmbientOn(false);
    } else {
      soundEngine.startGentleAmbient(status === 'playing');
      setAmbientOn(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="noise"
      data-scene-id="scene-06-listening-noise"
      className="sada-scene bg-[#F1FAF9]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-sada-teal/25 text-sada-teal-dark text-xs font-bold mb-3">
            <Sparkles size={14} />
            <span>المشهد 06 · الاستماع في وجود ضوضاء (تقييم تطبيقي إضافي)</span>
          </div>
          <h2 className="sada-section-title font-black text-sada-ink mb-4">
            التركيز على <span className="text-sada-teal">الصوت المستهدف</span> وسط خلفية هادئة
          </h2>
          <p className="sada-body-copy text-sada-ink/75 font-medium text-center">
            وحدة تطبيقية إضافية وليست مستوى إلزامياً ضمن المهارات الخمس؛ تُستخدم لمتابعة التقاط الكلمة عند وجود صوت خلفي بسيط مضبوط الشدة.
          </p>
        </div>

        {/* Layered Scene */}
        <div ref={layersRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Characters & Interactive Soft Ambient Control */}
          <div className="lg:col-span-6 bg-white rounded-[2rem] border-2 border-sada-teal/20 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-8 mb-6">
              <CharacterStageActor
                characterId="zain"
                sizeClass="w-36 sm:w-44 md:w-52"
                isActiveScene={isSceneActive}
                isSpeaking={isSceneActive && activeSpeakerId === 'zain'}
                isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'zain')}
              />
              <CharacterStageActor
                characterId="maryam"
                sizeClass="w-36 sm:w-44 md:w-52"
                isActiveScene={isSceneActive}
                isSpeaking={isSceneActive && activeSpeakerId === 'maryam'}
                isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'maryam')}
              />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-sada-ink mb-2">
              {noiseSkill.objective}
            </h3>

            <div className="space-y-2.5 my-5">
              {noiseSkill.examples.map((ex, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-sada-surface border border-teal-100">
                  <CheckCircle2 size={16} className="text-sada-teal flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-sada-ink/85">{ex}</span>
                </div>
              ))}
            </div>

            {/* Optional Safe Ambient Control */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-teal-50/70 border border-sada-teal/20 mb-4">
              <div className="text-right">
                <span className="text-xs font-extrabold text-sada-ink block">
                  مثال اختياري لصوت خلفي خفيف وآمن
                </span>
                <span className="text-[11px] text-sada-ink/65">
                  شدة منخفضة ومضبوطة لا تسبب أي إزعاج سمعي
                </span>
              </div>
              <button
                type="button"
                onClick={toggleAmbient}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  isAmbientEffective
                    ? 'bg-sada-teal text-white shadow-sm'
                    : 'bg-white text-sada-teal-dark border border-sada-teal/30 hover:bg-teal-50'
                }`}
              >
                {isAmbientEffective ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span>{isAmbientEffective ? 'إيقاف الخلفية الهادئة' : 'تشغيل خلفية هادئة'}</span>
              </button>
            </div>

            {/* Mandatory Safety Note from PDF Page 13 */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <ShieldAlert size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                <strong className="font-bold">اشتراط السلامة السمعية: </strong>
                يحدد الأخصائي ظروف التشغيل الملائمة ويُتجنب رفع شدة الصوت أو الضوضاء إلى مستويات غير آمنة، وتُوثق ظروف الجلسة للمقارنة.
              </p>
            </div>
          </div>

          {/* App Mockup Stage */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative bg-white/90 rounded-[2.25rem] p-6 sm:p-8 border-2 border-sada-teal/15 shadow-xl flex flex-col items-center w-full max-w-md">
              <div className="w-56 sm:w-64 rounded-[2.4rem] bg-sada-ink p-2.5 shadow-2xl border-4 border-gray-800 mb-5">
                <img
                  src={noiseSkill.screenImage}
                  alt="شاشة الاستماع في ضوضاء"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-[1.8rem] object-cover"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playSuccess();
                  onPlayGame?.(noiseSkill);
                }}
                className="w-full py-3 rounded-2xl bg-sada-teal hover:bg-sada-teal-dark text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <PlayCircle size={17} />
                <span>جرّب تحدي الكلمة وسط الضوضاء في عالم الألعاب</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
