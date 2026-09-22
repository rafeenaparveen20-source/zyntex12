import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#173c2d] text-[#e8eee7] pt-16 pb-10 px-5 sm:px-8 lg:px-14 border-t border-[#173c2d]">
      <div className="max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="font-serif font-bold text-3xl text-white tracking-tight mb-3">
              Zyntex
            </h3>
            <p className="text-[#bdcbbd] text-sm leading-relaxed max-w-xs font-normal">
              Room makeover products for spaces that feel personal, cozy and completely yours. Thoughtfully curated for dreamers and creators.
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm text-[#8a9b82]">
              <span className="font-script text-xl text-amber-200">Small changes. Big difference.</span>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-4 tracking-wide">
              Shop Décor
            </h4>
            <ul className="space-y-2.5 text-sm text-[#bdcbbd]">
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#mood" className="hover:text-white transition-colors">
                  Shop by Mood
                </a>
              </li>
              <li>
                <a href="#look" className="hover:text-white transition-colors">
                  Shop the Look Bundle
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  Fairy Lights & Lamps
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  French Washed Linen
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-4 tracking-wide">
              Inspiration & Ideas
            </h4>
            <ul className="space-y-2.5 text-sm text-[#bdcbbd]">
              <li>
                <a href="#ideas" className="hover:text-white transition-colors">
                  Mini Room Decor Ideas
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Before & After Makeovers
                </a>
              </li>
              <li>
                <a href="#mood" className="hover:text-white transition-colors">
                  Pinterest Styling Tips
                </a>
              </li>
              <li>
                <a href="#look" className="hover:text-white transition-colors">
                  Compact Study Nooks
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Care */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-4 tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-[#bdcbbd]">
              <li>
                <span className="text-white font-medium">Free Delivery</span> on ₹1,999+
              </li>
              <li>
                <span className="text-white font-medium">7-Day</span> Easy Returns
              </li>
              <li>
                <span className="text-white font-medium">Eco-Safe</span> Recycled Packaging
              </li>
              <li>
                <span className="text-white font-medium">Support:</span> hello@zyntex.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#aebcaf]">
          <p>© 2026 Zyntex Home Décor. Make your space truly yours.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Shipping Info</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
