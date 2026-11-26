import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type SceneTransitionVariant =
  | 'sound-burst'
  | 'tablet-arch'
  | 'prism-split'
  | 'adventure-ribbon'
  | 'horizon-ripple'
  | 'arcade-curtain'
  | 'starlight-bridge'
  | 'timeline-sweep'
  | 'human-arch'
  | 'curtain-finale';

interface SceneTransitionProps {
  variant: SceneTransitionVariant;
  fromColor: string;
  toColor: string;
  accentColor?: string;
}

const TRANSITION_PATHS: Record<
  SceneTransitionVariant,
  { fillPath: string; strokePath: string; secondaryPath?: string; heightClass?: string }
> = {
  'sound-burst': {
    fillPath: 'M0,48 Q360,96 720,48 T1440,48 L1440,120 L0,120 Z',
    strokePath: 'M0,48 Q360,96 720,48 T1440,48',
    secondaryPath: 'M0,30 Q360,78 720,30 T1440,30',
    heightClass: 'h-14 sm:h-24',
  },
  'tablet-arch': {
    fillPath: 'M0,88 C280,10 1160,10 1440,88 L1440,120 L0,120 Z',
    strokePath: 'M0,88 C280,10 1160,10 1440,88',
    secondaryPath: 'M120,76 C420,24 1020,24 1320,76',
    heightClass: 'h-14 sm:h-24',
  },
  'prism-split': {
    fillPath: 'M0,64 C240,18 480,96 720,52 C960,8 1200,90 1440,48 L1440,120 L0,120 Z',
    strokePath: 'M0,64 C240,18 480,96 720,52 C960,8 1200,90 1440,48',
    heightClass: 'h-16 sm:h-28',
  },
  'adventure-ribbon': {
    fillPath: 'M0,40 C180,90 360,12 540,56 C720,98 900,14 1080,56 C1260,96 1360,30 1440,44 L1440,120 L0,120 Z',
    strokePath: 'M0,40 C180,90 360,12 540,56 C720,98 900,14 1080,56 C1260,96 1360,30 1440,44',
    heightClass: 'h-16 sm:h-28',
  },
  'horizon-ripple': {
    fillPath: 'M0,72 Q420,32 720,66 T1440,54 L1440,120 L0,120 Z',
    strokePath: 'M0,72 Q420,32 720,66 T1440,54',
    secondaryPath: 'M0,50 Q420,14 720,46 T1440,36',
    heightClass: 'h-14 sm:h-24',
  },
  'arcade-curtain': {
    fillPath: 'M0,84 L320,28 L720,68 L1120,22 L1440,78 L1440,120 L0,120 Z',
    strokePath: 'M0,84 L320,28 L720,68 L1120,22 L1440,78',
    heightClass: 'h-16 sm:h-28',
  },
  'starlight-bridge': {
    fillPath: 'M0,24 Q720,108 1440,24 L1440,120 L0,120 Z',
    strokePath: 'M0,24 Q720,108 1440,24',
    secondaryPath: 'M140,38 Q720,94 1300,38',
    heightClass: 'h-16 sm:h-28',
  },
  'timeline-sweep': {
    fillPath: 'M0,92 L1440,24 L1440,120 L0,120 Z',
    strokePath: 'M0,92 L1440,24',
    heightClass: 'h-14 sm:h-24',
  },
  'human-arch': {
    fillPath: 'M0,90 C360,20 1080,20 1440,90 L1440,120 L0,120 Z',
    strokePath: 'M0,90 C360,20 1080,20 1440,90',
    heightClass: 'h-14 sm:h-24',
  },
  'curtain-finale': {
    fillPath: 'M0,36 C360,96 540,96 720,44 C900,96 1080,96 1440,36 L1440,120 L0,120 Z',
    strokePath: 'M0,36 C360,96 540,96 720,44 C900,96 1080,96 1440,36',
    secondaryPath: 'M0,22 C360,76 540,76 720,28 C900,76 1080,76 1440,22',
    heightClass: 'h-16 sm:h-28',
  },
};

const LING_NODES = [
  { x: 240, y: 50, color: '#7357D9' },
  { x: 430, y: 68, color: '#159D98' },
  { x: 620, y: 58, color: '#FFC552' },
  { x: 820, y: 40, color: '#FF886F' },
  { x: 1010, y: 56, color: '#8F75EC' },
  { x: 1200, y: 60, color: '#32B8B3' },
];

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  variant,
  fromColor,
  toColor,
  accentColor = '#7357D9',
}) => {
  const geom = TRANSITION_PATHS[variant];
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    // Variant-specific GPU-composited motion (single lightweight ScrollTrigger per transition)
    const isSweep = variant === 'timeline-sweep' || variant === 'adventure-ribbon';
    const isCurtain = variant === 'arcade-curtain' || variant === 'curtain-finale';
    const isArch = variant === 'tablet-arch' || variant === 'human-arch' || variant === 'starlight-bridge';

    mm.add(
      {
        isMobile: '(max-width: 767px)',
        isDesktop: '(min-width: 768px)',
      },
      (context) => {
        const { isMobile } = context.conditions || { isMobile: false };
        const yFrom = isMobile ? 10 : 16;
        const scaleFrom = isArch ? 0.96 : isCurtain ? 1.04 : 1;

        gsap.fromTo(
          svg,
          {
            y: isSweep ? (isMobile ? 6 : 10) : yFrom,
            scaleY: scaleFrom,
            transformOrigin: 'center bottom',
          },
          {
            y: 0,
            scaleY: 1,
            ease: 'power2.out',
            duration: 0.65,
            force3D: true,
            clearProps: 'transform',
            scrollTrigger: {
              trigger: wrap,
              start: 'top 92%',
              once: true,
            },
          }
        );
      },
      wrap
    );

    return () => mm.revert();
  }, [variant]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`relative w-full ${geom.heightClass || 'h-14 sm:h-24'} overflow-hidden pointer-events-none select-none transform-gpu`}
      style={{
        background: `linear-gradient(to bottom, ${fromColor} 0%, ${fromColor} 35%, ${toColor} 100%)`,
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        shapeRendering="optimizeSpeed"
        className="w-full h-full will-change-transform"
      >
        <path d={geom.fillPath} fill={toColor} />
        {geom.secondaryPath && (
          <path
            d={geom.secondaryPath}
            fill="none"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={variant === 'adventure-ribbon' ? '10 12' : undefined}
            opacity="0.28"
          />
        )}
        <path
          d={geom.strokePath}
          fill="none"
          stroke={accentColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray={variant === 'adventure-ribbon' ? '12 10' : undefined}
          opacity="0.5"
        />
        {variant === 'prism-split' &&
          LING_NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="7" fill={n.color} opacity="0.88" />
          ))}
        {variant === 'starlight-bridge' &&
          [320, 560, 720, 880, 1120].map((x, idx) => (
            <circle
              key={idx}
              cx={x}
              cy={idx === 2 ? 78 : idx === 1 || idx === 3 ? 66 : 48}
              r={idx === 2 ? '6.5' : '4.5'}
              fill="#FFC552"
              opacity="0.85"
            />
          ))}
      </svg>
    </div>
  );
};
