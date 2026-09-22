import React, { useState } from 'react';
import { MessageCircle, Check, Send, Ruler, ShieldCheck, Clock, Sparkles, Scissors } from 'lucide-react';
import { ConfiguratorState } from '../types';
import { useBloggerConfig } from '../config';
import { MODEL_FITTING_IMG } from '../assets_models';
import { saveBooking } from '../utils/bookingStore';

const STYLE_CUTS: Record<string, string[]> = {
  blouse: [
    'Princess Cut (Padded)',
    'Deep V-Back with Dori & Latkans',
    'Sweetheart Neckline',
    'Boat Neck with Back Cutout',
    'Collar Neck Bridal Blouse',
    'Katori Classic Blouse'
  ],
  suit: [
    'Traditional Punjabi Patiala Suit',
    'Straight Pant & Kurti Set',
    'Flared Kalidar Anarkali',
    'Pakistani Cut Long Kurti',
    'Sharara / Gharara Suit Set',
    'A-Line Daily Cotton Kurti'
  ],
  lehenga: [
    'Bridal Can-can Heavy Flare',
    'Pastel Reception Gown',
    'Modern Crop Top & Skirt',
    'Kalidar Sangeet Lehenga',
    'Pre-Draped Festive Saree'
  ],
  'custom-tailoring': [
    'Pinterest / Instagram Photo Re-creation',
    'Custom Neckline & Silhouette Design',
    'Mother-Daughter Matching Festive Set',
    'Western Fusion Indo-Chic',
    'Designer Cape / Jacket Attachment'
  ],
  alteration: [
    'Waist & Side Fitting (Bust & Torso)',
    'Length Shortening / Hemming',
    'Sleeve Alteration / Armhole Adjust',
    'Zip / Hook / Button Replacement',
    'Neckline Reshaping / Deepening'
  ]
};

