import React from 'react';
import { Scissors, Phone, MessageCircle, Heart } from 'lucide-react';
import { useBloggerConfig } from '../config';
import { PageTab } from '../App';

interface FooterProps {
  onNavigate?: (page: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const config = useBloggerConfig();

  const handleLink = (e: React.MouseEvent, page: PageTab) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.hash = page === 'home' ? '#/' : `#/${page}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${config.whatsapp}`, '_blank');
  };

  return (
    <footer className="relative bg-[#0d0205] border-t border-[#f3cf98]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#d1b8b8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info & GEO Citations */}
          <div>
            <div 
              onClick={(e) => handleLink(e, 'home')}
              className="flex items-center gap-2.5 mb-4 cursor-pointer"
            >
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
              LADIES FASHION • CUSTOM STITCHING • STYLE FOR EVERY YOU. Serving Bilaspur, Sarti, Ghumarwin, and Himachal Pradesh with master atelier tailoring.
            </p>
            <p className="text-xs font-serif italic text-[#f3cf98]">
              "Create • Stitch • Empower"
            </p>
          </div>

          {/* Col 2: SEO & Multi-Page Navigation */}
          <div>
            <h4 className="text-sm font-bold text-[#fff7f2] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Website Pages (SEO & AEO)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#/" onClick={(e) => handleLink(e, 'home')} className="hover:text-[#f3cf98] transition-colors">
                  🏠 Home Studio Landing
                </a>
              </li>
              <li>
                <a href="#/about" onClick={(e) => handleLink(e, 'about')} className="hover:text-[#f3cf98] transition-colors">
                  📖 About Us & Craftsmanship
                </a>
              </li>
              <li>
                <a href="#/designs" onClick={(e) => handleLink(e, 'designs')} className="hover:text-[#f3cf98] transition-colors">
                  👗 Designs & Silhouettes Catalog
                </a>
              </li>
              <li>
                <a href="#/process" onClick={(e) => handleLink(e, 'process')} className="hover:text-[#f3cf98] transition-colors">
                  ✂️ Our 6-Step Tailoring Process
                </a>
              </li>
              <li>
                <a href="#/pricing" onClick={(e) => handleLink(e, 'pricing')} className="hover:text-[#f3cf98] transition-colors">
                  🏷️ Stitching Rates & Yardage Guide
                </a>
              </li>
              <li>
                <a href="#/contact" onClick={(e) => handleLink(e, 'contact')} className="hover:text-[#f3cf98] transition-colors">
                  📍 Contact Us & Studio Location
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Location & Landmark */}
          <div>
            <h4 className="text-sm font-bold text-[#fff7f2] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Studio Landmark (GEO)
            </h4>
            <p className="text-xs leading-relaxed mb-3">
              📍 {config.address}
            </p>
            <p className="text-xs text-[#f3cf98] mb-1">
              🕒 {config.hours}
            </p>
            <p className="text-xs text-[#d1b8b8] mt-2">
              🧭 Located directly near Baba Balak Nath Temple, Sarti road. Roadside parking available.
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
                href={`tel:${config.phone.replace(/\s+/g, '')}`}
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
            © {new Date().getFullYear()} Santosh Boutique &amp; Stitching Studio. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-[#d85c72] fill-[#d85c72]" /> for Bilaspur, Himachal Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
};
