import React, { useState } from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation, ShieldCheck, Heart, Image as ImageIcon, Map as MapIcon, ExternalLink } from 'lucide-react';
import { ASSETS } from '../constants';

export const StudioLocationSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'photos' | 'map'>('photos');

  const openGoogleMaps = () => {
    window.open('https://maps.google.com/?q=Baba+Balak+Nath+Temple+Sarti+Bilaspur+Himachal+Pradesh+174004', '_blank');
  };

  const openCall = () => {
    window.open('tel:+919816000000', '_self');
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("Namaste! I am visiting Sarti near Baba Balak Nath Temple. Please share exact boutique landmark directions.");
    window.open(`https://wa.me/919816000000?text=${text}`, '_blank');
  };

  return (
    <section id="location" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#f3cf98]/20">
            <MapPin className="w-3.5 h-3.5 text-[#d85c72]" />
            <span>Actual Studio Location & Landmark</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#fff7f2] tracking-tight leading-tight mb-4">
            Visit Our Atelier in <span className="italic gold-gradient-text">Sarti, Bilaspur</span>
          </h2>

          <p className="text-sm sm:text-base text-[#d1b8b8] font-light">
            Conveniently located directly near the revered Baba Balak Nath Temple in Sarti. Check real photos of our shop and landmark gate below for easy navigation.
          </p>
        </div>

        {/* 2-Column Info & Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Studio Details Card */}
          <div className="lg:col-span-5 liquid-glass p-8 sm:p-10 rounded-3xl border border-[#f3cf98]/25 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Flyer Stamp */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d85c72]/20 border border-[#d85c72]/40 text-[#f3cf98] text-xs font-semibold uppercase tracking-wider mb-6">
                <Heart className="w-3.5 h-3.5 text-[#d85c72]" />
                <span>Local Tailor Trusted by Your Neighbours</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#fff7f2] mb-6">
                Santosh Boutique & Stitching Studio
              </h3>

              {/* Address Details */}
              <div className="space-y-4 text-sm text-[#d1b8b8] mb-8">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#d85c72]/20 border border-[#d85c72]/40 flex items-center justify-center text-[#d85c72] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#fff7f2] block text-base font-semibold">
                      Exact Address & Landmark:
                    </strong>
                    <p className="mt-0.5 leading-relaxed">
                      Near Baba Balak Nath Temple, Sarti,<br />
                      District Bilaspur (Himachal Pradesh) — <span className="text-[#f3cf98] font-semibold">174004</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#f3cf98]/20 border border-[#f3cf98]/40 flex items-center justify-center text-[#f3cf98] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#fff7f2] block text-base font-semibold">
                      Studio Hours:
                    </strong>
                    <p className="mt-0.5">
                      Monday to Saturday: <strong className="text-[#fff7f2]">9:30 AM – 7:30 PM</strong><br />
                      Sunday: Special Bridal Appointments Only
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#fff7f2] block text-base font-semibold">
                      Easy Landmark Identification:
                    </strong>
                    <p className="mt-0.5">
                      Look for the white 3-dome Temple Archway gate in Sarti. Our studio building is located right adjacent with vehicle parking space.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-6 border-t border-white/10">
              <button
                onClick={openGoogleMaps}
                className="py-3 px-3 rounded-2xl bg-white/10 hover:bg-[#d85c72] border border-[#f3cf98]/30 hover:border-transparent text-xs font-semibold text-[#fff7f2] flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-lg"
              >
                <Navigation className="w-3.5 h-3.5 text-[#f3cf98]" />
                <span>Maps Route</span>
              </button>

              <button
                onClick={openCall}
                className="py-3 px-3 rounded-2xl bg-white/10 hover:bg-[#8a1c32] border border-[#f3cf98]/30 hover:border-transparent text-xs font-semibold text-[#fff7f2] flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-lg"
              >
                <Phone className="w-3.5 h-3.5 text-[#f3cf98]" />
                <span>Call Studio</span>
              </button>

              <button
                onClick={openWhatsApp}
                className="py-3 px-3 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-lg"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column: Real Photos & Map Interactive View */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden liquid-glass border border-[#f3cf98]/25 shadow-2xl p-6 flex flex-col justify-between">
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('photos')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'photos'
                      ? 'bg-[#f3cf98] text-[#120407] shadow-md'
                      : 'bg-white/5 text-[#d1b8b8] hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Real Landmark & Shop Photos</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'map'
                      ? 'bg-[#f3cf98] text-[#120407] shadow-md'
                      : 'bg-white/5 text-[#d1b8b8] hover:text-white'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Interactive Map</span>
                </button>
              </div>

              <span className="text-[11px] text-[#f3cf98] font-medium hidden sm:inline-block">
                📍 Sarti, Bilaspur (H.P.)
              </span>
            </div>

            {/* View Mode: Real Landmark & Shop Photos */}
            {viewMode === 'photos' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Photo 1: Actual Shop Exterior */}
                  <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-black/40">
                    <img
                      src={ASSETS.shopExterior}
                      alt="Santosh Boutique Shop Building in Sarti, Bilaspur"
                      className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120407]/90 via-[#120407]/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#120407]/85 backdrop-blur-md border border-[#f3cf98]/30 text-[10px] font-bold text-[#f3cf98] uppercase tracking-wider">
                      Shop Building
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs font-bold text-[#fff7f2]">
                        Santosh Boutique & Studio Building
                      </p>
                      <p className="text-[11px] text-[#d1b8b8]">
                        Located on the main Sarti approach road
                      </p>
                    </div>
                  </div>

                  {/* Photo 2: Baba Balak Nath Temple Landmark Gate */}
                  <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-black/40">
                    <img
                      src={ASSETS.templeLandmark}
                      alt="Baba Balak Nath Temple Gate Landmark in Sarti, Bilaspur"
                      className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120407]/90 via-[#120407]/30 to-transparent" />

                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#8a1c32]/90 backdrop-blur-md border border-[#f3cf98]/30 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                      <span>🛕 Key Landmark</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs font-bold text-[#fff7f2]">
                        Baba Balak Nath Temple Gate
                      </p>
                      <p className="text-[11px] text-[#f3cf98]">
                        White 3-dome archway with stone staircase
                      </p>
                    </div>
                  </div>
                </div>

                {/* Helpful direction tip box */}
                <div className="p-4 rounded-2xl bg-white/5 border border-[#f3cf98]/20 flex items-center justify-between gap-3 text-xs text-[#d1b8b8]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🧭</span>
                    <p>
                      <strong className="text-[#fff7f2]">Navigation Tip:</strong> When coming via Sarti road, look for the temple's white arches. Our shop is just steps away.
                    </p>
                  </div>
                  <button
                    onClick={openGoogleMaps}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-[#d85c72] hover:bg-[#b53c52] text-white font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <span>Open GPS</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode: Interactive Map */
              <div className="relative flex-1 min-h-[360px] rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  title="Santosh Boutique Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13637.284218774213!2d76.748!3d31.341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390538a0f5a7d7cb%3A0xb36718d7c4331089!2sBaba%20Balak%20Nath%20Temple!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[360px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
