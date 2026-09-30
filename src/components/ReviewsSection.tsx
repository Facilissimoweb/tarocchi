import React, { useState } from 'react';
import reviewsData from '../data/reviews.json';
import { BrandSectionDivider } from './BrandSeal';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  service?: string;
  location?: string;
  text: string;
}

const GOOGLE_PROFILE_URL = "https://share.google/EkCkev741rafYgxQl";

export const ReviewsSection: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const reviews: Review[] = reviewsData;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, reviews.length));
  };

  return (
    <section className="w-full bg-[#0C0714] py-20 border-t border-[#8A2BE2]/20" id="recensioni">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-10">
        <BrandSectionDivider title="Tarot Italia • Esperienze & Recensioni Google" />

        {/* Header & Overall Google Score Card */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#130924]/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-[#8A2BE2]/40 shadow-[0_0_30px_rgba(138,43,226,0.15)]">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[#00F0FF] font-mono text-xs font-semibold uppercase tracking-widest justify-center md:justify-start">
              {/* Google G Logo icon in SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google Business Profile • Recensioni Reali</span>
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold">
              La Voce di Chi Ha Camminato con Noi
            </h2>
            <p className="text-xs sm:text-sm text-[#A69BB5] max-w-xl">
              Tutte le testimonianze provengono direttamente dalla nostra scheda verificata su Google Business Profile.
            </p>
          </div>

          {/* Score Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#1C0F33] p-4 sm:p-5 rounded-xl border border-[#00F0FF]/30 text-center sm:text-left shadow-md">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-mono text-white leading-none">5.0</span>
              {/* Google Yellow Stars */}
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#FBBC04] text-lg leading-none">★</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 border-t sm:border-t-0 sm:border-l border-[#8A2BE2]/30 pt-2 sm:pt-0 sm:pl-4">
              <span className="text-xs font-semibold text-white">Eccellente • 68 Recensioni</span>
              <span className="text-[11px] text-[#A69BB5]">Valutazione media Verificata Google</span>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#00F0FF] hover:text-[#FF007F] transition-colors"
              >
                <span>Vedi profilo ufficiale Google</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, visibleCount).map((rev) => (
            <div
              key={rev.id}
              className="bg-[#130924]/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl shadow-xl flex flex-col justify-between gap-4 border border-[#8A2BE2]/40 hover:border-[#00F0FF]/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300"
            >
              <div className="flex flex-col gap-3">
                {/* Top Row: Stars + Google Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i} className="text-[#FBBC04] text-base leading-none">★</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1C0F33] text-[10px] font-mono font-medium text-[#00F0FF] border border-[#00F0FF]/30">
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    Google
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-[15px] text-[#F5F0EB] italic leading-relaxed">
                  “{rev.text}”
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="pt-3 border-t border-[#8A2BE2]/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1C0F33] border border-[#00F0FF]/30 flex items-center justify-center font-serif text-[#00F0FF] font-bold text-base shadow-sm">
                  {rev.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-semibold text-white">
                    {rev.author}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-[#A69BB5]">
                    <span>{rev.service || rev.location}</span>
                    <span>•</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Controls: Show More / Visit Google Profile */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {visibleCount < reviews.length && (
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-[#1C0F33] hover:bg-[#130924] text-white hover:text-[#00F0FF] text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#8A2BE2]/40 hover:border-[#00F0FF] transition-all cursor-pointer shadow-md"
            >
              Mostra Altre Recensioni
            </button>
          )}

          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            </svg>
            <span>Leggi Tutte le 68 Recensioni su Google</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
};
