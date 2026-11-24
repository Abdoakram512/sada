import React from 'react';
import { Target, CheckCircle2, Sparkles } from 'lucide-react';
import { PROJECT_GOALS } from '../data/sadaData';

export const GoalsSection: React.FC = () => {
  return (
    <section className="relative py-28 px-4 md:px-8 bg-sada-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-4">
            <Target size={14} />
            <span>Goals & Vision · أهداف ورؤية مشروع صدى</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-sada-ink leading-tight mb-4">
            سبعة أهداف محورية <span className="text-sada-violet">توجّه مسار الابتكار</span>
          </h2>
          <p className="text-base sm:text-lg text-sada-ink/75 leading-relaxed font-medium">
            صيغت أهداف صدى وفق احتياجات سريرية وتربوية حقيقية لضمان أثر ملموس ومستدام في حياة الطفل ضعيف السمع.
          </p>
        </div>

        {/* 7 Goals Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PROJECT_GOALS.map((goal, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl bg-white border border-sada-violet/15 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                idx === 6 ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-br from-white via-sada-lavender/20 to-white' : ''
              }`}
            >
              {/* Top Row: Number & Color Dot */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-mono text-2xl font-black opacity-80"
                  style={{ color: goal.color }}
                >
                  {goal.number}
                </span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: goal.color }}
                />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-sada-ink mb-2">
                  {goal.title}
                </h3>
                <p className="text-xs sm:text-sm text-sada-ink/70 leading-relaxed font-medium">
                  {goal.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-sada-ink/60">
                <CheckCircle2 size={14} style={{ color: goal.color }} />
                <span>هدف تشغيلي معتمد في المشروع</span>
              </div>
            </div>
          ))}
        </div>

        {/* Target Audience Showcase Banner from PDF Page 4 */}
        <div className="bg-gradient-to-r from-sada-ink via-[#332A52] to-sada-ink text-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-right">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-sada-yellow text-xs font-bold mb-3 border border-white/15">
                <Sparkles size={13} />
                <span>الفئة المستهدفة الرئيسية</span>
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white mb-3">
                لمن صُممت منظومة صَـدَى؟
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium mb-4">
                الأطفال ضعاف السمع من مستخدمي <strong className="text-sada-yellow font-bold">السماعات الطبية</strong> أو <strong className="text-sada-teal-light font-bold">زراعة القوقعة الإلكترونية</strong>، مع مراعاة دقيقة للفروق الفردية في القدرات السمعية واللغوية، حيث يختار الأخصائي الأنشطة الملائمة لكل طفل.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="text-xs font-bold text-sada-yellow uppercase tracking-widest mb-1">
                شعار المنظومة
              </span>
              <p className="text-lg font-black text-white leading-snug">
                «ألن كل استجابة صوتية تستحق أن تُسمع وتُتابع»
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
