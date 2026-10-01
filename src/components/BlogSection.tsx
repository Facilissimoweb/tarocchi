import React, { useState } from 'react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogData';
import { BrandSeal, BrandSectionDivider } from './BrandSeal';

interface BlogSectionProps {
  onBackToHome: () => void;
  onOpenBooking: (serviceName: string) => void;
  initialSelectedArticleId?: string | null;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onBackToHome, onOpenBooking, initialSelectedArticleId }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(initialSelectedArticleId || null);

  React.useEffect(() => {
    if (initialSelectedArticleId) {
      setSelectedArticleId(initialSelectedArticleId);
    }
  }, [initialSelectedArticleId]);
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const categories = ['Tutti', 'Tarologia & Archetipi', 'Radiestesia & Geometria Sacra', 'Folklore & Tradizione Popolare'];

  const filteredArticles = activeCategory === 'Tutti'
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter(a => a.category === activeCategory);

  const selectedArticle = BLOG_ARTICLES.find(a => a.id === selectedArticleId);

  // If an article is currently open for full reading
  if (selectedArticle) {
    return (
      <section className="max-w-[1000px] mx-auto px-4 lg:px-8 py-8 lg:py-12 animate-in fade-in duration-300">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C5BCB3]/30">
          <button
            onClick={() => { setSelectedArticleId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A8B78] hover:text-[#7A8B78] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Torna agli Articoli del Blog
          </button>
          <span className="text-xs uppercase tracking-widest text-[#6C645C] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B78] animate-pulse"></span>
            {selectedArticle.category}
          </span>
        </div>

        <BrandSectionDivider title="Tarot Italia • Journal & Articoli" className="mb-8" />

        {/* Article Header */}
        <article className="bg-[#FFFFFF]/90 backdrop-blur-xl p-6 sm:p-10 lg:p-12 rounded-2xl border border-[#C5BCB3]/40 shadow-[0_0_30px_rgba(197,188,179,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7A8B78]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Official Brand Header inside Article */}
          <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-[#C5BCB3]/30">
            <BrandSeal size="sm" glow={true} />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm bg-gradient-to-r from-[#7A8B78] to-[#7A8B78] bg-clip-text text-transparent uppercase tracking-wider">
                Tarot Italia Journal
              </span>
              <span className="text-[10px] text-[#6C645C] uppercase tracking-widest">
                Pubblicazione Ufficiale • Studio Macerata
              </span>
            </div>
          </div>

          {/* Meta header */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#6C645C] mb-4">
            <span className="px-2.5 py-1 bg-[#F4F2EE] rounded-md font-mono text-[11px] text-[#7A8B78] border border-[#7A8B78]/30">
              {selectedArticle.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#7A8B78]">schedule</span>
              {selectedArticle.readTime} di lettura
            </span>
            <span>•</span>
            <span className="text-[#7A8B78] font-medium">{selectedArticle.author}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl text-[#2B2523] leading-tight mb-4">
            {selectedArticle.title}
          </h1>

          <p className="text-base sm:text-lg text-[#7A8B78]/90 font-medium italic mb-6 pb-6 border-b border-[#C5BCB3]/30 leading-relaxed">
            "{selectedArticle.subtitle}"
          </p>

          {/* Cover image */}
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 border border-[#C5BCB3]/40 shadow-lg relative">
            <img
              src={selectedArticle.coverImage}
              alt={selectedArticle.title}
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6] via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-[#2B2523] text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-lg text-[#2B2523] border-l-4 border-[#7A8B78] pl-4 py-1">
              {selectedArticle.content.intro}
            </p>

            {selectedArticle.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-3 pt-4">
                <h3 className="font-serif text-xl sm:text-2xl text-[#2B2523] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7A8B78]"></span>
                  {section.heading}
                </h3>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-[#6C645C] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {/* Quote Callout */}
            <div className="my-8 p-6 bg-[#F4F2EE] rounded-xl border border-[#7A8B78]/40 shadow-[0_0_20px_rgba(122,139,120,0.2)] text-center relative overflow-hidden">
              <span className="material-symbols-outlined text-4xl text-[#7A8B78]/30 absolute top-2 left-3 select-none">
                format_quote
              </span>
              <p className="font-serif text-lg sm:text-xl text-[#2B2523] italic relative z-10">
                "{selectedArticle.content.quote}"
              </p>
              <span className="block text-xs uppercase tracking-widest text-[#7A8B78] mt-3 font-mono">
                — {selectedArticle.author}, {selectedArticle.authorRole}
              </span>
            </div>

            <div className="pt-4">
              <h3 className="font-serif text-xl text-[#2B2523] mb-2">Conclusione</h3>
              <p className="text-[#6C645C] leading-relaxed">
                {selectedArticle.content.conclusion}
              </p>
            </div>

            {/* Key Takeaways Box */}
            <div className="mt-8 p-6 bg-[#F4F2EE] rounded-xl border border-[#C5BCB3]/50">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#7A8B78] mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">stars</span>
                Punti Chiave per la Pratica:
              </h4>
              <ul className="space-y-2 text-sm text-[#2B2523]">
                {selectedArticle.content.keyTakeaways.map((point, kIdx) => (
                  <li key={kIdx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-[#7A8B78] mt-0.5">check_circle</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tags & Social Share Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 mt-8 border-t border-[#C5BCB3]/30">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#6C645C] mr-1 font-mono uppercase tracking-wider">Temi:</span>
              {selectedArticle.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 bg-[#F4F2EE] rounded-lg text-xs text-[#7A8B78] border border-[#7A8B78]/30 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Social Share Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#6C645C] mr-1 font-mono uppercase tracking-wider">Condividi:</span>

              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${selectedArticle.title} - ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#F4F2EE] hover:bg-[#E5DFD9] text-[#7A8B78] hover:text-[#2B2523] rounded-xl border border-[#7A8B78]/30 hover:border-[#7A8B78] transition-all flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(122,139,120,0.2)]"
                title="Condividi su WhatsApp"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
              </a>

              {/* Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(selectedArticle.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#F4F2EE] hover:bg-[#E5DFD9] text-[#7A8B78] hover:text-[#2B2523] rounded-xl border border-[#7A8B78]/30 hover:border-[#7A8B78] transition-all flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(122,139,120,0.2)]"
                title="Condividi su Telegram"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#F4F2EE] hover:bg-[#E5DFD9] text-[#7A8B78] hover:text-[#2B2523] rounded-xl border border-[#7A8B78]/30 hover:border-[#7A8B78] transition-all flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(122,139,120,0.2)]"
                title="Condividi su Facebook"
              >
                <span className="material-symbols-outlined text-sm">share</span>
              </a>

              {/* X / Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedArticle.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#F4F2EE] hover:bg-[#E5DFD9] text-[#7A8B78] hover:text-[#2B2523] rounded-xl border border-[#7A8B78]/30 hover:border-[#7A8B78] transition-all flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(122,139,120,0.2)]"
                title="Condividi su X"
              >
                <span className="material-symbols-outlined text-sm">tag</span>
              </a>

              {/* Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_12px_rgba(122,139,120,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
                title="Copia link articolo"
              >
                <span className="material-symbols-outlined text-sm">link</span>
                <span>{copiedLink ? 'Copiato!' : 'Copia Link'}</span>
              </button>
            </div>
          </div>

          {/* Author Bio Box */}
          <div className="mt-10 p-6 bg-[#F4F2EE] rounded-xl border border-[#C5BCB3]/40 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <BrandSeal size="md" glow={true} className="flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="font-serif text-base text-[#2B2523] font-semibold">
                Scritto da {selectedArticle.author}
              </h4>
              <p className="text-xs text-[#7A8B78] font-medium">
                {selectedArticle.authorRole}
              </p>
              <p className="text-xs text-[#6C645C] leading-relaxed pt-1">
                Laureata all’Accademia di Belle Arti di Macerata, unisce la semiotica dell'immagine con oltre un decennio di pratica nei tarocchi introspettivi e canalizzazioni archetipiche.
              </p>
            </div>
          </div>

          {/* CTA Box at Bottom of Article */}
          <div className="mt-10 p-6 bg-gradient-to-r from-[#F4F2EE] to-[#F4F2EE] rounded-xl border border-[#7A8B78]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg text-[#2B2523] font-semibold">
                Desideri esplorare questo tema nella tua vita?
              </h4>
              <p className="text-xs text-[#6C645C]">
                Prenota un consulto individuale personalizzato via WhatsApp o in Studio a Macerata.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking(`Consulto ispirato a "${selectedArticle.title}"`)}
              className="px-5 py-2.5 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] text-xs font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(122,139,120,0.5)] transition-all cursor-pointer whitespace-nowrap"
            >
              Prenota Sessione Dedicata
            </button>
          </div>
        </article>
      </section>
    );
  }

  // Articles Grid List
  return (
    <section className="max-w-[1240px] mx-auto px-4 lg:px-12 py-10 lg:py-14 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C5BCB3]/30">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A8B78] hover:text-[#7A8B78] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Torna alla Home
        </button>
        <span className="text-xs uppercase tracking-widest text-[#6C645C] font-mono">
          Tarot Italia Journal • {filteredArticles.length} Articoli
        </span>
      </div>

      <BrandSectionDivider title="Tarot Italia • Archivio Simbolico & Blog" className="mb-8" />

      {/* Hero Narrative of Blog */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[12px] font-semibold text-[#7A8B78] uppercase tracking-widest flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-sm">menu_book</span>
          <span>Archivio Simbolico &amp; Divinatorio</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2B2523] mt-1.5 mb-3">
          Tarot Italia Journal: Voci e Simboli
        </h1>
        <p className="text-sm text-[#6C645C] leading-relaxed">
          Approfondimenti culturali, semiotica dell'immagine, tarologia introspettiva e tradizioni esoteriche marchigiane a cura di <strong>Teresa</strong> e <strong>Maura</strong>.
        </p>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#7A8B78] text-[#F9F8F6] shadow-[0_0_15px_rgba(122,139,120,0.5)]'
                : 'bg-[#FFFFFF] text-[#6C645C] hover:text-[#7A8B78] border border-[#C5BCB3]/40 hover:border-[#7A8B78]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => { setSelectedArticleId(article.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group bg-[#FFFFFF]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#C5BCB3]/40 hover:border-[#7A8B78] shadow-xl hover:shadow-[0_0_25px_rgba(122,139,120,0.25)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Cover Image */}
              <div className="w-full aspect-[16/10] overflow-hidden relative">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#F9F8F6]/85 backdrop-blur-sm rounded text-[10px] uppercase font-mono tracking-wider text-[#7A8B78] border border-[#7A8B78]/30">
                  {article.category}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-[11px] text-[#6C645C] font-mono mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="font-serif text-lg sm:text-xl text-[#2B2523] font-semibold leading-snug group-hover:text-[#7A8B78] transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-xs text-[#6C645C] line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#C5BCB3]/20">
              <span className="text-xs text-[#7A8B78] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Leggi Articolo Completo</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
              <span className="text-[10px] font-mono text-[#6C645C]">di {article.author}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
