import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddAllToCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onAddAllToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbfaf6] shadow-2xl flex flex-col justify-between border-l border-[#ddd8cc]">
          {/* Header */}
          <div className="p-6 border-b border-[#ddd8cc] bg-white/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h2 className="font-serif font-semibold text-xl text-[#173c2d]">
                Your Wishlist
              </h2>
              <span className="text-xs bg-[#eee9df] text-[#8b6b4d] font-bold px-2 py-0.5 rounded-full">
                {wishlistedProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#eee9df] transition-colors text-[#20251f]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#eee9df] flex items-center justify-center text-2xl mb-4">
                  ♡
                </div>
                <h3 className="font-serif font-bold text-xl text-[#173c2d] mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#666b63] max-w-xs mb-6">
                  Save pieces you love while exploring room makeovers and moodboards.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#173c2d] text-white text-xs font-bold rounded-full uppercase tracking-wider"
                >
                  BROWSE PRODUCTS
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-white border border-[#ddd8cc] shadow-sm relative group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-[#ded8ca]"
                  />
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="font-serif font-semibold text-sm text-[#173c2d] truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-[#20251f] mt-0.5">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="mt-3 px-3 py-1.5 rounded-full bg-[#173c2d] hover:bg-[#23533f] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="absolute top-2.5 right-2.5 text-[#8a9b82] hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 bg-white border-t border-[#ddd8cc]">
              <button
                onClick={onAddAllToCart}
                className="w-full py-3.5 rounded-full bg-[#173c2d] hover:bg-[#23533f] text-white font-bold text-xs tracking-wider uppercase shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>ADD ALL ({wishlistedProducts.length}) TO BAG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
