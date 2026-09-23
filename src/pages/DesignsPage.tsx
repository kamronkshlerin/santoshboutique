import React, { useEffect, useState } from 'react';
import { 
  MessageCircle, 
  Camera 
} from 'lucide-react';
import { useBloggerConfig } from '../config';

interface DesignsPageProps {
  onNavigate?: (page: any) => void;
}

export const DesignsPage: React.FC<DesignsPageProps> = ({ onNavigate }) => {
  const config = useBloggerConfig();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'blouses' | 'suits' | 'lehengas' | 'fabrics'>('all');

  useEffect(() => {
    document.title = "Designer Outfits & Silhouettes Catalog | Santosh Boutique Bilaspur";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openWhatsAppDesign = (designName: string) => {
    const text = encodeURIComponent(
      `Namaste ${config.boutiqueName}! I saw the "${designName}" on your website catalog and want to get it stitched with my fabric.`
    );
    window.open(`https://wa.me/${config.whatsapp}?text=${text}`, '_blank');
  };

  const categories = [
    { id: 'all', label: 'All Catalog' },
    { id: 'blouses', label: '🥻 Designer Blouse Cuts' },
    { id: 'suits', label: '👗 Punjabi & Anarkali Suits' },
    { id: 'lehengas', label: '✨ Bridal Lehengas & Gowns' },
    { id: 'fabrics', label: '🧵 Fabric & Yardage Guide' }
  ];

  const designItems = [
    {
      category: 'blouses',
      title: 'Princess Cut Bridal Padded Blouse',
      tags: ['Heavy Zari', 'Padded Cups', 'Seamless Dartless Front'],
      desc: 'Engineered with double-interlining padding and architectural princess seam darts. Flattering fit with no gaping shoulders.',
      specs: 'Best with: Silk, Brocade, Raw Silk. Fabric needed: 1.0 - 1.25 meters.'
    },
    {
      category: 'blouses',
      title: 'Deep Back U-Cut with Handcrafted Latkans',
      tags: ['Dori Latkans', 'Deep Back', 'Festive Occasion'],
      desc: 'Features reinforced side boning to support a deep back cut without strap slip, adorned with matching fabric tassel latkans.',
      specs: 'Best with: Velvet, Chanderi, Georgette. Fabric needed: 0.85 - 1.0 meter.'
    },
    {
      category: 'blouses',
      title: 'High-Neck Cutout & Sweetheart Front',
      tags: ['Modern Chic', 'Sweetheart', 'Keyhole Back'],
      desc: 'Royal collar neckline in front paired with an elegant back teardrop keyhole. Ideal for wedding receptions and saree cocktail events.',
      specs: 'Best with: Net embroidery, Organza, Tissue silk.'
    },
    {
      category: 'suits',
      title: 'Heavy Punjabi Patiala Salwar (Full Ghair)',
      tags: ['32+ Pleats', 'Authentic Fall', 'Traditional हिमाचल'],
      desc: 'True Punjabi cut with maximum pleated gathering at the belt, producing a lavish balloon flare that tapers into stiff embroidered ponchas.',
      specs: 'Salwar Fabric: 3.5 - 4.5 meters. Kurti Fabric: 2.25 meters.'
    },
    {
      category: 'suits',
      title: 'Flared Kalidar Anarkali Suit Set',
      tags: ['16 Kali Flare', 'Empire Waist', 'Festive Silhouette'],
      desc: 'Individually paneled kalis cut at balanced bias angles for a 360-degree dramatic twirl, finished with contrast piping and can-can hem.',
      specs: 'Fabric: 4.5 - 6.0 meters depending on desired flare.'
    },
    {
      category: 'suits',
      title: 'Straight Cigarette Pant & Pakistani Kurti',
      tags: ['Clean Cut', 'Office & Festive', 'Slit Detailing'],
      desc: 'Ankle-length trousers with elasticated back and flat front waistband, paired with a long straight-cut kurti with side organza lace inserts.',
      specs: 'Pant Fabric: 2.0 - 2.25 meters. Kurti: 2.5 meters.'
    },
    {
      category: 'lehengas',
      title: '16-Kalidar Bridal Wedding Lehenga',
      tags: ['Can-can Stiffening', 'Double Canvas', 'Bridal Latkan'],
      desc: 'Complete bridal architecture: heavy buckram canvas belt, built-in multi-layered stiff net can-can, and custom inner lining with pocket.',
      specs: 'Fabric: 5.5 - 7.5 meters. Turnaround: 7-10 days.'
    },
    {
      category: 'lehengas',
      title: 'Pre-Stitched Drape Saree Gown',
      tags: ['Zero-Draping Hassle', 'Modern Fusion', 'Concealed Zip'],
      desc: 'Step in and zip up in 30 seconds. Pleats and pallu are permanently anchored to an inner contour skirt with zero pins required.',
      specs: 'Fabric: Standard 5.5m saree or lightweight georgette/crepe.'
    },
    {
      category: 'fabrics',
      title: 'Fabric Recommendation & Yardage Matrix',
      tags: ['Fabric Guide', 'Meters Calculator', 'Himachal Weather'],
      desc: 'Detailed breakdown of fabric requirements for cold winter weddings in Himachal vs lightweight summer cottons.',
      specs: 'Suits: 4.5-5m combo | Blouses: 1m | Lehengas: 6m+.'
    }
  ];

  const filteredDesigns = selectedCategory === 'all' 
    ? designItems 
    : designItems.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 animate-fadeIn">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <nav className="flex items-center gap-2 text-xs text-[#d1b8b8] mb-4">
          <button 
            onClick={() => onNavigate && onNavigate('home')} 
            className="hover:text-[#f3cf98] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#f3cf98] font-semibold">Designs & Silhouettes</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3cf98]/10 border border-[#f3cf98]/20 text-[#f3cf98] text-xs font-semibold tracking-wider uppercase mb-4">
          <Camera className="w-3.5 h-3.5" />
          Master Design Portfolio
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#fff7f2] tracking-tight leading-[1.1] mb-6">
          Bespoke Silhouettes & Tailoring Catalog
        </h1>
        <p className="max-w-3xl text-[#d1b8b8] text-base sm:text-lg leading-relaxed">
          From traditional Punjabi Patialas to high-fashion bridal blouses and Pinterest-inspired custom ensembles. Explore cuts, fabric measurements, and request a WhatsApp quote.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2.5 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#f3cf98] text-[#120407] shadow-lg shadow-[#f3cf98]/20 scale-105'
                  : 'liquid-glass text-[#fff7f2]/80 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Design Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl liquid-glass p-6 border border-[#f3cf98]/20 hover:border-[#f3cf98]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#f3cf98] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-display font-bold text-[#fff7f2] mb-2.5 group-hover:text-[#f3cf98] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-[11px] text-[#f3cf98] mb-6">
                  {item.specs}
                </div>
              </div>

              <button
                onClick={() => openWhatsAppDesign(item.title)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Recreate This Design</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pinterest & Instagram Recreation Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-8 sm:p-12 rounded-3xl liquid-glass border border-[#f3cf98]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 recreation-banner-card">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-[#f3cf98] uppercase tracking-widest banner-eyebrow">
              Have a Photo or Screenshot?
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#fff7f2] banner-heading">
              Instagram &amp; Pinterest Recreation Studio
            </h2>
            <p className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed banner-desc">
              Found a celebrity lehenga or an influencer suit design online? Send the screenshot to our WhatsApp. Our master tailor analyzes the stitching pattern, estimates fabric yardage, and stitches the exact fit for you in Bilaspur.
            </p>
          </div>

          <button
            onClick={() => openWhatsAppDesign("Instagram / Pinterest Photo Recreation")}
            className="shrink-0 px-8 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-sm font-semibold shadow-xl hover:scale-105 transition-all flex items-center gap-2.5"
          >
            <Camera className="w-5 h-5" />
            <span>Send Photo on WhatsApp</span>
          </button>
        </div>
      </section>
    </div>
  );
};
