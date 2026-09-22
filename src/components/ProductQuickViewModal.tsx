import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center animate-fade-in">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#fbfaf6] rounded-[32px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#ddd8cc] z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#20251f] shadow-md transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Image */}
          <div className="rounded-[24px] overflow-hidden bg-[#e8e2d7] aspect-square relative shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 bg-[#173c2d] text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase">
                {product.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#8a9b82] mb-1 font-semibold">
              <span className="text-amber-500 font-bold">★ {product.rating}</span>
              <span>• {product.reviewCount} customer reviews</span>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#173c2d] leading-snug">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-3 my-3">
              <span className="font-serif font-bold text-2xl text-[#20251f]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-[#888888] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs bg-[#eee9df] text-[#8b6b4d] font-bold px-2 py-0.5 rounded-full">
                Save ₹{product.originalPrice - product.price}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5c6159] leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Spec details */}
            <div className="space-y-1.5 text-xs text-[#666b63] py-3 border-y border-[#ddd8cc] mb-6">
              {product.dimensions && (
                <div>
                  <strong className="text-[#173c2d]">Dimensions:</strong> {product.dimensions}
                </div>
              )}
              {product.material && (
                <div>
                  <strong className="text-[#173c2d]">Material:</strong> {product.material}
                </div>
              )}
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium pt-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>In Stock • Ready for quick dispatch</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 py-3 px-5 rounded-full bg-[#173c2d] hover:bg-[#23533f] text-white font-bold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                aria-label="Wishlist"
                className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-[#ddd8cc] text-[#20251f] hover:bg-[#eee9df]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
