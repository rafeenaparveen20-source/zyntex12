import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed z-40 top-4 left-1/2 -translate-x-1/2 w-[min(1180px,calc(100%-28px))] flex items-center justify-between px-5 sm:px-7 py-3 transition-all duration-300 rounded-full border ${
          isScrolled
            ? 'bg-[#ffffff]/90 backdrop-blur-md shadow-[0_12px_35px_rgba(23,60,45,0.12)] border-white/80'
            : 'bg-[#ffffff]/75 backdrop-blur-sm shadow-[0_8px_25px_rgba(23,60,45,0.06)] border-white/70'
        }`}
      >
        <a
          href="#"
          id="brand-logo"
          className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-[#173c2d] hover:opacity-90 transition-opacity"
        >
          Zyntex
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-[#20251f]">
          <a
            href="#cover"
            id="nav-link-cover"
            className="hover:text-[#8b6b4d] transition-colors relative py-1 flex items-center gap-1 font-semibold text-[#173c2d] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8b6b4d] hover:after:w-full after:transition-all"
          >
            <span>Zyntex Finds</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          </a>
          <a
            href="#shop"
            id="nav-link-shop"
            className="hover:text-[#8b6b4d] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8b6b4d] hover:after:w-full after:transition-all"
          >
            Shop
          </a>
          <a
            href="#mood"
            id="nav-link-mood"
            className="hover:text-[#8b6b4d] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8b6b4d] hover:after:w-full after:transition-all"
          >
            Collections
          </a>
          <a
            href="#look"
            id="nav-link-look"
            className="hover:text-[#8b6b4d] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8b6b4d] hover:after:w-full after:transition-all"
          >
            Shop the Look
          </a>
          <a
            href="#ideas"
            id="nav-link-ideas"
            className="hover:text-[#8b6b4d] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8b6b4d] hover:after:w-full after:transition-all"
          >
            Room Ideas
          </a>
          <a
            href="#story"
            id="nav-link-story"
            className="hover:text-[#8b6b4d] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8b6b4d] hover:after:w-full after:transition-all"
          >
            Before / After
          </a>
        </div>

        {/* Icons Right */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            aria-label="Search décor and items"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#20251f] hover:bg-[#eee9df] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            id="nav-wishlist-btn"
            onClick={onOpenWishlist}
            aria-label="Open Wishlist"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#20251f] hover:bg-[#eee9df] transition-colors relative"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8b6b4d] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white animate-scale-in">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            aria-label="Open Shopping Bag"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#20251f] hover:bg-[#eee9df] transition-colors relative"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#173c2d] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#20251f] hover:bg-[#eee9df] transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute top-20 left-4 right-4 bg-[#fbfaf6] rounded-3xl p-6 shadow-2xl border border-[#ddd8cc]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4 font-serif text-lg text-[#173c2d]">
              <a
                href="#cover"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#ddd8cc]/60 flex items-center justify-between font-bold"
              >
                <div className="flex items-center gap-1.5">
                  <span>Zyntex Finds</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                </div>
                <span className="text-xs text-amber-700 bg-amber-100 font-sans font-bold px-2 py-0.5 rounded-full">Cover Look</span>
              </a>
              <a
                href="#shop"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#ddd8cc]/60 flex items-center justify-between"
              >
                <span>Shop Picks</span>
                <span className="text-xs text-[#8a9b82] font-sans">Curated</span>
              </a>
              <a
                href="#mood"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#ddd8cc]/60 flex items-center justify-between"
              >
                <span>Mood Collections</span>
                <span className="text-xs text-[#8a9b82] font-sans">6 Vibe Styles</span>
              </a>
              <a
                href="#look"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#ddd8cc]/60 flex items-center justify-between"
              >
                <span>Shop the Look</span>
                <span className="text-xs text-[#8a9b82] font-sans">Interactive Room</span>
              </a>
              <a
                href="#ideas"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#ddd8cc]/60 flex items-center justify-between"
              >
                <span>Room Ideas</span>
                <span className="text-xs text-[#8a9b82] font-sans">Small Space Hacks</span>
              </a>
              <a
                href="#story"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#ddd8cc]/60 flex items-center justify-between"
              >
                <span>Before & After</span>
                <span className="text-xs text-[#8a9b82] font-sans">Real Transformations</span>
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-[#ddd8cc] flex items-center justify-between text-xs text-[#666b63]">
              <span>Zyntex Room Makeover</span>
              <span>Free Delivery on ₹1,999+</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
