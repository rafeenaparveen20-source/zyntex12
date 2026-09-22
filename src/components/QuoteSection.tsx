import React from 'react';

export const QuoteSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-5 sm:px-8 lg:px-14 max-w-[1340px] mx-auto">
      <div className="bg-[#e1e8dc]/75 border border-[#ced8c7] rounded-[36px] py-16 sm:py-20 px-6 sm:px-12 text-center shadow-[0_15px_40px_rgba(23,60,45,0.06)] relative overflow-hidden">
        {/* Soft decorative flower symbols */}
        <span className="absolute top-6 left-8 text-3xl text-[#173c2d]/20 select-none">✿</span>
        <span className="absolute bottom-6 right-8 text-3xl text-[#8b6b4d]/25 select-none">❧</span>

        <blockquote className="font-serif font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight text-[#173c2d] max-w-4xl mx-auto tracking-tight">
          “A beautiful room isn't about having more. <br className="hidden md:inline" />
          It's about choosing what feels like you.”
        </blockquote>

        <cite className="font-script text-2xl sm:text-3xl text-[#8b6b4d] block mt-5 not-italic font-semibold">
          — The Zyntex mood ✦
        </cite>
      </div>
    </section>
  );
};
