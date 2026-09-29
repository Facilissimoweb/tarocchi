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
      <section className="max-w-[1000px] mx-auto px-4 lg:px-8 py-8 lg:py-12 animate-in fade-in duration-300 text-[#2B2523]">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E0D8]">
          <button
            onClick={() => { setSelectedArticleId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#2B2523] hover:text-[#6C645C] transition-colors cursor-pointer font-mono font-semibold"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Torna agli Articoli del Journal
          </button>
          <span className="text-xs uppercase tracking-widest text-[#6C645C] flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C808E]"></span>
            {selectedArticle.category}
          </span>
        </div>

        <BrandSectionDivider title="Tarot Italia • Journal & Articoli" className="mb-8" />

        {/* Article Header */}
        <article className="bg-[#FFFFFF] p-6 sm:p-10 lg:p-12 rounded-2xl border border-[#E5E0D8] shadow-sm relative overflow-hidden">

          {/* Official Brand Header inside Article */}
          <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-[#E5E0D8]">
            <BrandSeal size="sm" glow={false} />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm text-[#2B2523] uppercase tracking-wider">
                Tarot Italia Journal
              </span>
              <span className="text-[10px] text-[#6C645C] uppercase tracking-widest font-mono">
                Pubblicazione Ufficiale • Studio Macerata
              </span>
            </div>
          </div>

          {/* Meta header */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#6C645C] mb-4">
            <span className="px-2.5 py-1 bg-[#F3F1ED] rounded-md font-mono text-[11px] text-[#2B2523] border border-[#E5E0D8]">
              {selectedArticle.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#8C808E]">schedule</span>
              {selectedArticle.readTime} di lettura
            </span>
            <span>•</span>
            <span className="text-[#2B2523] font-medium">{selectedArticle.author}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl text-[#2B2523] leading-tight mb-4 font-bold">
            {selectedArticle.title}
          </h1>

          <p className="text-base sm:text-lg text-[#6C645C] font-serif italic mb-6 pb-6 border-b border-[#E5E0D8] leading-relaxed">
            "{selectedArticle.subtitle}"
          </p>

          {/* Cover image */}
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 border border-[#E5E0D8] shadow-sm relative">
            <img
              src={selectedArticle.coverImage}
              alt={selectedArticle.title}
              className="w-full h-full object-cover filter contrast-105"
            />
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-[#2B2523] text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-lg text-[#2B2523] border-l-2 border-[#2B2523] pl-4 py-1">
              {selectedArticle.content.intro}
            </p>

            {selectedArticle.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-3 pt-4">
                <h3 className="font-serif text-xl sm:text-2xl text-[#2B2523] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8C808E]"></span>
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
            <div className="my-8 p-6 bg-[#F9F8F6] rounded-xl border-l-4 border-[#8C808E] border-y border-r border-[#E5E0D8] text-center relative">
              <p className="font-serif text-lg sm:text-xl text-[#2B2523] italic relative z-10">
                "{selectedArticle.content.quote}"
              </p>
              <span className="block text-xs uppercase tracking-widest text-[#6C645C] mt-3 font-mono">
                — {selectedArticle.author}, {selectedArticle.authorRole}
              </span>
            </div>

            <div className="pt-4">
              <h3 className="font-serif text-xl text-[#2B2523] font-bold mb-2">Conclusione</h3>
              <p className="text-[#6C645C] leading-relaxed">
                {selectedArticle.content.conclusion}
              </p>
            </div>

            {/* Key Takeaways Box */}
            <div className="mt-8 p-6 bg-[#F3F1ED] rounded-xl border border-[#E5E0D8]">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#2B2523] mb-3 flex items-center gap-1.5 font-mono">
                <span className="material-symbols-outlined text-sm text-[#8C808E]">stars</span>
                Punti Chiave per la Pratica:
              </h4>
              <ul className="space-y-2 text-sm text-[#2B2523]">
                {selectedArticle.content.keyTakeaways.map((point, kIdx) => (
                  <li key={kIdx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-[#8C808E] mt-0.5">check_circle</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tags & Social Share Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 mt-8 border-t border-[#E5E0D8]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#6C645C] mr-1 font-mono uppercase tracking-wider">Temi:</span>
              {selectedArticle.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 bg-[#F3F1ED] rounded-lg text-xs text-[#2B2523] border border-[#E5E0D8] font-mono"
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
                className="p-2 bg-[#F3F1ED] hover:bg-[#E5E0D8] text-[#2B2523] rounded-xl border border-[#E5E0D8] transition-all flex items-center justify-center cursor-pointer"
                title="Condividi su WhatsApp"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
              </a>

              {/* Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(selectedArticle.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#F3F1ED] hover:bg-[#E5E0D8] text-[#2B2523] rounded-xl border border-[#E5E0D8] transition-all flex items-center justify-center cursor-pointer"
                title="Condividi su Telegram"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </a>

              {/* Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-[#D8CDE2] hover:bg-[#C9BBD7] text-[#2B2523] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-[#C5BCB3]"
                title="Copia link articolo"
              >
                <span className="material-symbols-outlined text-sm">link</span>
                <span>{copiedLink ? 'Copiato!' : 'Copia Link'}</span>
              </button>
            </div>
          </div>

          {/* Author Bio Box */}
          <div className="mt-10 p-6 bg-[#F9F8F6] rounded-xl border border-[#E5E0D8] flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <BrandSeal size="md" glow={false} className="flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="font-serif text-base text-[#2B2523] font-bold">
                Scritto da {selectedArticle.author}
              </h4>
              <p className="text-xs text-[#8C808E] font-medium font-mono uppercase tracking-wider">
                {selectedArticle.authorRole}
              </p>
              <p className="text-xs text-[#6C645C] leading-relaxed pt-1">
                Laureata all’Accademia di Belle Arti di Macerata, unisce la semiotica dell'immagine con oltre un decennio di pratica nei tarocchi introspettivi e canalizzazioni archetipiche.
              </p>
            </div>
          </div>

          {/* CTA Box at Bottom of Article */}
          <div className="mt-10 p-6 bg-[#F3F1ED] rounded-xl border border-[#C5BCB3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg text-[#2B2523] font-bold">
                Desideri esplorare questo tema nella tua vita?
              </h4>
              <p className="text-xs text-[#6C645C]">
                Prenota un consulto individuale personalizzato via WhatsApp o in Studio a Macerata.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking(`Consulto ispirato a "${selectedArticle.title}"`)}
              className="px-5 py-2.5 bg-[#D8CDE2] hover:bg-[#C9BBD7] text-[#2B2523] text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap border border-[#C5BCB3]"
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
    <section className="max-w-[1240px] mx-auto px-4 lg:px-12 py-10 lg:py-14 animate-in fade-in duration-300 text-[#2B2523]">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E0D8]">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#2B2523] hover:text-[#6C645C] transition-colors cursor-pointer font-mono font-semibold"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Torna alla Home
        </button>
        <span className="text-xs uppercase tracking-widest text-[#6C645C] font-mono">
          Tarot Italia Journal • {filteredArticles.length} Articoli
        </span>
      </div>

      <BrandSectionDivider title="Tarot Italia • Archivio Simbolico & Journal" className="mb-8" />

      {/* Hero Narrative of Blog */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[12px] font-semibold text-[#8C808E] uppercase tracking-widest flex items-center justify-center gap-1.5 font-mono">
          <span className="material-symbols-outlined text-sm">menu_book</span>
          <span>Archivio Simbolico &amp; Divinatorio</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2B2523] mt-1.5 mb-3 font-bold">
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
                ? 'bg-[#2B2523] text-[#F9F8F6] shadow-sm'
                : 'bg-[#FFFFFF] text-[#6C645C] hover:text-[#2B2523] border border-[#E5E0D8] hover:border-[#C5BCB3]'
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
            className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E5E0D8] hover:border-[#C5BCB3] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Cover Image */}
              <div className="w-full aspect-[16/10] overflow-hidden relative">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#F9F8F6]/90 backdrop-blur-sm rounded text-[10px] uppercase font-mono tracking-wider text-[#2B2523] border border-[#E5E0D8]">
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
                <h2 className="font-serif text-lg sm:text-xl text-[#2B2523] font-bold leading-snug group-hover:text-[#8C808E] transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-xs text-[#6C645C] line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#E5E0D8]">
              <span className="text-xs text-[#2B2523] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
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
