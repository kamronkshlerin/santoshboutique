import React, { useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Navigation,
  Star,
  Instagram
} from 'lucide-react';
import { 
  BUSINESS_NAME, FULL_ADDRESS, LANDMARK_NOTE, PHONE_DISPLAY, 
  WHATSAPP_NUMBER, GOOGLE_REVIEW_URL, GOOGLE_MAPS_URL,
  INSTAGRAM_URL, FACEBOOK_URL 
} from '../constants';

interface ContactPageProps {
  onNavigate?: (page: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {

  useEffect(() => {
    document.title = `Contact & Location | ${BUSINESS_NAME} - Fatoh, Ghumarwin, Bilaspur (HP)`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste ${BUSINESS_NAME}! I would like to visit your boutique near Baba Balak Nath Temple in Fatoh, Ghumarwin and need directions / an appointment.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const openGoogleMaps = () => {
    window.open(GOOGLE_MAPS_URL, '_blank');
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
          <span className="text-[#f3cf98] font-semibold">Contact &amp; Studio Location</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3cf98]/10 border border-[#f3cf98]/20 text-[#f3cf98] text-xs font-semibold tracking-wider uppercase mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#d85c72]" />
          Fatoh, Ghumarwin, Bilaspur (HP) 174021
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#fff7f2] tracking-tight leading-[1.1] mb-6">
          Visit Our Boutique or Get In Touch
        </h1>
        <p className="max-w-3xl text-[#d1b8b8] text-base sm:text-lg leading-relaxed">
          Conveniently located {LANDMARK_NOTE}. Walk in with your fabric or book a dedicated fitting session via WhatsApp.
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
                Studio Address &amp; Exact NAP
              </h3>
              <p className="text-xs sm:text-sm text-[#fff7f2] leading-relaxed mb-3">
                {FULL_ADDRESS}
              </p>
              <p className="text-xs text-[#f3cf98] bg-[#f3cf98]/10 p-2.5 rounded-xl border border-[#f3cf98]/20">
                🧭 <strong>Landmark:</strong> {LANDMARK_NOTE}
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
                  <p className="text-xs text-[#d1b8b8] mt-0.5">Monday – Sunday: 9:00 AM – 7:30 PM</p>
                  <p className="text-[11px] text-[#25D366] font-semibold mt-1">Open 7 Days A Week for Fittings</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-white/5">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#fff7f2]">Direct Phone Line</h4>
                  <a href={`tel:${WHATSAPP_NUMBER}`} className="text-xs font-bold text-[#f3cf98] hover:underline block mt-0.5">
                    {PHONE_DISPLAY}
                  </a>
                  <p className="text-[11px] text-[#d1b8b8]">Speak directly with Masterji</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <button
              onClick={openWhatsApp}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Message on WhatsApp ({PHONE_DISPLAY})</span>
            </button>

            {/* Google Review Callout */}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-2xl bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-[#fbbf24] font-semibold text-xs shadow-lg hover:bg-[#fbbf24]/20 transition-all flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4 fill-[#fbbf24]" />
              <span>Leave a Review on Google Business Profile</span>
            </a>

            {/* Social Media Follow Box */}
            <div className="p-4 rounded-2xl liquid-glass border border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#d1b8b8]">Follow our work online:</span>
              <div className="flex items-center gap-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#E1306C]/20 border border-[#E1306C]/40 text-[#fff7f2] text-xs font-medium flex items-center gap-1.5 hover:bg-[#E1306C] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#fff7f2] text-xs font-medium flex items-center gap-1.5 hover:bg-[#1877F2] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
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
