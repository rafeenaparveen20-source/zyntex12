import React, { useState } from 'react';
import { Sparkles, Sun, Moon, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onShopClick }) => {
  const [isWarmGlow, setIsWarmGlow] = useState(true);

  return (
    <header
      id="hero-section"
      className="relative min-h-[92vh] grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center pt-32 sm:pt-36 lg:pt-28 pb-16 px-5 sm:px-8 lg:px-14 max-w-[1340px] mx-auto overflow-hidden"
    >
      {/* Decorative ambient background blur circle */}
      <div
        className="absolute w-[440px] h-[440px] rounded-full bg-[#dfe7d8] filter blur-[90px] -right-24 top-20 opacity-70 pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute w-[360px] h-[360px] rounded-full bg-[#f1e5d3] filter blur-[80px] -left-20 bottom-10 opacity-60 pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Left Column Copy & CTAs */}
      <div className="z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee9df] border border-[#ddd8cc] text-[11px] sm:text-xs font-bold tracking-[2.5px] uppercase text-[#8b6b4d] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#8b6b4d]" />
          <span>Room Makeover • Curated Décor</span>
        </div>

        <span className="font-script text-3xl sm:text-4xl lg:text-[42px] text-[#8b6b4d] block font-semibold -mb-1 mt-1">
          Small changes. Big difference.
        </span>

        <h1 className="font-serif font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.92] tracking-tight text-[#173c2d] my-4 sm:my-5">
          Make your space <br className="hidden sm:inline" />
          <span className="italic font-normal">truly yours.</span>
        </h1>

        <p className="text-[#5c6159] text-base sm:text-lg leading-relaxed max-w-[500px] mb-8 font-normal">
          Beautiful little details for rooms that feel like you — from cozy washed linen bedding and botanical wall art to ambient fairy lighting, lush greenery, and smart small-space organizing.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5">
          <button
            id="hero-shop-btn"
            onClick={onShopClick}
            className="px-7 py-3.5 rounded-full bg-[#173c2d] text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-[#173c2d] shadow-[0_10px_25px_rgba(23,60,45,0.2)] hover:shadow-[0_14px_30px_rgba(23,60,45,0.28)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group"
          >
            <span>SHOP MAKEOVER PICKS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="px-7 py-3.5 rounded-full bg-transparent text-[#173c2d] font-bold text-xs sm:text-sm tracking-wider uppercase border border-[#173c2d]/70 hover:bg-[#173c2d]/5 active:bg-[#173c2d]/10 transition-colors flex items-center gap-1.5"
          >
            <span>ZYNTEX FINDS COVER LOOK</span>
            <span className="text-amber-600">✦</span>
          </button>
        </div>

        {/* Social Proof Stats */}
        <div className="mt-10 pt-6 border-t border-[#ddd8cc]/80 flex items-center gap-6 sm:gap-8 text-xs text-[#666b63]">
          <div>
            <span className="block font-serif font-bold text-xl sm:text-2xl text-[#173c2d]">4.9 / 5</span>
            <span className="text-[#8a9b82] font-medium">Customer Rating</span>
          </div>
          <div className="h-8 w-[1px] bg-[#ddd8cc]" />
          <div>
            <span className="block font-serif font-bold text-xl sm:text-2xl text-[#173c2d]">12,000+</span>
            <span className="text-[#8a9b82] font-medium">Spaces Styled</span>
          </div>
          <div className="h-8 w-[1px] bg-[#ddd8cc]" />
          <div>
            <span className="block font-serif font-bold text-xl sm:text-2xl text-[#173c2d]">100%</span>
            <span className="text-[#8a9b82] font-medium">Cozy Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Visual Card with Notes */}
      <div className="relative group">
        <div
          className={`relative rounded-[32px] sm:rounded-[38px] overflow-hidden bg-[#ded8ca] shadow-[0_25px_65px_rgba(23,60,45,0.16)] border-4 border-white transition-all duration-700 ${
            isWarmGlow ? 'brightness-[1.03] contrast-[1.02]' : 'brightness-95'
          }`}
        >
          <img
            src="/zyntex-reference.jpg"
            alt="Zyntex room makeover inspiration"
            className="w-full h-[460px] sm:h-[560px] lg:h-[590px] object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700"
            onError={(e) => {
              // Fallback to high-res aesthetic cozy bedroom if needed
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85';
            }}
          />

          {/* Golden hour warm lighting overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-tr from-[#8b6b4d]/20 via-[#173c2d]/10 to-amber-100/25 pointer-events-none transition-opacity duration-500 ${
              isWarmGlow ? 'opacity-100' : 'opacity-20'
            }`}
          />

          {/* Sticky Post-it Note 1 */}
          <div
            className="absolute -left-2 sm:-left-4 top-14 sm:top-16 bg-[#fffaf0]/95 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 shadow-[0_12px_28px_rgba(0,0,0,0.14)] font-script font-semibold text-lg sm:text-2xl text-[#173c2d] -rotate-6 rounded-sm border border-[#e8dfcf] transform hover:rotate-0 transition-transform cursor-default"
          >
            <span>Style your space,</span>
            <br />
            <span className="text-[#8b6b4d]">your way ✦</span>
          </div>

          {/* Sticky Post-it Note 2 */}
          <div
            className="absolute -right-2 sm:-right-4 bottom-12 sm:bottom-14 bg-[#fffaf0]/95 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 shadow-[0_12px_28px_rgba(0,0,0,0.14)] font-script font-semibold text-lg sm:text-2xl text-[#173c2d] rotate-3 rounded-sm border border-[#e8dfcf] transform hover:rotate-0 transition-transform cursor-default"
          >
            <span>Pinteresty. Cozy. Yours.</span>
          </div>

          {/* Floating Lighting Mode Switcher */}
          <button
            onClick={() => setIsWarmGlow(!isWarmGlow)}
            title="Toggle Warm Glow vs Daylight"
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-md hover:bg-white text-[#173c2d] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 border border-white/80 transition-all hover:scale-105"
          >
            {isWarmGlow ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>Warm Fairy Glow</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Daylight Mood</span>
              </>
            )}
          </button>
        </div>

        {/* Playful Floating Botanical Accents */}
        <div className="absolute -top-4 -left-3 text-3xl opacity-75 select-none animate-bounce duration-1000 text-[#173c2d]">
          ✿
        </div>
        <div className="absolute -bottom-4 left-1/4 text-3xl opacity-60 select-none text-[#8a9b82]">
          ❧
        </div>
        <div className="absolute top-1/2 -right-4 text-3xl opacity-70 select-none text-[#8b6b4d]">
          ⌁
        </div>
      </div>
    </header>
  );
};
