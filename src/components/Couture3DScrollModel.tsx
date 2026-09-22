import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Ruler } from 'lucide-react';
import { MODEL_STORY_IMG, MODEL_FITTING_IMG } from '../assets_models';

export const Couture3DScrollModel: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeStage, setActiveStage] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalDoc = document.documentElement.scrollHeight - window.innerHeight;
      const p = totalDoc > 0 ? Math.min(1, Math.max(0, scrollY / totalDoc)) : 0;
      setScrollProgress(p);

      // Section staging
      if (p < 0.16) {
        setActiveStage(0); // Hero
      } else if (p < 0.28) {
        setActiveStage(1); // Trust
      } else if (p < 0.48) {
        setActiveStage(2); // Services
      } else if (p < 0.70) {
        setActiveStage(3); // Configurator (Fitting Studio)
      } else if (p < 0.84) {
        setActiveStage(4); // Alteration
      } else if (p < 0.94) {
        setActiveStage(5); // Lookbook
      } else {
        setActiveStage(6); // Location
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Golden Embroidery & Measuring Ribbon 3D Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Floating gold zari thread sparkles
    const sparkles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: -Math.random() * 0.8 - 0.2,
      opacity: Math.random() * 0.8 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      // Draw floating gold dust
      sparkles.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.pulse += 0.04;
        if (s.y < 0) s.y = height;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        const currentOpacity = s.opacity * (0.6 + 0.4 * Math.sin(s.pulse));
        ctx.fillStyle = `rgba(243, 207, 152, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Orbiting Golden Silk Ribbon around model area
      if (width > 768) {
        const cx = activeStage === 3 ? width * 0.28 : width * 0.72;
        const cy = height * 0.52;
        ctx.save();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(243, 207, 152, 0.25)';
        ctx.setLineDash([12, 8]);
        ctx.beginPath();
        ctx.ellipse(cx, cy, 180 + Math.sin(t) * 20, 70 + Math.cos(t * 0.8) * 15, t * 0.3, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary counter-rotating golden measuring tape loop
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = 'rgba(216, 92, 114, 0.3)';
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.ellipse(cx, cy, 140 + Math.cos(t * 1.2) * 15, 90 + Math.sin(t) * 20, -t * 0.4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [activeStage]);

  // Interpolate 3D Transform values based on scroll progress
  // Stage 0 (Hero): Model on right side, majestic scale
  // Stage 1 (Trust): Slight center shift, grounded
  // Stage 2 (Services): Right side (x: 28vw), looking left at cards
  // Stage 3 (Configurator): Left side (x: -26vw), Fitting mode with measuring tape
  // Stage 4 (Alterations): Center-right, contoured
  // Stage 5 (Lookbook): Grand bridal flare
  // Stage 6 (Location): Ambient background anchor
  const get3DStyles = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobile) {
      // Mobile 3D Ambient Backdrop Mode: Model remains as a full-height cinematic background element with subtle depth
      const yShift = (scrollProgress * 200) - 20;
      const opacity = scrollProgress > 0.9 ? 0.15 : 0.32;
      return {
        transform: `translate3d(0px, ${-yShift}px, 0px) scale(${1.05 + scrollProgress * 0.1})`,
        opacity,
        position: 'fixed' as const,
        inset: 0,
      };
    }

    let targetX = 26; // in vw
    let targetY = 0;  // in px
    let targetZ = 0;  // in px
    let targetRotateY = -8; // degrees
    let targetRotateX = 2;
    let targetScale = 1.05;
    let targetOpacity = 1;

    switch (activeStage) {
      case 0: // Hero
        targetX = 24;
        targetY = scrollProgress * 60;
        targetRotateY = -6 + (mousePos.x * 5);
        targetRotateX = 3 + (-mousePos.y * 3);
        targetScale = 1.08;
        targetOpacity = 0.95;
        break;
      case 1: // Trust Bar
        targetX = 28;
        targetY = 10;
        targetRotateY = -4 + (mousePos.x * 4);
        targetRotateX = 2;
        targetScale = 1.02;
        targetOpacity = 0.9;
        break;
      case 2: // Services Grid (cards on left, model on right)
        targetX = 29;
        targetY = -15;
        targetRotateY = -14 + (mousePos.x * 6);
        targetRotateX = 1;
        targetScale = 1.04;
        targetOpacity = 0.92;
        break;
      case 3: // Configurator Studio (form on right, model on LEFT!)
        targetX = -27;
        targetY = 15;
        targetRotateY = 14 + (mousePos.x * 6);
        targetRotateX = -2;
        targetScale = 1.06;
        targetOpacity = 0.98;
        break;
      case 4: // Alterations Slider
        targetX = 28;
        targetY = 0;
        targetRotateY = -8 + (mousePos.x * 5);
        targetScale = 1.03;
        targetOpacity = 0.9;
        break;
      case 5: // Lookbook
        targetX = 26;
        targetY = 10;
        targetRotateY = -10 + (mousePos.x * 5);
        targetScale = 1.08;
        targetOpacity = 0.92;
        break;
      case 6: // Location / Studio Map
        targetX = -25;
        targetY = 40;
        targetRotateY = 8;
        targetScale = 0.95;
        targetOpacity = 0.75;
        break;
    }

    return {
      transform: `perspective(1200px) translate3d(${targetX}vw, ${targetY}px, ${targetZ}px) rotateY(${targetRotateY}deg) rotateX(${targetRotateX}deg) scale(${targetScale})`,
      opacity: targetOpacity,
    };
  };

  const currentStyles = get3DStyles();
  const isFittingMode = activeStage === 3; // Configurator stage uses the live master tailor fitting pose!

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* 3D Particle Canvas for Golden Embroidery Thread */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Cinematic 3D Model Stage */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out will-change-transform"
        style={currentStyles}
      >
        <div className="relative w-[340px] sm:w-[420px] md:w-[460px] lg:w-[500px] h-[78vh] max-h-[820px] rounded-[36px] overflow-hidden group">
          {/* Outer Golden Aura Glow */}
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#8a1c32]/40 via-[#f3cf98]/20 to-[#8a1c32]/30 blur-2xl -z-10 animate-pulse" />

          {/* Model 1: Royal Bridal Lehenga (Grandeur Mode) */}
          <img
            src={MODEL_STORY_IMG}
            alt="Santosh Boutique Royal Couture Muse"
            className={`absolute inset-0 w-full h-full object-cover object-top filter contrast-[1.08] brightness-[0.98] transition-opacity duration-1000 ease-in-out ${
              isFittingMode ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          />

          {/* Model 2: Master Tailor Fitting Session (Measurement Mode) */}
          <img
            src={MODEL_FITTING_IMG}
            alt="Master Tailor Measuring Fitting Session"
            className={`absolute inset-0 w-full h-full object-cover object-top filter contrast-[1.08] brightness-[0.98] transition-opacity duration-1000 ease-in-out ${
              isFittingMode ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />

          {/* Seamless Edge Blending (Motionsites Cinematic Vignette) */}
          {/* Top Fade */}
          <div className="model-fade-top absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#120407] via-[#120407]/40 to-transparent pointer-events-none" />
          {/* Bottom Fade */}
          <div className="model-fade-bottom absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#120407] via-[#120407]/70 to-transparent pointer-events-none" />
          {/* Left/Right Edge Feathering */}
          <div className="model-fade-left absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#120407]/80 to-transparent pointer-events-none" />
          <div className="model-fade-right absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#120407]/80 to-transparent pointer-events-none" />

          {/* Floating Luxury Stage Badges (Only visible on larger screens) */}
          <div className="absolute top-6 left-6 right-6 hidden md:flex items-center justify-between pointer-events-none">
            <div className="model-stage-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120407]/85 backdrop-blur-md border border-[#f3cf98]/40 shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-[#f3cf98]" />
              <span className="text-[11px] font-bold text-[#f3cf98] uppercase tracking-wider">
                {isFittingMode ? '18-Point Custom Fitting' : 'Bespoke Atelier Muse'}
              </span>
            </div>

            <div className="model-stage-number px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-[#fff7f2]/90 font-mono">
              STAGE 0{activeStage + 1}
            </div>
          </div>

          {/* Floating Tailor Tape Annotation in Configurator Mode */}
          {isFittingMode && (
            <div className="absolute bottom-10 left-6 right-6 p-4 rounded-2xl bg-[#120407]/90 backdrop-blur-xl border border-[#f3cf98]/50 shadow-2xl animate-fade-in pointer-events-none">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f3cf98] mb-1">
                <Ruler className="w-3.5 h-3.5 text-[#f3cf98]" />
                <span>Live Tailor Measurement Simulation</span>
              </div>
              <p className="text-[11px] text-[#d1b8b8] leading-tight">
                Anatomical drafting ensuring zero armhole gaping & contour waist fit.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
