import React from 'react';

interface SceneTransitionWaveProps {
  fromColor?: string;
  toColor?: string;
  waveColor?: string;
  flip?: boolean;
}

export const SceneTransitionWave: React.FC<SceneTransitionWaveProps> = ({
  fromColor = '#FFF8ED',
  toColor = '#FDFBF7',
  waveColor = '#7357D9',
  flip = false,
}) => {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-12 sm:h-16 overflow-hidden pointer-events-none select-none"
      style={{
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
      }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={`w-full h-full ${flip ? 'scale-x-[-1]' : ''}`}
      >
        <path
          d="M0,50 C240,95 480,5 720,50 C960,95 1200,5 1440,50 L1440,100 L0,100 Z"
          fill={toColor}
          opacity="0.94"
        />
        <path
          d="M0,50 C240,95 480,5 720,50 C960,95 1200,5 1440,50"
          fill="none"
          stroke={waveColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
    </div>
  );
};
