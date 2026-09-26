import React from 'react';
import { Phone, MessageCircle, Heart, Star, Instagram } from 'lucide-react';
import { PageTab } from '../App';
import { 
  BUSINESS_NAME, FULL_ADDRESS, PHONE_DISPLAY, WHATSAPP_NUMBER, 
  INSTAGRAM_URL, FACEBOOK_URL, GOOGLE_REVIEW_URL 
} from '../constants';
import { BoutiqueLogo } from './BoutiqueLogo';

interface FooterProps {
  onNavigate?: (page: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {

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
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  return (
    <footer className="relative bg-[#0d0205] border-t border-[#f3cf98]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#d1b8b8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info & Exact NAP */}
          <div>
            <BoutiqueLogo 
              variant="footer" 
              onClick={(e: any) => handleLink(e, 'home')} 
              className="mb-4" 
            />
            <p className="text-xs leading-relaxed text-[#d1b8b8] mb-4">
              LADIES FASHION • CUSTOM TAILORING • PERFECT FITTING. Serving Bilaspur, Ghumarwin, Fatoh, and Himachal Pradesh with master craftsmanship.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f3cf98] hover:bg-[#E1306C] hover:text-white transition-all"
                title="Follow on Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f3cf98] hover:bg-[#1877F2] hover:text-white transition-all"
                title="Follow on Facebook"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#fbbf24] hover:bg-[#fbbf24] hover:text-black transition-all"
                title="Review on Google"
                aria-label="Google Review"
              >
                <Star className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Col 2: SEO & Multi-Page Navigation */}
          <div>
            <h4 className="text-sm font-bold text-[#fff7f2] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Website Pages (SEO &amp; AEO)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#/" onClick={(e) => handleLink(e, 'home')} className="hover:text-[#f3cf98] transition-colors">
                  🏠 Home Studio Landing
                </a>
              </li>
              <li>
                <a href="#/about" onClick={(e) => handleLink(e, 'about')} className="hover:text-[#f3cf98] transition-colors">
                  📖 About Us &amp; Craftsmanship
                </a>
              </li>
              <li>
                <a href="#/designs" onClick={(e) => handleLink(e, 'designs')} className="hover:text-[#f3cf98] transition-colors">
                  👗 Designs &amp; Silhouettes Catalog
                </a>
              </li>
              <li>
                <a href="#/process" onClick={(e) => handleLink(e, 'process')} className="hover:text-[#f3cf98] transition-colors">
                  ✂️ Our 6-Step Tailoring Process
                </a>
              </li>
              <li>
                <a href="#/pricing" onClick={(e) => handleLink(e, 'pricing')} className="hover:text-[#f3cf98] transition-colors">
                  🏷️ Stitching Rates &amp; Yardage Guide
                </a>
              </li>
              <li>
                <a href="#/contact" onClick={(e) => handleLink(e, 'contact')} className="hover:text-[#f3cf98] transition-colors">
                  📍 Contact Us &amp; Studio Location
                </a>
              </li>
              <li>
                <a href="#/blog" onClick={(e) => handleLink(e, 'blog')} className="text-[#f3cf98] font-semibold hover:underline transition-colors flex items-center gap-1">
                  📚 Himachali Fashion &amp; Tailoring Blog (20 Guides)
                </a>
              </li>
              <li>
                <a href="#/review" onClick={(e) => handleLink(e, 'review')} className="text-[#fbbf24] font-semibold hover:underline transition-colors flex items-center gap-1">
                  ⭐ Rate &amp; Review on Google
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Location & Exact NAP */}
          <div>
            <h4 className="text-sm font-bold text-[#fff7f2] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Exact Address (NAP)
            </h4>
            <p className="text-xs leading-relaxed mb-3 text-[#fff7f2]">
              📍 {FULL_ADDRESS}
            </p>
            <p className="text-xs text-[#f3cf98] mb-1">
              🕒 Monday – Sunday: 9:00 AM – 7:30 PM
            </p>
            <p className="text-xs text-[#d1b8b8] mt-2">
              🧭 Landmark: Siddh Temple, near Godriya Baba, Fatoh, Ghumarwin (HP 174021). Dedicated parking available.
            </p>
          </div>

          {/* Col 4: Quick Contact & Google Review */}
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
                <span>WhatsApp: {PHONE_DISPLAY}</span>
              </button>

              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="w-full py-2.5 px-3 rounded-xl liquid-glass text-xs font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-all border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-[#f3cf98]" />
                <span>Call: {PHONE_DISPLAY}</span>
              </a>

              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-xs font-semibold text-[#fbbf24] flex items-center justify-center gap-2 hover:bg-[#fbbf24]/20 transition-all"
              >
                <Star className="w-3.5 h-3.5 fill-[#fbbf24]" />
                <span>Leave a Google Review</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#d1b8b8]/70">
          <p>
            © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-[#d85c72] fill-[#d85c72]" /> for Fatoh, Ghumarwin, Bilaspur (HP) - 174021
          </p>
        </div>
      </div>
    </footer>
  );
};
