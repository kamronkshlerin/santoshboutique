import React, { useState, useEffect } from 'react';
import { Scissors, MessageCircle, Menu, X, MapPin, Sun, Moon } from 'lucide-react';
import { useBloggerConfig } from '../config';
import { PageTab } from '../App';

interface NavbarProps {
  currentPage: PageTab;
  onNavigate: (page: PageTab) => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, theme = 'dark', onToggleTheme }) => {
  const config = useBloggerConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageTab) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste ${config.boutiqueName}! I want to inquire about custom tailoring & stitching services.`
    );
    window.open(`https://wa.me/${config.whatsapp}?text=${text}`, '_blank');
  };

  const navItems: { id: PageTab; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'designs', label: 'Designs & Catalog' },
    { id: 'process', label: 'Our Process' },
    { id: 'pricing', label: 'Pricing Guide' },
    { id: 'contact', label: 'Contact & Location', icon: <MapPin className="w-3.5 h-3.5 text-[#d85c72]" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto rounded-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          theme === 'light'
            ? 'bg-white/95 backdrop-blur-xl border border-[#8a1c32]/20 shadow-xl shadow-[#8a1c32]/5 text-[#1a060c]'
            : scrolled
            ? 'liquid-glass-nav py-2.5 shadow-2xl border border-[#f3cf98]/30 bg-[#120407]/90 text-[#fff7f2]'
            : 'bg-[#1a080e]/80 backdrop-blur-md border border-[#f3cf98]/20 text-[#fff7f2]'
        }`}
      >
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#8a1c32] via-[#d85c72] to-[#f3cf98] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-[#120407] -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg sm:text-2xl tracking-wide gold-gradient-text">
                Santosh
              </span>
              <span className={`text-[9px] sm:text-[10px] uppercase tracking-widest px-1.5 py-0.2 rounded-full hidden sm:inline-block ${
                theme === 'light'
                  ? 'text-[#8a1c32] bg-[#8a1c32]/10 border border-[#8a1c32]/25'
                  : 'text-[#f3cf98] bg-[#f3cf98]/10 border border-[#f3cf98]/25'
              }`}>
                Bilaspur
              </span>
            </div>
            <p className={`text-[9px] sm:text-[10px] tracking-wider uppercase hidden md:block font-medium ${
              theme === 'light' ? 'text-[#6b525a]' : 'text-[#d1b8b8]'
            }`}>
              Boutique & Stitching Studio
            </p>
          </div>
        </div>

        {/* Desktop Multi-Page Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isActive
                    ? theme === 'light'
                      ? 'bg-[#8a1c32] text-white font-semibold shadow-md shadow-[#8a1c32]/25'
                      : 'bg-[#f3cf98]/15 text-[#f3cf98] font-semibold border border-[#f3cf98]/40 shadow-sm'
                    : theme === 'light'
                    ? 'text-[#4a383e] hover:text-[#8a1c32] hover:bg-[#8a1c32]/10'
                    : 'text-[#fff7f2]/80 hover:text-[#f3cf98] hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light / Dark Mode Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`p-2 sm:p-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center ${
                theme === 'light'
                  ? 'bg-white border border-[#8a1c32]/25 text-[#8a1c32] hover:border-[#8a1c32]'
                  : 'liquid-glass border border-[#f3cf98]/30 hover:border-[#f3cf98] text-[#f3cf98]'
              }`}
              title={theme === 'light' ? 'Switch to Royal Dark Velvet Mode' : 'Switch to Pearl Silk Light Mode'}
              aria-label="Toggle Light/Dark Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[#8a1c32]" />
              ) : (
                <Sun className="w-4 h-4 text-[#f3cf98]" />
              )}
            </button>
          )}

          <button
            onClick={openWhatsApp}
            className="relative group overflow-hidden rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            <span className="hidden sm:inline">WhatsApp Booking</span>
            <span className="sm:hidden">Chat</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors ${
              theme === 'light' ? 'text-[#1a060c] hover:bg-[#8a1c32]/10' : 'text-[#fff7f2] hover:bg-white/10'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden mt-2 max-w-7xl mx-auto rounded-3xl p-5 flex flex-col gap-2 text-sm border shadow-2xl animate-fadeIn ${
          theme === 'light'
            ? 'bg-white/98 border-[#8a1c32]/20 text-[#1a060c]'
            : 'liquid-glass border-[#f3cf98]/30 bg-[#120407]/95 text-[#fff7f2]'
        }`}>
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`p-3 rounded-2xl text-left flex items-center justify-between transition-colors ${
                  isActive
                    ? theme === 'light'
                      ? 'bg-[#8a1c32] text-white font-semibold'
                      : 'bg-[#f3cf98]/20 text-[#f3cf98] font-bold border border-[#f3cf98]/30'
                    : theme === 'light'
                    ? 'text-[#4a383e] hover:bg-[#8a1c32]/10 hover:text-[#8a1c32]'
                    : 'text-[#fff7f2]/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#f3cf98]" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