export const StyleConfigurator: React.FC = () => {
  const config = useBloggerConfig();

  const outfitOptions: {
    id: string;
    label: string;
    icon: React.ReactNode;
    basePrice: string;
  }[] = [
    { id: 'blouse', label: 'Designer Blouse', icon: <Sparkles className="w-6 h-6 text-[#f3cf98]" />, basePrice: config.priceBlouse },
    { id: 'suit', label: 'Suit & Kurti Set', icon: <Scissors className="w-6 h-6 text-[#d85c72]" />, basePrice: config.priceSuit },
    { id: 'lehenga', label: 'Lehenga & Party Wear', icon: <Sparkles className="w-6 h-6 text-[#f3cf98]" />, basePrice: config.priceLehenga },
    { id: 'custom-tailoring', label: 'Custom Tailoring', icon: <Ruler className="w-6 h-6 text-[#d1b8b8]" />, basePrice: 'Custom Quote' },
    { id: 'alteration', label: 'Express Alteration', icon: <Clock className="w-6 h-6 text-[#f3cf98]" />, basePrice: config.priceAlteration },
  ];

  const [form, setForm] = useState<ConfiguratorState>({
    serviceType: 'blouse',
    styleCut: 'Princess Cut (Padded)',
    fabricStatus: 'I already have my fabric',
    urgency: 'Standard (3-4 Days)',
    eventDate: '',
    customerNote: ''
  });
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleOutfitChange = (outfitId: string) => {
    const defaultCut = STYLE_CUTS[outfitId]?.[0] || '';
    setForm(prev => ({
      ...prev,
      serviceType: outfitId,
      styleCut: defaultCut
    }));
  };

  const getEstimatedPrice = () => {
    const option = outfitOptions.find(o => o.id === form.serviceType);
    return option ? option.basePrice : config.priceSuit;
  };

  const generateWhatsAppMessage = () => {
    const selectedOutfit = outfitOptions.find(o => o.id === form.serviceType)?.label || form.serviceType;
    
    let text = `✨ *${config.boutiqueName} - Custom Stitching Booking* ✨\n`;
    text += `📍 *Studio Location*: ${config.address}\n`;
    text += `-----------------------------------------\n`;
    if (customerName) text += `👤 *Customer Name*: ${customerName}\n`;
    if (customerPhone) text += `📞 *Phone*: ${customerPhone}\n`;
    text += `👗 *Selected Outfit*: ${selectedOutfit}\n`;
    text += `✂️ *Style / Cut*: ${form.styleCut}\n`;
    text += `🧵 *Fabric Status*: ${form.fabricStatus}\n`;
    text += `⏱️ *Timeline Required*: ${form.urgency}\n`;
    if (form.eventDate) {
      text += `📅 *Event / Needed By*: ${form.eventDate}\n`;
    }
    if (form.customerNote) {
      text += `📝 *Special Requirement*: ${form.customerNote}\n`;
    }
    text += `💰 *Quoted Starting*: ${getEstimatedPrice()}\n`;
    text += `-----------------------------------------\n`;
    text += `💬 *Hello Masterji*, I want to discuss measurements and book a slot for this outfit.`;

    return text;
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-save booking into CRM Store & Webhook
    const webhook = typeof window !== 'undefined' ? localStorage.getItem('sb_webhook_url') || '' : '';
    saveBooking({
      customerName: customerName || 'Website Customer',
      customerPhone: customerPhone || 'Direct WhatsApp',
      serviceType: outfitOptions.find(o => o.id === form.serviceType)?.label || form.serviceType,
      styleCut: form.styleCut,
      fabricStatus: form.fabricStatus,
      urgency: form.urgency,
      eventDate: form.eventDate,
      customerNote: form.customerNote,
      estimatedPrice: getEstimatedPrice(),
    }, webhook);

    const payload = generateWhatsAppMessage();
    const url = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(payload)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="configurator" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#150409]">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#f3cf98]/20">
            <Ruler className="w-3.5 h-3.5" />
            <span>Interactive Studio Tool</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#fff7f2] tracking-tight leading-tight mb-4">
            Custom Outfit & <span className="italic gold-gradient-text">Style Builder</span>
          </h2>

          <p className="text-sm sm:text-base text-[#d1b8b8] font-light">
            Select your dream outfit specifications, customize necklines and cuts, and get a tailored quotation directly on WhatsApp.
          </p>
        </div>

        {/* 2-Column Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 liquid-glass p-6 sm:p-8 rounded-3xl border border-[#f3cf98]/25 shadow-2xl">
            <form onSubmit={handleSubmitWhatsApp} className="space-y-6">
              {/* Step 1: Select Outfit Type */}
              <div>
                <label className="block text-xs font-bold text-[#f3cf98] uppercase tracking-wider mb-3">
                  Step 1: Choose Outfit Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {outfitOptions.map((opt) => {
                    const isSelected = form.serviceType === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => handleOutfitChange(opt.id)}
                        className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#d85c72]/30 border-[#f3cf98] shadow-lg shadow-[#d85c72]/20 scale-[1.02]'
                            : 'bg-white/5 border-white/10 hover:border-white/25 text-[#fff7f2]'
                        }`}
                      >
                        <span className="text-2xl mb-1.5">{opt.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-[#fff7f2] leading-tight">
                            {opt.label}
                          </p>
                          <p className="text-[10px] text-[#f3cf98] mt-0.5 font-medium">
                            from {opt.basePrice}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Preferred Neckline / Cut */}
              <div>
                <label className="block text-xs font-bold text-[#f3cf98] uppercase tracking-wider mb-3">
                  Step 2: Choose Neckline or Cut Pattern
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(STYLE_CUTS[form.serviceType] || []).map((cut) => {
                    const isSelected = form.styleCut === cut;
                    return (
                      <button
                        type="button"
                        key={cut}
                        onClick={() => setForm(prev => ({ ...prev, styleCut: cut }))}
                        className={`px-3.5 py-2.5 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#f3cf98]/20 border-[#f3cf98] text-[#fff7f2]'
                            : 'bg-white/5 border-white/10 text-[#d1b8b8] hover:border-white/20'
                        }`}
                      >
                        <span>{cut}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#f3cf98]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Fabric Status & Turnaround */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#f3cf98] uppercase tracking-wider mb-2">
                    Fabric Availability
                  </label>
                  <select
                    value={form.fabricStatus}
                    onChange={(e) => setForm(prev => ({ ...prev, fabricStatus: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120407] border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  >
                    <option value="I already have my fabric">I have my own fabric ready</option>
                    <option value="Need boutique fabric consultation">Need boutique fabric advice</option>
                    <option value="Only need alterations on existing outfit">Need alteration only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#f3cf98] uppercase tracking-wider mb-2">
                    Turnaround Urgency
                  </label>
                  <select
                    value={form.urgency}
                    onChange={(e) => setForm(prev => ({ ...prev, urgency: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120407] border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  >
                    <option value="Standard (3-4 Days)">Standard (3 - 4 Days)</option>
                    <option value="Express 24-48 Hours (+ urgent fee)">⚡ Express (24 - 48 Hours)</option>
                    <option value="Wedding Date Planned">Wedding / Function Date</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Event Date & Custom Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#f3cf98] uppercase tracking-wider mb-2">
                    Target Delivery Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => setForm(prev => ({ ...prev, eventDate: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120407] border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#f3cf98] uppercase tracking-wider mb-2">
                    Special Notes / Specific Requests
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Deep back dori, padding, extra margin..."
                    value={form.customerNote}
                    onChange={(e) => setForm(prev => ({ ...prev, customerNote: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120407] border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Step 5: Customer Details for Booking Record */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-xs font-bold text-[#f3cf98] uppercase tracking-wider mb-2">
                    Aapka Naam (Customer Name)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120407] border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none placeholder:text-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#f3cf98] uppercase tracking-wider mb-2">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98160 XXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120407] border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Send Specifications & Book on WhatsApp</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Real-Time Preview Card */}
          <div className="lg:col-span-5 liquid-glass p-6 sm:p-8 rounded-3xl border border-[#f3cf98]/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d85c72]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-[#f3cf98] font-semibold">
                  Live Quotation Preview
                </p>
                <h3 className="font-display text-xl font-bold text-[#fff7f2]">
                  Your Custom Stitching Summary
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                Live
              </span>
            </div>

            {/* Specification Rows */}
            <div className="space-y-3.5 text-xs sm:text-sm text-[#d1b8b8] mb-6">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span>Selected Outfit:</span>
                <strong className="text-[#fff7f2]">
                  {outfitOptions.find(o => o.id === form.serviceType)?.label}
                </strong>
              </div>

              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span>Neckline / Cut Style:</span>
                <strong className="text-[#f3cf98] text-right">{form.styleCut}</strong>
              </div>

              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span>Fabric Status:</span>
                <span className="text-[#fff7f2] text-right">{form.fabricStatus}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span>Turnaround:</span>
                <span className="text-[#fff7f2] text-right">{form.urgency}</span>
              </div>

              {form.eventDate && (
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Required By:</span>
                  <span className="text-[#f3cf98] text-right">{form.eventDate}</span>
                </div>
              )}

              <div className="flex justify-between py-2 border-t border-[#f3cf98]/20 text-sm">
                <span className="font-semibold text-[#fff7f2]">Estimated Starting Price:</span>
                <span className="font-bold text-[#f3cf98] text-base">{getEstimatedPrice()}*</span>
              </div>
            </div>

            {/* Direct Booking CTA & Perks (Background WhatsApp Payload) */}
            <div className="space-y-4 mb-6">
              <button
                type="button"
                onClick={handleSubmitWhatsApp}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
              >
                <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>Confirm & Send to WhatsApp</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#d1b8b8]">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f3cf98] shrink-0" />
                  <span>No upfront payment</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>Instant Tailor reply</span>
                </div>
              </div>
            </div>

            {/* Studio Guarantee Stamp */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 mb-5">
              <ShieldCheck className="w-6 h-6 text-[#25D366] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#fff7f2]">
                  100% Fit Trial Included
                </p>
                <p className="text-[11px] text-[#d1b8b8]">
                  Free minor adjustments if not completely satisfied with your fitting.
                </p>
              </div>
            </div>

            {/* Structured Atelier 18-Point Fitting Preview Card */}
            <div className="rounded-2xl overflow-hidden border border-[#f3cf98]/25 bg-black/40 p-3.5 flex items-center gap-4">
              <img 
                src={MODEL_FITTING_IMG} 
                alt="Master Tailor 18-Point Custom Fitting Session" 
                className="w-20 h-24 object-cover object-top rounded-xl border border-[#f3cf98]/30 shrink-0" 
              />
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#f3cf98] mb-1">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>18-Point Anatomical Fitting</span>
                </div>
                <p className="text-[11px] text-[#d1b8b8] leading-tight mb-2">
                  Zero armhole gaping, accurate dart placements, and custom shoulder slope drafting.
                </p>
                <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#d85c72]/20 border border-[#d85c72]/40 text-[#f3cf98] font-mono">
                  Boutique Trial Included
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
