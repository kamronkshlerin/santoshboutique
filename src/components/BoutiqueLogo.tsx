import React from 'react';

interface BoutiqueLogoProps {
  variant?: 'navbar' | 'footer' | 'hero' | 'emblem';
  theme?: 'dark' | 'light';
  className?: string;
  onClick?: (e?: any) => void;
}

export const BoutiqueLogo: React.FC<BoutiqueLogoProps> = ({
  variant = 'navbar',
  theme = 'dark',
  className = '',
  onClick,
}) => {
  const isLight = theme === 'light';

  // Standalone Luxury Boutique Emblem (SVG with Twin Leaves & Tailor Scissors/Needle motif)
  const renderEmblem = (size: 'sm' | 'md' | 'lg' = 'md') => {
    const dim = size === 'sm' ? 36 : size === 'lg' ? 56 : 44;
    return (
      <div 
        className={`relative flex items-center justify-center shrink-0 rounded-full transition-transform duration-300 group-hover:scale-105`}
        style={{ width: dim, height: dim }}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8a1c32] via-[#d85c72] to-[#f3cf98] opacity-80 blur-[6px] group-hover:opacity-100 transition-opacity" />
        
        {/* Outer Golden Ring */}
        <div className="relative w-full h-full rounded-full p-[1.5px] bg-gradient-to-tr from-[#f3cf98] via-[#8a1c32] to-[#f3cf98] shadow-lg">
          <div className="w-full h-full rounded-full bg-[#120407] flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="w-[85%] h-[85%]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="50%" stopColor="#f3cf98" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="logoRose" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>
              </defs>

              {/* Decorative Circular Laurel Ring */}
              <circle cx="50" cy="50" r="44" stroke="url(#logoGold)" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
              <circle cx="50" cy="50" r="40" stroke="url(#logoGold)" strokeWidth="0.8" opacity="0.4" />

              {/* Left Boutique Leaf Motif (matches real shop emblem) */}
              <path
                d="M 50 48 C 42 38, 28 36, 26 50 C 34 54, 46 52, 50 48 Z"
                fill="url(#logoGold)"
                opacity="0.9"
              />

              {/* Right Boutique Leaf Motif (matches real shop emblem) */}
              <path
                d="M 50 48 C 58 38, 72 36, 74 50 C 66 54, 54 52, 50 48 Z"
                fill="url(#logoGold)"
                opacity="0.9"
              />

              {/* Central Tailor Shears / Needle Motif */}
              {/* Left Blade */}
              <path
                d="M 40 76 L 49 52 L 47 48 L 38 72 Z"
                fill="url(#logoGold)"
              />
              {/* Right Blade */}
              <path
                d="M 60 76 L 51 52 L 53 48 L 62 72 Z"
                fill="url(#logoGold)"
              />
              
              {/* Left Handle Loop */}
              <circle cx="36" cy="77" r="7" stroke="url(#logoGold)" strokeWidth="2.5" fill="none" />
              {/* Right Handle Loop */}
              <circle cx="64" cy="77" r="7" stroke="url(#logoGold)" strokeWidth="2.5" fill="none" />
              
              {/* Pivot Rivet Gem */}
              <circle cx="50" cy="52" r="3" fill="#fff7f2" />
              <circle cx="50" cy="52" r="1.5" fill="#881337" />

              {/* Crown Star Top Sparkle */}
              <path
                d="M 50 16 L 52 23 L 59 25 L 52 27 L 50 34 L 48 27 L 41 25 L 48 23 Z"
                fill="url(#logoGold)"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  if (variant === 'emblem') {
    return renderEmblem('md');
  }

  if (variant === 'footer') {
    return (
      <div 
        onClick={onClick}
        className={`flex items-start gap-3.5 cursor-pointer group select-none ${className}`}
      >
        {renderEmblem('lg')}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl sm:text-3xl tracking-wide gold-gradient-text">
              Santosh
            </span>
            <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full text-[#f3cf98] bg-[#f3cf98]/15 border border-[#f3cf98]/30 font-semibold">
              Bilaspur
            </span>
          </div>
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#f3cf98] mt-0.5">
            Boutique &amp; Stitching Studio
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-[#d1b8b8]">
            <span>STYLISH</span>
            <span>•</span>
            <span>ELEGANT</span>
            <span>•</span>
            <span>PERFECT FIT</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`inline-flex items-center gap-3 p-2 px-4 rounded-2xl bg-[#120407]/90 border border-[#f3cf98]/30 shadow-2xl backdrop-blur-md ${className}`}>
        {renderEmblem('sm')}
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-lg text-[#fff7f2] tracking-wide">
              Santosh Boutique
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#f3cf98]/20 text-[#f3cf98] font-bold">
              EST. 2012
            </span>
          </div>
          <p className="text-[10px] text-[#f3cf98] tracking-wider uppercase font-medium">
            Custom Tailoring • Fatoh, Bilaspur
          </p>
        </div>
      </div>
    );
  }

  // Default: Navbar variant
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-2.5 cursor-pointer group select-none ${className}`}
    >
      {renderEmblem('sm')}
      <div className="leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-bold text-lg sm:text-2xl tracking-wide gold-gradient-text group-hover:brightness-110 transition-all">
            Santosh
          </span>
          <span className={`text-[9px] sm:text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-full hidden sm:inline-block font-medium ${
            isLight
              ? 'text-[#8a1c32] bg-[#8a1c32]/10 border border-[#8a1c32]/25'
              : 'text-[#f3cf98] bg-[#f3cf98]/15 border border-[#f3cf98]/30'
          }`}>
            Bilaspur
          </span>
        </div>
        <p className={`text-[9px] sm:text-[10px] tracking-wider uppercase hidden md:block font-medium ${
          isLight ? 'text-[#6b525a]' : 'text-[#d1b8b8]'
        }`}>
          Boutique &amp; Stitching Studio
        </p>
      </div>
    </div>
  );
};
