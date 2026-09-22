import React, { useState, useRef } from 'react';
import { Sparkles, SlidersHorizontal, Columns2, CheckCircle2 } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <section id="story" className="py-20 sm:py-24 px-5 sm:px-8 lg:px-14 max-w-[1340px] mx-auto">
      {/* Section Head */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[2.5px] text-[#8b6b4d] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The transformation</span>
          </div>
          <h2 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#173c2d]">
            See the difference
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="max-w-md text-[#666b63] text-base leading-relaxed">
            You don't need a complete renovation or expensive contractors. You just need the right curated details.
          </p>
          {/* Mode Switcher */}
          <div className="inline-flex p-1 bg-[#eee9df] rounded-full border border-[#ddd8cc] self-start sm:self-auto">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'slider'
                  ? 'bg-white text-[#173c2d] shadow-sm'
                  : 'text-[#666b63] hover:text-[#173c2d]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive Slider</span>
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'side-by-side'
                  ? 'bg-white text-[#173c2d] shadow-sm'
                  : 'text-[#666b63] hover:text-[#173c2d]'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
          </div>
        </div>
      </div>

      {/* Makeover Display */}
      {viewMode === 'slider' ? (
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative h-[420px] sm:h-[540px] rounded-[30px] overflow-hidden select-none cursor-ew-resize bg-[#ded8ca] shadow-[0_20px_50px_rgba(23,60,45,0.12)] border border-[#ddd8cc]"
        >
          {/* After Image (Background Layer) */}
          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85"
            alt="Room Makeover After - Warm aesthetic Zyntex room"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute right-5 bottom-5 bg-[#173c2d] text-white text-xs font-bold tracking-widest px-4 py-2 rounded-full uppercase shadow-lg">
            AFTER • ZYNTEX MAKEOVER
          </div>

          {/* Before Image (Clipped Foreground Layer) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=85"
              alt="Room Makeover Before - Plain room"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            />
            <div className="absolute left-5 bottom-5 bg-white/90 backdrop-blur-md text-[#20251f] text-xs font-bold tracking-widest px-4 py-2 rounded-full uppercase shadow-lg">
              BEFORE
            </div>
          </div>

          {/* Draggable Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.4)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#173c2d] shadow-xl flex items-center justify-center font-bold text-xs border-2 border-[#173c2d]">
              ⇄
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-[26px] overflow-hidden shadow-lg h-[400px] sm:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85"
              alt="Before makeover"
              className="w-full h-full object-cover"
            />
            <div className="absolute left-5 bottom-5 bg-[#fffdf3]/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-xs tracking-wider text-[#20251f]">
              BEFORE • PLAIN & UNINSPIRED
            </div>
          </div>

          <div className="relative rounded-[26px] overflow-hidden shadow-lg h-[400px] sm:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85"
              alt="After Zyntex makeover"
              className="w-full h-full object-cover"
            />
            <div className="absolute left-5 bottom-5 bg-[#173c2d] text-white px-4 py-2 rounded-full font-bold text-xs tracking-wider">
              AFTER • ZYNTEX WARM SANCTUARY
            </div>
          </div>
        </div>
      )}

      {/* Upgrades Checklist Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        {[
          { text: 'Soft Linen Bedding Layer', icon: '🛏️' },
          { text: 'Warm 2400K Fairy Lights', icon: '✨' },
          { text: 'Solid Pine Wall Shelves', icon: '🪵' },
          { text: 'Sliding Under-Bed Storage', icon: '📦' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#eee9df]/70 border border-[#ddd8cc] flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#173c2d]"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
