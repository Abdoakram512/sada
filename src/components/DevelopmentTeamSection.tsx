import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Phone,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  Volume2,
  Play,
  Terminal,
} from 'lucide-react';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { storyAudioController } from '../utils/storyAudioController';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

interface EngineerData {
  id: 'akram' | 'abualqasim';
  displayName: string;
  secondaryName?: string;
  role: string;
  image: string;
  image2x?: string;
  themeColor: string;
  glowColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentPill: string;
}

const ENGINEERS: EngineerData[] = [
  {
    id: 'akram',
    displayName: 'أكرم',
    secondaryName: 'عبدالرحمن أكرم',
    role: 'مهندس برمجيات',
    image: '/assets/eng_akram.webp',
    image2x: '/assets/eng_akram@2x.webp',
    themeColor: '#7357D9',
    glowColor: 'rgba(115, 87, 217, 0.22)',
    badgeBg: 'rgba(115, 87, 217, 0.1)',
    badgeBorder: 'rgba(115, 87, 217, 0.25)',
    badgeText: '#583EB8',
    accentPill: 'هندسة وبرمجة صدى',
  },
  {
    id: 'abualqasim',
    displayName: 'أبو القاسم',
    role: 'مهندس برمجيات',
    image: '/assets/eng_abualqasim.webp',
    image2x: '/assets/eng_abualqasim@2x.webp',
    themeColor: '#159D98',
    glowColor: 'rgba(21, 157, 152, 0.22)',
    badgeBg: 'rgba(21, 157, 152, 0.1)',
    badgeBorder: 'rgba(21, 157, 152, 0.25)',
    badgeText: '#0E7A76',
    accentPill: 'هندسة وبرمجة صدى',
  },
];

const CONTACT_PHONE_DISPLAY = '01115240237';
const CONTACT_TEL_HREF = 'tel:+201115240237';
const CONTACT_WHATSAPP_HREF = 'https://wa.me/201115240237';

const JANA_DEV_LINE =
  'وقبل ما نخلص حكايتنا، حابة أعرفكم على المهندسين اللي اشتغلوا على تطوير صدى، أكرم وأبو القاسم.';

