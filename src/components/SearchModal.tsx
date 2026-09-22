import React, { useState } from 'react';
import { Product } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularTags = [
    'Fairy lights',
    'Linen bedding',
    'Wall prints',
    'Planter set',
    'Under-bed storage',
    'Daisy pillow',
    'Desk lamp',
  ];

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6 flex items-start justify-center pt-20 animate-fade-in">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#fbfaf6] rounded-[28px] max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-[#ddd8cc] z-10">
        {/* Search Input Bar */}
        <div className="relative flex items-center mb-4">
          <Search className="w-5 h-5 text-[#8a9b82] absolute left-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cozy bedding, warm lights, shelves, storage..."
            autoFocus
            className="w-full pl-12 pr-10 py-3.5 bg-white rounded-full border border-[#ddd8cc] text-sm text-[#20251f] placeholder:text-[#8a9b82] focus:outline-none focus:ring-2 focus:ring-[#173c2d]/20 focus:border-[#173c2d]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 text-[#8a9b82] hover:text-[#173c2d]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4 px-1">
          <span className="text-xs text-[#8a9b82] font-semibold mr-1">Trending:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-[#eee9df] text-[#173c2d] hover:bg-[#ddd8cc] text-xs font-medium transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
          {query.trim() && filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#666b63]">
              No pieces found matching “{query}”. Try searching for “bedding”, “lights”, or “storage”.
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-white hover:bg-[#eee9df]/60 border border-[#ddd8cc]/60 cursor-pointer transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-semibold text-sm text-[#173c2d] truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold text-[#8b6b4d]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8a9b82]" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
