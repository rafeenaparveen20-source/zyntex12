import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Eye, ShoppingBag, Sparkles, Check } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  selectedCategory,
  onSelectCategory,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Picks' },
    { id: 'bedding', label: 'Cozy Bedding' },
    { id: 'lighting', label: 'Warm Lighting' },
    { id: 'wall-art', label: 'Wall Art & Grids' },
    { id: 'plants-storage', label: 'Plants & Storage' },
    { id: 'cozy-corner', label: 'Chill Nook' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 1500);
  };

  return (
    <section id="shop" className="py-20 sm:py-24 px-5 sm:px-8 lg:px-14 max-w-[1340px] mx-auto">
      {/* Section Head */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[2.5px] text-[#8b6b4d] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated favourites</span>
          </div>
          <h2 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#173c2d]">
            Most-loved picks
          </h2>
        </div>
        <p className="max-w-md text-[#666b63] text-base leading-relaxed">
          Small upgrades that create a surprisingly big transformation. Every piece is designed to harmonize effortlessly with your space.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#173c2d] text-white shadow-sm'
                  : 'bg-[#fbfaf6] text-[#5c6159] border border-[#ddd8cc] hover:bg-[#eee9df] hover:text-[#173c2d]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.has(product.id);
          const isJustAdded = addedId === product.id;
          const discountPct = Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
          );

          return (
            <article
              key={product.id}
              id={`product-card-${product.id}`}
              className="group bg-[#fbfaf6] border border-[#ddd8cc] rounded-[24px] p-3 sm:p-3.5 relative flex flex-col justify-between hover:shadow-[0_16px_35px_rgba(23,60,45,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Image Container with Badges & Quick View */}
                <div className="relative rounded-[18px] overflow-hidden bg-[#e8e2d7] aspect-[1/1.08] mb-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Discount / Tag Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                    {product.tag && (
                      <span className="bg-[#173c2d] text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase shadow-sm">
                        {product.tag}
                      </span>
                    )}
                    {discountPct > 0 && (
                      <span className="bg-[#8b6b4d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full w-max shadow-sm">
                        -{discountPct}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    aria-label={`Wishlist ${product.name}`}
                    className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all z-10 ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600 scale-105'
                        : 'bg-white/90 text-[#20251f] hover:bg-white hover:text-rose-600'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        isWishlisted ? 'fill-rose-600' : ''
                      }`}
                    />
                  </button>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center z-10">
                    <button
                      onClick={() => onQuickView(product)}
                      className="w-full py-2 bg-white/95 backdrop-blur-md rounded-full text-xs font-semibold text-[#173c2d] shadow-md hover:bg-white flex items-center justify-center gap-1.5 border border-white"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Rating & Review Count */}
                <div className="flex items-center gap-1 px-1 mb-1 text-[11px] text-[#8a9b82]">
                  <span className="text-amber-500 font-bold">★ {product.rating}</span>
                  <span>({product.reviewCount})</span>
                </div>

                {/* Product Title */}
                <h3 className="font-serif font-semibold text-lg sm:text-xl text-[#173c2d] px-1 line-clamp-1 group-hover:text-[#8b6b4d] transition-colors">
                  {product.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 px-1 mt-1 mb-4">
                  <span className="font-bold text-base sm:text-lg text-[#20251f]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#888888] line-through font-normal">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={() => handleAdd(product)}
                disabled={!product.inStock}
                className={`w-full py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase border transition-all flex items-center justify-center gap-1.5 ${
                  isJustAdded
                    ? 'bg-[#8a9b82] text-white border-[#8a9b82]'
                    : 'bg-transparent text-[#173c2d] border-[#173c2d] hover:bg-[#173c2d] hover:text-white active:scale-[0.98]'
                }`}
              >
                {isJustAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG ✦</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};
