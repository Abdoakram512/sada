import React, { useState } from 'react';
import { Award, GraduationCap, CheckCircle2 } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/sadaData';
import type { TeamMember } from '../data/sadaData';
import { soundEngine } from '../utils/audioEngine';

export const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]} ${parts[1][0]}`;
    }
    return name.slice(0, 2);
  };

  return (
    <section id="team" className="relative py-28 px-4 md:px-8 bg-sada-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-4">
            <GraduationCap size={16} />
            <span>Project Team · فريق عمل مشروع التخرج</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-sada-ink leading-tight mb-4">
            نخبة العمل المبدعة <span className="text-sada-teal">وراء صَـدَى</span>
          </h2>
          <p className="text-base sm:text-lg text-sada-ink/75 leading-relaxed font-medium">
            عشر باحثات وباحثين تكاتفوا لإعداد المحتوى العلمي والأدلة الإرشادية والأنشطة التأهيلية الموثقة في ملف المشروع، إيماناً بحق كل طفل في تواصل ناطق ومسموع.
          </p>
        </div>

        {/* 10 Students Editorial Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-16">
          {TEAM_MEMBERS.map((member) => {
            const isSelected = selectedMember?.id === member.id;

            return (
              <div
                key={member.id}
                onClick={() => {
                  soundEngine.playPop();
                  setSelectedMember(isSelected ? null : member);
                }}
                className={`group p-5 rounded-3xl bg-white border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'shadow-xl scale-102 border-sada-violet ring-2 ring-sada-violet/20'
                    : 'border-sada-violet/10 hover:border-sada-violet/40 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Accent top pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-7 h-7 rounded-full bg-sada-lavender text-sada-violet text-xs font-black flex items-center justify-center">
                    {member.id < 10 ? `0${member.id}` : member.id}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: member.color }}
                  />
                </div>

                {/* Editorial Portrait Avatar with Monogram Typography */}
                <div className="my-2 flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md mb-3 transform group-hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}, #27213E)`
                    }}
                  >
                    <span>{getInitials(member.name)}</span>
                  </div>
                  <h3 className="text-base font-black text-sada-ink text-center leading-snug line-clamp-2">
                    {member.name}
                  </h3>
                </div>

                {/* Role / Responsibility Badge */}
                <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                  <span
                    className="text-[11px] font-extrabold px-2 py-0.5 rounded-lg inline-block line-clamp-1"
                    style={{
                      backgroundColor: `${member.color}15`,
                      color: member.color
                    }}
                  >
                    {member.role}
                  </span>
                  <p className="text-[10px] text-sada-ink/60 mt-1 line-clamp-2 font-medium">
                    {member.contribution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner / Academic Integrity Note */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-sada-violet/15 shadow-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-sada-violet/10 text-sada-violet flex items-center justify-center flex-shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-sada-ink">
                توثيق المسؤوليات الأكاديمية لمشروع التخرج
              </h4>
              <p className="text-xs sm:text-sm text-sada-ink/70 font-medium">
                تم استخراج وتنسيق أسماء الطالبات والطلبة وأدوارهم بدقة 100% من الصفحة 2 في وثيقة مقترح المشروع الرسمية (SADA Graduation Project).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-sada-teal bg-sada-teal/10 px-4 py-2 rounded-xl">
            <CheckCircle2 size={16} />
            <span>توثيق أكاديمي معتمد</span>
          </div>
        </div>
      </div>
    </section>
  );
};
