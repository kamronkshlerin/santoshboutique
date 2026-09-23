import React, { useEffect } from 'react';
import { 
  Scissors, 
  Award, 
  CheckCircle2, 
  MapPin, 
  MessageCircle, 
  HelpCircle,
  Star,
  Sparkles
} from 'lucide-react';
import { 
  BUSINESS_NAME, LANDMARK_NOTE, 
  WHATSAPP_NUMBER, REAL_ASSETS, getAssetUrl, GOOGLE_REVIEW_URL 
} from '../constants';

interface AboutPageProps {
  onNavigate?: (page: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {

  useEffect(() => {
    document.title = `About Us | ${BUSINESS_NAME} - Fatoh, Ghumarwin, Bilaspur (HP)`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste ${BUSINESS_NAME}! I was reading about your boutique on your website and want to schedule a consultation.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const faqs = [
    {
      q: "Who is the lead tailor and owner of Santosh Boutique in Bilaspur?",
      a: "Santosh Boutique & Stitching Studio is led by Master Santosh, bringing over 15+ years of bespoke ladies tailoring and couture design experience to Fatoh, Ghumarwin and Bilaspur, Himachal Pradesh."
    },
    {
      q: "Where is Santosh Boutique located in Bilaspur (H.P.)?",
      a: "The studio is located near Baba Balak Nath Temple, Fatoh, Ghumarwin, Himachal Pradesh 174021 (GPS: 31.412639, 76.744472), easily accessible by road from Bilaspur town and Ghumarwin."
    },
    {
      q: "What types of ladies outfits are stitched at Santosh Boutique?",
      a: "We specialize in Punjabi Patiala suits, designer bridal blouses (Princess cut, padded, deep neck with dori/latkans), Anarkalis, shararas, heavy wedding lehengas, western fusion party dresses, and express alteration services."
    },
    {
      q: "Does Santosh Boutique recreate outfits from Instagram and Pinterest?",
      a: "Yes! Clients regularly bring Instagram reels, Pinterest pins, and celebrity photos. Our master tailor drafts bespoke custom paper patterns to faithfully recreate any design according to your body measurements."
    }
  ];

  return (
    <div className="pt-28 pb-20 animate-fadeIn">
      {/* Breadcrumb & Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <nav className="flex items-center gap-2 text-xs text-[#d1b8b8] mb-4">
          <button 
            onClick={() => onNavigate && onNavigate('home')} 
            className="hover:text-[#f3cf98] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#f3cf98] font-semibold">About Us</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3cf98]/10 border border-[#f3cf98]/20 text-[#f3cf98] text-xs font-semibold tracking-wider uppercase mb-4">
          <Award className="w-3.5 h-3.5" />
          The Atelier Heritage &amp; Craftsmanship
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#fff7f2] tracking-tight leading-[1.1] mb-6">
          Crafting Timeless Fits in the Hills of Bilaspur
        </h1>
        <p className="max-w-3xl text-[#d1b8b8] text-base sm:text-lg leading-relaxed">
          {BUSINESS_NAME} is dedicated to ladies fashion, bridal craftsmanship, and precision tailoring. Located {LANDMARK_NOTE}, we bridge authentic Himachali traditions with modern haute-couture silhouettes.
        </p>
      </div>

      {/* Real Workshop Photo Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden border border-[#f3cf98]/30 shadow-2xl group">
          <img 
            src={getAssetUrl(REAL_ASSETS.realWorkshop1)} 
            alt="Master tailor cutting fabric and stitching designer bridal blouses at Santosh Boutique Fatoh Ghumarwin Bilaspur Himachal Pradesh"
            className="w-full h-80 sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f3cf98] font-bold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Real Workshop &amp; Studio Floor</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Every Stitch Guided by Master Hands
            </h3>
            <p className="text-xs sm:text-sm text-[#d1b8b8] max-w-2xl">
              From individual pattern drafting to hand-finished basting trials, our dedicated tailoring desk at Fatoh ensures zero puckering and a custom silhouette crafted exclusively for you.
            </p>
          </div>
        </div>
      </div>

      {/* Story & Philosophy Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-[#d1b8b8] text-sm sm:text-base leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#fff7f2]">
              "Create • Stitch • Empower" — Our Guiding Promise
            </h2>
            <p>
              Founded with the vision that every woman deserves clothing cut specifically to her unique body proportions, {BUSINESS_NAME} rejected the concept of one-size-fits-all fast fashion. Whether you are dressing for a festive wedding in Bilaspur, an office event, or daily comfort, our atelier ensures seamless elegance and comfort.
            </p>
            <p>
              Over the last decade and a half, we have measured, cut, and stitched thousands of bridal lehengas, Patiala salwars, and architectural blouses for clients across Fatoh, Ghumarwin, Bilaspur, Hamirpur, and Himachal Pradesh.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl liquid-glass border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#f3cf98] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#fff7f2] text-sm">18-Point Custom Cut</h3>
                  <p className="text-xs text-[#d1b8b8] mt-0.5">Every garment is drafted manually on individual pattern sheets.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl liquid-glass border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#f3cf98] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#fff7f2] text-sm">Basting Trial Guarantee</h3>
                  <p className="text-xs text-[#d1b8b8] mt-0.5">We conduct fitting checkups to guarantee zero tightness or puckering.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-8 liquid-glass border border-[#f3cf98]/30 shadow-2xl bg-gradient-to-b from-[#8a1c32]/30 via-transparent to-[#120407]">
              <div className="w-12 h-12 rounded-2xl bg-[#f3cf98] text-[#120407] flex items-center justify-center font-bold text-xl mb-6 shadow-lg">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-[#fff7f2] mb-3">
                At A Glance
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-[#d1b8b8]">
                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#f3cf98] font-medium">Boutique Head</span>
                  <span className="text-[#fff7f2] font-semibold">Master Santosh</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#f3cf98] font-medium">Experience</span>
                  <span className="text-[#fff7f2] font-semibold">15+ Years Active Crafting</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#f3cf98] font-medium">Core Speciality</span>
                  <span className="text-[#fff7f2] font-semibold">Bridal Blouses &amp; Patiala Suits</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#f3cf98] font-medium">Turnaround</span>
                  <span className="text-[#fff7f2] font-semibold">24h Alterations • 3-5 Days Suits</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#f3cf98] font-medium">Exact Landmark</span>
                  <span className="text-[#fff7f2] font-semibold text-right text-xs">near Baba Balak Nath Temple, Fatoh</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#f3cf98] font-medium">Customer Rating</span>
                  <span className="text-[#fbbf24] font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#fbbf24]" /> 4.9 / 5.0 on Google
                  </span>
                </li>
              </ul>

              <div className="space-y-2.5 mt-6">
                <button
                  onClick={openWhatsApp}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat Directly on WhatsApp</span>
                </button>

                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-[#fbbf24] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#fbbf24]/20 transition-all"
                >
                  <Star className="w-3.5 h-3.5 fill-[#fbbf24]" />
                  <span>View &amp; Write Google Reviews</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AEO / Answer Engine Optimization FAQ Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#f3cf98] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Direct Answers & FAQs
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#fff7f2]">
            Frequently Asked Questions About Our Studio
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl liquid-glass border border-white/10 hover:border-[#f3cf98]/40 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-bold text-[#fff7f2] mb-2 flex items-start gap-2.5">
                <span className="text-[#f3cf98]">Q.</span>
                <span>{item.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed pl-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA to Visit or Call */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#8a1c32]/40 via-[#1a080e] to-[#8a1c32]/20 border border-[#f3cf98]/30 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#fff7f2] mb-3">
            Ready to Experience the Perfect Custom Fit?
          </h2>
          <p className="text-xs sm:text-base text-[#d1b8b8] max-w-xl mx-auto mb-6">
            Visit our boutique near Baba Balak Nath Temple, Fatoh, Ghumarwin, Himachal Pradesh 174021, or message us on WhatsApp with your fabric details.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openWhatsApp}
              className="px-6 py-3 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-[#20ba59] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book Fitting on WhatsApp</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-6 py-3 rounded-full liquid-glass text-white text-xs sm:text-sm font-semibold border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#d85c72]" />
              <span>View Location &amp; Maps</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('review')}
              className="px-6 py-3 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 text-[#fbbf24] text-xs sm:text-sm font-semibold hover:bg-[#fbbf24]/30 transition-all flex items-center gap-2"
            >
              <Star className="w-4 h-4 fill-[#fbbf24]" />
              <span>Rate Us on Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
