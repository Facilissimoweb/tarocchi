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
    { id: 'blog', label: 'BLOG' },
    { id: 'servizi', label: 'SERVIZI & CONSULTI' },
    { id: 'shop', label: 'BOTTEGA' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E5E0D8] shadow-sm">
      {/* Top Info Bar: Minimal thin strip with uppercase clean font (Hidden on mobile) */}
      <div className="hidden md:block w-full bg-[#F4F2EE]/90 py-1 px-4 lg:px-12 border-b border-[#E5E0D8]">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between text-[#6C645C] text-[10px] font-mono tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B78] animate-pulse shadow-[0_0_6px_#7A8B78]"></span>
            <span>STUDIO OLISTICO MACERATA • TAROLOGIA ARCHETIPICA DAL 2012</span>
          </div>
          <div className="flex items-center gap-2 text-[#7A8B78]/90 font-semibold">
            <span className="material-symbols-outlined text-xs text-[#7A8B78]">auto_awesome</span>
            <span>SESSIONI IN STUDIO E ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="h-16 sm:h-20 max-w-[1240px] mx-auto px-4 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none min-w-0"
        >
          <div className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-[#7A8B78] via-[#C5BCB3] to-[#7A8B78] shadow-[0_0_15px_rgba(122,139,120,0.5)] group-hover:scale-105 transition-all duration-300 flex-shrink-0">
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
            <span className="font-serif text-[18px] sm:text-[22px] font-bold tracking-wider bg-gradient-to-r from-[#7A8B78] via-[#8C808E] to-[#7A8B78] bg-clip-text text-transparent uppercase leading-none drop-shadow-[0_0_10px_rgba(122,139,120,0.4)] truncate">
              TAROT ITALIA
            </span>
            <span className="text-[9px] font-mono tracking-[0.22em] text-[#6C645C] group-hover:text-[#7A8B78] transition-colors uppercase pt-1 truncate">
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
                className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-lg relative ${
                  isActive
                    ? 'text-[#7A8B78] font-bold'
                    : 'text-[#6C645C] hover:text-[#7A8B78] hover:bg-[#F3F1ED]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#7A8B78] to-[#7A8B78] shadow-[0_0_8px_#7A8B78] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Single Primary Neon CTA Button */}
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] text-[11px] sm:text-[12px] font-bold uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(122,139,120,0.6)] hover:shadow-[0_0_30px_rgba(122,139,120,0.9)] transition-all duration-300 cursor-pointer border border-[#7A8B78]/50"
          >
            <span className="material-symbols-outlined text-sm sm:text-base leading-none">calendar_month</span>
            <span className="whitespace-nowrap sm:hidden">PRENOTA</span>
            <span className="whitespace-nowrap hidden sm:inline">PRENOTA CONSULTA</span>
          </button>

          {/* Mobile Menu Button / Close Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#7A8B78]/20 border border-[#7A8B78] text-[#7A8B78] flex items-center justify-center shadow-[0_0_12px_rgba(122,139,120,0.4)]">
                <span className="material-symbols-outlined text-xl sm:text-2xl font-bold">close</span>
              </div>
            ) : (
              <div className="p-2 text-[#6C645C] hover:text-[#2B2523] rounded-lg">
                <span className="material-symbols-outlined text-2xl">menu</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphic Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F9F8F6]/95 backdrop-blur-xl border-b border-[#E5E0D8] px-6 py-6 flex flex-col gap-3 shadow-2xl animate-in fade-in duration-200">
          {/* Centered Circular Logo at top of mobile menu */}
          <div className="flex flex-col items-center justify-center pt-2 pb-4 border-b border-[#E5E0D8] mb-2">
            <div className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-[#7A8B78] via-[#C5BCB3] to-[#7A8B78] shadow-[0_0_18px_rgba(122,139,120,0.5)] mb-2">
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
            <span className="font-serif text-lg font-bold tracking-wider bg-gradient-to-r from-[#7A8B78] via-[#8C808E] to-[#7A8B78] bg-clip-text text-transparent uppercase">
              TAROT ITALIA
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#6C645C] uppercase pt-0.5">
              STUDIO OLISTICO MACERATA
            </span>
          </div>

          {/* Navigation Links with clean typography, no borders */}
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-center py-3 text-sm font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#7A8B78]'
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
