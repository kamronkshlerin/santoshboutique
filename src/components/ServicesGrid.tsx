import React from 'react';
import { Sparkles, Clock, MessageCircle, ArrowUpRight, Check, Zap } from 'lucide-react';
import { ServiceItem } from '../types';
import { ASSETS } from '../constants';
import { useBloggerConfig } from '../config';

export const ServicesGrid: React.FC = () => {
  const config = useBloggerConfig();

  const services: ServiceItem[] = [
    {
      id: 'lehenga',
      title: 'Lehenga & Party Wear',
      hindiTitle: 'लहंगा एवं पार्टी वियर',
      iconName: 'Sparkles',
      tagline: 'Bridal Lehengas, Reception Gowns & Heavy Festive Sets',
      description: 'Complete bridal trousseau and festival wear stitching. Includes high-volume can-can attachment, heavy 16-kalidar stitching, padded designer blouse setting, and exquisite dupatta border work.',
      startingPrice: config.priceLehenga,
      turnaround: '4 - 7 Days',
      popularCuts: ['Full Flair Can-can', '16-Kalidar Gown', 'Crop Top & Skirt', 'Pre-Draped Saree', 'Velvet Bridal Set'],
      image: ASSETS.lehenga,
    },
    {
      id: 'alteration',
      title: 'Alteration Services',
      hindiTitle: 'अल्टरेशन एवं रिपेयर',
      iconName: 'Zap',
      tagline: 'Precision 24h Fitting For Any Garment',
      description: 'Bought readymade online? Bring it in for precision waist tapering, bust reshaping, sleeve shortening, and zipper renewal.',
      startingPrice: config.priceAlteration,
      turnaround: 'Same Day / 24 Hours',
      popularCuts: ['Waist Tapering', 'Bust Resizing', 'Length Alteration', 'Shoulder Fit', 'Zip Replacement'],
      image: ASSETS.hero,
    },
    {
      id: 'suit',
      title: 'Suit & Kurti Stitching',
      hindiTitle: 'सूट सिलाई',
      iconName: 'Scissors',
      tagline: 'Traditional Punjabi, Salwar, Pant & Anarkali Suits',
      description: 'Flawlessly tailored suits shaped to your personal silhouette. From classic Punjabi Patiala suits to elegant straight-cut office pants and festive Anarkalis.',
      startingPrice: config.priceSuit,
      turnaround: '2 - 3 Days',
      popularCuts: ['Patiala Salwar', 'Straight Pants', 'Princess Anarkali', 'A-Line Kurti', 'Sharara Set'],
      image: ASSETS.suit,
    },
    {
      id: 'blouse',
      title: 'Designer Blouse',
      hindiTitle: 'डिज़ाइनर ब्लाउज़',
      iconName: 'Sparkles',
      tagline: 'Bridal, Princess Cut, Deep Back & Handwork',
      description: 'Expertly structured blouses crafted for non-slip shoulders and absolute comfort. Customizable with padded cups, sweetheart necklines, handcrafted dori, and pearl latkans.',
      startingPrice: config.priceBlouse,
      turnaround: '2 - 4 Days',
      popularCuts: ['Princess Cut', 'Deep V-Back with Dori', 'Boat Neck', 'Katori Cut', 'Bridal Padded'],
      image: ASSETS.blouse,
    },
    {
      id: 'custom-tailoring',
      title: 'Custom Tailoring',
      hindiTitle: 'कस्टम सिलाई',
      iconName: 'Scissors',
      tagline: 'Bring Your Pinterest / Instagram Design to Life',
      description: 'Got a screenshot from Instagram or Pinterest? Bring your dream dress concept. We provide expert fabric yardage estimation, pattern grading, and bespoke boutique execution.',
      startingPrice: 'Custom Estimate',
      turnaround: 'Based on Design',
      popularCuts: ['Co-ord Sets', 'Western Fusion Indo', 'Jackets & Capes', 'Draped Gowns', 'Mother-Daughter Matching'],
      image: ASSETS.hero,
    },
  ];

  const handleInquiry = (service: ServiceItem) => {
    const message = encodeURIComponent(
      `Namaste ${config.boutiqueName}! I would like to book a consultation for *${service.title}* (${service.startingPrice}). Please let me know available slots.`
    );
    window.open(`https://wa.me/${config.whatsapp}?text=${message}`, '_blank');
  };

  const featuredService = services[0]; // Lehenga
  const alterationService = services[1]; // Alteration
  const regularServices = services.slice(2); // Suit, Blouse, Custom

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#f3cf98]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Stitching Services</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#fff7f2] tracking-tight leading-tight mb-4">
            Master Craftsmanship for <span className="italic gold-gradient-text">Every Occasion</span>
          </h2>

          <p className="text-sm sm:text-base text-[#d1b8b8] font-light">
            Every stitch is placed with precision, double-locked for durability, and shaped to celebrate your personal silhouette.
          </p>
        </div>

        {/* Bento Grid Architecture: Perfectly Balanced 3-Column System */}
        <div className="space-y-6 sm:space-y-8">
          {/* Row 1: Featured 2-Column Wide Spotlight + 1-Column Express Alteration */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Spotlight Card: Lehenga & Party Wear (Span 2 cols on desktop) */}
            <div className="lg:col-span-2 liquid-glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row group">
              <div className="relative md:w-5/12 h-64 md:h-auto overflow-hidden shrink-0">
                <img
                  src={featuredService.image}
                  alt={featuredService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a080e] via-[#1a080e]/40 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#120407]/85 backdrop-blur-md border border-[#f3cf98]/30 text-xs font-bold text-[#f3cf98] shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#f3cf98]" />
                    <span>Featured Bridal Atelier</span>
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:w-7/12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#fff7f2]">
                      {featuredService.title}
                    </h3>
                    <span className="font-hindi text-sm text-[#f3cf98]/90 font-medium">
                      {featuredService.hindiTitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#f3cf98] font-medium tracking-wide mb-3">
                    {featuredService.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed mb-5">
                    {featuredService.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-[11px] font-semibold text-[#fff7f2]/70 uppercase tracking-wider">
                      Includes:
                    </span>
                    {featuredService.popularCuts.map((cut) => (
                      <span
                        key={cut}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#fff7f2]/90 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-[#25D366]" />
                        <span>{cut}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-base font-bold text-[#f3cf98]">
                      {featuredService.startingPrice}
                    </span>
                    <span className="text-xs text-[#d1b8b8] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#d85c72]" />
                      {featuredService.turnaround}
                    </span>
                  </div>

                  <button
                    onClick={() => handleInquiry(featuredService)}
                    className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-[#d85c72] to-[#8a1c32] hover:brightness-110 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Inquire Bridal Booking</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Express Alteration Services (Span 1 col) */}
            <div className="liquid-glass-card rounded-3xl overflow-hidden flex flex-col justify-between group">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={alterationService.image}
                  alt={alterationService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a080e] via-[#1a080e]/40 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#10b981]/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-white" />
                    <span>Express 24h</span>
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#120407]/80 backdrop-blur-md border border-[#f3cf98]/30 text-xs font-bold text-[#f3cf98]">
                    {alterationService.startingPrice}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#fff7f2]">
                      {alterationService.title}
                    </h3>
                    <span className="font-hindi text-xs text-[#f3cf98]/80 font-medium">
                      {alterationService.hindiTitle}
                    </span>
                  </div>
                  <p className="text-xs text-[#f3cf98] font-medium tracking-wide mt-0.5">
                    {alterationService.tagline}
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed mb-4">
                  {alterationService.description}
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-1.5">
                    {alterationService.popularCuts.map((cut) => (
                      <span
                        key={cut}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#fff7f2]/85"
                      >
                        {cut}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleInquiry(alterationService)}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/15 hover:border-[#25D366]/50 text-xs sm:text-sm font-semibold text-[#fff7f2] flex items-center justify-center gap-2 transition-all group/btn active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Book Quick Alteration</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Balanced 3-Card Layout (Suit Stitching, Designer Blouse, Custom Tailoring) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {regularServices.map((service) => (
              <div
                key={service.id}
                className="liquid-glass-card rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                {/* Card Image Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a080e] via-[#1a080e]/30 to-transparent" />

                  {/* Price & Turnaround Tags */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#120407]/80 backdrop-blur-md border border-[#f3cf98]/30 text-xs font-bold text-[#f3cf98]">
                      {service.startingPrice}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120407]/80 backdrop-blur-md border border-white/10 text-xs text-[#fff7f2]">
                    <Clock className="w-3 h-3 text-[#d85c72]" />
                    <span>{service.turnaround}</span>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-2xl font-bold text-[#fff7f2]">
                        {service.title}
                      </h3>
                      <span className="font-hindi text-sm text-[#f3cf98]/80 font-medium">
                        {service.hindiTitle}
                      </span>
                    </div>
                    <p className="text-xs text-[#f3cf98] font-medium tracking-wide mt-0.5">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-[10px] font-semibold text-[#fff7f2]/70 uppercase tracking-wider mb-2">
                      Popular Styles:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.popularCuts.map((cut) => (
                        <span
                          key={cut}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#fff7f2]/85"
                        >
                          {cut}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleInquiry(service)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d85c72]/30 via-[#b53c52]/20 to-transparent hover:from-[#d85c72] hover:to-[#8a1c32] border border-[#d85c72]/40 hover:border-transparent text-xs sm:text-sm font-semibold text-[#fff7f2] flex items-center justify-center gap-2 transition-all group/btn shadow-md active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366] group-hover/btn:text-white transition-colors" />
                    <span>Inquire on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
