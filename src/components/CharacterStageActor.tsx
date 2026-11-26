import React from 'react';
import { CHARACTERS } from '../data/sadaData';
import type { CharacterId } from '../data/storyManifest';

interface CharacterStageActorProps {
  characterId: CharacterId;
  isSpeaking?: boolean;
  isDimmed?: boolean;
  isActiveScene?: boolean;
  sizeClass?: string;
  heightClass?: string;
  showLabel?: boolean;
  bubbleText?: string;
  onClick?: () => void;
  eager?: boolean;
}

export const CharacterStageActor: React.FC<CharacterStageActorProps> = ({
  characterId,
  isSpeaking = false,
  isDimmed = false,
  isActiveScene = false,
  sizeClass = 'w-auto',
  heightClass = 'h-48 sm:h-56 md:h-64',
  showLabel = true,
  bubbleText,
  onClick,
  eager = false,
}) => {
  const char = CHARACTERS.find((c) => c.id === characterId) || CHARACTERS[0];
  const isFemale = characterId === 'maryam' || characterId === 'nour' || characterId === 'sarah';
  const defaultSpeakLabel = isFemale ? `${char.name} تتحدث` : `${char.name} يتحدث`;
  const shouldAnimateIdle = isActiveScene;
  const mobileSrc = char.image.replace('.webp', '-sm.webp');

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label={onClick ? `${char.name} — ${char.roleTitle}` : undefined}
      className={`relative flex flex-col items-center select-none transition-[opacity,transform] duration-500 ease-out ${
        onClick ? 'cursor-pointer active:scale-95' : ''
      } ${
        isSpeaking
          ? 'opacity-100 scale-[1.06] -translate-y-1.5 z-30'
          : isDimmed
          ? 'opacity-75 scale-[0.94] z-10'
          : 'opacity-100 scale-100 z-10'
      } ${sizeClass}`}
    >
      {/* Active Speaker Spotlight Halo (lightweight dual radial glow — zero blur filter cost) */}
      {isSpeaking && (
        <div
          aria-hidden="true"
          className="absolute -inset-4 rounded-full pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${char.accentColor}48 0%, ${char.accentColor}16 45%, transparent 74%)`,
          }}
        />
      )}

      {/* Reserved fixed-height badge slot prevents CLS when speaking toggles */}
      <div className="h-6 sm:h-7 mb-1 flex items-center justify-center z-20">
        {(isSpeaking || bubbleText) && (
          <div
            className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 border shadow-sm flex items-center gap-1.5 sm:gap-2"
            style={{ borderColor: `${char.accentColor}45` }}
          >
            {isSpeaking && (
              <span className="flex items-end gap-0.5 h-3" aria-hidden="true">
                <span
                  className="w-1 rounded-full animate-sound-bar"
                  style={{ height: '10px', backgroundColor: char.accentColor, animationDelay: '0ms' }}
                />
                <span
                  className="w-1 rounded-full animate-sound-bar"
                  style={{ height: '12px', backgroundColor: char.accentColor, animationDelay: '150ms' }}
                />
                <span
                  className="w-1 rounded-full animate-sound-bar"
                  style={{ height: '8px', backgroundColor: char.accentColor, animationDelay: '300ms' }}
                />
              </span>
            )}
            <span className="text-[11px] font-extrabold text-sada-ink whitespace-nowrap">
              {bubbleText || defaultSpeakLabel}
            </span>
          </div>
        )}
      </div>

      {/* Character Cutout with distortion-free height normalization & responsive srcSet */}
      <div
        className={`relative z-10 ${heightClass} flex items-end justify-center transition-transform duration-500 ${
          isSpeaking ? 'animate-char-speak' : shouldAnimateIdle ? 'animate-char-breathe hover:scale-105' : 'hover:scale-105'
        }`}
      >
        <img
          src={char.image}
          srcSet={`${mobileSrc} 220w, ${char.image} 400w`}
          sizes="(max-width: 639px) 160px, 280px"
          alt={`${char.name} — ${char.roleTitle}`}
          width={390}
          height={750}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'low'}
          decoding="async"
          className="h-full w-auto max-w-full object-contain object-bottom"
        />
      </div>

      {/* Nameplate */}
      {showLabel && (
        <div
          className={`mt-1.5 px-3 py-0.5 rounded-full text-xs font-extrabold border transition-colors ${
            isSpeaking
              ? 'text-white shadow-sm'
              : 'bg-white/90 text-sada-ink border-sada-violet/15'
          }`}
          style={{
            backgroundColor: isSpeaking ? char.accentColor : undefined,
            borderColor: isSpeaking ? char.accentColor : undefined,
          }}
        >
          {char.name}
        </div>
      )}
    </div>
  );
};
