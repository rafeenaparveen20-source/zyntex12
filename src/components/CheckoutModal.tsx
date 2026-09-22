import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle, PackageCheck, CreditCard, ShieldCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromo: string | null;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedPromo,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    address: 'Flat 402, Green Meadows, 5th Main',
    city: 'Bengaluru',
    pincode: '560038',
    paymentMethod: 'upi',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedPromo === 'COZY10' ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : 149;
  const total = subtotal - discount + shipping;
  const orderId = 'ZYX-' + Math.floor(100000 + Math.random() * 900000);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6 flex items-center justify-center overflow-y-auto animate-fade-in">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#fbfaf6] rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#ddd8cc] z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[#eee9df] text-[#20251f] shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#8b6b4d]">
                Fast & Secure Checkout
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#173c2d] mt-1">
                Makeover Shipping Details
              </h3>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#173c2d] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ddd8cc] text-xs text-[#20251f] focus:outline-none focus:border-[#173c2d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#173c2d] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ddd8cc] text-xs text-[#20251f] focus:outline-none focus:border-[#173c2d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#173c2d] mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ddd8cc] text-xs text-[#20251f] focus:outline-none focus:border-[#173c2d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#173c2d] mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ddd8cc] text-xs text-[#20251f] focus:outline-none focus:border-[#173c2d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#173c2d] mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ddd8cc] text-xs text-[#20251f] focus:outline-none focus:border-[#173c2d]"
                />
              </div>

              {/* Payment selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#173c2d] mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / GPay' },
                    { id: 'card', label: 'Cards' },
                    { id: 'cod', label: 'Pay on Delivery' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-center ${
                        formData.paymentMethod === method.id
                          ? 'border-[#173c2d] bg-[#173c2d] text-white shadow-sm'
                          : 'border-[#ddd8cc] bg-white text-[#5c6159] hover:bg-[#eee9df]'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary line */}
              <div className="p-3.5 rounded-xl bg-[#eee9df] border border-[#ddd8cc] flex items-center justify-between text-xs font-semibold text-[#173c2d] mt-4">
                <span>Total Amount to Pay</span>
                <span className="font-serif text-base font-bold">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#173c2d] hover:bg-[#23533f] text-white font-bold text-xs tracking-wider uppercase shadow-lg transition-all"
              >
                PLACE ROOM MAKEOVER ORDER ✦
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-[2px] text-[#8b6b4d]">
              Order Confirmed
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#173c2d] my-1">
              Your room is getting styled!
            </h3>
            <p className="text-xs text-[#666b63] max-w-xs mx-auto mb-4">
              Order ID: <strong className="font-mono text-[#173c2d]">{orderId}</strong>. We're packing your aesthetic items with sustainable recycled wrap.
            </p>

            <div className="bg-white p-4 rounded-2xl border border-[#ddd8cc] text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between text-[#5c6159]">
                <span>Shipping to:</span>
                <span className="font-medium text-[#20251f]">{formData.name}</span>
              </div>
              <div className="flex justify-between text-[#5c6159]">
                <span>Destination:</span>
                <span className="font-medium text-[#20251f]">{formData.city}, {formData.pincode}</span>
              </div>
              <div className="flex justify-between text-[#5c6159]">
                <span>Total Paid:</span>
                <span className="font-bold text-[#173c2d]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#173c2d] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#23533f]"
            >
              CONTINUE BROWSING
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
