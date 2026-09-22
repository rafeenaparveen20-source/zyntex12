import React from 'react';
import { Sparkles } from 'lucide-react';

export const WhyZyntex: React.FC = () => {
  const benefits = [
    {
      symbol: '◌',
      title: 'Stylish Décor',
      desc: 'Curated pieces that feel effortlessly beautiful and Pinterest-ready.',
    },
    {
      symbol: '⌂',
      title: 'Easy to Install',
      desc: 'Simple, renter-friendly upgrades without complicated tool projects.',
    },
    {
      symbol: '♡',
      title: 'Affordable Luxury',
      desc: 'Premium natural materials and tactile details without the premium markup.',
    },
    {
      symbol: '✦',
      title: 'Room Transformations',
      desc: 'Small intentional touches that completely change the room energy.',
    },
    {
      symbol: '❧',
      title: 'Eco-Minded',
      desc: 'Thoughtful fabrics and natural wood choices for mindful living.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 px-5 sm:px-8 lg:px-14 max-w-[1340px] mx-auto">
      {/* Section Head */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[2.5px] text-[#8b6b4d] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Why Zyntex</span>
        </div>
        <h2 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#173c2d]">
          Beautiful by design.
        </h2>
      </div>

      {/* Benefits Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-[22px] bg-[#eee9df]/80 border border-[#ddd8cc] text-center hover:bg-white hover:shadow-[0_12px_28px_rgba(23,60,45,0.06)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-white/80 flex items-center justify-center text-2xl text-[#173c2d] mb-4 shadow-sm font-serif">
              {b.symbol}
            </div>
            <h3 className="font-serif font-bold text-lg text-[#173c2d] mb-2">
              {b.title}
            </h3>
            <p className="text-xs sm:text-[13px] text-[#696e67] leading-relaxed">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
