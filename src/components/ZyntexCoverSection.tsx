import React, { useState } from 'react';
import { COVER_FINDS, PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ShoppingBag, Sparkles, Eye, Check, ArrowRight } from 'lucide-react';

interface ZyntexCoverSectionProps {
  onAddToCart: (product: Product) => void;
  onAddBundle: (products: Product[]) => void;
  onQuickView: (product: Product) => void;
}

export const ZyntexCoverSection: React.FC<ZyntexCoverSectionProps> = ({
  onAddToCart,
  onAddBundle,
  onQuickView,
}) => {
  const [activeFindId, setActiveFindId] = useState<string | null>('cover-cloud-light');
  const [showCallouts, setShowCallouts] = useState<boolean>(true);

  // Get matching products for the 7 cover finds
  const coverProducts = COVER_FINDS.map((find) =>
    PRODUCTS.find((p) => p.id === find.productId)
  ).filter(Boolean) as Product[];

  const activeFind = COVER_FINDS.find((f) => f.id === activeFindId);
  const activeProduct = activeFind
    ? PRODUCTS.find((p) => p.id === activeFind.productId)
    : null;

  const totalBundlePrice = coverProducts.reduce((sum, p) => sum + p.price, 0);
  const originalBundlePrice = coverProducts.reduce((sum, p) => sum + p.originalPrice, 0);
  const bundleDiscountedPrice = Math.round(totalBundlePrice * 0.85); // 15% extra bundle discount
  const totalSavings = originalBundlePrice - bundleDiscountedPrice;

  return (
    <section id="cover" className="pt-20 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1340px] mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee9df] border border-[#ddd8cc] text-[#8b6b4d] text-xs font-bold uppercase tracking-[2px] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Styled by a 22-Year-Old Couple • First Cozy Apartment</span>
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#173c2d] tracking-tight">
          Home Décor • Zyntex Finds
        </h2>
        <p className="text-xs sm:text-sm text-[#666b63] mt-2">
          How a 22-year-old couple turned their first shared bedroom into an ultra-cozy Pinterest dream with warm ambient glow, cloud lights, and budget-friendly tactile decor.
        </p>
      </div>

      {/* Main Cover Poster Showcase */}
      <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-[#173c2d] border border-[#ddd8cc] shadow-[0_25px_60px_rgba(23,60,45,0.18)]">
        {/* Background Cozy Room Photo */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[1/1] lg:aspect-[16/11] w-full overflow-hidden select-none">
          <img
            src="/zyntex-cover.jpg"
            alt="Zyntex Cozy Bedroom Makeover - Zyntex Finds"
            className="w-full h-full object-cover object-center"
          />

          {/* Warm Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/30 pointer-events-none" />

          {/* Center Brand Ribbon - Replaces 'Home Decor Amazon Finds' with 'Home Decor Zyntex Finds' */}
          <div className="absolute top-[6%] sm:top-[8%] left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none max-w-[92%]">
            <div className="relative inline-block">
              {/* Handwritten "Home Decor" */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-amber-200 text-2xl sm:text-4xl font-serif">✦</span>
                <h1 className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] tracking-wide">
                  Home Decor
                </h1>
                <span className="text-amber-300 text-2xl sm:text-4xl">♥</span>
              </div>

              {/* Aesthetic Brush Kraft Ribbon replacing "Amazon Finds" with "Zyntex Finds" */}
              <div className="mt-1 sm:mt-2 px-6 sm:px-10 py-1.5 sm:py-2.5 rounded-full bg-[#f4ede4]/95 text-[#173c2d] border-2 border-white/90 shadow-[0_8px_25px_rgba(0,0,0,0.4)] transform -rotate-1 inline-flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-2xl md:text-3xl tracking-wide uppercase">
                  Zyntex Finds
                </span>
                <span className="text-amber-600 text-sm sm:text-lg">✦</span>
              </div>
            </div>
          </div>

          {/* View Mode Switcher Button (Top Right) */}
          <div className="absolute top-4 right-4 z-30">
            <button
              onClick={() => setShowCallouts(!showCallouts)}
              className="px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/25 transition-all flex items-center gap-1.5 shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showCallouts ? 'Hide Callouts' : 'Show 7 Finds'}</span>
            </button>
          </div>

          {/* Couple Age 22 Sticky Tag (Top Left) */}
          <div className="absolute top-4 left-4 z-30 pointer-events-none">
            <div className="bg-[#fbf7ee]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/70 shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center gap-2 transform -rotate-2">
              <span className="font-script text-sm sm:text-lg font-bold text-[#173c2d]">
                Couple, Age 22 ♡
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[#8b6b4d] bg-[#eee9df] px-2 py-0.5 rounded-full whitespace-nowrap">
                1st Cozy Makeover
              </span>
            </div>
          </div>

          {/* 7 Circular Callouts from the Cover Poster */}
          {showCallouts &&
            COVER_FINDS.map((find) => {
              const isActive = activeFindId === find.id;
              return (
                <div
                  key={find.id}
                  style={{
                    position: 'absolute',
                    top: find.circlePos.top,
                    left: find.circlePos.left,
                    right: find.circlePos.right,
                  }}
                  className="z-20 group cursor-pointer"
                  onClick={() => setActiveFindId(find.id)}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Circular Item Badge with Thick White Border */}
                    <div
                      className={`w-13 h-13 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-24 lg:h-24 rounded-full overflow-hidden border-[3px] sm:border-[4px] border-white shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-300 bg-white ${
                        isActive
                          ? 'ring-4 ring-amber-400 scale-110 shadow-[0_12px_32px_rgba(245,158,11,0.6)]'
                          : 'group-hover:scale-105 group-hover:border-amber-200'
                      }`}
                    >
                      <img
                        src={find.image}
                        alt={find.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Ping indicator if active */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white" />
                      </span>
                    )}

                    {/* Handwritten Label Badge below circle with doodle heart */}
                    <div
                      className={`mt-1 sm:mt-1.5 text-center whitespace-nowrap transition-transform duration-200 ${
                        isActive ? 'scale-105' : ''
                      }`}
                    >
                      <span className="inline-flex items-center gap-1 font-script text-xs sm:text-base md:text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] bg-black/45 backdrop-blur-xs px-2 sm:px-2.5 py-0.5 rounded-full border border-white/20">
                        {find.badgeLabel}
                      </span>
                    </div>

                    {/* Price tag pill */}
                    <span className="text-[10px] sm:text-xs font-bold text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] mt-0.5">
                      ₹{find.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              );
            })}

          {/* Active Item Floating Detail Card (Bottom Left / Overlay) */}
          {activeProduct && showCallouts && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 bg-[#fbfaf6]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#ddd8cc] shadow-[0_15px_35px_rgba(0,0,0,0.3)] animate-fade-in">
              <div className="flex gap-3.5 items-center">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-[#ded8ca] border border-[#ddd8cc]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8b6b4d] font-bold uppercase tracking-wider mb-0.5">
                    <span>{activeFind?.badgeLabel}</span>
                    <span>•</span>
                    <span className="text-emerald-700">In Stock</span>
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#173c2d] truncate">
                    {activeProduct.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif font-bold text-lg text-[#20251f]">
                      ₹{activeProduct.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#888888] line-through">
                      ₹{activeProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#ddd8cc]/80">
                <button
                  onClick={() => onAddToCart(activeProduct)}
                  className="flex-1 py-2.5 px-4 rounded-full bg-[#173c2d] hover:bg-[#23533f] text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>
                <button
                  onClick={() => onQuickView(activeProduct)}
                  className="py-2.5 px-3.5 rounded-full bg-[#eee9df] hover:bg-[#ddd8cc] text-[#173c2d] text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Details</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 7-Piece Complete Makeover Bundle Bar */}
        <div className="bg-[#f5f1e8] p-5 sm:p-7 border-t border-[#ddd8cc] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#173c2d] text-white text-[11px] font-bold uppercase tracking-wider">
                Full Room Bundle
              </span>
              <span className="text-xs font-semibold text-[#8b6b4d]">
                Includes all 7 Zyntex Cover pieces
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#173c2d]">
              Get the entire bedroom makeover set
            </h3>
            <p className="text-xs sm:text-sm text-[#666b63] mt-0.5">
              Hanging Plant, Cloud Wall Light, Wavy Mirror, Flower Cushion, Nightstand, Fluffy Rug & Nordic Chair.
            </p>
          </div>

          {/* Bundle Pricing and Buy Button */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center lg:justify-end">
            <div className="text-right">
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-2xl sm:text-3xl text-[#173c2d]">
                  ₹{bundleDiscountedPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-[#888888] line-through">
                  ₹{originalBundlePrice.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md inline-block">
                Save ₹{totalSavings.toLocaleString('en-IN')} (15% Bundle OFF)
              </span>
            </div>

            <button
              onClick={() => onAddBundle(coverProducts)}
              className="py-3.5 px-6 sm:px-8 rounded-full bg-[#173c2d] hover:bg-[#23533f] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD ALL 7 FINDS TO BAG</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
