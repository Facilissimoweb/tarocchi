import React, { useState } from 'react';

interface BottomBarProps {
  onOpenBooking: () => void;
  onOpenShop?: () => void;
  cartCount?: number;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  onOpenBooking,
  onOpenShop,
  cartCount = 1,
}) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      {/* Fixed Bottom Bar - Design Minimalista a Sole Icone */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-t border-[#C5BCB3]/60 shadow-[0_-4px_20px_rgba(43,37,35,0.06)] transition-all duration-300">
        <div className="max-w-md mx-auto px-8 py-2 flex items-center justify-between">
          {/* Icona 1: Utente / Login */}
          <button
            onClick={() => setLoginModalOpen(true)}
            aria-label="Accedi / Area Riservata"
            className="group relative p-3 rounded-full text-[#6C645C] hover:text-[#2B2523] hover:bg-[#F3F1ED] transition-all duration-200 cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
              person
            </span>
            <span className="sr-only">Accedi</span>
          </button>

          {/* Icona 2: Azione Rapida CTA (Prenotazione) - Solo Icona Evidenziata Circolare */}
          <button
            onClick={onOpenBooking}
            aria-label="Prenota Consulta"
            className="group relative p-3 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] rounded-full border border-[#687866] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center -mt-2"
          >
            <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
              calendar_month
            </span>
            <span className="sr-only">Prenota Consulta</span>
          </button>

          {/* Icona 3: Carrello / Bottega con Badge Numerico */}
          <button
            onClick={onOpenShop}
            aria-label="Bottega e Carrello"
            className="group relative p-3 rounded-full text-[#6C645C] hover:text-[#2B2523] hover:bg-[#F3F1ED] transition-all duration-200 cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
              shopping_bag
            </span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-[#2B2523] text-[#F9F8F6] text-[10px] font-mono font-bold rounded-full flex items-center justify-center border border-[#F9F8F6] shadow-sm">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Carrello ({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Login Placeholder Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2523]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#F9F8F6] border border-[#C5BCB3] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-5">
            {/* Tasto Chiusura Circolare */}
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F3F1ED] border border-[#C5BCB3]/60 text-[#2B2523] hover:bg-[#E5E0D8] transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Chiudi finestra"
            >
              <span className="material-symbols-outlined text-base font-bold">close</span>
            </button>

            <div className="text-center pt-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#F3F1ED] border border-[#C5BCB3] flex items-center justify-center mb-3 text-[#7A8B78]">
                <span className="material-symbols-outlined text-2xl">person</span>
              </div>
              <h3 className="font-serif text-xl font-bold tracking-wider text-[#2B2523] uppercase">
                Area Riservata
              </h3>
              <p className="text-xs text-[#6C645C] font-mono mt-1">
                Accedi per consultare lo storico letture e appuntamenti
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Area riservata in fase di collegamento con Supabase.');
                setLoginModalOpen(false);
              }}
              className="flex flex-col gap-4 mt-2"
            >
              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6C645C] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@esempio.it"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E0D8] focus:border-[#7A8B78] rounded-xl text-xs text-[#2B2523] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6C645C] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E0D8] focus:border-[#7A8B78] rounded-xl text-xs text-[#2B2523] outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] text-xs font-semibold uppercase tracking-[0.16em] rounded-xl border border-[#687866] shadow-md transition-all duration-300 cursor-pointer"
              >
                Accedi (Demo)
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
