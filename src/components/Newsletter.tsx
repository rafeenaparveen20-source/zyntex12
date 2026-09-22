import React, { useState } from 'react';
import { Sparkles, Check, Copy } from 'lucide-react';

interface NewsletterProps {
  onShowToast: (msg: string) => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onShowToast }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    onShowToast('Welcome to Zyntex! Coupon COZY10 unlocked ✦');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('COZY10');
    setCopied(true);
    onShowToast('Coupon code COZY10 copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-14 max-w-[1340px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-[#fffaf0] border border-[#ddd8cc] rounded-[32px] p-8 sm:p-12 shadow-[0_15px_40px_rgba(23,60,45,0.06)]">
        {/* Left Copy */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[2.5px] text-[#8b6b4d] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Stay inspired</span>
          </div>
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#173c2d] tracking-tight">
            Little ideas. Big mood.
          </h2>
          <p className="text-[#666b63] text-sm sm:text-base leading-relaxed mt-2">
            Get room makeover lookbooks, secret flash sales, and design tips directly to your inbox. Plus, take 10% off your first styling order!
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full lg:max-w-md">
          {subscribed ? (
            <div className="p-5 rounded-2xl bg-[#eee9df] border border-[#ddd8cc] animate-fade-in text-center sm:text-left">
              <div className="flex items-center gap-2 text-[#173c2d] font-bold text-sm mb-1">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You're in the Zyntex inner circle!</span>
              </div>
              <p className="text-xs text-[#5c6159] mb-3">
                Use this exclusive coupon code at checkout for 10% off:
              </p>
              <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-xl border border-[#ddd8cc]">
                <code className="font-mono font-bold text-base text-[#173c2d]">
                  COZY10
                </code>
                <button
                  onClick={handleCopyCode}
                  className="text-xs font-bold text-[#8b6b4d] hover:text-[#173c2d] flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 rounded-full bg-white border border-[#ddd8cc] text-[#20251f] placeholder:text-[#8a9b82] text-sm focus:outline-none focus:ring-2 focus:ring-[#173c2d]/20 focus:border-[#173c2d]"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-[#173c2d] hover:bg-[#23533f] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all whitespace-nowrap active:scale-[0.98]"
              >
                JOIN ZYNTEX
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
