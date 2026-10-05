import React, { useState } from 'react';

const BRAND_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1VszJaV0U802Nkof9__gEgoylN3d9vK75TWuo8bBxHaDn0gwyFs4HkF083y8s_78aReiksXnPuJjmYyPMxn5jTWFPBmJMUpEVZVRt5T5OzKn_CMhDQ12pZCMCwVbP1q6MYqlrCZIy5McdOcU3Cn2YwZ50XYU-6GrGI4p-NsflCGIwMJefPMUNmhlf4KC4yFiZu4JbfrqPkFs35kBQTe_i-ujUy7jLo4RVhy_1gr0yqRplWULLf7dwwL2w';

export const ComingSoon: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const whatsappUrl =
    'https://wa.me/393791038253?text=' +
    encodeURIComponent('Salve Tarot Italia, desidero maggiori informazioni.');

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2C221E] flex flex-col items-center justify-between px-6 py-12 font-sans selection:bg-[#7A8B78] selection:text-white">
      {/* Header / Brand Subtitle */}
      <header className="w-full max-w-2xl flex justify-center items-center py-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#7A8B78] font-semibold font-mono">
          Tarot Italia • Studio Olistico
        </span>
      </header>

      {/* Main Content Box */}
      <main className="w-full max-w-lg mx-auto flex flex-col items-center text-center my-auto py-8">
        {/* Emblem / Logo */}
        <div className="relative mb-8 group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#C5BCB3] via-[#A38B5D] to-[#7A8B78] shadow-[0_10px_30px_rgba(44,34,30,0.1)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#F9F8F6] p-1 overflow-hidden border border-[#C5BCB3]/50 flex flex-col items-center justify-center">
              {!imgError ? (
                <img
                  src={BRAND_LOGO_URL}
                  alt="Tarot Italia Logo"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <span className="font-serif text-lg font-bold text-[#2C221E] tracking-wider uppercase">
                    TAROT
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#7A8B78] uppercase">
                    ITALIA
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title & Divider */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C221E] tracking-tight mb-3">
          In Arrivo
        </h1>

        <div className="flex items-center justify-center gap-3 w-48 mx-auto my-4">
          <div className="h-[1px] flex-1 bg-[#C5BCB3]"></div>
          <span className="text-xs text-[#7A8B78]">✦</span>
          <div className="h-[1px] flex-1 bg-[#C5BCB3]"></div>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#5A4E48] font-serif italic max-w-md leading-relaxed mb-8">
          Il nostro nuovo spazio digitale è attualmente in fase di preparazione.
        </p>

        {/* WhatsApp Contact CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#7A8B78] hover:bg-[#687866] text-white font-medium text-sm tracking-widest uppercase rounded-full shadow-[0_4px_20px_rgba(122,139,120,0.25)] hover:shadow-[0_6px_24px_rgba(122,139,120,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">chat</span>
          <span>Contattaci su WhatsApp</span>
        </a>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-2xl flex flex-col items-center gap-2 py-4 text-center">
        <p className="text-xs text-[#8C8077] tracking-wider uppercase font-mono">
          © {new Date().getFullYear()} Tarot Italia • Macerata
        </p>
        <p className="text-[11px] text-[#A89F97]">
          Via delle Fonti, Centro Storico, Macerata (MC)
        </p>
      </footer>
    </div>
  );
};
