import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bell,
  Sliders,
  Image as ImageIcon,
  BookOpen,
  Puzzle,
  Sparkles,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react';
import { AUDITORY_SKILLS, CHARACTERS, type AuditorySkill } from '../data/sadaData';
import { soundEngine } from '../utils/audioEngine';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

interface TrainingJourneySectionProps {
  onPlayGame?: (skill: AuditorySkill) => void;
}

const CORE_SKILLS = AUDITORY_SKILLS.slice(0, 5);

// Scene 05: Connected 5-Station Adventure through the 5 Core Independent Auditory Skills
export const TrainingJourneySection: React.FC<TrainingJourneySectionProps> = ({
  onPlayGame,
}) => {
  const [manualSkillId, setManualSkillId] = useState<number>(1);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stationsRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-05-auditory-skills');
  const speakerSkill =
    isSceneActive && activeSpeakerId
      ? CORE_SKILLS.find((s) => s.guideCharacterId === activeSpeakerId)
      : undefined;
  const activeSkillId = speakerSkill ? speakerSkill.id : manualSkillId;

  useEffect(() => {
    const stations = stationsRef.current;
    if (!stations) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      Array.from(stations.children).forEach((card, idx) => {
        gsap.from(card, {
          x: idx % 2 === 0 ? 28 : -28,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            once: true,
          },
        });
      });
    }, stations);

    return () => ctx.revert();
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Bell':
        return Bell;
      case 'Sliders':
        return Sliders;
      case 'Image':
        return ImageIcon;
      case 'BookOpen':
        return BookOpen;
      case 'Puzzle':
        return Puzzle;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="training"
      data-scene-id="scene-05-auditory-skills"
      className="sada-scene bg-sada-surface"
    >
      {/* Connecting Adventure Trail SVG (lightweight static dashed path for smooth scroll FPS) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 1600" fill="none" preserveAspectRatio="none">
          <path
            d="M 600 80 C 980 260, 220 480, 600 720 C 980 960, 220 1220, 600 1520"
            stroke="#7357D9"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="16 18"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Scene Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-3">
            <Sparkles size={14} />
            <span>المشهد 05 · مغامرة المهارات السمعية الخمس</span>
          </div>
          <h2 className="sada-section-title font-black text-sada-ink mb-4">
            خمس محطات سمعية <span className="text-sada-violet">تنبض بالحكاية والتطبيق</span>
          </h2>
          <p className="sada-body-copy text-sada-ink/75 font-medium text-center">
            كل شخصية من أبطال صدى ترافق الطفل في محطة ذات بيئة بصرية مميزة؛ وتُقيّم كل مهارة بصورة نوعية مستقلة دون اشتراط ترتيب موحد.
          </p>
        </div>

        {/* Quick Station Jump Strip */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-3 mb-10 gap-2.5 no-scrollbar">
          {CORE_SKILLS.map((skill) => {
            const Icon = getIcon(skill.iconName);
            const isSelected = skill.id === activeSkillId;
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => {
                  soundEngine.playPop();
                  setManualSkillId(skill.id);
                  document.getElementById(`skill-station-${skill.id}`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-white shadow-md border-transparent ring-2'
                    : 'bg-white/80 border-sada-violet/10 hover:bg-white'
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 0 2px ${skill.color}` : undefined,
                }}
              >
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: skill.color }}
                >
                  <Icon size={16} />
                </span>
                <span className="text-xs font-extrabold text-sada-ink whitespace-nowrap">
                  {skill.id}. {skill.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* 5 Distinct Connected Adventure Stations */}
        <div ref={stationsRef} className="space-y-8">
          {CORE_SKILLS.map((skill, idx) => {
            const Icon = getIcon(skill.iconName);
            const guide = CHARACTERS.find((c) => c.id === skill.guideCharacterId) || CHARACTERS[0];
            const isReversed = idx % 2 === 1;
            const isFocused = skill.id === activeSkillId;
            const isGuideSpeaking = isSceneActive && activeSpeakerId === guide.id;

            return (
              <article
                key={skill.id}
                id={`skill-station-${skill.id}`}
                onClick={() => setManualSkillId(skill.id)}
                className={`rounded-[2rem] border-2 p-5 sm:p-8 transition-all duration-500 shadow-lg bg-white relative overflow-hidden ${
                  isFocused ? 'ring-4' : ''
                }`}
                style={{
                  borderColor: `${skill.color}30`,
                  boxShadow: isFocused ? `0 20px 38px -14px ${skill.color}35, 0 0 0 3px ${skill.color}30` : undefined,
                }}
              >
                {/* Distinct Environmental Mood Strip */}
                <div
                  className="absolute top-0 inset-x-0 h-2"
                  style={{ backgroundColor: skill.color }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                  {/* Text & Clinical Grounding Column */}
                  <div className={`lg:col-span-7 text-right ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-white"
                        style={{ backgroundColor: skill.color }}
                      >
                        <Icon size={13} />
                        <span>{skill.environmentTag}</span>
                      </span>
                      <span className="dir-ltr text-xs font-bold text-sada-ink/55">
                        {skill.englishTitle}
                      </span>
                    </div>

                    <h3 className="sada-card-title font-black text-sada-ink mb-2">
                      {skill.id}. {skill.title}
                    </h3>

                    <p className="text-sm sm:text-base text-sada-ink/80 font-medium leading-relaxed mb-4">
                      {skill.objective}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                      {skill.examples.map((ex, eIdx) => (
                        <div
                          key={eIdx}
                          className="p-3 rounded-2xl bg-sada-surface border border-gray-100 flex items-start gap-2"
                        >
                          <CheckCircle2
                            size={15}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: skill.color }}
                          />
                          <span className="text-xs font-semibold text-sada-ink/85 leading-relaxed">
                            {ex}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-sada-cream-warm border border-sada-yellow/40">
                      <span className="text-xs font-bold text-sada-ink/85">
                        <strong className="text-amber-950">تسجيل الأداء: </strong>
                        {skill.scoringRule}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEngine.playSuccess();
                          onPlayGame?.(skill);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-sm hover:scale-105 transition-transform"
                        style={{ backgroundColor: skill.color }}
                      >
                        <PlayCircle size={15} />
                        <span>جرّب النشاط: {skill.gameTitle}</span>
                      </button>
                    </div>
                  </div>

                  {/* Distinct Character + Real App Screen Visual Stage */}
                  <div
                    className={`lg:col-span-5 flex items-center justify-center gap-4 p-4 sm:p-5 rounded-3xl ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}18 0%, #FFF8ED 100%)`,
                    }}
                  >
                    <CharacterStageActor
                      characterId={guide.id}
                      sizeClass="w-24 sm:w-32"
                      isActiveScene={isSceneActive}
                      isSpeaking={isGuideSpeaking}
                      isDimmed={Boolean(isSceneActive && activeSpeakerId && !isGuideSpeaking)}
                      bubbleText={!isGuideSpeaking ? `رفيق المحطة: ${guide.name}` : undefined}
                    />

                    <div className="w-36 sm:w-44 rounded-3xl bg-sada-ink p-2 shadow-xl border-2 border-gray-800 flex-shrink-0">
                      <img
                        src={skill.screenImage}
                        alt={`شاشة ${skill.title}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto rounded-2xl object-cover"
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Clinical Independence & Scoring Formula Summary */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-sada-violet/15 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <p className="text-xs sm:text-sm font-bold text-sada-ink/80">
            * تُقيّم كل مهارة بصورة مستقلة وفق قدرات الطفل الفردية، ولا يُشترط ترتيب موحد للانتقال بين المهارات.
          </p>
          <span className="text-xs font-extrabold px-4 py-2 rounded-xl bg-sada-cream-warm border border-sada-yellow/40 text-sada-ink">
            نسبة الأداء = (عدد الإجابات الصحيحة ÷ عدد المحاولات المُقيمة) × 100
          </span>
        </div>
      </div>
    </section>
  );
};
