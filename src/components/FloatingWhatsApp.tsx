import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, CheckCheck, Sparkles } from 'lucide-react';
import { useBloggerConfig } from '../config';

interface QuickOption {
  id: string;
  label: string;
  icon: string;
  text: string;
}

interface FloatingWhatsAppProps {
  theme?: 'dark' | 'light';
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ theme = 'dark' }) => {
  const config = useBloggerConfig();
  const isLight = theme === 'light';
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [currentTime, setCurrentTime] = useState('Just now');
  const [message, setMessage] = useState(
    `Namaste ${config.boutiqueName}! Mujhe custom stitching ke rate aur fitting appointment ke bare me janna hai.`
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const quickOptions: QuickOption[] = [
    {
      id: 'suit',
      label: 'Suit Stitching (₹350+)',
      icon: '🧵',
      text: `Namaste ${config.boutiqueName}! Mujhe Punjabi/Designer Suit stitching ke rate aur fabric requirement ke bare me baat karni hai.`,
    },
    {
      id: 'blouse',
      label: 'Designer Blouse (₹400+)',
      icon: '🪡',
      text: `Namaste ${config.boutiqueName}! Mujhe designer padded bridal blouse banwana hai. Kya patterns available hain?`,
    },
    {
      id: 'lehenga',
      label: 'Bridal Lehenga (₹1200+)',
      icon: '👗',
      text: `Namaste ${config.boutiqueName}! Mujhe Royal Bridal Lehenga stitching aur can-can flare ke bare me consultation chahiye.`,
    },
    {
      id: 'alteration',
      label: '24h Urgent Alteration',
      icon: '⚡',
      text: `Namaste ${config.boutiqueName}! Mere paas urgent alteration/fitting ka kaam hai. Kya 24-48 ghante me ready ho jayega?`,
    },
    {
      id: 'location',
      label: 'Studio Location (Fatoh)',
      icon: '📍',
      text: `Namaste! Mujhe aapki boutique (Near Radha Soami Satsang Beas, Fatoh, Bilaspur) aana hai. Exact landmark bata dijiye.`,
    },
  ];

  useEffect(() => {
    // Format friendly time
    const now = new Date();
    const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCurrentTime(formatted);
    // Auto-pop teaser after 5 seconds if not yet interacted
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectChip = (opt: QuickOption) => {
    setMessage(opt.text || '');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSendToWhatsApp = (textToSend?: string) => {
    const finalMsg = textToSend || message;
    if (!finalMsg.trim()) return;

    const url = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(finalMsg.trim())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendToWhatsApp();
    }
  };

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setUnreadCount(0);
      return next;
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end select-none font-sans">
      {/* ================= 1. AUTHENTIC WHATSAPP POPUP WINDOW ================= */}
      {isOpen && (
        <div 
          className={`whatsapp-window mb-3.5 w-[92vw] sm:w-[370px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-5 duration-300 transition-all flex flex-col ${
            isLight
              ? 'border border-black/10 bg-[#efeae2] text-[#111b21]'
              : 'border border-white/20 bg-[#120407] text-[#fff7f2]'
          }`}
          style={{ maxHeight: 'calc(100vh - 110px)' }}
        >
          {/* WhatsApp Header */}
          <div className="bg-gradient-to-r from-[#075E54] via-[#128C7E] to-[#075E54] p-3.5 sm:p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Studio Avatar with Online Indicator */}
              <div className="relative">
                <div className={`w-11 h-11 rounded-full border-2 border-white/60 flex items-center justify-center font-display font-bold text-lg shadow-inner ${
                  isLight ? 'bg-white text-[#075E54]' : 'bg-[#120407] text-[#f3cf98]'
                }`}>
                  SB
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-[#075E54] ring-1 ring-white" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-semibold text-sm tracking-wide text-white leading-tight">
                    Santosh Boutique
                  </h4>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#25D366] text-[#075E54] text-[10px] font-bold">
                    ✓
                  </span>
                </div>
                <p className="text-[11px] text-white/90 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping inline-block" />
                  <span>Online • Typically replies in 5 mins</span>
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/20 text-white/90 hover:text-white transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Chat Body */}
          <div 
            className={`whatsapp-chat-body p-3.5 sm:p-4 overflow-y-auto space-y-3 flex-1 ${
              isLight
                ? 'bg-[#efeae2]'
                : 'bg-gradient-to-b from-[#18080f] via-[#14050b] to-[#120407]'
            }`}
            style={{ minHeight: '260px', maxHeight: '380px' }}
          >
            {/* Encryption Notice */}
            <div className="text-center">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-medium shadow-xs ${
                isLight
                  ? 'bg-[#ffeecd] border border-[#f0dfbe] text-[#54656f]'
                  : 'bg-black/40 border border-white/5 text-[#f3cf98]/80'
              }`}>
                🔒 Messages are end-to-end encrypted
              </span>
            </div>

            {/* Time Marker */}
            <div className="text-center">
              <span className={`text-[10px] uppercase tracking-widest font-mono ${
                isLight ? 'text-[#667781]' : 'text-[#d1b8b8]/60'
              }`}>
                Today {currentTime}
              </span>
            </div>

            {/* Boutique's Incoming Welcome Bubble */}
            <div className="flex flex-col items-start max-w-[88%]">
              <div className={`whatsapp-incoming-bubble relative p-3 rounded-2xl rounded-tl-none shadow-md text-[13px] leading-relaxed ${
                isLight
                  ? 'bg-white border border-black/5 text-[#111b21]'
                  : 'bg-[#240c14] border border-[#f3cf98]/20 text-[#fff7f2]'
              }`}>
                <p className={`font-bold text-xs mb-1 flex items-center gap-1 ${
                  isLight ? 'text-[#075e54]' : 'text-[#f3cf98]'
                }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  Santosh Boutique Bilaspur
                </p>
                <p className={isLight ? 'text-[#111b21]' : 'text-[#fff7f2]'}>
                  Namaste! Welcome to Himachal's premier atelier. Aapko custom suit, designer blouse, ya bridal lehenga ke baare me puchna hai?
                </p>
                <p className={`mt-1 text-xs ${isLight ? 'text-[#54656f]' : 'text-[#d1b8b8]'}`}>
                  👉 Neeche quick option tap karein ya direct message send karein:
                </p>
                <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                  isLight ? 'text-[#667781]' : 'text-[#d1b8b8]/60'
                }`}>
                  <span>{currentTime}</span>
                  <CheckCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#53bdeb]' : 'text-[#34B7F1]'}`} />
                </div>
              </div>
            </div>

            {/* Quick-Tap Preset Options / Chips */}
            <div className="space-y-1.5 pt-1">
              <p className={`text-[10px] font-bold uppercase tracking-wider pl-1 ${
                isLight ? 'text-[#54656f]' : 'text-[#f3cf98]/70'
              }`}>
                ⚡ Quick Inquiries (Tap to select)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectChip(opt)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs active:scale-95 transition-all text-left shadow-xs ${
                      isLight
                        ? 'bg-white hover:bg-[#e7f7ed] border border-[#25D366]/40 hover:border-[#25D366] text-[#111b21]'
                        : 'bg-white/5 hover:bg-[#8a1c32]/30 border border-[#f3cf98]/20 hover:border-[#f3cf98]/50 text-[#fff7f2]'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span className="font-semibold text-[11px]">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp Bottom Input & Direct Action Area */}
          <div className={`p-3 border-t flex flex-col gap-2 ${
            isLight
              ? 'bg-[#f0f2f5] border-[#d1d7db]'
              : 'bg-[#1e0710] border-[#f3cf98]/20'
          }`}>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className={`w-full rounded-full px-4 py-2.5 text-xs focus:outline-none transition-colors ${
                    isLight
                      ? 'bg-white border border-[#d1d7db] text-[#111b21] placeholder-[#667781] focus:border-[#25D366]'
                      : 'bg-[#120407] border border-[#f3cf98]/30 text-white placeholder-white/40 focus:border-[#25D366]'
                  }`}
                />
              </div>

              {/* Green WhatsApp Send Button */}
              <button
                onClick={() => handleSendToWhatsApp()}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#25D366] via-[#128C7E] to-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md hover:scale-105 active:scale-95 transition-transform"
                title="Send on WhatsApp"
                aria-label="Send on WhatsApp"
              >
                <Send className="w-4 h-4 text-white fill-white ml-0.5" />
              </button>
            </div>

            {/* Direct Redirect Callout Button */}
            <button
              onClick={() => handleSendToWhatsApp()}
              className={`w-full py-2.5 px-3 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all ${
                isLight
                  ? 'bg-[#25D366] hover:bg-[#20ba5a]'
                  : 'bg-gradient-to-r from-[#25D366]/20 via-[#25D366]/30 to-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-white fill-white" />
              <span>Direct Open WhatsApp Chat with Message</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= 2. FLOATING GREEN TRIGGER BUTTON ================= */}
      <button
        onClick={toggleOpen}
        className="pulse-ring-whatsapp shimmer-btn relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-[#25D366] via-[#128C7E] to-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        aria-label="Toggle WhatsApp chat window"
      >
        {/* Glow Ping Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10" />

        {/* Unread badge if closed */}
        {!isOpen && unreadCount > 0 && (
          <span className={`absolute -top-1 -right-1 bg-red-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 animate-bounce ${
            isLight ? 'border-white' : 'border-[#120407]'
          }`}>
            {unreadCount}
          </span>
        )}

        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 fill-white" />
        )}
      </button>
    </div>
  );
};
export default FloatingWhatsApp;
