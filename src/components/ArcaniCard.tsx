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
    // If not flipped, flip it first!
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
        className={`relative w-full h-full duration-700 transition-transform rounded-2xl shadow-xl ${
          isSelected ? 'ring-2 ring-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.4)]' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)'
        }}
      >
        {/* ===================== FRONT OF THE CARD (Arcano Visivo Fluo) ===================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-3 flex flex-col justify-between overflow-hidden border border-[#8A2BE2]/50 bg-gradient-to-b from-[#160B29] via-[#0C0714] to-[#120520] backdrop-blur-xl group-hover:border-[#00F0FF] transition-all duration-300"
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: `0 0 20px -5px ${arcano.glowColor}`
          }}
        >
          {/* Subtle Ambient Fluo Glow */}
          <div
            className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none"
            style={{ backgroundColor: arcano.primaryColor }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-2xl opacity-30 pointer-events-none"
            style={{ backgroundColor: arcano.accentColor }}
          />

          {/* Top Bar: Numeral & Element */}
          <div className="relative z-10 flex items-center justify-between pb-1 border-b border-[#8A2BE2]/30">
            <div className="flex items-center gap-1.5">
              <span
                className="font-serif font-black text-sm tracking-wider"
                style={{ color: arcano.primaryColor }}
              >
                {arcano.num}
              </span>
              <span className="text-[10px] text-[#A69BB5] uppercase font-mono tracking-widest">
                / 22
              </span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1F0E3D]/80 border border-[#8A2BE2]/50 text-[10px] font-bold uppercase tracking-wider text-[#00F0FF]">
              <span className="material-symbols-outlined text-[12px]">{arcano.symbolIcon}</span>
              <span>{arcano.element}</span>
            </div>
          </div>

          {/* Center Illustration Area: Bespoke Cyber Motif */}
          <div className="relative z-10 my-auto flex items-center justify-center py-2 px-1">
            <div className="relative w-full aspect-[4/5] max-h-[160px] sm:max-h-[180px] rounded-xl overflow-hidden bg-[#100720]/80 border border-[#8A2BE2]/40 flex items-center justify-center p-2 group-hover:border-[#00F0FF]/60 transition-colors">
              {/* Sacred Cyber-Glyph Motif */}
              <ArcaniVisualMotif
                motif={arcano.svgMotif}
                primaryColor={arcano.primaryColor}
                accentColor={arcano.accentColor}
                className="w-full h-full drop-shadow-[0_0_12px_rgba(255,0,127,0.4)]"
              />
            </div>
          </div>

          {/* Bottom Info: Title & Action */}
          <div className="relative z-10 pt-2 border-t border-[#8A2BE2]/30 flex flex-col gap-1">
            <h3
              className="font-serif font-bold text-sm sm:text-base leading-tight truncate text-white group-hover:text-[#00F0FF] transition-colors"
            >
              {arcano.name}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#FF007F] font-mono tracking-wider truncate max-w-[120px]">
                {arcano.keywords[0]}
              </span>

              {/* Flip back button */}
              <button
                type="button"
                onClick={toggleFlipOnly}
                className="p-1 rounded-md text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#8A2BE2]/20 transition-colors"
                title="Gira carta per vedere il retro con sigillo"
              >
                <span className="material-symbols-outlined text-sm">360</span>
              </button>
            </div>
          </div>
        </div>

        {/* ===================== BACK OF THE CARD (Sigillo Tarot Italia Glow) ===================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-3 flex flex-col items-center justify-between overflow-hidden border-2 border-[#8A2BE2] bg-gradient-to-b from-[#180A2E] via-[#0C0714] to-[#1F0733] shadow-[0_0_25px_rgba(138,43,226,0.5)]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Cyber Constellation Grid & Geometric Lines */}
          <div className="absolute inset-2 rounded-xl border border-[#00F0FF]/40 pointer-events-none" />
          <div className="absolute inset-3 rounded-lg border border-[#FF007F]/30 border-dashed pointer-events-none" />

          {/* Corner Runes */}
          <div className="absolute top-4 left-4 text-[#00F0FF] text-[9px] font-mono">✦</div>
          <div className="absolute top-4 right-4 text-[#00F0FF] text-[9px] font-mono">✦</div>
          <div className="absolute bottom-4 left-4 text-[#FF007F] text-[9px] font-mono">✦</div>
          <div className="absolute bottom-4 right-4 text-[#FF007F] text-[9px] font-mono">✦</div>

          {/* Top Brand Micro-Kicker */}
          <div className="relative z-10 pt-2 text-center">
            <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#00F0FF] font-semibold">
              Arcani Maggiori
            </span>
          </div>

          {/* Central Core: BRAND LOGO EMBLEM with Radiant Neon Pulsing Aura */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            {/* Concentric Pulsing Neon Ring */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[#FF007F] via-[#8A2BE2] to-[#00F0FF] shadow-[0_0_25px_rgba(255,0,127,0.7),_0_0_40px_rgba(0,240,255,0.4)] animate-pulse flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0C0714] p-1 border border-[#00F0FF]/50 flex items-center justify-center overflow-hidden">
                <img
                  src={BRAND_LOGO_URL}
                  alt="Tarot Italia Seal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <span className="font-serif text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white mt-2.5 drop-shadow-[0_0_8px_rgba(255,0,127,0.8)]">
              TAROT ITALIA
            </span>
            <span className="text-[9px] text-[#A69BB5] uppercase font-mono tracking-widest mt-0.5">
              Studio Olistico Macerata
            </span>
          </div>

          {/* Bottom Flip Indicator */}
          <div className="relative z-10 pb-2 flex items-center gap-1.5 text-[10px] text-[#00F0FF] font-medium uppercase tracking-widest">
            <span className="material-symbols-outlined text-xs animate-bounce">touch_app</span>
            <span>Tocca per svelare</span>
          </div>
        </div>
      </div>
    </div>
  );
};
