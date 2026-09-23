import React from 'react';
import { 
  Instagram, Facebook, ExternalLink, Heart
} from 'lucide-react';
import { 
  INSTAGRAM_URL, FACEBOOK_URL, REAL_ASSETS, BUSINESS_NAME 
} from '../constants';

interface SocialPost {
  image: string;
  caption: string;
  category: string;
  likes: number;
}

const RECENT_POSTS: SocialPost[] = [
  {
    image: REAL_ASSETS.designerBlouse,
    caption: 'Bridal handcrafted sweetheart neckline blouse with fine gold zari piping.',
    category: 'Designer Blouse',
    likes: 248,
  },
  {
    image: REAL_ASSETS.shararaKurti,
    caption: 'Georgette sharara-kurti ensemble tailored for wedding sangeet evening.',
    category: 'Sharara Set',
    likes: 312,
  },
  {
    image: REAL_ASSETS.partywear,
    caption: 'Bespoke festive partywear lehenga & choli with customized flare measurements.',
    category: 'Partywear',
    likes: 189,
  },
  {
    image: REAL_ASSETS.masterTailorFit,
    caption: 'Perfect silhouette tailoring tailored to flatter your personal posture.',
    category: 'Master Tailoring',
    likes: 276,
  },
];

export const SocialFeedShowcase: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#150409]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[#f3cf98] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#f3cf98]/20">
              <Instagram className="w-3.5 h-3.5 text-[#d85c72]" />
              <span>Connect on Social Media</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#fff7f2] tracking-tight leading-tight">
              Follow Us on <span className="italic gold-gradient-text">Instagram &amp; Facebook</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#d1b8b8] mt-2 max-w-xl">
              Naye suit designs, bridal blouse patterns, aur boutique customer trials ki taaza photos Instagram aur Facebook par roz dekhein.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-xs font-bold hover:brightness-110 shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>@santoshboutiquehp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1877F2] text-white text-xs font-bold hover:brightness-110 shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Instagram Visual Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {RECENT_POSTS.map((post, idx) => (
            <a
              key={idx}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden liquid-glass border border-white/10 aspect-square block cursor-pointer"
            >
              <img
                src={post.image}
                alt={`${post.category} stitching by ${BUSINESS_NAME} Bilaspur`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-between items-center text-[10px] text-white/80">
                  <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
                    {post.category}
                  </span>
                  <Instagram className="w-3.5 h-3.5 text-[#f3cf98]" />
                </div>

                <p className="text-[11px] text-white leading-tight line-clamp-2">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#f3cf98]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-[#d85c72] text-[#d85c72]" />
                    {post.likes}
                  </span>
                  <span className="text-[10px] text-white/60">View Post →</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA Bar */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#d1b8b8]">
            📸 Tag us in your outfit stories <strong className="text-[#f3cf98]">#SantoshBoutiqueHP</strong> to get featured!
          </p>
        </div>
      </div>
    </section>
  );
};
