import React, { useState } from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation, ShieldCheck, Heart, Image as ImageIcon, Map as MapIcon, ExternalLink } from 'lucide-react';
import { 
  BUSINESS_NAME, FULL_ADDRESS, LANDMARK_NOTE, 
  WHATSAPP_NUMBER, GOOGLE_MAPS_URL, 
  REAL_ASSETS 
} from '../constants';

export const StudioLocationSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'photos' | 'map'>('photos');

  const openGoogleMaps = () => {
    window.open(GOOGLE_MAPS_URL, '_blank');
  };

  const openCall = () => {
    window.open(`tel:${WHATSAPP_NUMBER}`, '_self');
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Namaste ${BUSINESS_NAME}! I am visiting near ${LANDMARK_NOTE}. Please share exact boutique landmark directions.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section id="location" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#f3cf98]/20">
            <MapPin className="w-3.5 h-3.5 text-[#d85c72]" />
            <span>Actual Studio Location &amp; Landmark</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#fff7f2] tracking-tight leading-tight mb-4">
            Visit Our Atelier in <span className="italic gold-gradient-text">Fatoh, Ghumarwin</span>
          </h2>

          <p className="text-sm sm:text-base text-[#d1b8b8] font-light">
            Conveniently located {LANDMARK_NOTE}. Check real photos of our shop and landmark gate below for easy navigation.
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
                {BUSINESS_NAME}
              </h3>

              {/* Address Details */}
              <div className="space-y-4 text-sm text-[#d1b8b8] mb-8">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#d85c72]/20 border border-[#d85c72]/40 flex items-center justify-center text-[#d85c72] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#fff7f2] block text-base font-semibold">
                      Exact Address (NAP):
                    </strong>
                    <p className="mt-0.5 leading-relaxed text-[#fff7f2]">
                      {FULL_ADDRESS}
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
                      Monday – Sunday: 9:00 AM – 7:30 PM (Open 7 Days)
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
                      {LANDMARK_NOTE}. Look for the Santosh Boutique signboard with ample roadside parking.
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
                📍 Fatoh, Bilaspur (H.P.)
              </span>
            </div>

            {/* View Mode: Real Landmark & Shop Photos */}
            {viewMode === 'photos' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Photo 1: Actual Shop Building */}
                  <div className="group rounded-2xl overflow-hidden border border-white/15 bg-[#120407] shadow-xl flex flex-col">
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#1a080e] border-b border-white/10 text-[11px]">
                      <span className="font-bold text-[#f3cf98] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Actual Shop Building
                      </span>
                      <span className="text-[10px] text-[#d1b8b8]">Fatoh</span>
                    </div>

                    <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
                      <img
                        src={REAL_ASSETS.shopExterior}
                        alt="Santosh Boutique real storefront and tailoring studio building in Fatoh Ghumarwin Bilaspur Himachal Pradesh"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-3.5 bg-[#120407] border-t border-white/10">
                      <p className="text-sm font-bold text-white leading-tight mb-1">
                        Santosh Boutique &amp; Studio
                      </p>
                      <p className="text-xs text-[#d1b8b8] leading-relaxed">
                        Main building entrance at Fatoh, Ghumarwin (HP).
                      </p>
                    </div>
                  </div>

                  {/* Photo 2: Baba Balak Nath Temple Arch Landmark */}
                  <div className="group rounded-2xl overflow-hidden border border-white/15 bg-[#120407] shadow-xl flex flex-col">
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#1a080e] border-b border-white/10 text-[11px]">
                      <span className="font-bold text-[#f3cf98] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        Key Landmark
                      </span>
                      <span className="text-[10px] text-[#d1b8b8]">Temple Arch</span>
                    </div>

                    <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
                      <img
                        src={REAL_ASSETS.templeLandmark}
                        alt="Baba Balak Nath Temple Arch Landmark near Santosh Boutique Fatoh Ghumarwin"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-3.5 bg-[#120407] border-t border-white/10">
                      <p className="text-sm font-bold text-white leading-tight mb-1">
                        Baba Balak Nath Temple Arch
                      </p>
                      <p className="text-xs text-[#d1b8b8] leading-relaxed">
                        Major landmark on road; shop is right next to it.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Helpful direction tip box */}
                <div className="studio-direction-box p-4 rounded-2xl bg-white/5 border border-[#f3cf98]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#d1b8b8]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl shrink-0">🧭</span>
                    <p className="studio-direction-text leading-relaxed">
                      <strong className="studio-direction-bold text-[#fff7f2] font-bold">Navigation Tip:</strong> When coming via Fatoh / Sarti road, look for the temple's white arches. Our shop is just steps away.
                    </p>
                  </div>
                  <button
                    onClick={openGoogleMaps}
                    className="shrink-0 px-3.5 py-2 rounded-xl bg-[#8a1c32] hover:bg-[#b53c52] text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <span>Open GPS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode: Interactive Map */
              <div className="relative flex-1 min-h-[360px] rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  title="Santosh Boutique Location Map"
                  src="https://maps.google.com/maps?q=31.412639,76.744472&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
