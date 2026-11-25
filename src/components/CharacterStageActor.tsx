import React from 'react';
import { CHARACTERS } from '../data/sadaData';
import type { CharacterId } from '../data/storyManifest';

interface CharacterStageActorProps {
  characterId: CharacterId;
  isSpeaking?: boolean;
  isDimmed?: boolean;
  sizeClass?: string;
  showLabel?: boolean;
  bubbleText?: string;
  onClick?: () => void;
  eager?: boolean;
}

export const CharacterStageActor: React.FC<CharacterStageActorProps> = ({
  characterId,
  isSpeaking = false,
  isDimmed = false,
  sizeClass = 'w-32 sm:w-44 md:w-52',
  showLabel = true,
  bubbleText,
  onClick,
  eager = false,
}) => {
  const char = CHARACTERS.find((c) => c.id === characterId) || CHARACTERS[0];
  const isFemale = characterId === 'maryam' || characterId === 'nour' || characterId === 'sarah';
  const defaultSpeakLabel = isFemale ? `${char.name} تتحدث` : `${char.name} يتحدث`;

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
      className={`relative flex flex-col items-center select-none transition-all duration-500 ${
        onClick ? 'cursor-pointer' : ''
      } ${isDimmed ? 'opacity-70 scale-95' : 'opacity-100'} ${sizeClass}`}
    >
      {/* Active Speaker Aura & Voice Indicator */}
      {isSpeaking && (
        <div
          className="absolute -inset-2 rounded-full blur-2xl opacity-35 pointer-events-none transition-opacity duration-300"
          style={{ backgroundColor: char.accentColor }}
        />
      )}

      {/* Reserved fixed-height badge slot prevents CLS when speaking toggles */}
      <div className="h-7 mb-1.5 flex items-center justify-center z-20">
        {(isSpeaking || bubbleText) && (
          <div
            className="px-3 py-1 rounded-full bg-white/95 border shadow-sm flex items-center gap-2"
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

      {/* Character Cutout with distortion-free GPU transform animation & reserved aspect ratio */}
      <div
        className={`relative z-10 w-full aspect-[4/5] flex items-end justify-center transition-transform duration-500 ${
          isSpeaking ? 'animate-char-speak' : 'animate-char-breathe hover:scale-105'
        }`}
      >
        <img
          src={char.image}
          alt={`${char.name} — ${char.roleTitle}`}
          width={400}
          height={500}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-contain"
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
