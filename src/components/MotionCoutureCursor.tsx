import React, { useEffect, useRef, useState } from 'react';

export const MotionCoutureCursor: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let isVisible = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
        if (haloRef.current) haloRef.current.style.opacity = '1';
      }

      // Check if hovering over interactive text, buttons or cards
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, select, textarea, h1, h2, .interactive-hover, .liquid-glass-card');
        isHovering = !!interactive;
      }
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (haloRef.current) haloRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Smooth 60-120fps physics loop using hardware translate3d
    let lastTiltX = 0;
    let lastTiltY = 0;

    const updateCursor = () => {
      // Linear interpolation (lerp) for trailing luxury silk ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.7 : isHovering ? 1.4 : 1})`;
      }

      if (ringRef.current) {
        const scale = isClicking ? 0.85 : isHovering ? 1.7 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      // Smooth normalized tilt for reactive text/cards
      if (mouseX > 0 && mouseY > 0) {
        const normX = (mouseX / window.innerWidth - 0.5) * 2;
        const normY = (mouseY / window.innerHeight - 0.5) * 2;
        const targetTiltX = normX * 18;
        const targetTiltY = normY * 18;
        lastTiltX += (targetTiltX - lastTiltX) * 0.12;
        lastTiltY += (targetTiltY - lastTiltY) * 0.12;
        document.documentElement.style.setProperty('--mouse-tilt-x', `${lastTiltX.toFixed(2)}px`);
        document.documentElement.style.setProperty('--mouse-tilt-y', `${lastTiltY.toFixed(2)}px`);
      }

      animId = requestAnimationFrame(updateCursor);
    };

    animId = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* 1. Ambient Moving Silk Halo */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none z-30 opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          background: theme === 'light'
            ? 'radial-gradient(circle, rgba(216, 92, 114, 0.02) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(216, 92, 114, 0.10) 0%, rgba(243, 207, 152, 0.05) 45%, transparent 70%)',
        }}
      />

      {/* 2. Outer Haute-Couture Rotating Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[999] opacity-0 transition-opacity duration-300 will-change-transform flex items-center justify-center ${
          theme === 'light'
            ? 'w-7 h-7 border border-[#8a1c32]/25 bg-transparent shadow-none'
            : 'w-9 h-9 border border-[#f3cf98]/60 bg-[#f3cf98]/5 shadow-[0_0_20px_rgba(243,207,152,0.35)]'
        }`}
      >
        {/* Subtle spinning dashed stitch compass marks */}
        <div className={`w-full h-full rounded-full border border-dashed animate-spin ${
          theme === 'light' ? 'border-[#8a1c32]/15' : 'border-[#f3cf98]/30'
        }`} style={{ animationDuration: '10s' }} />
      </div>

      {/* 3. Center Golden Needle Sparkle Point */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[1000] opacity-0 transition-opacity duration-150 will-change-transform ${
          theme === 'light'
            ? 'w-1.5 h-1.5 bg-[#8a1c32]/80'
            : 'w-2 h-2 bg-[#f3cf98] shadow-[0_0_10px_#f3cf98]'
        }`}
      />
    </>
  );
};

export default MotionCoutureCursor;
