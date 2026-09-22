import React, { useEffect } from 'react';
import { 
  Tag, 
  MessageCircle
} from 'lucide-react';
import { useBloggerConfig } from '../config';

interface PricingPageProps {
  onNavigate?: (page: any) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const config = useBloggerConfig();

  useEffect(() => {
    document.title = "Stitching Prices & Tailoring Rate Card | Santosh Boutique Bilaspur";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openWhatsApp = (service: string) => {
    const text = encodeURIComponent(
      `Namaste ${config.boutiqueName}! I checked your online price card for "${service}" and want to get a final quotation.`
    );
    window.open(`https://wa.me/${config.whatsapp}?text=${text}`, '_blank');
  };

  const pricingCategories = [
    {
      title: '👗 Suits, Kurtis & Salwar Sets',
      startingPrice: config.priceSuit,
      badge: 'Most Popular in Bilaspur',
      items: [
        { name: 'Basic Kurti (Without Lining)', price: '₹250 - ₹350' },
        { name: 'Standard Suit + Simple Salwar / Pant', price: '₹350 - ₹450' },
        { name: 'Heavy Punjabi Patiala Suit (Full Pleated)', price: '₹550 - ₹750' },
        { name: 'Flared Kalidar Anarkali (With Lining)', price: '₹750 - ₹1,100' },
        { name: 'Sharara / Gharara 3-Piece Designer Set', price: '₹950 - ₹1,400' }
      ]
    },
    {
      title: '🥻 Designer Blouse Stitching',
      startingPrice: config.priceBlouse,
      badge: 'Bridal & Party Wear',
      items: [
        { name: 'Classic Simple Blouse (With Astra/Lining)', price: '₹350 - ₹450' },
        { name: 'Princess Cut Padded Blouse', price: '₹500 - ₹700' },
        { name: 'Deep Back Cut with Dori & Fabric Latkans', price: '₹600 - ₹850' },
        { name: 'High-Neck Collar / Boat Neck Cutout', price: '₹650 - ₹900' },
        { name: 'Heavy Bridal Handwork Blouse Finishing', price: '₹900 - ₹1,400' }
      ]
    },
    {
      title: '✨ Bridal Lehengas & Gowns',
      startingPrice: config.priceLehenga,
      badge: 'Haute Couture',
      items: [
        { name: 'Simple Festive Umbrella Lehenga Skirt', price: '₹800 - ₹1,200' },
        { name: '16-Kalidar Heavy Flare Bridal Lehenga', price: '₹1,500 - ₹2,500' },
        { name: 'Built-in Stiff Can-can Net Stiffening', price: '+ ₹400 - ₹600' },
        { name: 'Pre-Stitched Saree / Gown Assembly', price: '₹1,200 - ₹1,800' },
        { name: 'Dupatta Heavy Border & Lace Finishing', price: '₹250 - ₹450' }
      ]
    },
    {
      title: '⚡ Express 24h Alteration Lab',
      startingPrice: config.priceAlteration,
      badge: 'Express Service',
      items: [
        { name: 'Suit / Kurti Side Fitting (Bust & Waist)', price: '₹80 - ₹150' },
        { name: 'Pant / Salwar / Kurti Length Shortening', price: '₹70 - ₹120' },
        { name: 'Sleeve Alteration / Armhole Tightening', price: '₹60 - ₹100' },
        { name: 'Concealed Zipper Replacement (Blouse/Dress)', price: '₹100 - ₹180' },
        { name: 'Lehenga Waist & Height Adjustment', price: '₹250 - ₹450' }
      ]
    }
  ];

  const yardageGuide = [
    { garment: 'Simple Straight Kurti', fabricNeeded: '2.00 - 2.25 Meters', tip: 'Medium width fabric (44" panna)' },
    { garment: 'Punjabi Patiala Salwar', fabricNeeded: '3.50 - 4.50 Meters', tip: 'Extra yardage required for deep 32+ pleats' },
    { garment: 'Straight Pant / Trouser', fabricNeeded: '2.00 - 2.25 Meters', tip: 'Comfortable stretch cotton or linen blend' },
    { garment: 'Designer Blouse (Short Sleeve)', fabricNeeded: '0.85 - 1.00 Meter', tip: 'Add 0.25m extra for elbow or full sleeves' },
    { garment: 'Flared Anarkali / Gown', fabricNeeded: '4.50 - 6.00 Meters', tip: 'Flowing fabric like Georgette, Silk, or Crepe' },
    { garment: 'Bridal 16-Kali Lehenga', fabricNeeded: '5.50 - 7.50 Meters', tip: 'Heavy brocade, velvet, or embroidered net' }
  ];

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
          <span className="text-[#f3cf98] font-semibold">Pricing & Rate Card</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3cf98]/10 border border-[#f3cf98]/20 text-[#f3cf98] text-xs font-semibold tracking-wider uppercase mb-4">
          <Tag className="w-3.5 h-3.5" />
          Transparent Atelier Pricing
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#fff7f2] tracking-tight leading-[1.1] mb-6">
          Tailoring Rate Card & Fabric Yardage Guide
        </h1>
        <p className="max-w-3xl text-[#d1b8b8] text-base sm:text-lg leading-relaxed">
          100% transparent pricing with zero hidden charges. Prices vary depending on lining requirement, embroidery intricacy, and customized handwork.
        </p>
      </div>

      {/* 4 Pricing Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pricingCategories.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-3xl liquid-glass p-8 border border-white/10 hover:border-[#f3cf98]/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#f3cf98]/10 border border-[#f3cf98]/25 text-[11px] text-[#f3cf98] font-semibold">
                    {cat.badge}
                  </span>
                  <span className="text-xs text-[#d1b8b8]">
                    Starts at <strong className="text-[#fff7f2] text-sm">{cat.startingPrice}</strong>
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-[#fff7f2] mb-6">
                  {cat.title}
                </h3>

                <ul className="space-y-3.5 text-xs sm:text-sm">
                  {cat.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <span className="text-[#d1b8b8]">{item.name}</span>
                      <strong className="text-[#f3cf98] font-semibold">{item.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => openWhatsApp(cat.title)}
                className="w-full mt-8 py-3 px-4 rounded-xl bg-white/5 hover:bg-[#25D366] hover:text-white border border-white/10 text-[#fff7f2] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Exact Quote on WhatsApp</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Fabric Yardage Buying Guide (How Much Cloth To Buy in Market) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl liquid-glass p-8 sm:p-12 border border-[#f3cf98]/30 shadow-2xl">
          <div className="mb-8">
            <span className="text-xs font-bold text-[#f3cf98] uppercase tracking-widest">
              Fabric Buyer's Cheat-Sheet
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#fff7f2] mt-1 mb-3">
              How Much Fabric (Kapda) Should You Buy?
            </h2>
            <p className="text-xs sm:text-sm text-[#d1b8b8] max-w-2xl">
              Before visiting the cloth market in Bilaspur or buying fabric online, consult our master tailor's official measurement requirements:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-[#d1b8b8]">
              <thead>
                <tr className="border-b border-[#f3cf98]/30 text-[#f3cf98] font-semibold">
                  <th className="py-3 px-4">Garment Silhouette</th>
                  <th className="py-3 px-4">Fabric Yardage Required</th>
                  <th className="py-3 px-4">Master Tailor Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {yardageGuide.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#fff7f2]">{row.garment}</td>
                    <td className="py-3.5 px-4 text-[#f3cf98] font-medium">{row.fabricNeeded}</td>
                    <td className="py-3.5 px-4 text-xs">{row.tip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d1b8b8]">
            <p>
              💡 <strong>Unsure about your fabric length or width?</strong> Send a quick photo of your cloth next to a measuring tape on WhatsApp and our master tailor will confirm instantly.
            </p>
            <button
              onClick={() => openWhatsApp("Fabric Yardage Check")}
              className="shrink-0 px-4 py-2 rounded-xl bg-[#25D366] text-white font-semibold flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Ask Master Tailor</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
