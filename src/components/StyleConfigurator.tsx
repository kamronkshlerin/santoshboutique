import React, { useState } from 'react';
import { MessageCircle, Check, Send, Ruler, ShieldCheck, Clock, Sparkles, Scissors, CheckCircle2, Phone, User } from 'lucide-react';
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
    { id: 'blouse', label: 'Designer Blouse', icon: <Sparkles className="w-5 h-5 text-[#f3cf98]" />, basePrice: config.priceBlouse },
    { id: 'suit', label: 'Suit & Kurti Set', icon: <Scissors className="w-5 h-5 text-[#d85c72]" />, basePrice: config.priceSuit },
    { id: 'lehenga', label: 'Bridal Lehenga', icon: <Sparkles className="w-5 h-5 text-[#f3cf98]" />, basePrice: config.priceLehenga },
    { id: 'alteration', label: 'Alteration / Fit', icon: <Clock className="w-5 h-5 text-[#f3cf98]" />, basePrice: config.priceAlteration },
    { id: 'custom-tailoring', label: 'Custom Tailoring', icon: <Ruler className="w-5 h-5 text-[#d1b8b8]" />, basePrice: 'Custom Quote' },
  ];

  const [form, setForm] = useState<ConfiguratorState>({
    serviceType: 'blouse',
    styleCut: 'Princess Cut (Padded)',
    fabricStatus: 'I have my own fabric',
    urgency: 'Standard (3-4 Days)',
    eventDate: '',
    customerNote: ''
  });
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<{ id: string } | null>(null);
  const [inputError, setInputError] = useState('');

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

  const generateWhatsAppMessage = (bookingId: string) => {
    const selectedOutfit = outfitOptions.find(o => o.id === form.serviceType)?.label || form.serviceType;
    
    let text = `✨ *${config.boutiqueName} - Custom Stitching Booking* ✨\n`;
    text += `🆔 *Booking Ref*: ${bookingId}\n`;
    text += `📍 *Studio Location*: ${config.address}\n`;
    text += `-----------------------------------------\n`;
    text += `👤 *Customer Name*: ${customerName.trim() || 'Website Visitor'}\n`;
    text += `📞 *Phone / WhatsApp*: ${customerPhone.trim() || 'Direct WhatsApp'}\n`;
    text += `👗 *Selected Outfit*: ${selectedOutfit}\n`;
    text += `✂️ *Style / Pattern*: ${form.styleCut}\n`;
    text += `🧵 *Fabric Status*: ${form.fabricStatus}\n`;
    text += `⏱️ *Timeline Required*: ${form.urgency}\n`;
    if (form.customerNote) {
      text += `📝 *Notes*: ${form.customerNote}\n`;
    }
    text += `💰 *Starting Estimate*: ${getEstimatedPrice()}\n`;
    text += `-----------------------------------------\n`;
    text += `💬 *Hello Masterji*, Maine website se booking submit ki hai. Kripya fitting slot aur measurement confirm karein!`;

    return text;
  };

  const handleCompleteBooking = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const finalName = customerName.trim() || 'Website Visitor (WhatsApp)';
    const finalPhone = customerPhone.trim() || 'Direct WhatsApp';
    setInputError('');

    // 1. Instantly save booking into Boutique Admin CRM Store & Webhook
    const webhook = typeof window !== 'undefined' ? localStorage.getItem('sb_webhook_url') || '' : '';
    const selectedOutfitLabel = outfitOptions.find(o => o.id === form.serviceType)?.label || form.serviceType;

    const newRecord = await saveBooking({
      customerName: finalName,
      customerPhone: finalPhone,
      serviceType: selectedOutfitLabel,
      styleCut: form.styleCut,
      fabricStatus: form.fabricStatus,
      urgency: form.urgency,
      eventDate: form.eventDate || '',
      customerNote: form.customerNote || '',
      estimatedPrice: getEstimatedPrice(),
    }, webhook);

    // 2. Set live success feedback on screen with Booking ID
    setBookingSuccess({ id: newRecord.id });

    // 3. Open WhatsApp with formatted booking message
    const payload = generateWhatsAppMessage(newRecord.id);
    const url = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(payload)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="configurator" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#150409]">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#f3cf98]/20">
            <Ruler className="w-3.5 h-3.5" />
            <span>Instant Custom Stitching Quote</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#fff7f2] tracking-tight leading-tight mb-3">
            Easy 3-Step <span className="italic gold-gradient-text">Outfit Builder & Booking</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#d1b8b8] font-light">
            Apna outfit select karein, details bharein aur ek click me WhatsApp par Masterji se jud kar booking confirm karein.
          </p>
        </div>

        {/* 2-Column Clean Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: 3 Simple Steps */}
          <div className="lg:col-span-7 liquid-glass p-5 sm:p-7 rounded-3xl border border-[#f3cf98]/25 shadow-xl">
            <form onSubmit={handleCompleteBooking} className="space-y-6">
              
              {/* STEP 1: CHOOSE OUTFIT */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-[#f3cf98] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#f3cf98]/20 text-[#f3cf98] inline-flex items-center justify-center text-[11px] font-bold">1</span>
                    <span>Choose Outfit (पोशाक चुनें)</span>
                  </label>
                  <span className="text-[11px] text-[#d1b8b8]">Tap to select</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {outfitOptions.map((opt) => {
                    const isSelected = form.serviceType === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => handleOutfitChange(opt.id)}
                        className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#8a1c32]/40 border-[#f3cf98] shadow-md shadow-[#8a1c32]/30 ring-1 ring-[#f3cf98]/50'
                            : 'bg-white/5 border-white/10 hover:border-white/20 text-[#fff7f2]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="p-1.5 rounded-xl bg-black/30 border border-white/5">{opt.icon}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#f3cf98]" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#fff7f2] leading-tight">
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

              {/* STEP 2: CHOOSE STYLE & FABRIC */}
              <div className="space-y-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#f3cf98] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#f3cf98]/20 text-[#f3cf98] inline-flex items-center justify-center text-[11px] font-bold">2</span>
                    <span>Pattern & Fabric (डिज़ाइन व कपड़ा)</span>
                  </label>
                </div>

                {/* Cut / Style Dropdown */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#d1b8b8] mb-1.5">
                    Neckline / Stitching Pattern (स्टाइल कट)
                  </label>
                  <select
                    value={form.styleCut}
                    onChange={(e) => setForm(prev => ({ ...prev, styleCut: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120407] border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none"
                  >
                    {(STYLE_CUTS[form.serviceType] || []).map((cut) => (
                      <option key={cut} value={cut}>{cut}</option>
                    ))}
                  </select>
                </div>

                {/* Fabric Status (2 Simple Radio Pills) */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#d1b8b8] mb-1.5">
                    Fabric Status (कपड़े की स्थिति)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, fabricStatus: 'I have my own fabric' }))}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                        form.fabricStatus === 'I have my own fabric'
                          ? 'bg-[#f3cf98]/20 border-[#f3cf98] text-[#fff7f2]'
                          : 'bg-white/5 border-white/10 text-[#d1b8b8] hover:border-white/20'
                      }`}
                    >
                      <span>🧵 I have my fabric ready</span>
                      {form.fabricStatus === 'I have my own fabric' && <Check className="w-3.5 h-3.5 text-[#f3cf98]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, fabricStatus: 'Need boutique fabric advice' }))}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                        form.fabricStatus === 'Need boutique fabric advice'
                          ? 'bg-[#f3cf98]/20 border-[#f3cf98] text-[#fff7f2]'
                          : 'bg-white/5 border-white/10 text-[#d1b8b8] hover:border-white/20'
                      }`}
                    >
                      <span>✨ Need boutique fabric advice</span>
                      {form.fabricStatus === 'Need boutique fabric advice' && <Check className="w-3.5 h-3.5 text-[#f3cf98]" />}
                    </button>
                  </div>
                </div>

                {/* Urgency Selection */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#d1b8b8] mb-1.5">
                    Delivery Urgency (कितने दिन में चाहिए?)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, urgency: 'Standard (3-4 Days)' }))}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        form.urgency === 'Standard (3-4 Days)'
                          ? 'bg-[#f3cf98]/20 border-[#f3cf98] text-[#fff7f2]'
                          : 'bg-white/5 border-white/10 text-[#d1b8b8]'
                      }`}
                    >
                      Standard (3-4 Days)
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, urgency: 'Express (24-48 Hours)' }))}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        form.urgency === 'Express (24-48 Hours)'
                          ? 'bg-[#f3cf98]/20 border-[#f3cf98] text-[#fff7f2]'
                          : 'bg-white/5 border-white/10 text-[#d1b8b8]'
                      }`}
                    >
                      ⚡ Urgent (24-48 Hours)
                    </button>
                  </div>
                </div>
              </div>

              {/* STEP 3: CUSTOMER CONTACT DETAILS */}
              <div className="pt-3 border-t border-white/10">
                <label className="text-xs font-bold text-[#f3cf98] uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#f3cf98]/20 text-[#f3cf98] inline-flex items-center justify-center text-[11px] font-bold">3</span>
                  <span>Your Contact Details (आपकी जानकारी)</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#d1b8b8] mb-1">
                      Aapka Naam (Customer Name) *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-white/40 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pooja Sharma"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (inputError) setInputError('');
                        }}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#120407] border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#d1b8b8] mb-1">
                      WhatsApp Number (फ़ोन नंबर) *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-white/40 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98160 XXXXX"
                        value={customerPhone}
                        onChange={(e) => {
                          setCustomerPhone(e.target.value);
                          if (inputError) setInputError('');
                        }}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#120407] border border-white/15 text-xs text-[#fff7f2] focus:border-[#f3cf98] outline-none placeholder:text-white/30"
                      />
                    </div>
                  </div>
                </div>

                {inputError && (
                  <p className="text-xs text-red-400 mt-2 font-medium flex items-center gap-1">
                    ⚠️ {inputError}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Real-Time Live Order Summary & Single Main CTA */}
          <div className="lg:col-span-5 liquid-glass p-5 sm:p-7 rounded-3xl border border-[#f3cf98]/25 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d85c72]/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#f3cf98] font-bold">
                    Order Preview
                  </p>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#fff7f2]">
                    Booking Summary
                  </h3>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                  Live Sync
                </span>
              </div>

              {/* Order Spec Table */}
              <div className="space-y-2.5 text-xs text-[#d1b8b8] mb-5">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Selected Outfit:</span>
                  <strong className="text-[#fff7f2]">
                    {outfitOptions.find(o => o.id === form.serviceType)?.label}
                  </strong>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Pattern Cut:</span>
                  <strong className="text-[#f3cf98] text-right">{form.styleCut}</strong>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Fabric:</span>
                  <span className="text-[#fff7f2] text-right">{form.fabricStatus}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Urgency:</span>
                  <span className="text-[#fff7f2] text-right">{form.urgency}</span>
                </div>

                {customerName && (
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Customer:</span>
                    <span className="text-white font-medium text-right">{customerName}</span>
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t border-[#f3cf98]/20 text-xs sm:text-sm">
                  <span className="font-semibold text-[#fff7f2]">Estimated Starting Price:</span>
                  <span className="font-bold text-[#f3cf98] text-base">{getEstimatedPrice()}*</span>
                </div>
              </div>

              {/* Guarantee badges */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#d1b8b8] mb-5">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f3cf98] shrink-0" />
                  <span>Zero advance required</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>Instant Masterji Reply</span>
                </div>
              </div>
            </div>

            {/* SINGLE UNIFIED BOOKING BUTTON */}
            <div>
              {bookingSuccess && (
                <div className="mb-3 p-3 rounded-2xl bg-[#10b981]/20 border border-[#10b981]/50 text-white text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                  <div>
                    <p className="font-bold text-white">Booking Saved in Boutique System!</p>
                    <p className="text-[11px] text-white/80">Ref ID: <span className="font-mono font-bold text-[#f3cf98]">{bookingSuccess.id}</span> • Admin CRM notified.</p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => handleCompleteBooking()}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
              >
                <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>Book on WhatsApp & Save Order</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-center text-[#d1b8b8] mt-2">
                ⚡ Automatically saves order to Boutique CRM & opens WhatsApp
              </p>

              {/* Master Tailor Guarantee Note */}
              <div className="mt-4 p-3 rounded-2xl bg-black/40 border border-[#f3cf98]/20 flex items-center gap-3">
                <img 
                  src={MODEL_FITTING_IMG} 
                  alt="Santosh Boutique Custom Fitting Session" 
                  className="w-14 h-14 object-cover object-top rounded-xl border border-[#f3cf98]/30 shrink-0" 
                />
                <div>
                  <p className="text-xs font-bold text-[#f3cf98] leading-tight">
                    100% Fit Trial Guarantee
                  </p>
                  <p className="text-[10px] text-[#d1b8b8] mt-0.5 leading-tight">
                    Free minor alterations on trial until your outfit fits like a glove.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default StyleConfigurator;
