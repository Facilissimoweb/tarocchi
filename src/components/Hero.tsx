import React, { useState, useEffect } from 'react';

interface HeroProps {
  heroImage: string;
  avatarImage: string;
  onOpenBooking: (serviceTitle: string) => void;
  onExploreArcani?: () => void;
  badgeText?: string;
  title?: React.ReactNode;
  subtitle?: string;
  showButtons?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  heroImage,
  avatarImage,
  onOpenBooking,
  onExploreArcani,
  badgeText = 'TAROLOGIA ARCHETIPICA & STUDIO OLISTICO',
  title,
  subtitle = 'Uno spazio sacro per decodificare il tuo percorso di vita. Sessioni individuali di ascolto empatico e divinazione archetipica, online via WhatsApp ovunque nel mondo o nello studio olistico di Macerata.',
  showButtons = true,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax translateY effect
  const parallaxOffset = scrollY * 0.35;

  return (
    <section className="relative w-full overflow-hidden bg-[#F9F8F6] text-[#2B2523] min-h-[90vh] sm:min-h-[95vh] lg:min-h-[100vh] flex items-center pt-36 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 lg:pb-36 border-b border-[#E5E0D8]">
      {/* Background Cover Image with Parallax - NO GRADIENTS / NO OVERLAYS / PULITA E NITIDA */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImage}
          alt="Tarot Italia - Foto Copertina"
          referrerPolicy="no-referrer"
          style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
          className="w-full h-[125%] object-cover object-center transition-transform duration-75 ease-out -mt-12"
        />
      </div>

      {/* Main Hero Container */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 py-12 sm:py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* MOBILE ORDER 1° & DESKTOP COLUMN RIGHT: Circular Logo with Pearl/Bronze Frame */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center items-center py-2 lg:py-0">
            <div className="relative group">
              {/* Soft subtle warm glow behind logo */}
              <div className="absolute -inset-3 rounded-full bg-[#7A8B78]/20 blur-2xl opacity-70"></div>

              {/* Circular Logo Container */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full border border-[#C5BCB3] shadow-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.01] overflow-hidden bg-[#F9F8F6]">
                <img
                  src={avatarImage}
                  alt="Tarot Italia - Logo Ufficiale"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover scale-105"
                />
              </div>
            </div>
          </div>

          {/* MOBILE ORDER 2°-5° & DESKTOP COLUMN LEFT: Text & CTAs Card con Sfondo Avorio Pulito */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start bg-[#F9F8F6]/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#C5BCB3]/50 shadow-xl">

            {/* 1. Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F3F1ED] rounded-full border border-[#C5BCB3]/60 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B78]"></span>
              <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#6C645C]">
                {badgeText}
              </span>
            </div>

            {/* 2. Main Title */}
            <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[50px] text-[#2B2523] leading-[1.18] max-w-2xl font-bold tracking-tight">
              {title || (
                <>
                  Il Linguaggio Segreto degli <span className="italic text-[#7A8B78] font-serif font-normal">Arcani</span> per la Tua <span className="underline decoration-[#7A8B78]/60 underline-offset-8">Evoluzione Interiore</span>
                </>
              )}
            </h1>

            {/* 3. Subtitle / Description */}
            <p className="text-[15px] sm:text-[17px] text-[#5A524E] max-w-xl leading-relaxed font-sans font-normal">
              {subtitle}
            </p>

            {/* 4. Pastel Olive Green CTA Buttons */}
            {showButtons && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 w-full">
                <button
                  onClick={() => onOpenBooking('Lettura On Line 1h')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] text-[12px] font-semibold uppercase tracking-[0.18em] rounded-xl shadow-md transition-all duration-300 cursor-pointer min-w-[200px] border border-[#687866]"
                >
                  <span className="material-symbols-outlined text-base leading-none text-[#F9F8F6]">flare</span>
                  <span>Prenota Lettura</span>
                </button>
                {onExploreArcani && (
                  <button
                    onClick={onExploreArcani}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F3F1ED] text-[#2B2523] hover:bg-[#E5E0D8] text-[12px] font-semibold uppercase tracking-[0.18em] rounded-xl transition-all duration-300 border border-[#C5BCB3]/60 cursor-pointer min-w-[200px]"
                  >
                    <span className="material-symbols-outlined text-base leading-none text-[#7A8B78]">style</span>
                    <span>Esplora Arcani</span>
                  </button>
                )}
              </div>
            )}

            {/* 5. Google Reviews Badge */}
            <div className="flex items-center gap-3.5 pt-4 border-t border-[#C5BCB3]/40 w-full max-w-xl">
              <div className="flex items-center gap-1 text-[#7A8B78]">
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] text-[#2B2523] font-bold uppercase tracking-wider font-mono">
                  Valutato 5.0 su Google Recensioni
                </span>
                <span className="text-[12px] text-[#5A524E] font-normal">
                  Oltre 10 anni di consulti, etica e supporto profondo
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
