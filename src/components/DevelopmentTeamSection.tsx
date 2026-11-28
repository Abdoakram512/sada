import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Phone, MessageCircle } from 'lucide-react';
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
}

const ENGINEERS: EngineerProfile[] = [
  {
    id: 'akram',
    displayName: 'أكرم',
    secondaryName: 'عبدالرحمن أكرم',
    role: 'مهندس برمجيات',
    image: '/assets/eng_akram.webp',
    badgeColor: '#7357D9',
  },
  {
    id: 'abualqasim',
    displayName: 'أبو القاسم',
    role: 'مهندس برمجيات',
    image: '/assets/eng_abualqasim.webp',
    badgeColor: '#159D98',
  },
];

const CONTACT_PHONE_DISPLAY = '01115240237';
const CONTACT_TEL_HREF = 'tel:+201115240237';
const CONTACT_WHATSAPP_HREF = 'https://wa.me/201115240237';

/** Compact scene introducing the two software engineers who built the SADA web experience. */
export const DevelopmentTeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-11-dev-team');

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(cards.children, {
        y: 18,
        scale: 0.97,
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

  return (
    <section
      ref={sectionRef}
      id="developers"
      data-scene-id="scene-11-dev-team"
      className="sada-scene bg-sada-cream pt-16 pb-28 sm:py-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Scene Header + Compact Jana Host */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sada-mint/15 text-sada-teal text-xs font-bold mb-2.5">
            <Code2 size={15} />
            <span>المشهد 11 · فريق التطوير</span>
          </div>

          <h2 className="sada-section-title font-black text-sada-ink mb-2">
            فريق <span className="text-sada-violet">التطوير</span>
          </h2>

          <p className="sada-body-copy text-sada-ink/75 font-medium max-w-xl mb-4">
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

        {/* Two Engineers — Equal visual weight, clean side-by-side grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 max-w-3xl mx-auto mb-6 sm:mb-8"
        >
          {ENGINEERS.map((eng) => (
            <article
              key={eng.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-sada-ink/10 shadow-sm flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="w-full h-48 sm:h-56 flex items-end justify-center mb-3">
                <img
                  src={eng.image}
                  alt={`${eng.displayName} — ${eng.role}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto object-contain select-none drop-shadow-sm"
                />
              </div>

              <div className="min-h-[3.25rem] flex flex-col items-center justify-center">
                <h3 className="text-xl sm:text-2xl font-black text-sada-ink leading-tight">
                  {eng.displayName}
                </h3>
                {eng.secondaryName ? (
                  <p className="text-xs sm:text-sm font-semibold text-sada-ink/60 mt-1">
                    {eng.secondaryName}
                  </p>
                ) : null}
              </div>

              <span
                className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold text-white mt-2.5"
                style={{ backgroundColor: eng.badgeColor }}
              >
                {eng.role}
              </span>
            </article>
          ))}
        </div>

        {/* Shared Contact Block — Displayed once */}
        <div className="max-w-lg mx-auto bg-white rounded-3xl px-5 py-4 sm:px-6 sm:py-5 border border-sada-ink/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <p className="text-xs font-bold text-sada-teal mb-0.5">للتواصل</p>
            <a
              href={CONTACT_TEL_HREF}
              dir="ltr"
              className="text-lg font-black text-sada-ink hover:text-sada-violet transition-colors inline-block"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
            <a
              href={CONTACT_TEL_HREF}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-2xl bg-sada-ink/5 hover:bg-sada-ink/10 text-sada-ink text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sada-violet"
            >
              <Phone size={15} />
              <span>اتصال</span>
            </a>
            <a
              href={CONTACT_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-2xl bg-sada-teal hover:bg-sada-mint text-white text-xs font-bold transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sada-teal"
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
