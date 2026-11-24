import React, { useEffect, useState } from 'react';

interface OpeningLoaderProps {
  onComplete: () => void;
}

export const OpeningLoader: React.FC<OpeningLoaderProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const [waveProgress, setWaveProgress] = useState(0);

  useEffect(() => {
    // Quick, elegant 1.2s reveal
    const interval = setInterval(() => {
      setWaveProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFading(true);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 15;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-sada-ink transition-opacity duration-700 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Sound Wave Logo */}
        <div className="flex items-center gap-1.5 h-16 mb-6">
          {[24, 48, 64, 40, 56, 32, 48].map((height, i) => (
            <div
              key={i}
              className="w-2.5 rounded-full bg-gradient-to-t from-sada-violet via-sada-teal to-sada-yellow animate-sound-bar"
              style={{
                height: `${height}px`,
                animationDelay: `${i * 0.12}s`,
                animationDuration: '0.9s'
              }}
            />
          ))}
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-wide mb-2 flex items-center justify-center gap-2">
            <span>صَــدَى</span>
            <span className="text-xl font-medium text-sada-yellow px-2 py-0.5 rounded-md bg-white/10 tracking-widest uppercase">
              SADA
            </span>
          </h1>
          <p className="text-sm md:text-base text-sada-lavender/80 font-medium tracking-normal">
            «لكل صوت حكاية... ولكل طفل رحلة»
          </p>
        </div>

        {/* Progress bar line */}
        <div className="w-48 h-1 bg-white/15 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sada-violet via-sada-teal to-sada-yellow transition-all duration-300 rounded-full"
            style={{ width: `${waveProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
