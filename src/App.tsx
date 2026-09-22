import React, { useState } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ZyntexCoverSection } from './components/ZyntexCoverSection';
import { MoodCollections } from './components/MoodCollections';
import { ProductGrid } from './components/ProductGrid';
import { ShopTheLook } from './components/ShopTheLook';
import { MiniRoomDecorIdeas } from './components/MiniRoomDecorIdeas';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { WhyZyntex } from './components/WhyZyntex';
import { QuoteSection } from './components/QuoteSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => (prev.message === message ? { ...prev, visible: false } : prev));
    }, 2800);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`${product.name} added to your bag ✦`);
  };

  const handleAddBundle = (products: Product[]) => {
    setCartItems((prev) => {
      let updated = [...prev];
      products.forEach((product) => {
        const index = updated.findIndex((item) => item.product.id === product.id);
        if (index > -1) {
          updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
        } else {
          updated.push({ product, quantity: 1 });
        }
      });
      return updated;
    });
    showToast(`Complete Cozy Room bundle added to bag! ✦`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from your bag');
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast('Removed from wishlist');
      } else {
        next.add(product.id);
        showToast('Added to your wishlist ♡');
      }
      return next;
    });
  };

  const handleAddAllWishlistToCart = () => {
    const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));
    handleAddBundle(wishlistedProducts);
    setWishlistIds(new Set());
    setIsWishlistOpen(false);
  };

  const handleApplyPromo = (code: string): boolean => {
    if (code.trim().toUpperCase() === 'COZY10') {
      setAppliedPromo('COZY10');
      showToast('Coupon COZY10 applied: 10% discount! ✦');
      return true;
    }
    return false;
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const wishlistCount = wishlistIds.size;
  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));

  return (
    <div className="min-h-screen bg-[#f7f3ea] text-[#20251f] selection:bg-[#173c2d] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        wishlistCount={wishlistCount}
        cartCount={cartCount}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onShopClick={() => scrollToSection('shop')}
          onExploreClick={() => scrollToSection('cover')}
        />

        {/* Curated Cover Page: Home Décor • Zyntex Finds */}
        <ZyntexCoverSection
          onAddToCart={handleAddToCart}
          onAddBundle={handleAddBundle}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Shop by Mood / Collections */}
        <MoodCollections
          onSelectMood={(moodId) => {
            if (moodId === 'modern-luxe') setSelectedCategory('wall-art');
            else if (moodId === 'cozy-warm') setSelectedCategory('lighting');
            else if (moodId === 'dreamy-bedroom') setSelectedCategory('bedding');
            else if (moodId === 'minimal-clean') setSelectedCategory('plants-storage');
            else setSelectedCategory('all');
          }}
        />

        {/* Curated Products Shop Grid */}
        <ProductGrid
          products={PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Interactive Shop The Look Bedroom */}
        <ShopTheLook
          onAddToCart={handleAddToCart}
          onAddBundle={handleAddBundle}
        />

        {/* Mini Room Decor Ideas (from uploaded Pinterest moodboard) */}
        <MiniRoomDecorIdeas
          onSelectProduct={(productId) => {
            const product = PRODUCTS.find((p) => p.id === productId);
            if (product) {
              setSelectedCategory(product.category);
            }
          }}
        />

        {/* Before / After Transformation Slider */}
        <BeforeAfterSlider />

        {/* Why Zyntex Benefits */}
        <WhyZyntex />

        {/* Aesthetic Quote Banner */}
        <QuoteSection />

        {/* Newsletter Signup */}
        <Newsletter onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onAddAllToCart={handleAddAllWishlistToCart}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
          setIsSearchOpen(false);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromo={appliedPromo}
        onOrderSuccess={() => {
          setCartItems([]);
          showToast('Order confirmed! Happy room styling ✦');
        }}
      />

      {/* Toast Notification */}
      <div
        id="toast-notification"
        className={`fixed z-50 bottom-6 left-1/2 -translate-x-1/2 bg-[#173c2d] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 pointer-events-none transition-all duration-300 ${
          toast.visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
