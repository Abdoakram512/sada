import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, TrendingUp, Users, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';

export const ProblemSolutionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('solution');

  return (
    <section id="about" className="relative py-28 px-4 md:px-8 bg-sada-surface overflow-hidden">
      {/* Wave Section Transition Divider */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-sada-cream to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-4">
            <Sparkles size={14} />
            <span>فلسفة المشروع والهدف الإنساني</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-sada-ink leading-tight mb-5">
            لماذا وُلد مشروع <span className="text-sada-violet">صَـدَى</span>؟
          </h2>
          <p className="text-base sm:text-lg text-sada-ink/70 leading-relaxed font-medium">
            تأهيل الطفل ضعيف السمع رحلة يومية مشتركة؛ صدى وُجد ليربط التقييم السمعي بالمتابعة المستمرة في بيئة مشجعة تمكّن الطفل، وتدعم أسرته، وتساند أخصائيه.
          </p>
        </div>

        {/* Interactive Toggle Switch */}
        <div className="flex justify-center mb-14">
          <div className="bg-sada-cream p-1.5 rounded-2xl border border-sada-violet/15 flex items-center shadow-inner gap-1">
            <button
              onClick={() => {
                soundEngine.playPop();
                setActiveTab('problem');
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'problem'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-sada-ink/70 hover:text-sada-ink'
              }`}
            >
              <AlertCircle size={16} />
              <span>التحديات السابقة (المشكلة)</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playPop();
                setActiveTab('solution');
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'solution'
                  ? 'bg-sada-teal text-white shadow-md'
                  : 'text-sada-ink/70 hover:text-sada-ink'
              }`}
            >
              <CheckCircle2 size={16} />
              <span>منظومة صدى (الحل التفاعلي)</span>
            </button>
          </div>
        </div>

        {/* Content Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Mascot & App Interaction */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-sada-lavender via-white to-sada-cream-warm p-6 border-2 border-sada-violet/15 shadow-xl flex flex-col items-center justify-center overflow-hidden">
              {/* Organic Sound Blob */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-sada-yellow/30 blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-sada-teal/20 blur-2xl" />

              <img
                src="/assets/group_tablet.png"
                alt="عمر وزين يستكشفان تطبيق صدى"
                className="relative z-10 w-4/5 h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute bottom-4 inset-x-6 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-sada-violet/10 text-center shadow-sm">
                <span className="text-xs font-bold text-sada-ink">
                  «صدى يربط التقييم بالمتابعة في تجربة تفاعلية واحدة»
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Cards based on active tab */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {activeTab === 'problem' ? (
              <div className="space-y-4 animate-fade-in">
                <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      ١
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sada-ink mb-1">
                        صعوبة تنظيم الاستجابات ومقارنتها عبر الجلسات
                      </h3>
                      <p className="text-sm text-sada-ink/70 leading-relaxed">
                        اعتماد التقييمات السمعية على نماذج ورقية متفرقة يجعل تتبع تطور استجابة الطفل لأصوات الكلام عبر الأشهر مهمة معقدة وغير موثقة بدقة رقمية.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      ٢
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sada-ink mb-1">
                        غياب أنشطة تفاعلية جاذبة للمتابعة المنزلية
                      </h3>
                      <p className="text-sm text-sada-ink/70 leading-relaxed">
                        تواجه الأسر صعوبة في تحفيز الطفل في المنزل بأنشطة تتوافق مع قدراته السمعية دون تحويل التدريب إلى جلسة اختبار جافة تُشعر الطفل بالضغط.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      ٣
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sada-ink mb-1">
                        فجوة التواصل بين جلسات الأخصائي وملاحظات الأسرة
                      </h3>
                      <p className="text-sm text-sada-ink/70 leading-relaxed">
                        الحاجة لسجل رقمي موحد يطلع عليه الأخصائي وولي الأمر لتقييم المهارات السمعية بصورة مستقلة وموضوعية مع مراعاة ظروف كل جلسة.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="p-6 rounded-3xl bg-white border border-sada-teal/20 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-sada-teal/10 text-sada-teal flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sada-ink mb-1">
                        تقييمات منظمة وسجل رقمي لكل طفل
                      </h3>
                      <p className="text-sm text-sada-ink/70 leading-relaxed">
                        ملف شخصي موحد يحفظ نتائج أصوات لينج والمهارات السمعية الخمس، مع توثيق التواريخ والظروف ومعدلات الإجابات الصحيحة لحساب دقيق للنسب.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-sada-violet/20 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-sada-violet/10 text-sada-violet flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sada-ink mb-1">
                        ألعاب تعزيزية تفاعلية مدعومة بالمكافآت
                      </h3>
                      <p className="text-sm text-sada-ink/70 leading-relaxed">
                        تحويل التقييم إلى تجربة مشوقة تجمع النجوم والشارات البصرية اللطيفة لرفع دافعية الطفل ومشاركته، دون استخدام الألعاب كأداة تشخيص طبي.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-sada-yellow/40 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-sada-yellow/20 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      <HeartHandshake size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sada-ink mb-1">
                        تكامل واعي بين دور ولي الأمر وتوجيه الأخصائي
                      </h3>
                      <p className="text-sm text-sada-ink/70 leading-relaxed">
                        أدلة استخدام مخصصة لكل من الأسرة والأخصائي توضح اشتراطات البيئة الهادئة وخطوات التدريب الآمنة للحفاظ على استمرارية التأهيل.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scientific disclaimer badge as in PDF */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-3">
              <ShieldCheck className="text-amber-600 flex-shrink-0" size={20} />
              <p className="text-xs text-amber-900 font-medium leading-relaxed">
                <strong className="font-bold">تنويه علمي معتمد:</strong> تطبيق صدى وسيلة مساعدة للتقييم الوظيفي والمتابعة والتدريب السمعي، ولا يحل محل التقييم السمعي الطبي المتخصص أو ضبط السماعات الطبية وزراعة القوقعة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
