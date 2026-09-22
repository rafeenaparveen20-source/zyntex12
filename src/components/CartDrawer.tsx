import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Check, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedPromo,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1999;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedPromo === 'COZY10' ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 149;
  const total = subtotal - discount + shipping;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const success = onApplyPromo(promoInput);
    if (!success) {
      setPromoError('Invalid coupon. Try using COZY10');
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbfaf6] shadow-2xl flex flex-col justify-between border-l border-[#ddd8cc]">
          {/* Header */}
          <div className="p-6 border-b border-[#ddd8cc] bg-white/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#173c2d]" />
                <h2 className="font-serif font-semibold text-xl text-[#173c2d]">
                  Your Styling Bag
                </h2>
                <span className="text-xs bg-[#eee9df] text-[#8b6b4d] font-bold px-2 py-0.5 rounded-full">
                  {items.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#eee9df] transition-colors text-[#20251f]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="mt-4 pt-3 border-t border-[#ddd8cc]/60">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                {remainingForFreeShipping > 0 ? (
                  <span className="text-[#5c6159]">
                    Add <strong className="text-[#173c2d]">₹{remainingForFreeShipping}</strong> more for Free Delivery
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Free Delivery Unlocked!
                  </span>
                )}
                <span className="text-[#8a9b82] text-[11px] font-bold">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#eee9df] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#173c2d] rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#eee9df] flex items-center justify-center text-2xl mb-4">
                  👜
                </div>
                <h3 className="font-serif font-bold text-xl text-[#173c2d] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#666b63] max-w-xs mb-6">
                  Explore our cozy room picks and start styling your room makeover.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#173c2d] text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-sm"
                >
                  START STYLING
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-white border border-[#ddd8cc] shadow-sm relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-[#ded8ca]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start pr-6">
                      <h4 className="font-serif font-semibold text-sm text-[#173c2d] truncate">
                        {item.product.name}
                      </h4>
                    </div>
                    <p className="text-xs font-bold text-[#20251f] mt-0.5">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center border border-[#ddd8cc] rounded-full bg-[#fbfaf6]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#5c6159] hover:text-[#173c2d]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2 text-[#20251f]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#5c6159] hover:text-[#173c2d]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-[11px] text-[#8a9b82] ml-auto font-medium">
                        Total: ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Remove Item Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="absolute top-2.5 right-2.5 text-[#8a9b82] hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#ddd8cc] space-y-4">
              {/* Promo code box */}
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon {appliedPromo} applied (10% OFF)</span>
                  </div>
                  <span className="font-bold">-₹{discount}</span>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Promo code (e.g. COZY10)"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#fbfaf6] border border-[#ddd8cc] text-xs font-medium uppercase placeholder:normal-case focus:outline-none focus:border-[#173c2d]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#eee9df] hover:bg-[#ddd8cc] text-[#173c2d] text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-rose-600">{promoError}</p>}

              {/* Price Details */}
              <div className="space-y-1.5 text-xs text-[#5c6159]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#173c2d] pt-2 border-t border-[#ddd8cc]">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-full bg-[#173c2d] hover:bg-[#23533f] text-white font-bold text-xs tracking-wider uppercase shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
