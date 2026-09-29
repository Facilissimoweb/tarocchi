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
    <div className="relative w-full bg-[#F9F8F6] text-[#2B2523] py-8 lg:py-14 overflow-hidden border-t border-[#E5E0D8]">
      <section className="max-w-[1280px] mx-auto px-4 lg:px-12 relative z-10 animate-in fade-in duration-500">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E0D8] bg-[#FFFFFF] p-4 rounded-2xl border shadow-sm">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#2B2523] hover:text-[#6C645C] transition-colors cursor-pointer font-mono font-semibold"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Torna alla Home
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#6C645C]">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span>Atelier Olistico &amp; Consacrazioni Macerata</span>
          </div>

          {/* Cart Trigger Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7A8B78] hover:bg-[#687866] border border-[#C5BCB3] text-[#2B2523] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#2B2523]">shopping_bag</span>
            <span>Carrello Bottega ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)})</span>
          </button>
        </div>

        <BrandSectionDivider title="Tarot Italia • Bottega Olistica" className="mb-8" />

        {/* Hero Narrative della Bottega */}
        <div className="relative bg-[#FFFFFF] border border-[#E5E0D8] rounded-3xl p-8 sm:p-12 mb-12 text-center shadow-sm overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <span className="text-[12px] font-mono font-bold text-[#8C808E] uppercase tracking-[0.2em] flex items-center justify-center gap-2 mb-2">
              <span>Compendio di Strumenti Consacrati &amp; Artigianato Sacro</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2523] mt-2 mb-4 font-bold leading-tight">
              La Bottega Olistica <span className="italic font-normal text-[#8C808E]">&amp;</span> Artigianale
            </h1>
            <p className="text-sm sm:text-base text-[#6C645C] leading-relaxed max-w-2xl mx-auto font-sans">
              Strumenti di radiestesia ed alchimia individuale calibrati ad uno ad uno, erbe della tradizione marchigiana raccolte sui Sibillini, cere naturali vergini per riti di protezione ed antichi mazzi d'arte.
            </p>
          </div>
        </div>

      {/* CATEGORY FILTER SECTION */}
      <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-2xl p-4 sm:p-6 mb-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2B2523] text-lg">tune</span>
            <span className="text-xs uppercase tracking-widest text-[#2B2523] font-semibold font-mono">
              Filtra la Bottega per Categoria:
            </span>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6C645C]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca pendoli, erbe, candele, tarocchi..."
              className="w-full bg-[#F9F8F6] text-xs text-[#2B2523] pl-9 pr-8 py-2 rounded-xl border border-[#E5E0D8] focus:border-[#C5BCB3] focus:outline-none placeholder:text-[#6C645C]/60 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#6C645C] hover:text-[#2B2523]"
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
                    ? 'bg-[#2B2523] text-[#F9F8F6] border border-[#2B2523]'
                    : 'bg-[#F9F8F6] text-[#6C645C] border border-[#E5E0D8] hover:border-[#C5BCB3] hover:text-[#2B2523]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-base transition-transform duration-200 ${
                    isActive ? 'text-[#F9F8F6]' : 'text-[#8C808E]'
                  }`}
                >
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold transition-colors ${
                    isActive
                      ? 'bg-white/20 text-[#F9F8F6]'
                      : 'bg-[#F3F1ED] text-[#2B2523] border border-[#E5E0D8]'
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
          <div className="mt-4 pt-3 border-t border-[#E5E0D8] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#6C645C]">
              <span className="material-symbols-outlined text-xs text-[#2B2523]">filter_alt</span>
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
              className="text-[#2B2523] hover:underline font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
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
              className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E5E0D8] hover:border-[#C5BCB3] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Visual Container */}
              <div
                onClick={() => setSelectedProduct(product)}
                className="relative w-full aspect-[4/3] overflow-hidden bg-[#F3F1ED] cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#F9F8F6]/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[#2B2523] text-[10px] font-bold uppercase tracking-widest border border-[#E5E0D8]">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Category */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6C645C] font-mono">
                    {product.category}
                  </span>
                </div>

                {/* Filter tags buttons */}
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
                            ? 'bg-[#2B2523] text-[#F9F8F6]'
                            : 'bg-[#F3F1ED] text-[#6C645C] border border-[#E5E0D8] hover:border-[#C5BCB3] hover:text-[#2B2523]'
                        }`}
                        title={`Filtra per ${tag}`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}

                <h2 className="font-serif text-lg text-[#2B2523] font-bold group-hover:text-[#8C808E] transition-colors mb-2 line-clamp-2">
                  {product.title}
                </h2>

                <p className="text-xs text-[#6C645C] leading-relaxed mb-4 line-clamp-2">
                  {product.subtitle}
                </p>

                {/* Price & Cart Actions */}
                <div className="mt-auto pt-4 border-t border-[#E5E0D8] flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#6C645C] uppercase font-mono">Prezzo</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl font-bold text-[#2B2523]">
                        € {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#6C645C]/60 line-through font-mono">
                          € {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 bg-[#F3F1ED] text-[#6C645C] hover:text-[#2B2523] rounded-lg border border-[#E5E0D8] hover:border-[#C5BCB3] transition-colors cursor-pointer"
                      title="Visualizza dettagli e uso rituale"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] text-xs font-semibold uppercase tracking-wider rounded-lg transition-all border border-[#C5BCB3] cursor-pointer"
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
        <div className="text-center py-16 px-4 bg-[#FFFFFF] rounded-2xl border border-[#E5E0D8] max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F3F1ED] border border-[#E5E0D8] flex items-center justify-center mx-auto mb-4 text-[#2B2523]">
            <span className="material-symbols-outlined text-3xl">search_off</span>
          </div>
          <h3 className="font-serif text-xl text-[#2B2523] mb-2 font-bold">Nessun articolo trovato</h3>
          <p className="text-xs text-[#6C645C] leading-relaxed mb-6">
            Nessun oggetto sacro o preparato corrisponde alla categoria <strong>"{activeCategory}"</strong>
            {searchQuery ? ` o alla ricerca "${searchQuery}"` : ''}.
          </p>
          <button
            onClick={() => {
              setActiveCategory('Tutti');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7A8B78] text-[#F9F8F6] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#687866] transition-colors border border-[#C5BCB3] cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            <span>Reimposta Tutti i Filtri</span>
          </button>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] border border-[#C5BCB3] rounded-2xl max-w-2xl w-full p-6 lg:p-8 relative shadow-xl max-h-[90vh] overflow-y-auto text-[#2B2523]">
            {/* Logo circolare in primo piano */}
            <div className="flex flex-col items-center justify-center mb-4 pt-1">
              <BrandSeal size="sm" className="mb-2" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#6C645C] font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#2B2523]">storefront</span>
                <span>BOTTEGA OLISTICA • {selectedProduct.category.toUpperCase()}</span>
              </span>
            </div>

            {/* Tasto di chiusura (X) */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F3F1ED] border border-[#C5BCB3] text-[#2B2523] hover:bg-[#E5E0D8] flex items-center justify-center transition-all cursor-pointer z-20"
              aria-label="Chiudi dettagli prodotto"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2523] mb-2 text-center font-bold">
              {selectedProduct.title}
            </h3>

            {/* Clickable tags in modal */}
            {selectedProduct.filterTags && selectedProduct.filterTags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                <span className="text-[10px] uppercase tracking-wider text-[#6C645C] font-mono">Categorie:</span>
                {selectedProduct.filterTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveCategory(tag);
                      setSelectedProduct(null);
                    }}
                    className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F3F1ED] text-[#2B2523] border border-[#E5E0D8] hover:border-[#C5BCB3] transition-colors cursor-pointer"
                    title={`Filtra bottega per ${tag}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="font-serif text-2xl font-bold text-[#2B2523]">
                € {selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-[#6C645C]/60 line-through font-mono">
                  € {selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-[#6C645C] ml-2">(IVA incl. • Confezione Sacra)</span>
            </div>

            <p className="text-xs sm:text-sm text-[#6C645C] leading-relaxed mb-6">
              {selectedProduct.description}
            </p>

            {/* Ritual Use Box */}
            <div className="p-4 bg-[#F9F8F6] rounded-xl border-l-4 border-[#8C808E] border-y border-r border-[#E5E0D8] mb-6">
              <h4 className="text-xs uppercase tracking-wider text-[#2B2523] font-bold mb-1 flex items-center gap-1.5 font-mono">
                <span className="material-symbols-outlined text-sm text-[#8C808E]">auto_fix_high</span>
                <span>Uso Rituale &amp; Olistico</span>
              </h4>
              <p className="text-xs text-[#2B2523] leading-relaxed">
                {selectedProduct.ritualUse}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs uppercase tracking-wider text-[#2B2523] font-bold font-mono">
                Caratteristiche &amp; Materiali:
              </h4>
              <ul className="text-xs text-[#6C645C] space-y-1.5">
                {selectedProduct.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs text-[#8C808E]">check_circle</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-[#F3F1ED] rounded-xl text-[11px] text-[#6C645C] mb-6 flex items-center gap-2 border border-[#E5E0D8]">
              <span className="material-symbols-outlined text-sm text-[#2B2523]">local_shipping</span>
              <span>{selectedProduct.shippingInfo}</span>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#E5E0D8] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="px-4 py-2.5 bg-[#F3F1ED] text-[#2B2523] text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#E5E0D8] hover:bg-[#E5E0D8] transition-colors cursor-pointer"
                >
                  Aggiungi al Carrello
                </button>

                <button
                  onClick={() => handleDirectOrderWhatsapp(selectedProduct)}
                  className="px-5 py-2.5 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] text-xs font-bold uppercase tracking-wider rounded-lg transition-all border border-[#C5BCB3] flex items-center gap-2 cursor-pointer shadow-sm"
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#FFFFFF] h-full border-l border-[#C5BCB3] shadow-2xl flex flex-col p-6 overflow-hidden relative text-[#2B2523]">
            {/* Logo circolare */}
            <div className="flex flex-col items-center justify-center mb-4 pt-1">
              <BrandSeal size="sm" className="mb-2" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#6C645C] font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#2B2523]">shopping_bag</span>
                <span>CARRELLO BOTTEGA</span>
              </span>
            </div>

            {/* Tasto di chiusura (X) */}
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F3F1ED] border border-[#C5BCB3] text-[#2B2523] hover:bg-[#E5E0D8] flex items-center justify-center transition-all cursor-pointer z-20"
              aria-label="Chiudi carrello"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-xs text-[#6C645C] p-6">
                  <span className="material-symbols-outlined text-4xl text-[#8C808E] mb-2">
                    remove_shopping_cart
                  </span>
                  <p className="font-semibold text-[#2B2523] text-sm">Il carrello della Bottega è vuoto.</p>
                  <p className="text-[11px] text-[#6C645C] mt-1">
                    Seleziona uno strumento rituale o un preparato d'erbe per aggiungerlo.
                  </p>
                </div>
              ) : (
                cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-3 bg-[#F9F8F6] rounded-xl border border-[#E5E0D8] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-[#E5E0D8]">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-sm text-[#2B2523] font-bold truncate max-w-[140px]">
                          {product.title}
                        </span>
                        <span className="text-xs text-[#8C808E] font-mono font-semibold">
                          € {(product.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(product.id, -1)}
                        className="w-7 h-7 rounded-lg bg-[#FFFFFF] border border-[#E5E0D8] flex items-center justify-center text-[#2B2523] hover:bg-[#F3F1ED] text-xs cursor-pointer font-bold"
                      >
                        -
                      </button>
                      <span className="font-mono text-xs text-[#2B2523] px-1 font-bold">{quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(product.id, 1)}
                        className="w-7 h-7 rounded-lg bg-[#FFFFFF] border border-[#E5E0D8] flex items-center justify-center text-[#2B2523] hover:bg-[#F3F1ED] text-xs cursor-pointer font-bold"
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
              <div className="pt-4 border-t border-[#E5E0D8] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6C645C]">Totale Provvisorio:</span>
                  <span className="font-serif text-xl font-bold text-[#2B2523]">
                    € {totalCartPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckoutWhatsapp}
                  className="w-full py-3 bg-[#7A8B78] hover:bg-[#687866] text-[#F9F8F6] text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-[#C5BCB3] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-[#2B2523] text-[#F9F8F6] text-xs font-mono rounded-xl border border-[#C5BCB3] shadow-lg animate-in slide-in-from-bottom duration-200">
          {notification}
        </div>
      )}
      </section>
    </div>
  );
};
