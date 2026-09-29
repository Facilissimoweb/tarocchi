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
  glow = false,
  alt = 'Sigillo Tarot Italia',
  showWordmark = false,
  showSubtitle = false,
  tagline = 'Studio Olistico Macerata',
  horizontal = false
}) => {
  const dimensions = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12',
    md: 'w-20 h-20 md:w-24 md:h-24',
    lg: 'w-20 h-20 md:w-24 md:h-24',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
    '2xl': 'w-28 h-28 sm:w-36 sm:h-36'
  }[size];

  return (
    <div
      className={`inline-flex ${
        horizontal ? 'flex-row items-center gap-3.5' : 'flex-col items-center'
      } ${className}`}
    >
      <div
        className={`relative ${dimensions} rounded-full p-0.5 border border-[#C5BCB3] hover:border-[#2B2523] transition-all duration-300 flex-shrink-0 bg-[#F9F8F6] ${
          glow ? 'shadow-md' : ''
        }`}
      >
        <div className="w-full h-full rounded-full p-0.5 bg-[#F9F8F6] flex items-center justify-center overflow-hidden">
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
          <span className="font-serif font-bold text-base sm:text-lg tracking-[0.15em] uppercase leading-none text-[#2B2523]">
            TAROT ITALIA
          </span>
          {showSubtitle && (
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#6C645C] uppercase pt-1">
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
}> = ({ title = 'Tarot Italia • Metodo Introspettivo', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="flex items-center justify-center gap-4 w-full max-w-md mx-auto">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5BCB3] to-[#8C808E]/50"></div>
        <div className="relative group cursor-default">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-0.5 border border-[#C5BCB3] shadow-sm flex items-center justify-center transition-transform duration-300 bg-[#F9F8F6] group-hover:border-[#2B2523]">
            <div className="w-full h-full rounded-full bg-[#F9F8F6] p-0.5 overflow-hidden flex items-center justify-center">
              <img
                src={BRAND_LOGO_URL}
                alt="Logo Tarot Italia"
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5BCB3] to-[#8C808E]/50"></div>
      </div>
      {title && (
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#6C645C] uppercase mt-3 font-semibold">
          {title}
        </span>
      )}
    </div>
  );
};
