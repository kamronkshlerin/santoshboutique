import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown, Maximize2, Minimize2, ArrowRight } from 'lucide-react';
import { MODEL_STORY_IMG, MODEL_FITTING_IMG } from '../assets_models';

interface Chapter {
  id: string;
  number: string;
  title: string;
  quote: string;
  tag: string;
  targetId: string;
  model: 'story' | 'fitting';
}

const CHAPTERS: Chapter[] = [
  {
    id: 'hero',
    number: '01 / 07',
    title: 'Haute Atelier Welcome',
    quote: '"Every stitch carries the grace of Himachali craftsmanship."',
    tag: 'Royal Bridal Silhouette',
    targetId: 'top',
    model: 'story',
  },
  {
    id: 'trust',
    number: '02 / 07',
    title: '15+ Years Trust & Craft',
    quote: '"No factory shortcuts. Individual hand-cut patterns only."',
    tag: 'Master Tailor Promise',
    targetId: 'trust',
    model: 'story',
  },
  {
    id: 'services',
    number: '03 / 07',
    title: '5 Tailoring Disciplines',
    quote: '"From 32-pleat Patiala salwars to architectural bridal blouses."',
    tag: 'Couture Specialties',
    targetId: 'services',
    model: 'story',
  },
  {
    id: 'configurator',
    number: '04 / 07',
    title: 'Custom Measurement Studio',
    quote: '"18 anatomical body measurements for a zero-wrinkle contour."',
    tag: 'Live Fitting & Quote',
    targetId: 'configurator',
    model: 'fitting',
  },
  {
    id: 'alteration',
    number: '05 / 07',
    title: 'Express 24h Alteration Lab',
    quote: '"Transforming loose ready-made clothes into bespoke fits."',
    tag: 'Precision Restyling',
    targetId: 'alteration',
    model: 'fitting',
  },
  {
    id: 'lookbook',
    number: '06 / 07',
    title: 'Real Client Creations',
    quote: '"Over 1,000+ bridal lehengas crafted for Himachal brides."',
    tag: 'Atelier Portfolio',
    targetId: 'lookbook',
    model: 'story',
  },
  {
    id: 'location',
    number: '07 / 07',
    title: 'Visit Studio in Fatoh',
    quote: '"Walk in with your fabric or consult our master tailor in person."',
    tag: 'Bilaspur Landmark',
    targetId: 'location',
    model: 'story',
  },
];

