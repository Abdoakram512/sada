import React, { useEffect, useRef } from 'react';

interface SoundRibbonProps {
  scrollProgress?: number;
  activeColor?: string;
}

export const SoundRibbon: React.FC<SoundRibbonProps> = ({
  scrollProgress = 0,
  activeColor = '#7357D9'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw 3 layered organic harmonic ribbons
      const ribbons = [
        { color: activeColor, alpha: 0.18, freq: 0.0015, amp: 45, speed: 1.0, yOffset: 0.5 },
        { color: '#159D98', alpha: 0.12, freq: 0.002, amp: 35, speed: 0.8, yOffset: 0.53 },
        { color: '#FFC552', alpha: 0.10, freq: 0.0012, amp: 55, speed: 1.2, yOffset: 0.47 }
      ];

      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = ribbon.alpha;

        const points: [number, number][] = [];
        const step = 8;
        for (let x = 0; x <= w; x += step) {
          const scrollFactor = scrollProgress * 2;
          const y = h * ribbon.yOffset +
            Math.sin(x * ribbon.freq + t * ribbon.speed + scrollFactor) * ribbon.amp +
            Math.cos(x * 0.0005 - t * 0.5) * 20;
          points.push([x, y]);
        }

        if (points.length > 0) {
          ctx.moveTo(points[0][0], points[0][1]);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
          }
        }
        ctx.stroke();
      });

      // Reset alpha
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress, activeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.85 }}
    />
  );
};
