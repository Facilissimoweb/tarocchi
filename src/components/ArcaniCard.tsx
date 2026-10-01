import React, { useState, useEffect } from 'react';
import { ArcanoInfo } from '../data/arcaniData';
import { ArcaniVisualMotif } from './ArcaniVisualMotif';
import { BRAND_LOGO_URL } from './BrandSeal';

interface ArcaniCardProps {
  arcano: ArcanoInfo;
  isSelected?: boolean;
  onSelect?: (arcano: ArcanoInfo) => void;
  defaultFlipped?: boolean; // false = starts with logo card-back, true = starts with front visible
  size?: 'sm' | 'md' | 'lg';
}

export const ArcaniCard: React.FC<ArcaniCardProps> = ({
  arcano,
  isSelected = false,
  onSelect,
  defaultFlipped = true,
  size = 'md'
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(defaultFlipped);

  useEffect(() => {
    setIsFlipped(defaultFlipped);
  }, [defaultFlipped]);

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
    if (onSelect) {
      onSelect(arcano);
    }
  };

  const toggleFlipOnly = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(prev => !prev);
  };

  const sizeClasses = {
    sm: 'w-[160px] h-[260px]',
    md: 'w-[200px] sm:w-[220px] h-[330px] sm:h-[350px]',
    lg: 'w-[260px] sm:w-[290px] h-[420px] sm:h-[460px]'
  }[size];

  return (
    <div
      onClick={handleCardClick}
      className={`group relative ${sizeClasses} cursor-pointer select-none transition-transform duration-300 hover:-translate-y-1.5 focus:outline-none`}
      style={{ perspective: '1200px' }}
      title={`${arcano.name} (${arcano.num}) - Clicca per girare o analizzare`}
    >
      {/* 3D Flip Wrapper */}
      <div
        className={`relative w-full h-full duration-700 transition-transform rounded-2xl shadow-sm ${
          isSelected ? 'ring-2 ring-[#2B2523] shadow-md' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)'
        }}
      >
        {/* ===================== FRONT OF THE CARD (Editorial Clean) ===================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden border border-[#E5E0D8] bg-[#FFFFFF] backdrop-blur-xl group-hover:border-[#C5BCB3] transition-all duration-300 shadow-sm"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Top Bar: Numeral & Element */}
          <div className="relative z-10 flex items-center justify-between pb-2 border-b border-[#E5E0D8]">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-sm tracking-wider text-[#2B2523]">
                {arcano.num}
              </span>
              <span className="text-[10px] text-[#6C645C] uppercase font-mono tracking-widest">
                / 22
              </span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F3F1ED] border border-[#E5E0D8] text-[10px] font-semibold uppercase tracking-wider text-[#2B2523]">
              <span className="material-symbols-outlined text-[12px] text-[#8C808E]">{arcano.symbolIcon}</span>
              <span>{arcano.element}</span>
            </div>
          </div>

          {/* Center Illustration Area: Bespoke Motif */}
          <div className="relative z-10 my-auto flex items-center justify-center py-2 px-1">
            <div className="relative w-full aspect-[4/5] max-h-[160px] sm:max-h-[180px] rounded-xl overflow-hidden bg-[#F9F8F6] border border-[#E5E0D8] flex items-center justify-center p-2.5 group-hover:border-[#C5BCB3] transition-colors">
              <ArcaniVisualMotif
                motif={arcano.svgMotif}
                primaryColor="#2B2523"
                accentColor="#8C808E"
                className="w-full h-full opacity-85"
              />
            </div>
          </div>

          {/* Bottom Info: Title & Action */}
          <div className="relative z-10 pt-2 border-t border-[#E5E0D8] flex flex-col gap-1">
            <h3 className="font-serif font-bold text-sm sm:text-base leading-tight truncate text-[#2B2523]">
              {arcano.name}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#6C645C] font-mono tracking-wider truncate max-w-[120px]">
                {arcano.keywords[0]}
              </span>

              {/* Flip back button */}
              <button
                type="button"
                onClick={toggleFlipOnly}
                className="p-1 rounded-md text-[#6C645C] hover:text-[#2B2523] hover:bg-[#F3F1ED] transition-colors"
                title="Gira carta per vedere il retro con sigillo"
              >
                <span className="material-symbols-outlined text-sm">360</span>
              </button>
            </div>
          </div>
        </div>

        {/* ===================== BACK OF THE CARD (Editorial Back) ===================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-3.5 flex flex-col items-center justify-between overflow-hidden border border-[#C5BCB3] bg-[#F4F2EE] shadow-sm"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Subtle Inner Border Frame */}
          <div className="absolute inset-2 rounded-xl border border-[#E5E0D8] pointer-events-none" />

          {/* Corner Runes */}
          <div className="absolute top-4 left-4 text-[#8C808E] text-[9px] font-mono">✦</div>
          <div className="absolute top-4 right-4 text-[#8C808E] text-[9px] font-mono">✦</div>
          <div className="absolute bottom-4 left-4 text-[#8C808E] text-[9px] font-mono">✦</div>
          <div className="absolute bottom-4 right-4 text-[#8C808E] text-[9px] font-mono">✦</div>

          {/* Top Brand Micro-Kicker */}
          <div className="relative z-10 pt-2 text-center">
            <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#6C645C] font-semibold">
              Arcani Maggiori
            </span>
          </div>

          {/* Central Core: BRAND LOGO EMBLEM */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-0.5 border border-[#C5BCB3] bg-[#F9F8F6] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#F9F8F6] p-0.5 border border-[#E5E0D8] flex items-center justify-center overflow-hidden">
                <img
                  src={BRAND_LOGO_URL}
                  alt="Tarot Italia Seal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <span className="font-serif text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#2B2523] mt-3">
              TAROT ITALIA
            </span>
            <span className="text-[9px] text-[#6C645C] uppercase font-mono tracking-widest mt-0.5">
              Studio Olistico Macerata
            </span>
          </div>

          {/* Bottom Flip Indicator */}
          <div className="relative z-10 pb-2 flex items-center gap-1.5 text-[10px] text-[#6C645C] font-medium uppercase tracking-widest">
            <span className="material-symbols-outlined text-xs">touch_app</span>
            <span>Tocca per svelare</span>
          </div>
        </div>
      </div>
    </div>
  );
};
