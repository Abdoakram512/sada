import React, { useState } from 'react';
import {
  Bell,
  Sliders,
  Image as ImageIcon,
  BookOpen,
  Puzzle,
  Volume2,
  Sparkles,
  CheckCircle2,
  PlayCircle
} from 'lucide-react';
import { AUDITORY_SKILLS } from '../data/sadaData';
import type { AuditorySkill } from '../data/sadaData';
import { soundEngine } from '../utils/audioEngine';

interface TrainingJourneySectionProps {
  onPlayGame?: (skill: AuditorySkill) => void;
}

export const TrainingJourneySection: React.FC<TrainingJourneySectionProps> = ({
  onPlayGame
}) => {
  const [activeSkillId, setActiveSkillId] = useState<number>(1);
  const activeSkill = AUDITORY_SKILLS.find((s) => s.id === activeSkillId) || AUDITORY_SKILLS[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Bell': return Bell;
      case 'Sliders': return Sliders;
      case 'Image': return ImageIcon;
      case 'BookOpen': return BookOpen;
      case 'Puzzle': return Puzzle;
      case 'Volume2': return Volume2;
      default: return Sparkles;
    }
  };

  return (
    <section id="training" className="relative py-28 px-4 md:px-8 bg-sada-surface overflow-hidden">
      {/* Background Organic Pathway SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
          <path
            d="M-100,200 C300,50 500,450 800,250 C1100,50 1300,600 1600,400"
            stroke="#7357D9"
            strokeWidth="32"
            strokeLinecap="round"
            strokeDasharray="20 20"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-4">
            <Sparkles size={14} />
            <span>خارطة تنمية المهارات السمعية · Five Auditory Skills</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-sada-ink leading-tight mb-4">
            رحلة الصعود عبر <span className="text-sada-violet">مستويات الاستماع</span>
          </h2>
          <p className="text-base sm:text-lg text-sada-ink/75 leading-relaxed font-medium">
            تدرج علمي مدروس ينقل الطفل من مجرد الانتباه لوجود الصوت وصولاً إلى الإغلاق السمعي والفهم المركب، مع مراعاة الفروق الفردية لكل بطل.
          </p>
        </div>

        {/* The Animated Auditory Milestone Path (Horizontal / Stepper Tabs) */}
        <div className="flex items-center justify-between overflow-x-auto pb-6 mb-12 gap-3 no-scrollbar">
          {AUDITORY_SKILLS.map((skill, index) => {
            const Icon = getIcon(skill.iconName);
            const isActive = skill.id === activeSkillId;

            return (
              <button
                key={skill.id}
                onClick={() => {
                  soundEngine.playPop();
                  setActiveSkillId(skill.id);
                }}
                className={`flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-white shadow-xl scale-105 border-transparent ring-4'
                    : 'bg-white/80 hover:bg-white hover:scale-102 border-sada-violet/10 text-sada-ink/70'
                }`}
                style={{
                  boxShadow: isActive ? `0 15px 30px -10px ${skill.color}40, 0 0 0 4px ${skill.color}50` : undefined
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm"
                  style={{ backgroundColor: skill.color }}
                >
                  <Icon size={18} />
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-gray-100 text-sada-ink/60">
                      {index === 5 ? 'إضافي' : `المستوى ${skill.id}`}
                    </span>
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm text-sada-ink block mt-0.5 whitespace-nowrap">
                    {skill.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Skill Stage Adventure Card */}
        <div className="bg-white rounded-[2.5rem] border-2 border-sada-violet/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Accent Ribbon Border Top */}
          <div
            className="absolute top-0 inset-x-0 h-3 transition-colors duration-500"
            style={{ backgroundColor: activeSkill.color }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Skill Objectives & Application Examples */}
            <div className="lg:col-span-7 flex flex-col text-right">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-black px-3 py-1 rounded-lg"
                  style={{
                    backgroundColor: `${activeSkill.color}15`,
                    color: activeSkill.color
                  }}
                >
                  {activeSkill.englishTitle}
                </span>
                <span className="text-xs text-sada-ink/50 font-bold">
                  تقييم نوعي مستقل
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-sada-ink mb-4">
                {activeSkill.title}
              </h3>

              <div className="p-4 rounded-2xl bg-sada-surface border border-sada-violet/10 mb-6">
                <span className="text-xs font-bold text-sada-ink/50 uppercase tracking-wider block mb-1">
                  هدف التقييم العلمي:
                </span>
                <p className="text-sm sm:text-base text-sada-ink/85 font-medium leading-relaxed">
                  {activeSkill.objective}
                </p>
              </div>

              {/* Task Examples from the PDF */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-bold text-sada-ink/50 uppercase tracking-wider block">
                  أمثلة لمهام داخل التطبيق:
                </span>
                {activeSkill.examples.map((ex, eIdx) => (
                  <div
                    key={eIdx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-2xs"
                  >
                    <CheckCircle2
                      size={16}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: activeSkill.color }}
                    />
                    <span className="text-xs sm:text-sm text-sada-ink/80 font-medium">
                      {ex}
                    </span>
                  </div>
                ))}
              </div>

              {/* Scoring calculation formula box */}
              <div className="p-4 rounded-2xl bg-sada-cream-warm border border-sada-yellow/40 flex items-center justify-between gap-3">
                <div className="text-xs text-sada-ink/80">
                  <strong className="text-amber-900 font-bold block mb-0.5">كيف تُحسب النتيجة؟</strong>
                  <span>{activeSkill.scoringRule}</span>
                </div>
                <div className="hidden sm:block text-right flex-shrink-0 bg-white/80 px-3 py-1.5 rounded-lg border border-sada-yellow/30 font-mono text-[11px] font-bold text-sada-ink">
                  نسبة الأداء = (الصحيحة ÷ المحاولات) × 100
                </div>
              </div>
            </div>

            {/* Right: Gamified Mini Mission Card (Connecting with Chapter 07) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className="w-full rounded-3xl p-6 sm:p-8 text-center text-white relative shadow-xl overflow-hidden flex flex-col items-center justify-between min-h-[360px]"
                style={{
                  background: `linear-gradient(145deg, ${activeSkill.color}, #27213E)`
                }}
              >
                {/* Floating game badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-4">
                  <Sparkles size={13} />
                  <span>النشاط التفاعلي المعزز</span>
                </div>

                <div className="my-auto">
                  <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-inner">
                    {React.createElement(getIcon(activeSkill.iconName), { size: 36, className: 'text-white' })}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black mb-2">
                    {activeSkill.gameTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-xs font-medium">
                    {activeSkill.gameDescription}
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playSuccess();
                    if (onPlayGame) onPlayGame(activeSkill);
                  }}
                  className="w-full mt-6 py-3.5 rounded-2xl bg-white hover:bg-sada-cream text-sada-ink font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 hover:scale-102 active:scale-98 transition-all"
                >
                  <PlayCircle size={18} style={{ color: activeSkill.color }} />
                  <span>انتقل لتجربة اللعبة في عالم الألعاب</span>
                </button>
              </div>

              {/* Individual flexibility note */}
              <p className="text-[11px] text-sada-ink/60 text-center mt-3 font-semibold">
                * تُراعى الفروق الفردية بين الأطفال؛ ولا يُشترط ترتيب موحد للانتقال بين المهارات.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
