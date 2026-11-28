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

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: '(max-width: 767px)',
        isDesktop: '(min-width: 768px)',
      },
      (context) => {
        const { isMobile } = context.conditions || { isMobile: false };

        gsap.to(cast, {
          y: isMobile ? -14 : -28,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        gsap.to(rings, {
          y: isMobile ? 12 : 22,
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
      },
      section
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-scene-id="scene-01-welcome"
      className="relative min-h-[100svh] flex flex-col justify-between pt-[4.25rem] sm:pt-[4.5rem] pb-16 sm:pb-5 px-3 sm:px-4 md:px-8 overflow-x-clip bg-gradient-to-b from-sada-cream via-[#FFF3DF] to-sada-cream"
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
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 sm:px-4 py-1 rounded-full bg-white/90 border border-sada-violet/20 shadow-sm mb-1.5 sm:mb-2">
          <span className="w-2 h-2 rounded-full bg-sada-teal animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-sada-violet">
            مشروع تخرج · تطبيق صدى السمعي
          </span>
          <span className="dir-ltr text-xs px-2 py-0.5 rounded-full bg-sada-yellow/45 text-sada-ink font-bold">
            SADA 2026
          </span>
        </div>

        {/* Main Arabic Headline — clean RTL spacing & line-height */}
        <h1 className="sada-hero-title font-black text-sada-ink max-w-4xl mb-1.5 sm:mb-2">
          <span>لكل صوت حكاية، </span>
          <span className="sada-gradient-text">ولكل طفل رحلة</span>
        </h1>

        {/* Supporting Narrative Copy */}
        <p className="text-[14px] sm:text-base md:text-lg leading-relaxed text-sada-ink/80 max-w-2xl font-medium text-center mb-1.5 sm:mb-2">
          تطبيق تفاعلي يجمع بين{' '}
          <strong className="text-sada-violet font-extrabold">تقييم أصوات لينج الستة</strong>، وتنمية المهارات السمعية الخمس، والمتابعة المنظمة للأطفال الصم وضعاف السمع.
        </p>

        {/* Core Pillars Pills — Hidden on ultra-compact hero fold to keep all 5 characters comfortably above fold */}
        <div className="hidden min-[380px]:grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2.5 max-w-2xl w-full sm:w-auto">
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
                className={`flex items-center justify-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1.5 rounded-xl text-[11px] sm:text-sm font-bold border ${item.color}`}
              >
                <Icon size={13} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Inline Story Mode Choice (non-blocking, constant height) */}
        <StoryEntryOverlay />

        {/* Call to Actions — keep quick jump pills compact on desktop, omit extra mobile row when audio mode takes priority */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-3 mb-2 w-auto">
          <button
            type="button"
            onClick={() => {
              storyAudioController.chooseEntryMode('story');
              soundEngine.playSuccess();
            }}
            className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-2xl bg-sada-violet hover:bg-sada-violet-dark text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sada-violet/25 hover:scale-105 active:scale-95 transition-all"
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
            className="min-h-[44px] flex items-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white hover:bg-sada-lavender/40 text-sada-ink font-bold text-xs sm:text-base border-2 border-sada-violet/20 hover:border-sada-violet/50 shadow-sm transition-all active:scale-95"
          >
            <Sparkles size={15} className="text-sada-teal" />
            <span>تقييم أصوات لينج</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPop();
              onAboutClick();
            }}
            className="min-h-[44px] px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white/80 hover:bg-white text-sada-ink/85 font-bold text-xs sm:text-base border border-sada-ink/10 transition-all active:scale-95"
          >
            فهم التحدي
          </button>
        </div>

        {/* Staged 5-Character Ensemble */}
        <div ref={castRef} className="relative w-full max-w-5xl mt-1">
          <div
            aria-hidden="true"
            className="mx-auto w-4/5 h-7 rounded-[100%] -mb-4"
            style={{ background: 'radial-gradient(ellipse at center, rgba(39,33,62,0.12) 0%, transparent 72%)' }}
          />

          {/* Desktop & Tablet Panoramic 5-Character Cast (Jana elevated centerpiece protagonist) */}
          <div className="hidden sm:grid sm:grid-cols-5 items-end justify-items-center gap-2 sm:gap-3 px-1">
            <div>
              <CharacterStageActor
                characterId="omar"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'omar'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'omar')}
                heightClass="h-40 md:h-48 lg:h-52"
                onClick={() => storyAudioController.replayCurrentScene()}
              />
            </div>
            <div>
              <CharacterStageActor
                characterId="zain"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'zain'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'zain')}
                heightClass="h-40 md:h-48 lg:h-52"
                onClick={() => onAboutClick()}
              />
            </div>
            <div className="relative flex flex-col items-center">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,197,82,0.34) 0%, rgba(255,197,82,0.08) 55%, transparent 74%)',
                }}
              />
              <CharacterStageActor
                characterId="jana"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'jana'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'jana')}
                heightClass="h-52 md:h-64 lg:h-72"
                onClick={() => storyAudioController.replayCurrentScene()}
              />
            </div>
            <div>
              <CharacterStageActor
                characterId="maryam"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'maryam'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'maryam')}
                heightClass="h-40 md:h-48 lg:h-52"
                onClick={() => onExploreClick()}
              />
            </div>
            <div>
              <CharacterStageActor
                characterId="nour"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'nour'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'nour')}
                heightClass="h-40 md:h-48 lg:h-52"
                onClick={() => onAboutClick()}
              />
            </div>
          </div>

          {/* Mobile Panoramic V-Arc 5-Character Ensemble — Jana centered & taller, stays cleanly above StoryAudioBar */}
          <div className="sm:hidden flex items-end justify-center gap-0.5 px-0 pt-1">
            <div className="-mx-0.5 relative z-10">
              <CharacterStageActor
                characterId="omar"
                eager
                showLabel={false}
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'omar'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'omar')}
                heightClass="h-24 min-[375px]:h-28 min-[410px]:h-32"
                onClick={() => storyAudioController.replayCurrentScene()}
              />
            </div>
            <div className="-mx-0.5 relative z-10">
              <CharacterStageActor
                characterId="zain"
                eager
                showLabel={false}
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'zain'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'zain')}
                heightClass="h-24 min-[375px]:h-28 min-[410px]:h-32"
                onClick={() => onAboutClick()}
              />
            </div>
            <div className="relative z-20 mx-0.5 flex flex-col items-center">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,197,82,0.34) 0%, transparent 72%)',
                }}
              />
              <CharacterStageActor
                characterId="jana"
                eager
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'jana'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'jana')}
                heightClass="h-32 min-[375px]:h-40 min-[410px]:h-44"
                onClick={() => storyAudioController.replayCurrentScene()}
              />
            </div>
            <div className="-mx-0.5 relative z-10">
              <CharacterStageActor
                characterId="maryam"
                eager
                showLabel={false}
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'maryam'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'maryam')}
                heightClass="h-24 min-[375px]:h-28 min-[410px]:h-32"
                onClick={() => onExploreClick()}
              />
            </div>
            <div className="-mx-0.5 relative z-10">
              <CharacterStageActor
                characterId="nour"
                eager
                showLabel={false}
                isActiveScene={isHeroScene}
                isSpeaking={isHeroScene && activeSpeakerId === 'nour'}
                isDimmed={Boolean(isHeroScene && activeSpeakerId && activeSpeakerId !== 'nour')}
                heightClass="h-24 min-[375px]:h-28 min-[410px]:h-32"
                onClick={() => onAboutClick()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="relative mt-2 sm:mt-4 flex flex-col items-center justify-center gap-1 text-sada-violet">
        <span className="text-xs font-bold opacity-85">مرّر لمتابعة فصول الحكاية</span>
        <ArrowDown size={16} className="animate-bounce opacity-75" />
      </div>
    </section>
  );
};
