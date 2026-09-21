import React from 'react';
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

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#120407] text-[#fff7f2] font-sans overflow-x-hidden selection:bg-[#d85c72] selection:text-white">
      {/* Top Floating Glass Navigation */}
      <Navbar />

      {/* Cinematic Ambient Hero */}
      <main>
        <HeroSection />

        {/* Local Trust & Guarantee Bar */}
        <TrustBar />

        {/* 5 Core Tailoring Services */}
        <ServicesGrid />

        {/* Interactive Custom Style & Measurement Configurator */}
        <StyleConfigurator />

        {/* Interactive Before & After Alterations Slider */}
        <BeforeAfterAlteration />

        {/* Atelier Lookbook Gallery */}
        <LookbookGallery />

        {/* Studio Location & Baba Balak Nath Temple Landmark Map */}
        <StudioLocationSection />
      </main>

      {/* Studio Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Booking Engine */}
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
