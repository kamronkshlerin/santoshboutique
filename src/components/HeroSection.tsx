import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageCircle, Heart, ShieldCheck, MapPin, ChevronDown, Award } from 'lucide-react';
import { ASSETS } from '../constants';
import { useBloggerConfig } from '../config';
import { MODEL_STORY_IMG } from '../assets_models';

export const HeroSection: React.FC = () => {
  const config = useBloggerConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Floating gold zari thread & dust particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.7 + 0.2,
    }));

    let step = 0;
    const render = () => {
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
      ctx.strokeStyle = 'rgba(216, 92, 114, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        const y = height * 0.55 + Math.sin(x * 0.003 + step) * 70 + Math.cos(x * 0.007) * 30;
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
    };
  }, []);

  // 3D Parallax Mouse Tracking for Model Card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92svh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Image with Deep Luxury Gradients */}
      <div className="absolute inset-0 -z-20">
        <img
          src={ASSETS.hero}
          alt="Santosh Boutique Bridal Atelier Display"
          className="w-full h-full object-cover object-center brightness-[0.38] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120407] via-transparent to-[#120407]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120407] via-[#120407]/80 to-[#120407]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#120407]/60 to-[#120407]" />
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass mb-6 border border-[#f3cf98]/30 shadow-lg animate-fade-in">
            <MapPin className="w-3.5 h-3.5 text-[#d85c72]" />
            <span className="text-xs sm:text-sm font-medium text-[#f3cf98] tracking-wide">
              {config.heroTagline}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#fff7f2] leading-[1.1] mb-6">
            Stitching Your <span className="italic gold-gradient-text">Dreams</span> With Care
          </h1>

          {/* Subtitle & Tagline */}
          <p className="max-w-xl text-base sm:text-lg text-[#d1b8b8] font-light leading-relaxed mb-3">
            {config.heroSubtitle}
          </p>

          <p className="text-xs sm:text-sm tracking-widest text-[#f3cf98] uppercase font-semibold mb-8">
            Ladies Fashion • Custom Stitching • Style For Every You
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={scrollToConfigurator}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#d85c72] via-[#b53c52] to-[#8a1c32] text-white font-semibold text-sm sm:text-base shadow-xl hover:shadow-[#d85c72]/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 group"
            >
              <Sparkles className="w-4 h-4 text-[#f3cf98] group-hover:rotate-12 transition-transform" />
              <span>Design Your Outfit & Get Quote</span>
            </button>

            <button
              onClick={() => openWhatsApp()}
              className="w-full sm:w-auto px-7 py-4 rounded-full liquid-glass text-[#fff7f2] font-semibold text-sm sm:text-base hover:bg-white/10 border border-[#f3cf98]/30 transition-all flex items-center justify-center gap-2.5 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>Order & Enquiry on WhatsApp</span>
            </button>
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
            className="relative w-full max-w-[420px] sm:max-w-[440px] rounded-[32px] overflow-hidden p-2.5 transition-transform duration-300 ease-out will-change-transform group"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 6}deg)`,
            }}
          >
            {/* Glowing Golden Aura Border */}
            <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-tr from-[#8a1c32]/50 via-[#f3cf98]/30 to-[#d85c72]/40 blur-xl opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Inner Frame */}
            <div className="relative rounded-[28px] overflow-hidden border border-[#f3cf98]/40 bg-[#1a080e]/90 shadow-2xl">
              
              {/* Couture Image Showcase */}
              <div className="relative h-[480px] sm:h-[540px] overflow-hidden">
                <img
                  src={MODEL_STORY_IMG}
                  alt="Santosh Boutique Royal Bridal Lehenga Couture"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.96] group-hover:scale-105 transition-transform duration-700"
                />

                {/* Soft Vignette Gradients */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#120407]/90 via-[#120407]/30 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#120407] via-[#120407]/80 to-transparent pointer-events-none" />

                {/* Top Badge: Bespoke Atelier Muse */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120407]/85 backdrop-blur-md border border-[#f3cf98]/40 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#f3cf98]" />
                    <span className="text-[11px] font-bold text-[#f3cf98] uppercase tracking-wider">
                      Bespoke Atelier Muse
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-[#fff7f2]/90 font-mono">
                    HP • BILASPUR
                  </span>
                </div>

                {/* Bottom Card Annotation: Craftsmanship Info */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#120407]/90 backdrop-blur-xl border border-[#f3cf98]/30 shadow-2xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#fff7f2]">
                      Royal Bridal & Festive Silhouettes
                    </span>
                    <span className="text-[11px] font-semibold text-[#f3cf98]">
                      Custom Tailored
                    </span>
                  </div>
                  <p className="text-[11px] text-[#d1b8b8] leading-tight">
                    16-Kalidar flair, can-can volume, and contour blouse tailoring shaped to your measurements.
                  </p>
                </div>
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
