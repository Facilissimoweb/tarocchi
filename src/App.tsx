import React, { useState } from 'react';

// Image assets directly linked from reference HTML
const IMAGES = {
  avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1VszJaV0U802Nkof9__gEgoylN3d9vK75TWuo8bBxHaDn0gwyFs4HkF083y8s_78aReiksXnPuJjmYyPMxn5jTWFPBmJMUpEVZVRt5T5OzKn_CMhDQ12pZCMCwVbP1q6MYqlrCZIy5McdOcU3Cn2YwZ50XYU-6GrGI4p-NsflCGIwMJefPMUNmhlf4KC4yFiZu4JbfrqPkFs35kBQTe_i-ujUy7jLo4RVhy_1gr0yqRplWULLf7dwwL2w',
  hero: 'https://lh3.googleusercontent.com/aida/AEtjO1UJLHzf7EsxDSdjN0Cx4QHtbImuNA7R7ImYCHjKwPKB9a_d4oSwXKcaT3gJvWyoFnlRCeMgkeJWw2ZF7Jb5_n2tYmcoXVLG1cKel_gWs60iy1frH26ok8fMvsD407eaG7PAC5wpwgjskU2yF9IJ5KPNbuRH_kAa3KZb45q8cYzGe_PJVF9wlFaFWeFwkquMhGOXOFTTp3wIcOIViuBxb8GhzK-OMN55GnXkpxROA2kHzOOaqG_WglsMPQ',
  serviceOnline: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoknsKwjQ5gMWL8eK1ObY_9BQ6Jk8KDgcWG1yZ87X3TLEMJfQjLDTzppcdq--GQPBLXre1C4PRFdqJ4MieRdx62up4qDZ07nPM5JI1Cyv1dSYzNqelbWZH01kAfItV_gDzSDbc8zjhdLU2ORvdUwFUimclSNQ6Ji0R7DRoQKIW2hanc9UUlFTeoatyi4ioQlXZjei6RL3trMkqD0EsLcaA-ztGTynT18R_-xNqJwTwstfvDx4rLbDU',
  serviceStudio: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVI-E6mN8LzTkqaK2AlHhHt6J_m2ejErCGubg7rHJrgDEmvJqKqO85sxaWmczjg7E3WgCpY6zNmQgnuHqamyxdHVSurJFn1BoLM_I8PbnCmhlfCOwFMDoXRq4yQ91nikMqRSKVi1G7Os3bG8313n7aJDSi26Fh7yIRmENKSGdbZdAlYeUEw9khRjyfug6EeoTgBf6n9fc1lhGg2XKrKrm9CfFr3CXslAiN-TC2OBWtRVpwfWvO4wLx',
  serviceRitual: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQLOvwNy2W1qr7QRcKwUiWmnyVUFEoxNlt7DLfpGOCLYir-kvrtFwJNOgbzipwez5LeGNDF4wvoGX4oi0egnh8X2WaYOumhq_ODEQ1MYeJZUStryhrvnhHoLMfPRQnqXdN4jJjx8nuM1AyGl64qU-D6TyW8NEI6-8W7c3mCEl_vdfGf9L2RpMQIkc_ZUDnxv29z29bAKEWfGQFsvkKiNh9yKhSAQVy1bhBjrAFO-WfPKlDD_OiRS7N',
};

