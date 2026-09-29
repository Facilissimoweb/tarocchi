import React from 'react';

interface HeroProps {
  heroImage: string;
  avatarImage: string;
  onOpenBooking: (serviceTitle: string) => void;
  onExploreArcani: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  heroImage,
  avatarImage,
  onOpenBooking,
  onExploreArcani,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#1C1817] text-[#F9F8F6] min-h-[85vh] flex items-center">
      {/* Background Image with Warm Velvet Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tarot Italia - Percorsi di Evoluzione Interiore"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center lg:object-right filter contrast-100 brightness-75 opacity-40 mix-blend-luminosity"
        />
        {/* Soft dark espresso/tortora gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1817] via-[#1C1817]/90 sm:via-[#1C1817]/80 to-transparent"></div>
        {/* Vertical gradient transitioning fluidly to lower light ivory sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1817]/80 via-transparent to-[#F9F8F6]"></div>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 py-12 sm:py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* MOBILE ORDER 1° & DESKTOP COLUMN RIGHT: Circular Logo with Subtle Pearl/Bronze Frame */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center items-center py-2 lg:py-0">
            <div className="relative group">
              {/* Soft subtle warm glow behind logo */}
              <div className="absolute -inset-3 rounded-full bg-[#A89B8C]/15 blur-2xl opacity-60"></div>

              {/* Circular Logo Container - Clean Pearl/Bronze Thin Frame */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full p-1 border border-[#C5BCB3] shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.01]">
                <div className="w-full h-full rounded-full bg-[#1C1817] p-1 overflow-hidden flex items-center justify-center border border-[#3D3532]">
                  <img
                    src={avatarImage}
                    alt="Tarot Italia - Logo Ufficiale"
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover filter contrast-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE ORDER 2°-5° & DESKTOP COLUMN LEFT: Text & CTAs */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">

            {/* 1. Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#26211F]/90 rounded-full border border-[#C5BCB3]/40 shadow-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8CDE2]"></span>
              <span className="text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-[#C5BCB3]">
                TAROLOGIA ARCHETIPICA &amp; STUDIO OLISTICO
              </span>
            </div>

            {/* 2. Main Title */}
            <h1 className="font-serif text-[30px] sm:text-[40px] lg:text-[48px] text-[#F9F8F6] leading-[1.18] max-w-2xl font-bold tracking-tight">
              Il Linguaggio Segreto degli <span className="italic text-[#D8CDE2] font-serif font-normal">Arcani</span> per la Tua <span className="underline decoration-[#C5BCB3]/40 underline-offset-8">Evoluzione Interiore</span>
            </h1>

            {/* 3. Subtitle / Description */}
            <p className="text-[15px] sm:text-[17px] text-[#C5BCB3] max-w-xl leading-relaxed font-sans font-light">
              Uno spazio sacro per decodificare il tuo percorso di vita. Sessioni individuali di ascolto empatico e divinazione archetipica, online via WhatsApp ovunque nel mondo o nello studio olistico di Macerata.
            </p>

            {/* 4. Dual Pastel CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 w-full">
              <button
                onClick={() => onOpenBooking('Lettura On Line 1h')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D8CDE2] hover:bg-[#C9BBD7] text-[#2B2523] text-[12px] font-semibold uppercase tracking-[0.18em] rounded-xl shadow-sm transition-all duration-300 cursor-pointer min-w-[200px] border border-[#C5BCB3]"
              >
                <span className="material-symbols-outlined text-base leading-none text-[#2B2523]">flare</span>
                <span>Prenota Lettura</span>
              </button>
              <button
                onClick={onExploreArcani}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#26211F]/90 text-[#F9F8F6] hover:bg-[#322B28] text-[12px] font-medium uppercase tracking-[0.18em] rounded-xl transition-all duration-300 border border-[#C5BCB3]/40 cursor-pointer min-w-[200px]"
              >
                <span className="material-symbols-outlined text-base leading-none text-[#D8CDE2]">style</span>
                <span>Esplora Arcani</span>
              </button>
            </div>

            {/* 5. Google Reviews Badge */}
            <div className="flex items-center gap-3.5 pt-4 border-t border-[#3D3532]/60 w-full max-w-xl">
              <div className="flex items-center gap-1 text-[#C5BCB3]">
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] text-[#F9F8F6] font-medium uppercase tracking-wider font-mono">
                  Valutato 5.0 su Google Recensioni
                </span>
                <span className="text-[12px] text-[#C5BCB3] font-light">
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
