import React, { useEffect, useRef } from 'react';
import { Sparkles, MessageCircle, Heart, ShieldCheck, MapPin, ChevronDown, Award, Star } from 'lucide-react';
import { REAL_ASSETS, GOOGLE_REVIEW_URL } from '../constants';
import { useBloggerConfig } from '../config';

export const HeroSection: React.FC = () => {
  const config = useBloggerConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Floating gold zari thread & dust particle canvas (Pauses automatically when offscreen)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // IntersectionObserver to freeze canvas when scrolled down for 60fps buttery speed
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          render();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.0 + 0.6,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.5 - 0.15,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    let step = 0;
    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.fillStyle = `rgba(243, 207, 152, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
      });

      step += 0.008;
      ctx.strokeStyle = 'rgba(216, 92, 114, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      for (let x = 0; x < width; x += 20) {
        const y = height * 0.55 + Math.sin(x * 0.003 + step) * 60 + Math.cos(x * 0.007) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  const openWhatsApp = (msg?: string) => {
    const defaultText = `Namaste ${config.boutiqueName}! I saw your website and want to discuss custom stitching.`;
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg || defaultText)}`, '_blank');
  };

  const scrollToConfigurator = () => {
    window.location.hash = '#/configurator';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[92svh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Image with Deep Luxury Gradients */}
      <div className="absolute inset-0 -z-20">
        <img
          src={REAL_ASSETS.shopFront}
          alt="Santosh Boutique stitching studio near Baba Balak Nath Temple Fatoh Ghumarwin Bilaspur Himachal Pradesh 174021"
          className="hero-bg-img w-full h-full object-cover object-center brightness-[0.38] contrast-[1.15]"
        />
        <div className="hero-overlay-1 absolute inset-0 bg-gradient-to-b from-[#120407] via-transparent to-[#120407]" />
        <div className="hero-overlay-2 absolute inset-0 bg-gradient-to-t from-[#120407] via-[#120407]/80 to-[#120407]/50" />
        <div className="hero-overlay-3 absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#120407]/60 to-[#120407]" />
      </div>

      {/* Interactive Golden Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 pointer-events-none"
      />

      {/* 2-Column Luxury Atelier Balanced Grid (Zero Mixing, Flawless Spacing) */}
      <div className="relative max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ================= LEFT COLUMN: Typography, CTAs & Guarantees (7 Cols) ================= */}
        <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
          
          {/* Studio Landmark & Live Badge */}
          <div className="hero-tagline-badge cursor-float-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass mb-6 border border-[#f3cf98]/30 shadow-lg animate-fade-in">
            <MapPin className="w-3.5 h-3.5 text-[#d85c72]" />
            <span className="text-xs sm:text-sm font-medium text-[#f3cf98] tracking-wide">
              {config.heroTagline}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#fff7f2] leading-[1.1] mb-6 cursor-float-gentle">
            Stitching Your <span className="italic gold-gradient-text">Dreams</span> With Care
          </h1>

          {/* Subtitle & Tagline */}
          <p className="max-w-xl text-base sm:text-lg text-[#d1b8b8] font-light leading-relaxed mb-3 cursor-float-opposite">
            {config.heroSubtitle}
          </p>

          <p className="text-xs sm:text-sm tracking-widest text-[#f3cf98] uppercase font-semibold mb-8">
            Ladies Fashion • Custom Stitching • Style For Every You
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10 justify-center lg:justify-start">
            <button
              onClick={scrollToConfigurator}
              className="shimmer-btn px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d85c72] via-[#b53c52] to-[#8a1c32] text-white font-semibold text-xs sm:text-sm shadow-xl hover:shadow-[#d85c72]/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-[#f3cf98] group-hover:rotate-12 transition-transform" />
              <span>Design Your Outfit &amp; Quote</span>
            </button>

            <button
              onClick={() => openWhatsApp()}
              className="hero-secondary-btn px-6 py-3.5 rounded-full liquid-glass text-[#fff7f2] font-semibold text-xs sm:text-sm hover:bg-white/10 border border-[#f3cf98]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </button>

            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-full bg-white/5 border border-amber-400/40 text-[#fff7f2] hover:bg-white/10 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9★ Google Reviews</span>
            </a>
          </div>

          {/* Trust Stamp Badges From Flyer */}
          <div className="grid grid-cols-3 max-w-lg w-full pt-6 border-t border-[#f3cf98]/20 text-center gap-2">
            <div className="px-1 sm:px-2">
              <div className="text-xs sm:text-sm font-semibold text-[#f3cf98] flex items-center justify-center lg:justify-start gap-1">
                <ShieldCheck className="w-4 h-4 text-[#d85c72] shrink-0" />
                <span>Quality Stitching</span>
              </div>
              <p className="text-[11px] text-[#d1b8b8] mt-0.5 text-center lg:text-left">Durable seams & fine finish</p>
            </div>

            <div className="px-1 sm:px-2 border-x border-[#f3cf98]/20">
              <div className="text-xs sm:text-sm font-semibold text-[#f3cf98] flex items-center justify-center lg:justify-start gap-1">
                <Heart className="w-4 h-4 text-[#d85c72] shrink-0" />
                <span>Personal Service</span>
              </div>
              <p className="text-[11px] text-[#d1b8b8] mt-0.5 text-center lg:text-left">1-on-1 fit consultation</p>
            </div>

            <div className="px-1 sm:px-2">
              <div className="text-xs sm:text-sm font-semibold text-[#f3cf98] flex items-center justify-center lg:justify-start gap-1">
                <Award className="w-4 h-4 text-[#d85c72] shrink-0" />
                <span>100% Satisfaction</span>
              </div>
              <p className="text-[11px] text-[#d1b8b8] mt-0.5 text-center lg:text-left">Trusted local families</p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: 3D Atelier Haute Couture Model Stage (5 Cols) ================= */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
          <div 
            className="relative w-full max-w-[460px] sm:max-w-[480px] rounded-[32px] overflow-hidden p-2 transition-transform duration-500 ease-out will-change-transform group cursor-float-card hover:[transform:perspective(1000px)_rotateY(-2deg)_rotateX(2deg)_scale(1.01)]"
          >
            {/* Glowing Golden Aura Border */}
            <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-tr from-[#8a1c32]/50 via-[#f3cf98]/30 to-[#d85c72]/40 blur-xl opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Inner Frame */}
            <div className="relative rounded-[26px] overflow-hidden border border-[#f3cf98]/40 bg-[#16060c] shadow-2xl flex flex-col">
              
              {/* Card Header (Above Image - does NOT hide photo text) */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#120407] border-b border-[#f3cf98]/20">
                <div className="inline-flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#f3cf98]" />
                  <span className="text-[11px] font-bold text-[#f3cf98] uppercase tracking-wider">
                    Real Studio Masterpiece
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-[#f3cf98] border border-[#f3cf98]/25">
                  HP • BILASPUR
                </span>
              </div>

              {/* Couture Image Showcase - 100% Clean Uncut Image with Zero Overlays */}
              <div className="relative aspect-square w-full bg-[#0a0204] overflow-hidden flex items-center justify-center">
                <img
                  src={REAL_ASSETS.designerBlouse}
                  alt="Santosh Boutique & Stitching Studio - Designer bridal blouse stitching Bilaspur Himachal Pradesh Fatoh"
                  className="w-full h-full object-contain sm:object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              {/* Card Footer (Below Image - does NOT hide photo text) */}
              <div className="p-4 bg-[#120407] border-t border-[#f3cf98]/20">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-[#fff7f2] font-display">
                    Royal Bridal &amp; Festive Silhouettes
                  </h3>
                  <span className="text-[10px] font-bold text-[#f3cf98] bg-[#f3cf98]/15 px-2.5 py-0.5 rounded-full border border-[#f3cf98]/30 shrink-0">
                    Custom Tailored
                  </span>
                </div>
                <p className="text-xs text-[#d1b8b8] leading-relaxed">
                  Contour blouse tailoring, bridal embroidery, can-can flair, and perfect fitting at Fatoh, Bilaspur.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center pointer-events-none">
        <a
          href="#services"
          className="p-1.5 rounded-full border border-white/15 text-white/40 hover:text-[#f3cf98] transition-colors pointer-events-auto"
          aria-label="Scroll Down to Services"
        >
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
