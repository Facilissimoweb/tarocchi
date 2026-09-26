import React, { useState } from 'react';
import { SHOP_PRODUCTS, ShopProduct } from '../data/shopData';

interface ShopSectionProps {
  onBackToHome: () => void;
  initialCategory?: string;
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
    description: 'Candele in pura cera d’api e composizioni cerimoniali'
  },
  {
    id: 'Tarocchi',
    label: 'Tarocchi',
    icon: 'style',
    description: 'Mazzi studio d’alta grammatura e mappe archetipiche'
  }
];

export const ShopSection: React.FC<ShopSectionProps> = ({ onBackToHome, initialCategory = 'Tutti' }) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [cartItems, setCartItems] = useState<{ product: ShopProduct; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Matcher for category filters
  const matchesCategory = (product: ShopProduct, categoryId: string): boolean => {
    if (categoryId === 'Tutti') return true;

    // Check explicit filterTags
    if (product.filterTags && product.filterTags.includes(categoryId as any)) {
      return true;
    }

    // Comprehensive fallback mappings
    if (categoryId === 'Strumenti' && (
      product.category === 'Strumenti di Divinazione' ||
      product.title.toLowerCase().includes('pendolo') ||
      product.title.toLowerCase().includes('mazzo')
    )) return true;

    if (categoryId === 'Erbe' && (
      product.category === 'Erboristeria & Profumi' ||
      product.title.toLowerCase().includes('erbe') ||
      product.title.toLowerCase().includes('tisana')
    )) return true;

    if (categoryId === 'Consacrati' && (
      (product.badge && product.badge.toLowerCase().includes('consacrat')) ||
      product.title.toLowerCase().includes('consacrat') ||
      product.title.toLowerCase().includes('sigillo')
    )) return true;

    if (categoryId === 'Rituali' && (
      product.category === 'Ritualistica Tradizionale' ||
      product.title.toLowerCase().includes('rituale') ||
      product.title.toLowerCase().includes('candele')
    )) return true;

    if (categoryId === 'Tarocchi' && (
      product.title.toLowerCase().includes('tarocch') ||
      product.title.toLowerCase().includes('archetipic')
    )) return true;

    return false;
  };

  // Count items matching each filter
  const getFilterCount = (categoryId: string): number => {
    if (categoryId === 'Tutti') return SHOP_PRODUCTS.length;
    return SHOP_PRODUCTS.filter(p => matchesCategory(p, categoryId)).length;
  };

  // Filtered products considering category and search query
  const filteredProducts = SHOP_PRODUCTS.filter((product) => {
    const categoryMatch = matchesCategory(product, activeCategory);
    if (!categoryMatch) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    return (
      product.title.toLowerCase().includes(query) ||
      product.subtitle.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.ritualUse.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.badge && product.badge.toLowerCase().includes(query)) ||
      (product.filterTags && product.filterTags.some(tag => tag.toLowerCase().includes(query)))
    );
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
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
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

        {/* Cart Trigger Badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#16161F] border border-[rgba(212,175,55,0.3)] hover:border-[#f2ca50] text-[#f2ca50] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(242,202,80,0.2)] cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">shopping_bag</span>
          <span>Carrello ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)})</span>
        </button>
      </div>

      {/* Hero Narrative of Shop */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[12px] font-semibold text-[#f2ca50] uppercase tracking-widest flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-sm">storefront</span>
          <span>Bottega Olistica &amp; Strumenti Rituali</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F0EB] mt-1.5 mb-3">
          Oggetti Sacri per la Cura dell’Anima
        </h1>
        <p className="text-sm text-[#d0c5af] leading-relaxed">
          Strumenti di radiestesia calibrati, erbe spontanee dei Sibillini, cere vergini per rituali d’armonia e mazzi storici restaurati. Ogni articolo è purificato e testato singolarmente da <strong>Teresa</strong> e <strong>Maura</strong> nello studio di Macerata.
        </p>
      </div>

      {/* CATEGORY FILTER SECTION */}
      <div className="bg-[#16161F]/90 backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-4 sm:p-6 mb-10 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(212,175,55,0.15)]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-lg">tune</span>
            <span className="text-xs uppercase tracking-widest text-[#f2ca50] font-semibold">
              Filtra la Bottega per Categoria:
            </span>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#E2DACD]/50">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca pendoli, erbe, candele, tarocchi..."
              className="w-full bg-[#111116] text-xs text-[#F5F0EB] pl-9 pr-8 py-2 rounded-xl border border-[rgba(212,175,55,0.2)] focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50]/50 focus:outline-none placeholder:text-[#E2DACD]/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#E2DACD]/60 hover:text-white"
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
                    ? 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_20px_rgba(242,202,80,0.35)] border border-[#f2ca50] scale-[1.02]'
                    : 'bg-[#111116] text-[#d0c5af] border border-[rgba(212,175,55,0.2)] hover:border-[#f2ca50] hover:text-[#F5F0EB] hover:bg-[#1a1a22]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-base transition-transform duration-200 ${
                    isActive ? 'text-[#3c2f00]' : 'text-[#f2ca50] group-hover:scale-110'
                  }`}
                >
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold transition-colors ${
                    isActive
                      ? 'bg-[#3c2f00] text-[#f2ca50]'
                      : 'bg-[#1f1f23] text-[#f2ca50] border border-[rgba(212,175,55,0.2)] group-hover:bg-[#2a292e]'
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
          <div className="mt-4 pt-3 border-t border-[rgba(212,175,55,0.1)] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#d0c5af]">
              <span className="material-symbols-outlined text-xs text-[#f2ca50]">filter_alt</span>
              <span>
                Filtro attivo: <strong className="text-[#f2ca50]">{activeCategory}</strong>
                {searchQuery.trim() && (
                  <span>
                    {' '}• Ricerca: <em className="text-[#F5F0EB]">"{searchQuery}"</em>
                  </span>
                )}
                {' '}({filteredProducts.length} {filteredProducts.length === 1 ? 'articolo trovato' : 'articoli trovati'})
              </span>
            </div>

            <button
              onClick={() => {
                setActiveCategory('Tutti');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1 text-[11px] text-[#f2ca50] hover:text-white hover:underline cursor-pointer uppercase tracking-wider font-semibold"
            >
              <span className="material-symbols-outlined text-xs">restart_alt</span>
              <span>Mostra Tutti gli Articoli</span>
            </button>
          </div>
        )}
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#16161F] rounded-xl overflow-hidden border border-[rgba(212,175,55,0.2)] hover:border-[#f2ca50] shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            >
              {/* Image Box */}
              <div className="relative w-full h-52 overflow-hidden bg-[#1f1f23]">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16161F] via-transparent to-transparent"></div>

                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#16161F]/90 backdrop-blur-md px-2.5 py-1 rounded text-[#f2ca50] text-[10px] font-medium uppercase tracking-widest border border-[rgba(212,175,55,0.2)]">
                    {product.badge}
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-[#1B4D3E]/90 text-[#F5F0EB] px-2.5 py-1 rounded text-[10px] font-medium flex items-center gap-1 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Disponibile
                </div>
              </div>

              {/* Product Body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Category & Clickable Filter Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#e9c176]">
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
                            ? 'bg-[#f2ca50] text-[#3c2f00]'
                            : 'bg-[#111116] text-[#e9c176] border border-[rgba(212,175,55,0.25)] hover:border-[#f2ca50] hover:text-[#f2ca50]'
                        }`}
                        title={`Filtra per ${tag}`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}

                <h2 className="font-serif text-lg text-[#F5F0EB] group-hover:text-[#f2ca50] transition-colors mb-2 line-clamp-2">
                  {product.title}
                </h2>

                <p className="text-xs text-[#d0c5af] leading-relaxed mb-4 line-clamp-2">
                  {product.subtitle}
                </p>

                {/* Price & Cart Actions */}
                <div className="mt-auto pt-4 border-t border-[rgba(212,175,55,0.15)] flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#E2DACD]/60 uppercase">Prezzo</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl font-bold text-[#f2ca50]">
                        € {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#E2DACD]/40 line-through">
                          € {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 bg-[#1f1f23] text-[#d0c5af] hover:text-[#f2ca50] rounded-lg border border-[rgba(212,175,55,0.15)] hover:border-[#f2ca50] transition-colors cursor-pointer"
                      title="Visualizza dettagli e uso rituale"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#E5C158] transition-colors shadow-sm cursor-pointer"
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
        <div className="text-center py-16 px-4 bg-[#16161F] rounded-2xl border border-[rgba(212,175,55,0.2)] max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#1f1f23] border border-[rgba(212,175,55,0.3)] flex items-center justify-center mx-auto mb-4 text-[#f2ca50]">
            <span className="material-symbols-outlined text-3xl">search_off</span>
          </div>
          <h3 className="font-serif text-xl text-[#F5F0EB] mb-2">Nessun articolo trovato</h3>
          <p className="text-xs text-[#d0c5af] leading-relaxed mb-6">
            Nessun oggetto sacro o preparato corrisponde alla categoria <strong>"{activeCategory}"</strong>
            {searchQuery ? ` o alla ricerca "${searchQuery}"` : ''}.
          </p>
          <button
            onClick={() => {
              setActiveCategory('Tutti');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f2ca50] text-[#3c2f00] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5C158] transition-colors shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            <span>Reimposta Tutti i Filtri</span>
          </button>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#16161F] border border-[rgba(212,175,55,0.35)] rounded-2xl max-w-2xl w-full p-6 lg:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-[#d0c5af] hover:text-white transition-colors cursor-pointer"
              aria-label="Chiudi dettagli prodotto"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="flex items-center gap-2 text-[#f2ca50] text-[11px] font-semibold uppercase tracking-widest mb-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>{selectedProduct.category}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0EB] mb-2">
              {selectedProduct.title}
            </h3>

            {/* Clickable tags in modal */}
            {selectedProduct.filterTags && selectedProduct.filterTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                <span className="text-[10px] uppercase tracking-wider text-[#E2DACD]/60 mr-1">Categorie:</span>
                {selectedProduct.filterTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveCategory(tag);
                      setSelectedProduct(null);
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#111116] text-[#f2ca50] border border-[rgba(212,175,55,0.25)] hover:border-[#f2ca50] transition-colors cursor-pointer"
                    title={`Filtra bottega per ${tag}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-serif text-2xl font-bold text-[#f2ca50]">
                € {selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-[#E2DACD]/40 line-through">
                  € {selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-[#E2DACD]/60 ml-2">(IVA incl. • Confezione Sacra)</span>
            </div>

            <p className="text-xs sm:text-sm text-[#d0c5af] leading-relaxed mb-6">
              {selectedProduct.description}
            </p>

            {/* Ritual Use Box */}
            <div className="p-4 bg-[#111116] rounded-xl border-l-2 border-[#f2ca50] mb-6">
              <h4 className="text-xs uppercase tracking-wider text-[#f2ca50] font-semibold mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                <span>Uso Rituale &amp; Olistico</span>
              </h4>
              <p className="text-xs text-[#E2DACD] leading-relaxed">
                {selectedProduct.ritualUse}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs uppercase tracking-wider text-[#e9c176] font-semibold">
                Caratteristiche &amp; Materiali:
              </h4>
              <ul className="text-xs text-[#d0c5af] space-y-1.5">
                {selectedProduct.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs text-[#f2ca50]">check_circle</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-[#111116] rounded-xl text-[11px] text-[#E2DACD]/70 mb-6 flex items-center gap-2 border border-[rgba(212,175,55,0.15)]">
              <span className="material-symbols-outlined text-sm text-[#f2ca50]">local_shipping</span>
              <span>{selectedProduct.shippingInfo}</span>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[rgba(212,175,55,0.15)]">
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 bg-[#1f1f23] text-[#F5F0EB] text-xs font-semibold uppercase tracking-wider rounded-lg border border-[rgba(212,175,55,0.2)] hover:bg-[#2a292e] transition-colors cursor-pointer"
              >
                Aggiungi al Carrello
              </button>

              <button
                onClick={() => handleDirectOrderWhatsapp(selectedProduct)}
                className="px-5 py-2.5 bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#E5C158] transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                <span>Ordina Subito su WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE-OVER / CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#16161F] h-full shadow-2xl border-l border-[rgba(212,175,55,0.3)] flex flex-col p-6 overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(212,175,55,0.15)]">
              <div className="flex items-center gap-2 text-[#f2ca50]">
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                <h3 className="font-serif text-lg text-[#F5F0EB]">Il Tuo Carrello</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-[#d0c5af] hover:text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-xs text-[#d0c5af] p-6">
                  <span className="material-symbols-outlined text-4xl text-[#E2DACD]/30 mb-2">
                    remove_shopping_cart
                  </span>
                  <p>Il carrello della Bottega è vuoto.</p>
                  <p className="text-[11px] text-[#E2DACD]/60 mt-1">
                    Seleziona uno strumento rituale o un preparato d'erbe per aggiungerlo.
                  </p>
                </div>
              ) : (
                cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-3 bg-[#111116] rounded-xl border border-[rgba(212,175,55,0.15)] flex gap-3"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-[#2a292e]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-semibold text-[#F5F0EB] truncate">
                        {product.title}
                      </h4>
                      <p className="text-[11px] text-[#f2ca50] mt-0.5">
                        € {(product.price * quantity).toFixed(2)}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border border-[rgba(212,175,55,0.2)] rounded-lg px-2 py-0.5 bg-[#1f1f23]">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="text-[#d0c5af] hover:text-white text-xs px-1 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs text-[#F5F0EB] font-mono">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="text-[#d0c5af] hover:text-white text-xs px-1 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[11px] text-[#ffb4ab] hover:underline cursor-pointer"
                        >
                          Rimuovi
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-[rgba(212,175,55,0.2)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#E2DACD]/80 uppercase tracking-wider">Totale Prodotti:</span>
                  <span className="font-serif text-xl font-bold text-[#f2ca50]">
                    € {totalCartPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-[#d0c5af] leading-relaxed">
                  L'ordine verrà inviato direttamente su WhatsApp per concordare la modalità di spedizione con corriere o il ritiro presso lo Studio di Macerata.
                </p>
                <button
                  onClick={handleCheckoutWhatsapp}
                  className="w-full py-3 bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#E5C158] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Invia Ordine su WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
