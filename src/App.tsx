import React, { useState, useEffect } from 'react';
import { BlogSection } from './components/BlogSection';
import { ShopSection } from './components/ShopSection';
import { BrandSeal, BrandSectionDivider, BRAND_LOGO_URL } from './components/BrandSeal';
import { ArcaniCard } from './components/ArcaniCard';
import { ARCANI_22, ArcanoInfo } from './data/arcaniData';
import { BLOG_ARTICLES } from './data/blogData';
import { SHOP_PRODUCTS } from './data/shopData';

// Image assets directly linked from reference HTML
const IMAGES = {
  avatar: BRAND_LOGO_URL,
  hero: 'https://lh3.googleusercontent.com/aida/AEtjO1UJLHzf7EsxDSdjN0Cx4QHtbImuNA7R7ImYCHjKwPKB9a_d4oSwXKcaT3gJvWyoFnlRCeMgkeJWw2ZF7Jb5_n2tYmcoXVLG1cKel_gWs60iy1frH26ok8fMvsD407eaG7PAC5wpwgjskU2yF9IJ5KPNbuRH_kAa3KZb45q8cYzGe_PJVF9wlFaFWeFwkquMhGOXOFTTp3wIcOIViuBxb8GhzK-OMN55GnXkpxROA2kHzOOaqG_WglsMPQ',
  serviceOnline: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoknsKwjQ5gMWL8eK1ObY_9BQ6Jk8KDgcWG1yZ87X3TLEMJfQjLDTzppcdq--GQPBLXre1C4PRFdqJ4MieRdx62up4qDZ07nPM5JI1Cyv1dSYzNqelbWZH01kAfItV_gDzSDbc8zjhdLU2ORvdUwFUimclSNQ6Ji0R7DRoQKIW2hanc9UUlFTeoatyi4ioQlXZjei6RL3trMkqD0EsLcaA-ztGTynT18R_-xNqJwTwstfvDx4rLbDU',
  serviceStudio: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVI-E6mN8LzTkqaK2AlHhHt6J_m2ejErCGubg7rHJrgDEmvJqKqO85sxaWmczjg7E3WgCpY6zNmQgnuHqamyxdHVSurJFn1BoLM_I8PbnCmhlfCOwFMDoXRq4yQ91nikMqRSKVi1G7Os3bG8313n7aJDSi26Fh7yIRmENKSGdbZdAlYeUEw9khRjyfug6EeoTgBf6n9fc1lhGg2XKrKrm9CfFr3CXslAiN-TC2OBWtRVpwfWvO4wLx',
  serviceRitual: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQLOvwNy2W1qr7QRcKwUiWmnyVUFEoxNlt7DLfpGOCLYir-kvrtFwJNOgbzipwez5LeGNDF4wvoGX4oi0egnh8X2WaYOumhq_ODEQ1MYeJZUStryhrvnhHoLMfPRQnqXdN4jJjx8nuM1AyGl64qU-D6TyW8NEI6-8W7c3mCEl_vdfGf9L2RpMQIkc_ZUDnxv29z29bAKEWfGQFsvkKiNh9yKhSAQVy1bhBjrAFO-WfPKlDD_OiRS7N',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'servizi' | 'chi-siamo' | 'arcani' | 'blog' | 'shop'>('home');

  useEffect(() => {
    if (activeTab === 'servizi') {
      setTimeout(() => {
        const el = document.getElementById('servizi-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [activeTab]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Lettura On Line 1h');
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<'privacy' | 'disclaimer' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArcanoObj, setSelectedArcanoObj] = useState<ArcanoInfo>(ARCANI_22[0]);
  const [arcaniFilterElement, setArcaniFilterElement] = useState<string>('Tutti');
  const [arcaniDefaultFlipped, setArcaniDefaultFlipped] = useState<boolean>(true);
  const [dailyDrawnArcano, setDailyDrawnArcano] = useState<ArcanoInfo | null>(null);
  const [isDailyDrawing, setIsDailyDrawing] = useState<boolean>(false);
  const [shopCategory, setShopCategory] = useState<string>('Tutti');

  const openShopWithCategory = (cat: string = 'Tutti') => {
    setShopCategory(cat);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cookie Consent Widget State
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | 'custom' | null>(() => {
    try {
      return (localStorage.getItem('tarot_cookie_consent') as 'accepted' | 'declined' | 'custom') || null;
    } catch {
      return null;
    }
  });
  const [isCookieCustomizerOpen, setIsCookieCustomizerOpen] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytical: true,
    preferences: true,
  });

  const handleAcceptAllCookies = () => {
    try {
      localStorage.setItem('tarot_cookie_consent', 'accepted');
    } catch {}
    setCookieConsent('accepted');
    setIsCookieCustomizerOpen(false);
  };

  const handleDeclineCookies = () => {
    try {
      localStorage.setItem('tarot_cookie_consent', 'declined');
    } catch {}
    setCookieConsent('declined');
    setCookiePreferences({ necessary: true, analytical: false, preferences: false });
    setIsCookieCustomizerOpen(false);
  };

  const handleSaveCookiePreferences = () => {
    try {
      localStorage.setItem('tarot_cookie_consent', 'custom');
      localStorage.setItem('tarot_cookie_prefs', JSON.stringify(cookiePreferences));
    } catch {}
    setCookieConsent('custom');
    setIsCookieCustomizerOpen(false);
  };

  // Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingChannel, setBookingChannel] = useState<'WhatsApp' | 'Videochiamata' | 'In Studio (Macerata)'>('WhatsApp');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('11:00');
  const [bookingNote, setBookingNote] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const openBookingFor = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setBookingSubmitted(false);
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    // WhatsApp direct redirect option
    const phone = '393791038253';
    const text = encodeURIComponent(
      `Salve Tarot Italia, desidero prenotare:\n- Servizio: ${selectedService}\n- Nome: ${bookingName}\n- Modalità: ${bookingChannel}\n- Data indicativa: ${bookingDate || 'Prima data disponibile'}\n- Orario preferito: ${bookingTime}\n- Quesito/Note: ${bookingNote || 'Nessuna specifica'}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  return (
    <div className="bg-[#0C0714] text-[#F5F0EB] min-h-screen flex flex-col font-sans selection:bg-[#FF007F] selection:text-white">
      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0C0714]/90 backdrop-blur-xl border-b border-[#8A2BE2]/30 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
        {/* Top Info Bar */}
        <div className="hidden sm:block w-full bg-[#08040E] py-1 px-4 lg:px-12 border-b border-[#8A2BE2]/20">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between text-[#A69BB5] text-[11px] font-medium uppercase tracking-widest font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]"></span>
              <span className="truncate">Studio Olistico Macerata &amp; Sessioni Online • Cyber-Misticismo dal 2012</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#00F0FF]">
                <span className="material-symbols-outlined text-sm leading-none text-[#FF007F]">auto_awesome</span>
                Frequenze &amp; Consulti Attivi
              </span>
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="h-16 sm:h-20 max-w-[1240px] mx-auto px-3 sm:px-4 lg:px-12 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Wordmark & Seal with Neon Glow */}
          <button
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none min-w-0"
          >
            <div className="relative flex items-center justify-center p-1 rounded-full bg-gradient-to-tr from-[#FF007F] via-[#8A2BE2] to-[#00F0FF] shadow-[0_0_16px_rgba(255,0,127,0.6),_0_0_25px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-all duration-300 flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0C0714] p-0.5 overflow-hidden flex items-center justify-center">
                <img
                  alt="Tarot Italia Seal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                  src={IMAGES.avatar}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-[18px] sm:text-[22px] font-bold tracking-wider bg-gradient-to-r from-[#FF007F] via-[#C77DFF] to-[#00F0FF] bg-clip-text text-transparent uppercase leading-none drop-shadow-[0_0_12px_rgba(255,0,127,0.5)] truncate">
                TAROT ITALIA
              </span>
              <span className="hidden sm:block text-[9px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase pt-1 truncate">
                Studio Olistico Macerata • Est. 2012
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-all rounded-lg cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#1C0F33] text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#130924]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveTab('servizi');
                const el = document.getElementById('servizi-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-all rounded-lg cursor-pointer ${
                activeTab === 'servizi'
                  ? 'bg-[#1C0F33] text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#130924]'
              }`}
            >
              Servizi &amp; Consulti
            </button>
            <button
              onClick={() => { setActiveTab('chi-siamo'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-all rounded-lg cursor-pointer ${
                activeTab === 'chi-siamo'
                  ? 'bg-[#1C0F33] text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#130924]'
              }`}
            >
              Chi Siamo / About
            </button>
            <button
              onClick={() => { setActiveTab('arcani'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-all rounded-lg flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'arcani'
                  ? 'bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]/60 shadow-[0_0_15px_rgba(255,0,127,0.4)]'
                  : 'text-[#A69BB5] hover:text-[#FF007F] hover:bg-[#130924]'
              }`}
            >
              <span className="material-symbols-outlined text-sm leading-none text-[#FF007F]">style</span>
              <span>22 Arcani</span>
            </button>
            <button
              onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-all rounded-lg cursor-pointer ${
                activeTab === 'blog'
                  ? 'bg-[#1C0F33] text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#130924]'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => { setActiveTab('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-all rounded-lg flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'shop'
                  ? 'bg-[#1C0F33] text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#130924]'
              }`}
            >
              <span className="material-symbols-outlined text-sm leading-none text-[#00F0FF]">storefront</span>
              <span>Shop</span>
            </button>
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => { setActiveTab('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hidden md:inline-flex items-center gap-1 px-3 py-2 text-xs text-[#00F0FF] hover:text-white transition-colors border border-[#00F0FF]/40 hover:border-[#00F0FF] rounded-xl hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] cursor-pointer"
              title="Apri Bottega"
            >
              <span className="material-symbols-outlined text-sm">shopping_bag</span>
              <span className="uppercase tracking-wider font-semibold text-[10px]">Bottega</span>
            </button>

            <button
              onClick={() => openBookingFor('Lettura On Line 1h')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-[11px] sm:text-[12px] font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.5)] hover:shadow-[0_0_30px_rgba(255,0,127,0.8)] transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm sm:text-base leading-none">calendar_month</span>
              <span className="hidden sm:inline whitespace-nowrap">Prenota Lettura</span>
              <span className="sm:hidden whitespace-nowrap">Prenota</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#A69BB5] hover:text-white rounded-lg focus:outline-none"
              aria-label="Apri menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#130924] border-b border-[#8A2BE2]/40 px-4 py-4 flex flex-col gap-2 shadow-2xl animate-in fade-in duration-200">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#00F0FF] hover:bg-[#1C0F33] rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveTab('servizi');
                setMobileMenuOpen(false);
                const el = document.getElementById('servizi-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#1C0F33] rounded-lg"
            >
              Servizi &amp; Consulti
            </button>
            <button
              onClick={() => { setActiveTab('chi-siamo'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#1C0F33] rounded-lg"
            >
              Chi Siamo / About
            </button>
            <button
              onClick={() => { setActiveTab('arcani'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#FF007F] hover:bg-[#1C0F33] rounded-lg flex items-center justify-between"
            >
              <span>22 Arcani Maggiori (Carte 3D)</span>
              <span className="text-[10px] text-[#00F0FF] bg-[#1C0F33] px-2 py-0.5 rounded border border-[#00F0FF]/30 font-mono">✦ Svela</span>
            </button>
            <button
              onClick={() => { setActiveTab('blog'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#1C0F33] rounded-lg flex items-center justify-between"
            >
              <span>Blog &amp; Articoli</span>
              <span className="text-[10px] text-[#FF007F] bg-[#1C0F33] px-2 py-0.5 rounded border border-[#FF007F]/30 font-mono">Journal</span>
            </button>
            <button
              onClick={() => { setActiveTab('shop'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#1C0F33] rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#00F0FF]">storefront</span>
                Bottega Olistica
              </span>
              <span className="text-[10px] text-[#00F0FF] bg-[#1C0F33] px-2 py-0.5 rounded font-mono">Articoli</span>
            </button>
            <a
              href="https://wa.me/393791038253"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 py-2.5 bg-[#FF007F] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(255,0,127,0.4)]"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              WhatsApp Rapido (+39 379 1038253)
            </a>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full pt-16 sm:pt-20 lg:pt-24 bg-[#0C0714] flex-1">
        {/* CONDITIONAL VIEW: CHI SIAMO TERESA / ABOUT ME & COLLABORATORI */}
        {activeTab === 'chi-siamo' && (
          <section className="max-w-[1240px] mx-auto px-4 lg:px-12 py-12 animate-in fade-in duration-300">
            {/* Top Navigation & Breadcrumb */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#8A2BE2]/30">
              <button
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#00F0FF] hover:text-[#FF007F] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Torna alla Home
              </button>
              <span className="text-xs uppercase tracking-widest text-[#A69BB5] flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
                Studio Olistico Macerata • Attivo dal 2012
              </span>
            </div>

            {/* SECTION 1: TERESA / ABOUT ME */}
            <BrandSectionDivider title="Tarot Italia • Chi Siamo & Studio Olistico" className="mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
              {/* Profile Card & Bio Column */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-[#130924]/90 backdrop-blur-xl p-8 lg:p-10 rounded-2xl border border-[#8A2BE2]/40 shadow-[0_0_30px_rgba(138,43,226,0.25)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF007F]/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C0F33] rounded-full border border-[#00F0FF]/40 mb-4 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                      About Me • Teresa
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl lg:text-4xl text-white mb-4 leading-tight font-bold">
                    Teresa <span className="italic text-[#FF007F]">&amp;</span> il Linguaggio dei Simboli
                  </h1>

                  <p className="text-[15px] lg:text-[16px] text-[#A69BB5] leading-relaxed mb-6">
                    Benvenuti in Tarot Italia. Sono Teresa, operatrice olistica, ricercatrice simbolica e tarologa. Il mio approccio unisce l’analisi visiva e semiotica dell’immagine artistica con una decennale indagine negli archetipi della psiche e della tradizione esoterica. Ogni consulto è uno spazio protetto d’ascolto autentico, concepito per disvelare nodi interiori e restituire sovranità decisionale a chi siede al tavolo degli Arcani.
                  </p>

                  {/* Formazione Scolastica */}
                  <div className="p-5 bg-[#1C0F33]/80 rounded-xl border border-[#8A2BE2]/40 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#130924] border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                        <span className="material-symbols-outlined text-lg">school</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#00F0FF] font-semibold block">
                          Formazione Accademica &amp; Artistica
                        </span>
                        <h3 className="font-serif text-lg text-white font-bold">
                          Accademia di Belle Arti di Macerata
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-[#A69BB5] leading-relaxed pl-11">
                      <strong className="text-white">Laureata in Tecniche della Comunicazione Visiva</strong>. Questa solida base permette di decodificare la grammatica visiva, cromatica e compositiva delle carte storiche non come mera superstizione, ma come linguaggio visivo archetipico che dialoga direttamente con la mente profonda.
                    </p>
                  </div>

                  {/* Quote / Mission */}
                  <blockquote className="border-l-2 border-[#FF007F] pl-4 italic text-sm text-[#F5F0EB] my-4 leading-relaxed bg-[#1C0F33]/40 py-2 rounded-r-lg">
                    “I tarocchi non impongono un destino ineluttabile: sono uno specchio limpido dove l’intuito ritrova la propria bussola, trasformando le incertezze in consapevolezza e presenza.”
                  </blockquote>
                </div>

                {/* FORMAZIONE OLISTICA DETAIL CARDS */}
                <div className="bg-[#130924]/90 backdrop-blur-xl p-8 lg:p-10 rounded-2xl border border-[#8A2BE2]/40 shadow-[0_0_30px_rgba(138,43,226,0.25)]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#FF007F] font-mono uppercase tracking-widest font-semibold">
                        <span className="material-symbols-outlined text-sm">workspace_premium</span>
                        Percorso Disciplinare Certificato
                      </div>
                      <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold mt-1">
                        Formazione Olistica di Teresa
                      </h2>
                    </div>
                    <span className="hidden sm:inline-flex px-3 py-1 bg-[#1C0F33] rounded-md text-[10px] text-[#00F0FF] font-mono uppercase tracking-wider border border-[#00F0FF]/30">
                      Accreditamenti IPHM
                    </span>
                  </div>

                  <p className="text-xs text-[#A69BB5] mb-6 leading-relaxed">
                    Un percorso di continua ricerca, studio con maestri accreditati e pratica rigorosa su molteplici canali della salute energetica e della divinazione simbolica:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Item 1: Mariangela Aggio */}
                    <div className="p-4 bg-[#1C0F33]/70 hover:bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#00F0FF] bg-[#130924] border border-[#00F0FF]/30 px-2 py-0.5 rounded">
                          Percorso 2025
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#00F0FF]">style</span>
                      </div>
                      <h4 className="font-serif text-base text-white font-semibold mb-1">
                        Tarocchi Rider Waite Smith
                      </h4>
                      <p className="text-xs text-[#A69BB5] leading-relaxed">
                        Formata con la taromante <strong>Mariangela Aggio</strong> per il Percorso 2025 in lettura e decodifica intuitiva dei Tarocchi Rider Waite Smith.
                      </p>
                    </div>

                    {/* Item 2: Dorian Bones */}
                    <div className="p-4 bg-[#1C0F33]/70 hover:bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#00F0FF] bg-[#130924] border border-[#00F0FF]/30 px-2 py-0.5 rounded">
                          Annuale 2023 / 2024
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#00F0FF]">auto_stories</span>
                      </div>
                      <h4 className="font-serif text-base text-white font-semibold mb-1">
                        Accademia Nazionale del Tarocco Esoterico
                      </h4>
                      <p className="text-xs text-[#A69BB5] leading-relaxed">
                        Formata come tarologa nel percorso annuale diretto da <strong>Dorian Bones</strong> (artista, libero ricercatore, membro fondatore della Società dello Zolfo e direttore dell’Accademia Nazionale del Tarocco Esoterico).
                      </p>
                    </div>

                    {/* Item 3: Reiki Usui */}
                    <div className="p-4 bg-[#1C0F33]/70 hover:bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 hover:border-[#FF007F] hover:shadow-[0_0_20px_rgba(255,0,127,0.2)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#FF007F] bg-[#130924] border border-[#FF007F]/30 px-2 py-0.5 rounded">
                          Lignaggio Originale
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#FF007F]">vital_signs</span>
                      </div>
                      <h4 className="font-serif text-base text-white font-semibold mb-1">
                        Operatore Reiki II Livello
                      </h4>
                      <p className="text-xs text-[#A69BB5] leading-relaxed">
                        Certificata con il Maestro <strong>F. Tartuferi</strong> secondo il lignaggio originale di <strong>Mikao Usui®</strong> per il trattamento energetico e l’armonizzazione a distanza.
                      </p>
                    </div>

                    {/* Item 4: Mindfulness IPHM */}
                    <div className="p-4 bg-[#1C0F33]/70 hover:bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#00F0FF] bg-[#130924] border border-[#00F0FF]/30 font-bold px-2 py-0.5 rounded">
                          Accredito IPHM
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#00F0FF]">self_improvement</span>
                      </div>
                      <h4 className="font-serif text-base text-white font-semibold mb-1">
                        Facilitatore Mindfulness
                      </h4>
                      <p className="text-xs text-[#A69BB5] leading-relaxed">
                        Formata presso <strong>Mindfulness Educators®</strong>, accreditata dall’ente internazionale <strong>IPHM</strong> (International Practitioners of Holistic Medicine).
                      </p>
                    </div>

                    {/* Item 5: Naturopata IPHM */}
                    <div className="p-4 bg-[#1C0F33]/70 hover:bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#00F0FF] bg-[#130924] border border-[#00F0FF]/30 font-bold px-2 py-0.5 rounded">
                          Accredito IPHM
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#00F0FF]">eco</span>
                      </div>
                      <h4 className="font-serif text-base text-white font-semibold mb-1">
                        Operatore Naturopata
                      </h4>
                      <p className="text-xs text-[#A69BB5] leading-relaxed">
                        Formata presso <strong>Future Academy®</strong>, accreditata dall’ente <strong>IPHM</strong> (International Practitioners of Holistic Medicine) per il benessere integrato.
                      </p>
                    </div>

                    {/* Item 6: Pendolo PTAH & Piramidologia */}
                    <div className="p-4 bg-[#1C0F33]/70 hover:bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 hover:border-[#FF007F] hover:shadow-[0_0_20px_rgba(255,0,127,0.2)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#FF007F] bg-[#130924] border border-[#FF007F]/30 px-2 py-0.5 rounded">
                          Radiestesia &amp; Energie
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#FF007F]">explore</span>
                      </div>
                      <h4 className="font-serif text-base text-white font-semibold mb-1">
                        Pendolo PTAH &amp; Piramidologia
                      </h4>
                      <p className="text-xs text-[#A69BB5] leading-relaxed">
                        Specializzata nell’individuazione ed elaborazione delle energie sottili da oggetti, persone, luoghi, piante e animali. Percorso diretto dall’operatore olistico <strong>Emiliano Amici</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar: Seal & Studio Coordinates */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Author Card */}
                <div className="bg-[#130924]/90 backdrop-blur-xl p-6 rounded-2xl border border-[#8A2BE2]/40 shadow-[0_0_30px_rgba(138,43,226,0.25)] flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img
                      src={IMAGES.avatar}
                      alt="Teresa Tarot Italia"
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-full object-cover border-2 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.4)] p-0.5"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#FF007F] p-1.5 rounded-full border border-white/20 shadow-[0_0_8px_rgba(255,0,127,0.8)]">
                      <span className="material-symbols-outlined text-white text-xs block">verified</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-white font-bold">Teresa</h3>
                  <p className="text-xs text-[#00F0FF] font-mono uppercase tracking-widest mt-0.5">
                    Tarologa &amp; Operatrice Olistica
                  </p>
                  <p className="text-xs text-[#A69BB5] mt-3 leading-relaxed">
                    Professione esercitata con passione e rigore deontologico a Macerata e per consultanti da tutta Italia ed Europa via web.
                  </p>

                  <div className="w-full border-t border-[#8A2BE2]/30 mt-5 pt-4 flex flex-col gap-2">
                    <button
                      onClick={() => openBookingFor('Lettura con Teresa (1h)')}
                      className="w-full py-2.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all cursor-pointer"
                    >
                      Prenota Consulto con Teresa
                    </button>
                    <a
                      href="https://wa.me/393791038253"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-[#1C0F33] hover:bg-[#130924] text-[#00F0FF] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors border border-[#00F0FF]/40 hover:border-[#00F0FF] flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm text-[#00F0FF]">chat</span>
                      Scrivile su WhatsApp
                    </a>
                  </div>
                </div>

                {/* Sede Studio Macerata */}
                <div className="bg-[#130924]/90 backdrop-blur-xl p-6 rounded-2xl border border-[#8A2BE2]/40 shadow-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#1C0F33] border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-3">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <h3 className="font-serif text-lg text-white font-bold mb-1">Lo Studio Storico</h3>
                  <p className="text-xs text-[#A69BB5] mb-4">
                    Via delle Fonti, Centro Storico<br />
                    62100 Macerata (MC), Marche, Italia
                  </p>
                  <div className="border-t border-[#8A2BE2]/30 pt-3 space-y-1.5 text-xs text-[#A69BB5]">
                    <p className="flex justify-between">
                      <span className="text-[#A69BB5]">Lun — Ven:</span>
                      <strong className="text-white">09:30 – 19:30</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-[#A69BB5]">Sabato:</span>
                      <strong className="text-white">10:00 – 16:00 (su prenotazione)</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-[#A69BB5]">Domenica:</span>
                      <span className="text-[#00F0FF] font-mono">Sessioni Intensive</span>
                    </p>
                  </div>
                </div>

                {/* Deontologia Legale */}
                <div className="p-4 bg-[#1C0F33] rounded-xl border-l-4 border-[#FF007F] text-[11px] text-[#A69BB5] leading-relaxed">
                  <strong className="text-white block mb-1">Deontologia Professionale</strong>
                  Attività disciplinata ai sensi della Legge 14 gennaio 2013, n. 4. Nessuna consulenza costituisce parere medico, sanitario o legale.
                </div>
              </div>
            </div>

            {/* SECTION 2: COLLABORATORI ESTERNI - MAURA RITUALISTA ESOTERICA */}
            <BrandSectionDivider title="Tarot Italia • Ritualistica & Tradizione Popolare" className="mb-8" />
            <div className="bg-[#130924]/90 backdrop-blur-xl p-8 lg:p-12 rounded-2xl border border-[#8A2BE2]/40 shadow-[0_0_35px_rgba(138,43,226,0.3)] relative overflow-hidden mb-12">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#8A2BE2]/15 rounded-full blur-[110px] pointer-events-none"></div>

              {/* Header Collaboratori */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#8A2BE2]/30">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs text-[#00F0FF] font-mono uppercase tracking-widest font-semibold mb-1">
                    <span className="material-symbols-outlined text-sm">groups</span>
                    <span>Collaboratori Esterni</span>
                  </div>
                  <h2 className="font-serif text-3xl lg:text-4xl text-white font-bold">
                    Maura • Ritualista Esoterica
                  </h2>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C0F33] rounded-md text-xs text-[#FF007F] border border-[#FF007F]/40 self-start md:self-auto font-mono">
                  <span className="material-symbols-outlined text-sm text-[#FF007F]">local_fire_department</span>
                  <span>Folklore Tradizionale Marchigiano</span>
                </div>
              </div>

              {/* Subheading & In-depth Manifesto */}
              <div className="mb-8">
                <h3 className="font-serif text-xl lg:text-2xl text-[#00F0FF] font-bold mb-3">
                  Obiettivi e significato della ritualità esoterica nel folklore marchigiano
                </h3>
                <p className="text-[15px] text-[#A69BB5] leading-relaxed mb-4">
                  Nelle Marche, il ritualismo esoterico assume alcune peculiarità legate al folklore locale e a pratiche tradizionali tramandate da generazione in generazione. Come operatrice esoterica mi occupo in particolare della ritualistica d’amore:
                </p>
              </div>

              {/* 4 Core Practices Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* 1. Rituali d'amore e attrazione */}
                <div className="p-5 bg-[#1C0F33]/80 hover:bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 hover:border-[#FF007F] hover:shadow-[0_0_20px_rgba(255,0,127,0.25)] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#130924] border border-[#FF007F]/30 flex items-center justify-center text-[#FF007F] mb-3">
                      <span className="material-symbols-outlined text-xl">favorite</span>
                    </div>
                    <h4 className="font-serif text-base text-white font-semibold mb-2">
                      Rituali d’Amore e Attrazione
                    </h4>
                    <p className="text-xs text-[#A69BB5] leading-relaxed">
                      Pratiche di risveglio della luce personale e magnetismo affettivo per favorire l'incontro armonico e l'apertura all'altro.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#8A2BE2]/20 text-[10px] text-[#00F0FF] font-mono uppercase tracking-wider font-semibold">
                    Attrazione &amp; Luce
                  </div>
                </div>

                {/* 2. Legamenti d'amore */}
                <div className="p-5 bg-[#1C0F33]/80 hover:bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 hover:border-[#FF007F] hover:shadow-[0_0_20px_rgba(255,0,127,0.25)] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#130924] border border-[#FF007F]/30 flex items-center justify-center text-[#FF007F] mb-3">
                      <span className="material-symbols-outlined text-xl">all_inclusive</span>
                    </div>
                    <h4 className="font-serif text-base text-white font-semibold mb-2">
                      Legamenti d’Amore
                    </h4>
                    <p className="text-xs text-[#A69BB5] leading-relaxed">
                      Lavori tradizionali radicati nelle formule storiche popolari marchigiane per consolidare il legame profondo d'anime con intenzione pura.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#8A2BE2]/20 text-[10px] text-[#00F0FF] font-mono uppercase tracking-wider font-semibold">
                    Unione Tradizionale
                  </div>
                </div>

                {/* 3. Riti di riconciliazione */}
                <div className="p-5 bg-[#1C0F33]/80 hover:bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 hover:border-[#FF007F] hover:shadow-[0_0_20px_rgba(255,0,127,0.25)] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#130924] border border-[#FF007F]/30 flex items-center justify-center text-[#FF007F] mb-3">
                      <span className="material-symbols-outlined text-xl">handshake</span>
                    </div>
                    <h4 className="font-serif text-base text-white font-semibold mb-2">
                      Riti di Riconciliazione
                    </h4>
                    <p className="text-xs text-[#A69BB5] leading-relaxed">
                      Purificazione delle incomprensioni e pacificazione delle turbolenze per favorire il dialogo sincero e lo scioglimento dei rancori.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#8A2BE2]/20 text-[10px] text-[#00F0FF] font-mono uppercase tracking-wider font-semibold">
                    Armonia &amp; Dialogo
                  </div>
                </div>

                {/* 4. Riti di rafforzamento della coppia */}
                <div className="p-5 bg-[#1C0F33]/80 hover:bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 hover:border-[#FF007F] hover:shadow-[0_0_20px_rgba(255,0,127,0.25)] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#130924] border border-[#FF007F]/30 flex items-center justify-center text-[#FF007F] mb-3">
                      <span className="material-symbols-outlined text-xl">shield</span>
                    </div>
                    <h4 className="font-serif text-base text-white font-semibold mb-2">
                      Rafforzamento della Coppia
                    </h4>
                    <p className="text-xs text-[#A69BB5] leading-relaxed">
                      Scudo energetico e schermatura contro interferenze esterne, gelosie o logorio del quotidiano per custodire la sacralità del legame.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#8A2BE2]/20 text-[10px] text-[#00F0FF] font-mono uppercase tracking-wider font-semibold">
                    Protezione del Legame
                  </div>
                </div>
              </div>

              {/* Maura's Authentic Words & Philosophy */}
              <div className="p-6 bg-[#1C0F33] rounded-xl border-l-4 border-[#FF007F] mb-6">
                <p className="font-serif text-[15px] lg:text-[16px] text-white italic leading-relaxed mb-3">
                  “Questa ritualità di coppia agisce come mediatore tra il mondo spirituale e quello umano. Utilizzando conoscenze e pratiche popolari per aiutare le persone a migliorare o proteggere i loro rapporti affettivi. La mia arte si basa su una profonda comprensione delle energie e dei simboli d’amore, unita al rispetto per la sacralità delle relazioni e della volontà delle persone.”
                </p>
                <div className="text-right text-xs text-[#FF007F] font-mono font-semibold uppercase tracking-widest">
                  — Maura, Operatrice e Ritualista Esoterica
                </div>
              </div>

              {/* Direct Inquire for Maura's Rituals */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#8A2BE2]/30">
                <div className="text-xs text-[#A69BB5]">
                  Desideri informazioni approfondite o una valutazione preventiva su un percorso di ritualistica d'amore con Maura?
                </div>
                <button
                  onClick={() => openBookingFor('Richiesta Ritualistica d’Amore (Maura)')}
                  className="px-5 py-2.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                  <span>Richiedi Valutazione Rituale</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* CONDITIONAL VIEW: 22 ARCANI CYBER-MISTICI */}
        {activeTab === 'arcani' && (
          <section className="max-w-[1280px] mx-auto px-4 lg:px-12 py-10 lg:py-14 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#8A2BE2]/30">
              <button
                onClick={() => setActiveTab('home')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#00F0FF] hover:text-[#FF007F] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Torna alla Home
              </button>
              <span className="text-xs uppercase tracking-widest text-[#A69BB5] font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] animate-pulse"></span>
                Dizionario Archetipico • 22 Lame Cibernetiche
              </span>
            </div>

            <BrandSectionDivider title="Tarot Italia • Compendio dei 22 Arcani" className="mb-8" />

            {/* Header Narrative */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[12px] font-bold text-[#FF007F] uppercase tracking-widest flex items-center justify-center gap-1.5 drop-shadow-[0_0_8px_rgba(255,0,127,0.6)]">
                <span className="material-symbols-outlined text-sm">style</span>
                <span>Compendio Iniziatico &amp; Deck Interattivo</span>
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-white mt-1.5 mb-3 leading-tight">
                I 22 Arcani Maggiori: Specchio dell’Anima
              </h1>
              <p className="text-sm sm:text-base text-[#A69BB5] leading-relaxed max-w-2xl mx-auto">
                Ogni Arcano è un portale di trasformazione interiore con la propria specifica iconografia cibernetica. Tocca una lama per girarla, svelarne il sigillo <strong>Tarot Italia</strong> sul retro o decifrarne il messaggio sacro.
              </p>
            </div>

            {/* Interactive Control Deck Bar */}
            <div className="bg-[#130924]/90 backdrop-blur-xl border border-[#8A2BE2]/50 rounded-2xl p-4 sm:p-6 mb-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left Actions: Flip Mode & Daily Draw */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => setArcaniDefaultFlipped(prev => !prev)}
                  className="px-4 py-2 bg-[#1C0F33] hover:bg-[#251245] text-[#00F0FF] border border-[#00F0FF]/40 hover:border-[#00F0FF] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                >
                  <span className="material-symbols-outlined text-sm">360</span>
                  <span>{arcaniDefaultFlipped ? 'Mostra Retro (Sigillo Brand)' : 'Mostra Volti Arcani'}</span>
                </button>

                <button
                  type="button"
                  disabled={isDailyDrawing}
                  onClick={() => {
                    setIsDailyDrawing(true);
                    setTimeout(() => {
                      const randomIndex = Math.floor(Math.random() * ARCANI_22.length);
                      const chosen = ARCANI_22[randomIndex];
                      setDailyDrawnArcano(chosen);
                      setSelectedArcanoObj(chosen);
                      setIsDailyDrawing(false);
                      const el = document.getElementById('arcano-focus-panel');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                  }}
                  className="px-5 py-2 bg-[#FF007F] hover:bg-[#FF1A8C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,0,127,0.5)] hover:shadow-[0_0_30px_rgba(255,0,127,0.8)] flex items-center gap-2 cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-sm ${isDailyDrawing ? 'animate-spin' : ''}`}>
                    auto_awesome
                  </span>
                  <span>{isDailyDrawing ? 'Sintonizzazione...' : 'Estrai la Tua Lama del Giorno'}</span>
                </button>
              </div>

              {/* Element Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#A69BB5] mr-1 hidden sm:inline">Elemento:</span>
                {['Tutti', 'Fuoco', 'Acqua', 'Aria', 'Terra', 'Cosmo', 'Etere', 'Vuoto'].map((elem) => (
                  <button
                    key={elem}
                    type="button"
                    onClick={() => setArcaniFilterElement(elem)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      arcaniFilterElement === elem
                        ? 'bg-[#00F0FF] text-[#0C0714] font-bold shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                        : 'bg-[#1C0F33] text-[#A69BB5] hover:text-[#00F0FF] border border-[#8A2BE2]/40'
                    }`}
                  >
                    {elem}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Draw Banner Announcement if drawn */}
            {dailyDrawnArcano && (
              <div className="mb-10 p-4 sm:p-6 bg-gradient-to-r from-[#180A2E] via-[#1F0733] to-[#0E1A29] rounded-2xl border-2 border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.35)] flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF] flex items-center justify-center text-[#00F0FF]">
                    <span className="material-symbols-outlined text-2xl">flare</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest font-bold">
                      ✦ Sincronicità Rivelata per Te
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-bold">
                      {dailyDrawnArcano.name} ({dailyDrawnArcano.num}) — {dailyDrawnArcano.archetypeRole}
                    </h3>
                    <p className="text-xs text-[#A69BB5] italic">
                      "{dailyDrawnArcano.advice}"
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDailyDrawnArcano(null)}
                  className="text-xs text-[#A69BB5] hover:text-white underline cursor-pointer"
                >
                  Chiudi Avviso
                </button>
              </div>
            )}

            {/* Main Interactive Grid of 22 Arcani Cards */}
            <div className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase font-mono tracking-widest text-[#00F0FF]">
                  Tavola degli Arcani ({
                    ARCANI_22.filter(a => arcaniFilterElement === 'Tutti' || a.element === arcaniFilterElement).length
                  } carte)
                </span>
                <span className="text-xs text-[#A69BB5] font-mono">
                  Clicca una carta per girarla o selezionarla
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
                {ARCANI_22
                  .filter(a => arcaniFilterElement === 'Tutti' || a.element === arcaniFilterElement)
                  .map((arcano) => (
                    <ArcaniCard
                      key={arcano.num + arcano.name}
                      arcano={arcano}
                      isSelected={selectedArcanoObj.num === arcano.num}
                      defaultFlipped={arcaniDefaultFlipped}
                      size="sm"
                      onSelect={(selected) => {
                        setSelectedArcanoObj(selected);
                        const el = document.getElementById('arcano-focus-panel');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  ))}
              </div>
            </div>

            {/* Selected Arcano In-Depth Contemplation Panel */}
            <div
              id="arcano-focus-panel"
              className="bg-[#130924] p-6 sm:p-10 lg:p-12 rounded-3xl border-2 border-[#8A2BE2]/60 shadow-[0_0_40px_rgba(138,43,226,0.3)] relative overflow-hidden"
            >
              {/* Background ambient glow */}
              <div
                className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[140px] opacity-30 pointer-events-none"
                style={{ backgroundColor: selectedArcanoObj.primaryColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* 3D Interactive Card Spotlight */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#00F0FF] mb-3">
                    Lama Selezionata
                  </span>
                  <ArcaniCard
                    arcano={selectedArcanoObj}
                    isSelected={true}
                    defaultFlipped={true}
                    size="md"
                  />
                  <span className="text-[10px] text-[#A69BB5] mt-2 font-mono">
                    Tocca per girare e ammirare il Sigillo
                  </span>
                </div>

                {/* Text and Esoteric Details */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider"
                      style={{
                        backgroundColor: `${selectedArcanoObj.primaryColor}20`,
                        color: selectedArcanoObj.primaryColor,
                        border: `1px solid ${selectedArcanoObj.primaryColor}60`
                      }}
                    >
                      Arcano Maggiore {selectedArcanoObj.num}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#1C0F33] text-[#00F0FF] border border-[#00F0FF]/30">
                      Elemento: {selectedArcanoObj.element}
                    </span>
                    <span className="text-xs text-[#A69BB5] font-mono">
                      ✦ {selectedArcanoObj.archetypeRole}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold leading-tight">
                    {selectedArcanoObj.name}
                  </h2>

                  {/* Keywords */}
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedArcanoObj.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#1C0F33] border border-[#8A2BE2]/40 text-[#F5F0EB]"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>

                  {/* Meaning */}
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-widest text-[#00F0FF] font-semibold">
                      Significato Simbolico ed Evolutivo:
                    </h4>
                    <p className="text-sm sm:text-base text-[#F5F0EB] leading-relaxed">
                      {selectedArcanoObj.meaning}
                    </p>
                  </div>

                  {/* Advice */}
                  <div className="p-5 rounded-2xl bg-[#1C0F33] border-l-4 border-[#FF007F] shadow-[0_0_20px_rgba(255,0,127,0.15)]">
                    <h4 className="text-xs uppercase tracking-widest text-[#FF007F] font-semibold mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">psychology</span>
                      <span>Consiglio per l’Introspezione &amp; Presenza:</span>
                    </h4>
                    <p className="text-sm sm:text-base italic text-white leading-relaxed">
                      “{selectedArcanoObj.advice}”
                    </p>
                  </div>

                  {/* Booking CTA */}
                  <div className="pt-4 border-t border-[#8A2BE2]/30 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-[#A69BB5] max-w-sm">
                      Vuoi canalizzare l'energia di <strong>{selectedArcanoObj.name}</strong> nella tua situazione personale?
                    </p>
                    <button
                      onClick={() => openBookingFor(`Consulto con focus su ${selectedArcanoObj.name}`)}
                      className="px-6 py-3 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(255,0,127,0.5)] cursor-pointer"
                    >
                      Richiedi Stesura su Questa Lama
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONDITIONAL VIEW: BLOG SECTION */}
        {activeTab === 'blog' && (
          <BlogSection
            onBackToHome={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onOpenBooking={openBookingFor}
          />
        )}

        {/* CONDITIONAL VIEW: SHOP SECTION */}
        {activeTab === 'shop' && (
          <ShopSection
            onBackToHome={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            initialCategory={shopCategory}
            onOpenPrivacy={() => setIsLegalModalOpen('privacy')}
            onOpenCookie={() => setIsCookieCustomizerOpen(true)}
          />
        )}

        {/* DEFAULT HOME VIEW (ALSO RENDERED WHEN SERVIZI IS SELECTED) */}
        {(activeTab === 'home' || activeTab === 'servizi') && (
          <div className="flex flex-col w-full">
            {/* HERO SECTION */}
            <section className="relative w-full overflow-hidden bg-[#0C0714]">
              {/* Cyber-Mystic Radial Background Glows */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-[#8A2BE2]/15 rounded-full blur-[140px] pointer-events-none"></div>
              <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] bg-[#FF007F]/15 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute top-1/3 -right-20 w-[460px] h-[460px] bg-[#00F0FF]/10 rounded-full blur-[120px] pointer-events-none"></div>

              {/* Brand Logo Decorative Watermark in soft blurred transparency */}
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full overflow-hidden opacity-15 pointer-events-none select-none blur-[2px] mix-blend-screen animate-pulse">
                <img
                  src={IMAGES.avatar}
                  alt="Tarot Italia Seal Watermark"
                  className="w-full h-full object-cover filter contrast-125 saturate-150"
                />
              </div>

              <div className="max-w-[1240px] mx-auto px-4 lg:px-12 py-10 sm:py-16 lg:py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Text Content Column */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    {/* Cyber Badge */}
                    <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#130924]/90 rounded-full border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.25)] backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_6px_#00F0FF]"></span>
                      <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                        Dal 2012 • Cyber-Misticismo &amp; Tarologia Archetipica
                      </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="font-serif text-[28px] sm:text-[38px] lg:text-[46px] text-white leading-tight max-w-2xl font-bold">
                      Il Linguaggio Segreto degli <span className="bg-gradient-to-r from-[#FF007F] via-[#C77DFF] to-[#00F0FF] bg-clip-text text-transparent italic drop-shadow-[0_0_15px_rgba(255,0,127,0.5)]">Arcani</span> per la Tua Evoluzione Interiore
                    </h1>

                    {/* Poetic Subtitle */}
                    <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#A69BB5] max-w-xl leading-relaxed">
                      Uno spazio sacro e cibernetico per decodificare il tuo destino interiore. Sessioni individuali di ascolto empatico e divinazione archetipica, online via WhatsApp ovunque nel mondo o nello studio esoterico di Macerata.
                    </p>

                    {/* Dual CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => openBookingFor('Lettura On Line 1h')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-[12px] font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.5)] hover:shadow-[0_0_30px_rgba(255,0,127,0.8)] transition-all duration-300 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base leading-none">flare</span>
                        <span>Prenota Lettura (1h)</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('arcani');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#130924] text-[#00F0FF] text-[12px] font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1C0F33] hover:text-white transition-all duration-300 border border-[#00F0FF]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base leading-none text-[#FF007F]">style</span>
                        <span>Esplora i 22 Arcani</span>
                      </button>
                    </div>

                    {/* Social Proof & Trust Metric */}
                    <div className="flex items-center gap-4 pt-3">
                      <div className="flex items-center gap-1 text-[#FF007F]">
                        <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-white font-semibold uppercase tracking-wider font-mono">
                          Valutato 5.0 su Google Recensioni
                        </span>
                        <span className="text-[12px] text-[#A69BB5]">
                          Oltre 10 anni di consulti, etica e supporto profondo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Esoteric Portrait Column */}
                  <div className="lg:col-span-5 relative flex justify-center">
                    <div className="relative w-full max-w-[380px] aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(138,43,226,0.4)] bg-[#130924] group border-2 border-[#8A2BE2]/50 hover:border-[#00F0FF] transition-all duration-500">
                      <img
                        alt="Evocazione rituale di Tarot Italia"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter contrast-110 grayscale brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                        src={IMAGES.hero}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0714] via-[#0C0714]/40 to-transparent"></div>

                      {/* Recessed Archival Stamp Overlay with Neon Halo */}
                      <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#130924]/90 backdrop-blur-md rounded-xl shadow-lg flex items-center gap-3.5 border border-[#00F0FF]/40">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 p-0.5 bg-gradient-to-tr from-[#FF007F] to-[#00F0FF] shadow-[0_0_12px_rgba(255,0,127,0.6)]">
                          <img
                            alt="Sigillo Tarot Italia"
                            referrerPolicy="no-referrer"
                            className="w-full h-full rounded-full object-cover bg-[#0C0714]"
                            src={IMAGES.avatar}
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-serif text-[16px] text-white truncate font-bold">
                            Sanctuario Simbolico
                          </span>
                          <span className="text-[10px] text-[#00F0FF] font-mono tracking-wider truncate">
                            Studio Macerata • Online Globale
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VALORI & FILOSOFIA (3 CORE CARDS) */}
            <section className="w-full bg-[#0C0714] py-20 border-t border-[#8A2BE2]/20" id="metodi">
              <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-10">
                {/* Logo ad inizio sezione centrato e visibile con bagliore sobrio */}
                <BrandSectionDivider title="Tarot Italia • Metodo Introspettivo" />

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="flex flex-col gap-1 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#FF007F] uppercase tracking-widest">
                      <span>◆</span>
                      <span>Visione &amp; Deontologia</span>
                    </div>
                    <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold">
                      Un Approccio Rigoroso, Empatico e Intuitivo
                    </h2>
                  </div>
                  <p className="text-[15px] text-[#A69BB5] max-w-md leading-relaxed">
                    I tarocchi non sono predestinazione immutabile, ma una grammatica per svelare l'invisibile e risvegliare le tue decisioni più autentiche.
                  </p>
                </div>

                {/* 3 Pillars Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="bg-[#130924]/80 backdrop-blur-md p-7 rounded-2xl shadow-xl flex flex-col gap-4 transition-all duration-300 hover:bg-[#1C0F33] border border-[#8A2BE2]/40 hover:border-[#00F0FF] hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                    <div className="w-12 h-12 rounded-xl bg-[#1C0F33] border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] shadow-sm">
                      <span className="material-symbols-outlined text-2xl">psychology_alt</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-mono font-semibold text-[#FF007F] uppercase tracking-widest">
                        Pilastro 01
                      </span>
                      <h3 className="font-serif text-xl text-white font-bold">
                        Introspezione non Dogmatica
                      </h3>
                    </div>
                    <p className="text-[15px] text-[#A69BB5] leading-relaxed">
                      I tarocchi come specchio della psiche e bussola d'orientamento personale. Nessun fatalismo: stimoliamo il pensiero critico e la consapevolezza emotiva.
                    </p>
                    <div className="mt-auto pt-2 flex items-center gap-2 text-[#00F0FF] text-[11px] font-semibold uppercase tracking-wider">
                      <span>Specchio Archetipico</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#130924]/80 backdrop-blur-md p-7 rounded-2xl shadow-xl flex flex-col gap-4 transition-all duration-300 hover:bg-[#1C0F33] border border-[#8A2BE2]/40 hover:border-[#00F0FF] hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                    <div className="w-12 h-12 rounded-xl bg-[#1C0F33] border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] shadow-sm">
                      <span className="material-symbols-outlined text-2xl">nest_clock_farsight_analog</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-mono font-semibold text-[#FF007F] uppercase tracking-widest">
                        Pilastro 02
                      </span>
                      <h3 className="font-serif text-xl text-white font-bold">
                        Spazio d'Ascolto Protetto
                      </h3>
                    </div>
                    <p className="text-[15px] text-[#A69BB5] leading-relaxed">
                      Un'ora integrale (60 min) dedicata senza fretta ai tuoi sogni, desideri nascosti, nodi emotivi e scelte di vita, in un contesto privo di giudizio.
                    </p>
                    <div className="mt-auto pt-2 flex items-center gap-2 text-[#00F0FF] text-[11px] font-semibold uppercase tracking-wider">
                      <span>Riservatezza Assoluta</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-[#130924]/80 backdrop-blur-md p-7 rounded-2xl shadow-xl flex flex-col gap-4 transition-all duration-300 hover:bg-[#1C0F33] border border-[#8A2BE2]/40 hover:border-[#00F0FF] hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                    <div className="w-12 h-12 rounded-xl bg-[#1C0F33] border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] shadow-sm">
                      <span className="material-symbols-outlined text-2xl">distance</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-mono font-semibold text-[#FF007F] uppercase tracking-widest">
                        Pilastro 03
                      </span>
                      <h3 className="font-serif text-xl text-white font-bold">
                        Doppia Modalità Fluida
                      </h3>
                    </div>
                    <p className="text-[15px] text-[#A69BB5] leading-relaxed">
                      Consulti dal vivo presso la quiete dello studio storico di Macerata, oppure comodamente online via WhatsApp o videochiamata ovunque ti trovi nel mondo.
                    </p>
                    <div className="mt-auto pt-2 flex items-center gap-2 text-[#00F0FF] text-[11px] font-semibold uppercase tracking-wider">
                      <span>Presenza &amp; Digitale</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ANTEPRIMA SERVIZI CHIAVE */}
            <section className="w-full bg-[#0C0714] py-20 border-t border-[#8A2BE2]/20" id="servizi-section">
              <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
                <BrandSectionDivider title="Tarot Italia • Consulti & Percorsi" />
                {/* Section Title & Narrative */}
                <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold text-[#00F0FF] uppercase tracking-widest">
                    Consulti &amp; Pratiche
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold">
                    Percorsi di Chiarezza ed Equilibrio
                  </h2>
                  <p className="text-[15px] text-[#A69BB5]">
                    Un viaggio simbolico attraverso la vostra intuizione dove con il supporto degli arcani si trova chiarezza ed equilibrio interiore.
                  </p>
                </div>

                {/* Service Cards (Proportion 3:4 Sacred Ratio Style) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Service 1: Lettura On Line */}
                  <div className="bg-[#130924]/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1 border border-[#8A2BE2]/40 hover:border-[#00F0FF] hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]">
                    <div className="relative w-full h-52 overflow-hidden bg-[#0C0714]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Lettura On Line 1h"
                        referrerPolicy="no-referrer"
                        src={IMAGES.serviceOnline}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#130924] via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-[#1C0F33]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[#00F0FF] text-[11px] font-mono font-medium uppercase tracking-widest border border-[#00F0FF]/30">
                        60 Minuti
                      </div>
                      <div className="absolute top-3 right-3 bg-[#130924]/90 text-[#FF007F] border border-[#FF007F]/40 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium flex items-center gap-1 shadow-[0_0_8px_rgba(255,0,127,0.4)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] animate-pulse"></span>
                        Live Video/WA
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <h3 className="font-serif text-xl text-white group-hover:text-[#00F0FF] transition-colors font-bold">
                        Lettura On Line 1h
                      </h3>
                      <p className="text-[13px] text-[#A69BB5] leading-relaxed">
                        La comodità di un consulto profondo ovunque tu sia. Stesure personalizzate, analisi dettagliata degli schemi ricorrenti e spazio aperto per tutte le tue domande.
                      </p>
                      <ul className="flex flex-col gap-2 pt-1 text-[13px] text-[#F5F0EB]">
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#00F0FF]">check_circle</span>
                          <span>Foto finale stesura ad alta risoluzione</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#00F0FF]">check_circle</span>
                          <span>Registrazione audio inclusa su richiesta</span>
                        </li>
                      </ul>
                      <div className="pt-4 mt-auto">
                        <button
                          onClick={() => openBookingFor('Lettura On Line 1h')}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-[12px] font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">devices</span>
                          <span>Prenota Online</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Service 2: Lettura Dal Vivo */}
                  <div className="bg-[#130924]/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1 border border-[#8A2BE2]/40 hover:border-[#00F0FF] hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]">
                    <div className="relative w-full h-52 overflow-hidden bg-[#0C0714]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Lettura Dal Vivo a Macerata"
                        referrerPolicy="no-referrer"
                        src={IMAGES.serviceStudio}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#130924] via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-[#1C0F33]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[#00F0FF] text-[11px] font-mono font-medium uppercase tracking-widest border border-[#00F0FF]/30">
                        Presenza • 1h
                      </div>
                      <div className="absolute top-3 right-3 bg-[#130924]/90 text-[#00F0FF] border border-[#00F0FF]/40 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                        Macerata Centro
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <h3 className="font-serif text-xl text-white group-hover:text-[#00F0FF] transition-colors font-bold">
                        Lettura Dal Vivo
                      </h3>
                      <p className="text-[13px] text-[#A69BB5] leading-relaxed">
                        L'esperienza sensoriale completa nello studio privato di Macerata. Tisana meditativa, fragranze resinose botaniche e il contatto diretto con le carte storiche.
                      </p>
                      <ul className="flex flex-col gap-2 pt-1 text-[13px] text-[#F5F0EB]">
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#00F0FF]">check_circle</span>
                          <span>Ambiente schermato e silenzioso</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#00F0FF]">check_circle</span>
                          <span>Tarocchi storici e oracoli d'autore</span>
                        </li>
                      </ul>
                      <div className="pt-4 mt-auto">
                        <button
                          onClick={() => openBookingFor('Lettura Dal Vivo (Macerata)')}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-[12px] font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">storefront</span>
                          <span>Prenota in Studio</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Service 3: Ritualistica & Armonie */}
                  <div className="bg-[#130924]/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1 border border-[#8A2BE2]/40 hover:border-[#FF007F] hover:shadow-[0_0_25px_rgba(255,0,127,0.25)]">
                    <div className="relative w-full h-52 overflow-hidden bg-[#0C0714]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Ritualistica & Armonie"
                        referrerPolicy="no-referrer"
                        src={IMAGES.serviceRitual}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#130924] via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-[#1C0F33]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[#FF007F] text-[11px] font-mono font-medium uppercase tracking-widest border border-[#FF007F]/30">
                        Percorso Energetico
                      </div>
                      <div className="absolute top-3 right-3 bg-[#130924]/90 text-[#A69BB5] border border-[#8A2BE2]/40 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium">
                        Personalizzato
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <h3 className="font-serif text-xl text-white group-hover:text-[#FF007F] transition-colors font-bold">
                        Ritualistica &amp; Armonie
                      </h3>
                      <p className="text-[13px] text-[#A69BB5] leading-relaxed">
                        Lavori energetici e pratiche simboliche mirate allo sblocco delle tensioni, riequilibrio dei canali intuitivi e armonizzazione degli ambienti di vita e lavoro.
                      </p>
                      <ul className="flex flex-col gap-2 pt-1 text-[13px] text-[#F5F0EB]">
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#00F0FF]">check_circle</span>
                          <span>Analisi preventiva della situazione</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#00F0FF]">check_circle</span>
                          <span>Pratiche con elementi naturali etici</span>
                        </li>
                      </ul>
                      <div className="pt-4 mt-auto">
                        <button
                          onClick={() => openBookingFor('Ritualistica & Armonie')}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1C0F33] hover:bg-[#130924] text-[#00F0FF] hover:text-white text-[12px] font-semibold uppercase tracking-wider rounded-xl transition-all border border-[#00F0FF]/40 hover:border-[#00F0FF] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                          <span>Richiedi Info</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* INTERACTIVE FAQ SECTION */}
            <section className="w-full bg-[#0C0714] py-20 border-t border-[#8A2BE2]/20">
              <div className="max-w-[1000px] mx-auto px-4 lg:px-12 flex flex-col gap-10">
                <BrandSectionDivider title="Tarot Italia • Domande Frequenti" />
                <div className="text-center flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold text-[#FF007F] uppercase tracking-widest">
                    Chiarezza &amp; Verità
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold">
                    Domande Frequenti sui Tarocchi
                  </h2>
                  <p className="text-[15px] text-[#A69BB5] max-w-lg">
                    I principi autentici che guidano ogni nostra lettura e sfatano i luoghi comuni della divinazione commerciale.
                  </p>
                </div>

                {/* Accordion Container */}
                <div className="flex flex-col gap-3" id="faq-accordion">
                  {/* FAQ 1 */}
                  <div className="bg-[#130924]/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg transition-all duration-200 border border-[#8A2BE2]/40 hover:border-[#00F0FF]/50">
                    <button
                      onClick={() => toggleFaq(0)}
                      aria-expanded={expandedFaq === 0}
                      className="w-full p-4 flex items-center justify-between text-left gap-4 text-white hover:text-[#00F0FF] transition-colors font-serif text-[17px] group cursor-pointer focus:outline-none"
                      type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full transition-colors ${expandedFaq === 0 ? 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]' : 'bg-[#00F0FF]/40'}`}></span>
                        Cosa sono i tarocchi?
                      </span>
                      <span className={`material-symbols-outlined text-[#00F0FF] transform transition-transform duration-300 ${expandedFaq === 0 ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {expandedFaq === 0 && (
                      <div className="px-4 pb-4 text-[#A69BB5] text-[15px] leading-relaxed border-t border-[#8A2BE2]/20 pt-3 animate-in fade-in duration-200">
                        I Tarocchi sono uno strumento di introspezione e riflessione che si rivolge a chiunque desideri esplorare il proprio mondo interiore, ottenere chiarezza su una situazione o approfondire la propria connessione con l'altro. Non sono una gabbia dogmatica, ma una mappa di simboli universali.
                      </div>
                    )}
                  </div>

                  {/* FAQ 2 */}
                  <div className="bg-[#130924]/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg transition-all duration-200 border border-[#8A2BE2]/40 hover:border-[#00F0FF]/50">
                    <button
                      onClick={() => toggleFaq(1)}
                      aria-expanded={expandedFaq === 1}
                      className="w-full p-4 flex items-center justify-between text-left gap-4 text-white hover:text-[#00F0FF] transition-colors font-serif text-[17px] group cursor-pointer focus:outline-none"
                      type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full transition-colors ${expandedFaq === 1 ? 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]' : 'bg-[#00F0FF]/40'}`}></span>
                        Quando fare una lettura?
                      </span>
                      <span className={`material-symbols-outlined text-[#00F0FF] transform transition-transform duration-300 ${expandedFaq === 1 ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {expandedFaq === 1 && (
                      <div className="px-4 pb-4 text-[#A69BB5] text-[15px] leading-relaxed border-t border-[#8A2BE2]/20 pt-3 animate-in fade-in duration-200">
                        Fare una lettura di tarocchi significa entrare in dialogo con sé stessi, essere pronti ad ascoltare la propria intuizione e ad affrontare con sincerità ciò che emerge. È consigliata quando ci si trova di fronte a un bivio decisionale, durante un passaggio emotivo cruciale, o quando si percepisce un senso di stasi interiore.
                      </div>
                    )}
                  </div>

                  {/* FAQ 3 */}
                  <div className="bg-[#130924]/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg transition-all duration-200 border border-[#8A2BE2]/40 hover:border-[#00F0FF]/50">
                    <button
                      onClick={() => toggleFaq(2)}
                      aria-expanded={expandedFaq === 2}
                      className="w-full p-4 flex items-center justify-between text-left gap-4 text-white hover:text-[#00F0FF] transition-colors font-serif text-[17px] group cursor-pointer focus:outline-none"
                      type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full transition-colors ${expandedFaq === 2 ? 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]' : 'bg-[#00F0FF]/40'}`}></span>
                        A chi si rivolgono?
                      </span>
                      <span className={`material-symbols-outlined text-[#00F0FF] transform transition-transform duration-300 ${expandedFaq === 2 ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {expandedFaq === 2 && (
                      <div className="px-4 pb-4 text-[#A69BB5] text-[15px] leading-relaxed border-t border-[#8A2BE2]/20 pt-3 animate-in fade-in duration-200">
                        Nonostante il loro utilizzo tradizionale per scopi divinatori, i tarocchi possono essere un mezzo non dogmatico per stimolare il pensiero critico e la riflessione interiore. Si rivolgono a spiriti liberi, ricercatori spirituali, professionisti in cerca di orientamento o chiunque voglia guardarsi dentro con onestà e lucidità.
                      </div>
                    )}
                  </div>

                  {/* FAQ 4 */}
                  <div className="bg-[#130924]/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg transition-all duration-200 border border-[#8A2BE2]/40 hover:border-[#00F0FF]/50">
                    <button
                      onClick={() => toggleFaq(3)}
                      aria-expanded={expandedFaq === 3}
                      className="w-full p-4 flex items-center justify-between text-left gap-4 text-white hover:text-[#00F0FF] transition-colors font-serif text-[17px] group cursor-pointer focus:outline-none"
                      type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full transition-colors ${expandedFaq === 3 ? 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]' : 'bg-[#00F0FF]/40'}`}></span>
                        Cosa aspettarsi da una lettura dei Tarocchi?
                      </span>
                      <span className={`material-symbols-outlined text-[#00F0FF] transform transition-transform duration-300 ${expandedFaq === 3 ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {expandedFaq === 3 && (
                      <div className="px-4 pb-4 text-[#A69BB5] text-[15px] leading-relaxed border-t border-[#8A2BE2]/20 pt-3 animate-in fade-in duration-200">
                        I Tarocchi non offrono risposte definitive o predizioni rigide, ma spunti, intuizioni e riflessioni che ti aiutano a comprendere meglio te stesso e le tue circostanze. Ogni lettura è un viaggio unico, progettato per illuminare il tuo percorso e offrire ispirazione concreta.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* TESTIMONIANZE E GOOGLE REVIEWS SECTION */}
            <section className="w-full bg-[#0C0714] py-20 border-t border-[#8A2BE2]/20">
              <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
                <BrandSectionDivider title="Tarot Italia • Esperienze & Recensioni" />
                {/* Top Title and Google Rating Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col gap-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-[#00F0FF] font-mono text-[11px] font-semibold uppercase tracking-widest justify-center md:justify-start">
                      <span className="material-symbols-outlined text-base">verified</span>
                      <span>Esperienze Autentiche</span>
                    </div>
                    <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold">
                      La Voce di Chi Ha Camminato con Noi
                    </h2>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#130924] hover:bg-[#1C0F33] rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.2)] text-[#00F0FF] hover:text-white text-[12px] font-semibold uppercase tracking-wider transition-all border border-[#00F0FF]/40 hover:border-[#00F0FF]"
                    href="https://share.google/EkCkev741rafYgxQl"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[#00F0FF] text-base">rate_review</span>
                    <span>Vedi Profilo Google Recensioni</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Review 1 */}
                  <div className="bg-[#130924]/90 backdrop-blur-xl p-7 rounded-2xl shadow-xl flex flex-col gap-4 border border-[#8A2BE2]/40 hover:border-[#FF007F]/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#FF007F]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <span className="text-[11px] text-[#00F0FF] font-mono font-medium">Verificata Google</span>
                    </div>
                    <p className="text-[15px] text-[#F5F0EB] italic leading-relaxed">
                      “Una sensibilità fuori dal comune. Non le solite predizioni vuote, ma una disamina psicologica ed emotiva che mi ha aiutata a prendere una decisione complessa sul lavoro dopo mesi di stallo.”
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full bg-[#1C0F33] flex items-center justify-center font-serif text-[#00F0FF] font-bold border border-[#00F0FF]/30">
                        E
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-[17px] text-white font-semibold">Elena R.</span>
                        <span className="text-[13px] text-[#A69BB5]">Consulto Online (Milano)</span>
                      </div>
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="bg-[#130924]/90 backdrop-blur-xl p-7 rounded-2xl shadow-xl flex flex-col gap-4 border border-[#8A2BE2]/40 hover:border-[#FF007F]/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#FF007F]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <span className="text-[11px] text-[#00F0FF] font-mono font-medium">Verificata Google</span>
                    </div>
                    <p className="text-[15px] text-[#F5F0EB] italic leading-relaxed">
                      “Lo studio di Macerata è un'oasi di pace. Un'ora volata via tra simboli, profumi e una precisione disarmante nell'inquadrare il mio stato interiore. Tornerò sicuramente.”
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full bg-[#1C0F33] flex items-center justify-center font-serif text-[#00F0FF] font-bold border border-[#00F0FF]/30">
                        M
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-[17px] text-white font-semibold">Marco T.</span>
                        <span className="text-[13px] text-[#A69BB5]">In Studio a Macerata</span>
                      </div>
                    </div>
                  </div>

                  {/* Review 3 */}
                  <div className="bg-[#130924]/90 backdrop-blur-xl p-7 rounded-2xl shadow-xl flex flex-col gap-4 border border-[#8A2BE2]/40 hover:border-[#FF007F]/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#FF007F]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <span className="text-[11px] text-[#00F0FF] font-mono font-medium">Verificata Google</span>
                    </div>
                    <p className="text-[15px] text-[#F5F0EB] italic leading-relaxed">
                      “La disponibilità su WhatsApp e la cura con cui ti segue prima e dopo il consulto è impagabile. Tarot Italia è sinonimo di serietà ed etica impeccabile.”
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full bg-[#1C0F33] flex items-center justify-center font-serif text-[#00F0FF] font-bold border border-[#00F0FF]/30">
                        S
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-[17px] text-white font-semibold">Sofia V.</span>
                        <span className="text-[13px] text-[#A69BB5]">Consulto WhatsApp Video</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEZIONE ANTEPRIMA BLOG (3 ARTICOLI) */}
            <section className="w-full bg-[#0C0714] py-20 border-t border-[#8A2BE2]/20">
              <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-10">
                <BrandSectionDivider title="Tarot Italia • Grimorio & Guide Simboliche" />
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="flex flex-col gap-1 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#00F0FF] font-mono uppercase tracking-widest font-semibold">
                      <span className="material-symbols-outlined text-sm">auto_stories</span>
                      <span>Grimorio &amp; Guide Simboliche</span>
                    </div>
                    <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold">
                      Dal Nostro Blog: Sapere Archetipico &amp; Pratiche
                    </h2>
                  </div>
                  <button
                    onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00F0FF] hover:text-[#FF007F] transition-colors self-start md:self-auto cursor-pointer"
                  >
                    <span>Leggi Tutti gli Articoli del Blog</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

                {/* 3 Articles Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BLOG_ARTICLES.map((article) => (
                    <div
                      key={article.id}
                      className="bg-[#130924]/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#8A2BE2]/40 hover:border-[#00F0FF] shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]"
                    >
                      <div className="relative w-full h-44 overflow-hidden bg-[#0C0714]">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#130924] via-transparent to-transparent"></div>
                        <div className="absolute top-3 left-3 bg-[#1C0F33]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[#00F0FF] text-[10px] font-mono font-medium uppercase tracking-widest border border-[#00F0FF]/30">
                          {article.category}
                        </div>
                        <div className="absolute top-3 right-3 bg-[#130924]/90 text-[#FF007F] border border-[#FF007F]/30 px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium">
                          {article.readTime}
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-[10px] text-[#00F0FF] font-mono mb-1.5">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span className="text-white font-medium">{article.author}</span>
                        </div>

                        <h3 className="font-serif text-lg text-white group-hover:text-[#00F0FF] transition-colors mb-2 line-clamp-2 font-bold">
                          {article.title}
                        </h3>

                        <p className="text-xs text-[#A69BB5] leading-relaxed mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>

                        <div className="mt-auto pt-2">
                          <button
                            onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="w-full py-2 bg-[#1C0F33] text-[#00F0FF] group-hover:bg-[#FF007F] group-hover:text-white text-[11px] font-semibold uppercase tracking-wider rounded-xl border border-[#00F0FF]/40 group-hover:border-[#FF007F] group-hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Leggi Articolo</span>
                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SEZIONE ANTEPRIMA SHOP / BOTTEGA OLISTICA */}
            <section className="w-full bg-[#0C0714] py-20 border-t border-[#8A2BE2]/20">
              <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-10">
                <BrandSectionDivider title="Tarot Italia • Bottega Olistica" />
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="flex flex-col gap-1 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#FF007F] font-mono uppercase tracking-widest font-semibold">
                      <span className="material-symbols-outlined text-sm">storefront</span>
                      <span>Bottega Olistica &amp; Strumenti</span>
                    </div>
                    <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold">
                      Oggetti Consacrati per la Tua Pratica
                    </h2>
                    <p className="text-xs sm:text-sm text-[#A69BB5]">
                      Dalla radiestesia del Pendolo PTAH alle erbe raccolte sui Monti Sibillini: strumenti creati con cura artigianale da Teresa e Maura nello studio di Macerata.
                    </p>
                  </div>
                  <button
                    onClick={() => openShopWithCategory('Tutti')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all self-start md:self-auto cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">shopping_bag</span>
                    <span>Visita lo Shop Completo (6 Articoli)</span>
                  </button>
                </div>

                {/* Quick Category Buttons on Home */}
                <div className="flex flex-wrap items-center gap-2 -mt-4 pb-2 border-b border-[#8A2BE2]/20">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A69BB5] mr-1">Esplora per Categoria:</span>
                  {[
                    { label: 'Tutti', icon: 'auto_awesome' },
                    { label: 'Strumenti', icon: 'explore' },
                    { label: 'Erbe', icon: 'eco' },
                    { label: 'Consacrati', icon: 'verified' },
                    { label: 'Rituali', icon: 'local_fire_department' },
                    { label: 'Tarocchi', icon: 'style' }
                  ].map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => openShopWithCategory(cat.label)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#130924] text-[#A69BB5] hover:text-[#00F0FF] hover:bg-[#1C0F33] text-xs uppercase font-medium tracking-wider border border-[#8A2BE2]/40 hover:border-[#00F0FF] hover:shadow-[0_0_12px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs text-[#00F0FF]">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>

                {/* 3 Featured Products */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SHOP_PRODUCTS.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#130924]/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#8A2BE2]/40 hover:border-[#FF007F] shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,0,127,0.25)]"
                    >
                      <div className="relative w-full h-44 overflow-hidden bg-[#0C0714]">
                        <img
                          src={product.image}
                          alt={product.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#130924] via-transparent to-transparent"></div>
                        {product.badge && (
                          <div className="absolute top-3 left-3 bg-[#1C0F33]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[#00F0FF] text-[10px] font-mono font-medium uppercase tracking-widest border border-[#00F0FF]/30">
                            {product.badge}
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex flex-wrap items-center gap-1 mb-2">
                          {product.filterTags?.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => openShopWithCategory(tag)}
                              className="text-[9px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1C0F33] text-[#00F0FF] hover:text-[#FF007F] border border-[#00F0FF]/30 hover:border-[#FF007F] transition-colors cursor-pointer"
                              title={`Filtra bottega per ${tag}`}
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>

                        <h3 className="font-serif text-base text-white group-hover:text-[#FF007F] transition-colors mb-2 font-bold">
                          {product.title}
                        </h3>

                        <p className="text-xs text-[#A69BB5] leading-relaxed mb-4 line-clamp-2">
                          {product.subtitle}
                        </p>

                        <div className="mt-auto pt-3 border-t border-[#8A2BE2]/20 flex items-center justify-between">
                          <span className="font-mono text-lg font-bold text-[#00F0FF]">
                            € {product.price.toFixed(2)}
                          </span>

                          <button
                            onClick={() => openShopWithCategory(product.filterTags?.[0] || 'Tutti')}
                            className="px-3 py-1.5 bg-[#1C0F33] text-white hover:text-[#00F0FF] text-[11px] font-semibold uppercase tracking-wider rounded-xl border border-[#8A2BE2]/40 hover:border-[#00F0FF] hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all cursor-pointer"
                          >
                            Scopri nello Shop
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* BANNER CALL TO ACTION FINALE */}
            <section className="w-full bg-[#0C0714] py-20 border-t border-[#8A2BE2]/20 relative overflow-hidden">
              <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
                <BrandSectionDivider title="Tarot Italia • Inizia il Tuo Percorso" className="mb-10" />
                <div className="relative bg-[#130924]/90 backdrop-blur-xl rounded-2xl p-8 lg:p-16 shadow-[0_0_40px_rgba(138,43,226,0.3)] flex flex-col items-center text-center gap-4 overflow-hidden border border-[#8A2BE2]/50">
                  {/* Occult Aureole Background */}
                  <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF007F]/15 rounded-full blur-[100px] pointer-events-none"></div>

                  <div className="w-16 h-16 rounded-full bg-[#1C0F33] p-2 mb-2 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] border-2 border-[#00F0FF]">
                    <img
                      alt="Tarot Italia Seal"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                      src={IMAGES.avatar}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#00F0FF] uppercase tracking-widest">
                    Inizia il Tuo Viaggio
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-white font-bold max-w-2xl leading-tight">
                    Pronto ad ascoltare cosa hanno da dirti le carte?
                  </h2>
                  <p className="text-[16px] lg:text-[18px] text-[#A69BB5] max-w-xl leading-relaxed">
                    Prenota ora via WhatsApp o attraverso il calendario online per riservare la tua ora di ascolto intuitivo e chiarezza profonda.
                  </p>

                  {/* Direct Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3 z-10">
                    <a
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-[12px] font-bold uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(255,0,127,0.6)] transition-all duration-300"
                      href="https://wa.me/393791038253"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-lg leading-none">chat</span>
                      <span>Contatta su WhatsApp (+39 379 1038253)</span>
                    </a>
                    <a
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C0F33] hover:bg-[#130924] text-[#00F0FF] hover:text-white text-[12px] font-semibold uppercase tracking-wider rounded-xl hover:border-[#00F0FF] transition-all border border-[#00F0FF]/40"
                      href="https://t.me/Tarotitalia"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-base leading-none">send</span>
                      <span>Canale Telegram</span>
                    </a>
                  </div>

                  {/* Security & Legal Notice */}
                  <div className="pt-2 flex items-center gap-2 text-[#A69BB5] text-[11px] font-mono uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm text-[#00F0FF]">lock</span>
                    <span>Riservatezza Garantita • Ai sensi della Legge 4/2013</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#0C0714] border-t border-[#8A2BE2]/30 pt-16 pb-12 text-[#A69BB5]">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-[#00F0FF]/40 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                  src={IMAGES.avatar}
                />
                <span className="font-serif text-lg uppercase tracking-wider font-bold bg-gradient-to-r from-[#FF007F] via-[#C77DFF] to-[#00F0FF] bg-clip-text text-transparent">
                  Tarot Italia
                </span>
              </div>
              <p className="text-[13px] text-[#A69BB5] leading-relaxed">
                Sanctuario olistico di divinazione introspettiva e archetipica. Consulti professionali con Tarocchi di Marsiglia e Rider Waite Smith condotti dal 2012 con etica, riservatezza e profondità d'animo.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#00F0FF] bg-[#1C0F33] px-2.5 py-1 rounded-lg border border-[#00F0FF]/30">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  Operatore Olistico L. 4/2013
                </span>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                Studio Macerata &amp; Orari
              </span>
              <p className="text-[13px] text-[#A69BB5]">
                Via delle Fonti, Centro Storico<br />
                62100 Macerata (MC), Italia
              </p>
              <div className="text-[13px] text-[#A69BB5]/90 flex flex-col gap-1">
                <p>Lunedì — Venerdì: <strong className="text-white">09:30 – 19:30</strong></p>
                <p>Sabato (Solo su Prenotazione): <strong className="text-white">10:00 – 16:00</strong></p>
                <p>Domenica: <span className="text-[#00F0FF] font-mono">Sessioni Intensive</span></p>
              </div>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                Contatto Diretto
              </span>
              <p className="text-[13px] text-[#A69BB5]">
                Prenotazioni rapide e orientamento conoscitivo:
              </p>
              <div className="flex flex-col gap-2 text-[13px]">
                <a
                  className="inline-flex items-center gap-2 text-[#F5F0EB] hover:text-[#00F0FF] transition-colors"
                  href="https://wa.me/393791038253"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-base text-[#00F0FF]">chat</span>
                  WhatsApp: +39 379 1038253
                </a>
                <a
                  className="inline-flex items-center gap-2 text-[#F5F0EB] hover:text-[#00F0FF] transition-colors"
                  href="https://t.me/Tarotitalia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-base text-[#00F0FF]">send</span>
                  Telegram: @Tarotitalia
                </a>
                <a
                  className="inline-flex items-center gap-2 text-[#F5F0EB] hover:text-[#00F0FF] transition-colors"
                  href="mailto:info@tarotitalia.it"
                >
                  <span className="material-symbols-outlined text-base text-[#00F0FF]">mail</span>
                  info@tarotitalia.it
                </a>
              </div>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                Esplora &amp; Note Legali
              </span>
              <div className="flex flex-col gap-2 text-[11px] font-medium uppercase tracking-wider">
                <button
                  onClick={() => { setActiveTab('chi-siamo'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-left text-[#FF007F] hover:text-[#00F0FF] transition-colors cursor-pointer font-semibold"
                >
                  Chi Siamo / Teresa &amp; Maura
                </button>
                <button
                  onClick={() => openBookingFor('Lettura On Line 1h')}
                  className="text-left text-[#A69BB5] hover:text-[#00F0FF] transition-colors cursor-pointer"
                >
                  Consulti Tarocchi Online
                </button>
                <button
                  onClick={() => openBookingFor('Lettura Dal Vivo (Macerata)')}
                  className="text-left text-[#A69BB5] hover:text-[#00F0FF] transition-colors cursor-pointer"
                >
                  Sedute dal Vivo in Studio
                </button>
                <button
                  onClick={() => { setActiveTab('arcani'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-left text-[#A69BB5] hover:text-[#00F0FF] transition-colors cursor-pointer"
                >
                  Significato 22 Arcani Maggiori
                </button>
                <button
                  onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-left text-[#A69BB5] hover:text-[#00F0FF] transition-colors cursor-pointer"
                >
                  Blog &amp; Articoli Simbolici
                </button>
                <button
                  onClick={() => { setActiveTab('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-left text-[#A69BB5] hover:text-[#00F0FF] transition-colors cursor-pointer"
                >
                  Bottega Olistica &amp; Strumenti
                </button>
                <button
                  onClick={() => setIsLegalModalOpen('privacy')}
                  className="text-left text-[#A69BB5] hover:text-[#00F0FF] transition-colors cursor-pointer"
                >
                  Privacy Policy &amp; Cookie
                </button>
                <button
                  onClick={() => setIsCookieCustomizerOpen(true)}
                  className="text-left text-[#A69BB5] hover:text-[#00F0FF] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-xs text-[#00F0FF]">cookie</span>
                  Gestisci Preferenze Cookie
                </button>
                <button
                  onClick={() => setIsLegalModalOpen('disclaimer')}
                  className="text-left text-[#A69BB5] hover:text-[#00F0FF] transition-colors cursor-pointer"
                >
                  Disclaimer Olistico Legale
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#8A2BE2]/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-[13px] text-[#A69BB5]/70">
              © 2012–2025 Tarot Italia di Studio Olistico Macerata. P.IVA 02136780430. Professione disciplinata ai sensi della Legge 14 gennaio 2013, n. 4.
            </p>
            <div className="flex flex-col md:items-end gap-1">
              <span className="text-[11px] font-mono font-semibold text-[#FF007F] uppercase tracking-widest flex items-center justify-center md:justify-end gap-1">
                <span className="material-symbols-outlined text-xs">explicit</span>
                <span>Servizi riservati esclusivamente a un pubblico maggiorenne (+18)</span>
              </span>
              <p className="text-[11px] font-mono font-medium text-[#A69BB5]/50 uppercase tracking-widest">
                I consulti non sostituiscono pareri medici o psicologici.
              </p>
            </div>
          </div>

          {/* WIDGET DISCLAIMER LEGALE */}
          <div className="mt-8 bg-[#130924]/80 border border-[#8A2BE2]/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-[0_0_25px_rgba(138,43,226,0.15)] text-[#A69BB5]">
            {/* Header Widget */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#8A2BE2]/20">
              <div className="flex items-center gap-3">
                <img
                  alt="Tarot Italia Logo"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                  src={IMAGES.avatar}
                />
                <div>
                  <h4 className="font-serif text-lg font-bold uppercase tracking-wider text-white">
                    Tarot Italia <span className="text-[12px] font-mono text-[#00F0FF] lowercase tracking-normal font-normal">/ Ricerca e lettura dei tarocchi</span>
                  </h4>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#FF007F]">
                    Disclaimer &amp; Note Informative Legali
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                <span className="material-symbols-outlined text-sm">gavel</span>
                Informativa &amp; Liberatoria
              </span>
            </div>

            {/* Contenuto Disclaimer */}
            <div className="mt-6 space-y-4 text-[12px] leading-relaxed text-[#A69BB5]/90 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-[#0C0714] border border-[#8A2BE2]/20 p-4 rounded-xl">
                <h5 className="font-mono text-[12px] font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#FF007F] text-base">warning</span>
                  Disclaimer — INFORMATIVA E LIBERATORIA PER ESCLUSIONE DA RESPONSABILITÀ
                </h5>
                <p className="mb-2">
                  I corsi, i servizi e i trattamenti offerti da Maria Teresa Rogani, e da chiunque operi per suo conto, la cui lista è disponibile presso la sede del Titolare, sono pratiche senza alcuna valenza scientifica e gli operatori e le operatrici che le svolgono non sono né medici, né psichiatri, né psicologi o psicoterapeuti, non possono quindi fornire diagnosi, prescrivere o somministrare farmaci, né formulare terapie.
                </p>
                <p className="mb-2">
                  Le persone che decidono di usufruire di questi servizi lo fanno in piena coscienza, libertà e responsabilità. In nessun caso le suddette pratiche possono essere considerate una terapia, né tantomeno è consigliato sospendere o ridurre le terapie mediche in corso. Le suddette pratiche non costituiscono formalmente una cura fisica, pertanto non è garantito alcun risultato specifico.
                </p>
                <p>
                  Consultare sempre un medico abilitato per prendersi cura del proprio stato fisico e/o psichico. Ogni individuo è responsabile per sé stesso e per le proprie cure mediche, psicologiche o psichiatriche. Chi prende visione di tali informazioni e le sottoscrive rinuncia ad ogni tipo di azione legale nei confronti di Maria Teresa Rogani, o di chiunque operi per suo conto, la cui lista è disponibile presso la sede del Titolare, e libera tutti i soggetti indicati in questo documento da ogni e qualsivoglia responsabilità.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h5 className="font-mono text-[12px] font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00F0FF] text-base">verified_user</span>
                  L’OPERATORE OLISTICO
                </h5>

                <div>
                  <h6 className="font-semibold text-white mb-1">1) Inquadramento ed esenzione responsabilità</h6>
                  <p className="mb-2">
                    L’operatore olistico non si pone come sostituto della medicina classica occidentale, ma come strumento complementare. Si occupa di preservare il benessere dell’individuo a 360°, aiutandolo ad integrarsi nei cicli naturali della vita, ristabilendo gli equilibri del benessere.
                  </p>
                  <p className="mb-2">
                    Non formula diagnosi, non rilascia ricette e non interferisce con le prescrizioni di farmaci e rimedi dati o suggeriti dai medici. Fornisce consigli su come utilizzare nel migliore dei modi i rimedi naturali ritenuti più idonei per il miglioramento del proprio benessere psico-fisico e energetico.
                  </p>
                  <p className="mb-2">
                    Questo sito non intende offrire consigli medici e le informazioni qui contenute non possono sostituirsi ad un consulto personalizzato effettuato da un medico. Il cliente dovrebbe consultare un medico a proposito della propria salute, soprattutto riguardo a sintomi che possano richiedere diagnosi e/o trattamento.
                  </p>
                  <p className="mb-2">
                    L’ operatore olistico può supportare chi si rivolge a lui, nella scelta del metodo di cura naturale più indicato al suo problema. L’operatore olistico non si assume alcuna responsabilità per qualsiasi conseguenza che possa derivare da qualsiasi trattamento, procedura, azione, modifica dello stato di salute o applicazione di qualsiasi metodo da parte di qualsiasi persona che legga o segua le informazioni contenute su questo sito.
                  </p>
                  <p className="mb-2">
                    Non si può garantire che le informazioni e i consigli qui contenuti siano adatti o sicuri per ogni persona. Ogni sforzo è stato fatto per garantire che le informazioni qui contenute siano il più complete ed accurate possibile, oltre che aggiornate. Ma queste informazioni dovrebbero essere usate soltanto come guida, e non come la fonte definitiva di informazioni sui disturbi e disagi a cui qui si fa cenno.
                  </p>
                  <p>
                    Per tutti questi motivi si declina ogni responsabilità per qualsiasi conseguenza, danno o perdita che possano essere causate dal contenuto di questo sito e dagli articoli in esso pubblicati.
                  </p>
                </div>

                <div>
                  <h6 className="font-semibold text-white mb-1">2) Quadro normativo regionale e disciplina</h6>
                  <p className="mb-2">
                    Ad oggi le discipline Olistiche dette anche Bio-Naturali non hanno ottenuto una normativa a livello nazionale. In attesa di una regolamentazione “ufficiale” alcune regioni come la Lombardia, Toscana, Liguria, Emilia Romagna, hanno stabilito leggi regionali che permettono alla medicina Olistica di affiancarsi a quella tradizionale. Viene riportata di seguito la LEGGE REGIONALE 1 febbraio 2005, N. 2 “Norme in materia di discipline bio-naturali”. (BURL n. 5, 1º suppl. ord. del 04 Febbraio 2005) urn:nir:regione.lombardia:legge:2005-02-01;2
                  </p>
                  <p>
                    Tali pratiche, che non hanno carattere di prestazioni sanitarie, tendono a stimolare le risorse vitali dell’individuo attraverso metodi ed elementi naturali la cui efficacia sia stata verificata nei contesti culturali e geografici in cui le discipline sono sorte e si sono sviluppate.
                  </p>
                </div>

                <div>
                  <h6 className="font-semibold text-white mb-1">3) Limiti di intervento ed esercizio professionale (Legge 4/2013)</h6>
                  <p className="mb-2">
                    Le informazioni contenute in essi non sono a carattere medico e non vogliono in alcun modo sostituirsi a qualunque consulenza o prescrizione medica. Questo sito fornisce informazioni su argomenti riguardanti il benessere inteso in senso olistico.
                  </p>
                  <p className="mb-2">
                    L’approccio olistico non si pone in contrapposizione, né in alcun modo intende sostituire la medicina tradizionale. Pertanto, è sempre richiesto di utilizzare con intelligenza e buon senso tutte le informazioni presenti su questo sito. Le informazioni contenute in questo sito non costituiscono pareri di tipo professionale, medico o giuridico e non possono in nessun caso essere utilizzate per la cura di patologie o disturbi di qualsivoglia natura.
                  </p>
                  <p className="mb-2">
                    Per qualsiasi decisione o informazione riguardante lo stato di salute è necessario che la persona si rivolga al proprio medico curante o ad un’altra figura professionale autorizzata. Se credi di essere in una condizione che richiede cure mediche, psicologiche, ecc., per favore rivolgiti subito alla figura professionale di riferimento.
                  </p>
                  <p className="mb-2">
                    Nessun professionista olistico può dunque sovrapporsi alle figure medico/psicologiche o ricoprirne le vesti. L’Operatore Olistico, l’Operatore del Benessere e l’Operatore Energetico possono intervenire esclusivamente per aiutare il soggetto in questione a riequilibrare il proprio sistema energetico, ma non possono in nessun caso fare diagnosi, prescrivere e/o somministrare farmaci, sostituire un medico o qualunque altra figura professionale preposta.
                  </p>
                  <p>
                    In Italia, la professione dell’operatore olistico è regolamentata dalla legge 4/2013. I trattamenti olistici sono trattamenti di riequilibrio energetico volti al recupero ed al mantenimento del benessere e della vitalità della persona.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#130924] border border-[#8A2BE2]/50 rounded-2xl max-w-lg w-full p-5 sm:p-6 lg:p-8 relative shadow-[0_0_40px_rgba(138,43,226,0.35)] max-h-[90vh] overflow-y-auto">
            {/* Header del widget con titolo e pulsante Chiudi Widget chiaro */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#8A2BE2]/30 sticky top-0 bg-[#130924]/95 backdrop-blur-md pt-1 z-20">
              <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-[11px] uppercase tracking-widest font-semibold">
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                <span>Widget Prenotazioni</span>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C0F33] hover:bg-[#FF007F]/20 text-[#00F0FF] hover:text-[#FF007F] border border-[#00F0FF]/40 hover:border-[#FF007F] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                aria-label="Chiudi widget"
              >
                <span className="material-symbols-outlined text-base">close</span>
                <span>Chiudi Widget</span>
              </button>
            </div>

            {!bookingSubmitted ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl text-white font-bold">
                  Riserva la Tua Ora di Introspezione
                </h3>
                <p className="text-xs text-[#A69BB5]">
                  Compila i dettagli preferiti. Il messaggio verrà preparato su WhatsApp con priorità di agenda.
                </p>

                {/* Service Selection */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#00F0FF] font-semibold mb-1">
                    Tipologia di Consulto
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#0C0714] border border-[#8A2BE2]/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]/50"
                  >
                    <option value="Lettura On Line 1h">Lettura On Line 1h (Video / WhatsApp)</option>
                    <option value="Lettura Dal Vivo (Macerata)">Lettura Dal Vivo in Studio a Macerata (1h)</option>
                    <option value="Ritualistica & Armonie">Ritualistica &amp; Armonie (Percorso Energetico)</option>
                    <option value="Approfondimento Simbolico Arcani">Approfondimento Simbolico Arcani</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#00F0FF] font-semibold mb-1">
                    Il Tuo Nome
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Es. Maria Teresa"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full bg-[#0C0714] border border-[#8A2BE2]/50 rounded-xl px-3 py-2 text-sm text-white placeholder:text-[#A69BB5]/50 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]/50"
                  />
                </div>

                {/* Modalità Canale */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#00F0FF] font-semibold mb-1">
                    Modalità Preferita
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['WhatsApp', 'Videochiamata', 'In Studio (Macerata)'] as const).map((channel) => (
                      <button
                        type="button"
                        key={channel}
                        onClick={() => setBookingChannel(channel)}
                        className={`py-2 px-2 text-center text-xs rounded-xl border transition-all ${
                          bookingChannel === channel
                            ? 'bg-[#1C0F33] border-[#00F0FF] text-[#00F0FF] font-semibold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                            : 'bg-[#0C0714] border-[#8A2BE2]/30 text-[#A69BB5] hover:border-[#00F0FF]/50 hover:text-white'
                        }`}
                      >
                        {channel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time slot */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#00F0FF] font-semibold mb-1">
                      Data Desiderata
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-[#0C0714] border border-[#8A2BE2]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#00F0FF] font-semibold mb-1">
                      Fascia Oraria
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-[#0C0714] border border-[#8A2BE2]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                    >
                      <option value="10:00">10:00 Mattina</option>
                      <option value="11:30">11:30 Mattina</option>
                      <option value="15:00">15:00 Pomeriggio</option>
                      <option value="16:30">16:30 Pomeriggio</option>
                      <option value="18:00">18:00 Tardo Pomeriggio</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#00F0FF] font-semibold mb-1">
                    Quesito o Intenzione (Opzionale)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Descrivi brevemente su quale area della vita desideri fare luce..."
                    value={bookingNote}
                    onChange={(e) => setBookingNote(e.target.value)}
                    className="w-full bg-[#0C0714] border border-[#8A2BE2]/50 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#A69BB5]/50 focus:outline-none focus:border-[#00F0FF]"
                  ></textarea>
                </div>

                <div className="pt-3 border-t border-[#8A2BE2]/30 space-y-3">
                  {/* Richiamo formale Privacy e Cookie */}
                  <div className="p-3 bg-[#1C0F33]/80 rounded-xl border border-[#00F0FF]/30 text-[11px] text-[#A69BB5] leading-relaxed space-y-1">
                    <div className="flex items-center gap-1.5 text-[#00F0FF] font-mono font-semibold text-[10px] uppercase tracking-wider">
                      <span className="material-symbols-outlined text-xs">shield_lock</span>
                      <span>Informativa Privacy &amp; Cookie (GDPR UE 2016/679)</span>
                    </div>
                    <p>
                      Inviando i tuoi dati accetti il trattamento per la gestione del consulto ai sensi della nostra{' '}
                      <button
                        type="button"
                        onClick={() => setIsLegalModalOpen('privacy')}
                        className="text-[#00F0FF] font-semibold underline hover:text-white cursor-pointer"
                      >
                        Privacy Policy
                      </button>{' '}
                      e della nostra informativa estesa sui{' '}
                      <button
                        type="button"
                        onClick={() => setIsCookieCustomizerOpen(true)}
                        className="text-[#00F0FF] font-semibold underline hover:text-white cursor-pointer"
                      >
                        Cookie
                      </button>. Riservatezza garantita.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">send</span>
                    <span>Conferma e Apri su WhatsApp (+39 379 1038253)</span>
                  </button>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <p className="text-[10px] text-[#A69BB5]/70">
                      Nessun pagamento anticipato richiesto.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsBookingOpen(false)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#1C0F33] text-[#00F0FF] hover:text-white text-[10px] font-semibold uppercase tracking-wider rounded-lg border border-[#00F0FF]/30 hover:border-[#00F0FF] transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                      <span>Chiudi Widget</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#1C0F33] text-[#00F0FF] flex items-center justify-center mx-auto border-2 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <span className="material-symbols-outlined text-3xl">done</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-bold">
                  Richiesta Inoltrata con Successo
                </h3>
                <p className="text-sm text-[#A69BB5] max-w-sm mx-auto leading-relaxed">
                  Grazie {bookingName || 'gentile ospite'}, ti stiamo reindirizzando su WhatsApp con il riepilogo della seduta per confermare data e orario con lo studio.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    className="px-6 py-2 bg-[#1C0F33] text-white hover:text-[#00F0FF] text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#8A2BE2]/40 hover:border-[#00F0FF] transition-all"
                  >
                    Chiudi Finestra
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEGAL & PRIVACY MODAL */}
      {isLegalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#130924] border border-[#8A2BE2]/50 rounded-2xl max-w-lg w-full p-6 lg:p-8 relative shadow-[0_0_40px_rgba(138,43,226,0.35)] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsLegalModalOpen(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-[#1C0F33] border border-[#00F0FF]/60 text-white hover:text-[#00F0FF] hover:border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.3)] flex items-center justify-center transition-all cursor-pointer z-10"
              aria-label="Chiudi finestra"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
            </button>

            {isLegalModalOpen === 'privacy' ? (
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-semibold text-[#00F0FF] uppercase tracking-widest">
                  Informativa Legale
                </span>
                <h3 className="font-serif text-2xl text-white font-bold">
                  Privacy Policy &amp; Trattamento Dati
                </h3>
                <div className="text-xs text-[#A69BB5] space-y-3 leading-relaxed">
                  <p>
                    Ai sensi dell’art. 13 del Regolamento UE 2016/679 (GDPR), Tarot Italia garantisce che i dati personali trasmessi volontariamente (nome, recapito telefonico, indirizzo email o messaggi preliminari) sono trattati esclusivamente per la gestione delle richieste di consulto o appuntamento.
                  </p>
                  <p>
                    I dati non vengono in alcun caso ceduti a terzi né utilizzati per comunicazioni pubblicitarie non sollecitate. La consultazione è coperta da segreto e riservatezza etica assoluta.
                  </p>
                  <p>
                    Il titolare del trattamento è lo Studio Olistico Macerata, P.IVA 02136780430. Per qualsiasi richiesta di rettifica o cancellazione, è sufficiente scrivere a <code>info@tarotitalia.it</code>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-semibold text-[#00F0FF] uppercase tracking-widest">
                  Deontologia Professionale
                </span>
                <h3 className="font-serif text-2xl text-white font-bold">
                  Disclaimer Olistico Legale
                </h3>
                <div className="text-xs text-[#A69BB5] space-y-3 leading-relaxed">
                  <p>
                    I consulti di lettura dei Tarocchi e i percorsi olistici proposti da Tarot Italia sono attività di relazione d’aiuto, orientamento personale ed esplorazione introspettiva disciplinate dalla <strong>Legge 14 gennaio 2013, n. 4</strong> (Disposizioni in materia di professioni non organizzate in ordini o collegi).
                  </p>
                  <p>
                    I consulti <strong>non costituiscono</strong>, non intendono sostituire e non devono in alcun modo essere interpretati come pareri medici, psicoterapeutici, psichiatrici, legali o finanziari. L’operatore non effettua diagnosi cliniche né prescrizioni terapeutiche.
                  </p>
                  <p>
                    Ogni consultante mantiene la piena e insindacabile responsabilità etica, morale e materiale delle proprie scelte e azioni.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-[#8A2BE2]/30 mt-4">
              <button
                onClick={() => setIsLegalModalOpen(null)}
                className="w-full py-2.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(255,0,127,0.4)] transition-all cursor-pointer"
              >
                Ho Letto e Compreso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COOKIE CONSENT BANNER (Sticky Bottom-Left) */}
      {!cookieConsent && !isCookieCustomizerOpen && (
        <aside
          role="dialog"
          aria-live="polite"
          aria-label="Informativa Cookie"
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-40 bg-[#130924]/95 backdrop-blur-xl p-5 rounded-2xl border border-[#8A2BE2]/50 shadow-[0_12px_40px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1C0F33] flex-shrink-0 flex items-center justify-center text-[#00F0FF] border border-[#00F0FF]/30">
              <span className="material-symbols-outlined text-xl">cookie</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold text-[#00F0FF] uppercase tracking-widest">
                  Trasparenza &amp; Cookie
                </span>
                <span className="text-[10px] text-[#A69BB5] font-mono">GDPR / ePrivacy</span>
              </div>
              <h4 className="font-serif text-[15px] font-bold text-white mt-0.5 mb-1.5">
                Rispettiamo la tua riservatezza
              </h4>
              <p className="text-[12px] text-[#A69BB5] leading-relaxed mb-3">
                Utilizziamo cookie tecnici essenziali per garantire la corretta navigazione e funzionalità dello studio. Puoi scegliere liberamente se acconsentire a metriche anonime o personalizzare le tue preferenze.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleAcceptAllCookies}
                  className="px-3.5 py-1.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(255,0,127,0.4)] transition-all cursor-pointer"
                >
                  Accetta Tutti
                </button>
                <button
                  type="button"
                  onClick={handleDeclineCookies}
                  className="px-3 py-1.5 bg-[#1C0F33] hover:bg-[#130924] text-white hover:text-[#00F0FF] text-[11px] font-medium uppercase tracking-wider rounded-xl border border-[#8A2BE2]/40 hover:border-[#00F0FF] transition-all cursor-pointer"
                >
                  Solo Necessari
                </button>
                <button
                  type="button"
                  onClick={() => setIsCookieCustomizerOpen(true)}
                  className="px-2 py-1.5 text-[11px] text-[#00F0FF] hover:text-[#FF007F] underline underline-offset-2 transition-colors cursor-pointer font-mono"
                >
                  Personalizza
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* COOKIE CUSTOMIZER MODAL */}
      {isCookieCustomizerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#130924] border border-[#8A2BE2]/50 rounded-2xl max-w-lg w-full p-6 lg:p-8 relative shadow-[0_0_40px_rgba(138,43,226,0.35)] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsCookieCustomizerOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-[#1C0F33] border border-[#00F0FF]/60 text-white hover:text-[#00F0FF] hover:border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.3)] flex items-center justify-center transition-all cursor-pointer z-10"
              aria-label="Chiudi gestione cookie"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
            </button>

            <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-[11px] font-semibold uppercase tracking-widest mb-1">
              <span className="material-symbols-outlined text-base">tune</span>
              <span>Centro Preferenze Riservatezza</span>
            </div>
            <h3 className="font-serif text-2xl text-white font-bold mb-2">
              Configura i Tuoi Cookie
            </h3>
            <p className="text-xs text-[#A69BB5] leading-relaxed mb-6">
              Di seguito puoi abilitare o disabilitare le diverse tipologie di cookie impiegate sul sito. I cookie necessari non possono essere disattivati in quanto fondamentali per l’accesso alle sessioni e ai moduli di prenotazione.
            </p>

            <div className="space-y-4">
              {/* Necessari */}
              <div className="p-4 bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif text-sm font-semibold text-white">Cookie Tecnici Necessari</span>
                    <span className="px-2 py-0.5 text-[9px] uppercase font-mono font-semibold bg-[#130924] text-[#00F0FF] border border-[#00F0FF]/30 rounded">
                      Sempre Attivi
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A69BB5] leading-relaxed">
                    Indispensabili per navigare nel sito, memorizzare le preferenze dell’utente ed eseguire in sicurezza l’inoltro delle prenotazioni verso WhatsApp.
                  </p>
                </div>
                <div className="pt-1">
                  <span className="material-symbols-outlined text-[#00F0FF] text-xl">check_box</span>
                </div>
              </div>

              {/* Analitici anonimi */}
              <div className="p-4 bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif text-sm font-semibold text-white">Misurazione &amp; Statistiche Anonime</span>
                  </div>
                  <p className="text-[11px] text-[#A69BB5] leading-relaxed">
                    Consentono di aggregare metriche anonimizzate sull’affluenza alle guide degli arcani e alle pagine dei servizi per migliorare l’esperienza d’uso.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytical}
                    onChange={(e) =>
                      setCookiePreferences({ ...cookiePreferences, analytical: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-[#0C0714] border border-[#8A2BE2]/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF007F] peer-checked:border-[#FF007F]"></div>
                </label>
              </div>

              {/* Preferenze */}
              <div className="p-4 bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/30 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif text-sm font-semibold text-white">Preferenze e Funzioni Avanzate</span>
                  </div>
                  <p className="text-[11px] text-[#A69BB5] leading-relaxed">
                    Permettono al sito di ricordare la modalità di consulto preferita e il percorso di lettura prescelto.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.preferences}
                    onChange={(e) =>
                      setCookiePreferences({ ...cookiePreferences, preferences: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-[#0C0714] border border-[#8A2BE2]/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF007F] peer-checked:border-[#FF007F]"></div>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#8A2BE2]/30 mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDeclineCookies}
                className="px-4 py-2 bg-[#1C0F33] hover:bg-[#130924] text-white hover:text-[#00F0FF] text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#8A2BE2]/40 hover:border-[#00F0FF] transition-colors"
              >
                Rifiuta Opzionali
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAllCookies}
                  className="px-4 py-2 bg-[#1C0F33] text-[#00F0FF] hover:bg-[#130924] text-xs font-semibold uppercase tracking-wider rounded-xl hover:border-[#00F0FF] transition-colors border border-[#00F0FF]/40"
                >
                  Accetta Tutti
                </button>
                <button
                  type="button"
                  onClick={handleSaveCookiePreferences}
                  className="px-5 py-2 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(255,0,127,0.4)] transition-all"
                >
                  Salva Scelte
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING BADGE TO RE-OPEN COOKIE SETTINGS (Discreet at bottom right) */}
      {cookieConsent && (
        <button
          onClick={() => setIsCookieCustomizerOpen(true)}
          className="fixed bottom-4 right-4 z-40 bg-[#130924]/90 hover:bg-[#1C0F33] text-[#00F0FF] hover:text-[#FF007F] p-2.5 rounded-full border border-[#00F0FF]/40 hover:border-[#FF007F] shadow-[0_0_15px_rgba(0,240,255,0.3)] backdrop-blur-md transition-all duration-300 group flex items-center gap-2 cursor-pointer"
          title="Gestisci preferenze cookie"
          aria-label="Gestisci preferenze cookie"
        >
          <span className="material-symbols-outlined text-lg leading-none text-[#00F0FF] group-hover:text-[#FF007F] transition-colors">cookie</span>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-white">
            Cookie
          </span>
        </button>
      )}
    </div>
  );
}
