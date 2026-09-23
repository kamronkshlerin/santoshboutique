import React, { useState } from 'react';
import { MessageCircle, X, ZoomIn, Eye, Scissors, MapPin } from 'lucide-react';
import { REAL_ASSETS, BUSINESS_NAME, WHATSAPP_NUMBER } from '../constants';

export interface GalleryItem {
  id: string;
  title: string;
  altText: string;
  category: 'blouse' | 'suit' | 'partywear' | 'craft';
  categoryLabel: string;
  image: string;
  price: string;
  details: string;
  tag: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'blouse-1',
    title: 'Designer Bridal Sweetheart Neck Blouse',
    altText: 'designer bridal blouse stitching Bilaspur Himachal Pradesh Near Baba Balak Nath Temple',
    category: 'blouse',
    categoryLabel: 'Designer Blouse',
    image: REAL_ASSETS.designerBlouse,
    price: '₹400 onwards',
    details: 'Deep sweetheart neck with gold zari piping, custom padded cups, and handcrafted dori latkans.',
    tag: 'Bridal Pick'
  },
  {
    id: 'suit-1',
    title: 'Custom Ladies Punjabi Partywear Suit',
    altText: 'ladies suit stitching tailor ghumarwin bilaspur himachal pradesh',
    category: 'suit',
    categoryLabel: 'Suit Stitching',
    image: REAL_ASSETS.ladiesSuit,
    price: '₹350 onwards',
    details: 'Traditional Patiala cut salwar with golden neckline lace, tailored for comfortable festive movement.',
    tag: 'Best Seller'
  },
  {
    id: 'sharara-1',
    title: 'Designer Sharara & Short Kurti Ensemble',
    altText: 'designer sharara kurti stitching bilaspur ghumarwin fatoh',
    category: 'partywear',
    categoryLabel: 'Partywear & Sharara',
    image: REAL_ASSETS.shararaKurti,
    price: '₹750 onwards',
    details: 'Double flare tiered sharara with customized short kurti and matching lace borders for sangeet & mehendi.',
    tag: 'Trending Style'
  },
  {
    id: 'party-1',
    title: 'Bespoke Festive Partywear Lehenga & Choli',
    altText: 'best boutique for partywear stitching bilaspur himachal pradesh',
    category: 'partywear',
    categoryLabel: 'Partywear & Sharara',
    image: REAL_ASSETS.partywear,
    price: '₹1200 onwards',
    details: 'Multi-kalidar royal flare lehenga with custom blouse cut and dupatta finishing.',
    tag: 'Festive Luxury'
  },
  {
    id: 'tailor-1',
    title: 'Master Tailor Silhouette & Silhouette Fitting',
    altText: 'custom ladies tailor perfect fit ghumarwin santosh boutique bilaspur',
    category: 'craft',
    categoryLabel: 'Master Tailoring',
    image: REAL_ASSETS.masterTailorFit,
    price: 'Fitting Guaranteed',
    details: 'Masterji personal measurement session ensuring shoulder posture and bustline align perfectly.',
    tag: '100% Fit Trial'
  },
  {
    id: 'cotton-1',
    title: 'Daily Wear Fine Cotton Suit Tailoring',
    altText: 'daily wear cotton suit tailoring ghumarwin bilaspur 174021',
    category: 'suit',
    categoryLabel: 'Suit Stitching',
    image: REAL_ASSETS.cottonSuit,
    price: '₹350 onwards',
    details: 'Breathable pure cotton suit stitching with straight pants and clean thread finish.',
    tag: 'Daily Comfort'
  },
  {
    id: 'craft-1',
    title: 'Atelier Workshop Craftsmanship Session',
    altText: 'santosh boutique workshop tailoring process fatoh ghumarwin bilaspur',
    category: 'craft',
    categoryLabel: 'Master Tailoring',
    image: REAL_ASSETS.workshopStudio,
    price: 'Hand Crafted',
    details: 'Inside look at our daily stitching process with industrial precision machines and master craftsmanship.',
    tag: 'Workshop View'
  }
];

