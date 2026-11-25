import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, GraduationCap, CheckCircle2 } from 'lucide-react';
import { TEAM_MEMBERS, type TeamMember } from '../data/sadaData';
import { soundEngine } from '../utils/audioEngine';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

export const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember>(TEAM_MEMBERS[0]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-10-team');

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(grid.children, {
        scale: 0.92,
        y: 22,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 84%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]} ${parts[1][0]}`;
    }
    return name.slice(0, 2);
  };

  return (
    <section
      ref={sectionRef}
      id="team"
      data-scene-id="scene-10-team"
      className="sada-scene bg-sada-cream"
    >
      <div className="max-w-7xl mx-auto">
        {/* Scene Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-3">
            <GraduationCap size={16} />
            <span>المشهد 10 · أبطال صناعة صدى — فريق مشروع التخرج</span>
          </div>
          <h2 className="sada-section-title font-black text-sada-ink mb-4">
            العقول المبدعة <span className="text-sada-teal">وراء فكرة صَـدَى</span>
          </h2>
          <p className="sada-body-copy text-sada-ink/75 font-medium text-center">
            عشر باحثات وباحثين تكاتفوا لإعداد المحتوى العلمي والأدلة الإرشادية والأنشطة التأهيلية الموثقة في مقترح المشروع الرسمي.
          </p>
        </div>

        {/* Omar & Nour Presenting the Team */}
        <div className="flex items-end justify-center gap-8 mb-10">
          <CharacterStageActor
            characterId="omar"
            sizeClass="w-24 sm:w-28"
            isSpeaking={isSceneActive && activeSpeakerId === 'omar'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'omar')}
          />
          <div className="hidden sm:block max-w-md bg-white rounded-3xl p-4 border-2 border-sada-violet/15 shadow-md text-right">
            <div className="flex items-center gap-3 mb-1.5">
              <span
                className="w-8 h-8 rounded-xl text-white font-black text-xs flex items-center justify-center"
                style={{ backgroundColor: selectedMember.color }}
              >
                {selectedMember.id < 10 ? `0${selectedMember.id}` : selectedMember.id}
              </span>
              <h3 className="text-base font-black text-sada-ink">{selectedMember.name}</h3>
            </div>
            <p className="text-xs font-bold mb-1" style={{ color: selectedMember.color }}>
              {selectedMember.role}
            </p>
            <p className="text-xs text-sada-ink/75 leading-relaxed">{selectedMember.contribution}</p>
          </div>
          <CharacterStageActor
            characterId="nour"
            sizeClass="w-24 sm:w-28"
            isSpeaking={isSceneActive && activeSpeakerId === 'nour'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'nour')}
          />
        </div>

        {/* 10 Researchers Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {TEAM_MEMBERS.map((member) => {
            const isSelected = selectedMember.id === member.id;
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => {
                  soundEngine.playPop();
                  setSelectedMember(member);
                }}
                className={`group p-5 rounded-3xl bg-white border-2 transition-all duration-300 text-center flex flex-col justify-between ${
                  isSelected
                    ? 'shadow-xl border-sada-violet ring-2 ring-sada-violet/20'
                    : 'border-sada-violet/10 hover:border-sada-violet/40 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="dir-ltr w-7 h-7 rounded-full bg-sada-lavender text-sada-violet text-xs font-black flex items-center justify-center">
                    {member.id < 10 ? `0${member.id}` : member.id}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: member.color }} />
                </div>

                <div className="my-1 flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md mb-2.5 group-hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}, #27213E)`,
                    }}
                  >
                    <span>{getInitials(member.name)}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-sada-ink leading-snug">
                    {member.name}
                  </h3>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 w-full">
                  <span
                    className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg inline-block mb-1"
                    style={{
                      backgroundColor: `${member.color}18`,
                      color: member.color,
                    }}
                  >
                    {member.role}
                  </span>
                  <p className="text-[11px] text-sada-ink/70 leading-relaxed text-center">
                    {member.contribution}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Academic Attribution Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-sada-violet/15 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-right">
            <div className="w-11 h-11 rounded-2xl bg-sada-violet/10 text-sada-violet flex items-center justify-center flex-shrink-0">
              <Award size={22} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-sada-ink">
                توثيق المسؤوليات العلمية لمشروع التخرج
              </h4>
              <p className="text-xs text-sada-ink/70 font-medium">
                الأسماء والأدوار موثقة بالكامل من الصفحة 2 في وثيقة مقترح مشروع صدى (SADA Concept Proposal).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-sada-teal-dark bg-sada-teal/10 px-4 py-2 rounded-xl">
            <CheckCircle2 size={16} />
            <span>توثيق أكاديمي معتمد</span>
          </div>
        </div>
      </div>
    </section>
  );
};
