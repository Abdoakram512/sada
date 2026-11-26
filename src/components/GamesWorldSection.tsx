import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Gamepad2,
  Trophy,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Star,
  Play,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { AUDITORY_SKILLS, type AuditorySkill } from '../data/sadaData';
import { soundEngine } from '../utils/audioEngine';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

interface GamesWorldSectionProps {
  selectedSkillId?: number;
  onSelectSkillId?: (id: number) => void;
}

export const GamesWorldSection: React.FC<GamesWorldSectionProps> = ({
  selectedSkillId = 1,
  onSelectSkillId,
}) => {
  const activeTab = Math.max(0, AUDITORY_SKILLS.findIndex((s) => s.id === selectedSkillId));
  const selectedGame = AUDITORY_SKILLS[activeTab] || AUDITORY_SKILLS[0];

  const [demoFeedback, setDemoFeedback] = useState<string | null>(null);
  const [demoScore, setDemoScore] = useState<number>(0);
  const [hasPlayedSound, setHasPlayedSound] = useState<boolean>(false);

  const [closureChoice, setClosureChoice] = useState<string | null>(null);
  const [discChoice, setDiscChoice] = useState<'same' | 'diff' | null>(null);
  const [assocChoice, setAssocChoice] = useState<string | null>(null);
  const [compChoice, setCompChoice] = useState<string | null>(null);
  const [noiseChoice, setNoiseChoice] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsTrackRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-07-games');

  useEffect(() => {
    const section = sectionRef.current;
    const track = cardsTrackRef.current;
    if (!section || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(track.children, {
        y: 18,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: track,
          start: 'top 98%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const resetMiniGame = () => {
    setDemoFeedback(null);
    setHasPlayedSound(false);
    setClosureChoice(null);
    setDiscChoice(null);
    setAssocChoice(null);
    setCompChoice(null);
    setNoiseChoice(null);
  };

  const handleSelectGame = (game: AuditorySkill) => {
    soundEngine.playPop();
    onSelectSkillId?.(game.id);
    resetMiniGame();
  };

  const handleNextGame = () => {
    const nextIdx = (activeTab + 1) % AUDITORY_SKILLS.length;
    handleSelectGame(AUDITORY_SKILLS[nextIdx]);
  };

  const handlePrevGame = () => {
    const prevIdx = (activeTab - 1 + AUDITORY_SKILLS.length) % AUDITORY_SKILLS.length;
    handleSelectGame(AUDITORY_SKILLS[prevIdx]);
  };

  const playDemoAudio = () => {
    setHasPlayedSound(true);
    if (selectedGame.id === 1) {
      soundEngine.playBell();
    } else if (selectedGame.id === 2) {
      soundEngine.playLingSound('/m/', 0.55);
      window.setTimeout(() => soundEngine.playLingSound('/m/', 0.55), 650);
    } else if (selectedGame.id === 3) {
      soundEngine.playLingSound('/u/', 0.75);
    } else if (selectedGame.id === 4) {
      soundEngine.playLingSound('/a/', 0.75);
    } else if (selectedGame.id === 5) {
      soundEngine.playLingSound('/i/', 0.75);
    } else {
      soundEngine.playLingSound('/s/', 0.75);
    }
  };

  const evaluateAnswer = (isCorrect: boolean, successMsg: string, retryMsg: string) => {
    if (isCorrect) {
      soundEngine.playSuccess();
      setDemoFeedback(successMsg);
      setDemoScore((prev) => prev + 1);
    } else {
      soundEngine.playPop();
      setDemoFeedback(retryMsg);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="games"
      data-scene-id="scene-07-games"
      className="sada-scene bg-gradient-to-b from-[#27213E] via-[#1E1933] to-[#27213E] text-white"
    >
      {/* Lightweight Radial Glows (zero blur-3xl filter rasterization cost) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 82% 18%, rgba(115, 87, 217, 0.22) 0%, transparent 45%), radial-gradient(circle at 18% 82%, rgba(21, 157, 152, 0.2) 0%, transparent 45%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Scene Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sada-yellow text-xs font-bold mb-3">
            <Gamepad2 size={15} />
            <span>المشهد 07 · عالم ألعاب صدى التعزيزية</span>
          </div>
          <h2 className="sada-section-title font-black mb-4">
            تشجيع بصري بروح <span className="text-sada-yellow">اللعب والاستكشاف</span>
          </h2>
          <p className="sada-body-copy text-white/80 font-medium text-center">
            تضيف سارة وعمر بهجة اللعب والنجوم التحفيزية لرفع دافعية الطفل للمشاركة، مع وضوح تام بأنها نماذج توضيحية تعزيزية وليست أداة تشخيص طبي.
          </p>
        </div>

        {/* Characters + Reward & Group Visual */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          <CharacterStageActor
            characterId="sarah"
            sizeClass="w-24 sm:w-28"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'sarah'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'sarah')}
          />
          <div className="flex items-center gap-4 bg-[#362E52]/90 px-4 py-3 rounded-3xl border border-white/15">
            <img
              src="/assets/group_running_transparent.webp"
              alt="أبطال صدى ينطلقون في عالم الألعاب"
              loading="lazy"
              decoding="async"
              className="w-36 sm:w-44 h-auto object-contain"
            />
            <img
              src="/assets/screens/screen_reward.png"
              alt="شاشة المكافأة ونجمة التقدم في تطبيق صدى"
              loading="lazy"
              decoding="async"
              className="w-16 sm:w-20 rounded-2xl border-2 border-white/25 shadow-lg"
            />
          </div>
          <CharacterStageActor
            characterId="omar"
            sizeClass="w-24 sm:w-28"
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'omar'}
            isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'omar')}
          />
        </div>

        {/* Playful Tilted 3D Game Cards Showcase */}
        <div className="relative mb-10 perspective-1000">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white/80">
              <Trophy className="text-sada-yellow" size={16} />
              <span>اختر نموذج لعبة توضيحي لتجربته:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevGame}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="اللعبة السابقة"
              >
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextGame}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="اللعبة التالية"
              >
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>

          <div ref={cardsTrackRef} className="flex gap-4 overflow-x-auto pb-5 pt-2 no-scrollbar scroll-smooth">
            {AUDITORY_SKILLS.map((skill, index) => {
              const isSelected = skill.id === selectedGame.id;
              const rotations = [-1.5, 1.5, -1, 1.5, -1.2, 1];
              const rot = rotations[index % rotations.length];

              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => handleSelectGame(skill)}
                  className={`flex-shrink-0 w-60 sm:w-68 rounded-3xl p-5 border-2 transition-all duration-300 text-right relative overflow-hidden hover:-translate-y-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-b from-white/20 to-white/5 border-sada-yellow shadow-2xl ring-2 ring-sada-yellow/40'
                      : 'bg-white/5 border-white/15 hover:border-white/40 opacity-85 hover:opacity-100'
                  }`}
                  style={{
                    transform: isSelected ? 'none' : `rotate(${rot}deg)`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[11px] font-black px-2.5 py-1 rounded-xl text-white"
                      style={{ backgroundColor: skill.color }}
                    >
                      نشاط {skill.id}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-sada-yellow">
                      <Star size={13} fill="currentColor" />
                      <span>نموذج تعزيزي</span>
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white mb-1">{skill.gameTitle}</h3>
                  <span className="text-xs font-bold text-sada-teal-light block mb-2.5">
                    {skill.title}
                  </span>
                  <p className="text-xs text-white/75 leading-relaxed mb-3 line-clamp-2">
                    {skill.gameDescription}
                  </p>
                  <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-xs font-bold">
                    <span className="flex items-center gap-1 text-sada-yellow">
                      <Play size={12} fill="currentColor" />
                      <span>{isSelected ? 'قيد العرض' : 'افتح النموذج'}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Playable Conceptual Arena */}
        <div className="bg-[#2D264B]/95 rounded-[2.25rem] border-2 border-white/20 p-6 sm:p-9 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/15 text-xs font-bold text-sada-yellow mb-3">
                <Sparkles size={14} />
                <span>عرض تفاعلي تصوّري (Conceptual Demo)</span>
              </div>

              <h3 className="sada-card-title font-black text-white mb-2">
                {selectedGame.gameTitle}
              </h3>
              <p className="text-xs sm:text-sm text-sada-teal-light font-bold mb-3">
                مرتبط بمهارة: {selectedGame.title}
              </p>

              <p className="text-sm text-white/85 leading-relaxed font-medium mb-5">
                {selectedGame.gameDescription}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-5">
                <span className="text-xs font-bold text-white/65 block mb-1">الهدف الموثق:</span>
                <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                  {selectedGame.objective}
                </p>
              </div>

              <div className="flex items-center justify-between bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 mb-3">
                <span className="text-xs font-bold text-white/85">نجوم التحفيز المكتسبة:</span>
                <div className="flex items-center gap-1 text-sada-yellow font-black text-lg">
                  <Star size={18} fill="currentColor" />
                  <span>{demoScore}</span>
                </div>
              </div>

              <p className="text-[11px] text-white/65 leading-relaxed">
                * الألعاب والنجوم والشارات في صدى وسائل تعزيز لرفع دافعية الطفل ومشاركته، ولا تُستخدم كأداة تشخيص طبي.
              </p>
            </div>

            <div className="lg:col-span-7 bg-[#1A152E]/95 rounded-3xl border-2 border-white/15 p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[340px] relative">
              <button
                type="button"
                onClick={resetMiniGame}
                title="إعادة بدء النموذج"
                aria-label="إعادة بدء النموذج"
                className="absolute top-4 left-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/75 hover:text-white transition-colors"
              >
                <RotateCcw size={16} />
              </button>

              <div className="mb-5 flex flex-col items-center">
                <button
                  type="button"
                  onClick={playDemoAudio}
                  aria-label="تشغيل الصوت التوضيحي للنموذج"
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-sada-violet to-sada-teal text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform mb-3 border-4 border-white/20"
                >
                  <Volume2 size={32} />
                </button>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {hasPlayedSound ? 'أعد الاستماع للصوت التوضيحي' : 'اضغط لتشغيل الصوت التوضيحي'}
                </span>
                <span className="text-[11px] text-white/55 mt-0.5">
                  (استمع أولاً لتفعيل الخيارات التفاعلية)
                </span>
              </div>

              <div className="w-full max-w-md">
                {selectedGame.id === 1 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/85">هل سمعت صوت الرنين؟</p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        disabled={!hasPlayedSound}
                        onClick={() => evaluateAnswer(true, 'أحسنت! استجابة واضحة لوجود الصوت ★', '')}
                        className="flex-1 py-3 rounded-2xl bg-sada-teal hover:bg-sada-teal-dark font-extrabold text-sm text-white disabled:opacity-40 transition-all"
                      >
                        سمعت
                      </button>
                      <button
                        type="button"
                        disabled={!hasPlayedSound}
                        onClick={() => evaluateAnswer(false, '', 'تأكد من مستوى الصوت وأعد الاستماع')}
                        className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 font-bold text-sm text-white/85 border border-white/15 disabled:opacity-40 transition-all"
                      >
                        لم أسمع
                      </button>
                    </div>
                  </div>
                )}

                {selectedGame.id === 2 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/85">هل الصوتان متشابهان أم مختلفان؟</p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        disabled={!hasPlayedSound}
                        onClick={() => {
                          setDiscChoice('same');
                          evaluateAnswer(true, 'رائع! الصوتان متشابهان تماماً ★', '');
                        }}
                        className={`flex-1 py-3 rounded-2xl font-extrabold text-sm transition-all ${
                          discChoice === 'same'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white/15 hover:bg-white/25 text-white disabled:opacity-40'
                        }`}
                      >
                        متشابهان
                      </button>
                      <button
                        type="button"
                        disabled={!hasPlayedSound}
                        onClick={() => {
                          setDiscChoice('diff');
                          evaluateAnswer(false, '', 'استمع مجدداً: الصوتان كانا متشابهين');
                        }}
                        className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                          discChoice === 'diff'
                            ? 'bg-rose-600 text-white'
                            : 'bg-white/15 hover:bg-white/25 text-white disabled:opacity-40'
                        }`}
                      >
                        مختلفان
                      </button>
                    </div>
                  </div>
                )}

                {selectedGame.id === 3 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/85">ما مصدر الصوت؟ (مثال القطة من الوثيقة)</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'cat', label: 'قطة', icon: '🐱', isRight: true },
                        { id: 'car', label: 'سيارة', icon: '🚗', isRight: false },
                        { id: 'bell', label: 'جرس', icon: '🔔', isRight: false },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          disabled={!hasPlayedSound}
                          onClick={() => {
                            setAssocChoice(item.id);
                            evaluateAnswer(item.isRight, 'ربط صحيح بين الصوت والصورة ★', 'حاول ثانية باختيار القطة');
                          }}
                          className={`p-3 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
                            assocChoice === item.id
                              ? item.isRight
                                ? 'bg-emerald-600 border-emerald-400 text-white'
                                : 'bg-rose-600 border-rose-400 text-white'
                              : 'bg-white/10 hover:bg-white/20 border-white/15 text-white disabled:opacity-40'
                          }`}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-xs font-bold">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedGame.id === 4 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/85">التعليمة المسموعة: «اختر الكرة الحمراء»</p>
                    <div className="flex items-center justify-center gap-4">
                      {[
                        { color: 'bg-rose-500', id: 'red', isCorrect: true, label: 'الكرة الحمراء' },
                        { color: 'bg-amber-400', id: 'yellow', isCorrect: false, label: 'الكرة الصفراء' },
                        { color: 'bg-teal-400', id: 'teal', isCorrect: false, label: 'الكرة التركواز' },
                      ].map((ball) => (
                        <button
                          key={ball.id}
                          type="button"
                          disabled={!hasPlayedSound}
                          onClick={() => {
                            setCompChoice(ball.id);
                            evaluateAnswer(ball.isCorrect, 'فهم وتنفيذ دقيق للتعليمة ★', 'التعليمة طلبت الكرة الحمراء');
                          }}
                          className={`w-14 h-14 rounded-full ${ball.color} shadow-lg hover:scale-110 transition-transform border-2 ${
                            compChoice === ball.id ? 'border-white ring-4 ring-white/50' : 'border-transparent'
                          } disabled:opacity-40`}
                          aria-label={ball.label}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedGame.id === 5 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/85">استكمل الجملة: «الطفل يشرب ...»</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'water', label: 'ماء', isCorrect: true },
                        { id: 'shoe', label: 'حذاء', isCorrect: false },
                        { id: 'book', label: 'كتاب', isCorrect: false },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={!hasPlayedSound}
                          onClick={() => {
                            setClosureChoice(opt.id);
                            evaluateAnswer(opt.isCorrect, 'إغلاق سمعي ممتاز! ★', 'اختر الكلمة المناسبة للمعنى');
                          }}
                          className={`py-3 rounded-2xl font-extrabold text-xs transition-all border ${
                            closureChoice === opt.id
                              ? opt.isCorrect
                                ? 'bg-emerald-600 border-emerald-400 text-white'
                                : 'bg-rose-600 border-rose-400 text-white'
                              : 'bg-white/10 hover:bg-white/20 border-white/15 text-white disabled:opacity-40'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedGame.id === 6 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/85">الكلمة المستهدفة وسط خلفية بسيطة: «تفاحة»</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'apple', label: 'تفاحة', isCorrect: true },
                        { id: 'banana', label: 'موز', isCorrect: false },
                        { id: 'grapes', label: 'عنب', isCorrect: false },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={!hasPlayedSound}
                          onClick={() => {
                            setNoiseChoice(opt.id);
                            evaluateAnswer(opt.isCorrect, 'أحسنت! اخترت الكلمة المطابقة ★', 'حاول التركيز في الكلمة المطلوبة');
                          }}
                          className={`py-3 rounded-2xl border font-bold text-xs transition-all ${
                            noiseChoice === opt.id
                              ? opt.isCorrect
                                ? 'bg-emerald-600 border-emerald-400 text-white'
                                : 'bg-rose-600 border-rose-400 text-white'
                              : 'bg-white/10 hover:bg-white/20 border-white/15 text-white disabled:opacity-40'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {demoFeedback && (
                <div className="mt-5 p-3 rounded-xl bg-white/15 border border-white/25 text-xs sm:text-sm font-bold text-sada-yellow animate-fade-in flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>{demoFeedback}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
