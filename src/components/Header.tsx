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
      {/* RIGA 1 SUPERIORE: LOGO + TITOLO BRAND CENTRATI */}
      <div className="w-full bg-[#F3F1ED]/80 py-2 px-4 lg:px-12 border-b border-[#E5E0D8]/60">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          {/* Sotto-testata Info (sinistra) */}
          <div className="hidden md:flex items-center gap-2 text-[#6C645C] text-[10px] font-mono tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B78]"></span>
            <span>TAROLOGIA ARCHETIPICA DAL 2012</span>
          </div>

          {/* Logo e Titolo Centrale */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-center mx-auto md:mx-0 group cursor-pointer focus:outline-none"
          >
            <div className="relative flex items-center justify-center p-0.5 rounded-full border border-[#C5BCB3] group-hover:border-[#7A8B78] transition-colors duration-300 flex-shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F9F8F6] p-0.5 overflow-hidden flex items-center justify-center">
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
            <div className="flex flex-col text-left">
              <span className="font-serif text-[16px] sm:text-[20px] font-semibold tracking-[0.14em] text-[#2B2523] uppercase leading-none truncate">
                TAROT ITALIA
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.22em] text-[#6C645C] uppercase pt-0.5 truncate">
                STUDIO OLISTICO MACERATA
              </span>
            </div>
          </button>

          {/* Sotto-testata Info (destra) */}
          <div className="hidden md:flex items-center gap-1.5 text-[#2B2523] text-[10px] font-mono tracking-[0.18em] uppercase font-medium">
            <span className="material-symbols-outlined text-xs text-[#7A8B78]">auto_awesome</span>
            <span>SESSIONI IN STUDIO E ONLINE</span>
          </div>
        </div>
      </div>

      {/* RIGA 2 INFERIORE: MENU DI NAVIGAZIONE & PULSANTE CTA */}
      <div className="h-12 sm:h-14 max-w-[1240px] mx-auto px-4 lg:px-12 flex items-center justify-between gap-4">
        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
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
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#7A8B78] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu title label when desktop nav is hidden */}
        <div className="lg:hidden text-[10px] font-mono tracking-[0.18em] text-[#6C645C] uppercase font-medium">
          MENU
        </div>

        {/* Right CTA Button (Verde Oliva Pastello) & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
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
              <div className="w-8 h-8 rounded-full bg-[#F3F1ED] border border-[#C5BCB3] text-[#2B2523] flex items-center justify-center">
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F9F8F6] border-b border-[#E5E0D8] px-6 py-6 flex flex-col gap-3 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-center py-2.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#2B2523] font-bold bg-[#F3F1ED] rounded-lg'
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
