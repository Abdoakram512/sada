import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Phone, MessageCircle, Copy, Check } from 'lucide-react';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

interface EngineerProfile {
  id: 'akram' | 'abualqasim';
  displayName: string;
  secondaryName?: string;
  role: string;
  image: string;
  badgeColor: string;
  backdropWash: string;
}

const ENGINEERS: EngineerProfile[] = [
  {
    id: 'akram',
    displayName: 'أكرم',
    secondaryName: 'عبدالرحمن أكرم',
    role: 'مهندس برمجيات',
    image: '/assets/eng_akram.webp',
    badgeColor: '#7357D9',
    backdropWash: 'radial-gradient(circle at 50% 45%, rgba(115, 87, 217, 0.14) 0%, transparent 72%)',
  },
  {
    id: 'abualqasim',
    displayName: 'أبو القاسم',
    role: 'مهندس برمجيات',
    image: '/assets/eng_abualqasim.webp',
    badgeColor: '#159D98',
    backdropWash: 'radial-gradient(circle at 50% 45%, rgba(21, 157, 152, 0.14) 0%, transparent 72%)',
  },
];

const CONTACT_PHONE_DISPLAY = '01115240237';
const CONTACT_TEL_HREF = 'tel:+201115240237';
const CONTACT_WHATSAPP_HREF = 'https://wa.me/201115240237';

/** Compact, friendly section introducing the two software engineers behind SADA. */
export const DevelopmentTeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-11-dev-team');

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(cards.children, {
        y: 16,
        scale: 0.98,
        opacity: 0,
        stagger: 0.1,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: cards,
          start: 'top 92%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard?.writeText(CONTACT_PHONE_DISPLAY);
      setCopiedPhone(true);
      window.setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted contexts; keep tel/WhatsApp primary.
    }
  };

  return (
    <section
      ref={sectionRef}
      id="developers"
      data-scene-id="scene-11-dev-team"
      className="sada-scene bg-sada-cream pt-14 pb-28 sm:pt-16 sm:pb-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Scene Header + Compact Jana Host */}
        <div className="flex flex-col items-center text-center mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-mint/15 text-sada-teal-dark text-xs font-bold mb-2.5">
            <Code2 size={15} />
            <span>المشهد 11 · فريق التطوير</span>
          </div>

          <h2 className="sada-section-title font-black text-sada-ink mb-1.5">
            فريق <span className="text-sada-violet">التطوير</span>
          </h2>

          <p className="sada-body-copy text-sada-ink/75 font-medium max-w-xl mb-3">
            وراء تنفيذ تجربة صَـدَى الرقمية وتحويل الفكرة إلى حكاية تفاعلية متكاملة
          </p>

          <CharacterStageActor
            characterId="jana"
            heightClass="h-24 sm:h-28"
            showLabel={false}
            isActiveScene={isSceneActive}
            isSpeaking={isSceneActive && activeSpeakerId === 'jana'}
          />
        </div>

        {/* Two Engineers — Side-by-side at equal visual importance across mobile (360px+) & desktop */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-3 sm:gap-7 max-w-2xl mx-auto mb-5 sm:mb-7"
        >
          {ENGINEERS.map((eng) => (
            <article
              key={eng.id}
              className="bg-white rounded-3xl p-3.5 sm:p-5 border border-sada-ink/10 shadow-sm flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="w-full h-48 min-[390px]:h-56 sm:h-64 md:h-72 rounded-2xl flex items-end justify-center pt-2 mb-3 overflow-hidden"
                style={{ background: eng.backdropWash }}
              >
                <img
                  src={eng.image}
                  alt={`${eng.displayName} — ${eng.role}`}
                  width={280}
                  height={760}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto object-contain select-none drop-shadow-sm"
                />
              </div>

              <div className="min-h-[3.35rem] w-full flex flex-col items-center justify-start">
                <h3 className="text-lg sm:text-2xl font-black text-sada-ink leading-tight">
                  {eng.displayName}
                </h3>
                {eng.secondaryName ? (
                  <p className="text-[11px] sm:text-sm font-semibold text-sada-ink/60 mt-1">
                    {eng.secondaryName}
                  </p>
                ) : null}
              </div>

              <div className="mt-auto pt-2">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold text-white"
                  style={{ backgroundColor: eng.badgeColor }}
                >
                  {eng.role}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Single Shared Contact Block */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl px-4 py-3.5 sm:px-6 sm:py-4 border border-sada-ink/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <div className="flex items-center gap-2.5">
            <div>
              <p className="text-[11px] font-bold text-sada-teal-dark leading-tight">للتواصل</p>
              <a
                href={CONTACT_TEL_HREF}
                dir="ltr"
                className="text-base sm:text-lg font-black text-sada-ink hover:text-sada-violet transition-colors inline-block"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
            <button
              type="button"
              onClick={handleCopyPhone}
              aria-label="نسخ رقم التواصل"
              className="min-w-[36px] min-h-[36px] rounded-xl bg-sada-surface hover:bg-sada-lavender/50 text-sada-ink/70 hover:text-sada-violet flex items-center justify-center transition-colors"
              title={copiedPhone ? 'تم النسخ' : 'نسخ الرقم'}
            >
              {copiedPhone ? <Check size={15} className="text-sada-teal" /> : <Copy size={15} />}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <a
              href={CONTACT_TEL_HREF}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-2xl bg-sada-ink/5 hover:bg-sada-ink/10 text-sada-ink text-xs font-bold transition-colors"
            >
              <Phone size={15} />
              <span>اتصال</span>
            </a>
            <a
              href={CONTACT_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-2xl bg-sada-teal hover:bg-sada-teal-dark text-white text-xs font-bold transition-colors shadow-sm"
            >
              <MessageCircle size={15} />
              <span>واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
