import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, Info, Sparkles, RefreshCw, BarChart2 } from 'lucide-react';
import { LING_SOUNDS } from '../data/sadaData';
import type { LingSound } from '../data/sadaData';
import { soundEngine } from '../utils/audioEngine';

export const LingSixSection: React.FC = () => {
  const [selectedSound, setSelectedSound] = useState<LingSound>(LING_SOUNDS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // Track user interactive simulation of the test (as shown on PDF page 5 & 6)
  const [responses, setResponses] = useState<Record<string, 'responded' | 'not-responded' | null>>({
    '/m/': 'responded',
    '/u/': 'responded',
    '/a/': 'responded',
    '/i/': 'responded',
    '/ʃ/': null,
    '/s/': null,
  });

  const handlePlaySound = (sound: LingSound) => {
    setIsPlaying(true);
    soundEngine.playLingSound(sound.symbol, 0.9);
    setTimeout(() => {
      setIsPlaying(false);
    }, 900);
  };

  const handleRecordResponse = (symbol: string, status: 'responded' | 'not-responded') => {
    soundEngine.playPop();
    setResponses((prev) => ({
      ...prev,
      [symbol]: status
    }));
  };

  const handleResetSimulation = () => {
    soundEngine.playPop();
    setResponses({
      '/m/': null,
      '/u/': null,
      '/a/': null,
      '/i/': null,
      '/ʃ/': null,
      '/s/': null,
    });
  };

  // Calculate score like in PDF Page 6: (responded / 6) * 100
  const totalEvaluated = Object.values(responses).filter((v) => v !== null).length;
  const totalResponded = Object.values(responses).filter((v) => v === 'responded').length;
  const scorePercent = totalEvaluated > 0 ? ((totalResponded / 6) * 100).toFixed(1) : '0.0';

  return (
    <section id="ling-test" className="relative py-28 px-4 md:px-8 bg-sada-cream overflow-hidden">
      {/* Decorative waveform rings */}
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-4">
            <Sparkles size={14} />
            <span>Ling Six Sound Check · اختبار أصوات لينج الستة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-sada-ink leading-tight mb-4">
            ستة أصوات تغطي <span className="text-sada-teal">كامل نطاق الكلام</span>
          </h2>
          <p className="text-base sm:text-lg text-sada-ink/75 leading-relaxed font-medium">
            يُقدَّم كل صوت على حدة لمعرفة ما إذا كان الطفل يلتقط الترددات المختلفة من المنخفضة وحتى الحادة، وتُحفظ الاستجابات في سجله لمقارنة الأداء بمرور الوقت.
          </p>
        </div>

        {/* The 6 Interactive Sound Tokens (Sound Bubbles) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {LING_SOUNDS.map((sound) => {
            const isSelected = selectedSound.symbol === sound.symbol;
            const respStatus = responses[sound.symbol];

            return (
              <button
                key={sound.symbol}
                onClick={() => {
                  soundEngine.playPop();
                  setSelectedSound(sound);
                }}
                className={`relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-3xl border-2 transition-all duration-300 text-center ${
                  isSelected
                    ? 'bg-white shadow-xl scale-105 border-transparent ring-4'
                    : 'bg-white/80 hover:bg-white hover:scale-102 border-sada-violet/10'
                }`}
                style={{
                  boxShadow: isSelected ? `0 20px 30px -10px ${sound.color}40, 0 0 0 4px ${sound.color}50` : undefined
                }}
              >
                {/* Response indicator dot */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${sound.color}15`,
                      color: sound.color
                    }}
                  >
                    {sound.category === 'low' ? 'منخفض' : sound.category === 'mid' ? 'متوسط' : 'مرتفع'}
                  </span>

                  {respStatus === 'responded' && (
                    <span className="flex items-center text-xs font-bold text-emerald-600">
                      <CheckCircle2 size={14} />
                    </span>
                  )}
                  {respStatus === 'not-responded' && (
                    <span className="flex items-center text-xs font-bold text-rose-500">
                      <XCircle size={14} />
                    </span>
                  )}
                </div>

                {/* Big Phonetic Symbol */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-black text-2xl sm:text-3xl text-white mb-3 shadow-md transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: sound.color }}
                >
                  {sound.symbol}
                </div>

                {/* Sound Name & Freq */}
                <span className="font-extrabold text-sm text-sada-ink line-clamp-1 mb-1">
                  {sound.arabicName}
                </span>
                <span className="text-[11px] text-sada-ink/60 font-semibold dir-ltr">
                  {sound.frequencyRange}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Sound Focus Card & Interactive Session Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Sound Detailed Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-sada-violet/15 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 pointer-events-none"
              style={{ backgroundColor: selectedSound.color }}
            />

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md"
                  style={{ backgroundColor: selectedSound.color }}
                >
                  {selectedSound.symbol}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-sada-ink">
                    {selectedSound.arabicName}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-sada-teal">
                    {selectedSound.frequencyRange}
                  </span>
                </div>
              </div>

              {/* User-initiated Audio Playback Button */}
              <button
                onClick={() => handlePlaySound(selectedSound)}
                disabled={isPlaying}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl font-extrabold text-sm text-white shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                style={{ backgroundColor: selectedSound.color }}
              >
                <Volume2 size={18} className={isPlaying ? 'animate-bounce' : ''} />
                <span>{isPlaying ? 'جاري الاستماع...' : 'استمع إلى الصوت'}</span>
              </button>
            </div>

            {/* Sound Spectrum Explanation */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold text-sada-ink/50 uppercase tracking-wider mb-1">
                  الوصف الصوتي والترددي
                </h4>
                <p className="text-sm sm:text-base text-sada-ink/80 leading-relaxed font-medium">
                  {selectedSound.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sada-surface border border-sada-violet/10">
                <h4 className="text-xs font-bold text-sada-violet flex items-center gap-1.5 mb-1">
                  <Info size={14} />
                  <span>الأهمية في متابعة القوقعة والسماعة</span>
                </h4>
                <p className="text-xs sm:text-sm text-sada-ink/70 leading-relaxed">
                  {selectedSound.clinicalNote}
                </p>
              </div>
            </div>

            {/* Simulation Response Logger (Just like the app interface on PDF Page 5) */}
            <div className="bg-sada-lavender/30 p-4 sm:p-5 rounded-2xl border border-sada-violet/15 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-extrabold text-sada-ink">
                سجّل استجابة الطفل لهذا الصوت في الجلسة:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRecordResponse(selectedSound.symbol, 'responded')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    responses[selectedSound.symbol] === 'responded'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                  }`}
                >
                  <CheckCircle2 size={14} />
                  <span>استجاب</span>
                </button>
                <button
                  onClick={() => handleRecordResponse(selectedSound.symbol, 'not-responded')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    responses[selectedSound.symbol] === 'not-responded'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
                  }`}
                >
                  <XCircle size={14} />
                  <span>لم يستجب</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Results Overview & Scientific Formula (PDF Page 6) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-sada-violet/15 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <BarChart2 className="text-sada-violet" size={20} />
                <h3 className="text-lg font-black text-sada-ink">
                  تحليل النتائج ومقارنتها
                </h3>
              </div>
              <button
                onClick={handleResetSimulation}
                title="إعادة تعيين المحاكاة"
                className="p-1.5 rounded-lg text-sada-ink/50 hover:text-sada-ink hover:bg-gray-100 transition-colors"
              >
                <RefreshCw size={14} />
              </button>
            </div>

            {/* Score Ring Summary */}
            <div className="flex items-center justify-around p-4 rounded-2xl bg-sada-surface border border-sada-violet/10 mb-6">
              <div className="text-center">
                <span className="text-3xl font-black text-sada-violet">{totalResponded}/6</span>
                <p className="text-xs text-sada-ink/60 font-semibold mt-0.5">أصوات استجاب لها</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="text-center">
                <span className="text-3xl font-black text-sada-teal">{scorePercent}%</span>
                <p className="text-xs text-sada-ink/60 font-semibold mt-0.5">نسبة الاستجابة</p>
              </div>
            </div>

            {/* Scientific Formula Box (from PDF Page 6) */}
            <div className="p-4 rounded-2xl bg-sada-cream-warm border border-sada-yellow/40 mb-5">
              <span className="text-xs font-bold text-amber-900 block mb-1">
                معادلة حساب النتيجة المعتمدة:
              </span>
              <p className="text-xs text-sada-ink/80 font-mono bg-white/70 px-3 py-1.5 rounded-lg border border-sada-yellow/30 dir-ltr text-center font-bold">
                نسبة الاستجابة = (عدد الأصوات المستجاب لها ÷ 6) × 100
              </p>
            </div>

            {/* Step-by-Step Clinical Assessment Steps from PDF Page 5 */}
            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-sada-ink/50 uppercase tracking-wider block mb-2">
                خطوات إجراء التقييم الوظيفي:
              </span>
              {[
                'اختيار ملف الطفل وتهيئة البيئة المناسبة الهادئة.',
                'تقديم أصوات لينج الستة كل صوت منفصلاً وبدون إشارات بصرية.',
                'ملاحظة الاستجابة السلوكية بدقة وتحديد (استجاب) أو (لم يستجب).',
                'حفظ النتائج ومراجعة منحنى التغير الزمني مع الأخصائي.'
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-sada-ink/75">
                  <span className="w-4 h-4 rounded-full bg-sada-violet/15 text-sada-violet font-bold flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Disclaimer Alert */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-sada-ink/65 leading-relaxed">
              <strong className="text-sada-ink font-bold">تنبيه علمي:</strong> تسجيل استجابة الطفل لا يساوي قياس عتبة السمع أو تشخيص كفاءة السماعة أو القوقعة؛ وتُتبع إرشادات الأخصائي بشأن تقديم الأصوات.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
