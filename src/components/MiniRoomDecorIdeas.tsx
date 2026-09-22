import React, { useState } from 'react';
import { DECOR_IDEAS } from '../data/products';
import { Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';
import { Product } from '../types';

interface MiniRoomDecorIdeasProps {
  onSelectProduct: (productId: string) => void;
}

export const MiniRoomDecorIdeas: React.FC<MiniRoomDecorIdeasProps> = ({ onSelectProduct }) => {
  const [filter, setFilter] = useState<'all' | 'storage' | 'lighting' | 'wall' | 'plants' | 'corner'>('all');

  const filteredIdeas =
    filter === 'all'
      ? DECOR_IDEAS
      : DECOR_IDEAS.filter((idea) => idea.category === filter);

  return (
    <section id="ideas" className="py-20 sm:py-24 px-5 sm:px-8 lg:px-14 max-w-[1340px] mx-auto">
      {/* Centerpiece Banner */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eee9df] border border-[#ddd8cc] text-[11px] sm:text-xs font-bold tracking-[2.5px] uppercase text-[#8b6b4d] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#8b6b4d]" />
          <span>Pinterest Inspiration Guide</span>
        </div>

        <h2 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#173c2d]">
          Mini Room Decor Ideas
        </h2>
        <span className="font-script text-3xl sm:text-4xl text-[#8b6b4d] font-semibold block mt-1">
          Small Space, Big Dreams ✨
        </span>
        <p className="text-[#666b63] text-sm sm:text-base mt-3 leading-relaxed">
          Clever vertical styling, cozy ambient corners, and intentional storage ideas to transform compact bedrooms and apartments into dreamy personal sanctuaries.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'All 10 Ideas' },
            { id: 'lighting', label: 'Fairy Lights & Glow' },
            { id: 'storage', label: 'Hidden & Wall Storage' },
            { id: 'wall', label: 'Grid & Gallery Walls' },
            { id: 'corner', label: 'Study & Chill Corners' },
            { id: 'plants', label: 'Lush Botanical' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === cat.id
                  ? 'bg-[#173c2d] text-white shadow-sm'
                  : 'bg-[#fbfaf6] text-[#666b63] border border-[#ddd8cc] hover:bg-[#eee9df]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Mini Room Ideas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <article
            key={idea.id}
            className="group bg-[#fbfaf6] border border-[#ddd8cc] rounded-[24px] overflow-hidden p-3.5 flex flex-col justify-between hover:shadow-[0_16px_35px_rgba(23,60,45,0.08)] hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] mb-3 bg-[#e8e2d7]">
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm">
                  <span>{idea.icon}</span>
                  <span className="capitalize text-[10px] font-bold text-[#173c2d]">
                    {idea.category}
                  </span>
                </div>
              </div>

              {/* Handwritten style quote note */}
              <div className="px-1 mb-1">
                <span className="font-script text-2xl text-[#8b6b4d] font-semibold block leading-tight">
                  “{idea.title}”
                </span>
                <p className="text-xs text-[#5c6159] mt-1.5 leading-relaxed">
                  {idea.note}
                </p>
              </div>
            </div>

            {/* Shop matching item link */}
            {idea.relatedProductId && (
              <div className="mt-4 pt-3 border-t border-[#ddd8cc]/60 px-1">
                <button
                  onClick={() => {
                    onSelectProduct(idea.relatedProductId!);
                    const shopEl = document.getElementById('shop');
                    if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#173c2d] hover:text-[#8b6b4d] flex items-center justify-between w-full transition-colors group/btn"
                >
                  <span>Shop Décor for this Idea</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