export const StoryScrollMuse: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      setScrollProgress(progress);

      // Determine active section based on DOM element positions
      const sectionIds = ['hero', 'trust', 'services', 'configurator', 'alteration', 'lookbook', 'location'];
      let currentIdx = 0;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            currentIdx = i;
            break;
          }
        }
      }

      setActiveChapterIndex(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  const scrollToChapter = (idx: number) => {
    const chap = CHAPTERS[idx];
    if (!chap) return;
    if (chap.targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(chap.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentModelImg = activeChapter.model === 'fitting' ? MODEL_FITTING_IMG : MODEL_STORY_IMG;

  return (
    <>
      {/* ================= BACKGROUND PARALLAX EMBROIDERY THREAD (MOTIONSITES FX) ================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft radial atmospheric burgundy glow that moves with scroll */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-[#8a1c32]/15 blur-[120px] transition-all duration-1000 ease-out"
          style={{
            top: `${20 + (scrollProgress * 0.6)}%`,
            right: `${10 + Math.sin(scrollProgress * 0.05) * 15}%`,
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-[#f3cf98]/10 blur-[140px] transition-all duration-1000 ease-out"
          style={{
            bottom: `${15 + (scrollProgress * 0.4)}%`,
            left: `${5 + Math.cos(scrollProgress * 0.05) * 10}%`,
          }}
        />
      </div>

      {/* ================= DESKTOP & TABLET: MOTIONSITE CINEMATIC STORY MUSE CARD ================= */}
      <div 
        className={`fixed z-40 transition-all duration-500 ease-in-out select-none hidden sm:block ${
          isMinimized 
            ? 'bottom-6 left-6' 
            : 'bottom-6 left-6 max-w-sm w-[340px]'
        }`}
      >
        {isMinimized ? (
          /* Minimized Circular Floating Story Orb */
          <button
            onClick={() => setIsMinimized(false)}
            className="group relative flex items-center gap-3 p-2 pr-4 rounded-full bg-[#120407]/90 backdrop-blur-xl border border-[#f3cf98]/40 shadow-2xl hover:scale-105 transition-all text-left"
            title="Expand Interactive Story Mode"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#f3cf98] relative">
              <img
                src={currentModelImg}
                alt="Santosh Boutique Story Model"
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#f3cf98] tracking-widest block">
                Story Mode • {activeChapter.number}
              </span>
              <p className="text-xs font-semibold text-[#fff7f2] truncate max-w-[120px]">
                {activeChapter.title}
              </p>
            </div>
            <Maximize2 className="w-3.5 h-3.5 text-[#f3cf98] ml-1 opacity-70 group-hover:opacity-100" />
          </button>
        ) : (
          /* Full Motionsites Story Muse Card */
          <div className="relative rounded-3xl overflow-hidden bg-[#120407]/85 backdrop-blur-2xl border border-[#f3cf98]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-300">
            {/* Top Chapter Header & Actions */}
            <div className="p-4 pb-2 flex items-center justify-between border-b border-white/10 bg-black/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f3cf98] animate-ping" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f3cf98]">
                  Atelier Story • Chapter {activeChapter.number}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  aria-label="Minimize Story Card"
                  title="Minimize"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Model Visual Stage with Dynamic Transitions */}
            <div className="relative h-56 overflow-hidden group bg-gradient-to-b from-black/40 via-transparent to-[#120407]">
              {/* Couture Model Photo with Smooth Fade & Scale */}
              <img
                src={currentModelImg}
                alt={activeChapter.title}
                className="w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.05] transition-all duration-700 ease-out transform group-hover:scale-105"
              />

              {/* Cinematic Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120407] via-[#120407]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#120407]/40 via-transparent to-[#120407]/40" />

              {/* Floating Golden Needle & Stitching Tag */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#120407]/80 backdrop-blur-md border border-[#f3cf98]/40 text-[10px] font-bold text-[#f3cf98] flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3 h-3 text-[#f3cf98]" />
                <span>{activeChapter.tag}</span>
              </div>

              {/* Bottom Model Subtitle */}
              <div className="absolute bottom-2 left-3 right-3">
                <h4 className="text-sm font-display font-bold text-[#fff7f2] drop-shadow-md">
                  {activeChapter.title}
                </h4>
              </div>
            </div>

            {/* Story Quote & Section Description */}
            <div className="p-4 pt-3 space-y-3">
              <p className="text-xs font-serif italic text-[#f3cf98]/90 leading-snug bg-white/5 p-2.5 rounded-xl border border-white/5">
                {activeChapter.quote}
              </p>

              {/* Interactive Story Timeline Dots */}
              <div className="pt-2 flex items-center justify-between gap-1 border-t border-white/10">
                {CHAPTERS.map((ch, idx) => {
                  const isActive = idx === activeChapterIndex;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => scrollToChapter(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'w-7 bg-gradient-to-r from-[#d85c72] to-[#f3cf98] shadow-sm shadow-[#f3cf98]/50' 
                          : 'w-2 bg-white/20 hover:bg-white/50'
                      }`}
                      title={`${ch.title} (${ch.number})`}
                      aria-label={`Jump to ${ch.title}`}
                    />
                  );
                })}
              </div>

              {/* Jump to Current Section Action */}
              <button
                onClick={() => scrollToChapter(activeChapterIndex)}
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-[#f3cf98]/15 border border-white/10 hover:border-[#f3cf98]/40 text-[11px] font-semibold text-[#fff7f2] flex items-center justify-between transition-colors group/btn"
              >
                <span>Scroll to {activeChapter.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#f3cf98] group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MOBILE BOTTOM STORY PROGRESS BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#120407]/95 backdrop-blur-xl border-t border-[#f3cf98]/20 px-4 py-2 flex items-center justify-between">
        <div 
          onClick={() => scrollToChapter(activeChapterIndex)}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#f3cf98]/50 shrink-0">
            <img 
              src={currentModelImg} 
              alt="Story Muse" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="truncate max-w-[190px]">
            <span className="text-[9px] uppercase font-bold text-[#f3cf98] block">
              Story • {activeChapter.number}
            </span>
            <p className="text-xs font-semibold text-[#fff7f2] truncate">
              {activeChapter.title}
            </p>
          </div>
        </div>

        <button
          onClick={() => scrollToChapter((activeChapterIndex + 1) % CHAPTERS.length)}
          className="px-2.5 py-1 rounded-full bg-[#f3cf98]/15 border border-[#f3cf98]/30 text-[10px] font-bold text-[#f3cf98] flex items-center gap-1 shrink-0"
        >
          <span>Next</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </>
  );
};
