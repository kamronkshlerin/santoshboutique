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

export type PageTab = 'home' | 'about' | 'designs' | 'process' | 'pricing' | 'contact' | 'admin';

export const App: React.FC = () => {
  const getPageFromHash = (): PageTab => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('admin') || hash.includes('booking') || hash.includes('crm')) return 'admin';
    if (hash.includes('about')) return 'about';
    if (hash.includes('design') || hash.includes('catalog') || hash.includes('lookbook')) return 'designs';
    if (hash.includes('process') || hash.includes('how-it-works')) return 'process';
    if (hash.includes('pricing') || hash.includes('rate')) return 'pricing';
    if (hash.includes('contact') || hash.includes('location')) return 'contact';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageTab>(() => getPageFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageTab) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#120407] text-[#fff7f2] font-sans overflow-x-hidden selection:bg-[#d85c72] selection:text-white">
      {/* Top Floating Glass Navigation with Multi-Page Routing */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      <main className="min-h-screen">
        {/* ================= PAGE 1: HOME (COMPLETE ORIGINAL EXPERIENCE) ================= */}
        {currentPage === 'home' && (
          <div className="animate-fadeIn relative">
            {/* Cinematic Ambient Hero */}
            <div id="hero"><HeroSection /></div>

            {/* Local Trust & Guarantee Bar */}
            <div id="trust"><TrustBar /></div>

            {/* 5 Core Atelier Tailoring Services */}
            <div id="services"><ServicesGrid /></div>

            {/* Interactive Custom Style & Measurement Configurator */}
            <div id="configurator"><StyleConfigurator /></div>

            {/* Interactive Before & After Alterations Slider */}
            <div id="alteration"><BeforeAfterAlteration /></div>

            {/* Atelier Lookbook Gallery */}
            <div id="lookbook"><LookbookGallery /></div>

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
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
