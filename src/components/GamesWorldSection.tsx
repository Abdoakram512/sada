import React, { useState } from 'react';
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
  ArrowLeft
} from 'lucide-react';
import { AUDITORY_SKILLS } from '../data/sadaData';
import type { AuditorySkill } from '../data/sadaData';
import { soundEngine } from '../utils/audioEngine';

export const GamesWorldSection: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<AuditorySkill>(AUDITORY_SKILLS[0]);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Mini-game playable demo state
  const [demoFeedback, setDemoFeedback] = useState<string | null>(null);
  const [demoScore, setDemoScore] = useState<number>(0);
  const [hasPlayedSound, setHasPlayedSound] = useState<boolean>(false);

  // Closure game state
  const [closureChoice, setClosureChoice] = useState<string | null>(null);
  // Discrimination state
  const [discChoice, setDiscChoice] = useState<'same' | 'diff' | null>(null);
  // Association state
  const [assocChoice, setAssocChoice] = useState<string | null>(null);
  // Comprehension state
  const [compChoice, setCompChoice] = useState<string | null>(null);

  const resetMiniGame = () => {
    setDemoFeedback(null);
    setHasPlayedSound(false);
    setClosureChoice(null);
    setDiscChoice(null);
    setAssocChoice(null);
    setCompChoice(null);
  };

  const handleSelectGame = (game: AuditorySkill, index: number) => {
    soundEngine.playPop();
    setSelectedGame(game);
    setActiveTab(index);
    resetMiniGame();
  };

  const handleNextGame = () => {
    const nextIdx = (activeTab + 1) % AUDITORY_SKILLS.length;
    handleSelectGame(AUDITORY_SKILLS[nextIdx], nextIdx);
  };

  const handlePrevGame = () => {
    const prevIdx = (activeTab - 1 + AUDITORY_SKILLS.length) % AUDITORY_SKILLS.length;
    handleSelectGame(AUDITORY_SKILLS[prevIdx], prevIdx);
  };

  // Play audio for the specific mini-game
  const playDemoAudio = () => {
    setHasPlayedSound(true);
    if (selectedGame.id === 1) {
      soundEngine.playBell();
    } else if (selectedGame.id === 2) {
      soundEngine.playLingSound('/m/', 0.6);
      setTimeout(() => soundEngine.playLingSound('/m/', 0.6), 700);
    } else if (selectedGame.id === 3) {
      soundEngine.playLingSound('/u/', 0.8);
    } else if (selectedGame.id === 4) {
      soundEngine.playLingSound('/a/', 0.8);
    } else if (selectedGame.id === 5) {
      soundEngine.playLingSound('/i/', 0.8);
    } else {
      soundEngine.playLingSound('/s/', 0.8);
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
    <section id="games" className="relative py-28 px-4 md:px-8 bg-gradient-to-b from-[#27213E] via-[#1E1933] to-[#27213E] text-white overflow-hidden">
      {/* Playful Floating Glow Spheres in Background (Nex Playground style) */}
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-sada-violet/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-sada-teal/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-sada-yellow/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sada-yellow text-xs font-bold mb-4 backdrop-blur-md">
            <Gamepad2 size={16} />
            <span>SADA Game World · عالم ألعاب صدى</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            تأهيل سمعي بروح <span className="text-sada-yellow">اللعب والاستكشاف</span>
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed font-medium">
            مستوحى من بهجة ألعاب الحركة والاستكشاف؛ نحوّل مهام التقييم إلى ألعاب بصرية تفاعلية تجعل الطفل يترقب كل جلسة بحماس وابتسامة.
          </p>
        </div>

        {/* Nex Playground Style: Horizontal Overlapping & Tilted 3D Game Cards Showcase */}
        <div className="relative mb-14 perspective-1000">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white/70">
              <Trophy className="text-sada-yellow" size={16} />
              <span>اختر لعبة واستمتع بالتجربة التفاعلية:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevGame}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="السابق"
              >
                <ArrowRight size={16} />
              </button>
              <button
                onClick={handleNextGame}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="التالي"
              >
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth">
            {AUDITORY_SKILLS.map((skill, index) => {
              const isSelected = skill.id === selectedGame.id;
              // Gentle rotation angle for that dynamic playful Nex Playground feel
              const rotations = [-2, 1.5, -1, 2, -1.5, 1];
              const rot = rotations[index % rotations.length];

              return (
                <div
                  key={skill.id}
                  onClick={() => handleSelectGame(skill, index)}
                  className={`flex-shrink-0 w-64 sm:w-72 rounded-3xl p-5 border-2 transition-all duration-500 cursor-pointer relative overflow-hidden transform hover:-translate-y-2 ${
                    isSelected
                      ? 'bg-gradient-to-b from-white/20 to-white/5 border-sada-yellow shadow-2xl ring-4 ring-sada-yellow/40 scale-102'
                      : 'bg-white/5 border-white/15 hover:border-white/40 opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    transform: isSelected ? 'none' : `rotate(${rot}deg)`,
                  }}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[11px] font-black px-2.5 py-1 rounded-xl text-white shadow-sm"
                      style={{ backgroundColor: skill.color }}
                    >
                      مهمة {skill.id}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-sada-yellow">
                      <Star size={13} fill="currentColor" />
                      <span>معزز</span>
                    </span>
                  </div>

                  {/* Game Title & Subtitle */}
                  <h3 className="text-lg font-black text-white mb-1.5">
                    {skill.gameTitle}
                  </h3>
                  <span className="text-xs font-bold text-sada-teal-light block mb-3">
                    {skill.title}
                  </span>

                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed mb-4">
                    {skill.gameDescription}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-bold text-white/90">
                    <span className="flex items-center gap-1 text-sada-yellow">
                      <Play size={13} fill="currentColor" />
                      <span>{isSelected ? 'قيد التجربة' : 'جرّب المهمة'}</span>
                    </span>
                    <span className="text-white/40 text-[10px]">{skill.englishTitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* The Live Interactive Mini-Mission Game Arena */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border-2 border-white/20 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Mission Description and Pedagogy */}
            <div className="lg:col-span-5 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/15 text-xs font-bold text-sada-yellow mb-3">
                <Sparkles size={14} />
                <span>مهمة تفاعلية حية</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white mb-2">
                {selectedGame.gameTitle}
              </h3>
              <p className="text-xs sm:text-sm text-sada-teal-light font-bold mb-4">
                تطوير مهارة: {selectedGame.title}
              </p>

              <p className="text-sm text-white/80 leading-relaxed font-medium mb-6">
                {selectedGame.gameDescription}
              </p>

              {/* Game Objective details from PDF */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <span className="text-xs font-bold text-white/60 block mb-1">
                  الهدف التأهيلي المقاس:
                </span>
                <p className="text-xs sm:text-sm text-white/90 font-medium">
                  {selectedGame.objective}
                </p>
              </div>

              {/* Star Score Counter */}
              <div className="flex items-center justify-between bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10">
                <span className="text-xs font-bold text-white/80">النجوم المكتسبة في الجولة:</span>
                <div className="flex items-center gap-1 text-sada-yellow font-black text-lg">
                  <Star size={18} fill="currentColor" />
                  <span>{demoScore}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Game Canvas (Playable Mini-Demo) */}
            <div className="lg:col-span-7 bg-[#1A152E]/90 rounded-3xl border-2 border-white/15 p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[380px] shadow-inner relative">
              {/* Reset button top left */}
              <button
                onClick={resetMiniGame}
                title="إعادة بدء المهمة"
                className="absolute top-4 left-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              >
                <RotateCcw size={16} />
              </button>

              {/* Step 1: Auditory Stimulus Trigger */}
              <div className="mb-6 flex flex-col items-center">
                <button
                  onClick={playDemoAudio}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-sada-violet to-sada-teal text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform mb-3 border-4 border-white/20"
                >
                  <Volume2 size={36} className={hasPlayedSound ? 'animate-ping' : ''} />
                </button>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {hasPlayedSound ? 'أعد الاستماع للصوت' : 'اضغط للاستماع إلى الصوت المستهدف'}
                </span>
                <span className="text-[11px] text-white/50 mt-0.5">
                  (يجب الاستماع أولاً لتفعيل الخيارات)
                </span>
              </div>

              {/* Step 2: Interactive Mission Mechanics according to skill type */}
              <div className="w-full max-w-md">
                {/* Skill 1: Sound Detection Demo */}
                {selectedGame.id === 1 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/80">هل سمعت صوت الرنين بوضوح؟</p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        disabled={!hasPlayedSound}
                        onClick={() => evaluateAnswer(true, 'أحسنت! إدراك رائع لوجود الصوت ونغمة الرنين ★', 'حاول مرة أخرى')}
                        className="flex-1 py-3 rounded-2xl bg-sada-teal hover:bg-sada-teal-dark font-extrabold text-sm text-white shadow-md disabled:opacity-40 transition-all"
                      >
                        سمعت الرنين!
                      </button>
                      <button
                        disabled={!hasPlayedSound}
                        onClick={() => evaluateAnswer(false, '', 'لم تسمع؟ تحقق من رفع الصوت أو اضغط للاستماع مجدداً')}
                        className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 font-bold text-sm text-white/80 border border-white/15 disabled:opacity-40 transition-all"
                      >
                        لم أسمع
                      </button>
                    </div>
                  </div>
                )}

                {/* Skill 2: Auditory Discrimination Demo */}
                {selectedGame.id === 2 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/80">هل الصوتين اللذين سمعتهما متطابقان أم مختلفان؟</p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        disabled={!hasPlayedSound}
                        onClick={() => {
                          setDiscChoice('same');
                          evaluateAnswer(true, 'إجابة ممتازة! الصوتان متطابقان تماماً في النغمة ★', '');
                        }}
                        className={`flex-1 py-3 rounded-2xl font-extrabold text-sm shadow-md transition-all ${
                          discChoice === 'same'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white/15 hover:bg-white/25 text-white disabled:opacity-40'
                        }`}
                      >
                        صوتان متشابهان
                      </button>
                      <button
                        disabled={!hasPlayedSound}
                        onClick={() => {
                          setDiscChoice('diff');
                          evaluateAnswer(false, '', 'استمع جيداً مرة أخرى: كانا متماثلين!');
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

                {/* Skill 3: Auditory Identification & Association (From PDF Page 10) */}
                {selectedGame.id === 3 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/80">ما مصدر الصوت الذي سمعته؟ (اختر الصورة المناسبة)</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'cat', label: 'قطة', icon: '🐱', isRight: true },
                        { id: 'car', label: 'سيارة', icon: '🚗', isRight: false },
                        { id: 'bell', label: 'جرس', icon: '🔔', isRight: false },
                      ].map((item) => (
                        <button
                          key={item.id}
                          disabled={!hasPlayedSound}
                          onClick={() => {
                            setAssocChoice(item.id);
                            evaluateAnswer(item.isRight, 'رائع! ربط صحيح بين الصوت ومصدره الحيوي ★', 'حاول ثانية! الصوت كان مواء قطة');
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

                {/* Skill 4: Auditory Comprehension (From PDF Page 11) */}
                {selectedGame.id === 4 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/80">التعليمة المسموعة: «اختر الكرة الحمراء»</p>
                    <div className="flex items-center justify-center gap-4">
                      {[
                        { color: 'bg-rose-500', id: 'red', isCorrect: true, label: 'أحمر' },
                        { color: 'bg-amber-400', id: 'yellow', isCorrect: false, label: 'أصفر' },
                        { color: 'bg-teal-400', id: 'teal', isCorrect: false, label: 'تركواز' },
                      ].map((ball) => (
                        <button
                          key={ball.id}
                          disabled={!hasPlayedSound}
                          onClick={() => {
                            setCompChoice(ball.id);
                            evaluateAnswer(ball.isCorrect, 'فهم واستجابة دقيقة للأمر اللفظي! ★', 'التعليمة طلبت الكرة الحمراء');
                          }}
                          className={`w-14 h-14 rounded-full ${ball.color} shadow-lg transform hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 ${
                            compChoice === ball.id ? 'border-white ring-4 ring-white/50' : 'border-transparent'
                          } disabled:opacity-40`}
                          aria-label={ball.label}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill 5: Auditory Closure (From PDF Page 12) */}
                {selectedGame.id === 5 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/80">استمع للجملة الناقصة: «الطفل يشرب ...»</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'water', label: 'ماء', isCorrect: true },
                        { id: 'shoe', label: 'حذاء', isCorrect: false },
                        { id: 'book', label: 'كتاب', isCorrect: false },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          disabled={!hasPlayedSound}
                          onClick={() => {
                            setClosureChoice(opt.id);
                            evaluateAnswer(opt.isCorrect, 'إغلاق سمعي مذهل! استكملت الجملة بالسياق المنطقي ★', 'هل يُشرب الحذاء؟ اختر الكلمة المناسبة!');
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

                {/* Skill 6: Listening in Noise (From PDF Page 13) */}
                {selectedGame.id === 6 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white/80">التقاط الكلمة مع صوت خلفي: «تفاحة»</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'apple', label: 'تفاحة', isCorrect: true },
                        { id: 'banana', label: 'موز', isCorrect: false },
                        { id: 'grapes', label: 'عنب', isCorrect: false },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          disabled={!hasPlayedSound}
                          onClick={() => evaluateAnswer(opt.isCorrect, 'بطل حقيقي! التقطت الكلمة ببراعة وسط الضوضاء ★', 'استمع بتركيز أكبر')}
                          className="py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 font-bold text-xs text-white disabled:opacity-40 transition-all"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Feedback Alert */}
              {demoFeedback && (
                <div className="mt-5 p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-bold text-sada-yellow animate-fade-in flex items-center gap-2">
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
