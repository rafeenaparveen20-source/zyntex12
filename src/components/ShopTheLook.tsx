import React, { useState } from 'react';
import { LOOK_HOTSPOTS, PRODUCTS } from '../data/products';
import { Sparkles, Check, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ShopTheLookProps {
  onAddToCart: (product: Product) => void;
  onAddBundle: (products: Product[]) => void;
}

export const ShopTheLook: React.FC<ShopTheLookProps> = ({ onAddToCart, onAddBundle }) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('hs-bedding');
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    'soft-linen-bedding': true,
    'botanical-wall-prints': true,
    'warm-fairy-lights': true,
    'minimal-planter-set': true,
  });

  const lookProducts = PRODUCTS.filter((p) =>
    ['soft-linen-bedding', 'botanical-wall-prints', 'warm-fairy-lights', 'minimal-planter-set'].includes(p.id)
  );

  const toggleItem = (productId: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;
  const originalTotalPrice = lookProducts
    .filter((p) => selectedItems[p.id])
    .reduce((sum, p) => sum + p.price, 0);

  // 15% special bundle discount if at least 3 items selected
  const bundleDiscount = selectedCount >= 3 ? Math.round(originalTotalPrice * 0.15) : 0;
  const finalBundlePrice = originalTotalPrice - bundleDiscount;

  const handleBundleCheckout = () => {
    const productsToAdd = lookProducts.filter((p) => selectedItems[p.id]);
    if (productsToAdd.length > 0) {
      onAddBundle(productsToAdd);
    }
  };

  return (
    <section id="look" className="py-20 sm:py-24 px-5 sm:px-8 lg:px-14 max-w-[1340px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-10 items-stretch">
        {/* Left: Room Image with Pulsing Hotspots */}
        <div className="relative min-h-[480px] sm:min-h-[560px] rounded-[32px] overflow-hidden bg-[#ded8ca] shadow-[0_20px_50px_rgba(23,60,45,0.12)] border border-[#ddd8cc]">
          <img
            src="https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=1400&q=88"
            alt="Cozy bedroom styled with Zyntex home decor"
            className="w-full h-full object-cover"
          />

          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {/* Hotspots */}
          {LOOK_HOTSPOTS.map((spot) => {
            const isActive = activeHotspotId === spot.id;
            const product = PRODUCTS.find((p) => p.id === spot.productId);

            return (
              <div
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                {/* Hotspot Pin Button */}
                <button
                  onClick={() => setActiveHotspotId(spot.id)}
                  aria-label={`View ${spot.title}`}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-[3px] border-[#173c2d] shadow-[0_0_0_8px_rgba(255,255,255,0.45)] hover:shadow-[0_0_0_12px_rgba(255,255,255,0.65)] cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    isActive ? 'scale-125 ring-2 ring-[#8b6b4d] shadow-[0_0_0_10px_rgba(255,255,255,0.7)]' : ''
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#173c2d]" />
                </button>

                {/* Hotspot Floating Tooltip Card */}
                {isActive && product && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 sm:w-56 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white text-left z-30 animate-fade-in">
                    <div className="flex gap-2.5 items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#173c2d] truncate">
                          {product.name}
                        </p>
                        <p className="text-xs font-bold text-[#8b6b4d]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="mt-2 w-full py-1.5 bg-[#173c2d] hover:bg-[#23533f] text-white text-[11px] font-bold rounded-full transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add this item</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom badge on photo */}
          <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-[#173c2d] flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Click any glowing pin to inspect items</span>
          </div>
        </div>

        {/* Right: Look Copy and Interactive Checklist */}
        <div className="bg-[#173c2d] text-white rounded-[32px] p-7 sm:p-10 lg:p-12 flex flex-col justify-between shadow-[0_20px_50px_rgba(23,60,45,0.18)]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[2.5px] uppercase text-[#cfd9c9] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>One room. One mood.</span>
            </div>

            <h2 className="font-serif font-semibold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Shop the cozy bedroom.
            </h2>

            <p className="text-[#dce4db] text-sm sm:text-base leading-relaxed mt-3 mb-6 font-normal">
              Everything you need to turn an ordinary corner into your favourite place in the house. Perfectly coordinated colors, soft ambient glow, and tactile comfort.
            </p>

            {/* Checklist of Look Products */}
            <div className="space-y-2.5 my-6">
              {lookProducts.map((p) => {
                const isChecked = !!selectedItems[p.id];
                return (
                  <div
                    key={p.id}
                    onClick={() => toggleItem(p.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
                      isChecked
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/5 border-transparent text-white/50 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-[#8a9b82] border-[#8a9b82] text-white'
                            : 'border-white/30 bg-transparent'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-sm font-medium">{p.name}</span>
                    </div>
                    <span className="font-bold text-sm">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bundle Savings Callout */}
            {selectedCount >= 3 && (
              <div className="p-3.5 rounded-2xl bg-white/10 border border-amber-300/30 flex items-center justify-between text-xs text-amber-200 mb-6">
                <span>✦ 15% Full Bundle Discount Applied!</span>
                <span className="font-bold font-serif text-sm text-white">Save ₹{bundleDiscount}</span>
              </div>
            )}
          </div>

          {/* Pricing & CTA */}
          <div className="pt-6 border-t border-white/15">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-[#cfd9c9]">
                {selectedCount} item{selectedCount === 1 ? '' : 's'} selected
              </span>
              <div className="text-right">
                {bundleDiscount > 0 && (
                  <span className="text-xs line-through text-white/60 mr-2">
                    ₹{originalTotalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="font-serif font-bold text-2xl sm:text-3xl text-white">
                  ₹{finalBundlePrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={handleBundleCheckout}
              disabled={selectedCount === 0}
              className="w-full py-4 rounded-full bg-white text-[#173c2d] hover:bg-[#fffaf0] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {selectedCount === lookProducts.length
                  ? 'SHOP THIS COMPLETE LOOK'
                  : `ADD ${selectedCount} SELECTED TO BAG`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
