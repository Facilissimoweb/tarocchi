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
    <section className="relative w-full overflow-hidden bg-[#F9F8F6] min-h-[85vh] flex items-center">
      {/* Background Image with Gradient Overlay (Girls Photo on right/center with smooth fade to left) */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tarot Italia - Percorsi di Evoluzione Interiore"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center lg:object-right filter contrast-105 brightness-90"
        />
        {/* Soft dark gradient mask: pitch black/dark anthracite on left for full text contrast, fading out to transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F8F6] via-[#F9F8F6]/85 sm:via-[#F9F8F6]/75 to-transparent"></div>
        {/* Subtle vertical gradient for top/bottom integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F8F6]/80 via-transparent to-[#F9F8F6]"></div>
      </div>

      {/* Cyber-Mystic Background Radial Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-[#C5BCB3]/15 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] bg-[#7A8B78]/15 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Main Hero Container */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 py-12 sm:py-16 lg:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* MOBILE ORDER 1° & DESKTOP COLUMN RIGHT: Circular Logo */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center items-center py-2 lg:py-0">
            <div className="relative group">
              {/* Soft ambient aura/glow behind logo */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#7A8B78]/30 via-[#C5BCB3]/40 to-[#7A8B78]/30 blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Circular Logo Container */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full p-1 bg-gradient-to-tr from-[#7A8B78] via-[#C5BCB3] to-[#7A8B78] shadow-[0_0_35px_rgba(197,188,179,0.4)] flex items-center justify-center transition-transform duration-500 hover:scale-[1.02]">
                <div className="w-full h-full rounded-full bg-[#F9F8F6] p-1 overflow-hidden flex items-center justify-center">
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
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">

            {/* 1. Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF]/90 rounded-full border border-[#7A8B78]/40 shadow-[0_0_12px_rgba(122,139,120,0.25)] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#7A8B78] animate-pulse shadow-[0_0_6px_#7A8B78]"></span>
              <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-widest text-[#7A8B78]">
                TAROLOGIA ARCHETIPICA &amp; STUDIO OLISTICO
              </span>
            </div>

            {/* 2. Main Title */}
            <h1 className="font-serif text-[28px] sm:text-[38px] lg:text-[46px] text-[#2B2523] leading-tight max-w-2xl font-bold">
              Il Linguaggio Segreto degli <span className="bg-gradient-to-r from-[#7A8B78] via-[#8C808E] to-[#7A8B78] bg-clip-text text-transparent italic drop-shadow-[0_0_15px_rgba(122,139,120,0.5)]">Arcani</span> per la Tua Evoluzione Interiore
            </h1>

            {/* 3. Subtitle / Description */}
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#6C645C] max-w-xl leading-relaxed">
              Uno spazio sacro per decodificare il tuo percorso di vita. Sessioni individuali di ascolto empatico e divinazione archetipica, online via WhatsApp ovunque nel mondo o nello studio olistico di Macerata.
            </p>

            {/* 4. Dual CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 w-full">
              <button
                onClick={() => onOpenBooking('Lettura On Line 1h')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] text-[12px] font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(122,139,120,0.5)] hover:shadow-[0_0_30px_rgba(122,139,120,0.8)] transition-all duration-300 cursor-pointer min-w-[200px]"
              >
                <span className="material-symbols-outlined text-base leading-none">flare</span>
                <span>Prenota Lettura</span>
              </button>
              <button
                onClick={onExploreArcani}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFFFFF]/90 text-[#7A8B78] text-[12px] font-semibold uppercase tracking-wider rounded-xl hover:bg-[#F4F2EE] hover:text-[#2B2523] transition-all duration-300 border border-[#7A8B78]/50 shadow-[0_0_15px_rgba(122,139,120,0.2)] backdrop-blur-md cursor-pointer min-w-[200px]"
              >
                <span className="material-symbols-outlined text-base leading-none text-[#7A8B78]">style</span>
                <span>Esplora Arcani</span>
              </button>
            </div>

            {/* 5. Google Reviews Badge */}
            <div className="flex items-center gap-3.5 pt-3">
              <div className="flex items-center gap-1 text-[#7A8B78]">
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] text-[#2B2523] font-semibold uppercase tracking-wider font-mono">
                  Valutato 5.0 su Google Recensioni
                </span>
                <span className="text-[12px] text-[#6C645C]">
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
