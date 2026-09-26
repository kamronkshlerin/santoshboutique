import React, { useRef, useState, useEffect } from 'react';
import { 
  Instagram, Facebook, ExternalLink, Play, 
  ChevronLeft, ChevronRight, Sparkles, Film
} from 'lucide-react';
import { 
  INSTAGRAM_URL, FACEBOOK_URL 
} from '../constants';

interface InstagramReelItem {
  id: string;
  shortcode: string;
  permalink: string;
  title: string;
  category: string;
}

// 100% Real Live Reels from @santoshboutiquehp
const REAL_INSTAGRAM_REELS: InstagramReelItem[] = [
  {
    id: 'reel-1',
    shortcode: 'Ddtkkr7jA4y',
    permalink: 'https://www.instagram.com/reel/Ddtkkr7jA4y/',
    title: 'Designer Silk Suit with Embroidered Neckline & Rich Flare',
    category: 'Festive Kurti Suit',
  },
  {
    id: 'reel-2',
    shortcode: 'Ddu2_MXEVoZ',
    permalink: 'https://www.instagram.com/reel/Ddu2_MXEVoZ/',
    title: 'Handcrafted Heart Cutout Sleeve Design with Pearl Beads',
    category: 'Trending Sleeve Design',
  },
  {
    id: 'reel-3',
    shortcode: 'DdsZDjbj30q',
    permalink: 'https://www.instagram.com/reel/DdsZDjbj30q/',
    title: 'Intricate Center Slit Pearl Border Craftsmanship',
    category: 'Artisanal Neckline',
  },
  {
    id: 'reel-4',
    shortcode: 'DdsZB6BDYeq',
    permalink: 'https://www.instagram.com/reel/DdsZB6BDYeq/',
    title: 'Scalloped Edge Daman with Hand-stitched Pearl Detailing',
    category: 'Scallop Daman & Ghera',
  },
  {
    id: 'reel-5',
    shortcode: 'DdrgmEgjIG4',
    permalink: 'https://www.instagram.com/reel/DdrgmEgjIG4/',
    title: 'Santosh Boutique Studio & Master Tailor Tour in Fatoh',
    category: 'Atelier Studio Tour',
  },
];

export const SocialFeedShowcase: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    
    const cardWidth = 320;
    const current = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(current, REAL_INSTAGRAM_REELS.length - 1));
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const offset = direction === 'left' ? -340 : 340;
    sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const cardWidth = 336; // 320px width + 16px gap
    sliderRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#120407] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#d85c72]/15 via-[#8a1c32]/10 to-[#f3cf98]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#f3cf98]/20">
              <Film className="w-3.5 h-3.5 text-[#d85c72]" />
              <span>Real Customer Outfits &amp; Studio Reels</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#fff7f2] tracking-tight leading-tight">
              Watch Our Latest <span className="italic gold-gradient-text">Instagram Reels</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#d1b8b8] mt-2 max-w-xl">
              Naye Punjabi suit designs, handcrafted necklines, custom sleeves aur boutique studio ki live videos reel slider me dekhein.
            </p>
          </div>

          {/* Social Follow Actions & Slide Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-xs font-bold hover:brightness-110 shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @santoshboutiquehp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1877F2] text-white text-xs font-bold hover:brightness-110 shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Slider Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous Reels"
                className={`p-2.5 rounded-xl border transition-all ${
                  canScrollLeft 
                    ? 'liquid-glass border-white/20 text-white hover:bg-white/10 hover:border-[#f3cf98]/50' 
                    : 'border-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Next Reels"
                className={`p-2.5 rounded-xl border transition-all ${
                  canScrollRight 
                    ? 'liquid-glass border-white/20 text-white hover:bg-white/10 hover:border-[#f3cf98]/50' 
                    : 'border-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Real Reels Carousel / Slider */}
        <div 
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {REAL_INSTAGRAM_REELS.map((reel) => (
            <div
              key={reel.id}
              className="w-[280px] sm:w-[320px] flex-shrink-0 snap-center rounded-3xl overflow-hidden liquid-glass border border-white/15 hover:border-[#f3cf98]/60 transition-all duration-300 shadow-2xl flex flex-col group"
            >
              {/* Top Reel Info Header */}
              <div className="p-3.5 pb-2.5 flex items-center justify-between border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#f3cf98] via-[#d85c72] to-[#8a1c32] p-[1.5px] flex items-center justify-center">
                    <div className="w-full h-full bg-[#120407] rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-[#f3cf98] fill-[#f3cf98]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white leading-none">
                      santoshboutiquehp
                    </h4>
                    <span className="text-[9px] text-[#f3cf98] font-medium">
                      {reel.category}
                    </span>
                  </div>
                </div>

                <a
                  href={reel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-[#8a1c32] text-[10px] font-semibold text-white/90 transition-all flex items-center gap-1"
                >
                  <Instagram className="w-2.5 h-2.5" />
                  <span>Open Reel</span>
                </a>
              </div>

              {/* Instagram Reel Native Embed Player Container */}
              <div className="relative w-full h-[470px] bg-black overflow-hidden">
                <iframe
                  src={`https://www.instagram.com/reel/${reel.shortcode}/embed/`}
                  title={reel.title}
                  className="w-full h-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Bottom Card Footer */}
              <div className="p-3 bg-black/50 border-t border-white/10 flex items-center justify-between text-xs">
                <p className="text-[11px] text-[#d1b8b8] line-clamp-1 flex-1 pr-2">
                  {reel.title}
                </p>
                <a
                  href={reel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-[#f3cf98] hover:text-white flex items-center gap-0.5 whitespace-nowrap transition-colors"
                >
                  <span>Watch</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Slide Indicators */}
        <div className="flex justify-center items-center gap-1.5 mt-6">
          {REAL_INSTAGRAM_REELS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === idx 
                  ? 'w-6 bg-[#f3cf98]' 
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Bottom Tagline / CTA */}
        <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[#d1b8b8]">
          <span className="flex items-center gap-1.5 text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-[#f3cf98]" />
            Naye designs roz Instagram Reel me post hote hain!
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Tag karein <strong className="text-[#f3cf98]">@santoshboutiquehp</strong> apne custom outfit video me!
          </span>
        </div>
      </div>
    </section>
  );
};
