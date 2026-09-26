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
    md: 'w-13 h-13 sm:w-15 sm:h-15',       // Section headings & paragraph dividers
    lg: 'w-16 h-16 sm:w-20 sm:h-20',       // Major section headers & modals
    xl: 'w-20 h-20 sm:w-24 sm:h-24',       // Hero crest & CTA banner
    '2xl': 'w-28 h-28 sm:w-32 sm:h-32'     // Hero flagship emblem
  }[size];

  return (
    <div
      className={`inline-flex ${
        horizontal ? 'flex-row items-center gap-3' : 'flex-col items-center'
      } ${className}`}
    >
      <div
        className={`relative ${dimensions} rounded-full p-1 bg-gradient-to-b from-[#f2ca50] via-[#d4af37] to-[#805f15] shadow-lg transition-transform duration-300 hover:scale-105 flex-shrink-0 ${
          glow ? 'shadow-[0_0_25px_rgba(242,202,80,0.35)] hover:shadow-[0_0_35px_rgba(242,202,80,0.55)]' : ''
        }`}
      >
        {/* Outer filigree border */}
        <div className="w-full h-full rounded-full p-0.5 bg-[#16161F] border border-[#f2ca50]/50 flex items-center justify-center overflow-hidden">
          <img
            src={BRAND_LOGO_URL}
            alt={alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {showWordmark && (
        <div className={`flex flex-col ${horizontal ? 'text-left' : 'items-center text-center mt-2'}`}>
          <span className="font-serif font-bold text-sm sm:text-base text-[#f2ca50] tracking-widest uppercase leading-none">
            TAROT ITALIA
          </span>
          {showSubtitle && (
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-[#E2DACD] uppercase pt-0.5">
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
    <div className={`flex flex-col items-center justify-center my-4 ${className}`}>
      <div className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#f2ca50]/40 to-[#f2ca50]"></div>
        <BrandSeal size={size} glow={true} />
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#f2ca50]/40 to-[#f2ca50]"></div>
      </div>
      {title && (
        <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#f2ca50] mt-2 font-semibold">
          {title}
        </span>
      )}
    </div>
  );
};
