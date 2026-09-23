import React, { useState } from 'react';
import { 
  Star, ThumbsUp, Sparkles, MapPin, 
  ExternalLink, CheckCircle2, ArrowRight, ShieldCheck,
  Scissors
} from 'lucide-react';
import { 
  BUSINESS_NAME, FULL_ADDRESS, GOOGLE_REVIEW_URL, PHONE_DISPLAY 
} from '../constants';

const REVIEW_SUGGESTIONS = [
  '👗 Masterji gave the most flattering, perfect blouse fitting for our family wedding!',
  '⚡ Express alteration done in under 24 hours. Fitting is spot-on like a glove!',
  '🧵 Best boutique for ladies suit & designer sharara stitching in Ghumarwin/Bilaspur.',
  '✨ Genuine pricing, fine threadwork, and extremely polite boutique master tailor.',
  '📍 Convenient studio location near Baba Balak Nath Temple, Fatoh. 100% recommended!'
];

interface ReviewPageProps {
  onNavigate?: (page: any) => void;
}

export const ReviewPage: React.FC<ReviewPageProps> = ({ onNavigate }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewNote, setReviewNote] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectSuggestion = (text: string) => {
    setReviewNote(text);
  };

  const openGoogleReview = () => {
    // If the customer typed or selected text, copy it to clipboard so they can paste it with 1 click on Google!
    if (reviewNote.trim()) {
      try {
        navigator.clipboard.writeText(reviewNote);
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      } catch (e) {}
    }
    window.open(GOOGLE_REVIEW_URL, '_blank');
  };

  return (
    <div className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Breadcrumb & Sub-badge */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <nav className="flex items-center justify-center gap-2 text-xs text-[#d1b8b8] mb-4">
          <button 
            onClick={() => onNavigate && onNavigate('home')} 
            className="hover:text-[#f3cf98] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#f3cf98] font-semibold">Rate &amp; Review on Google</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#f3cf98]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official Customer Feedback Portal</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#fff7f2] tracking-tight leading-tight mb-4">
          Rate &amp; Review <span className="gold-gradient-text">{BUSINESS_NAME}</span>
        </h1>

        <p className="text-sm sm:text-base text-[#d1b8b8] leading-relaxed">
          Aapka feedback hamare liye anmol hai. Kripya apna anubhav Google Business Profile par share karein aur doosre logon ko best stitching service chunne me madad karein!
        </p>

        {/* Verified GMB Location Pill */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#f3cf98]">
          <MapPin className="w-3.5 h-3.5 text-[#d85c72] shrink-0" />
          <span>{FULL_ADDRESS}</span>
        </div>
      </div>

      {/* Main Review Interactive Card */}
      <div className="liquid-glass p-6 sm:p-10 rounded-3xl border border-[#f3cf98]/30 shadow-2xl relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#d85c72]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Live Google Aggregate Rating Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#4285F4]/10 border border-[#4285F4]/30 flex items-center justify-center text-3xl shrink-0">
              <span className="font-bold text-[#4285F4]">G</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold text-[#fff7f2]">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#d1b8b8]">Google Business Profile • 128+ Verified Customer Reviews</p>
            </div>
          </div>

          <a 
            href={GOOGLE_REVIEW_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-[#f3cf98] hover:bg-white/10 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Open Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Step 1: Star Rating Picker */}
        <div className="text-center mb-8">
          <label className="block text-xs uppercase tracking-widest text-[#f3cf98] font-bold mb-3">
            1. Select Your Rating (Aapka Rating Chuniye)
          </label>
          <div className="flex justify-center items-center gap-2 sm:gap-3 py-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="p-2 transition-transform hover:scale-125 focus:outline-none"
                aria-label={`${star} star rating`}
              >
                <Star 
                  className={`w-9 h-9 sm:w-11 sm:h-11 transition-all ${
                    (hoverRating || rating) >= star
                      ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                      : 'text-white/20'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm font-semibold text-amber-400 mt-2">
            {rating === 5 && '★★★★★ Excellent / 5-Star Boutique Experience!'}
            {rating === 4 && '★★★★☆ Very Good Service & Stitching!'}
            {rating === 3 && '★★★☆☆ Good Service'}
            {rating < 3 && 'Kripya humein bataiye hum kaise aur behtar kar sakte hain.'}
          </p>
        </div>

        {/* Step 2: Review Thoughts & Quick Auto-Chips */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs uppercase tracking-widest text-[#f3cf98] font-bold">
              2. Your Comments / Review Words (Optional)
            </label>
            <span className="text-[11px] text-[#d1b8b8]">Tap a sample idea below to auto-fill</span>
          </div>

          <textarea
            rows={3}
            value={reviewNote}
            onChange={(e) => setReviewNote(e.target.value)}
            placeholder="Aapko fitting, design ya alteration kaisa laga? (e.g. Masterji gave the best blouse fit for wedding...)"
            className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/15 text-sm text-[#fff7f2] focus:border-[#f3cf98] outline-none placeholder:text-white/30 resize-none mb-3"
          />

          {/* Quick suggestions chips */}
          <div className="flex flex-wrap gap-2">
            {REVIEW_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(sug)}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#d1b8b8] hover:border-[#f3cf98] hover:text-[#fff7f2] transition-all text-left"
              >
                + {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Big Direct Action Button to GMB */}
        <div className="pt-2 text-center">
          {copied && (
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10b981]/20 border border-[#10b981]/50 text-white text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>Review text copied! Opening Google Maps to paste and submit...</span>
            </div>
          )}

          <button
            type="button"
            onClick={openGoogleReview}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#f3cf98] via-[#e5b770] to-[#f3cf98] text-[#120407] font-bold text-base sm:text-lg shadow-xl hover:shadow-[#f3cf98]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto group"
          >
            <Star className="w-5 h-5 fill-[#120407]" />
            <span>Submit Review Directly on Google Maps</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs text-[#d1b8b8] mt-3">
            ⚡ Direct Link: <span className="font-mono text-white/80">{GOOGLE_REVIEW_URL}</span>
          </p>
        </div>
      </div>

      {/* Instructions & Why Reviews Matter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl liquid-glass border border-white/10 text-center">
          <div className="w-10 h-10 rounded-xl bg-[#f3cf98]/10 text-[#f3cf98] flex items-center justify-center mx-auto mb-3">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-[#fff7f2] mb-1">Local Business Support</h4>
          <p className="text-xs text-[#d1b8b8] leading-relaxed">
            Aapka 5-star review Bilaspur aur Ghumarwin ke doosre parivaron ko authentic boutique tailor dhoondhne me madad karta hai.
          </p>
        </div>

        <div className="p-6 rounded-2xl liquid-glass border border-white/10 text-center">
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto mb-3">
            <Scissors className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-[#fff7f2] mb-1">Guaranteed Masterji Care</h4>
          <p className="text-xs text-[#d1b8b8] leading-relaxed">
            Har outfit me trial alterations free of cost provide karte hain jab tak aap 100% satisfy na ho jayein.
          </p>
        </div>

        <div className="p-6 rounded-2xl liquid-glass border border-white/10 text-center">
          <div className="w-10 h-10 rounded-xl bg-[#d85c72]/10 text-[#d85c72] flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-[#fff7f2] mb-1">Direct Assistance</h4>
          <p className="text-xs text-[#d1b8b8] leading-relaxed">
            Kisi bhi vishesh fitting ya design guidance ke liye direct call karein: <strong className="text-white">{PHONE_DISPLAY}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
