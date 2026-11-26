import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, Activity, FileText, Gamepad2, ShieldCheck, Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import { storyAudioController } from '../utils/storyAudioController';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';
import { StoryEntryOverlay } from './StoryEntryOverlay';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onAboutClick,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const castRef = useRef<HTMLDivElement | null>(null);
  const ringsRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive: isHeroScene, activeSpeakerId, mode } = useStorySceneFocus('scene-01-welcome');

  useEffect(() => {
    const section = sectionRef.current;
    const cast = castRef.current;
    const rings = ringsRef.current;
    if (!section || !cast || !rings) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(cast, {
        y: -28,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      });

      gsap.to(rings, {
        y: 22,
        opacity: 0.3,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-scene-id="scene-01-welcome"
      className="relative min-h-[calc(100svh-0.5rem)] flex flex-col justify-between pt-20 sm:pt-[4.5rem] pb-36 sm:pb-4 px-4 md:px-8 overflow-x-clip bg-gradient-to-b from-sada-cream via-[#FFF3DF] to-sada-cream"
    >
      {/* Decorative Sound Wave Rings (paused when Hero is offscreen) */}
      <div
        ref={ringsRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
      >
        <div className={`w-[640px] h-[640px] rounded-full border border-sada-violet/10 ${isHeroScene ? 'animate-pulse-glow' : ''}`} />
        <div
          className={`absolute w-[480px] h-[480px] rounded-full border border-sada-teal/15 ${isHeroScene ? 'animate-pulse-glow' : ''}`}
          style={{ animationDelay: '1s' }}
        />
        <div
          className={`absolute w-[320px] h-[320px] rounded-full border border-sada-yellow/25 ${isHeroScene ? 'animate-pulse-glow' : ''}`}
          style={{ animationDelay: '1.8s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center relative z-10">
        {/* Project Tag */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1 rounded-full bg-white/90 border border-sada-violet/20 shadow-sm mb-2">
          <span className="w-2 h-2 rounded-full bg-sada-teal animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-sada-violet">
            مشروع تخرج · منظومة صدى السمعية
          </span>
          <span className="dir-ltr text-xs px-2 py-0.5 rounded-full bg-sada-yellow/45 text-sada-ink font-bold">
            SADA 2026
          </span>
        </div>

        {/* Main Arabic Headline — clean RTL spacing & line-height */}
        <h1 className="sada-hero-title font-black text-sada-ink max-w-4xl mb-2">
          <span>لكل صوت حكاية، </span>
          <span className="sada-gradient-text">ولكل طفل رحلة</span>
        </h1>

        {/* Supporting Narrative Copy */}
        <p className="sada-body-copy text-sada-ink/80 max-w-2xl font-medium text-center mb-2.5">
          حكاية تفاعلية تجمع بين{' '}
          <strong className="text-sada-violet font-extrabold">تقييم أصوات لينج الستة</strong>، وتنمية المهارات السمعية الخمس، والمتابعة المنظمة للأطفال ضعاف السمع من مستخدمي السماعات الطبية وزراعة القوقعة.
        </p>

        {/* Core Pillars Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-2.5 max-w-2xl">
          {[
            { label: 'تقييم وظيفي', icon: Activity, color: 'bg-sada-lavender text-sada-violet border-sada-violet/20' },
            { label: 'متابعة عبر الزمن', icon: FileText, color: 'bg-emerald-50 text-sada-teal-dark border-sada-teal/25' },
            { label: 'ألعاب تعزيزية', icon: Gamepad2, color: 'bg-amber-50 text-amber-800 border-amber-300' },
            { label: 'الأسرة والأخصائي', icon: ShieldCheck, color: 'bg-rose-50 text-sada-coral-dark border-rose-200' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border ${item.color}`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Inline Story Mode Choice (non-blocking, zero character overlap) */}
        <StoryEntryOverlay />

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
          <button
            type="button"
            onClick={() => {
              storyAudioController.chooseEntryMode('story');
              soundEngine.playSuccess();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-sada-violet hover:bg-sada-violet-dark text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sada-violet/25 hover:scale-105 active:scale-95 transition-all"
          >
            <Volume2 size={18} />
            <span>{mode === 'story' ? 'تشغيل مشهد البداية' : 'ابدأ الرحلة بالصوت'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPop();
              onExploreClick();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-sada-lavender/40 text-sada-ink font-bold text-sm sm:text-base border-2 border-sada-violet/20 hover:border-sada-violet/50 shadow-sm transition-all"
          >
            <Sparkles size={16} className="text-sada-teal" />
            <span>تقييم أصوات لينج</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPop();
              onAboutClick();
            }}
            className="px-5 py-3 rounded-2xl bg-white/75 hover:bg-white text-sada-ink/85 font-bold text-sm border border-sada-ink/10 transition-all"
          >
            فهم التحدي
          </button>
        </div>

        {/* Staged 5-Character Ensemble — Responsive grid/flex with zero face overlap */}
        <div ref={castRef} className="relative w-full max-w-5xl mt-1">
          <div
            aria-hidden="true"
            className="mx-auto w-4/5 h-8 rounded-[100%] -mb-5"
            style={{ background: 'radial-gradient(ellipse at center, rgba(39,33,62,0.12) 0%, transparent 72%)' }}
          />
          <div className="grid grid-cols-3 sm:grid-cols-5 items-end justify-items-center gap-2 sm:gap-3 px-1">
            <div className="order-1">
              <CharacterStageActor
                characterId="sarah"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'sarah'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'sarah')}
                sizeClass="w-32 sm:w-40 md:w-44 lg:w-48"
                onClick={() => storyAudioController.replayCurrentScene()}
              />
            </div>
            <div className="order-2">
              <CharacterStageActor
                characterId="zain"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'zain'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'zain')}
                sizeClass="w-32 sm:w-40 md:w-44 lg:w-48"
                onClick={() => onAboutClick()}
              />
            </div>
            <div className="order-3 col-span-1">
              <CharacterStageActor
                characterId="omar"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'omar'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'omar')}
                sizeClass="w-36 sm:w-44 md:w-52 lg:w-56"
                onClick={() => storyAudioController.replayCurrentScene()}
              />
            </div>
            <div className="order-4 hidden sm:block">
              <CharacterStageActor
                characterId="maryam"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'maryam'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'maryam')}
                sizeClass="w-32 sm:w-40 md:w-44 lg:w-48"
                onClick={() => onExploreClick()}
              />
            </div>
            <div className="order-5 hidden sm:block">
              <CharacterStageActor
                characterId="nour"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'nour'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'nour')}
                sizeClass="w-32 sm:w-40 md:w-44 lg:w-48"
                onClick={() => onAboutClick()}
              />
            </div>
          </div>

          {/* Mobile secondary row for Maryam & Nour — generous height without clipping */}
          <div className="flex sm:hidden items-end justify-center gap-6 mt-3">
            <CharacterStageActor
              characterId="maryam"
              eager
              isActiveScene={isHeroScene}
              isSpeaking={isHeroScene && activeSpeakerId === 'maryam'}
              isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'maryam')}
              sizeClass="w-32"
              onClick={() => onExploreClick()}
            />
            <CharacterStageActor
              characterId="nour"
              eager
              isActiveScene={isHeroScene}
              isSpeaking={isHeroScene && activeSpeakerId === 'nour'}
              isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'nour')}
              sizeClass="w-32"
              onClick={() => onAboutClick()}
            />
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="relative mt-4 flex flex-col items-center justify-center gap-1.5 text-sada-violet">
        <span className="text-xs font-bold opacity-85">مرّر لمتابعة فصول الحكاية</span>
        <ArrowDown size={16} className="animate-bounce opacity-75" />
      </div>
    </section>
  );
};
