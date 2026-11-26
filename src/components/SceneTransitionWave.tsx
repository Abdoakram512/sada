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
      className="relative w-full h-14 sm:h-20 overflow-hidden pointer-events-none select-none transform-gpu"
      style={{
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
      }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        shapeRendering="optimizeSpeed"
        className={`w-full h-full ${flip ? 'scale-x-[-1]' : ''}`}
      >
        <path
          d="M0,56 C240,96 480,14 720,54 C960,94 1200,12 1440,56 L1440,100 L0,100 Z"
          fill={toColor}
          opacity="0.96"
        />
        <path
          d="M0,44 C260,82 520,8 780,46 C1040,84 1260,18 1440,46"
          fill="none"
          stroke={waveColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.18"
        />
        <path
          d="M0,56 C240,96 480,14 720,54 C960,94 1200,12 1440,56"
          fill="none"
          stroke={waveColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.38"
        />
      </svg>
    </div>
  );
};
