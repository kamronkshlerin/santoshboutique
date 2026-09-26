import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, MapPin, Sun, Moon, Star, Instagram, Phone, BookOpen } from 'lucide-react';
import { useBloggerConfig } from '../config';
import { PageTab } from '../App';
import { 
  INSTAGRAM_URL, FACEBOOK_URL, PHONE_DISPLAY, PHONE_TEL, FULL_ADDRESS 
} from '../constants';
import { BoutiqueLogo } from './BoutiqueLogo';

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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // Nav Items with compact labels for Desktop and full labels for Mobile Drawer
  const navItems: { id: PageTab; label: string; desktopLabel: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home', desktopLabel: 'Home' },
    { id: 'about', label: 'About Us', desktopLabel: 'About Us' },
    { id: 'designs', label: 'Designs & Catalog', desktopLabel: 'Designs' },
    { id: 'process', label: 'Our Process', desktopLabel: 'Process' },
    { id: 'pricing', label: 'Pricing Guide', desktopLabel: 'Pricing' },
    { 
      id: 'blog', 
      label: 'Fashion Blog (20 Guides)', 
      desktopLabel: 'Blog', 
      icon: <BookOpen className="w-3.5 h-3.5 text-[#f3cf98] shrink-0" /> 
    },
    { 
      id: 'contact', 
      label: 'Contact & Location', 
      desktopLabel: 'Contact', 
      icon: <MapPin className="w-3.5 h-3.5 text-[#d85c72] shrink-0" /> 
    },
    { 
      id: 'review', 
      label: 'Rate & Review ⭐', 
      desktopLabel: 'Reviews ⭐', 
      icon: <Star className="w-3.5 h-3.5 text-[#fbbf24] fill-[#fbbf24] shrink-0" /> 
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2.5 sm:px-5 lg:px-8 pt-2.5 sm:pt-3.5 transition-all duration-300 pointer-events-none">
      <nav
        className={`max-w-7xl mx-auto rounded-full px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 pointer-events-auto shadow-2xl ${
          theme === 'light'
            ? 'bg-white/95 backdrop-blur-xl border border-[#8a1c32]/20 text-[#1a060c] shadow-[#8a1c32]/5'
            : scrolled
            ? 'bg-[#120407]/95 backdrop-blur-xl border border-[#f3cf98]/35 text-[#fff7f2] shadow-black/80'
            : 'bg-[#1a080e]/85 backdrop-blur-md border border-[#f3cf98]/20 text-[#fff7f2]'
        }`}
      >
        {/* Brand Logo & Name (Shrink-0 prevents squishing) */}
        <div className="shrink-0 flex items-center">
          <BoutiqueLogo 
            variant="navbar" 
            theme={theme} 
            onClick={() => handleNavClick('home')} 
          />
        </div>

        {/* Desktop Multi-Page Links (Visible on XL screens: >= 1150px) */}
        <div className="hidden xl:flex items-center gap-1 lg:gap-1.5 text-xs lg:text-[13px] font-medium">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? theme === 'light'
                      ? 'bg-[#8a1c32] text-white font-semibold shadow-md shadow-[#8a1c32]/25'
                      : 'bg-[#f3cf98]/20 text-[#f3cf98] font-bold border border-[#f3cf98]/40 shadow-sm'
                    : theme === 'light'
                    ? 'text-[#4a383e] hover:text-[#8a1c32] hover:bg-[#8a1c32]/10'
                    : 'text-[#fff7f2]/80 hover:text-[#f3cf98] hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.desktopLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Theme Toggle, Socials, WhatsApp & Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Light / Dark Mode Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center shrink-0 ${
                theme === 'light'
                  ? 'bg-[#8a1c32]/10 border border-[#8a1c32]/20 text-[#8a1c32] hover:bg-[#8a1c32]/20'
                  : 'bg-white/5 border border-[#f3cf98]/25 hover:border-[#f3cf98] text-[#f3cf98]'
              }`}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[#8a1c32]" />
              ) : (
                <Sun className="w-4 h-4 text-[#f3cf98]" />
              )}
            </button>
          )}

          {/* Social Media Links (Visible on 2XL wide screens) */}
          <div className="hidden 2xl:flex items-center gap-1 shrink-0">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                theme === 'light'
                  ? 'text-[#E1306C] hover:bg-[#E1306C]/10'
                  : 'text-[#f3cf98] hover:bg-white/10'
              }`}
              title="Instagram: @santoshboutiquehp"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                theme === 'light'
                  ? 'text-[#1877F2] hover:bg-[#1877F2]/10'
                  : 'text-[#f3cf98] hover:bg-white/10'
              }`}
              title="Facebook Page"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          {/* WhatsApp Direct Action Button (Never wraps) */}
          <button
            onClick={openWhatsApp}
            className="rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-1.5 active:scale-95 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">WhatsApp Booking</span>
            <span className="sm:hidden whitespace-nowrap">WhatsApp</span>
          </button>

          {/* Mobile / Tablet Menu Toggle (Visible on screens < XL: under 1150px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden p-2 rounded-full transition-colors shrink-0 flex items-center justify-center ${
              theme === 'light' 
                ? 'text-[#1a060c] hover:bg-[#8a1c32]/10' 
                : 'text-[#fff7f2] hover:bg-white/10'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#f3cf98]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Full-screen Dark Backdrop when Mobile Drawer is Open */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden pointer-events-auto transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile & Tablet Drawer Menu - 100% Solid & Fully Opaque */}
      {mobileMenuOpen && (
        <div 
          className={`xl:hidden fixed top-[68px] sm:top-[74px] left-3 right-3 sm:left-6 sm:right-6 max-h-[85vh] overflow-y-auto rounded-3xl p-4 sm:p-6 flex flex-col gap-2 border shadow-2xl z-50 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-200 ${
            theme === 'light'
              ? 'border-[#8a1c32]/25 text-[#1a060c]'
              : 'border-[#f3cf98]/30 text-[#fff7f2]'
          }`}
          style={{
            backgroundColor: theme === 'light' ? '#ffffff' : '#140408',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)'
          }}
        >
          {/* Menu Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-3 rounded-2xl text-left flex items-center justify-between transition-colors text-sm font-semibold ${
                    isActive
                      ? theme === 'light'
                        ? 'bg-[#8a1c32] text-white shadow-md'
                        : 'bg-[#f3cf98]/20 text-[#f3cf98] border border-[#f3cf98]/40'
                      : theme === 'light'
                      ? 'text-[#2d1219] hover:bg-[#8a1c32]/10 hover:text-[#8a1c32]'
                      : 'text-[#fff7f2]/85 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#f3cf98] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Quick Contact & Socials Bar inside Drawer */}
          <div className={`pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            theme === 'light' ? 'border-[#8a1c32]/15' : 'border-white/10'
          }`}>
            <a
              href={`tel:${PHONE_TEL}`}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition-colors ${
                theme === 'light'
                  ? 'bg-[#8a1c32]/10 text-[#8a1c32] border-[#8a1c32]/25 hover:bg-[#8a1c32]/20'
                  : 'bg-white/5 hover:bg-white/10 text-[#f3cf98] border-[#f3cf98]/20'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {PHONE_DISPLAY}</span>
            </a>

            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold ${
                  theme === 'light'
                    ? 'bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20'
                    : 'bg-white/5 hover:bg-white/10 text-white'
                }`}
              >
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>Instagram</span>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold ${
                  theme === 'light'
                    ? 'bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20'
                    : 'bg-white/5 hover:bg-white/10 text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Location Landmark reminder */}
          <div className={`text-[11px] text-center sm:text-left pt-1 font-medium ${
            theme === 'light' ? 'text-[#523c44]' : 'text-[#d1b8b8]/70'
          }`}>
            📍 Studio: {FULL_ADDRESS}
          </div>
        </div>
      )}
    </header>
  );
};
