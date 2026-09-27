import React, { useState } from 'react';
import { SHOP_PRODUCTS, ShopProduct } from '../data/shopData';
import { BrandSeal, BrandSectionDivider } from './BrandSeal';

interface ShopSectionProps {
  onBackToHome: () => void;
  initialCategory?: string;
  onOpenPrivacy?: () => void;
  onOpenCookie?: () => void;
}

interface CategoryFilter {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const CATEGORY_FILTERS: CategoryFilter[] = [
  {
    id: 'Tutti',
    label: 'Tutti',
    icon: 'auto_awesome',
    description: 'Tutti gli articoli della bottega'
  },
  {
    id: 'Strumenti',
    label: 'Strumenti',
    icon: 'explore',
    description: 'Pendoli e strumenti di divinazione'
  },
  {
    id: 'Erbe',
    label: 'Erbe',
    icon: 'eco',
    description: 'Botanica spontanea dei Sibillini e tisane'
  },
  {
    id: 'Consacrati',
    label: 'Consacrati',
    icon: 'verified',
    description: 'Caricati ed equilibrati ritualmente in studio'
  },
  {
    id: 'Rituali',
    label: 'Rituali',
    icon: 'local_fire_department',
    description: 'Candele in cera vergine e preparati rituali'
  },
  {
    id: 'Tarocchi',
    label: 'Tarocchi',
    icon: 'style',
    description: 'Mazzi di tarocchi storici e riedizioni d’arte'
  }
];

export const ShopSection: React.FC<ShopSectionProps> = ({ onBackToHome, initialCategory = 'Tutti', onOpenPrivacy, onOpenCookie }) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [cartItems, setCartItems] = useState<{ product: ShopProduct; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 2800);
  };

  const getFilterCount = (catId: string) => {
    if (catId === 'Tutti') return SHOP_PRODUCTS.length;
    return SHOP_PRODUCTS.filter(
      p => p.category === catId || (p.filterTags && (p.filterTags as string[]).includes(catId))
    ).length;
  };

  const filteredProducts = SHOP_PRODUCTS.filter(product => {
    const matchesCategory =
      activeCategory === 'Tutti' ||
      product.category === activeCategory ||
      (product.filterTags && (product.filterTags as string[]).includes(activeCategory));

    const matchesSearch =
      searchQuery.trim() === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.filterTags &&
        product.filterTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: ShopProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showNotification(`Aggiunto al carrello: ${product.title}`);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ShopProduct; quantity: number }[]
    );
  };

  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleDirectOrderWhatsapp = (product: ShopProduct) => {
    const phone = '393791038253';
    const text = encodeURIComponent(
      `Salve Tarot Italia, desidero ordinare dal vostro Shop:\n- Articolo: ${product.title}\n- Prezzo: € ${product.price.toFixed(2)}\n- Spedizione/Ritiro: Desidero informazioni sulla spedizione o ritiro nello Studio di Macerata.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleCheckoutWhatsapp = () => {
    const phone = '393791038253';
    const itemList = cartItems
      .map(item => `• ${item.product.title} (x${item.quantity}) - € ${(item.product.price * item.quantity).toFixed(2)}`)
      .join('\n');
    const text = encodeURIComponent(
      `Salve Tarot Italia, desidero ordinare i seguenti articoli dalla Bottega Olistica:\n\n${itemList}\n\nTotale stimato: € ${totalCartPrice.toFixed(2)}\n\nNome e Cognome:\nIndirizzo di Spedizione / Ritiro a Macerata:\nNote aggiuntive:`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full bg-[#08030F] text-[#F5F0EB] py-8 lg:py-14 overflow-hidden border-t-2 border-[#D4AF37]/40 shadow-[inset_0_0_80px_rgba(212,175,55,0.15)]">
      {/* Sfondo Esoterico Dinamico: Nebulosa Alchemica, Aureola Dorata e Sigillo Cosmico */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#D4AF37]/15 via-[#FF007F]/10 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="absolute -top-40 -left-20 w-[450px] h-[450px] bg-[#8A2BE2]/20 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <section className="max-w-[1280px] mx-auto px-4 lg:px-12 relative z-10 animate-in fade-in duration-500">
        {/* Top Header con accenti alchemici dorati */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D4AF37]/30 bg-[#120724]/60 backdrop-blur-md p-4 rounded-2xl border">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] hover:text-[#00F0FF] transition-colors cursor-pointer font-mono font-semibold"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Torna alla Home
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
            <span className="material-symbols-outlined text-sm animate-spin" style={{ animationDuration: '12s' }}>auto_awesome</span>
            <span>Atelier Olistico &amp; Consacrazioni Macerata</span>
          </div>

          {/* Cart Trigger Badge Esoterico */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C0F33] border-2 border-[#D4AF37] hover:border-[#FF007F] text-[#D4AF37] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_25px_rgba(255,0,127,0.5)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#D4AF37]">shopping_bag</span>
            <span>Carrello Bottega ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)})</span>
          </button>
        </div>

        <BrandSectionDivider title="Tarot Italia • Bottega Olistica Esoterica" className="mb-8" />

        {/* Hero Narrative della Bottega con Stile Alchemico Visivamente Unico */}
        <div className="relative bg-gradient-to-r from-[#170B2E]/90 via-[#220B3B]/90 to-[#170B2E]/90 border-2 border-[#D4AF37]/50 rounded-3xl p-8 sm:p-12 mb-12 text-center shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#1C0F33] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)]">
            <span className="material-symbols-outlined text-4xl">vpn_key</span>
          </div>

          <div className="pt-4 max-w-3xl mx-auto">
            <span className="text-[12px] font-mono font-bold text-[#D4AF37] uppercase tracking-[0.25em] flex items-center justify-center gap-2 mb-2">
              <span className="material-symbols-outlined text-sm text-[#FF007F]">flare</span>
              <span>Compendio di Strumenti Consacrati &amp; Artigianato Sacro</span>
              <span className="material-symbols-outlined text-sm text-[#FF007F]">flare</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white mt-2 mb-4 font-bold leading-tight drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              La Bottega Alchemica <span className="italic text-[#D4AF37]">&amp;</span> Sacra
            </h1>
            <p className="text-sm sm:text-base text-[#C7B8DA] leading-relaxed max-w-2xl mx-auto font-sans">
              Strumenti di radiestesia ed alchimia individuale calibrati ad uno ad uno, erbe della tradizione marchigiana raccolte sui Sibillini, cere naturali vergini per riti di protezione ed antichi mazzi d'arte.
            </p>
          </div>
        </div>

      {/* CATEGORY FILTER SECTION */}
      <div className="bg-[#130924]/90 backdrop-blur-xl border border-[#8A2BE2]/40 rounded-2xl p-4 sm:p-6 mb-10 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#8A2BE2]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00F0FF] text-lg">tune</span>
            <span className="text-xs uppercase tracking-widest text-[#00F0FF] font-semibold">
              Filtra la Bottega per Categoria:
            </span>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#A69BB5]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca pendoli, erbe, candele, tarocchi..."
              className="w-full bg-[#0C0714] text-xs text-white pl-9 pr-8 py-2 rounded-xl border border-[#8A2BE2]/50 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]/50 focus:outline-none placeholder:text-[#A69BB5]/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#A69BB5] hover:text-white"
                title="Cancella ricerca"
              >
                <span className="material-symbols-outlined text-xs">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-4">
          {CATEGORY_FILTERS.map((cat) => {
            const count = getFilterCount(cat.id);
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                title={cat.description}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#FF007F] text-white shadow-[0_0_20px_rgba(255,0,127,0.5)] border border-[#FF007F] scale-[1.02]'
                    : 'bg-[#1C0F33] text-[#A69BB5] border border-[#8A2BE2]/40 hover:border-[#00F0FF] hover:text-white hover:bg-[#130924]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-base transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-[#00F0FF] group-hover:scale-110'
                  }`}
                >
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold transition-colors ${
                    isActive
                      ? 'bg-black/30 text-white'
                      : 'bg-[#130924] text-[#00F0FF] border border-[#00F0FF]/30 group-hover:bg-[#1C0F33]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Summary / Clear Button */}
        {(activeCategory !== 'Tutti' || searchQuery.trim() !== '') && (
          <div className="mt-4 pt-3 border-t border-[#8A2BE2]/20 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#A69BB5]">
              <span className="material-symbols-outlined text-xs text-[#00F0FF]">filter_alt</span>
              <span>
                Filtro attivo: <strong>{activeCategory}</strong>
                {searchQuery && ` + Ricerca: "${searchQuery}"`} ({filteredProducts.length} risultati)
              </span>
            </div>
            <button
              onClick={() => {
                setActiveCategory('Tutti');
                setSearchQuery('');
              }}
              className="text-[#FF007F] hover:underline font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">close</span>
              Azzera filtri
            </button>
          </div>
        )}
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#130924]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#8A2BE2]/40 hover:border-[#00F0FF] shadow-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Visual Container */}
              <div
                onClick={() => setSelectedProduct(product)}
                className="relative w-full aspect-[4/3] overflow-hidden bg-[#1C0F33] cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#130924] via-transparent to-transparent"></div>

                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#0C0714]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[#FF007F] text-[10px] font-bold uppercase tracking-widest border border-[#FF007F]/40 shadow-[0_0_10px_rgba(255,0,127,0.3)]">
                    {product.badge}
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-[#1C0F33]/90 text-white px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 border border-[#00F0FF]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
                  Disponibile
                </div>
              </div>

              {/* Product Body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Category & Clickable Filter Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#00F0FF]">
                    {product.category}
                  </span>
                </div>

                {/* Filter tags buttons for immediate discovery */}
                {product.filterTags && product.filterTags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 mb-2.5">
                    {product.filterTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCategory(tag);
                        }}
                        className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                          activeCategory === tag
                            ? 'bg-[#FF007F] text-white'
                            : 'bg-[#1C0F33] text-[#A69BB5] border border-[#8A2BE2]/40 hover:border-[#00F0FF] hover:text-[#00F0FF]'
                        }`}
                        title={`Filtra per ${tag}`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}

                <h2 className="font-serif text-lg text-white group-hover:text-[#00F0FF] transition-colors mb-2 line-clamp-2">
                  {product.title}
                </h2>

                <p className="text-xs text-[#A69BB5] leading-relaxed mb-4 line-clamp-2">
                  {product.subtitle}
                </p>

                {/* Price & Cart Actions */}
                <div className="mt-auto pt-4 border-t border-[#8A2BE2]/30 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#A69BB5] uppercase">Prezzo</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl font-bold text-[#00F0FF]">
                        € {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#A69BB5]/50 line-through">
                          € {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 bg-[#1C0F33] text-[#A69BB5] hover:text-[#00F0FF] rounded-lg border border-[#8A2BE2]/40 hover:border-[#00F0FF] transition-colors cursor-pointer"
                      title="Visualizza dettagli e uso rituale"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(255,0,127,0.4)] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                      <span>Aggiungi</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-[#130924] rounded-2xl border border-[#8A2BE2]/40 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#1C0F33] border border-[#8A2BE2]/40 flex items-center justify-center mx-auto mb-4 text-[#00F0FF]">
            <span className="material-symbols-outlined text-3xl">search_off</span>
          </div>
          <h3 className="font-serif text-xl text-white mb-2">Nessun articolo trovato</h3>
          <p className="text-xs text-[#A69BB5] leading-relaxed mb-6">
            Nessun oggetto sacro o preparato corrisponde alla categoria <strong>"{activeCategory}"</strong>
            {searchQuery ? ` o alla ricerca "${searchQuery}"` : ''}.
          </p>
          <button
            onClick={() => {
              setActiveCategory('Tutti');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF007F] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#FF1A8C] transition-colors shadow-[0_0_15px_rgba(255,0,127,0.5)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            <span>Reimposta Tutti i Filtri</span>
          </button>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#130924] border border-[#8A2BE2]/50 rounded-2xl max-w-2xl w-full p-6 lg:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-[#1C0F33] border border-[#00F0FF]/60 text-white hover:text-[#00F0FF] hover:border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.3)] flex items-center justify-center transition-all cursor-pointer z-10"
              aria-label="Chiudi dettagli prodotto"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
            </button>

            <div className="flex items-center gap-2 text-[#00F0FF] text-[11px] font-semibold uppercase tracking-widest mb-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>{selectedProduct.category}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">
              {selectedProduct.title}
            </h3>

            {/* Clickable tags in modal */}
            {selectedProduct.filterTags && selectedProduct.filterTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                <span className="text-[10px] uppercase tracking-wider text-[#A69BB5] mr-1">Categorie:</span>
                {selectedProduct.filterTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveCategory(tag);
                      setSelectedProduct(null);
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1C0F33] text-[#00F0FF] border border-[#00F0FF]/30 hover:border-[#00F0FF] transition-colors cursor-pointer"
                    title={`Filtra bottega per ${tag}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-serif text-2xl font-bold text-[#00F0FF]">
                € {selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-[#A69BB5]/50 line-through">
                  € {selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-[#A69BB5] ml-2">(IVA incl. • Confezione Sacra)</span>
            </div>

            <p className="text-xs sm:text-sm text-[#A69BB5] leading-relaxed mb-6">
              {selectedProduct.description}
            </p>

            {/* Ritual Use Box */}
            <div className="p-4 bg-[#1C0F33] rounded-xl border-l-4 border-[#FF007F] mb-6">
              <h4 className="text-xs uppercase tracking-wider text-[#FF007F] font-semibold mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                <span>Uso Rituale &amp; Olistico</span>
              </h4>
              <p className="text-xs text-white leading-relaxed">
                {selectedProduct.ritualUse}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs uppercase tracking-wider text-[#00F0FF] font-semibold">
                Caratteristiche &amp; Materiali:
              </h4>
              <ul className="text-xs text-[#A69BB5] space-y-1.5">
                {selectedProduct.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs text-[#FF007F]">check_circle</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-[#1C0F33] rounded-xl text-[11px] text-[#A69BB5] mb-6 flex items-center gap-2 border border-[#8A2BE2]/40">
              <span className="material-symbols-outlined text-sm text-[#00F0FF]">local_shipping</span>
              <span>{selectedProduct.shippingInfo}</span>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#8A2BE2]/30 space-y-3">
              <p className="text-[10px] text-[#A69BB5] leading-relaxed">
                Inviando la richiesta d'ordine acconsenti al trattamento dei dati personali in conformità alla{' '}
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-[#00F0FF] underline hover:text-white cursor-pointer"
                >
                  Privacy Policy
                </button>{' '}
                e all'informativa sui{' '}
                <button
                  type="button"
                  onClick={onOpenCookie}
                  className="text-[#00F0FF] underline hover:text-white cursor-pointer"
                >
                  Cookie
                </button>.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="px-4 py-2 bg-[#1C0F33] text-white text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#8A2BE2]/40 hover:bg-[#130924] transition-colors cursor-pointer"
                >
                  Aggiungi al Carrello
                </button>

                <button
                  onClick={() => handleDirectOrderWhatsapp(selectedProduct)}
                  className="px-5 py-2.5 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(255,0,127,0.5)] flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>Ordina Subito su WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE-OVER / CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#130924] h-full shadow-2xl border-l border-[#8A2BE2]/50 flex flex-col p-6 overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#8A2BE2]/30">
              <div className="flex items-center gap-2 text-[#00F0FF]">
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                <h3 className="font-serif text-lg text-white">Il Tuo Carrello</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-[#1C0F33] border border-[#00F0FF]/60 text-white hover:text-[#00F0FF] hover:border-[#00F0FF] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Chiudi carrello"
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-xs text-[#A69BB5] p-6">
                  <span className="material-symbols-outlined text-4xl text-[#8A2BE2]/40 mb-2">
                    remove_shopping_cart
                  </span>
                  <p>Il carrello della Bottega è vuoto.</p>
                  <p className="text-[11px] text-[#A69BB5]/70 mt-1">
                    Seleziona uno strumento rituale o un preparato d'erbe per aggiungerlo.
                  </p>
                </div>
              ) : (
                cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-3 bg-[#1C0F33] rounded-xl border border-[#8A2BE2]/40 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/50 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-sm text-white truncate max-w-[140px]">
                          {product.title}
                        </span>
                        <span className="text-xs text-[#00F0FF]">
                          € {(product.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(product.id, -1)}
                        className="w-7 h-7 rounded-lg bg-[#130924] border border-[#8A2BE2]/40 flex items-center justify-center text-white hover:text-[#FF007F] text-xs cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono text-xs text-white px-1">{quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(product.id, 1)}
                        className="w-7 h-7 rounded-lg bg-[#130924] border border-[#8A2BE2]/40 flex items-center justify-center text-white hover:text-[#00F0FF] text-xs cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-[#8A2BE2]/30 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#A69BB5]">Totale Provvisorio:</span>
                  <span className="font-serif text-xl font-bold text-[#00F0FF]">
                    € {totalCartPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-[10px] text-[#A69BB5] leading-relaxed">
                  Inviando l'ordine accetti il trattamento dei dati personali secondo la nostra{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="text-[#00F0FF] underline hover:text-white cursor-pointer"
                  >
                    Privacy Policy
                  </button>{' '}
                  e la politica dei{' '}
                  <button
                    type="button"
                    onClick={onOpenCookie}
                    className="text-[#00F0FF] underline hover:text-white cursor-pointer"
                  >
                    Cookie
                  </button>.
                </p>
                <button
                  onClick={handleCheckoutWhatsapp}
                  className="w-full py-3 bg-[#FF007F] hover:bg-[#FF1A8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(255,0,127,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Completa Ordine via WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-[#130924] text-[#D4AF37] text-xs font-mono rounded-xl border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-in slide-in-from-bottom duration-200">
          {notification}
        </div>
      )}
      </section>
    </div>
  );
};
