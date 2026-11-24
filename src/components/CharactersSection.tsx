import React, { useState } from 'react';
import { Sparkles, Quote, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { CHARACTERS } from '../data/sadaData';
import type { Character } from '../data/sadaData';
import { soundEngine } from '../utils/audioEngine';

interface CharactersSectionProps {
  onSelectCharacter?: (char: Character) => void;
}

export const CharactersSection: React.FC<CharactersSectionProps> = ({
  onSelectCharacter
}) => {
  const [selectedId, setSelectedId] = useState<string>('maryam');
  const activeChar = CHARACTERS.find((c) => c.id === selectedId) || CHARACTERS[0];

  const handleSelect = (char: Character) => {
    soundEngine.playPop();
    setSelectedId(char.id);
    if (onSelectCharacter) onSelectCharacter(char);
  };

  const handleNext = () => {
    soundEngine.playPop();
    const idx = CHARACTERS.findIndex((c) => c.id === selectedId);
    const nextIdx = (idx + 1) % CHARACTERS.length;
    setSelectedId(CHARACTERS[nextIdx].id);
  };

  const handlePrev = () => {
    soundEngine.playPop();
    const idx = CHARACTERS.findIndex((c) => c.id === selectedId);
    const prevIdx = (idx - 1 + CHARACTERS.length) % CHARACTERS.length;
    setSelectedId(CHARACTERS[prevIdx].id);
  };

  return (
    <section
      id="characters"
      className="relative py-28 px-4 md:px-8 transition-colors duration-700 overflow-hidden"
      style={{
        background: `radial-gradient(circle at 70% 30%, ${activeChar.accentColor}18 0%, #FFF8ED 70%)`
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border transition-colors duration-500"
            style={{
              backgroundColor: `${activeChar.accentColor}20`,
              borderColor: `${activeChar.accentColor}40`,
              color: activeChar.accentColor
            }}
          >
            <Sparkles size={14} />
            <span>رفقاء الرحلة السمعية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-sada-ink leading-tight mb-4">
            تعرّف على أبطال <span style={{ color: activeChar.accentColor }}>صَـدَى</span>
          </h2>
          <p className="text-base sm:text-lg text-sada-ink/75 leading-relaxed font-medium">
            خمس شخصيات طفولية مرحة ترافق الطفل في كل خطوة؛ تُجسّد مهارات الاستماع المختلفة وتحوّل التدريب إلى مغامرة صداقة مشوقة.
          </p>
        </div>

        {/* Character Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {CHARACTERS.map((char) => {
            const isSelected = char.id === selectedId;
            return (
              <button
                key={char.id}
                onClick={() => handleSelect(char)}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl font-extrabold text-sm transition-all duration-300 ${
                  isSelected
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-white/80 text-sada-ink hover:bg-white hover:scale-102 border border-sada-violet/10'
                }`}
                style={{
                  backgroundColor: isSelected ? char.accentColor : undefined,
                  boxShadow: isSelected ? `0 10px 25px -5px ${char.accentColor}50` : undefined
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
                <span>{char.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-sada-ink/60'
                  }`}
                >
                  {char.roleTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Character Showcase Stage */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] border-2 border-sada-violet/15 p-6 md:p-12 shadow-2xl overflow-hidden">
          {/* Ambient Glow */}
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: activeChar.accentColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Column: 2.5D Character with Depth */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[380px] md:min-h-[460px]">
              {/* Radial Base Platform */}
              <div
                className="absolute bottom-6 w-72 h-16 rounded-[100%] blur-md transition-colors duration-500 opacity-40"
                style={{ backgroundColor: activeChar.accentColor }}
              />

              {/* Character Cutout */}
              <div className="relative z-10 w-64 sm:w-80 md:w-96 max-h-[480px] flex items-end justify-center transition-all duration-500 transform hover:scale-105">
                <img
                  key={activeChar.id}
                  src={activeChar.image}
                  alt={activeChar.name}
                  className="w-full h-auto object-contain drop-shadow-2xl animate-fade-in"
                  loading="eager"
                />
              </div>

              {/* Personality Badge Floating */}
              <div
                className="absolute top-4 right-4 z-20 px-4 py-2 rounded-2xl text-xs font-black shadow-md border flex items-center gap-2"
                style={{
                  backgroundColor: '#FFF',
                  borderColor: `${activeChar.accentColor}30`,
                  color: activeChar.accentColor
                }}
              >
                <Sparkles size={14} />
                <span>{activeChar.badge}</span>
              </div>
            </div>

            {/* Details Column: Persona, Strengths, Motto */}
            <div className="lg:col-span-6 flex flex-col text-right">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg"
                  style={{
                    backgroundColor: `${activeChar.accentColor}15`,
                    color: activeChar.accentColor
                  }}
                >
                  البطل المساعد · {activeChar.roleTitle}
                </span>

                {/* Arrow navigation buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    aria-label="السابق"
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sada-ink transition-colors"
                  >
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="التالي"
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sada-ink transition-colors"
                  >
                    <ArrowLeft size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-3xl sm:text-5xl font-black text-sada-ink mb-3">
                {activeChar.name}
              </h3>

              <p className="text-base sm:text-lg text-sada-ink/80 leading-relaxed font-medium mb-6">
                {activeChar.description}
              </p>

              {/* Strengths Checklist */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-sada-ink/50 uppercase tracking-wider mb-2.5">
                  المميزات السمعية والتفاعلية
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeChar.strengths.map((strength, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sada-surface text-sada-ink text-xs font-bold border border-gray-200 shadow-2xs"
                    >
                      <Check size={14} style={{ color: activeChar.accentColor }} />
                      <span>{strength}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Character Motto Quote */}
              <div
                className="p-5 rounded-2xl border flex items-start gap-3.5"
                style={{
                  backgroundColor: `${activeChar.accentColor}0C`,
                  borderColor: `${activeChar.accentColor}25`
                }}
              >
                <Quote
                  size={24}
                  className="flex-shrink-0 mt-0.5 opacity-60"
                  style={{ color: activeChar.accentColor }}
                />
                <p
                  className="text-sm sm:text-base font-extrabold italic leading-snug"
                  style={{ color: activeChar.accentColor }}
                >
                  {activeChar.motto}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
