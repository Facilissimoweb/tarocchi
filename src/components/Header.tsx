import React, { useState, useEffect } from 'react';

export type NavTab = 'home' | 'chi-siamo' | 'arcani' | 'blog' | 'servizi' | 'shop';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenBooking: () => void;
  logoUrl: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenBooking,
  logoUrl,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smart Scroll (Hide on scroll down, Reveal on scroll up)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // scrolling down
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'chi-siamo', label: 'CHI SIAMO' },
    { id: 'arcani', label: '22 ARCANI' },
    { id: 'blog', label: 'JOURNAL' },
    { id: 'servizi', label: 'SERVIZI' },
    { id: 'shop', label: 'BOTTEGA' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E5E0D8] transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* RIGA 1 SUPERIORE: LOGO + TITOLO + SOTTOTITOLO CENTRATI VERTICALMENTE COME IN FOTO */}
      <div className="w-full bg-[#F9F8F6] pt-3 pb-2 px-4 border-b border-[#E5E0D8]/80">
        <div className="max-w-[1240px] mx-auto flex flex-col items-center justify-center text-center">
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            {/* Logo Circolare con bordo e bagliore sobrio in tono neutro */}
            <div className="relative flex items-center justify-center p-0.5 rounded-full border border-[#C5BCB3] group-hover:border-[#7A8B78] transition-all duration-300 mb-1 shadow-sm">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F3F1ED] p-0.5 overflow-hidden flex items-center justify-center">
                <img
                  alt="Tarot Italia Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                  src={logoUrl}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Titolo Principale TAROT ITALIA */}
            <span className="font-serif text-[18px] sm:text-[22px] font-bold tracking-[0.18em] text-[#2B2523] uppercase leading-tight">
              TAROT ITALIA
            </span>

            {/* Sottotitolo STUDIO OLISTICO MACERATA */}
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.24em] text-[#6C645C] uppercase pt-0.5 font-semibold">
              STUDIO OLISTICO MACERATA
            </span>
          </button>
        </div>
      </div>

      {/* RIGA 2 INFERIORE: MENU DI NAVIGAZIONE AL CENTRO/SINISTRA & PULSANTE CTA A DESTRA */}
      <div className="h-12 sm:h-14 max-w-[1240px] mx-auto px-4 lg:px-12 flex items-center justify-between gap-4">
        {/* Desktop Navigation Menu (Centrato / Distribuito come in foto) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 mx-auto lg:mx-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer rounded-lg relative ${
                  isActive
                    ? 'text-[#2B2523] font-bold'
                    : 'text-[#6C645C] hover:text-[#2B2523] hover:bg-[#F3F1ED]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#7A8B78] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Label when desktop nav is hidden */}
        <div className="lg:hidden text-[10px] font-mono tracking-[0.18em] text-[#6C645C] uppercase font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B78]"></span>
          <span>TAROT ITALIA</span>
        </div>

        {/* Right CTA Button (Verde Oliva Pastello) & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Pastel Olive Green CTA Button */}
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.15em] rounded-xl transition-all duration-300 cursor-pointer border border-[#687866] shadow-sm"
          >
            <span className="material-symbols-outlined text-sm sm:text-base leading-none text-[#F9F8F6]">calendar_month</span>
            <span className="whitespace-nowrap sm:hidden">PRENOTA</span>
            <span className="whitespace-nowrap hidden sm:inline">PRENOTA CONSULTA</span>
          </button>

          {/* Mobile Menu Button / Close Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 focus:outline-none cursor-pointer text-[#2B2523]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <div className="w-8 h-8 rounded-full bg-[#F3F1ED] border border-[#C5BCB3] text-[#2B2523] flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-lg font-bold">close</span>
              </div>
            ) : (
              <div className="p-1.5 text-[#2B2523] hover:text-[#7A8B78] rounded-lg">
                <span className="material-symbols-outlined text-2xl">menu</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Centered Logo Header */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F9F8F6] border-b border-[#E5E0D8] px-6 py-6 flex flex-col items-center text-center gap-4 shadow-xl animate-in fade-in duration-200">
          {/* Centered Logo, Title and Subtitle at top of mobile menu */}
          <div className="flex flex-col items-center justify-center pb-4 border-b border-[#E5E0D8] w-full">
            <div className="w-14 h-14 rounded-full bg-[#F3F1ED] p-0.5 border border-[#C5BCB3] shadow-md flex items-center justify-center mb-2">
              <img
                src={logoUrl}
                alt="Tarot Italia Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-serif text-lg font-bold tracking-[0.18em] text-[#2B2523] uppercase">
              TAROT ITALIA
            </span>
            <span className="text-[9px] font-mono tracking-[0.22em] text-[#6C645C] uppercase font-semibold">
              STUDIO OLISTICO MACERATA
            </span>
          </div>

          {/* Nav Items List */}
          <div className="flex flex-col gap-1 w-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-center py-2.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors cursor-pointer w-full ${
                    isActive
                      ? 'text-[#2B2523] font-bold bg-[#F3F1ED] rounded-lg border border-[#C5BCB3]/40'
                      : 'text-[#6C645C] hover:text-[#2B2523]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
