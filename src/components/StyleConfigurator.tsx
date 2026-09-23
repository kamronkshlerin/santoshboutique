import React, { useState } from 'react';
import { MessageCircle, Check, Sparkles, Scissors, Clock, Ruler, Phone, User, Send, CheckCircle2 } from 'lucide-react';
import { useBloggerConfig } from '../config';
import { saveBooking } from '../utils/bookingStore';
import { PHONE_DISPLAY, PHONE_TEL } from '../constants';

interface StyleConfiguratorProps {
  theme?: 'light' | 'dark';
}

export const StyleConfigurator: React.FC<StyleConfiguratorProps> = ({ theme = 'dark' }) => {
  const config = useBloggerConfig();
  const isLight = theme === 'light';

  const services = [
    { id: 'suit', label: 'Suit & Kurti Stitching', price: config.priceSuit, icon: <Scissors className={`w-4 h-4 ${isLight ? 'text-[#8a1c32]' : 'text-[#d85c72]'}`} /> },
    { id: 'blouse', label: 'Designer Blouse', price: config.priceBlouse, icon: <Sparkles className={`w-4 h-4 ${isLight ? 'text-[#d97706]' : 'text-[#f3cf98]'}`} /> },
    { id: 'lehenga', label: 'Bridal Lehenga', price: config.priceLehenga, icon: <Sparkles className={`w-4 h-4 ${isLight ? 'text-[#d97706]' : 'text-[#f3cf98]'}`} /> },
    { id: 'alteration', label: 'Express Alteration', price: config.priceAlteration, icon: <Clock className="w-4 h-4 text-[#10b981]" /> },
    { id: 'custom', label: 'Custom / Pinterest Design', price: 'Custom Quote', icon: <Ruler className={`w-4 h-4 ${isLight ? 'text-[#6b5257]' : 'text-[#d1b8b8]'}`} /> }
  ];

  const [selectedService, setSelectedService] = useState('suit');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [note, setNote] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<{ id: string } | null>(null);
  const [error, setError] = useState('');

  const currentServiceObj = services.find(s => s.id === selectedService) || services[0];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setError('Kripya apna naam (Name) likhein.');
      return;
    }
    if (!customerPhone.trim()) {
      setError('Kripya apna WhatsApp number likhein.');
      return;
    }
    setError('');

    const webhook = typeof window !== 'undefined' ? localStorage.getItem('sb_webhook_url') || '' : '';

    // 1. Save into CRM store
    const newRecord = await saveBooking({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      serviceType: currentServiceObj.label,
      styleCut: 'Standard Boutique Custom Cut',
      fabricStatus: 'Fabric discussed on WhatsApp',
      urgency: 'Standard / Express',
      eventDate: '',
      customerNote: note.trim() || 'Booked via website quick consultation',
      estimatedPrice: currentServiceObj.price,
    }, webhook);

    setBookingSuccess({ id: newRecord.id });

    // 2. Open WhatsApp
    let text = `✨ *${config.boutiqueName} - Stitching Consultation* ✨\n`;
    text += `🆔 *Booking Ref*: ${newRecord.id}\n`;
    text += `👤 *Name*: ${customerName.trim()}\n`;
    text += `📞 *Phone*: ${customerPhone.trim()}\n`;
    text += `👗 *Service*: ${currentServiceObj.label} (${currentServiceObj.price})\n`;
    if (note.trim()) {
      text += `📝 *Note*: ${note.trim()}\n`;
    }
    text += `📍 *Studio*: ${config.address}\n`;
    text += `-----------------------------------------\n`;
    text += `💬 *Namaste Masterji*, Mujhe is outfit ke liye fitting slot aur measurement time confirm karna hai.`;

    const url = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section 
      id="configurator" 
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
        isLight ? 'bg-[#fcf9f6]' : 'bg-[#150409]'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-3 border ${
            isLight 
              ? 'bg-[#8a1c32]/10 text-[#8a1c32] border-[#8a1c32]/20' 
              : 'liquid-glass text-[#f3cf98] border-[#f3cf98]/20'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#8a1c32]' : 'text-[#d85c72]'}`} />
            <span>Direct WhatsApp Booking</span>
          </div>

          <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight leading-tight mb-3 ${
            isLight ? 'text-[#1f070e]' : 'text-[#fff7f2]'
          }`}>
            Book Your <span className="italic gold-gradient-text">Stitching &amp; Fitting</span>
          </h2>

          <p className={`text-xs sm:text-sm leading-relaxed ${
            isLight ? 'text-[#6b5257]' : 'text-[#d1b8b8]'
          }`}>
            Apna outfit chunein, apna number bharein aur ek click mein Masterji se WhatsApp par direct jud kar apna slot book karein.
          </p>
        </div>

        {/* Success Card */}
        {bookingSuccess ? (
          <div className={`rounded-3xl p-8 sm:p-10 text-center border shadow-2xl animate-in fade-in zoom-in-95 duration-300 ${
            isLight 
              ? 'bg-white border-[#10b981]/50 text-[#1f070e]' 
              : 'liquid-glass-card border-[#10b981]/50'
          }`}>
            <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
            </div>

            <h3 className={`font-display text-2xl font-bold mb-2 ${
              isLight ? 'text-[#1f070e]' : 'text-[#fff7f2]'
            }`}>
              Booking Request Received!
            </h3>
            <p className={`text-xs sm:text-sm max-w-md mx-auto mb-4 ${
              isLight ? 'text-[#6b5257]' : 'text-[#d1b8b8]'
            }`}>
              Aapka booking reference <strong className={isLight ? 'text-[#8a1c32]' : 'text-[#f3cf98]'}>#{bookingSuccess.id}</strong> WhatsApp par forward ho gaya hai. Masterji aapse jald hi rabta karenge.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setBookingSuccess(null);
                  setCustomerName('');
                  setCustomerPhone('');
                  setNote('');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isLight 
                    ? 'bg-gray-100 hover:bg-gray-200 text-[#1f070e]' 
                    : 'bg-white/10 hover:bg-white/15 text-white'
                }`}
              >
                Book Another Outfit
              </button>
              <a
                href={`tel:${PHONE_TEL}`}
                className="px-5 py-2.5 rounded-xl bg-[#8a1c32] hover:bg-[#b53c52] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-md shadow-[#8a1c32]/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Studio: {PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        ) : (
          /* Simple, High-Converting 1-Card Booking Box */
          <div className={`rounded-3xl p-6 sm:p-10 border shadow-2xl transition-all ${
            isLight 
              ? 'bg-white border-[#8a1c32]/20 shadow-xl' 
              : 'liquid-glass-card border-[#f3cf98]/25 shadow-2xl'
          }`}>
            <form onSubmit={handleBooking} className="space-y-6">
              {/* Step 1: Select Service (Quick Pills) */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${
                  isLight ? 'text-[#8a1c32]' : 'text-[#f3cf98]'
                }`}>
                  1. What would you like to stitch? (क्या सिलाना चाहते हैं?)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {services.map((svc) => {
                    const isSelected = selectedService === svc.id;
                    return (
                      <button
                        type="button"
                        key={svc.id}
                        onClick={() => setSelectedService(svc.id)}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? 'bg-[#8a1c32] border-[#f3cf98] text-white shadow-lg shadow-[#8a1c32]/30 ring-1 ring-[#f3cf98]'
                            : isLight
                              ? 'bg-[#faf5f0] border-gray-200 hover:border-[#8a1c32]/40 text-[#2b1016]'
                              : 'bg-white/5 border-white/10 hover:border-white/20 text-[#fff7f2]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-black/20' : isLight ? 'bg-white shadow-sm' : 'bg-black/20'}`}>
                            {svc.icon}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#f3cf98]" />}
                        </div>
                        <p className="text-xs font-bold leading-tight">{svc.label}</p>
                        <p className={`text-[10px] mt-1 ${
                          isSelected 
                            ? 'text-[#fce1b6]' 
                            : isLight 
                              ? 'text-[#8a1c32] font-semibold' 
                              : 'text-[#f3cf98]'
                        }`}>
                          {svc.price}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isLight ? 'text-[#8a1c32]' : 'text-[#f3cf98]'
                  }`}>
                    2. Your Name (आपका नाम) *
                  </label>
                  <div className="relative">
                    <User className={`w-4 h-4 absolute left-3.5 top-3 ${
                      isLight ? 'text-gray-400' : 'text-white/40'
                    }`} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Sharma"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (error) setError('');
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${
                        isLight 
                          ? 'bg-[#faf6f3] border-gray-300 text-[#1f070e] placeholder:text-gray-400 focus:border-[#8a1c32] focus:bg-white' 
                          : 'bg-[#120407] border-white/15 text-[#fff7f2] placeholder:text-white/30 focus:border-[#f3cf98]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isLight ? 'text-[#8a1c32]' : 'text-[#f3cf98]'
                  }`}>
                    3. WhatsApp Number (फ़ोन नंबर) *
                  </label>
                  <div className="relative">
                    <Phone className={`w-4 h-4 absolute left-3.5 top-3 ${
                      isLight ? 'text-gray-400' : 'text-white/40'
                    }`} />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 94181 03213"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (error) setError('');
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${
                        isLight 
                          ? 'bg-[#faf6f3] border-gray-300 text-[#1f070e] placeholder:text-gray-400 focus:border-[#8a1c32] focus:bg-white' 
                          : 'bg-[#120407] border-white/15 text-[#fff7f2] placeholder:text-white/30 focus:border-[#f3cf98]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Optional Notes */}
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${
                  isLight ? 'text-[#6b5257]' : 'text-[#d1b8b8]'
                }`}>
                  Design Idea or Function Date (Optional / कोई खास डिज़ाइन या तारीख)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wedding function on Sunday, need sweetheart neck design"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${
                    isLight 
                      ? 'bg-[#faf6f3] border-gray-300 text-[#1f070e] placeholder:text-gray-400 focus:border-[#8a1c32] focus:bg-white' 
                      : 'bg-[#120407] border-white/15 text-[#fff7f2] placeholder:text-white/30 focus:border-[#f3cf98]'
                  }`}
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-600 dark:text-red-200 text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:brightness-110 text-white font-bold text-sm shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Book Consultation on WhatsApp</span>
                  <Send className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`tel:${PHONE_TEL}`}
                  className={`w-full sm:w-auto py-3.5 px-5 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    isLight 
                      ? 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-[#8a1c32]' 
                      : 'bg-white/5 hover:bg-white/10 border-white/15 text-[#f3cf98]'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Studio</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className={`pt-3 border-t flex flex-wrap items-center justify-around gap-3 text-[11px] ${
                isLight 
                  ? 'border-gray-200 text-[#6b5257]' 
                  : 'border-white/10 text-[#d1b8b8]'
              }`}>
                <span>✓ Zero Advance Required</span>
                <span>✓ 100% Free Fit Trial Session</span>
                <span>✓ Direct Masterji Consultation</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

