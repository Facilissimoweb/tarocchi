import React from 'react';

// Official Tarot Italia Seal / Logo
export const BRAND_LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVI-E6mN8LzTkqaK2AlHhHt6J_m2ejErCGubg7rHJrgDEmvJqKqO85sxaWmczjg7E3WgCpY6zNmQgnuHqamyxdHVSurJFn1BoLM_I8PbnCmhlfCOwFMDoXRq4yQ91nikMqRSKVi1G7Os3bG8313n7aJDSi26Fh7yIRmENKSGdbZdAlYeUEw9khRjyfug6EeoTgBf6n9fc1lhGg2XKrKrm9CfFr3CXslAiN-TC2OBWtRVpwfWvO4wLx';

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
  const [imgError, setImgError] = React.useState(false);

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
          {!imgError ? (
            <img
              src={BRAND_LOGO_URL}
              alt={alt}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-[#1C1817] text-[#F9F8F6] flex items-center justify-center font-serif font-bold text-xs sm:text-sm tracking-tighter">
              TI
            </div>
          )}
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
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="flex items-center justify-center gap-4 w-full max-w-md mx-auto">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5BCB3] to-[#8C808E]/50"></div>
        <div className="relative group cursor-default">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-0.5 border border-[#C5BCB3] shadow-sm flex items-center justify-center transition-transform duration-300 bg-[#F9F8F6] group-hover:border-[#2B2523]">
            <div className="w-full h-full rounded-full bg-[#F9F8F6] p-0.5 overflow-hidden flex items-center justify-center">
              {!imgError ? (
                <img
                  src={BRAND_LOGO_URL}
                  alt="Logo Tarot Italia"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#1C1817] text-[#F9F8F6] flex items-center justify-center font-serif font-bold text-xs md:text-sm">
                  TI
                </div>
              )}
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
