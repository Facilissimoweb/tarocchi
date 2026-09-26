import React, { useState } from 'react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogData';
import { BrandSeal, BrandSectionDivider } from './BrandSeal';

interface BlogSectionProps {
  onBackToHome: () => void;
  onOpenBooking: (serviceName: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onBackToHome, onOpenBooking }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');

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
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(212,175,55,0.15)]">
          <button
            onClick={() => { setSelectedArticleId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#f2ca50] hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Torna agli Articoli del Blog
          </button>
          <span className="text-xs uppercase tracking-widest text-[#E2DACD]/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
            {selectedArticle.category}
          </span>
        </div>

        {/* Article Header */}
        <article className="bg-[#16161F] p-6 sm:p-10 lg:p-12 rounded-xl border border-[rgba(212,175,55,0.25)] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f2ca50]/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Official Brand Header inside Article */}
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[rgba(212,175,55,0.15)]">
            <BrandSeal size="sm" glow={true} />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm text-[#f2ca50] uppercase tracking-wider">
                Tarot Italia Journal
              </span>
              <span className="text-[10px] text-[#E2DACD]/70 uppercase tracking-widest">
                Pubblicazione Ufficiale • Studio Macerata
              </span>
            </div>
          </div>

          {/* Meta header */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#e9c176] mb-4">
            <span className="px-2.5 py-1 bg-[#1f1f23] rounded-md font-mono text-[11px] text-[#f2ca50] border border-[rgba(212,175,55,0.2)]">
              {selectedArticle.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#d0c5af]">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              {selectedArticle.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#d0c5af]">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {selectedArticle.readTime} di lettura
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F0EB] leading-tight mb-4">
            {selectedArticle.title}
          </h1>

          <p className="text-sm sm:text-base text-[#d0c5af] leading-relaxed italic mb-8 pb-6 border-b border-[rgba(212,175,55,0.15)]">
            {selectedArticle.subtitle}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3 mb-8 p-4 bg-[#1f1f23] rounded-lg border border-[rgba(212,175,55,0.15)]">
            <div className="w-11 h-11 rounded-full bg-[#2a292e] flex items-center justify-center text-[#f2ca50] font-serif font-bold text-lg border border-[rgba(212,175,55,0.3)]">
              {selectedArticle.author.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm font-semibold text-[#F5F0EB]">
                  Autore: {selectedArticle.author}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#1B4D3E] bg-[#F5F0EB] font-bold px-2 py-0.5 rounded">
                  Tarot Italia
                </span>
              </div>
              <p className="text-[11px] text-[#d0c5af] mt-0.5">
                {selectedArticle.authorRole}
              </p>
            </div>
          </div>

          {/* Article Lead Image if present */}
          <div className="relative w-full aspect-[16/9] max-h-80 rounded-xl overflow-hidden mb-8 border border-[rgba(212,175,55,0.2)] bg-[#1f1f23]">
            <img
              src={selectedArticle.coverImage}
              alt={selectedArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-105 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16161F] via-transparent to-transparent"></div>
          </div>

          {/* Article Text Content */}
          <div className="space-y-6 text-[#d0c5af] text-[15px] sm:text-[16px] leading-relaxed">
            <p className="font-serif text-lg text-[#F5F0EB] leading-relaxed bg-[#1f1f23]/60 p-5 rounded-lg border-l-2 border-[#f2ca50]">
              {selectedArticle.content.intro}
            </p>

            {selectedArticle.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-3 pt-4">
                <h2 className="font-serif text-xl sm:text-2xl text-[#f2ca50] tracking-wide">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            ))}

            {/* Sacred Quote */}
            <div className="my-8 py-6 px-6 sm:px-8 bg-[#1f1f23] rounded-xl border border-[rgba(212,175,55,0.3)] shadow-md text-center">
              <span className="material-symbols-outlined text-3xl text-[#f2ca50] mb-2 block">format_quote</span>
              <p className="font-serif text-lg sm:text-xl text-[#F5F0EB] italic leading-relaxed">
                {selectedArticle.content.quote}
              </p>
              <span className="text-[11px] uppercase tracking-widest text-[#e9c176] block mt-3 font-semibold">
                — {selectedArticle.author}, Tarot Italia Macerata
              </span>
            </div>

            {/* Conclusion */}
            <div className="pt-2">
              <h3 className="font-serif text-xl text-[#F5F0EB] mb-2">Considerazioni Conclusive</h3>
              <p>{selectedArticle.content.conclusion}</p>
            </div>

            {/* Key Takeaways Box */}
            <div className="mt-8 p-6 bg-[#1f1f23] rounded-xl border border-[rgba(212,175,55,0.2)]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f2ca50] mb-3">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Punti Chiave per la Tua Pratica</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#E2DACD]">
                {selectedArticle.content.keyTakeaways.map((item, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-[#f2ca50] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-[rgba(212,175,55,0.15)] flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#E2DACD]/60 mr-2">Temi:</span>
              {selectedArticle.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 bg-[#1f1f23] text-xs text-[#d0c5af] rounded-full border border-[rgba(212,175,55,0.15)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive CTA to connect or book */}
          <div className="mt-10 p-6 sm:p-8 bg-[#1f1f23] rounded-xl border border-[rgba(212,175,55,0.3)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h4 className="font-serif text-lg text-[#F5F0EB] mb-1">
                Vuoi approfondire questo tema in una sessione individuale?
              </h4>
              <p className="text-xs text-[#d0c5af]">
                Prenota un’ora di ascolto con Teresa o una consulenza rituale con Maura nello studio di Macerata o via WhatsApp.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking(`Consulto con focus su: ${selectedArticle.title}`)}
              className="px-5 py-2.5 bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#E5C158] transition-all shadow-md whitespace-nowrap cursor-pointer"
            >
              Prenota Sessione (1h)
            </button>
          </div>
        </article>
      </section>
    );
  }

  // DEFAULT VIEW: LIST OF 3 BLOG ARTICLES
  return (
    <section className="max-w-[1240px] mx-auto px-4 lg:px-12 py-8 lg:py-12 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(212,175,55,0.15)]">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#f2ca50] hover:underline cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Torna alla Home
        </button>
        <span className="text-xs uppercase tracking-widest text-[#E2DACD]/60 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
          Grimorio &amp; Guide Simboliche
        </span>
      </div>

      {/* Hero Narrative of Blog */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <BrandSectionDivider title="Grimorio Ufficiale Tarot Italia" size="md" className="mb-2" />
        <span className="text-[12px] font-semibold text-[#f2ca50] uppercase tracking-widest">
          ◆ Conoscenza &amp; Approfondimento
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F0EB] mt-1 mb-3">
          Il Blog degli Arcani &amp; Folklore
        </h1>
        <p className="text-sm text-[#d0c5af] leading-relaxed">
          Articoli, saggi e guide pratiche scritti da <strong>Teresa</strong> e <strong>Maura</strong> per comprendere il potere trasformativo dei simboli, la cura degli spazi energetici e le antiche tradizioni dell'Appennino marchigiano.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#f2ca50] text-[#3c2f00] font-semibold shadow-md'
                : 'bg-[#16161F] text-[#d0c5af] border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-[#16161F] rounded-xl overflow-hidden border border-[rgba(212,175,55,0.2)] hover:border-[#f2ca50] shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1"
          >
            {/* Cover Image */}
            <div className="relative w-full h-48 overflow-hidden bg-[#1f1f23]">
              <img
                src={article.coverImage}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16161F] via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 bg-[#353439]/90 backdrop-blur-md px-2.5 py-1 rounded text-[#f2ca50] text-[10px] font-medium uppercase tracking-widest border border-[rgba(212,175,55,0.2)]">
                {article.category}
              </div>
              <div className="absolute top-3 right-3 bg-[#1B4D3E]/90 text-[#F5F0EB] px-2.5 py-1 rounded text-[10px] font-medium">
                {article.readTime}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-[11px] text-[#e9c176] mb-2">
                <span>{article.date}</span>
                <span>•</span>
                <span className="text-[#F5F0EB] font-semibold">{article.author}</span>
              </div>

              <h2 className="font-serif text-xl text-[#F5F0EB] group-hover:text-[#f2ca50] transition-colors mb-2 line-clamp-2">
                {article.title}
              </h2>

              <p className="text-xs text-[#d0c5af] leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                {article.tags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] px-2 py-0.5 bg-[#1f1f23] text-[#d0c5af] rounded border border-[rgba(212,175,55,0.1)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Read button */}
              <button
                onClick={() => { setSelectedArticleId(article.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full py-2.5 bg-[#1f1f23] text-[#f2ca50] group-hover:bg-[#f2ca50] group-hover:text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg border border-[rgba(212,175,55,0.2)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Leggi Articolo Completo</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
