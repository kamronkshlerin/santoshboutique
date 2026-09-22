import React, { useState } from 'react';
import { Sparkles, MessageCircle, X, ZoomIn } from 'lucide-react';
import { LookbookItem } from '../types';
import { ASSETS } from '../constants';

const GALLERY_ITEMS: LookbookItem[] = [
  {
    id: '1',
    title: 'Velvet Maroon Bridal Blouse with Pearl Latkans',
    category: 'blouse',
    image: ASSETS.blouse,
    details: 'Heavy zardozi embroidery, sweetheart neck, deep back with handcrafted latkans.',
    tag: 'Bridal Couture'
  },
  {
    id: '2',
    title: 'Emerald Green Silk Punjabi Suit with Gota Lace',
    category: 'suit',
    image: ASSETS.suit,
    details: 'Chiffon border dupatta, Patiala salwar, golden zari collar work.',
    tag: 'Festive Classic'
  },
  {
    id: '3',
    title: 'Crimson Royal Wedding Lehenga with Can-can Flare',
    category: 'lehenga',
    image: ASSETS.lehenga,
    details: '16 Kalidar flare, matching embroidered blouse, hand-stitched bridal border.',
    tag: 'Royal Bridal'
  },
  {
    id: '4',
    title: 'Peach Blossom Anarkali Floor-Length Gown',
    category: 'suit',
    image: ASSETS.hero,
    details: 'Soft georgette with sequins embroidery, princess cut bustline.',
    tag: 'Party Wear'
  }
];

export const LookbookGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeModal, setActiveModal] = useState<LookbookItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const handleInquireSpecific = (item: LookbookItem) => {
    const text = encodeURIComponent(
      `Namaste Santosh Boutique! I really loved this design from your Lookbook: *"${item.title}"*. Can you provide stitching timeline and quote for this?`
    );
    window.open(`https://wa.me/919816000000?text=${text}`, '_blank');
  };

  return (
    <section id="lookbook" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#120407]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#f3cf98]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Lookbook & Showcase</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#fff7f2] tracking-tight leading-tight mb-4">
            Recent Creations From Our <span className="italic gold-gradient-text">Atelier</span>
          </h2>

          <p className="text-sm sm:text-base text-[#d1b8b8] font-light">
            Every garment photographed here is custom designed, hand-measured, and stitched for our valued clients in Bilaspur.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {[
              { id: 'all', label: 'All Collections' },
              { id: 'blouse', label: 'Designer Blouses' },
              { id: 'suit', label: 'Suits & Kurtis' },
              { id: 'lehenga', label: 'Bridal Lehengas' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  activeCategory === tab.id
                    ? 'bg-gradient-to-r from-[#d85c72] to-[#8a1c32] text-white shadow-lg shadow-[#d85c72]/30 scale-105'
                    : 'liquid-glass text-[#d1b8b8] hover:text-[#fff7f2] hover:border-[#f3cf98]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="liquid-glass-card card-spotlight rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between"
              onClick={() => setActiveModal(item)}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120407] via-transparent to-black/20" />

                {/* Tag Badge */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#120407]/80 backdrop-blur-md border border-[#f3cf98]/30 text-[10px] font-bold text-[#f3cf98] uppercase tracking-wider">
                  {item.tag}
                </div>

                {/* Quick Zoom Pill */}
                <div className="absolute bottom-3.5 right-3.5 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 group-hover:text-white group-hover:bg-[#d85c72] transition-colors">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-[#fff7f2] leading-snug group-hover:text-[#f3cf98] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#d1b8b8] line-clamp-2">
                    {item.details}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInquireSpecific(item);
                  }}
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/50 text-xs font-semibold text-[#fff7f2] flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Stitch Similar Outfit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Zoom View */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="liquid-glass max-w-2xl w-full rounded-3xl overflow-hidden border border-[#f3cf98]/30 shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-[#d85c72] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] overflow-hidden">
              <img
                src={activeModal.image}
                alt={activeModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#f3cf98]/20 text-[#f3cf98] text-[11px] font-bold uppercase tracking-wider">
                  {activeModal.tag}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#fff7f2] mb-2">
                {activeModal.title}
              </h3>
              <p className="text-sm text-[#d1b8b8] mb-5">
                {activeModal.details}
              </p>

              <button
                onClick={() => handleInquireSpecific(activeModal)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Inquire About This Design on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
