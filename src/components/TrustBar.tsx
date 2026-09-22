import React from 'react';
import { Scissors, Clock, HeartHandshake } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="trustbar-section relative py-8 bg-[#18050a] border-y border-[#f3cf98]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8">
          {/* Quote Pill from Flyer */}
          <div className="flex items-center gap-3 liquid-glass px-4 py-2.5 rounded-2xl border border-[#f3cf98]/20 shadow-sm">
            <span className="text-2xl text-[#d85c72]">❝</span>
            <div>
              <p className="font-display italic text-sm sm:text-base text-[#f3cf98]">
                Beautiful Outfits, Happier You
              </p>
              <p className="text-[11px] text-[#d1b8b8] tracking-wider uppercase font-medium">
                We Stitch Confidence
              </p>
            </div>
            <span className="text-2xl self-end text-[#d85c72]">❞</span>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#fff7f2]/90">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#d85c72]/20 border border-[#d85c72]/40 flex items-center justify-center text-[#d85c72]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#fff7f2]">Express Turnaround</p>
                <p className="text-[11px] text-[#d1b8b8]">24 - 48 Hour Delivery Available</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#f3cf98]/20 border border-[#f3cf98]/40 flex items-center justify-center text-[#f3cf98]">
                <Scissors className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#fff7f2]">Bespoke Made-to-Measure</p>
                <p className="text-[11px] text-[#d1b8b8]">100% Guaranteed Custom Fitting</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#fff7f2]">Local Tailor Trusted</p>
                <p className="text-[11px] text-[#d1b8b8]">By Your Bilaspur Neighbours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
