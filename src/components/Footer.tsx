import React from 'react';
import { Scissors, Phone, MessageCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/919816000000', '_blank');
  };

  return (
    <footer className="relative bg-[#0d0205] border-t border-[#f3cf98]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#d1b8b8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8a1c32] to-[#f3cf98] flex items-center justify-center text-[#120407]">
                <Scissors className="w-4 h-4 -rotate-45" />
              </div>
              <span className="font-display font-bold text-2xl gold-gradient-text">
                Santosh
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-[#f3cf98] font-semibold mb-3">
              Boutique & Stitching Studio
            </p>
            <p className="text-xs leading-relaxed text-[#d1b8b8] mb-4">
              LADIES FASHION • CUSTOM STITCHING • STYLE FOR EVERY YOU. Serving Bilaspur, Sarti, and neighboring Himachal regions with authentic couture perfection.
            </p>
            <p className="text-xs font-serif italic text-[#f3cf98]">
              "Create • Stitch • Empower"
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-bold text-[#fff7f2] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Our Tailoring Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-[#f3cf98] transition-colors">Suit & Patiala Stitching</a></li>
              <li><a href="#services" className="hover:text-[#f3cf98] transition-colors">Princess Cut & Bridal Blouse</a></li>
              <li><a href="#services" className="hover:text-[#f3cf98] transition-colors">Lehenga & Gown Assembly</a></li>
              <li><a href="#alteration" className="hover:text-[#f3cf98] transition-colors">Express 24h Alterations</a></li>
              <li><a href="#configurator" className="hover:text-[#f3cf98] transition-colors">Custom Measurement Configurator</a></li>
            </ul>
          </div>

          {/* Col 3: Studio Location */}
          <div>
            <h4 className="text-sm font-bold text-[#fff7f2] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Studio Landmark
            </h4>
            <p className="text-xs leading-relaxed mb-3">
              📍 Near Baba Balak Nath Temple,<br />
              Sarti, District Bilaspur,<br />
              Himachal Pradesh — 174004
            </p>
            <p className="text-xs text-[#f3cf98] mb-1">
              🕒 Monday - Saturday: 9:30 AM - 7:30 PM
            </p>
            <p className="text-xs text-[#d1b8b8]">
              Sunday: By Appointment Only
            </p>
          </div>

          {/* Col 4: Quick Contact */}
          <div>
            <h4 className="text-sm font-bold text-[#fff7f2] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Direct Contact
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={openWhatsApp}
                className="w-full py-2.5 px-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-xs font-semibold text-white flex items-center justify-center gap-2 hover:bg-[#25D366] transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </button>

              <a
                href="tel:+919816000000"
                className="w-full py-2.5 px-3 rounded-xl liquid-glass text-xs font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-all border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-[#f3cf98]" />
                <span>Call Studio Masterji</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#d1b8b8]/70">
          <p>
            © {new Date().getFullYear()} Santosh Boutique & Stitching Studio. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-[#d85c72] fill-[#d85c72]" /> for Himachal Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
};
