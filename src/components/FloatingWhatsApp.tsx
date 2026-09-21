import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show polite helper tooltip after 4 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "Namaste Santosh Boutique! I want to ask about stitching prices, fabric requirements, and fitting appointments."
    );
    window.open(`https://wa.me/919816000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 select-none">
      {/* Gentle Floating Tooltip */}
      {showTooltip && (
        <div className="relative liquid-glass p-3.5 rounded-2xl border border-[#f3cf98]/30 shadow-2xl max-w-xs animate-fade-in flex items-start gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse mt-1.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-[#fff7f2]">
              Online for Sarti & Bilaspur
            </p>
            <p className="text-[11px] text-[#d1b8b8] mt-0.5 leading-snug">
              Got fabric or dress design? Tap to chat with our master tailor.
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/50 hover:text-white p-1 rounded-full"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Pulsing Action Button */}
      <button
        onClick={openWhatsApp}
        className="relative group p-4 rounded-full bg-gradient-to-tr from-[#25D366] via-[#128C7E] to-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        {/* Glow Ping Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};
