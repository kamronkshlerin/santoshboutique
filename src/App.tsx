import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { ServicesGrid } from './components/ServicesGrid';
import { StyleConfigurator } from './components/StyleConfigurator';
import { BeforeAfterAlteration } from './components/BeforeAfterAlteration';
import { LookbookGallery } from './components/LookbookGallery';
import { StudioLocationSection } from './components/StudioLocationSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { AboutPage } from './pages/AboutPage';
import { DesignsPage } from './pages/DesignsPage';
import { ProcessPage } from './pages/ProcessPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminBookingsDashboard } from './components/AdminBookingsDashboard';
import { ScrollProgressBar, LuxuryMarqueeRibbon, useGlobalCardSpotlight } from './components/MotionSiteExperience';
import { MotionCoutureCursor } from './components/MotionCoutureCursor';

export type PageTab = 'home' | 'about' | 'designs' | 'process' | 'pricing' | 'contact' | 'admin';

export const App: React.FC = () => {
  useGlobalCardSpotlight();
  const resolveCurrentPage = (): PageTab => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    const combined = `${path} ${hash} ${search}`;

    if (combined.includes('admin') || combined.includes('booking') || combined.includes('crm')) return 'admin';
    if (combined.includes('about')) return 'about';
    if (combined.includes('design') || combined.includes('catalog') || combined.includes('lookbook')) return 'designs';
    if (combined.includes('process') || combined.includes('how-it-works')) return 'process';
    if (combined.includes('pricing') || combined.includes('rate')) return 'pricing';
    if (combined.includes('contact') || combined.includes('location')) return 'contact';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageTab>(() => resolveCurrentPage());
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sb_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('light-mode', theme === 'light');
      document.body.classList.toggle('light-mode', theme === 'light');
    }
    try {
      localStorage.setItem('sb_theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    // If user arrived with an old hash (e.g. /#/about), immediately upgrade to clean /about
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      const page = resolveCurrentPage();
      const cleanPath = page === 'home' ? '/' : `/${page}`;
      if (window.history.replaceState) {
        window.history.replaceState({ page }, '', cleanPath);
      }
    }

    const handleRouteChange = () => {
      const page = resolveCurrentPage();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const navigateTo = (page: PageTab) => {
    setCurrentPage(page);
    const cleanPath = page === 'home' ? '/' : `/${page}`;
    
    // Update browser URL cleanly without '#'
    if (window.history.pushState) {
      window.history.pushState({ page }, '', cleanPath);
    } else {
      window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'light-mode bg-[#faf7f5] text-[#1f070e]' : 'bg-[#120407] text-[#fff7f2]'} font-sans overflow-x-hidden selection:bg-[#d85c72] selection:text-white transition-colors duration-300`}>
      {/* Top Motionsite Scroll Progress Bar */}
      <ScrollProgressBar theme={theme} />

      {/* Haute-Couture Luxury Magnetic Cursor & Halo Follower */}
      <MotionCoutureCursor theme={theme} />

      {/* Top Floating Glass Navigation with Multi-Page Routing & Theme Toggle */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={navigateTo} 
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="min-h-screen">
        {/* ================= PAGE 1: HOME (COMPLETE ORIGINAL EXPERIENCE) ================= */}
        {currentPage === 'home' && (
          <div className="animate-fadeIn relative">
            {/* Cinematic Ambient Hero */}
            <div id="hero"><HeroSection /></div>

            {/* Local Trust & Guarantee Bar */}
            <div id="trust"><TrustBar /></div>

            {/* Haute-Couture Infinite Marquee Ticker */}
            <LuxuryMarqueeRibbon theme={theme} />

            {/* 5 Core Atelier Tailoring Services */}
            <div id="services"><ServicesGrid /></div>

            {/* Interactive Custom Style & Measurement Configurator */}
            <div id="configurator"><StyleConfigurator /></div>

            {/* Interactive Before & After Alterations Slider */}
            <div id="alteration"><BeforeAfterAlteration /></div>

            {/* Atelier Lookbook Gallery */}
            <div id="lookbook"><LookbookGallery /></div>

            {/* Haute-Couture Secondary Ticker */}
            <LuxuryMarqueeRibbon theme={theme} />

            {/* Studio Location & Fatoh Landmark Map */}
            <div id="location"><StudioLocationSection /></div>
          </div>
        )}

        {/* ================= PAGE 2: ABOUT US (HERITAGE & CRAFTSMANSHIP) ================= */}
        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {/* ================= PAGE 3: DESIGNS & CATALOG (SILHOUETTES & FABRICS) ================= */}
        {currentPage === 'designs' && (
          <DesignsPage onNavigate={navigateTo} />
        )}

        {/* ================= PAGE 4: OUR PROCESS (6-STEP WORKFLOW & TIMELINES) ================= */}
        {currentPage === 'process' && (
          <ProcessPage onNavigate={navigateTo} />
        )}

        {/* ================= PAGE 5: PRICING GUIDE (RATE CARD & YARDAGE GUIDE) ================= */}
        {currentPage === 'pricing' && (
          <PricingPage onNavigate={navigateTo} />
        )}

        {/* ================= PAGE 6: CONTACT & LOCATION (DIRECTIONS & MAPS) ================= */}
        {currentPage === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}

        {/* ================= PAGE 7: ADMIN BOOKINGS CRM (SECURE ACCESS) ================= */}
        {currentPage === 'admin' && (
          <AdminBookingsDashboard onClose={() => navigateTo('home')} />
        )}
      </main>

      {/* Studio Footer with SEO & Multi-Page Links */}
      <Footer onNavigate={navigateTo} />

      {/* Persistent Floating WhatsApp Booking Engine */}
      <FloatingWhatsApp theme={theme} />
    </div>
  );
};

export default App;
