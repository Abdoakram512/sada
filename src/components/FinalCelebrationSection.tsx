import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowUp, FileText, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audioEngine';
import { useStorySceneFocus } from '../hooks/useStoryAudio';
import { CharacterStageActor } from './CharacterStageActor';

gsap.registerPlugin(ScrollTrigger);

interface FinalCelebrationSectionProps {
  onScrollToTop: () => void;
}

export const FinalCelebrationSection: React.FC<FinalCelebrationSectionProps> = ({
  onScrollToTop,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const { isSceneActive, activeSpeakerId } = useStorySceneFocus('scene-12-ending');

  useEffect(() => {
    const footer = footerRef.current;
    const stage = stageRef.current;
    if (!footer || !stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from(stage.children, {
        y: 22,
        opacity: 0,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power2.out',
        force3D: true,
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: stage,
          start: 'top 95%',
          once: true,
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const triggerCelebration = () => {
    soundEngine.playSuccess();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#7357D9', '#159D98', '#FFC552', '#FF886F'],
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="ending"
      data-scene-id="scene-12-ending"
      className="sada-scene pb-32 sm:pb-40 bg-gradient-to-b from-[#231D3A] via-[#1C1630] to-[#120F20] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-72 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(115, 87, 217, 0.26) 0%, rgba(21, 157, 152, 0.14) 40%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sada-yellow text-xs font-bold mb-5">
          <Sparkles size={15} />
          <span>المشهد 12 · الختام واجتماع الأبطال</span>
        </div>

        <h2 className="sada-section-title font-black mb-4">
          <span>مع صدى، لكل صوت حكاية، </span>
          <span className="bg-gradient-to-r from-sada-yellow via-sada-coral to-sada-teal-light bg-clip-text text-transparent inline-block py-1">
            ولكل طفل رحلة
          </span>
        </h2>

        <p className="sada-body-copy text-white/80 max-w-2xl mx-auto font-medium text-center mb-8">
          ودي كانت حكاية صدى. كل طفل يستحق فرصة يتعلم ويتواصل ويكتشف العالم بطريقته.
        </p>

        {/* Closing Speakers + Theatrical Group Celebration */}
        <div ref={stageRef} className="grid grid-cols-2 lg:flex lg:items-end lg:justify-center gap-4 sm:gap-10 mb-8 sm:mb-10 justify-items-center">
          <div className="order-1">
            <CharacterStageActor
              characterId="nour"
              heightClass="h-44 sm:h-56 md:h-64"
              isActiveScene={isSceneActive}
              isSpeaking={isSceneActive && activeSpeakerId === 'nour'}
              isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'nour')}
            />
          </div>

          <div className="col-span-2 order-3 lg:order-2 max-w-sm sm:max-w-lg flex items-end justify-center">
            <img
              src="/assets/group_celebrating_transparent.webp"
              srcSet="/assets/group_celebrating_transparent-sm.webp 340w, /assets/group_celebrating_transparent.webp 608w"
              sizes="(max-width: 639px) 320px, 430px"
              alt="جنى وأبطال صدى يحتفلون بنهاية الرحلة"
              width={608}
              height={648}
              loading="lazy"
              decoding="async"
              className="max-h-[270px] sm:max-h-[410px] w-auto object-contain"
            />
          </div>

          <div className="order-2 lg:order-3">
            <CharacterStageActor
              characterId="jana"
              heightClass="h-44 sm:h-56 md:h-64"
              isActiveScene={isSceneActive}
              isSpeaking={isSceneActive && activeSpeakerId === 'jana'}
              isDimmed={Boolean(isSceneActive && activeSpeakerId && activeSpeakerId !== 'jana')}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-10 max-w-xl sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={triggerCelebration}
            className="min-h-[48px] flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-sada-yellow to-amber-500 text-sada-ink font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles size={17} />
            <span>احتفل بإتمام الرحلة</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPop();
              setModalOpen(true);
            }}
            className="min-h-[48px] flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all active:scale-95"
          >
            <FileText size={17} />
            <span>بطاقة ملخص المشروع</span>
          </button>

          <button
            type="button"
            onClick={onScrollToTop}
            className="min-h-[48px] flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/15 text-white/85 font-bold text-sm border border-white/15 transition-all active:scale-95"
          >
            <ArrowUp size={16} />
            <span>العودة إلى بداية الحكاية</span>
          </button>
        </div>

        {/* Footer Info */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/65">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">صَـدَى · SADA</span>
            <span>—</span>
            <span>مشروع تخرج لخدمة الأطفال ضعاف السمع</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              صُنع بكل <Heart size={13} className="text-rose-400 fill-rose-400" /> من أجل كل طفل
            </span>
            <span>•</span>
            <span>2026</span>
          </div>
        </div>
      </div>

      {/* Project Summary Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="بطاقة تعريف مشروع صدى"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fade-in"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-sada-ink relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 left-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-2xl bg-sada-violet text-white flex items-center justify-center font-black text-xl">
                ص
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black">بطاقة تعريف مشروع صدى (SADA)</h3>
                <span className="text-xs text-sada-teal font-bold">ملخص الوثيقة الأكاديمية المعتمدة</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-sada-ink/85 leading-relaxed text-right">
              <p>
                <strong className="text-sada-ink font-bold">طبيعة المشروع:</strong> تطبيق تفاعلي رقمي لتقييم الاستجابة السمعية وتنمية المهارات السمعية لدى الأطفال الصم وضعاف السمع.
              </p>
              <p>
                <strong className="text-sada-ink font-bold">المكونات الأساسية:</strong>
                <br />
                ١. تقييم الاستجابة لأصوات لينج الستة (/m/, /u/, /a/, /i/, /ʃ/, /s/).
                <br />
                ٢. تقييم المهارات السمعية الخمس الأساسية (إدراك، تمييز، تعرف وربط، فهم، إغلاق).
                <br />
                ٣. وحدة تطبيقية إضافية للاستماع في وجود ضوضاء باشتراطات سلامة معتمدة.
                <br />
                ٤. ألعاب تعزيزية ومكافآت بصرية للطفل (وليست أداة تشخيص).
                <br />
                ٥. أدلة إرشادية مخصصة لكل من ولي الأمر والأخصائي.
              </p>
              <div className="p-4 rounded-2xl bg-sada-surface border border-sada-violet/15 text-xs">
                <strong className="text-sada-violet block mb-1">فريق العمل (10 باحثين):</strong>
                جني محمود عزت رضوان، فهد جلال صلاح، شيرين وليد، رحمة شعبان، جيهان محمد فاروق، همس عبد الله عبد السميع، سلمى احمد رضوان، لمياء محمد ابراهيم، ياسمين ايمن محمد، ماجده نبوي حفني.
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="w-full mt-6 py-3 rounded-xl bg-sada-violet hover:bg-sada-violet-dark text-white font-bold text-sm shadow-md transition-all"
            >
              إغلاق النافذة
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
