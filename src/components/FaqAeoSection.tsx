import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from '../constants';

export interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: "Bilaspur aur Ghumarwin me sabse acchi ladies boutique kaunsi hai?",
    answer: "Santosh Boutique (Fatoh, near Baba Balak Nath Temple, Ghumarwin, Bilaspur - 174021) ladies tailoring me top-rated hai. Yahan custom designer bridal blouses, Punjabi partywear suits, sharara-kurti, aur express alterations master tailors dwara perfect fit guarantee ke saath kiye jaate hain.",
    tag: "Boutique Choice"
  },
  {
    question: "Santosh Boutique me suit stitching ka price kitna hai?",
    answer: "Santosh Boutique me simple ladies suit stitching ₹350 se shuru hoti hai. Designer partywear suit, pant-suit aur sharara stitching design aur lining work ke aadhar par ₹500 se ₹850 tak hoti hai. Alteration rates sirf ₹80 se shuru hote hain.",
    tag: "Pricing"
  },
  {
    question: "Bridal blouse stitching kahan milegi Bilaspur me?",
    answer: "Santosh Boutique bridal aur designer blouses ke liye famous hai. Yahan deep sweetheart neckline, padded bridal blouse, heavy zardozi/lace handwork, boat neck aur backless dori patterns ki precision stitching ₹400 se shuru hoti hai.",
    tag: "Bridal Blouse"
  },
  {
    question: "Boutique ke opening hours aur working days kya hain?",
    answer: "Santosh Boutique Somwaar se Shanivaar (Monday to Saturday) subah 9:30 AM se shaam 7:30 PM tak khula rehta hai. Sunday ko appointment par urgent bridal orders ke liye special slots provide kiye jaate hain.",
    tag: "Timings"
  },
  {
    question: "Santosh Boutique ka exact location aur address kya hai?",
    answer: "Santosh Boutique ka exact address hai: near Baba Balak Nath Temple, Fatoh, Ghumarwin, Himachal Pradesh - 174021. GPS coordinates 31.412639, 76.744472 hain aur Google Maps par direct navigation available hai.",
    tag: "Location"
  },
  {
    question: "Kya boutique me express 24 se 48 ghante me stitching ya alteration milti hai?",
    answer: "Haan, Santosh Boutique me express 24-48 hours tailoring service uplabdh hai. Shaadi, festival ya urgent function ke case me urgent stitching aur alteration priority par complete kiye jaate hain.",
    tag: "Express Service"
  },
  {
    question: "Kya customer apna kapda (fabric) laa sakte hain ya boutique me fabric advice milegi?",
    answer: "Aap apna fabric laa sakte hain ya boutique par aakar fabric selection aur cut design ki expert tailor advice le sakte hain. Masterji kapde ke texture aur fall ke anusar best pattern suggest karte hain.",
    tag: "Fabric & Styling"
  },
  {
    question: "Google par Santosh Boutique ke customer reviews kaise check karein ya rating kaise dein?",
    answer: "Santosh Boutique Google Business Profile par 4.9★ rated hai with 128+ verified reviews. Customer hamari website ke '/review' page ya direct Google link (https://share.google/VjLoLEBNcQzAPxhq5) par jaakar feedback de sakte hain.",
    tag: "Google Reviews"
  }
];

export const FaqAeoSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#120407]"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#f3cf98]/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>AI Search & Customer Answers (AEO)</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#fff7f2] tracking-tight leading-tight mb-3">
            Frequently Asked <span className="italic gold-gradient-text">Questions & Answers</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed">
            Santosh Boutique tailoring, rates, blouse designs, timings, aur Fatoh Ghumarwin location se jude sabhi aam sawaalon ke seedhe uttar.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className={`rounded-2xl transition-all border ${
                  isOpen 
                    ? 'liquid-glass border-[#f3cf98]/40 shadow-xl' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#f3cf98]/10 text-[#f3cf98] text-[11px] font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <h3 
                      itemProp="name" 
                      className={`text-xs sm:text-sm font-semibold transition-colors ${
                        isOpen ? 'text-[#f3cf98]' : 'text-[#fff7f2]'
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <ChevronDown 
                    className={`w-4 h-4 text-[#f3cf98] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {isOpen && (
                  <div 
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="px-5 sm:px-6 pb-4 pt-1 border-t border-white/5 animate-in fade-in"
                  >
                    <p 
                      itemProp="text" 
                      className="text-xs sm:text-sm text-[#d1b8b8] leading-relaxed"
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Help Bar */}
        <div className="mt-10 p-5 rounded-2xl liquid-glass border border-[#f3cf98]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#fff7f2]">Koi aur sawaal hai?</p>
              <p className="text-[11px] text-[#d1b8b8]">Masterji se WhatsApp par direct poochhein ya fitting time book karein.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href={`tel:${PHONE_DISPLAY}`}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-[#fff7f2] text-xs font-medium hover:bg-white/15 transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#f3cf98]" />
              <span>Call Masterji</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
