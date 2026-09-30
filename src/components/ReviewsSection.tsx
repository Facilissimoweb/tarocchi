import React, { useState } from 'react';
import { BrandSectionDivider } from './BrandSeal';
import reviewsData from '../data/reviews.json';

export interface Review {
  id: string;
  author: string;
  avatarUrl?: string;
  rating: number;
  date: string;
  text: string;
  serviceType: string;
  isGoogleVerified: boolean;
}

export function ReviewsSection() {
  const reviews: Review[] = reviewsData;
  const GOOGLE_PROFILE_URL = "https://share.google/EkCkev741rafYgxQl";
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(r => r.rating === filterRating);

  return (
    <section className="w-full bg-[#0C0714] py-20 border-t border-[#8A2BE2]/20">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
        <BrandSectionDivider title="Tarot Italia • Recensioni Google Business Profile" />

        {/* Header & Google Business Summary Bar */}
        <div className="bg-[#130924]/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-[#8A2BE2]/40 shadow-[0_0_30px_rgba(138,43,226,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* Google G / Badge Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 p-3 flex items-center justify-center shadow-inner shrink-0">
              <svg className="w-10 h-10" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-widest text-[#00F0FF] mb-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Google Business Profile Ufficiale</span>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                <span>Valutazione 5.0</span>
                <span className="flex items-center text-[#FBBC04]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-xl sm:text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#A69BB5] mt-1">
                Recensioni reali e verificate rilasciate dai nostri consultanti su Google
              </p>
            </div>
          </div>

          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#1C0F33] hover:bg-[#251245] text-white hover:text-[#00F0FF] text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-[#00F0FF]/40 hover:border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.25)] shrink-0"
          >
            <span className="material-symbols-outlined text-base text-[#00F0FF]">rate_review</span>
            <span>Vedi Tutte su Google</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#8A2BE2]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A69BB5]">
            Mostrando {filteredReviews.length} recensioni verificate
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A69BB5] hidden sm:inline">Filtra per stelle:</span>
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterRating === 'all'
                  ? 'bg-[#00F0FF] text-[#0C0714] font-bold shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                  : 'bg-[#1C0F33] text-[#A69BB5] hover:text-white border border-[#8A2BE2]/30'
              }`}
            >
              Tutte
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                filterRating === 5
                  ? 'bg-[#00F0FF] text-[#0C0714] font-bold shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                  : 'bg-[#1C0F33] text-[#A69BB5] hover:text-white border border-[#8A2BE2]/30'
              }`}
            >
              <span>5</span>
              <span className="material-symbols-outlined text-xs text-[#FBBC04]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </button>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#130924]/90 backdrop-blur-xl p-6 rounded-2xl border border-[#8A2BE2]/40 hover:border-[#00F0FF]/60 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
            >
              <div>
                {/* Top Card Info: Stars & Google Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-0.5 text-[#FBBC04]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>

                  {rev.isGoogleVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1C0F33] border border-[#00F0FF]/30 text-[#00F0FF] text-[10px] font-mono font-semibold uppercase tracking-wider">
                      <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Google</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-[14px] text-[#F5F0EB] italic leading-relaxed mb-6">
                  “{rev.text}”
                </p>
              </div>

              {/* Author & Service Info */}
              <div className="pt-4 border-t border-[#8A2BE2]/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1C0F33] flex items-center justify-center font-serif text-[#00F0FF] font-bold border border-[#00F0FF]/30 shrink-0">
                    {rev.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-[15px] text-white font-semibold leading-tight">
                      {rev.author}
                    </span>
                    <span className="text-[11px] text-[#A69BB5] mt-0.5">
                      {rev.serviceType}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-[#A69BB5] font-mono shrink-0">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
