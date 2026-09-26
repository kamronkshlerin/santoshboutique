import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, BookOpen, Clock, Calendar, Tag, 
  MapPin, MessageCircle, Compass, Share2, Check, 
  Sparkles, HelpCircle, ChevronRight, ArrowLeft
} from 'lucide-react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { REAL_ASSETS, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER, FULL_ADDRESS, GOOGLE_MAPS_URL } from '../constants';
import { PageTab } from '../App';

interface BlogPageProps {
  onNavigate?: (page: PageTab) => void;
  selectedSlug?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({ selectedSlug }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(() => {
    if (selectedSlug) {
      return BLOG_ARTICLES.find(a => a.slug === selectedSlug || a.id === selectedSlug) || null;
    }
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('/blog/')) {
        const slug = hash.split('/blog/')[1]?.replace(/[?#].*$/, '');
        if (slug) {
          return BLOG_ARTICLES.find(a => a.slug === slug || a.id === slug) || null;
        }
      }
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedLink, setCopiedLink] = useState(false);
  const [bloggerLivePosts, setBloggerLivePosts] = useState<any[]>([]);

  // Fetch optional live posts from Blogger feed if hosted on Blogspot
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fetchBloggerFeed = async () => {
      try {
        const res = await fetch('/feeds/posts/default?alt=json&max-results=5');
        if (res.ok) {
          const data = await res.json();
          const entries = data.feed?.entry || [];
          const formatted = entries.map((entry: any, idx: number) => {
            const title = entry.title?.$t || 'Blogger Post';
            const content = entry.content?.$t || entry.summary?.$t || '';
            const published = entry.published?.$t ? entry.published.$t.slice(0, 10) : 'Recent';
            const cleanText = content.replace(/<[^>]*>/g, '').slice(0, 220);
            return {
              id: `blogger-post-${idx}`,
              slug: `blogger-post-${idx}`,
              title,
              category: 'Blogger Live Article',
              district: 'Himachal Pradesh',
              author: 'Santosh Boutique Atelier',
              date: published,
              readTime: '4 min read',
              imageAsset: 'workshopStudio' as const,
              summary: cleanText + '...',
              keywords: ['Blogger Post', 'Santosh Boutique'],
              faqs: [],
              content: content || `<p>${cleanText}</p>`,
              isBloggerLive: true
            };
          });
          setBloggerLivePosts(formatted);
        }
      } catch (e) {
        // Feed not reachable in local dev; built-in 20 master articles remain active
      }
    };
    fetchBloggerFeed();
  }, []);

  const allArticles = useMemo(() => {
    return [...bloggerLivePosts, ...BLOG_ARTICLES];
  }, [bloggerLivePosts]);

  // Sync hash URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedArticle) {
        window.history.replaceState(null, '', `#/blog/${selectedArticle.slug}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.history.replaceState(null, '', `#/blog`);
      }
    }
  }, [selectedArticle]);

  // Extract unique filter lists
  const districts = useMemo(() => {
    const list = Array.from(new Set(BLOG_ARTICLES.map(a => a.district)));
    return ['All', ...list];
  }, []);

  const categories = useMemo(() => {
    const list = Array.from(new Set(BLOG_ARTICLES.map(a => a.category)));
    return ['All', ...list];
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return allArticles.filter(art => {
      const matchSearch = searchQuery === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.keywords.some((k: string) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.district.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchDistrict = selectedDistrict === 'All' || art.district === selectedDistrict || art.district === 'All Himachal' || art.district === 'Himachal General';
      const matchCategory = selectedCategory === 'All' || art.category === selectedCategory;

      return matchSearch && matchDistrict && matchCategory;
    });
  }, [allArticles, searchQuery, selectedDistrict, selectedCategory]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. ARTICLE FULL READER VIEW */}
      {selectedArticle ? (
        <article className="max-w-4xl mx-auto animate-fadeIn">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-[#d1b8b8] mb-6">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="hover:text-[#f3cf98] flex items-center gap-1 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Fashion Blog
            </button>
            <span>/</span>
            <span className="text-[#f3cf98] truncate">{selectedArticle.category}</span>
            <span>/</span>
            <span className="text-[#8a1c32] bg-[#f3cf98]/20 px-2 py-0.5 rounded-full font-bold text-[10px]">
              {selectedArticle.district}
            </span>
          </div>

          {/* Article Header Card */}
          <header className="liquid-glass rounded-3xl p-6 sm:p-10 mb-8 border border-white/10 relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
              <span className="px-3 py-1 rounded-full bg-[#8a1c32] text-white font-bold tracking-wider uppercase text-[10px]">
                {selectedArticle.category}
              </span>
              <span className="flex items-center gap-1.5 text-[#d1b8b8]">
                <MapPin className="w-3.5 h-3.5 text-[#d85c72]" /> {selectedArticle.district} (HP)
              </span>
              <span className="flex items-center gap-1.5 text-[#d1b8b8]">
                <Clock className="w-3.5 h-3.5 text-[#f3cf98]" /> {selectedArticle.readTime}
              </span>
              <span className="flex items-center gap-1.5 text-[#d1b8b8]">
                <Calendar className="w-3.5 h-3.5" /> {selectedArticle.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-display text-[#fff7f2] leading-tight mb-4">
              {selectedArticle.title}
            </h1>

            <p className="text-sm sm:text-base text-[#d1b8b8] leading-relaxed mb-6 font-medium">
              {selectedArticle.summary}
            </p>

            {/* Author Byline & Social Share */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#8a1c32] border border-[#f3cf98]/40 flex items-center justify-center text-white font-bold">
                  SD
                </div>
                <div>
                  <p className="font-bold text-[#fff7f2]">{selectedArticle.author}</p>
                  <p className="text-[11px] text-[#f3cf98]">Santosh Boutique Bilaspur Atelier</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center gap-1.5 transition-all"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Namaste Santosh Boutique! Maine aapka article padha: "${selectedArticle.title}". Mujhe is design ki stitching ke baare me puchna hai.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </header>

          {/* Featured Article Cover Image */}
          <div className="rounded-3xl overflow-hidden mb-10 shadow-2xl border border-white/10 relative aspect-[16/9] max-h-[460px] bg-black/40">
            <img
              src={(REAL_ASSETS as Record<string, string>)[selectedArticle.imageAsset] || REAL_ASSETS.designerBlouse}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120407] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
              <span className="bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/15">
                Authentic Craftsmanship • Santosh Boutique Fatoh, Ghumarwin
              </span>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#8a1c32] hover:bg-[#b53c52] px-3.5 py-1 rounded-full text-white font-bold flex items-center gap-1 transition-all"
              >
                <MapPin className="w-3 h-3" /> Get Directions
              </a>
            </div>
          </div>

          {/* Article Structured Body Content */}
          <div className="liquid-glass-card rounded-3xl p-6 sm:p-10 mb-10 border border-white/10 text-[#fff7f2] leading-relaxed prose prose-invert max-w-none">
            {/* Render HTML or Markdown paragraphs */}
            <div 
              className="space-y-5 text-sm sm:text-base [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#f3cf98] [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>table]:w-full [&>table]:border-collapse [&>table]:my-6 [&>table]:border [&>table]:border-white/15 [&>table_th]:border [&>table_th]:border-white/15 [&>table_th]:p-2.5 [&>table_th]:bg-[#8a1c32]/40 [&>table_th]:text-[#f3cf98] [&>table_td]:border [&>table_td]:border-white/10 [&>table_td]:p-2.5 [&>table_td]:text-xs sm:[&>table_td]:text-sm"
              dangerouslySetInnerHTML={{ 
                __html: selectedArticle.content
                  .replace(/## (.*?)\n/g, '<h2>$1</h2>')
                  .replace(/### (.*?)\n/g, '<h3>$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n\n/g, '<p></p>')
              }}
            />

            {/* Official NAP Card Inside Article */}
            <div className="mt-10 p-5 rounded-2xl bg-[#8a1c32]/15 border border-[#8a1c32]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-[#f3cf98] mb-1">Visit Santosh Boutique Atelier</h4>
                <p className="text-xs text-[#d1b8b8]">{FULL_ADDRESS}</p>
                <p className="text-xs text-white/80 mt-1">📞 Call / WhatsApp: <a href={`tel:${PHONE_TEL}`} className="font-bold underline">{PHONE_DISPLAY}</a></p>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#8a1c32] hover:bg-[#b53c52] text-white text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-lg transition-all"
              >
                <Compass className="w-4 h-4 text-[#f3cf98]" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Article Specific FAQ Section */}
          {selectedArticle.faqs && selectedArticle.faqs.length > 0 && (
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 mb-10 border border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-[#f3cf98]" />
                <h3 className="text-xl font-bold font-display text-[#fff7f2]">
                  Frequently Asked Questions (FAQ)
                </h3>
              </div>
              <div className="space-y-4">
                {selectedArticle.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="font-bold text-sm text-[#f3cf98] mb-1.5 flex items-start gap-2">
                      <span>Q:</span> <span>{faq.q}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-[#d1b8b8] pl-5 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Target SEO Keywords Tag Cloud */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 mb-10">
            <h4 className="text-xs font-bold text-[#f3cf98] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Target Local Keywords in this Guide
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedArticle.keywords.map((kw, i) => (
                <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 text-white/80">
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="text-center">
            <button
              onClick={() => setSelectedArticle(null)}
              className="px-6 py-3 rounded-2xl bg-[#8a1c32] hover:bg-[#b53c52] text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Articles
            </button>
          </div>
        </article>
      ) : (
        /* 2. BLOG DIRECTORY / GRID OVERVIEW */
        <div>
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3cf98]/10 border border-[#f3cf98]/30 text-[#f3cf98] text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#f3cf98]" />
              <span>Official Himachali Fashion & Tailoring Blog</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#fff7f2] mb-4">
              Fashion, Bridal Couture &amp; Tailoring Insights
            </h1>
            <p className="text-sm sm:text-base text-[#d1b8b8] leading-relaxed">
              Expert guides covering bridal blouses, Punjabi suits, express alterations, and fabric styling across all 12 districts of Himachal Pradesh from Santosh Boutique (Fatoh, Ghumarwin).
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="liquid-glass rounded-2xl p-4 sm:p-5 mb-8 border border-white/10 shadow-xl space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g., Bridal Blouse, Ghumarwin, Mandi, Patiala Salwar, Alterations)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/30 border border-white/15 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-[#f3cf98]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              {/* District Filter Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-[#f3cf98] font-bold shrink-0">District:</span>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/20 text-white text-xs focus:outline-none focus:border-[#f3cf98] w-full sm:w-auto"
                >
                  {districts.map(d => (
                    <option key={d} value={d} className="bg-[#1a080e] text-white">
                      {d === 'All' ? 'All Districts of Himachal' : d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-[#f3cf98] font-bold shrink-0">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/20 text-white text-xs focus:outline-none focus:border-[#f3cf98] w-full sm:w-auto"
                >
                  {categories.map(c => (
                    <option key={c} value={c} className="bg-[#1a080e] text-white">
                      {c === 'All' ? 'All Categories' : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count Badge */}
              <span className="text-white/60 text-[11px] self-end sm:self-center">
                Showing <b>{filteredArticles.length}</b> articles
              </span>
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="liquid-glass rounded-3xl p-12 text-center border border-white/10 max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-[#d85c72] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-white mb-1">No articles found</h3>
              <p className="text-xs text-[#d1b8b8] mb-4">Try adjusting your search keywords or district filters.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedDistrict('All'); setSelectedCategory('All'); }}
                className="px-4 py-2 rounded-xl bg-[#8a1c32] text-white text-xs font-bold hover:bg-[#b53c52] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => {
                const imgUrl = (REAL_ASSETS as Record<string, string>)[article.imageAsset] || REAL_ASSETS.designerBlouse;
                return (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="group cursor-pointer rounded-2xl overflow-hidden liquid-glass border border-white/10 hover:border-[#f3cf98]/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
                  >
                    {/* Top Thumbnail Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                      <img
                        src={imgUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      
                      {/* Category & District Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#8a1c32] text-white shadow-md">
                          {article.category}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#f3cf98] border border-[#f3cf98]/30">
                          {article.district}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 text-[11px] text-white/80 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#f3cf98]" /> {article.readTime}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-[#fff7f2] leading-snug group-hover:text-[#f3cf98] transition-colors mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-[#d1b8b8] line-clamp-3 leading-relaxed mb-4">
                          {article.summary}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-white/60 text-[11px]">
                          By {article.author.split(' ')[0]}
                        </span>
                        <span className="text-[#f3cf98] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read Guide <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
