import React from 'react';
import { ArrowDown, Sparkles, Activity, FileText, Gamepad2, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';

interface HeroSectionProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onAboutClick,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-sada-cream via-[#FFF3DF] to-sada-cream"
    >
      {/* Decorative Sound Wave Rings in background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 overflow-hidden">
        <div className="w-[800px] h-[800px] rounded-full border border-sada-violet/10 animate-pulse-glow" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-sada-teal/15 animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-sada-yellow/20 animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center relative z-10">
        {/* Project Tag / Category */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sada-violet/20 shadow-sm mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-sada-teal animate-ping" />
          <span className="text-xs md:text-sm font-bold text-sada-violet">
            مشروع تخرج · كليّة علوم التأهيل والتقنية
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sada-yellow/40 text-sada-ink font-semibold">
            دفعة 2026
          </span>
        </div>

        {/* Main Arabic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-sada-ink tracking-tight leading-[1.25] max-w-4xl mb-6">
          «رحلة صغيرة... <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sada-violet via-sada-teal to-sada-coral bg-clip-text text-transparent">
            لعالم مليان أصوات»
          </span>
        </h1>

        {/* Supporting Text from the PDF */}
        <p className="text-base sm:text-lg md:text-xl text-sada-ink/75 max-w-2xl font-medium leading-relaxed mb-8">
          منظومة تفاعلية متكاملة تجمع بين{' '}
          <strong className="text-sada-violet font-bold">تقييم أصوات لينج الستة</strong>، وتنمية المهارات السمعية الخمس، والمتابعة المنظمة لنتائج الأطفال ضعاف السمع ومستخدمي السماعات الطبية وزراعة القوقعة.
        </p>

        {/* Core Pillars Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 max-w-xl">
          {[
            { label: 'تقييم وظيفي', icon: Activity, color: 'bg-sada-lavender text-sada-violet border-sada-violet/20' },
            { label: 'متابعة دورية', icon: FileText, color: 'bg-emerald-50 text-sada-teal border-sada-teal/20' },
            { label: 'ألعاب تعزيزية', icon: Gamepad2, color: 'bg-amber-50 text-amber-700 border-amber-300' },
            { label: 'دعم الأسرة والأخصائي', icon: ShieldCheck, color: 'bg-rose-50 text-sada-coral-dark border-rose-200' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border ${item.color} shadow-xs`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => {
              soundEngine.playSuccess();
              onExploreClick();
            }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-sada-violet hover:bg-sada-violet-dark text-white font-extrabold text-base shadow-lg shadow-sada-violet/30 hover:scale-105 active:scale-98 transition-all"
          >
            <Sparkles size={18} />
            <span>اكتشف رحلة صدى</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playPop();
              onAboutClick();
            }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-sada-lavender/40 text-sada-ink font-bold text-base border-2 border-sada-violet/20 hover:border-sada-violet/50 shadow-sm hover:scale-102 active:scale-98 transition-all"
          >
            <span>تعرّف على فكرة المشروع</span>
          </button>
        </div>

        {/* Layered Characters Hero Composition (The 5 Mascots in a Cinematic Staged Assembly) */}
        <div className="relative w-full max-w-5xl h-[340px] sm:h-[420px] md:h-[480px] mt-2 flex items-end justify-center select-none">
          {/* Floor Shadow Oval */}
          <div className="absolute bottom-2 w-4/5 h-14 bg-sada-ink/10 rounded-[100%] blur-xl -z-10" />

          {/* Child 1: Sarah (Joyful explorer - Teal overalls & yellow hoodie) - Left */}
          <div className="absolute -left-2 sm:left-4 md:left-12 bottom-0 w-36 sm:w-48 md:w-60 z-20 transition-transform duration-700 hover:scale-105 cursor-pointer">
            <img
              src="/assets/char_sarah.png"
              alt="سارة - الطفلة المرحة"
              className="w-full h-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>

          {/* Child 2: Zain (Creative solver - Green hoodie with glasses & puzzle piece) - Mid-Left */}
          <div className="absolute left-20 sm:left-36 md:left-48 bottom-0 w-36 sm:w-48 md:w-56 z-10 transition-transform duration-700 hover:scale-105 cursor-pointer">
            <img
              src="/assets/char_zain.png"
              alt="زين - المبتكر الصغير"
              className="w-full h-auto drop-shadow-xl"
              loading="eager"
            />
          </div>

          {/* Center Mascot: Omar (Adventurer - Orange jacket, thumbs up) - Foreground Center */}
          <div className="relative bottom-0 w-44 sm:w-56 md:w-68 z-30 transition-transform duration-700 hover:scale-105 cursor-pointer">
            <img
              src="/assets/char_omar.png"
              alt="عمر - المغامر النشيط"
              className="w-full h-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>

          {/* Child 4: Maryam (Curious learner - Purple hijab, pointing up) - Mid-Right */}
          <div className="absolute right-20 sm:right-36 md:right-48 bottom-0 w-36 sm:w-48 md:w-56 z-10 transition-transform duration-700 hover:scale-105 cursor-pointer">
            <img
              src="/assets/char_maryam.png"
              alt="مريم - المستكشفة الذكية"
              className="w-full h-auto drop-shadow-xl"
              loading="eager"
            />
          </div>

          {/* Child 5: Nour (Gentle storyteller - Lavender cardigan, yellow bow) - Right */}
          <div className="absolute -right-2 sm:right-4 md:right-12 bottom-0 w-36 sm:w-48 md:w-60 z-20 transition-transform duration-700 hover:scale-105 cursor-pointer">
            <img
              src="/assets/char_nour.png"
              alt="نور - الصديقة اللطيفة"
              className="w-full h-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Creative Sound Ribbon Scroll Indicator */}
      <div className="relative mt-8 flex flex-col items-center justify-center gap-2 text-sada-violet">
        <span className="text-xs font-bold tracking-wider opacity-80">انزل واستمع للرحلة</span>
        <div className="w-8 h-12 rounded-full border-2 border-sada-violet/30 flex items-start justify-center p-1.5 shadow-sm bg-white/50">
          <div className="w-2 h-3.5 bg-gradient-to-b from-sada-violet to-sada-teal rounded-full animate-bounce" />
        </div>
        <ArrowDown size={14} className="animate-pulse opacity-60" />
      </div>
    </section>
  );
};
