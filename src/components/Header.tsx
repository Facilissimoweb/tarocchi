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
    <header className="sticky top-0 left-0 w-full z-50 bg-[#0C0714]/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
      {/* MOBILE NAVBAR ROW */}
      <div className="lg:hidden h-16 sm:h-20 max-w-[1240px] mx-auto px-4 flex items-center justify-between gap-3">
        {/* Mobile Brand Logo & Title */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none min-w-0"
        >
          <div className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-[#FF007F] via-[#8A2BE2] to-[#00F0FF] shadow-[0_0_15px_rgba(255,0,127,0.6)] flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#1C0F33] p-0.5 overflow-hidden flex items-center justify-center border border-white/20">
              <img
                alt="Tarot Italia Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover"
                src={logoUrl}
              />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-[18px] font-bold tracking-wider bg-gradient-to-r from-[#FF007F] via-[#C77DFF] to-[#00F0FF] bg-clip-text text-transparent uppercase leading-none drop-shadow-[0_0_10px_rgba(255,0,127,0.5)] truncate">
              TAROT ITALIA
            </span>
            <span className="text-[8px] font-mono tracking-[0.2em] text-[#00F0FF] uppercase pt-1 truncate font-semibold">
              STUDIO OLISTICO MACERATA
            </span>
          </div>
        </button>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-[0_0_15px_rgba(255,0,127,0.6)] cursor-pointer border border-[#FF007F]/50"
          >
            <span className="material-symbols-outlined text-xs leading-none">calendar_month</span>
            <span className="whitespace-nowrap">PRENOTA</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <div className="w-8 h-8 rounded-full bg-[#FF007F]/20 border border-[#FF007F] text-[#FF007F] flex items-center justify-center shadow-[0_0_12px_rgba(255,0,127,0.4)]">
                <span className="material-symbols-outlined text-lg font-bold">close</span>
              </div>
            ) : (
              <div className="p-1.5 text-[#A69BB5] hover:text-white rounded-lg">
                <span className="material-symbols-outlined text-2xl">menu</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* DESKTOP NAVBAR: TWO-LEVEL EXACT IMAGE MATCH */}
      <div className="hidden lg:flex flex-col items-center justify-center max-w-[1240px] mx-auto px-8 pt-4 pb-3">
        {/* LEVEL 1 (TOP): CENTERED LOGO & BRAND TITLE */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex flex-col items-center justify-center text-center group cursor-pointer focus:outline-none mb-3"
        >
          <div className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-[#FF007F] via-[#8A2BE2] to-[#00F0FF] shadow-[0_0_20px_rgba(255,0,127,0.6)] group-hover:scale-105 transition-all duration-300 mb-2">
            <div className="w-14 h-14 rounded-full bg-[#1C0F33] p-0.5 overflow-hidden flex items-center justify-center border border-white/20">
              <img
                alt="Tarot Italia Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover"
                src={logoUrl}
              />
            </div>
          </div>
          <span className="font-serif text-2xl sm:text-[26px] font-bold tracking-widest bg-gradient-to-r from-[#FF007F] via-[#C77DFF] to-[#00F0FF] bg-clip-text text-transparent uppercase leading-tight drop-shadow-[0_0_12px_rgba(255,0,127,0.5)]">
            TAROT ITALIA
          </span>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase pt-0.5 font-semibold">
            STUDIO OLISTICO MACERATA
          </span>
        </button>

        {/* HORIZONTAL DIVIDER LINE */}
        <div className="w-full border-t border-white/10 mb-3"></div>

        {/* LEVEL 2 (BOTTOM): CENTERED MENU LINKS & RIGHT CTA BUTTON */}
        <div className="w-full relative flex items-center justify-center">
          {/* Centered Navigation Menu */}
          <nav className="flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 text-[13px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-lg relative ${
                    isActive
                      ? 'text-[#00F0FF] font-bold'
                      : 'text-[#A69BB5] hover:text-[#00F0FF]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#FF007F] to-[#00F0FF] shadow-[0_0_10px_#00F0FF] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Absolute Right-Aligned CTA Button */}
          <div className="absolute right-0">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-[11px] sm:text-[12px] font-bold uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.7)] hover:shadow-[0_0_30px_rgba(255,0,127,1)] transition-all duration-300 cursor-pointer border border-[#FF007F]/50"
            >
              <span className="material-symbols-outlined text-base leading-none">calendar_month</span>
              <span className="whitespace-nowrap">PRENOTA CONSULTA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glassmorphic Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0C0714]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-3 shadow-2xl animate-in fade-in duration-200">
          {/* Centered Circular Logo at top of mobile menu */}
          <div className="flex flex-col items-center justify-center pt-2 pb-4 border-b border-white/10 mb-2">
            <div className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-[#FF007F] via-[#8A2BE2] to-[#00F0FF] shadow-[0_0_18px_rgba(255,0,127,0.5)] mb-2">
              <div className="w-16 h-16 rounded-full bg-[#0C0714] p-0.5 overflow-hidden flex items-center justify-center">
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
            <span className="font-serif text-lg font-bold tracking-wider bg-gradient-to-r from-[#FF007F] via-[#C77DFF] to-[#00F0FF] bg-clip-text text-transparent uppercase">
              TAROT ITALIA
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#A69BB5] uppercase pt-0.5">
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
                      ? 'text-[#00F0FF]'
                      : 'text-[#A69BB5] hover:text-white'
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