export const LookbookGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeModal, setActiveModal] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const handleInquireSpecific = (item: GalleryItem) => {
    const text = encodeURIComponent(
      `Namaste ${BUSINESS_NAME}! I loved this stitching work from your gallery: *"${item.title}"*. Can you tell me the stitching timeline and quote?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#120407]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#f3cf98]/20">
            <Scissors className="w-3.5 h-3.5 text-[#d85c72]" />
            <span>100% Real Studio Craftsmanship</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#fff7f2] tracking-tight leading-tight mb-4">
            Our Work <span className="italic gold-gradient-text">&amp; Atelier Gallery</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed max-w-2xl mx-auto">
            Real photos from our studio in Fatoh, Ghumarwin — bridal blouses, partywear suits, shararas, master tailor fitting, aur boutique workshop ki jhalak. Click any photo to zoom.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 text-xs">
          {[
            { id: 'all', label: 'All Real Photos' },
            { id: 'blouse', label: 'Designer Blouses' },
            { id: 'suit', label: 'Suit Stitching' },
            { id: 'partywear', label: 'Sharara & Partywear' },
            { id: 'craft', label: 'Master Tailor Craft' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl transition-all font-semibold shrink-0 ${
                activeCategory === tab.id
                  ? 'bg-[#f3cf98] text-[#120407] shadow-lg shadow-[#f3cf98]/20'
                  : 'liquid-glass text-[#d1b8b8] hover:text-white hover:border-[#f3cf98]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photo Grid with Lightbox Trigger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveModal(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden liquid-glass border border-white/10 hover:border-[#f3cf98]/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Card Header Strip (Keeps image completely unobstructed) */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#18070d] border-b border-white/5 text-[10px]">
                <span className="font-semibold text-[#f3cf98] uppercase tracking-wider">{item.categoryLabel}</span>
                <span className="font-semibold text-white/80 px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                  {item.tag}
                </span>
              </div>

              {/* Image Container - Zero Badges Over Photo */}
              <div className="relative aspect-square overflow-hidden bg-black/60 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.altText}
                  className="w-full h-full object-contain sm:object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover Quick Zoom Action */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="p-2.5 rounded-full bg-[#f3cf98] text-[#120407] transform translate-y-2 group-hover:translate-y-0 transition-transform shadow-2xl flex items-center gap-1.5 text-xs font-bold">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View Full Photo</span>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#f3cf98] mb-1">
                    <span>{item.categoryLabel}</span>
                    <span className="font-bold">{item.price}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#fff7f2] leading-snug group-hover:text-[#f3cf98] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#d1b8b8] line-clamp-2 leading-relaxed">
                    {item.details}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-[#d85c72] font-medium flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </span>
                  <span className="text-white/40 group-hover:text-white transition-colors">
                    Inquire →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Guarantee Banner */}
        <div className="mt-12 p-6 rounded-3xl liquid-glass border border-[#f3cf98]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#d85c72]/15 text-[#d85c72] flex items-center justify-center shrink-0">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#fff7f2]">
                Have a Custom Design Picture on your phone?
              </h4>
              <p className="text-xs text-[#d1b8b8]">
                Instagram, Pinterest ya Bollywood outfit ka photo dikhayein — Masterji exact replica stitching provide karenge!
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Namaste Santosh Boutique! Maine ek outfit design dekha hai jiska photo WhatsApp par bhejna chahta/chahti hoon.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all flex items-center gap-2 shrink-0 shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send Photo on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* LIGHTBOX CLICK-TO-ZOOM FULLSCREEN MODAL */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden liquid-glass border border-[#f3cf98]/40 shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-white hover:text-[#f3cf98] flex items-center justify-center border border-white/20 transition-all"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Large Image Zoom View */}
            <div className="md:w-7/12 bg-black/60 relative flex items-center justify-center p-2 sm:p-4">
              <img
                src={activeModal.image}
                alt={activeModal.altText}
                className="max-h-[65vh] md:max-h-[550px] w-auto max-w-full object-contain rounded-2xl"
              />
              <span className="absolute bottom-4 left-4 text-[10px] px-3 py-1 rounded-full bg-black/80 text-[#f3cf98] border border-white/20 font-bold backdrop-blur-md">
                100% Real Studio Craft
              </span>
            </div>

            {/* Right Column: Tailoring Spec & WhatsApp Direct Action */}
            <div className="md:w-5/12 p-6 sm:p-8 flex flex-col justify-between bg-[#150409]">
              <div>
                <span className="text-[11px] font-bold text-[#f3cf98] uppercase tracking-wider block mb-1">
                  {activeModal.categoryLabel}
                </span>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#fff7f2] mb-3 leading-snug">
                  {activeModal.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-[#f3cf98]/20 text-[#f3cf98] font-bold">
                    {activeModal.price}
                  </span>
                  <span className="text-xs text-[#25D366] font-medium flex items-center gap-1">
                    ⚡ Trial Alteration Included
                  </span>
                </div>

                <p className="text-xs text-[#d1b8b8] leading-relaxed mb-6">
                  {activeModal.details}
                </p>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-[#d1b8b8] space-y-1.5 mb-6">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#d85c72]" />
                    <span>Studio: Fatoh, Ghumarwin, Bilaspur</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-[#f3cf98]" />
                    <span>Custom measurements &amp; fabric consultation</span>
                  </p>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleInquireSpecific(activeModal)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Inquire About This Design</span>
                </button>
                <p className="text-[10px] text-center text-white/40 mt-2">
                  Opens WhatsApp with design title pre-filled
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
