import React from 'react';

// Official Tarot Italia Seal / Logo
export const BRAND_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1VszJaV0U802Nkof9__gEgoylN3d9vK75TWuo8bBxHaDn0gwyFs4HkF083y8s_78aReiksXnPuJjmYyPMxn5jTWFPBmJMUpEVZVRt5T5OzKn_CMhDQ12pZCMCwVbP1q6MYqlrCZIy5McdOcU3Cn2YwZ50XYU-6GrGI4p-NsflCGIwMJefPMUNmhlf4KC4yFiZu4JbfrqPkFs35kBQTe_i-ujUy7jLo4RVhy_1gr0yqRplWULLf7dwwL2w';

export interface BrandSealProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  glow?: boolean;
  alt?: string;
  showWordmark?: boolean;
  showSubtitle?: boolean;
  tagline?: string;
  horizontal?: boolean;
}

export const BrandSeal: React.FC<BrandSealProps> = ({
  size = 'md',
  className = '',
  glow = true,
  alt = 'Sigillo Tarot Italia',
  showWordmark = false,
  showSubtitle = false,
  tagline = 'Studio Olistico Macerata',
  horizontal = false
}) => {
  // Generous, prominent sizes as requested by user
  const dimensions = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12',       // Header nav
    md: 'w-14 h-14 sm:w-16 sm:h-16',       // Section headings & dividers
    lg: 'w-18 h-18 sm:w-20 sm:h-20',       // Major section headers & modals
    xl: 'w-22 h-22 sm:w-24 sm:h-24',       // Hero crest & CTA banner
    '2xl': 'w-28 h-28 sm:w-36 sm:h-36'     // Hero watermark / flagship emblem
  }[size];

  return (
    <div
      className={`inline-flex ${
        horizontal ? 'flex-row items-center gap-3.5' : 'flex-col items-center'
      } ${className}`}
    >
      <div
        className={`relative ${dimensions} rounded-full p-1 bg-gradient-to-tr from-[#FF007F] via-[#8A2BE2] to-[#00F0FF] transition-all duration-300 hover:scale-105 flex-shrink-0 ${
          glow ? 'shadow-[0_0_20px_rgba(255,0,127,0.6),_0_0_35px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(255,0,127,0.8),_0_0_45px_rgba(0,240,255,0.6)]' : ''
        }`}
      >
        {/* Outer filigree border */}
        <div className="w-full h-full rounded-full p-0.5 bg-[#0C0714] border border-[#00F0FF]/60 flex items-center justify-center overflow-hidden">
          <img
            src={BRAND_LOGO_URL}
            alt={alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {showWordmark && (
        <div className={`flex flex-col ${horizontal ? 'text-left' : 'items-center text-center mt-2.5'}`}>
          <span className="font-serif font-bold text-base sm:text-lg tracking-[0.15em] uppercase leading-none bg-gradient-to-r from-[#FF007F] via-[#C77DFF] to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,0,127,0.5)]">
            TAROT ITALIA
          </span>
          {showSubtitle && (
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#A69BB5] uppercase pt-1">
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const BrandSectionDivider: React.FC<{
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ title, size = 'md', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center my-6 ${className}`}>
      <div className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
        <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#8A2BE2] to-[#FF007F]"></div>
        <BrandSeal size={size} glow={true} />
        <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#8A2BE2] to-[#00F0FF]"></div>
      </div>
      {title && (
        <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#00F0FF] mt-2.5 font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
          {title}
        </span>
      )}
    </div>
  );
};