export const DevelopmentTeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const charactersRef = useRef<HTMLDivElement | null>(null);
  const janaRef = useRef<HTMLDivElement | null>(null);
  const dockRef = useRef<HTMLDivElement | null>(null);

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [hoveredEng, setHoveredEng] = useState<string | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-11-dev-team');

  const isJanaSpeaking = isSceneActive && activeSpeakerId === 'jana';

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const characters = charactersRef.current;
    const jana = janaRef.current;
    const dock = dockRef.current;

    if (!section || !stage) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          once: true,
        },
      });

      // Characters rise from pedestal
      if (characters) {
        tl.from(
          characters.children,
          {
            opacity: 0,
            y: 35,
            duration: 0.65,
            stagger: 0.15,
            ease: 'power2.out',
            clearProps: 'all',
          }
        );
      }

      // Jana greeting entrance
      if (jana) {
        tl.from(
          jana,
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.55,
            ease: 'power2.out',
            clearProps: 'all',
          },
          '-=0.4'
        );
      }

      // Floating dock glide up
      if (dock) {
        tl.from(
          dock,
          {
            opacity: 0,
            y: 20,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'all',
          },
          '-=0.25'
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard?.writeText(CONTACT_PHONE_DISPLAY);
      setCopiedPhone(true);
      window.setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handlePlayJanaAudio = () => {
    storyAudioController.playScene('scene-11-dev-team', true);
  };

  return (
    <section
      ref={sectionRef}
      id="developers"
      data-scene-id="scene-11-dev-team"
      className="sada-scene bg-sada-cream relative pt-8 pb-16 sm:pt-16 sm:pb-32 overflow-hidden select-none"
    >
      {/* Ambient background glow & atmospheric sound elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
      >
        {/* Soft radial atmospheric aura */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[750px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(115, 87, 217, 0.12) 0%, rgba(21, 157, 152, 0.08) 40%, rgba(255, 197, 82, 0.05) 65%, transparent 80%)',
          }}
        />

        {/* Ambient floating decorative sound stars / tech accents */}
        <div className="absolute top-16 right-[12%] text-sada-violet/25 text-2xl font-black animate-pulse">
          ✦
        </div>
        <div className="absolute top-28 left-[14%] text-sada-teal/25 text-3xl font-black">
          ★
        </div>
        <div className="absolute bottom-24 right-[18%] text-sada-yellow/40 text-xl font-bold">
          ✦
        </div>
        <div className="absolute bottom-32 left-[12%] text-sada-violet/20 text-2xl font-bold">
          +
        </div>

        {/* Curved decorative wave accent */}
        <svg
          className="absolute top-1/3 left-0 w-full h-48 opacity-25 text-sada-teal/30 pointer-events-none"
          viewBox="0 0 1440 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C320,180 480,20 800,110 C1120,200 1280,40 1440,100 L1440,200 L0,200 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Scene Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-mint/15 text-sada-teal-dark text-xs sm:text-sm font-extrabold mb-3 shadow-xs border border-sada-teal/15">
            <Code2 size={16} className="text-sada-teal" />
            <span>المشهد 11 · فريق التطوير</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-sada-ink tracking-tight mb-2.5">
            فريق{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sada-violet via-sada-violet-light to-sada-teal">
              التطوير
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-sada-ink/75 font-medium max-w-xl leading-relaxed">
            وراء تنفيذ تجربة صَـدَى الرقمية وتحويل الفكرة إلى حكاية تفاعلية متكاملة
          </p>
        </div>

        {/* Host Jana Integration: Introducing the Engineers */}
        <div
          ref={janaRef}
          className="max-w-2xl mx-auto mb-4 sm:mb-8 flex flex-row items-center justify-center gap-2.5 sm:gap-4 px-2 sm:px-3"
        >
          {/* Jana Miniature Host Actor */}
          <div className="flex-shrink-0 cursor-pointer" onClick={handlePlayJanaAudio}>
            <CharacterStageActor
              characterId="jana"
              heightClass="h-20 min-[390px]:h-24 sm:h-36 md:h-44"
              showLabel={false}
              isActiveScene={isSceneActive}
              isSpeaking={isJanaSpeaking}
            />
          </div>

          {/* Jana Speech Capsule */}
          <div
            onClick={handlePlayJanaAudio}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handlePlayJanaAudio();
            }}
            className="flex-1 max-w-lg bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-sada-violet/20 shadow-md transition-all duration-300 hover:shadow-lg hover:border-sada-violet/40 text-right cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-sada-violet">
                <Sparkles size={13} className="text-sada-yellow" />
                <span>جنى تُعرّفكم على الفريق</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-sada-ink/50 group-hover:text-sada-violet transition-colors">
                {isJanaSpeaking ? (
                  <>
                    <Volume2 size={12} className="text-sada-teal animate-pulse" />
                    <span>تتحدث الآن</span>
                  </>
                ) : (
                  <>
                    <Play size={11} />
                    <span>استمع</span>
                  </>
                )}
              </span>
            </div>

            <p className="text-[11px] sm:text-sm font-semibold text-sada-ink leading-relaxed">
              «{JANA_DEV_LINE}»
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GRAND UNIFIED HERO STAGE (COMPLETELY CARD-FREE & DOMINANT CHARACTERS)      */}
        {/* ========================================================================= */}
        <div
          ref={stageRef}
          className="relative w-full max-w-5xl mx-auto pt-4 pb-8 sm:pb-12"
        >
          {/* Continuous Architectural Stage Base / Pedestal (Layered 3D Elliptical Platform) */}
          <div
            aria-hidden="true"
            className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-[92%] sm:w-[86%] max-w-4xl h-28 sm:h-36 rounded-[50%] -z-10 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 60%, rgba(255, 255, 255, 0.95) 0%, rgba(233, 226, 255, 0.6) 45%, rgba(85, 214, 190, 0.25) 75%, transparent 100%)',
              boxShadow:
                '0 30px 60px -15px rgba(39, 33, 62, 0.12), inset 0 2px 8px rgba(255, 255, 255, 0.8)',
            }}
          />

          {/* Secondary stage rim line */}
          <div
            aria-hidden="true"
            className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 w-[84%] sm:w-[78%] max-w-3xl h-20 sm:h-28 rounded-[50%] border-t border-white/80 -z-10 pointer-events-none opacity-80"
          />

          {/* Duo Characters Grid: Oversized, Dominant, Standing Side-by-Side */}
          <div
            ref={charactersRef}
            className="grid grid-cols-2 gap-4 sm:gap-10 md:gap-16 items-end justify-center max-w-4xl mx-auto"
          >
            {ENGINEERS.map((eng) => {
              const isHovered = hoveredEng === eng.id;

              return (
                <div
                  key={eng.id}
                  onMouseEnter={() => setHoveredEng(eng.id)}
                  onMouseLeave={() => setHoveredEng(null)}
                  className="relative flex flex-col items-center group cursor-pointer"
                >
                  {/* Atmospheric Aura behind each engineer */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 sm:w-72 md:w-88 h-64 sm:h-96 rounded-full pointer-events-none transition-opacity duration-700 -z-10"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${eng.glowColor} 0%, transparent 72%)`,
                      opacity: isHovered ? 1 : 0.6,
                    }}
                  />

                  {/* Character Full-Body Cutout (Pristine Approved Reference) */}
                  <div className="relative flex items-end justify-center select-none">
                    <picture>
                      {eng.image2x && (
                        <source
                          srcSet={`${eng.image} 1x, ${eng.image2x} 2x`}
                          type="image/webp"
                        />
                      )}
                      <img
                        src={eng.image}
                        alt={`${eng.displayName} — ${eng.role}`}
                        loading="eager"
                        decoding="async"
                        className={`h-[280px] min-[390px]:h-[320px] sm:h-[400px] md:h-[480px] lg:h-[580px] xl:h-[660px] w-auto max-w-full object-contain drop-shadow-lg transition-transform duration-500 ease-out ${
                          isHovered
                            ? 'scale-[1.03] -translate-y-2'
                            : 'scale-100 translate-y-0'
                        }`}
                      />
                    </picture>

                    {/* Realistic Ground Contact Shadow under shoes */}
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 min-[390px]:w-36 sm:w-48 md:w-56 h-4 sm:h-6 rounded-[50%] pointer-events-none transition-all duration-500"
                      style={{
                        background:
                          'radial-gradient(ellipse at center, rgba(39, 33, 62, 0.32) 0%, rgba(39, 33, 62, 0.12) 50%, transparent 80%)',
                        transform: `scale(${isHovered ? 0.95 : 1})`,
                        opacity: isHovered ? 0.8 : 1,
                      }}
                    />
                  </div>

                  {/* Anchored Nameplate & Role (Integrated with Stage Base) */}
                  <div className="mt-3 sm:mt-5 text-center flex flex-col items-center z-10">
                    {/* Primary Name */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-sada-ink tracking-tight transition-colors duration-300 group-hover:text-sada-violet">
                      {eng.displayName}
                    </h3>

                    {/* Secondary Name (if present) */}
                    {eng.secondaryName ? (
                      <p className="text-xs sm:text-sm md:text-base font-bold text-sada-ink/65 mt-0.5">
                        {eng.secondaryName}
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm md:text-base font-bold text-sada-ink/65 mt-0.5 opacity-0 pointer-events-none select-none">
                        &nbsp;
                      </p>
                    )}

                    {/* Role Pill */}
                    <div className="mt-1.5 sm:mt-2.5">
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-xs transition-transform duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: eng.badgeBg,
                          borderColor: eng.badgeBorder,
                          color: eng.badgeText,
                          borderWidth: '1px',
                        }}
                      >
                        <Terminal size={13} />
                        <span>{eng.role}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* UNIFIED SHARED CONTACT DOCK (SLEEK FLOATING CAPSULE)                      */}
        {/* ========================================================================= */}
        <div
          ref={dockRef}
          className="mt-4 sm:mt-6 max-w-2xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-3.5 sm:p-5 border border-sada-ink/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 text-center sm:text-right">
            {/* Phone & Direct Display */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sada-lavender/60 text-sada-violet flex items-center justify-center flex-shrink-0 shadow-xs">
                <Phone size={18} />
              </div>

              <div>
                <span className="text-[11px] font-bold text-sada-teal-dark block leading-none mb-1">
                  تواصل مباشر مع فريق التطوير
                </span>
                <a
                  href={CONTACT_TEL_HREF}
                  dir="ltr"
                  className="text-lg sm:text-xl font-black text-sada-ink hover:text-sada-violet transition-colors inline-block tracking-wider"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>

              {/* Copy Phone Button */}
              <button
                type="button"
                onClick={handleCopyPhone}
                aria-label="نسخ رقم التواصل"
                className="min-w-[40px] min-h-[40px] rounded-2xl bg-sada-surface hover:bg-sada-lavender/50 text-sada-ink/75 hover:text-sada-violet flex items-center justify-center transition-colors border border-sada-ink/5"
                title={copiedPhone ? 'تم النسخ بنجاح' : 'نسخ رقم الهاتف'}
              >
                {copiedPhone ? (
                  <Check size={17} className="text-sada-teal stroke-[2.5]" />
                ) : (
                  <Copy size={17} />
                )}
              </button>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
              <a
                href={CONTACT_TEL_HREF}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 min-h-[44px] px-5 py-2.5 rounded-2xl bg-sada-ink/5 hover:bg-sada-ink/10 text-sada-ink text-xs sm:text-sm font-black transition-colors"
              >
                <Phone size={15} />
                <span>اتصال مباشر</span>
              </a>

              <a
                href={CONTACT_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 min-h-[44px] px-5 py-2.5 rounded-2xl bg-sada-teal hover:bg-sada-teal-dark text-white text-xs sm:text-sm font-black transition-all shadow-md hover:shadow-lg"
              >
                <MessageCircle size={16} />
                <span>محادثة واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
