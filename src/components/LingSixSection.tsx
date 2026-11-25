import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, CheckCircle2, XCircle, Info, Sparkles, RefreshCw, BarChart2 } from 'lucide-react';
import { LING_SOUNDS, type LingSound } from '../data/sadaData';
import { soundEngine } from '../utils/audioEngine';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

export const LingSixSection: React.FC = () => {
  const [selectedSound, setSelectedSound] = useState<LingSound>(LING_SOUNDS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [responses, setResponses] = useState<Record<string, 'responded' | 'not-responded' | null>>({
    '/m/': 'responded',
    '/u/': 'responded',
    '/a/': 'responded',
    '/i/': 'responded',
    '/ʃ/': null,
    '/s/': null,
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const orbsRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-04-ling-six');

  useEffect(() => {
    const section = sectionRef.current;
    const orbs = orbsRef.current;
    if (!section || !orbs) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(orbs.children, {
        scale: 0.84,
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: orbs,
          start: 'top 82%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handlePlaySound = (sound: LingSound) => {
    setIsPlaying(true);
    soundEngine.playLingSound(sound.symbol, 0.9);
    window.setTimeout(() => {
      setIsPlaying(false);
    }, 900);
  };

  const handleRecordResponse = (symbol: string, status: 'responded' | 'not-responded') => {
    soundEngine.playPop();
    setResponses((prev) => ({
      ...prev,
      [symbol]: status,
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

  const totalEvaluated = Object.values(responses).filter((v) => v !== null).length;
  const totalResponded = Object.values(responses).filter((v) => v === 'responded').length;
  const scorePercent = totalEvaluated > 0 ? ((totalResponded / 6) * 100).toFixed(1) : '0.0';

  return (
    <section
      ref={sectionRef}
      id="ling-test"
      data-scene-id="scene-04-ling-six"
      className="sada-scene bg-sada-cream"
    >
      <div className="max-w-7xl mx-auto">
        {/* Scene Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-lavender text-sada-violet text-xs font-bold mb-3">
            <Sparkles size={14} />
            <span>المشهد 04 · تقييم الاستجابة لأصوات لينج الستة</span>
          </div>
          <h2 className="sada-section-title font-black text-sada-ink mb-4">
            ستة أصوات تغطي <span className="text-sada-teal">نطاقات الكلام الأساسية</span>
          </h2>
          <p className="sada-body-copy text-sada-ink/75 font-medium text-center">
            يُقدَّم كل صوت على حدة لمتابعة ما إذا كان الطفل يلتقط الترددات المنخفضة والمتوسطة والمرتفعة، وتُحفظ الاستجابات في ملفه للمقارنة عبر الوقت.
          </p>
        </div>

        {/* Characters: Maryam & Zain */}
        <div className="flex items-end justify-center gap-8 mb-10">
          <CharacterStageActor
            characterId="maryam"
            sizeClass="w-24 sm:w-28"
            isSpeaking={isSceneActive && activeSpeakerId === 'maryam'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'maryam')}
          />
          <CharacterStageActor
            characterId="zain"
            sizeClass="w-24 sm:w-28"
            isSpeaking={isSceneActive && activeSpeakerId === 'zain'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'zain')}
          />
        </div>

        {/* 6 Interactive Sound Tokens */}
        <div ref={orbsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {LING_SOUNDS.map((sound) => {
            const isSelected = selectedSound.symbol === sound.symbol;
            const respStatus = responses[sound.symbol];

            return (
              <button
                key={sound.symbol}
                type="button"
                onClick={() => {
                  soundEngine.playPop();
                  setSelectedSound(sound);
                }}
                className={`relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-3xl border-2 transition-all duration-300 text-center ${
                  isSelected
                    ? 'bg-white shadow-xl border-transparent ring-4'
                    : 'bg-white/85 hover:bg-white border-sada-violet/10'
                }`}
                style={{
                  boxShadow: isSelected
                    ? `0 18px 28px -10px ${sound.color}40, 0 0 0 3px ${sound.color}55`
                    : undefined,
                }}
              >
                <div className="w-full flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${sound.color}18`,
                      color: sound.color,
                    }}
                  >
                    {sound.category === 'low' ? 'منخفض' : sound.category === 'mid' ? 'متوسط' : 'مرتفع'}
                  </span>

                  {respStatus === 'responded' && (
                    <span className="text-emerald-600" aria-label="استجاب">
                      <CheckCircle2 size={15} />
                    </span>
                  )}
                  {respStatus === 'not-responded' && (
                    <span className="text-rose-500" aria-label="لم يستجب">
                      <XCircle size={15} />
                    </span>
                  )}
                </div>

                <div
                  className="dir-ltr w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-black text-2xl sm:text-3xl text-white mb-3 shadow-md transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: sound.color }}
                >
                  {sound.symbol}
                </div>

                <span className="font-extrabold text-xs sm:text-sm text-sada-ink mb-1">
                  {sound.arabicName}
                </span>
                <span className="text-[11px] text-sada-ink/65 font-semibold">
                  {sound.frequencyRange}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Sound Card + Interactive Session Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-sada-violet/15 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div
                  className="dir-ltr w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md"
                  style={{ backgroundColor: selectedSound.color }}
                >
                  {selectedSound.symbol}
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-black text-sada-ink">
                    {selectedSound.arabicName}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-sada-teal">
                    {selectedSound.frequencyRange}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handlePlaySound(selectedSound)}
                disabled={isPlaying}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm text-white shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
                style={{ backgroundColor: selectedSound.color }}
              >
                <Volume2 size={18} className={isPlaying ? 'animate-pulse' : ''} />
                <span>{isPlaying ? 'جاري التشغيل التوضيحي...' : 'تشغيل مثال صوتي توضيحي'}</span>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-extrabold text-sada-ink/60 mb-1">
                  الوصف الصوتي والترددي
                </h4>
                <p className="text-sm sm:text-base text-sada-ink/85 leading-relaxed font-medium">
                  {selectedSound.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sada-surface border border-sada-violet/10">
                <h4 className="text-xs font-bold text-sada-violet flex items-center gap-1.5 mb-1">
                  <Info size={14} />
                  <span>الأهمية في المتابعة الوظيفية</span>
                </h4>
                <p className="text-xs sm:text-sm text-sada-ink/75 leading-relaxed">
                  {selectedSound.clinicalNote}
                </p>
              </div>

              <p className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200">
                ملاحظة تعليمية: المثال الصوتي أعلاه تقريب تركيبي عبر المتصفح للتوضيح، وليس تسجيلاً معايرَ الشدة للاستخدام السريري.
              </p>
            </div>

            <div className="bg-sada-lavender/35 p-4 sm:p-5 rounded-2xl border border-sada-violet/15 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-extrabold text-sada-ink">
                محاكاة تسجيل استجابة الطفل لهذا الصوت:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
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
                  type="button"
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

          <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-sada-violet/15 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <BarChart2 className="text-sada-violet" size={20} />
                <h3 className="text-lg font-black text-sada-ink">
                  تحليل نتائج التقييم ومقارنتها
                </h3>
              </div>
              <button
                type="button"
                onClick={handleResetSimulation}
                title="إعادة تعيين المحاكاة"
                aria-label="إعادة تعيين المحاكاة"
                className="p-1.5 rounded-lg text-sada-ink/55 hover:text-sada-ink hover:bg-gray-100 transition-colors"
              >
                <RefreshCw size={15} />
              </button>
            </div>

            <div className="flex items-center justify-around p-4 rounded-2xl bg-sada-surface border border-sada-violet/10 mb-5">
              <div className="text-center">
                <span className="dir-ltr inline-block text-3xl font-black text-sada-violet">
                  {totalResponded}/6
                </span>
                <p className="text-xs text-sada-ink/65 font-semibold mt-0.5">أصوات استجاب لها</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="text-center">
                <span className="dir-ltr inline-block text-3xl font-black text-sada-teal">
                  {scorePercent}%
                </span>
                <p className="text-xs text-sada-ink/65 font-semibold mt-0.5">نسبة الاستجابة</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sada-cream-warm border border-sada-yellow/45 mb-5">
              <span className="text-xs font-bold text-amber-950 block mb-1.5">
                معادلة حساب النتيجة المعتمدة:
              </span>
              <p className="text-xs text-sada-ink bg-white/85 px-3 py-2 rounded-lg border border-sada-yellow/35 text-center font-bold">
                نسبة الاستجابة = (عدد الأصوات المستجاب لها ÷ 6) × 100
              </p>
            </div>

            <div className="space-y-2 mb-5">
              <span className="text-xs font-extrabold text-sada-ink/65 block mb-2">
                خطوات إجراء التقييم الوظيفي:
              </span>
              {[
                'اختيار ملف الطفل وتهيئة البيئة المناسبة الهادئة.',
                'تقديم أصوات لينج الستة كل صوت منفصلاً وبدون إشارات بصرية.',
                'ملاحظة الاستجابة وتحديد (استجاب) أو (لم يستجب).',
                'حفظ النتائج ومقارنتها عبر الجلسات مع الأخصائي.',
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-sada-ink/80">
                  <span className="w-5 h-5 rounded-full bg-sada-violet/15 text-sada-violet font-black flex items-center justify-center flex-shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-sada-ink/75 leading-relaxed">
              <strong className="text-sada-ink font-bold">تنبيه علمي:</strong> تسجيل استجابة الطفل لا يساوي قياس عتبة السمع أو تشخيص كفاءة السماعة أو القوقعة؛ وتُتبع إرشادات الأخصائي بشأن تقديم الأصوات.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
