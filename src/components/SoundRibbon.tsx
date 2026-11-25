import React, { useEffect, useRef } from 'react';

interface SoundRibbonProps {
  scrollProgressRef: React.MutableRefObject<number>;
  activeColorRef: React.MutableRefObject<string>;
}

// Continuous signature SADA sound-wave ribbon driven by mutable refs (zero React re-renders per scroll frame)
export const SoundRibbon: React.FC<SoundRibbonProps> = ({
  scrollProgressRef,
  activeColorRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId: number | null = null;
    let t = 0;
    let lastScroll = -1;
    let lastDrawTime = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const drawFrame = () => {
      const w = canvas.width;
      const h = canvas.height;
      const scroll = scrollProgressRef.current;
      const primaryColor = activeColorRef.current || '#7357D9';

      ctx.clearRect(0, 0, w, h);

      const isMobile = w < 768;
      const step = isMobile ? 28 : 20;

      const ribbons = [
        { color: primaryColor, alpha: 0.16, freq: 0.0018, amp: isMobile ? 26 : 42, speed: 1.0, yOffset: 0.52, width: 2.5 },
        { color: '#159D98', alpha: 0.11, freq: 0.0024, amp: isMobile ? 20 : 32, speed: 0.78, yOffset: 0.56, width: 2 },
        { color: '#FFC552', alpha: 0.1, freq: 0.0013, amp: isMobile ? 30 : 48, speed: 1.15, yOffset: 0.48, width: 1.8 },
      ];

      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.width;
        ctx.globalAlpha = ribbon.alpha;

        const scrollPhase = scroll * 4.5;
        for (let x = 0; x <= w; x += step) {
          const y =
            h * ribbon.yOffset +
            Math.sin(x * ribbon.freq + t * ribbon.speed + scrollPhase) * ribbon.amp +
            Math.cos(x * 0.0007 - t * 0.45 + scroll * 2) * 16;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      if (document.hidden) {
        rafId = null;
        return;
      }
      if (now - lastDrawTime >= 32) {
        lastDrawTime = now;
        t += 0.024;
        drawFrame();
      }
      rafId = requestAnimationFrame(tick);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else if (!prefersReducedMotion && rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    if (prefersReducedMotion) {
      // Static gentle wave when reduced motion is preferred; update only on scroll changes
      drawFrame();
      const staticInterval = window.setInterval(() => {
        if (Math.abs(scrollProgressRef.current - lastScroll) > 0.005) {
          lastScroll = scrollProgressRef.current;
          drawFrame();
        }
      }, 150);

      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibility);
        window.clearInterval(staticInterval);
      };
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [scrollProgressRef, activeColorRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
