import React, { useEffect, useState, useRef } from 'react';
import { Scissors, Sparkles, Crown, Gem, Award, ShieldCheck } from 'lucide-react';

/**
 * 1. Top Golden Silk Scroll Progress Bar
 * Hardware GPU-accelerated (scaleX transform, 0 re-renders, 60fps locked)
 */
export const ScrollProgressBar: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0 && barRef.current) {
        const ratio = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        barRef.current.style.transform = `scaleX(${ratio})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className={`h-full origin-left will-change-transform ${
          theme === 'light'
            ? 'bg-gradient-to-r from-[#8a1c32] via-[#d85c72] to-[#b8324f] shadow-[0_0_12px_rgba(138,28,50,0.6)]'
            : 'bg-gradient-to-r from-[#8a1c32] via-[#f3cf98] via-[#d85c72] to-[#f3cf98] shadow-[0_0_14px_rgba(243,207,152,0.9)]'
        }`}
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

/**
 * 2. Infinite Haute-Couture Marquee Ribbon (Motionsites Signature Ticker)
 */
export const LuxuryMarqueeRibbon: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  const tickerItems = [
    { text: 'ROYAL BRIDAL LEHENGAS', icon: <Crown className="w-3.5 h-3.5" /> },
    { text: '18-POINT ANATOMICAL FIT', icon: <Scissors className="w-3.5 h-3.5" /> },
    { text: '24H EXPRESS ALTERATION LAB', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { text: 'MASTER HAND EMBROIDERY', icon: <Gem className="w-3.5 h-3.5" /> },
    { text: 'HIMACHAL PREMIER ATELIER', icon: <Award className="w-3.5 h-3.5" /> },
    { text: 'ZERO GAPING GUARANTEE', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className={`relative py-3.5 overflow-hidden select-none border-y transition-colors my-2 ${
      theme === 'light'
        ? 'bg-gradient-to-r from-[#f7f1ee] via-[#fff8f9] to-[#f7f1ee] border-[#8a1c32]/15 text-[#8a1c32]'
        : 'bg-gradient-to-r from-[#140408] via-[#240812] to-[#140408] border-[#f3cf98]/20 text-[#f3cf98]'
    }`}>
      {/* Edge Blur Vignettes */}
      <div className={`absolute left-0 inset-y-0 w-20 z-10 pointer-events-none ${
        theme === 'light'
          ? 'bg-gradient-to-r from-[#faf7f5] to-transparent'
          : 'bg-gradient-to-r from-[#120407] to-transparent'
      }`} />
      <div className={`absolute right-0 inset-y-0 w-20 z-10 pointer-events-none ${
        theme === 'light'
          ? 'bg-gradient-to-l from-[#faf7f5] to-transparent'
          : 'bg-gradient-to-l from-[#120407] to-transparent'
      }`} />

      <div className="marquee-track flex gap-8 whitespace-nowrap will-change-transform">
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-xs tracking-[0.25em] font-semibold uppercase shrink-0">
            <span className="opacity-80 group-hover:rotate-45 transition-transform">{item.icon}</span>
            <span className="font-display tracking-widest">{item.text}</span>
            <span className="opacity-40">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 3. Animated Counter Component with Viewport Trigger
 */
export const AnimatedCounter: React.FC<{
  end: number;
  suffix?: string;
  duration?: number;
}> = ({ end, suffix = '', duration = 1600 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

/**
 * 4. Zero-Overhead Spotlight Stub (Replaced by 100% GPU CSS Transitions)
 */
export const useGlobalCardSpotlight = () => {
  // Pure CSS hardware acceleration is now used in .card-spotlight for 0ms latency
};
