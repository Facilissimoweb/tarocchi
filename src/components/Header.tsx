import React, { useState } from 'react';

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
    <header className="sticky top-0 left-0 w-full z-50 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E5E0D8] transition-all duration-300">
      {/* Top Info Bar: Clean editorial strip */}
      <div className="hidden md:block w-full bg-[#F3F1ED] py-1.5 px-4 lg:px-12 border-b border-[#E5E0D8]">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between text-[#6C645C] text-[10px] font-mono tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C808E]"></span>
            <span>STUDIO OLISTICO MACERATA • TAROLOGIA ARCHETIPICA DAL 2012</span>
          </div>
          <div className="flex items-center gap-2 text-[#2B2523] font-medium">
            <span className="material-symbols-outlined text-xs text-[#8C808E]">auto_awesome</span>
            <span>SESSIONI IN STUDIO E ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="h-16 sm:h-20 max-w-[1240px] mx-auto px-4 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-none min-w-0"
        >
          <div className="relative flex items-center justify-center p-0.5 rounded-full border border-[#C5BCB3] group-hover:border-[#2B2523] transition-colors duration-300 flex-shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F9F8F6] p-0.5 overflow-hidden flex items-center justify-center">
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
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-[18px] sm:text-[22px] font-semibold tracking-[0.12em] text-[#2B2523] uppercase leading-none truncate">
              TAROT ITALIA
            </span>
            <span className="text-[9px] font-mono tracking-[0.22em] text-[#6C645C] group-hover:text-[#2B2523] transition-colors uppercase pt-1 truncate">
              STUDIO OLISTICO MACERATA
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 text-[12px] font-semibold tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer rounded-lg relative ${
                  isActive
                    ? 'text-[#2B2523] font-bold'
                    : 'text-[#6C645C] hover:text-[#2B2523] hover:bg-[#F3F1ED]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-[#2B2523] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Dusty Lavender Pastel CTA Button */}
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#D8CDE2] hover:bg-[#C9BBD7] text-[#2B2523] text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.15em] rounded-xl transition-all duration-300 cursor-pointer border border-[#C5BCB3]/60 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm sm:text-base leading-none text-[#2B2523]">calendar_month</span>
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
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F3F1ED] border border-[#C5BCB3] text-[#2B2523] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl sm:text-2xl font-bold">close</span>
              </div>
            ) : (
              <div className="p-2 text-[#2B2523] hover:text-[#8C808E] rounded-lg">
                <span className="material-symbols-outlined text-2xl">menu</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphic Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F9F8F6] border-b border-[#E5E0D8] px-6 py-6 flex flex-col gap-3 shadow-lg animate-in fade-in duration-200">
          {/* Centered Circular Logo at top of mobile menu */}
          <div className="flex flex-col items-center justify-center pt-2 pb-4 border-b border-[#E5E0D8] mb-2">
            <div className="relative flex items-center justify-center p-0.5 rounded-full border border-[#C5BCB3] mb-2">
              <div className="w-16 h-16 rounded-full bg-[#F9F8F6] p-0.5 overflow-hidden flex items-center justify-center">
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
            <span className="font-serif text-lg font-bold tracking-[0.12em] text-[#2B2523] uppercase">
              TAROT ITALIA
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#6C645C] uppercase pt-0.5">
              STUDIO OLISTICO MACERATA
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-center py-3 text-sm font-semibold tracking-[0.18em] uppercase transition-colors cursor-pointer ${
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
