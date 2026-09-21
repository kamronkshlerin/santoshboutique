import React, { useEffect, useRef } from 'react';
import { Sparkles, MessageCircle, Heart, ShieldCheck, MapPin, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Elegant golden embroidery thread & dust particle canvas simulation
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

    // Gold dust particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.7 + 0.2,
    }));

    // Floating wavy sewing thread curves
    let step = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating gold particles
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

      // Render subtle sine wave sewing thread
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

  const openWhatsApp = (msg?: string) => {
    const defaultText = "Namaste Santosh Boutique! I saw your website and want to discuss custom stitching.";
    window.open(`https://wa.me/919816000000?text=${encodeURIComponent(msg || defaultText)}`, '_blank');
  };

  const scrollToConfigurator = () => {
    document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with Cinematic Luxury Gradients */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/images/hero.jpg"
          alt="Santosh Boutique Studio Interior with Embroidered Suit"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.42] contrast-[1.15]"
        />
        {/* Multilayered radial and linear dark burgundy overlays for maximum text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120407] via-[#120407]/75 to-[#120407]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#120407]/60 to-[#120407]" />
      </div>

      {/* Interactive Golden Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 pointer-events-none"
      />

      {/* Hero Content Container */}
      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass mb-6 border border-[#f3cf98]/30 shadow-lg animate-fade-in">
          <MapPin className="w-3.5 h-3.5 text-[#d85c72]" />
          <span className="text-xs sm:text-sm font-medium text-[#f3cf98] tracking-wide">
            Near Baba Balak Nath Temple, Sarti, Bilaspur (H.P.)
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#fff7f2] leading-[1.08] mb-6">
          Stitching Your{' '}
          <span className="italic font-normal gold-gradient-text">Dreams</span>{' '}
          With Care
        </h1>

        {/* Taglines and Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#d1b8b8] font-light leading-relaxed mb-4">
          <strong className="text-[#fff7f2] font-semibold">Traditional Designs</strong> •{' '}
          <strong className="text-[#fff7f2] font-semibold">Modern Styles</strong> •{' '}
          <strong className="text-[#fff7f2] font-semibold">Perfect Fit</strong>
        </p>

        <p className="text-xs sm:text-sm tracking-widest text-[#f3cf98] uppercase font-medium mb-10">
          Ladies Fashion • Custom Stitching • Style For Every You
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={scrollToConfigurator}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#d85c72] via-[#b53c52] to-[#8a1c32] text-white font-semibold text-base shadow-xl hover:shadow-[#d85c72]/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 group"
          >
            <Sparkles className="w-4 h-4 text-[#f3cf98] group-hover:rotate-12 transition-transform" />
            <span>Design Your Outfit & Get Quote</span>
          </button>

          <button
            onClick={() => openWhatsApp()}
            className="w-full sm:w-auto px-7 py-4 rounded-full liquid-glass text-[#fff7f2] font-semibold text-base hover:bg-white/10 border border-[#f3cf98]/30 transition-all flex items-center justify-center gap-2.5 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>Order & Enquiry on WhatsApp</span>
          </button>
        </div>

        {/* Trust Stamp Badges From Flyer */}
        <div className="grid grid-cols-3 max-w-xl mx-auto pt-6 border-t border-[#f3cf98]/20 text-center gap-2">
          <div className="px-2">
            <div className="text-sm sm:text-base font-semibold text-[#f3cf98] flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#d85c72]" />
              <span>Quality Stitching</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#d1b8b8] mt-0.5">Durable seams & fine finish</p>
          </div>

          <div className="px-2 border-x border-[#f3cf98]/20">
            <div className="text-sm sm:text-base font-semibold text-[#f3cf98] flex items-center justify-center gap-1">
              <Heart className="w-4 h-4 text-[#d85c72]" />
              <span>Personal Service</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#d1b8b8] mt-0.5">1-on-1 fit consultation</p>
          </div>

          <div className="px-2">
            <div className="text-sm sm:text-base font-semibold text-[#f3cf98] flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-[#d85c72]" />
              <span>100% Satisfaction</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#d1b8b8] mt-0.5">Trusted by local families</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#services"
            className="p-2 rounded-full border border-white/15 text-white/50 hover:text-[#f3cf98] hover:border-[#f3cf98]/40 transition-colors animate-bounce"
            aria-label="Scroll Down"
          >
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