// 22 Major Arcana Reference Data for the Guide Modal / Section
const MAJOR_ARCANA = [
  { num: '0', name: 'Il Matto', meaning: 'Inizio assoluto, slancio puro, libertà dal dogma e fiducia nel flusso vitale.', advice: 'Abbraccia l’ignoto con mente aperta e cuore leggero.' },
  { num: 'I', name: 'Il Bagatto', meaning: 'Volontà conscia, talento in potenza, padronanza degli strumenti del quotidiano.', advice: 'Tutto ciò di cui hai bisogno è già sul tuo tavolo: agisci.' },
  { num: 'II', name: 'La Papessa', meaning: 'Intuizione profonda, conoscenza silente, gestazione interiore e ascolto sottile.', advice: 'Non forzare i tempi; ascolta ciò che il silenzio ti sussurra.' },
  { num: 'III', name: 'L’Imperatrice', meaning: 'Fertilità creativa, abbondanza, espressione viva delle emozioni e bellezza.', advice: 'Dai forma tangibile alle tue idee con grazia e generosità.' },
  { num: 'IV', name: 'L’Imperatore', meaning: 'Struttura solida, stabilità, sovranità interiore e confini sani.', advice: 'Costruisci con metodo e proteggi la tua visione.' },
  { num: 'V', name: 'Il Papa', meaning: 'Guida spirituale, etica, trasmissione del sapere e conciliazione degli opposti.', advice: 'Cerca il significato profondo oltre la consuetudine.' },
  { num: 'VI', name: 'Gli Amanti', meaning: 'Scelta del cuore, discernimento etico, allineamento fra desiderio e valori.', advice: 'Scegli ciò che risuona sinceramente con la tua anima.' },
  { num: 'VII', name: 'Il Carro', meaning: 'Direzione chiara, vittoria sulle polarità interne, maestria del movimento.', advice: 'Focalizza le energie e guida le redini delle tue passioni.' },
  { num: 'VIII', name: 'La Giustizia', meaning: 'Equilibrio karmico, verità disarmante, causa ed effetto, lucidità intellettiva.', advice: 'Pesa con onestà ogni azione senza illusioni.' },
  { num: 'IX', name: 'L’Eremita', meaning: 'Ricerca solitaria, saggezza interiore, luce sobria che illumina un passo alla volta.', advice: 'Rallenta; le risposte più limpide nascono nel raccoglimento.' },
  { num: 'X', name: 'La Ruota della Fortuna', meaning: 'Ciclicità temporale, svolta evolutiva, mutamento inevitabile e opportunità.', advice: 'Accetta il cambiamento come ponte verso una nuova fase.' },
  { num: 'XI', name: 'La Forza', meaning: 'Gentilezza invincibile, dominio amorevole delle pulsioni istintive, coraggio sereno.', advice: 'Vinci con la pazienza e la compassione, mai con la violenza.' },
  { num: 'XII', name: 'L’Appeso', meaning: 'Cambio radicale di prospettiva, sosta feconda, resa consapevole e trascendenza.', advice: 'Guarda le cose a testa in giù: il blocco è solo una trasformazione.' },
  { num: 'XIII', name: 'La Morte (L’Arcano Senza Nome)', meaning: 'Rinnovamento radicale, fine naturale di un ciclo, distillazione dell’essenziale.', advice: 'Lascia andare ciò che è compiuto per far fiorire il nuovo.' },
  { num: 'XIV', name: 'La Temperanza', meaning: 'Armonizzazione alchemica, guarigione fluida, moderazione e flusso sereno.', advice: 'Mescola con cura gli elementi della tua vita con calma paziente.' },
  { num: 'XV', name: 'Il Diavolo', meaning: 'Ombre inconsce, desideri viscerali, magnetismo e smascheramento dei legami tossici.', advice: 'Riconosci le tue catene per poterti davvero liberare.' },
  { num: 'XVI', name: 'La Torre', meaning: 'Liberazione repentina dalle false certezze, verità fulminea, crollo dell’ego.', advice: 'Quando crollano le illusioni, rimane il terreno autentico su cui ricostruire.' },
  { num: 'XVII', name: 'La Stella', meaning: 'Speranza radiosa, ispirazione cosmica, donazione sincera e riconnessione alla sorgente.', advice: 'Confida nella tua stella guida e sii trasparente come l’acqua.' },
  { num: 'XVIII', name: 'La Luna', meaning: 'Mondo onirico, archetipi sommersi, intuizioni notturne e attraversamento delle paure.', advice: 'Esplora le acque del subconscio con fiducia nel tuo sentire.' },
  { num: 'XIX', name: 'Il Sole', meaning: 'Chiarezza solare, gioia condivisa, illuminazione, verità e calda vitalità.', advice: 'Splendi senza riserve e celebra i frutti del tuo cammino.' },
  { num: 'XX', name: 'Il Giudizio', meaning: 'Risveglio di coscienza, chiamata vocazionale, rinascita e liberazione del passato.', advice: 'Rispondi alla voce della tua autenticità interiore.' },
  { num: 'XXI', name: 'Il Mondo', meaning: 'Compimento cosmico, integrazione totale, armonia tra microcosmo e macrocosmo.', advice: 'Sei al centro della tua vita: celebra la totalità dell’esperienza.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'servizi' | 'chi-siamo' | 'arcani'>('home');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Lettura On Line 1h');
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<'privacy' | 'disclaimer' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArcano, setSelectedArcano] = useState<number | null>(0);

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
    <div className="bg-[#131317] text-[#e4e1e7] min-h-screen flex flex-col font-sans selection:bg-[#d4af37] selection:text-[#3c2f00]">
      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#16161F]/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
        {/* Top Info Bar - hidden on mobile for clean minimalist presence */}
        <div className="hidden sm:block w-full bg-[#0e0e12] py-1 px-4 lg:px-12 border-b border-[rgba(212,175,55,0.2)]">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between text-[#d0c5af] text-[11px] font-medium uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1B4D3E] animate-pulse"></span>
              <span className="truncate">Studio Olistico a Macerata &amp; Sessioni Online via WhatsApp / Videochiamata | Dal 2012</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="flex items-center gap-1 text-[#f2ca50]">
                <span className="material-symbols-outlined text-sm leading-none">auto_awesome</span>
                Disponibilità Odierna Attiva
              </span>
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="h-14 sm:h-16 lg:h-20 max-w-[1240px] mx-auto px-3 sm:px-4 lg:px-12 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Wordmark & Seal */}
          <button
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer focus:outline-none min-w-0"
          >
            <div className="relative flex items-center justify-center p-0.5 rounded-full border border-[rgba(212,175,55,0.3)] group-hover:border-[#f2ca50] transition-all duration-300 flex-shrink-0">
              <img
                alt="Tarot Italia Seal"
                referrerPolicy="no-referrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                src={IMAGES.avatar}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-[17px] sm:text-[20px] font-semibold tracking-wider text-[#f2ca50] group-hover:text-[#E5C158] transition-colors uppercase leading-none truncate">
                TAROT ITALIA
              </span>
              <span className="hidden sm:block text-[10px] font-medium tracking-[0.2em] text-[#E2DACD] uppercase pt-0.5 truncate">
                Arcani &amp; Introspezione
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-colors rounded-lg ${
                activeTab === 'home'
                  ? 'bg-[#2a292e] text-[#f2ca50]'
                  : 'text-[#d0c5af] hover:text-[#e4e1e7]'
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
              className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-colors rounded-lg ${
                activeTab === 'servizi'
                  ? 'bg-[#2a292e] text-[#f2ca50]'
                  : 'text-[#d0c5af] hover:text-[#e4e1e7]'
              }`}
            >
              Servizi &amp; Prenotazioni
            </button>
            <button
              onClick={() => { setActiveTab('chi-siamo'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-colors rounded-lg ${
                activeTab === 'chi-siamo'
                  ? 'bg-[#2a292e] text-[#f2ca50]'
                  : 'text-[#d0c5af] hover:text-[#e4e1e7]'
              }`}
            >
              Chi Siamo / About Me
            </button>
            <button
              onClick={() => setActiveTab('arcani')}
              className={`px-3 py-2 text-[12px] font-semibold tracking-wider uppercase transition-colors rounded-lg ${
                activeTab === 'arcani'
                  ? 'bg-[#2a292e] text-[#f2ca50]'
                  : 'text-[#d0c5af] hover:text-[#e4e1e7]'
              }`}
            >
              Blog &amp; Guide Arcani
            </button>
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => openBookingFor('Lettura On Line 1h')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-[#f2ca50] text-[#3c2f00] text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#E5C158] transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm sm:text-base leading-none">calendar_month</span>
              <span className="hidden sm:inline whitespace-nowrap">Prenota Lettura</span>
              <span className="sm:hidden whitespace-nowrap">Prenota</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#d0c5af] hover:text-white rounded-lg focus:outline-none"
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
          <div className="lg:hidden bg-[#16161F] border-b border-[rgba(212,175,55,0.2)] px-4 py-4 flex flex-col gap-2 shadow-xl animate-in fade-in duration-200">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#f2ca50]"
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
              className="text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#d0c5af] hover:text-white"
            >
              Servizi &amp; Prenotazioni
            </button>
            <button
              onClick={() => { setActiveTab('chi-siamo'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#d0c5af] hover:text-white"
            >
              Chi Siamo / About Me
            </button>
            <button
              onClick={() => { setActiveTab('arcani'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#d0c5af] hover:text-white"
            >
              Guida 22 Arcani Maggiori
            </button>
            <a
              href="https://wa.me/393791038253"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 py-2 bg-[#1B4D3E] text-[#F5F0EB] text-xs font-semibold uppercase tracking-wider rounded-lg"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              WhatsApp Rapido (+39 379 1038253)
            </a>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full pt-14 sm:pt-16 lg:pt-28 bg-[#131317] flex-1">
        {/* CONDITIONAL VIEW: CHI SIAMO TERESA / ABOUT ME & COLLABORATORI */}
        {activeTab === 'chi-siamo' && (
          <section className="max-w-[1240px] mx-auto px-4 lg:px-12 py-12 animate-in fade-in duration-300">
            {/* Top Navigation & Breadcrumb */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(212,175,55,0.15)]">
              <button
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#f2ca50] hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Torna alla Home
              </button>
              <span className="text-xs uppercase tracking-widest text-[#E2DACD]/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
                Studio Olistico Macerata • Attivo dal 2012
              </span>
            </div>

            {/* SECTION 1: TERESA / ABOUT ME */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
              {/* Profile Card & Bio Column */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-[#16161F] p-8 lg:p-10 rounded-xl border border-[rgba(212,175,55,0.25)] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#f2ca50]/5 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1f1f23] rounded-full border border-[rgba(212,175,55,0.2)] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#f2ca50]"></span>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f2ca50]">
                      About Me • Teresa
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl lg:text-4xl text-[#F5F0EB] mb-4 leading-tight">
                    Teresa <span className="italic text-[#f2ca50]">&amp;</span> il Linguaggio dei Simboli
                  </h1>

                  <p className="text-[15px] lg:text-[16px] text-[#d0c5af] leading-relaxed mb-6">
                    Benvenuti in Tarot Italia. Sono Teresa, operatrice olistica, ricercatrice simbolica e tarologa. Il mio approccio unisce l’analisi visiva e semiotica dell’immagine artistica con una decennale indagine negli archetipi della psiche e della tradizione esoterica. Ogni consulto è uno spazio protetto d’ascolto autentico, concepito per disvelare nodi interiori e restituire sovranità decisionale a chi siede al tavolo degli Arcani.
                  </p>

                  {/* Formazione Scolastica */}
                  <div className="p-5 bg-[#1f1f23] rounded-xl border border-[rgba(212,175,55,0.2)] mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#2a292e] flex items-center justify-center text-[#f2ca50]">
                        <span className="material-symbols-outlined text-lg">school</span>
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-widest text-[#e9c176] font-semibold block">
                          Formazione Accademica &amp; Artistica
                        </span>
                        <h3 className="font-serif text-lg text-[#F5F0EB]">
                          Accademia di Belle Arti di Macerata
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-[#d0c5af] leading-relaxed pl-11">
                      <strong>Laureata in Tecniche della Comunicazione Visiva</strong>. Questa solida base permette di decodificare la grammatica visiva, cromatica e compositiva delle carte storiche non come mera superstizione, ma come linguaggio visivo archetipico che dialoga direttamente con la mente profonda.
                    </p>
                  </div>

                  {/* Quote / Mission */}
                  <blockquote className="border-l-2 border-[#f2ca50] pl-4 italic text-sm text-[#E2DACD] my-4 leading-relaxed">
                    “I tarocchi non impongono un destino ineluttabile: sono uno specchio limpido dove l’intuito ritrova la propria bussola, trasformando le incertezze in consapevolezza e presenza.”
                  </blockquote>
                </div>

                {/* FORMAZIONE OLISTICA DETAIL CARDS */}
                <div className="bg-[#16161F] p-8 lg:p-10 rounded-xl border border-[rgba(212,175,55,0.25)] shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                        <span className="material-symbols-outlined text-sm">workspace_premium</span>
                        Percorso Disciplinare Certificato
                      </div>
                      <h2 className="font-serif text-2xl lg:text-3xl text-[#F5F0EB] mt-1">
                        Formazione Olistica di Teresa
                      </h2>
                    </div>
                    <span className="hidden sm:inline-flex px-3 py-1 bg-[#1f1f23] rounded-md text-[10px] text-[#e9c176] font-mono uppercase tracking-wider border border-[rgba(212,175,55,0.15)]">
                      Accreditamenti IPHM
                    </span>
                  </div>

                  <p className="text-xs text-[#d0c5af] mb-6 leading-relaxed">
                    Un percorso di continua ricerca, studio con maestri accreditati e pratica rigorosa su molteplici canali della salute energetica e della divinazione simbolica:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Item 1: Mariangela Aggio */}
                    <div className="p-4 bg-[#1f1f23] rounded-lg border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#f2ca50] bg-[#2a292e] px-2 py-0.5 rounded">
                          Percorso 2025
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#f2ca50]">style</span>
                      </div>
                      <h4 className="font-serif text-base text-[#F5F0EB] font-semibold mb-1">
                        Tarocchi Rider Waite Smith
                      </h4>
                      <p className="text-xs text-[#d0c5af] leading-relaxed">
                        Formata con la taromante <strong>Mariangela Aggio</strong> per il Percorso 2025 in lettura e decodifica intuitiva dei Tarocchi Rider Waite Smith.
                      </p>
                    </div>

                    {/* Item 2: Dorian Bones */}
                    <div className="p-4 bg-[#1f1f23] rounded-lg border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#f2ca50] bg-[#2a292e] px-2 py-0.5 rounded">
                          Annuale 2023 / 2024
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#f2ca50]">auto_stories</span>
                      </div>
                      <h4 className="font-serif text-base text-[#F5F0EB] font-semibold mb-1">
                        Accademia Nazionale del Tarocco Esoterico
                      </h4>
                      <p className="text-xs text-[#d0c5af] leading-relaxed">
                        Formata come tarologa nel percorso annuale diretto da <strong>Dorian Bones</strong> (artista, libero ricercatore, membro fondatore della Società dello Zolfo e direttore dell’Accademia Nazionale del Tarocco Esoterico).
                      </p>
                    </div>

                    {/* Item 3: Reiki Usui */}
                    <div className="p-4 bg-[#1f1f23] rounded-lg border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#e9c176] bg-[#2a292e] px-2 py-0.5 rounded">
                          Lignaggio Originale
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#f2ca50]">vital_signs</span>
                      </div>
                      <h4 className="font-serif text-base text-[#F5F0EB] font-semibold mb-1">
                        Operatore Reiki II Livello
                      </h4>
                      <p className="text-xs text-[#d0c5af] leading-relaxed">
                        Certificata con il Maestro <strong>F. Tartuferi</strong> secondo il lignaggio originale di <strong>Mikao Usui®</strong> per il trattamento energetico e l’armonizzazione a distanza.
                      </p>
                    </div>

                    {/* Item 4: Mindfulness IPHM */}
                    <div className="p-4 bg-[#1f1f23] rounded-lg border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#1B4D3E] bg-[#F5F0EB] font-bold px-2 py-0.5 rounded">
                          Accredito IPHM
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#f2ca50]">self_improvement</span>
                      </div>
                      <h4 className="font-serif text-base text-[#F5F0EB] font-semibold mb-1">
                        Facilitatore Mindfulness
                      </h4>
                      <p className="text-xs text-[#d0c5af] leading-relaxed">
                        Formata presso <strong>Mindfulness Educators®</strong>, accreditata dall’ente internazionale <strong>IPHM</strong> (International Practitioners of Holistic Medicine).
                      </p>
                    </div>

                    {/* Item 5: Naturopata IPHM */}
                    <div className="p-4 bg-[#1f1f23] rounded-lg border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#1B4D3E] bg-[#F5F0EB] font-bold px-2 py-0.5 rounded">
                          Accredito IPHM
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#f2ca50]">eco</span>
                      </div>
                      <h4 className="font-serif text-base text-[#F5F0EB] font-semibold mb-1">
                        Operatore Naturopata
                      </h4>
                      <p className="text-xs text-[#d0c5af] leading-relaxed">
                        Formata presso <strong>Future Academy®</strong>, accreditata dall’ente <strong>IPHM</strong> (International Practitioners of Holistic Medicine) per il benessere integrato.
                      </p>
                    </div>

                    {/* Item 6: Pendolo PTAH & Piramidologia */}
                    <div className="p-4 bg-[#1f1f23] rounded-lg border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#f2ca50] bg-[#2a292e] px-2 py-0.5 rounded">
                          Radiestesia &amp; Energie
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#f2ca50]">explore</span>
                      </div>
                      <h4 className="font-serif text-base text-[#F5F0EB] font-semibold mb-1">
                        Pendolo PTAH &amp; Piramidologia
                      </h4>
                      <p className="text-xs text-[#d0c5af] leading-relaxed">
                        Specializzata nell’individuazione ed elaborazione delle energie sottili da oggetti, persone, luoghi, piante e animali. Percorso diretto dall’operatore olistico <strong>Emiliano Amici</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar: Seal & Studio Coordinates */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Author Card */}
                <div className="bg-[#16161F] p-6 rounded-xl border border-[rgba(212,175,55,0.25)] shadow-xl flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img
                      src={IMAGES.avatar}
                      alt="Teresa Tarot Italia"
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-full object-cover border-2 border-[#f2ca50] shadow-lg p-0.5"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#1B4D3E] p-1.5 rounded-full border border-white/20">
                      <span className="material-symbols-outlined text-white text-xs block">verified</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-[#F5F0EB] font-semibold">Teresa</h3>
                  <p className="text-xs text-[#f2ca50] uppercase tracking-widest mt-0.5">
                    Tarologa &amp; Operatrice Olistica
                  </p>
                  <p className="text-xs text-[#d0c5af] mt-3 leading-relaxed">
                    Professione esercitata con passione e rigore deontologico a Macerata e per consultanti da tutta Italia ed Europa via web.
                  </p>

                  <div className="w-full border-t border-[rgba(212,175,55,0.15)] mt-5 pt-4 flex flex-col gap-2">
                    <button
                      onClick={() => openBookingFor('Lettura con Teresa (1h)')}
                      className="w-full py-2.5 bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#E5C158] transition-colors shadow-sm cursor-pointer"
                    >
                      Prenota Consulto con Teresa
                    </button>
                    <a
                      href="https://wa.me/393791038253"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-[#1f1f23] text-[#F5F0EB] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#2a292e] transition-colors border border-[rgba(212,175,55,0.2)] flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm text-[#f2ca50]">chat</span>
                      Scrivile su WhatsApp
                    </a>
                  </div>
                </div>

                {/* Sede Studio Macerata */}
                <div className="bg-[#16161F] p-6 rounded-xl border border-[rgba(212,175,55,0.25)] shadow-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#2a292e] flex items-center justify-center text-[#f2ca50] mb-3">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#F5F0EB] mb-1">Lo Studio Storico</h3>
                  <p className="text-xs text-[#d0c5af] mb-4">
                    Via delle Fonti, Centro Storico<br />
                    62100 Macerata (MC), Marche, Italia
                  </p>
                  <div className="border-t border-[rgba(212,175,55,0.15)] pt-3 space-y-1.5 text-xs text-[#E2DACD]/80">
                    <p className="flex justify-between">
                      <span className="text-[#d0c5af]">Lun — Ven:</span>
                      <strong className="text-[#F5F0EB]">09:30 – 19:30</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-[#d0c5af]">Sabato:</span>
                      <strong className="text-[#F5F0EB]">10:00 – 16:00 (su prenotazione)</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-[#d0c5af]">Domenica:</span>
                      <span className="text-[#e9c176]">Sessioni Intensive</span>
                    </p>
                  </div>
                </div>

                {/* Deontologia Legale */}
                <div className="p-4 bg-[#1f1f23] rounded-xl border-l-2 border-[#f2ca50] text-[11px] text-[#E2DACD]/75 leading-relaxed">
                  <strong className="text-[#F5F0EB] block mb-1">Deontologia Professionale</strong>
                  Attività disciplinata ai sensi della Legge 14 gennaio 2013, n. 4. Nessuna consulenza costituisce parere medico, sanitario o legale.
                </div>
              </div>
            </div>

            {/* SECTION 2: COLLABORATORI ESTERNI - MAURA RITUALISTA ESOTERICA */}
            <div className="bg-[#16161F] p-8 lg:p-12 rounded-xl border border-[rgba(212,175,55,0.3)] shadow-2xl relative overflow-hidden mb-12">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#604403]/15 rounded-full blur-[110px] pointer-events-none"></div>

              {/* Header Collaboratori */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[rgba(212,175,55,0.2)]">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs text-[#f2ca50] uppercase tracking-widest font-semibold mb-1">
                    <span className="material-symbols-outlined text-sm">groups</span>
                    <span>Collaboratori Esterni</span>
                  </div>
                  <h2 className="font-serif text-3xl lg:text-4xl text-[#F5F0EB]">
                    Maura • Ritualista Esoterica
                  </h2>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1f1f23] rounded-md text-xs text-[#e9c176] border border-[rgba(212,175,55,0.2)] self-start md:self-auto">
                  <span className="material-symbols-outlined text-sm text-[#f2ca50]">local_fire_department</span>
                  <span>Folklore Tradizionale Marchigiano</span>
                </div>
              </div>

              {/* Subheading & In-depth Manifesto */}
              <div className="mb-8">
                <h3 className="font-serif text-xl lg:text-2xl text-[#f2ca50] mb-3">
                  Obiettivi e significato della ritualità esoterica nel folklore marchigiano
                </h3>
                <p className="text-[15px] text-[#d0c5af] leading-relaxed mb-4">
                  Nelle Marche, il ritualismo esoterico assume alcune peculiarità legate al folklore locale e a pratiche tradizionali tramandate da generazione in generazione. Come operatrice esoterica mi occupo in particolare della ritualistica d’amore:
                </p>
              </div>

              {/* 4 Core Practices Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* 1. Rituali d'amore e attrazione */}
                <div className="p-5 bg-[#1f1f23] rounded-xl border border-[rgba(212,175,55,0.2)] hover:border-[#f2ca50] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#2a292e] flex items-center justify-center text-[#f2ca50] mb-3">
                      <span className="material-symbols-outlined text-xl">favorite</span>
                    </div>
                    <h4 className="font-serif text-base text-[#F5F0EB] font-semibold mb-2">
                      Rituali d’Amore e Attrazione
                    </h4>
                    <p className="text-xs text-[#d0c5af] leading-relaxed">
                      Pratiche di risveglio della luce personale e magnetismo affettivo per favorire l'incontro armonico e l'apertura all'altro.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[rgba(212,175,55,0.1)] text-[10px] text-[#e9c176] uppercase tracking-wider font-semibold">
                    Attrazione &amp; Luce
                  </div>
                </div>

                {/* 2. Legamenti d'amore */}
                <div className="p-5 bg-[#1f1f23] rounded-xl border border-[rgba(212,175,55,0.2)] hover:border-[#f2ca50] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#2a292e] flex items-center justify-center text-[#f2ca50] mb-3">
                      <span className="material-symbols-outlined text-xl">all_inclusive</span>
                    </div>
                    <h4 className="font-serif text-base text-[#F5F0EB] font-semibold mb-2">
                      Legamenti d’Amore
                    </h4>
                    <p className="text-xs text-[#d0c5af] leading-relaxed">
                      Lavori tradizionali radicati nelle formule storiche popolari marchigiane per consolidare il legame profondo d'anime con intenzione pura.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[rgba(212,175,55,0.1)] text-[10px] text-[#e9c176] uppercase tracking-wider font-semibold">
                    Unione Tradizionale
                  </div>
                </div>

                {/* 3. Riti di riconciliazione */}
                <div className="p-5 bg-[#1f1f23] rounded-xl border border-[rgba(212,175,55,0.2)] hover:border-[#f2ca50] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#2a292e] flex items-center justify-center text-[#f2ca50] mb-3">
                      <span className="material-symbols-outlined text-xl">handshake</span>
                    </div>
                    <h4 className="font-serif text-base text-[#F5F0EB] font-semibold mb-2">
                      Riti di Riconciliazione
                    </h4>
                    <p className="text-xs text-[#d0c5af] leading-relaxed">
                      Purificazione delle incomprensioni e pacificazione delle turbolenze per favorire il dialogo sincero e lo scioglimento dei rancori.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[rgba(212,175,55,0.1)] text-[10px] text-[#e9c176] uppercase tracking-wider font-semibold">
                    Armonia &amp; Dialogo
                  </div>
                </div>

                {/* 4. Riti di rafforzamento della coppia */}
                <div className="p-5 bg-[#1f1f23] rounded-xl border border-[rgba(212,175,55,0.2)] hover:border-[#f2ca50] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#2a292e] flex items-center justify-center text-[#f2ca50] mb-3">
                      <span className="material-symbols-outlined text-xl">shield</span>
                    </div>
                    <h4 className="font-serif text-base text-[#F5F0EB] font-semibold mb-2">
                      Rafforzamento della Coppia
                    </h4>
                    <p className="text-xs text-[#d0c5af] leading-relaxed">
                      Scudo energetico e schermatura contro interferenze esterne, gelosie o logorio del quotidiano per custodire la sacralità del legame.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[rgba(212,175,55,0.1)] text-[10px] text-[#e9c176] uppercase tracking-wider font-semibold">
                    Protezione del Legame
                  </div>
                </div>
              </div>

              {/* Maura's Authentic Words & Philosophy */}
              <div className="p-6 bg-[#1f1f23] rounded-xl border-l-4 border-[#f2ca50] mb-6">
                <p className="font-serif text-[15px] lg:text-[16px] text-[#F5F0EB] italic leading-relaxed mb-3">
                  “Questa ritualità di coppia agisce come mediatore tra il mondo spirituale e quello umano. Utilizzando conoscenze e pratiche popolari per aiutare le persone a migliorare o proteggere i loro rapporti affettivi. La mia arte si basa su una profonda comprensione delle energie e dei simboli d’amore, unita al rispetto per la sacralità delle relazioni e della volontà delle persone.”
                </p>
                <div className="text-right text-xs text-[#f2ca50] font-semibold uppercase tracking-widest">
                  — Maura, Operatrice e Ritualista Esoterica
                </div>
              </div>

              {/* Direct Inquire for Maura's Rituals */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[rgba(212,175,55,0.15)]">
                <div className="text-xs text-[#d0c5af]">
                  Desideri informazioni approfondite o una valutazione preventiva su un percorso di ritualistica d'amore con Maura?
                </div>
                <button
                  onClick={() => openBookingFor('Richiesta Ritualistica d’Amore (Maura)')}
                  className="px-5 py-2.5 bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#E5C158] transition-colors shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                  <span>Richiedi Valutazione Rituale</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* CONDITIONAL VIEW: 22 ARCANI GUIDA & BLOG */}
        {activeTab === 'arcani' && (
          <section className="max-w-[1240px] mx-auto px-4 lg:px-12 py-12 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setActiveTab('home')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#f2ca50] hover:underline"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Torna alla Home
              </button>
              <span className="text-xs uppercase tracking-widest text-[#E2DACD]/60">Dizionario Archetipico • 22 Lame</span>
            </div>

            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[12px] font-semibold text-[#f2ca50] uppercase tracking-widest">
                Compendio Introspettivo
              </span>
              <h1 className="font-serif text-3xl lg:text-4xl text-[#F5F0EB] mt-1 mb-3">
                I 22 Arcani Maggiori: Specchio dell’Anima
              </h1>
              <p className="text-sm text-[#d0c5af] leading-relaxed">
                Gli Arcani Maggiori non sono profezie esterne ma le 22 tappe universali dell’evoluzione dell’essere umano. Seleziona una lama per scoprirne il messaggio iniziatico.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Arcana selection list */}
              <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[620px] overflow-y-auto pr-2">
                {MAJOR_ARCANA.map((arcano, idx) => (
                  <button
                    key={arcano.num}
                    onClick={() => setSelectedArcano(idx)}
                    className={`p-3 text-left rounded-lg border transition-all text-xs flex flex-col justify-between ${
                      selectedArcano === idx
                        ? 'bg-[#2a292e] border-[#f2ca50] text-[#f2ca50] shadow-md'
                        : 'bg-[#16161F] border-[rgba(212,175,55,0.15)] text-[#d0c5af] hover:border-[rgba(212,175,55,0.4)]'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-[#e9c176]">{arcano.num}</span>
                    <span className="font-serif font-semibold text-[13px] text-[#F5F0EB] truncate mt-1">
                      {arcano.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Arcano In-Depth Card */}
              {selectedArcano !== null && (
                <div className="lg:col-span-7 bg-[#16161F] p-8 rounded-xl border border-[rgba(212,175,55,0.3)] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-7xl font-serif text-[#f2ca50]/5 select-none pointer-events-none">
                    {MAJOR_ARCANA[selectedArcano].num}
                  </div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1f1f23] rounded text-[#f2ca50] text-[11px] font-mono mb-4">
                    <span>Arcano Maggiore {MAJOR_ARCANA[selectedArcano].num}</span>
                  </div>
                  <h2 className="font-serif text-3xl text-[#F5F0EB] mb-4">
                    {MAJOR_ARCANA[selectedArcano].name}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-[#e9c176] font-semibold mb-1">
                        Significato Simbolico ed Evolutivo
                      </h4>
                      <p className="text-sm text-[#d0c5af] leading-relaxed">
                        {MAJOR_ARCANA[selectedArcano].meaning}
                      </p>
                    </div>
                    <div className="p-4 bg-[#1f1f23] rounded-lg border-l-2 border-[#f2ca50]">
                      <h4 className="text-[11px] uppercase tracking-wider text-[#f2ca50] font-semibold mb-1">
                        Consiglio per l’Introspezione
                      </h4>
                      <p className="text-sm italic text-[#E2DACD] leading-relaxed">
                        “{MAJOR_ARCANA[selectedArcano].advice}”
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[rgba(212,175,55,0.15)] flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-[#E2DACD]/70">
                      Vuoi analizzare questa lama applicata alla tua situazione attuale?
                    </p>
                    <button
                      onClick={() => openBookingFor(`Consulto con focus su ${MAJOR_ARCANA[selectedArcano].name}`)}
                      className="px-4 py-2 bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#E5C158] transition-colors"
                    >
                      Richiedi Stesura su Questa Lama
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* DEFAULT HOME VIEW */}
        {activeTab === 'home' && (
          <div className="flex flex-col w-full">
            {/* HERO SECTION */}
            <section className="relative w-full overflow-hidden bg-[#0e0e12]">
              {/* Occult Radial Background Glow */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-[#f2ca50]/10 rounded-full blur-[140px] pointer-events-none"></div>
              <div className="absolute top-1/3 -right-20 w-[420px] h-[420px] bg-[#e9c176]/5 rounded-full blur-[110px] pointer-events-none"></div>

              <div className="max-w-[1240px] mx-auto px-4 lg:px-12 py-8 sm:py-12 lg:py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Text Content Column */}
                  <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
                    {/* Vintage Gold Badge */}
                    <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 sm:py-1 bg-[#16161F] rounded-full shadow-sm border border-[rgba(212,175,55,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
                      <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-[#f2ca50]">
                        Dal 2012 • Studio Olistico e Divinatorio
                      </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="font-serif text-[26px] sm:text-[34px] lg:text-[40px] text-[#F5F0EB] leading-tight max-w-2xl">
                      Il Linguaggio Segreto degli <span className="italic text-[#f2ca50]">Arcani</span> per la Tua Evoluzione Interiore
                    </h1>

                    {/* Poetic Subtitle */}
                    <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#d0c5af] max-w-xl leading-relaxed">
                      Uno spazio dedicato a chi desidera scoprire, approfondire e vivere il mondo dei tarocchi. Sessioni individuali di introspezione e ascolto, online ovunque tu sia o dal vivo nello studio di Macerata.
                    </p>

                    {/* Dual CTAs */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                      <button
                        onClick={() => openBookingFor('Lettura On Line 1h')}
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#f2ca50] text-[#3c2f00] text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider rounded-lg shadow-md hover:bg-[#E5C158] transition-all duration-300 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm sm:text-base leading-none">flare</span>
                        <span>Prenota Lettura (1h)</span>
                      </button>
                      <a
                        href="#metodi"
                        className="inline-flex items-center gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 bg-[#1f1f23] text-[#F5F0EB] text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider rounded-lg hover:bg-[#2a292e] transition-all duration-300 border border-[rgba(212,175,55,0.15)]"
                      >
                        <span className="material-symbols-outlined text-sm sm:text-base leading-none">menu_book</span>
                        <span>I Nostri Metodi</span>
                      </a>
                    </div>

                    {/* Social Proof & Trust Metric */}
                    <div className="flex items-center gap-4 pt-3">
                      <div className="flex items-center gap-1 text-[#f2ca50]">
                        <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-[#F5F0EB] font-semibold uppercase tracking-wider">
                          Valutato 5.0 su Google Recensioni
                        </span>
                        <span className="text-[13px] text-[#E2DACD]/70">
                          Oltre 10 anni di consulti, etica e supporto profondo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Esoteric Portrait Column */}
                  <div className="lg:col-span-5 relative flex justify-center">
                    <div className="relative w-full max-w-[380px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl bg-[#1b1b1f] group border border-[rgba(212,175,55,0.2)]">
                      <img
                        alt="Evocazione rituale di Tarot Italia"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter contrast-110 grayscale brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                        src={IMAGES.hero}
                        onError={(e) => {
                          // Fallback container
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/30 to-transparent"></div>

                      {/* Recessed Archival Stamp Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#16161F]/90 backdrop-blur-md rounded-lg shadow-lg flex items-center gap-3 border border-[rgba(212,175,55,0.2)]">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#353439] p-1 border border-[rgba(212,175,55,0.3)]">
                          <img
                            alt="Sigillo Tarot Italia"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                            src={IMAGES.avatar}
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-serif text-[16px] text-[#f2ca50] truncate font-semibold">
                            Sanctuario Simbolico
                          </span>
                          <span className="text-[11px] text-[#E2DACD]/80 truncate">
                            Studio Olistico Macerata • Online Global
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VALORI & FILOSOFIA (3 CORE CARDS) */}
            <section className="w-full bg-[#131317] py-20" id="metodi">
              <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="flex flex-col gap-1 max-w-xl">
                    <div className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#f2ca50] uppercase tracking-widest">
                      <span>◆</span>
                      <span>Visione &amp; Deontologia</span>
                    </div>
                    <h2 className="font-serif text-2xl lg:text-3xl text-[#F5F0EB]">
                      Un Approccio Rigoroso, Empatico e Intuitivo
                    </h2>
                  </div>
                  <p className="text-[15px] text-[#d0c5af] max-w-md">
                    I tarocchi non sono predestinazione immutabile, ma una grammatica per svelare l'invisibile e risvegliare le tue decisioni più autentiche.
                  </p>
                </div>

                {/* 3 Pillars Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="bg-[#16161F] p-7 rounded-xl shadow-lg flex flex-col gap-4 transition-all duration-300 hover:bg-[#1E1E2B] border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)]">
                    <div className="w-12 h-12 rounded-lg bg-[#2a292e] flex items-center justify-center text-[#f2ca50] shadow-sm">
                      <span className="material-symbols-outlined text-2xl">psychology_alt</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-[#e9c176] uppercase tracking-widest">
                        Pilastro 01
                      </span>
                      <h3 className="font-serif text-xl text-[#F5F0EB]">
                        Introspezione non Dogmatica
                      </h3>
                    </div>
                    <p className="text-[15px] text-[#d0c5af] leading-relaxed">
                      I tarocchi come specchio della psiche e bussola d'orientamento personale. Nessun fatalismo: stimoliamo il pensiero critico e la consapevolezza emotiva.
                    </p>
                    <div className="mt-auto pt-2 flex items-center gap-2 text-[#f2ca50] text-[11px] font-semibold uppercase tracking-wider">
                      <span>Specchio Archetipico</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#16161F] p-7 rounded-xl shadow-lg flex flex-col gap-4 transition-all duration-300 hover:bg-[#1E1E2B] border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)]">
                    <div className="w-12 h-12 rounded-lg bg-[#2a292e] flex items-center justify-center text-[#f2ca50] shadow-sm">
                      <span className="material-symbols-outlined text-2xl">nest_clock_farsight_analog</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-[#e9c176] uppercase tracking-widest">
                        Pilastro 02
                      </span>
                      <h3 className="font-serif text-xl text-[#F5F0EB]">
                        Spazio d'Ascolto Protetto
                      </h3>
                    </div>
                    <p className="text-[15px] text-[#d0c5af] leading-relaxed">
                      Un'ora integrale (60 min) dedicata senza fretta ai tuoi sogni, desideri nascosti, nodi emotivi e scelte di vita, in un contesto privo di giudizio.
                    </p>
                    <div className="mt-auto pt-2 flex items-center gap-2 text-[#f2ca50] text-[11px] font-semibold uppercase tracking-wider">
                      <span>Riservatezza Assoluta</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-[#16161F] p-7 rounded-xl shadow-lg flex flex-col gap-4 transition-all duration-300 hover:bg-[#1E1E2B] border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)]">
                    <div className="w-12 h-12 rounded-lg bg-[#2a292e] flex items-center justify-center text-[#f2ca50] shadow-sm">
                      <span className="material-symbols-outlined text-2xl">distance</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-[#e9c176] uppercase tracking-widest">
                        Pilastro 03
                      </span>
                      <h3 className="font-serif text-xl text-[#F5F0EB]">
                        Doppia Modalità Fluida
                      </h3>
                    </div>
                    <p className="text-[15px] text-[#d0c5af] leading-relaxed">
                      Consulti dal vivo presso la quiete dello studio storico di Macerata, oppure comodamente online via WhatsApp o videochiamata ovunque ti trovi nel mondo.
                    </p>
                    <div className="mt-auto pt-2 flex items-center gap-2 text-[#f2ca50] text-[11px] font-semibold uppercase tracking-wider">
                      <span>Presenza &amp; Digitale</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ANTEPRIMA SERVIZI CHIAVE */}
            <section className="w-full bg-[#0e0e12] py-20" id="servizi-section">
              <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
                {/* Section Title & Narrative */}
                <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
                  <span className="text-[12px] font-semibold text-[#f2ca50] uppercase tracking-widest">
                    Consulti &amp; Pratiche
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl text-[#F5F0EB]">
                    Percorsi di Chiarezza ed Equilibrio
                  </h2>
                  <p className="text-[15px] text-[#d0c5af]">
                    Un viaggio simbolico attraverso la vostra intuizione dove con il supporto degli arcani si trova chiarezza ed equilibrio interiore.
                  </p>
                </div>

                {/* Service Cards (Proportion 3:4 Sacred Ratio Style) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Service 1: Lettura On Line */}
                  <div className="bg-[#16161F] rounded-xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1 border border-[rgba(212,175,55,0.18)] hover:border-[rgba(212,175,55,0.4)]">
                    <div className="relative w-full h-52 overflow-hidden bg-[#1f1f23]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Lettura On Line 1h"
                        referrerPolicy="no-referrer"
                        src={IMAGES.serviceOnline}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16161F] via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-[#353439]/90 backdrop-blur-md px-2.5 py-1 rounded text-[#f2ca50] text-[11px] font-medium uppercase tracking-widest">
                        60 Minuti
                      </div>
                      <div className="absolute top-3 right-3 bg-[#1B4D3E]/90 text-[#F5F0EB] px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Live Video/WA
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <h3 className="font-serif text-xl text-[#F5F0EB] group-hover:text-[#f2ca50] transition-colors">
                        Lettura On Line 1h
                      </h3>
                      <p className="text-[13px] text-[#d0c5af] leading-relaxed">
                        La comodità di un consulto profondo ovunque tu sia. Stesure personalizzate, analisi dettagliata degli schemi ricorrenti e spazio aperto per tutte le tue domande.
                      </p>
                      <ul className="flex flex-col gap-2 pt-1 text-[13px] text-[#E2DACD]/80">
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#f2ca50]">check_circle</span>
                          <span>Foto finale stesura ad alta risoluzione</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#f2ca50]">check_circle</span>
                          <span>Registrazione audio inclusa su richiesta</span>
                        </li>
                      </ul>
                      <div className="pt-4 mt-auto">
                        <button
                          onClick={() => openBookingFor('Lettura On Line 1h')}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f2ca50] text-[#3c2f00] text-[12px] font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#E5C158] transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">devices</span>
                          <span>Prenota Online</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Service 2: Lettura Dal Vivo */}
                  <div className="bg-[#16161F] rounded-xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1 border border-[rgba(212,175,55,0.18)] hover:border-[rgba(212,175,55,0.4)]">
                    <div className="relative w-full h-52 overflow-hidden bg-[#1f1f23]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Lettura Dal Vivo a Macerata"
                        referrerPolicy="no-referrer"
                        src={IMAGES.serviceStudio}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16161F] via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-[#353439]/90 backdrop-blur-md px-2.5 py-1 rounded text-[#f2ca50] text-[11px] font-medium uppercase tracking-widest">
                        Presenza • 1h
                      </div>
                      <div className="absolute top-3 right-3 bg-[#604403] text-[#ffdea5] px-2.5 py-1 rounded text-[11px] font-medium">
                        Macerata Centro
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <h3 className="font-serif text-xl text-[#F5F0EB] group-hover:text-[#f2ca50] transition-colors">
                        Lettura Dal Vivo
                      </h3>
                      <p className="text-[13px] text-[#d0c5af] leading-relaxed">
                        L'esperienza sensoriale completa nello studio privato di Macerata. Tisana meditativa, fragranze resinose botaniche e il contatto diretto con le carte storiche.
                      </p>
                      <ul className="flex flex-col gap-2 pt-1 text-[13px] text-[#E2DACD]/80">
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#f2ca50]">check_circle</span>
                          <span>Ambiente schermato e silenzioso</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#f2ca50]">check_circle</span>
                          <span>Tarocchi storici e oracoli d'autore</span>
                        </li>
                      </ul>
                      <div className="pt-4 mt-auto">
                        <button
                          onClick={() => openBookingFor('Lettura Dal Vivo (Macerata)')}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f2ca50] text-[#3c2f00] text-[12px] font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#E5C158] transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">storefront</span>
                          <span>Prenota in Studio</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Service 3: Ritualistica & Armonie */}
                  <div className="bg-[#16161F] rounded-xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1 border border-[rgba(212,175,55,0.18)] hover:border-[rgba(212,175,55,0.4)]">
                    <div className="relative w-full h-52 overflow-hidden bg-[#1f1f23]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Ritualistica & Armonie"
                        referrerPolicy="no-referrer"
                        src={IMAGES.serviceRitual}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16161F] via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-[#353439]/90 backdrop-blur-md px-2.5 py-1 rounded text-[#f2ca50] text-[11px] font-medium uppercase tracking-widest">
                        Percorso Energetico
                      </div>
                      <div className="absolute top-3 right-3 bg-[#2a292e] text-[#E2DACD] px-2.5 py-1 rounded text-[11px] font-medium">
                        Personalizzato
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <h3 className="font-serif text-xl text-[#F5F0EB] group-hover:text-[#f2ca50] transition-colors">
                        Ritualistica &amp; Armonie
                      </h3>
                      <p className="text-[13px] text-[#d0c5af] leading-relaxed">
                        Lavori energetici e pratiche simboliche mirate allo sblocco delle tensioni, riequilibrio dei canali intuitivi e armonizzazione degli ambienti di vita e lavoro.
                      </p>
                      <ul className="flex flex-col gap-2 pt-1 text-[13px] text-[#E2DACD]/80">
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#f2ca50]">check_circle</span>
                          <span>Analisi preventiva della situazione</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#f2ca50]">check_circle</span>
                          <span>Pratiche con elementi naturali etici</span>
                        </li>
                      </ul>
                      <div className="pt-4 mt-auto">
                        <button
                          onClick={() => openBookingFor('Ritualistica & Armonie')}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1f1f23] text-[#F5F0EB] text-[12px] font-semibold uppercase tracking-wider rounded-lg hover:bg-[#2a292e] transition-all border border-[rgba(212,175,55,0.2)] cursor-pointer"
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
            <section className="w-full bg-[#131317] py-20">
              <div className="max-w-[1000px] mx-auto px-4 lg:px-12 flex flex-col gap-10">
                <div className="text-center flex flex-col items-center gap-2">
                  <span className="text-[12px] font-semibold text-[#f2ca50] uppercase tracking-widest">
                    Chiarezza &amp; Verità
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl text-[#F5F0EB]">
                    Domande Frequenti sui Tarocchi
                  </h2>
                  <p className="text-[15px] text-[#d0c5af] max-w-lg">
                    I principi autentici che guidano ogni nostra lettura e sfatano i luoghi comuni della divinazione commerciale.
                  </p>
                </div>

                {/* Accordion Container */}
                <div className="flex flex-col gap-3" id="faq-accordion">
                  {/* FAQ 1 */}
                  <div className="bg-[#16161F] rounded-xl overflow-hidden shadow-sm transition-all duration-200 border border-[rgba(212,175,55,0.15)]">
                    <button
                      onClick={() => toggleFaq(0)}
                      aria-expanded={expandedFaq === 0}
                      className="w-full p-4 flex items-center justify-between text-left gap-4 text-[#F5F0EB] font-serif text-[17px] group cursor-pointer focus:outline-none"
                      type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full transition-colors ${expandedFaq === 0 ? 'bg-[#f2ca50]' : 'bg-[#f2ca50]/40'}`}></span>
                        Cosa sono i tarocchi?
                      </span>
                      <span className={`material-symbols-outlined text-[#f2ca50] transform transition-transform duration-300 ${expandedFaq === 0 ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {expandedFaq === 0 && (
                      <div className="px-4 pb-4 text-[#d0c5af] text-[15px] leading-relaxed border-t border-[rgba(212,175,55,0.08)] pt-3 animate-in fade-in duration-200">
                        I Tarocchi sono uno strumento di introspezione e riflessione che si rivolge a chiunque desideri esplorare il proprio mondo interiore, ottenere chiarezza su una situazione o approfondire la propria connessione con l'altro. Non sono una gabbia dogmatica, ma una mappa di simboli universali.
                      </div>
                    )}
                  </div>

                  {/* FAQ 2 */}
                  <div className="bg-[#16161F] rounded-xl overflow-hidden shadow-sm transition-all duration-200 border border-[rgba(212,175,55,0.15)]">
                    <button
                      onClick={() => toggleFaq(1)}
                      aria-expanded={expandedFaq === 1}
                      className="w-full p-4 flex items-center justify-between text-left gap-4 text-[#F5F0EB] font-serif text-[17px] group cursor-pointer focus:outline-none"
                      type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full transition-colors ${expandedFaq === 1 ? 'bg-[#f2ca50]' : 'bg-[#f2ca50]/40'}`}></span>
                        Quando fare una lettura?
                      </span>
                      <span className={`material-symbols-outlined text-[#f2ca50] transform transition-transform duration-300 ${expandedFaq === 1 ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {expandedFaq === 1 && (
                      <div className="px-4 pb-4 text-[#d0c5af] text-[15px] leading-relaxed border-t border-[rgba(212,175,55,0.08)] pt-3 animate-in fade-in duration-200">
                        Fare una lettura di tarocchi significa entrare in dialogo con sé stessi, essere pronti ad ascoltare la propria intuizione e ad affrontare con sincerità ciò che emerge. È consigliata quando ci si trova di fronte a un bivio decisionale, durante un passaggio emotivo cruciale, o quando si percepisce un senso di stasi interiore.
                      </div>
                    )}
                  </div>

                  {/* FAQ 3 */}
                  <div className="bg-[#16161F] rounded-xl overflow-hidden shadow-sm transition-all duration-200 border border-[rgba(212,175,55,0.15)]">
                    <button
                      onClick={() => toggleFaq(2)}
                      aria-expanded={expandedFaq === 2}
                      className="w-full p-4 flex items-center justify-between text-left gap-4 text-[#F5F0EB] font-serif text-[17px] group cursor-pointer focus:outline-none"
                      type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full transition-colors ${expandedFaq === 2 ? 'bg-[#f2ca50]' : 'bg-[#f2ca50]/40'}`}></span>
                        A chi si rivolgono?
                      </span>
                      <span className={`material-symbols-outlined text-[#f2ca50] transform transition-transform duration-300 ${expandedFaq === 2 ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {expandedFaq === 2 && (
                      <div className="px-4 pb-4 text-[#d0c5af] text-[15px] leading-relaxed border-t border-[rgba(212,175,55,0.08)] pt-3 animate-in fade-in duration-200">
                        Nonostante il loro utilizzo tradizionale per scopi divinatori, i tarocchi possono essere un mezzo non dogmatico per stimolare il pensiero critico e la riflessione interiore. Si rivolgono a spiriti liberi, ricercatori spirituali, professionisti in cerca di orientamento o chiunque voglia guardarsi dentro con onestà e lucidità.
                      </div>
                    )}
                  </div>

                  {/* FAQ 4 */}
                  <div className="bg-[#16161F] rounded-xl overflow-hidden shadow-sm transition-all duration-200 border border-[rgba(212,175,55,0.15)]">
                    <button
                      onClick={() => toggleFaq(3)}
                      aria-expanded={expandedFaq === 3}
                      className="w-full p-4 flex items-center justify-between text-left gap-4 text-[#F5F0EB] font-serif text-[17px] group cursor-pointer focus:outline-none"
                      type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full transition-colors ${expandedFaq === 3 ? 'bg-[#f2ca50]' : 'bg-[#f2ca50]/40'}`}></span>
                        Cosa aspettarsi da una lettura dei Tarocchi?
                      </span>
                      <span className={`material-symbols-outlined text-[#f2ca50] transform transition-transform duration-300 ${expandedFaq === 3 ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {expandedFaq === 3 && (
                      <div className="px-4 pb-4 text-[#d0c5af] text-[15px] leading-relaxed border-t border-[rgba(212,175,55,0.08)] pt-3 animate-in fade-in duration-200">
                        I Tarocchi non offrono risposte definitive o predizioni rigide, ma spunti, intuizioni e riflessioni che ti aiutano a comprendere meglio te stesso e le tue circostanze. Ogni lettura è un viaggio unico, progettato per illuminare il tuo percorso e offrire ispirazione concreta.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* TESTIMONIANZE E GOOGLE REVIEWS SECTION */}
            <section className="w-full bg-[#0e0e12] py-20">
              <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
                {/* Top Title and Google Rating Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col gap-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-[#f2ca50] text-[12px] font-semibold uppercase tracking-widest justify-center md:justify-start">
                      <span className="material-symbols-outlined text-base">verified</span>
                      <span>Esperienze Autentiche</span>
                    </div>
                    <h2 className="font-serif text-2xl lg:text-3xl text-[#F5F0EB]">
                      La Voce di Chi Ha Camminato con Noi
                    </h2>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#16161F] rounded-lg shadow-sm hover:bg-[#1E1E2B] text-[#F5F0EB] text-[12px] font-semibold uppercase tracking-wider transition-all border border-[rgba(212,175,55,0.2)]"
                    href="https://share.google/EkCkev741rafYgxQl"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[#f2ca50] text-base">rate_review</span>
                    <span>Vedi Profilo Google Recensioni</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Review 1 */}
                  <div className="bg-[#16161F] p-7 rounded-xl shadow-lg flex flex-col gap-4 border border-[rgba(212,175,55,0.15)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#f2ca50]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <span className="text-[11px] text-[#E2DACD]/60 font-medium">Verificata Google</span>
                    </div>
                    <p className="text-[15px] text-[#E2DACD] italic leading-relaxed">
                      “Una sensibilità fuori dal comune. Non le solite predizioni vuote, ma una disamina psicologica ed emotiva che mi ha aiutata a prendere una decisione complessa sul lavoro dopo mesi di stallo.”
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full bg-[#2a292e] flex items-center justify-center font-serif text-[#f2ca50] font-semibold border border-[rgba(212,175,55,0.2)]">
                        E
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-[17px] text-[#F5F0EB]">Elena R.</span>
                        <span className="text-[13px] text-[#E2DACD]/60">Consulto Online (Milano)</span>
                      </div>
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="bg-[#16161F] p-7 rounded-xl shadow-lg flex flex-col gap-4 border border-[rgba(212,175,55,0.15)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#f2ca50]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <span className="text-[11px] text-[#E2DACD]/60 font-medium">Verificata Google</span>
                    </div>
                    <p className="text-[15px] text-[#E2DACD] italic leading-relaxed">
                      “Lo studio di Macerata è un'oasi di pace. Un'ora volata via tra simboli, profumi e una precisione disarmante nell'inquadrare il mio stato interiore. Tornerò sicuramente.”
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full bg-[#2a292e] flex items-center justify-center font-serif text-[#f2ca50] font-semibold border border-[rgba(212,175,55,0.2)]">
                        M
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-[17px] text-[#F5F0EB]">Marco T.</span>
                        <span className="text-[13px] text-[#E2DACD]/60">In Studio a Macerata</span>
                      </div>
                    </div>
                  </div>

                  {/* Review 3 */}
                  <div className="bg-[#16161F] p-7 rounded-xl shadow-lg flex flex-col gap-4 border border-[rgba(212,175,55,0.15)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#f2ca50]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <span className="text-[11px] text-[#E2DACD]/60 font-medium">Verificata Google</span>
                    </div>
                    <p className="text-[15px] text-[#E2DACD] italic leading-relaxed">
                      “La disponibilità su WhatsApp e la cura con cui ti segue prima e dopo il consulto è impagabile. Tarot Italia è sinonimo di serietà ed etica impeccabile.”
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full bg-[#2a292e] flex items-center justify-center font-serif text-[#f2ca50] font-semibold border border-[rgba(212,175,55,0.2)]">
                        S
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-[17px] text-[#F5F0EB]">Sofia V.</span>
                        <span className="text-[13px] text-[#E2DACD]/60">Consulto WhatsApp Video</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* BANNER CALL TO ACTION FINALE */}
            <section className="w-full bg-[#131317] py-20 relative overflow-hidden">
              <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
                <div className="relative bg-[#16161F] rounded-xl p-8 lg:p-16 shadow-2xl flex flex-col items-center text-center gap-4 overflow-hidden border border-[rgba(212,175,55,0.25)]">
                  {/* Occult Aureole Background */}
                  <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#f2ca50]/10 rounded-full blur-[90px] pointer-events-none"></div>

                  <div className="w-16 h-16 rounded-full bg-[#353439] p-2 mb-2 flex items-center justify-center shadow-md border border-[rgba(212,175,55,0.3)]">
                    <img
                      alt="Tarot Italia Seal"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                      src={IMAGES.avatar}
                    />
                  </div>
                  <span className="text-[12px] font-semibold text-[#f2ca50] uppercase tracking-widest">
                    Inizia il Tuo Viaggio
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-[#F5F0EB] max-w-2xl leading-tight">
                    Pronto ad ascoltare cosa hanno da dirti le carte?
                  </h2>
                  <p className="text-[16px] lg:text-[18px] text-[#d0c5af] max-w-xl leading-relaxed">
                    Prenota ora via WhatsApp o attraverso il calendario online per riservare la tua ora di ascolto intuitivo e chiarezza profonda.
                  </p>

                  {/* Direct Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3 z-10">
                    <a
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#f2ca50] text-[#3c2f00] text-[12px] font-semibold uppercase tracking-wider rounded-lg shadow-[0_8px_30px_rgba(212,175,55,0.35)] hover:bg-[#E5C158] hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)] transition-all duration-300"
                      href="https://wa.me/393791038253"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-lg leading-none">chat</span>
                      <span>Contatta su WhatsApp (+39 379 1038253)</span>
                    </a>
                    <a
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f1f23] text-[#F5F0EB] text-[12px] font-semibold uppercase tracking-wider rounded-lg hover:bg-[#2a292e] transition-all border border-[rgba(212,175,55,0.2)]"
                      href="https://t.me/Tarotitalia"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-base leading-none">send</span>
                      <span>Canale Telegram</span>
                    </a>
                  </div>

                  {/* Security & Legal Notice */}
                  <div className="pt-2 flex items-center gap-2 text-[#E2DACD]/60 text-[11px] font-medium uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    <span>Riservatezza Garantita • Ai sensi della Legge 4/2013</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#0e0e12] border-t border-[rgba(212,175,55,0.2)] pt-16 pb-12 text-[#d0c5af]">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-[rgba(212,175,55,0.3)]"
                  src={IMAGES.avatar}
                />
                <span className="font-serif text-lg uppercase tracking-wider text-[#f2ca50] font-semibold">
                  Tarot Italia
                </span>
              </div>
              <p className="text-[13px] text-[#E2DACD]/80 leading-relaxed">
                Sanctuario olistico di divinazione introspettiva e archetipica. Consulti professionali con Tarocchi di Marsiglia e Rider Waite Smith condotti dal 2012 con etica, riservatezza e profondità d'animo.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#e9c176] bg-[#1f1f23] px-2.5 py-1 rounded border border-[rgba(212,175,55,0.15)]">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  Operatore Olistico L. 4/2013
                </span>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-[#f2ca50]">
                Studio Macerata &amp; Orari
              </span>
              <p className="text-[13px] text-[#E2DACD]/90">
                Via delle Fonti, Centro Storico<br />
                62100 Macerata (MC), Italia
              </p>
              <div className="text-[13px] text-[#E2DACD]/70 flex flex-col gap-1">
                <p>Lunedì — Venerdì: 09:30 – 19:30</p>
                <p>Sabato (Solo su Prenotazione): 10:00 – 16:00</p>
                <p>Domenica: Riservato a Sessioni Intensive</p>
              </div>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-[#f2ca50]">
                Contatto Diretto
              </span>
              <p className="text-[13px] text-[#E2DACD]/80">
                Prenotazioni rapide e orientamento conoscitivo:
              </p>
              <div className="flex flex-col gap-2 text-[13px]">
                <a
                  className="inline-flex items-center gap-2 text-[#e4e1e7] hover:text-[#f2ca50] transition-colors"
                  href="https://wa.me/393791038253"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-base text-[#f2ca50]">chat</span>
                  WhatsApp: +39 379 1038253
                </a>
                <a
                  className="inline-flex items-center gap-2 text-[#e4e1e7] hover:text-[#f2ca50] transition-colors"
                  href="https://t.me/Tarotitalia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-base text-[#f2ca50]">send</span>
                  Telegram: @Tarotitalia
                </a>
                <a
                  className="inline-flex items-center gap-2 text-[#e4e1e7] hover:text-[#f2ca50] transition-colors"
                  href="mailto:info@tarotitalia.it"
                >
                  <span className="material-symbols-outlined text-base text-[#f2ca50]">mail</span>
                  info@tarotitalia.it
                </a>
              </div>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-[#f2ca50]">
                Esplora &amp; Note Legali
              </span>
              <div className="flex flex-col gap-2 text-[11px] font-medium uppercase tracking-wider">
                <button
                  onClick={() => { setActiveTab('chi-siamo'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-left text-[#f2ca50] hover:text-[#E5C158] transition-colors cursor-pointer font-semibold"
                >
                  Chi Siamo / Teresa &amp; Maura
                </button>
                <button
                  onClick={() => openBookingFor('Lettura On Line 1h')}
                  className="text-left text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                >
                  Consulti Tarocchi Online
                </button>
                <button
                  onClick={() => openBookingFor('Lettura Dal Vivo (Macerata)')}
                  className="text-left text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                >
                  Sedute dal Vivo in Studio
                </button>
                <button
                  onClick={() => setActiveTab('arcani')}
                  className="text-left text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                >
                  Significato 22 Arcani Maggiori
                </button>
                <button
                  onClick={() => setIsLegalModalOpen('privacy')}
                  className="text-left text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                >
                  Privacy Policy &amp; Cookie
                </button>
                <button
                  onClick={() => setIsCookieCustomizerOpen(true)}
                  className="text-left text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-xs text-[#f2ca50]">cookie</span>
                  Gestisci Preferenze Cookie
                </button>
                <button
                  onClick={() => setIsLegalModalOpen('disclaimer')}
                  className="text-left text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                >
                  Disclaimer Olistico Legale
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2a292e] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-[13px] text-[#E2DACD]/60">
              © 2012–2025 Tarot Italia di Studio Olistico Macerata. P.IVA 02136780430. Professione disciplinata ai sensi della Legge 14 gennaio 2013, n. 4.
            </p>
            <p className="text-[11px] font-medium text-[#E2DACD]/50 uppercase tracking-widest">
              I consulti non sostituiscono pareri medici o psicologici.
            </p>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#16161F] border border-[rgba(212,175,55,0.3)] rounded-xl max-w-lg w-full p-6 lg:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-[#d0c5af] hover:text-white"
              aria-label="Chiudi finestra"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {!bookingSubmitted ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-[#f2ca50] text-[11px] uppercase tracking-widest font-semibold">
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  <span>Prenotazione Consulto</span>
                </div>
                <h3 className="font-serif text-2xl text-[#F5F0EB]">
                  Riserva la Tua Ora di Introspezione
                </h3>
                <p className="text-xs text-[#d0c5af]">
                  Compila i dettagli preferiti. Il messaggio verrà preparato su WhatsApp con priorità di agenda.
                </p>

                {/* Service Selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#e9c176] font-semibold mb-1">
                    Tipologia di Consulto
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#1f1f23] border border-[rgba(212,175,55,0.2)] rounded-lg px-3 py-2 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#f2ca50]"
                  >
                    <option value="Lettura On Line 1h">Lettura On Line 1h (Video / WhatsApp)</option>
                    <option value="Lettura Dal Vivo (Macerata)">Lettura Dal Vivo in Studio a Macerata (1h)</option>
                    <option value="Ritualistica & Armonie">Ritualistica &amp; Armonie (Percorso Energetico)</option>
                    <option value="Approfondimento Simbolico Arcani">Approfondimento Simbolico Arcani</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#e9c176] font-semibold mb-1">
                    Il Tuo Nome
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Es. Maria Teresa"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full bg-[#1f1f23] border border-[rgba(212,175,55,0.2)] rounded-lg px-3 py-2 text-sm text-[#F5F0EB] placeholder:text-[#d0c5af]/40 focus:outline-none focus:border-[#f2ca50]"
                  />
                </div>

                {/* Modalità Canale */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#e9c176] font-semibold mb-1">
                    Modalità Preferita
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['WhatsApp', 'Videochiamata', 'In Studio (Macerata)'] as const).map((channel) => (
                      <button
                        type="button"
                        key={channel}
                        onClick={() => setBookingChannel(channel)}
                        className={`py-2 px-2 text-center text-xs rounded-lg border transition-colors ${
                          bookingChannel === channel
                            ? 'bg-[#2a292e] border-[#f2ca50] text-[#f2ca50] font-semibold'
                            : 'bg-[#1f1f23] border-[rgba(212,175,55,0.15)] text-[#d0c5af] hover:border-[rgba(212,175,55,0.3)]'
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
                    <label className="block text-[11px] uppercase tracking-wider text-[#e9c176] font-semibold mb-1">
                      Data Desiderata
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-[#1f1f23] border border-[rgba(212,175,55,0.2)] rounded-lg px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#e9c176] font-semibold mb-1">
                      Fascia Oraria
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-[#1f1f23] border border-[rgba(212,175,55,0.2)] rounded-lg px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#f2ca50]"
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
                  <label className="block text-[11px] uppercase tracking-wider text-[#e9c176] font-semibold mb-1">
                    Quesito o Intenzione (Opzionale)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Descrivi brevemente su quale area della vita desideri fare luce..."
                    value={bookingNote}
                    onChange={(e) => setBookingNote(e.target.value)}
                    className="w-full bg-[#1f1f23] border border-[rgba(212,175,55,0.2)] rounded-lg px-3 py-2 text-xs text-[#F5F0EB] placeholder:text-[#d0c5af]/40 focus:outline-none focus:border-[#f2ca50]"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg shadow-lg hover:bg-[#E5C158] transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">send</span>
                    <span>Conferma e Apri su WhatsApp (+39 379 1038253)</span>
                  </button>
                  <p className="text-[10px] text-center text-[#E2DACD]/60 mt-2">
                    Nessun pagamento anticipato richiesto in questa fase. Risposta entro poche ore.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#1B4D3E]/30 text-[#f2ca50] flex items-center justify-center mx-auto border border-[#f2ca50]/40">
                  <span className="material-symbols-outlined text-3xl">done</span>
                </div>
                <h3 className="font-serif text-2xl text-[#F5F0EB]">
                  Richiesta Inoltrata con Successo
                </h3>
                <p className="text-sm text-[#d0c5af] max-w-sm mx-auto leading-relaxed">
                  Grazie {bookingName || 'gentile ospite'}, ti stiamo reindirizzando su WhatsApp con il riepilogo della seduta per confermare data e orario con lo studio.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    className="px-6 py-2 bg-[#2a292e] text-[#F5F0EB] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#353439]"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#16161F] border border-[rgba(212,175,55,0.3)] rounded-xl max-w-lg w-full p-6 lg:p-8 relative shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsLegalModalOpen(null)}
              className="absolute top-4 right-4 text-[#d0c5af] hover:text-white"
              aria-label="Chiudi finestra"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {isLegalModalOpen === 'privacy' ? (
              <div className="space-y-4">
                <span className="text-[11px] font-semibold text-[#f2ca50] uppercase tracking-widest">
                  Informativa Legale
                </span>
                <h3 className="font-serif text-2xl text-[#F5F0EB]">
                  Privacy Policy &amp; Trattamento Dati
                </h3>
                <div className="text-xs text-[#d0c5af] space-y-3 leading-relaxed">
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
                <span className="text-[11px] font-semibold text-[#f2ca50] uppercase tracking-widest">
                  Deontologia Professionale
                </span>
                <h3 className="font-serif text-2xl text-[#F5F0EB]">
                  Disclaimer Olistico Legale
                </h3>
                <div className="text-xs text-[#d0c5af] space-y-3 leading-relaxed">
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

            <div className="pt-6 border-t border-[rgba(212,175,55,0.15)] mt-4">
              <button
                onClick={() => setIsLegalModalOpen(null)}
                className="w-full py-2 bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#E5C158]"
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
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-40 bg-[#16161F]/95 backdrop-blur-md p-5 rounded-xl border border-[rgba(212,175,55,0.35)] shadow-[0_12px_40px_rgba(0,0,0,0.7)] animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2a292e] flex-shrink-0 flex items-center justify-center text-[#f2ca50] border border-[rgba(212,175,55,0.25)]">
              <span className="material-symbols-outlined text-xl">cookie</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#f2ca50] uppercase tracking-widest">
                  Trasparenza &amp; Cookie
                </span>
                <span className="text-[10px] text-[#E2DACD]/50 font-mono">GDPR / ePrivacy</span>
              </div>
              <h4 className="font-serif text-[15px] font-semibold text-[#F5F0EB] mt-0.5 mb-1.5">
                Rispettiamo la tua riservatezza
              </h4>
              <p className="text-[12px] text-[#d0c5af] leading-relaxed mb-3">
                Utilizziamo cookie tecnici essenziali per garantire la corretta navigazione e funzionalità dello studio. Puoi scegliere liberamente se acconsentire a metriche anonime o personalizzare le tue preferenze.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleAcceptAllCookies}
                  className="px-3.5 py-1.5 bg-[#f2ca50] text-[#3c2f00] text-[11px] font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#E5C158] transition-all cursor-pointer"
                >
                  Accetta Tutti
                </button>
                <button
                  type="button"
                  onClick={handleDeclineCookies}
                  className="px-3 py-1.5 bg-[#1f1f23] text-[#F5F0EB] text-[11px] font-medium uppercase tracking-wider rounded-lg border border-[rgba(212,175,55,0.2)] hover:bg-[#2a292e] transition-all cursor-pointer"
                >
                  Solo Necessari
                </button>
                <button
                  type="button"
                  onClick={() => setIsCookieCustomizerOpen(true)}
                  className="px-2 py-1.5 text-[11px] text-[#e9c176] hover:text-[#f2ca50] underline underline-offset-2 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#16161F] border border-[rgba(212,175,55,0.35)] rounded-xl max-w-lg w-full p-6 lg:p-8 relative shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsCookieCustomizerOpen(false)}
              className="absolute top-4 right-4 text-[#d0c5af] hover:text-white"
              aria-label="Chiudi gestione cookie"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="flex items-center gap-2 text-[#f2ca50] text-[11px] font-semibold uppercase tracking-widest mb-1">
              <span className="material-symbols-outlined text-base">tune</span>
              <span>Centro Preferenze Riservatezza</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F5F0EB] mb-2">
              Configura i Tuoi Cookie
            </h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed mb-6">
              Di seguito puoi abilitare o disabilitare le diverse tipologie di cookie impiegate sul sito. I cookie necessari non possono essere disattivati in quanto fondamentali per l’accesso alle sessioni e ai moduli di prenotazione.
            </p>

            <div className="space-y-4">
              {/* Necessari */}
              <div className="p-4 bg-[#1f1f23] rounded-lg border border-[rgba(212,175,55,0.15)] flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif text-sm font-semibold text-[#F5F0EB]">Cookie Tecnici Necessari</span>
                    <span className="px-2 py-0.5 text-[9px] uppercase font-semibold bg-[#2a292e] text-[#f2ca50] rounded">
                      Sempre Attivi
                    </span>
                  </div>
                  <p className="text-[11px] text-[#E2DACD]/75 leading-relaxed">
                    Indispensabili per navigare nel sito, memorizzare le preferenze dell’utente ed eseguire in sicurezza l’inoltro delle prenotazioni verso WhatsApp.
                  </p>
                </div>
                <div className="pt-1">
                  <span className="material-symbols-outlined text-[#f2ca50] text-xl">check_box</span>
                </div>
              </div>

              {/* Analitici anonimi */}
              <div className="p-4 bg-[#1f1f23] rounded-lg border border-[rgba(212,175,55,0.15)] flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif text-sm font-semibold text-[#F5F0EB]">Misurazione &amp; Statistiche Anonime</span>
                  </div>
                  <p className="text-[11px] text-[#E2DACD]/75 leading-relaxed">
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
                  <div className="w-10 h-5 bg-[#353439] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f2ca50]"></div>
                </label>
              </div>

              {/* Preferenze */}
              <div className="p-4 bg-[#1f1f23] rounded-lg border border-[rgba(212,175,55,0.15)] flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif text-sm font-semibold text-[#F5F0EB]">Preferenze e Funzioni Avanzate</span>
                  </div>
                  <p className="text-[11px] text-[#E2DACD]/75 leading-relaxed">
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
                  <div className="w-10 h-5 bg-[#353439] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f2ca50]"></div>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(212,175,55,0.15)] mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDeclineCookies}
                className="px-4 py-2 bg-[#1f1f23] text-[#F5F0EB] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#2a292e] transition-colors"
              >
                Rifiuta Opzionali
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAllCookies}
                  className="px-4 py-2 bg-[#2a292e] text-[#f2ca50] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#353439] transition-colors border border-[rgba(212,175,55,0.25)]"
                >
                  Accetta Tutti
                </button>
                <button
                  type="button"
                  onClick={handleSaveCookiePreferences}
                  className="px-5 py-2 bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#E5C158] transition-colors shadow-sm"
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
          className="fixed bottom-4 right-4 z-40 bg-[#16161F]/90 hover:bg-[#1E1E2B] text-[#d0c5af] hover:text-[#f2ca50] p-2.5 rounded-full border border-[rgba(212,175,55,0.25)] hover:border-[#f2ca50] shadow-lg backdrop-blur-sm transition-all duration-300 group flex items-center gap-2 cursor-pointer"
          title="Gestisci preferenze cookie"
          aria-label="Gestisci preferenze cookie"
        >
          <span className="material-symbols-outlined text-lg leading-none text-[#f2ca50]">cookie</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-[#F5F0EB]">
            Cookie
          </span>
        </button>
      )}
    </div>
  );
}
