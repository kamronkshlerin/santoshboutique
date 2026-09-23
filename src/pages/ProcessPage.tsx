import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  Ruler, 
  MessageCircle
} from 'lucide-react';
import { useBloggerConfig } from '../config';

interface ProcessPageProps {
  onNavigate?: (page: any) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const config = useBloggerConfig();

  useEffect(() => {
    document.title = "Our Tailoring Process & Quality Guarantee | Santosh Boutique Bilaspur";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste ${config.boutiqueName}! I would like to book a measurement consultation according to your 6-step process.`
    );
    window.open(`https://wa.me/${config.whatsapp}?text=${text}`, '_blank');
  };

  const steps = [
    {
      num: '01',
      title: 'Consultation & Fabric Inspection',
      subtitle: 'Understanding your dream silhouette & testing fabric grain',
      desc: 'You bring your unstitched suit fabric, saree, or dress material to our studio Near Baba Balak Nath Temple in Sarti (or send photos on WhatsApp). We inspect the fabric fall, check for stretch, and discuss neckline, sleeve, and trouser preferences.'
    },
    {
      num: '02',
      title: '18-Point Custom Body Measurement',
      subtitle: 'Zero generic standard sizing — tailored solely for your shape',
      desc: 'Our master tailor takes 18 anatomical measurements including bust apex, underbust contour, shoulder slope, armhole depth, waist-to-hip curve, and custom sleeve opening so your garment never pinches or gaps.'
    },
    {
      num: '03',
      title: 'Individual Pattern Drafting',
      subtitle: 'Manual cut ensuring symmetrical balance & clean posture lines',
      desc: 'Unlike ready-made factory mass-cutting, each dress is hand-chalked and cut individually onto the fabric with generous seam margins (up to 2 inches) allowing future loosening if your measurements change.'
    },
    {
      num: '04',
      title: 'Structural Interlining & Padded Assembly',
      subtitle: 'Premium canvas, cups, and reinforced dori anchoring',
      desc: 'For bridal blouses and lehengas, we install high-grade padded cups, horsehair canvas for neckline stability, concealed Japanese zippers, and double-stitched dori tassels that never snap.'
    },
    {
      num: '05',
      title: 'Trial Fitting Session (Optional / Bridal)',
      subtitle: 'Basting check to guarantee flawless comfort before final finish',
      desc: 'For intricate bridal wear or first-time patrons, we conduct a quick baste trial fitting to ensure the silhouette contours around your body with zero wrinkles or pulling.'
    },
    {
      num: '06',
      title: 'Hand Finishing, Steam Press & 7-Day Guarantee',
      subtitle: 'Triple-check quality inspection and free post-delivery adjustment',
      desc: 'Every garment receives fine hand-hemming (turpai), interlock edging, and high-temperature steam shaping. We back every outfit with a 7-day free adjustment guarantee.'
    }
  ];

  return (
    <div className="pt-28 pb-20 animate-fadeIn">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <nav className="flex items-center gap-2 text-xs text-[#d1b8b8] mb-4">
          <button 
            onClick={() => onNavigate && onNavigate('home')} 
            className="hover:text-[#f3cf98] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#f3cf98] font-semibold">Our Process</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3cf98]/10 border border-[#f3cf98]/20 text-[#f3cf98] text-xs font-semibold tracking-wider uppercase mb-4">
          <Ruler className="w-3.5 h-3.5" />
          The Master Tailoring Standard
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#fff7f2] tracking-tight leading-[1.1] mb-6">
          How Perfection is Stitched Step-by-Step
        </h1>
        <p className="max-w-3xl text-[#d1b8b8] text-base sm:text-lg leading-relaxed">
          From the moment you walk into our Sarti studio with raw unstitched fabric to your final steam-pressed trial fitting. Discover why clients across Bilaspur trust Santosh Boutique for their most treasured festive outfits.
        </p>
      </div>

      {/* 6 Step Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div 
              key={idx}
              className="relative rounded-3xl liquid-glass p-8 border border-white/10 hover:border-[#f3cf98]/50 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-[#f3cf98]">
                    {s.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#f3cf98]/50 group-hover:scale-150 transition-transform" />
                </div>

                <h3 className="text-xl font-display font-bold text-[#fff7f2] mb-1.5 group-hover:text-[#f3cf98] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs font-semibold text-[#f3cf98] uppercase tracking-wider mb-4">
                  {s.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs text-[#f3cf98]">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span>Verified Quality Gate</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Turnaround Guarantees Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl liquid-glass p-8 sm:p-12 border border-[#f3cf98]/30 shadow-2xl cta-experience-card">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#fff7f2] mb-3">
              Delivery Turnaround Timelines in Bilaspur
            </h2>
            <p className="text-xs sm:text-sm text-[#d1b8b8]">
              We respect your event dates. Whether it's an emergency wedding alteration or a planned bridal trousseau:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
              <div className="text-3xl font-display font-bold text-[#f3cf98] mb-1">24 - 48 Hours</div>
              <h3 className="text-sm font-bold text-[#fff7f2] mb-1">Express Alteration</h3>
              <p className="text-xs text-[#d1b8b8]">Waist reduction, bust fitting, length shortening, zipper fixes.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
              <div className="text-3xl font-display font-bold text-[#f3cf98] mb-1">3 - 5 Days</div>
              <h3 className="text-sm font-bold text-[#fff7f2] mb-1">Custom Suits & Blouses</h3>
              <p className="text-xs text-[#d1b8b8]">Patiala salwars, Anarkalis, princess cut blouses, party kurtis.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
              <div className="text-3xl font-display font-bold text-[#f3cf98] mb-1">7 - 10 Days</div>
              <h3 className="text-sm font-bold text-[#fff7f2] mb-1">Bridal Lehengas & Gowns</h3>
              <p className="text-xs text-[#d1b8b8]">Can-can stiffening, 16-kali assembly, trial basting, and hand latkans.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={openWhatsApp}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-sm shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Discuss Event Dates on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
