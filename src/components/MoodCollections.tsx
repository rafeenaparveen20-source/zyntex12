import React, { useState } from 'react';
import { MOOD_COLLECTIONS } from '../data/products';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface MoodCollectionsProps {
  onSelectMood: (moodId: string) => void;
}

export const MoodCollections: React.FC<MoodCollectionsProps> = ({ onSelectMood }) => {
  const [activeMood, setActiveMood] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setActiveMood(id);
    onSelectMood(id);
    // Smooth scroll down to products with an offset
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="mood" className="py-20 sm:py-24 px-5 sm:px-8 lg:px-14 max-w-[1340px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[2.5px] text-[#8b6b4d] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find your vibe</span>
          </div>
          <h2 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#173c2d]">
            Shop by mood
          </h2>
        </div>
        <p className="max-w-md text-[#666b63] text-base leading-relaxed">
          Turn Pinterest inspiration into a room you actually want to come home to. Explore curated aesthetic styles tailored for calm and cozy living.
        </p>
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOOD_COLLECTIONS.map((mood, idx) => {
          const isTaller = idx === 0 || idx === 3;
          return (
            <div
              key={mood.id}
              onClick={() => handleCardClick(mood.id)}
              className={`group relative rounded-[26px] overflow-hidden bg-[#ded8ca] shadow-[0_10px_30px_rgba(23,60,45,0.06)] hover:shadow-[0_20px_45px_rgba(23,60,45,0.15)] transition-all duration-500 cursor-pointer ${
                isTaller ? 'h-[430px]' : 'h-[370px]'
              }`}
            >
              {/* Image */}
              <img
                src={mood.image}
                alt={mood.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Floating aesthetic chip */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#173c2d] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0">
                <span>Explore Vibe</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>

              {/* Glass Info Overlay (matching user's design) */}
              <div className="absolute inset-x-3.5 bottom-3.5 p-4 sm:p-5 rounded-[20px] bg-[#fffdf8]/90 backdrop-blur-md border border-white/70 shadow-lg group-hover:bg-white/95 transition-all">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-semibold text-xl sm:text-2xl text-[#173c2d]">
                    {mood.title}
                  </h3>
                  <span className="text-xs font-script text-[#8b6b4d] text-base sm:text-lg">
                    {mood.tagline.split('•')[0]}
                  </span>
                </div>
                <p className="text-xs text-[#6c7069] mt-1 font-medium">
                  {mood.tagline}
                </p>
                <div className="mt-2 pt-2 border-t border-[#ddd8cc]/50 flex items-center justify-between text-[11px] text-[#8b6b4d] font-semibold">
                  <span>{mood.featured}</span>
                  <span className="underline decoration-dotted group-hover:text-[#173c2d]">Shop Items &rarr;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
