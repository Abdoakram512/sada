import React from 'react';
import {
  Sparkles,
  Layers,
  Heart,
  BarChart3,
  Award,
  Users2,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

export const SadaExperienceSection: React.FC = () => {
  const features = [
    {
      title: 'تقييم أصوات لينج الستة',
      desc: 'فحص دوري سريع يغطي نطاقات التردد الأساسية من 250 إلى 8000 هرتز للتأكد من التقاط الطفل لأصوات الكلام.',
      icon: Sparkles,
      color: 'bg-sada-violet text-white',
      border: 'border-sada-violet/20'
    },
    {
      title: 'تنمية المهارات السمعية الخمس',
      desc: 'مسار تأهيلي مستقل يبدأ بإدراك الصوت والانتباه، ثم التمييز، والتعرف، والفهم، والإغلاق السمعي.',
      icon: Layers,
      color: 'bg-sada-teal text-white',
      border: 'border-sada-teal/20'
    },
    {
      title: 'لوحة تقارير ومقارنة الجلسات',
      desc: 'رصد فوري لنسب الاستجابة (مثل 4/6 للأصوات و78% للمهارات) مع إمكانية مراجعة الفروق بين التقييم القبلي والبعدي.',
      icon: BarChart3,
      color: 'bg-sada-coral text-white',
      border: 'border-sada-coral/20'
    },
    {
      title: 'نظام تعزيز ونقاط تشجيعية',
      desc: 'نجوم وشارات ومكافآت بصرية لطيفة لرفع دافعية الطفل دون استخدامها كأداة تشخيص طبي.',
      icon: Award,
      color: 'bg-amber-500 text-white',
      border: 'border-amber-300'
    },
    {
      title: 'دليل استخدام مخصص للأسرة',
      desc: 'إرشادات عملية لتهيئة البيئة المنزلية الخالية من المشتتات والتعامل الواعي مع استجابات الطفل.',
      icon: Heart,
      color: 'bg-rose-500 text-white',
      border: 'border-rose-200'
    },
    {
      title: 'دليل مهني منظم للأخصائي',
      desc: 'متابعة التاريخ التراكمي للطفل، تحديد المهام الملائمة، وتعديل الخطة التأهيلية وفق معطيات الجلسات.',
      icon: FileCheck2,
      color: 'bg-indigo-600 text-white',
      border: 'border-indigo-200'
    }
  ];

  return (
    <section className="relative py-28 px-4 md:px-8 bg-sada-cream-warm overflow-hidden">
      {/* Background Soft Blobs */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-sada-violet/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-sada-teal/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-4">
            <Users2 size={14} />
            <span>The SADA Ecosystem · المنظومة الشاملة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-sada-ink leading-tight mb-4">
            كل ما يحتاجه الطفل في <span className="text-sada-violet">تجربة واحدة متكاملة</span>
          </h2>
          <p className="text-base sm:text-lg text-sada-ink/75 leading-relaxed font-medium">
            مستوحى من فلسفة المنصات التفاعلية الموحدة؛ يجمع صدى الأدوات التشخيصية الوظيفية، والأنشطة التدريبية، والتقارير التحليلية، ودعم الأطراف المشاركة في بيئة واحدة آمنة.
          </p>
        </div>

        {/* Central Illustrated Hero Composition with 6 Expanding Feature Cards (Nex Play Pass Metaphor) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Feature Column (3 Cards) */}
          <div className="lg:col-span-4 space-y-4">
            {features.slice(0, 3).map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl bg-white border ${f.border} shadow-sm hover:shadow-lg hover:-translate-x-1 transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${f.color} shadow-sm`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="text-base font-extrabold text-sada-ink">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-sada-ink/70 leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Center Mascot Hub: High Fiving Friends (Celebration of Progress) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center my-6 lg:my-0">
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] rounded-[3rem] bg-gradient-to-tr from-sada-lavender via-white to-sada-cream p-6 border-2 border-sada-violet/20 shadow-2xl flex flex-col items-center justify-end overflow-hidden group">
              {/* Radial Aura */}
              <div className="absolute inset-0 bg-radial-gradient from-sada-yellow/30 via-transparent to-transparent opacity-60 animate-pulse-glow" />

              <img
                src="/assets/group_highfive.png"
                alt="سارة ومريم تحتفلان بالنجاح"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />

              {/* Bottom Tag */}
              <div className="absolute top-4 inset-x-6 text-center z-20">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-black text-sada-violet border border-sada-violet/15 shadow-sm">
                  <CheckCircle2 size={13} className="text-sada-teal" />
                  <span>تعاون يثمر استجابة ونماء</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Feature Column (3 Cards) */}
          <div className="lg:col-span-4 space-y-4">
            {features.slice(3, 6).map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl bg-white border ${f.border} shadow-sm hover:shadow-lg hover:translate-x-1 transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${f.color} shadow-sm`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="text-base font-extrabold text-sada-ink">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-sada-ink/70 leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
