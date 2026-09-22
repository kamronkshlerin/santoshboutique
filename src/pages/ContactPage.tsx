import React, { useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Navigation
} from 'lucide-react';
import { useBloggerConfig } from '../config';

interface ContactPageProps {
  onNavigate?: (page: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const config = useBloggerConfig();

  useEffect(() => {
    document.title = "Contact Us & Studio Location | Santosh Boutique Bilaspur (HP)";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste ${config.boutiqueName}! I would like to visit your boutique in Fatoh near Baba Balak Nath Temple and need directions / an appointment.`
    );
    window.open(`https://wa.me/${config.whatsapp}?text=${text}`, '_blank');
  };

  const openGoogleMaps = () => {
    window.open(config.mapsUrl, '_blank');
  };

  return (
    <div className="pt-28 pb-20 animate-fadeIn">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <nav className="flex items-center gap-2 text-xs text-[#d1b8b8] mb-4">
          <button 
            onClick={() => onNavigate && onNavigate('home')} 
            className="hover:text-[#f3cf98] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#f3cf98] font-semibold">Contact & Studio Location</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3cf98]/10 border border-[#f3cf98]/20 text-[#f3cf98] text-xs font-semibold tracking-wider uppercase mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#d85c72]" />
          Himachal Pradesh Atelier
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#fff7f2] tracking-tight leading-[1.1] mb-6">
          Visit Our Boutique or Get In Touch
        </h1>
        <p className="max-w-3xl text-[#d1b8b8] text-base sm:text-lg leading-relaxed">
          Conveniently located near the sacred Baba Balak Nath Temple in Fatoh, Bilaspur. Walk in with your fabric or book a dedicated fitting session via WhatsApp.
        </p>
      </div>

      {/* Main Grid: Details + Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Col 1: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="rounded-3xl liquid-glass p-7 border border-[#f3cf98]/30 shadow-xl">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8a1c32] to-[#d85c72] flex items-center justify-center text-white mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#fff7f2] mb-2">
                Studio Address & Landmark
              </h3>
              <p className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed mb-3">
                {config.address}
              </p>
              <p className="text-xs text-[#f3cf98] bg-[#f3cf98]/10 p-2.5 rounded-xl border border-[#f3cf98]/20">
                🧭 <strong>Landmark:</strong> {config.landmark}
              </p>

              <button
                onClick={openGoogleMaps}
                className="mt-5 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/15 text-xs font-semibold text-[#fff7f2] border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#f3cf98]" />
                <span>Open in Google Maps App</span>
              </button>
            </div>

            {/* Timings & Phone Card */}
            <div className="rounded-3xl liquid-glass p-7 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#f3cf98]/15 text-[#f3cf98] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#fff7f2]">Operating Hours</h4>
                  <p className="text-xs text-[#d1b8b8] mt-0.5">{config.hours}</p>
                  <p className="text-[11px] text-[#25D366] font-semibold mt-1">Open 7 Days A Week for Fittings</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-white/5">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#fff7f2]">Direct Phone Line</h4>
                  <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className="text-xs font-bold text-[#f3cf98] hover:underline block mt-0.5">
                    {config.phone}
                  </a>
                  <p className="text-[11px] text-[#d1b8b8]">Speak directly with Masterji</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <button
              onClick={openWhatsApp}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Message on WhatsApp Now</span>
            </button>
          </div>

          {/* Col 2: Interactive Google Map + Directions Guide (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-[#f3cf98]/30 shadow-2xl h-[420px] relative">
              <iframe
                title="Santosh Boutique Studio Map"
                src="https://maps.google.com/maps?q=31.412639,76.744472&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Travel Directions from Nearby Towns */}
            <div className="rounded-3xl liquid-glass p-7 border border-white/10 space-y-4">
              <h4 className="text-base font-bold text-[#fff7f2] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#f3cf98]" />
                <span>How to Reach From Major Bilaspur Hubs</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#d1b8b8]">
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                  <strong className="text-[#fff7f2] block mb-1">From Bilaspur Bus Stand:</strong>
                  Take the Fatoh road towards Baba Balak Nath Temple. The boutique is positioned just a 1-minute walk from the temple gates.
                </div>
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                  <strong className="text-[#fff7f2] block mb-1">From Ghumarwin / Hamirpur:</strong>
                  Follow the state highway route leading to Fatoh. Ample roadside parking is available right in front of our stitching studio.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
