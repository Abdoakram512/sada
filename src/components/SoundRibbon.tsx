import React, { useEffect, useRef } from 'react';

interface SoundRibbonProps {
  scrollProgressRef: React.MutableRefObject<number>;
  activeColorRef: React.MutableRefObject<string>;
}

// GPU-accelerated dual harmonic SVG ribbon driven by refs (zero canvas redraw overhead, zero React re-renders)
export const SoundRibbon: React.FC<SoundRibbonProps> = ({
  scrollProgressRef,
  activeColorRef,
}) => {
  const wave1Ref = useRef<SVGSVGElement | null>(null);
  const wave2Ref = useRef<SVGSVGElement | null>(null);
  const path1Ref = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number | null = null;
    let phase = 0;
    let lastTime = 0;
    let lastColor = '';

    const tick = (now: number) => {
      if (document.hidden) {
        rafId = null;
        return;
      }
      if (now - lastTime >= 32) {
        lastTime = now;
        phase = (phase + 0.45) % 360;
        const scrollShift = scrollProgressRef.current * 140;

        if (wave1Ref.current) {
          const x1 = -((phase + scrollShift) % 360);
          wave1Ref.current.style.transform = `translate3d(${x1}px, 0, 0)`;
        }
        if (wave2Ref.current) {
          const x2 = -((phase * 0.7 + scrollShift * 1.4) % 360);
          wave2Ref.current.style.transform = `translate3d(${x2}px, 0, 0)`;
        }
        if (path1Ref.current && activeColorRef.current && activeColorRef.current !== lastColor) {
          lastColor = activeColorRef.current;
          path1Ref.current.setAttribute('stroke', lastColor);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [scrollProgressRef, activeColorRef]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60"
    >
      <svg
        ref={wave1Ref}
        viewBox="0 0 1800 240"
        preserveAspectRatio="none"
        shapeRendering="optimizeSpeed"
        className="absolute top-[38%] left-0 w-[calc(100%+360px)] h-48 will-change-transform"
      >
        <path
          ref={path1Ref}
          d="M0,120 Q90,45 180,120 T360,120 T540,120 T720,120 T900,120 T1080,120 T1260,120 T1440,120 T1620,120 T1800,120"
          fill="none"
          stroke="#7357D9"
          strokeWidth="2.5"
          opacity="0.22"
        />
      </svg>

      <svg
        ref={wave2Ref}
        viewBox="0 0 1800 240"
        preserveAspectRatio="none"
        shapeRendering="optimizeSpeed"
        className="absolute top-[46%] left-0 w-[calc(100%+360px)] h-48 will-change-transform"
      >
        <path
          d="M0,120 Q90,185 180,120 T360,120 T540,120 T720,120 T900,120 T1080,120 T1260,120 T1440,120 T1620,120 T1800,120"
          fill="none"
          stroke="#159D98"
          strokeWidth="2"
          opacity="0.16"
        />
      </svg>
    </div>
  );
};
