import React, { useState, useEffect } from 'react';
import { Scissors, MessageCircle, Menu, X, Sparkles, MapPin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "Namaste Santosh Boutique! I want to inquire about custom tailoring & stitching services."
    );
    window.open(`https://wa.me/919816000000?text=${text}`, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto rounded-full px-5 py-3.5 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'liquid-glass-nav py-2.5 shadow-2xl'
            : 'bg-[#1a080e]/60 backdrop-blur-md border border-[#f3cf98]/20'
        }`}
      >
        {/* Brand Logo & Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8a1c32] via-[#d85c72] to-[#f3cf98] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Scissors className="w-5 h-5 text-[#120407] -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-xl sm:text-2xl tracking-wide gold-gradient-text">
                Santosh
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#f3cf98] px-1.5 py-0.5 rounded-full bg-[#f3cf98]/10 border border-[#f3cf98]/25 hidden sm:inline-block">
                Bilaspur
              </span>
            </div>
            <p className="text-[10px] tracking-wider text-[#d1b8b8] uppercase hidden sm:block font-medium">
              Boutique & Stitching Studio
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#fff7f2]/85">
          <button 
            onClick={() => scrollToSection('services')} 
            className="hover:text-[#f3cf98] transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('configurator')} 
            className="hover:text-[#f3cf98] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f3cf98]" />
            Style Studio
          </button>
          <button 
            onClick={() => scrollToSection('alteration')} 
            className="hover:text-[#f3cf98] transition-colors"
          >
            Alteration Slider
          </button>
          <button 
            onClick={() => scrollToSection('lookbook')} 
            className="hover:text-[#f3cf98] transition-colors"
          >
            Lookbook
          </button>
          <button 
            onClick={() => scrollToSection('location')} 
            className="hover:text-[#f3cf98] transition-colors flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5 text-[#d85c72]" />
            Visit Studio
          </button>
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={openWhatsApp}
            className="relative group overflow-hidden rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">Order on WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#fff7f2] hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto rounded-2xl liquid-glass p-5 flex flex-col gap-4 text-sm animate-fadeIn">
          <button 
            onClick={() => scrollToSection('services')} 
            className="text-left py-2 border-b border-white/10 hover:text-[#f3cf98]"
          >
            Tailoring & Stitching Services
          </button>
          <button 
            onClick={() => scrollToSection('configurator')} 
            className="text-left py-2 border-b border-white/10 hover:text-[#f3cf98] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#f3cf98]" />
            Custom Outfit & Measurement Builder
          </button>
          <button 
            onClick={() => scrollToSection('alteration')} 
            className="text-left py-2 border-b border-white/10 hover:text-[#f3cf98]"
          >
            Before & After Alterations
          </button>
          <button 
            onClick={() => scrollToSection('lookbook')} 
            className="text-left py-2 border-b border-white/10 hover:text-[#f3cf98]"
          >
            Boutique Lookbook Gallery
          </button>
          <button 
            onClick={() => scrollToSection('location')} 
            className="text-left py-2 hover:text-[#f3cf98] flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#d85c72]" />
            Location (Near Baba Balak Nath Temple, Sarti)
          </button>
        </div>
      )}
    </header>
  );
};
