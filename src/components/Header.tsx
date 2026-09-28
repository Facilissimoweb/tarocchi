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
    <header className="sticky top-0 left-0 w-full z-50 bg-[#0C0714]/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
      {/* Top Info Bar: Minimal thin strip with uppercase clean font */}
      <div className="w-full bg-[#08040E]/90 py-1 px-4 lg:px-12 border-b border-white/5">
        <div className="max-w-[1240px] mx-auto flex items-center justify-center sm:justify-between text-[#A69BB5] text-[10px] font-mono tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_6px_#00F0FF]"></span>
            <span>STUDIO OLISTICO MACERATA • TAROLOGIA ARCHETIPICA DAL 2012</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[#00F0FF]/90 font-semibold">
            <span className="material-symbols-outlined text-xs text-[#FF007F]">auto_awesome</span>
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
          <div className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-[#FF007F] via-[#8A2BE2] to-[#00F0FF] shadow-[0_0_15px_rgba(255,0,127,0.5)] group-hover:scale-105 transition-all duration-300 flex-shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0C0714] p-0.5 overflow-hidden flex items-center justify-center">
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
            <span className="font-serif text-[18px] sm:text-[22px] font-bold tracking-wider bg-gradient-to-r from-[#FF007F] via-[#C77DFF] to-[#00F0FF] bg-clip-text text-transparent uppercase leading-none drop-shadow-[0_0_10px_rgba(255,0,127,0.4)] truncate">
              TAROT ITALIA
            </span>
            <span className="text-[9px] font-mono tracking-[0.22em] text-[#A69BB5] group-hover:text-[#00F0FF] transition-colors uppercase pt-1 truncate">
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
                    ? 'text-[#00F0FF] font-bold'
                    : 'text-[#A69BB5] hover:text-[#00F0FF] hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#FF007F] to-[#00F0FF] shadow-[0_0_8px_#00F0FF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Single Primary Neon CTA Button */}
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-[11px] sm:text-[12px] font-bold uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.6)] hover:shadow-[0_0_30px_rgba(255,0,127,0.9)] transition-all duration-300 cursor-pointer border border-[#FF007F]/50"
          >
            <span className="material-symbols-outlined text-sm sm:text-base leading-none">calendar_month</span>
            <span className="whitespace-nowrap">PRENOTA CONSULTA</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#A69BB5] hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphic Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0C0714]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-3 shadow-2xl animate-in fade-in duration-200">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 text-sm font-semibold tracking-wider uppercase rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#1C0F33] text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'text-[#A69BB5] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
