import React, { useState, useRef, useCallback } from 'react';
import { Scissors, Check, AlertCircle, ArrowLeftRight } from 'lucide-react';
import { ASSETS } from '../constants';

export const BeforeAfterAlteration: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <section id="alteration" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#f3cf98]/20">
            <Scissors className="w-3.5 h-3.5" />
            <span>Precision Alteration Technology</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#fff7f2] tracking-tight leading-tight mb-4">
            Transform Ill-Fitting Clothes into a{' '}
            <span className="italic gold-gradient-text">Couture Silhouette</span>
          </h2>

          <p className="text-sm sm:text-base text-[#d1b8b8] font-light">
            Drag the interactive scissors slider below to see how our bespoke alterations redefine posture, comfort, and confidence.
          </p>
        </div>

        {/* Interactive Split Slider Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden liquid-glass border border-[#f3cf98]/30 shadow-2xl select-none cursor-ew-resize"
          >
            {/* "After" Layer (Full width behind) - Bespoke Santosh Fitting */}
            <div className="absolute inset-0">
              <img
                src={ASSETS.hero}
                alt="Santosh Boutique Precision Tailored Suit"
                className="w-full h-full object-cover filter brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120407]/90 via-transparent to-black/30" />

              {/* After Badge */}
              <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-[#10b981]/90 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                <Check className="w-4 h-4" />
                <span>After: Santosh Boutique Tailored</span>
              </div>

              {/* After Bullet Callouts */}
              <div className="absolute bottom-6 right-6 max-w-xs text-right hidden sm:block">
                <p className="text-sm font-bold text-[#fff7f2] drop-shadow-md">
                  ✨ Flawless Hourglass Fit
                </p>
                <p className="text-xs text-[#f3cf98] drop-shadow">
                  Custom bust darts, no shoulder gaping, sharp hemline
                </p>
              </div>
            </div>

            {/* "Before" Layer (Clipped by slider position) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative w-full h-full" style={{ width: containerRef.current?.offsetWidth || '100%' }}>
                <img
                  src={ASSETS.suit}
                  alt="Standard Loose Readymade Fit"
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120407]/90 via-black/40 to-black/50" />

                {/* Before Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-[#8a1c32]/90 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                  <AlertCircle className="w-4 h-4 text-[#f3cf98]" />
                  <span>Before: Loose Readymade Fit</span>
                </div>

                {/* Before Bullet Callouts */}
                <div className="absolute bottom-6 left-6 max-w-xs text-left hidden sm:block">
                  <p className="text-sm font-bold text-[#fff7f2] drop-shadow-md">
                    ⚠️ Baggy Waist & Long Sleeves
                  </p>
                  <p className="text-xs text-[#d1b8b8] drop-shadow">
                    Ill-proportioned standard sizes bought online
                  </p>
                </div>
              </div>
            </div>

            {/* Central Drag Bar & Scissors Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-gradient-to-b from-[#f3cf98] via-[#d85c72] to-[#f3cf98] cursor-ew-resize shadow-[0_0_15px_rgba(243,207,152,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-tr from-[#8a1c32] to-[#d85c72] border-2 border-[#f3cf98] shadow-2xl flex items-center justify-center text-[#fff7f2] hover:scale-110 active:scale-95 transition-transform">
                <Scissors className="w-5 h-5 -rotate-45" />
              </div>
            </div>

            {/* Instruction pill on bottom center */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-[#d1b8b8] flex items-center gap-1.5 pointer-events-none">
              <ArrowLeftRight className="w-3 h-3 text-[#f3cf98]" />
              <span>Drag or slide to compare transformation</span>
            </div>
          </div>

          {/* Quick Alteration Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="liquid-glass p-3 rounded-2xl text-center border border-white/10">
              <p className="text-xs font-bold text-[#f3cf98]">⚡ 24h Express Delivery</p>
              <p className="text-[10px] text-[#d1b8b8]">Last minute function ready</p>
            </div>
            <div className="liquid-glass p-3 rounded-2xl text-center border border-white/10">
              <p className="text-xs font-bold text-[#f3cf98]">📐 Double Inner Margins</p>
              <p className="text-[10px] text-[#d1b8b8]">Easy future adjustments</p>
            </div>
            <div className="liquid-glass p-3 rounded-2xl text-center border border-white/10">
              <p className="text-xs font-bold text-[#f3cf98]">✨ Anti-Slip Shoulder Dori</p>
              <p className="text-[10px] text-[#d1b8b8]">Zero bra strap exposure</p>
            </div>
            <div className="liquid-glass p-3 rounded-2xl text-center border border-white/10">
              <p className="text-xs font-bold text-[#f3cf98]">🧵 Interlock & Overlock</p>
              <p className="text-[10px] text-[#d1b8b8]">Fray-proof lifelong finish</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
