import { REAL_BASE64 } from './real_assets_base64';

// Fast CDN base URL fallback
export const CDN_BASE = 'https://cdn.jsdelivr.net/gh/kamronkshlerin/santoshboutique@main/public';

// Smart asset resolver: Returns self-contained Base64 WebP or local/CDN URL
export const getAssetUrl = (assetOrFileName: string) => {
  if (!assetOrFileName) return '';
  if (assetOrFileName.startsWith('data:') || assetOrFileName.startsWith('http')) {
    return assetOrFileName;
  }
  const cleanKey = assetOrFileName
    .replace('.webp', '')
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()) as keyof typeof REAL_BASE64;
  if (REAL_BASE64[cleanKey]) {
    return REAL_BASE64[cleanKey];
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return `/images/${assetOrFileName}`;
  }
  return `${CDN_BASE}/images/${assetOrFileName}`;
};

// Official NAP Constants (Google Business Profile Exact Match)
export const BUSINESS_NAME = 'Santosh Boutique';
export const OFFICIAL_TAGLINE = 'Stitching Your Dreams With Care';
export const FULL_ADDRESS = 'Siddh Temple, near Godriya Baba, Fatoh, Ghumarwin, Himachal Pradesh 174021, India';
export const SHORT_LANDMARK = 'Siddh Temple, near Godriya Baba, Fatoh, Ghumarwin';
export const LANDMARK_NOTE = SHORT_LANDMARK;
export const PINCODE = '174021';
export const PHONE_DISPLAY = '+91 94181 03213';
export const PHONE_TEL = '+919418103213';
export const WHATSAPP_NUMBER = '919418103213';
export const GEO_COORDS = { lat: 31.412639, lng: 76.744472 };

// Social Media & Google Business Profile Links
export const INSTAGRAM_URL = 'https://www.instagram.com/santoshboutiquehp/';
export const FACEBOOK_URL = 'https://www.facebook.com/santoshboutiquehp/';
export const GOOGLE_REVIEW_URL = 'https://share.google/VjLoLEBNcQzAPxhq5';
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x39053d637335a73b:0x62a94a2e6ba15c9d?sa=X&amp;ved=1t:8290&amp;ictx=111';

// 100% Real Boutique Atelier & Work Photos (Self-Contained Embedded WebP)
export const REAL_ASSETS = {
  designerBlouse: REAL_BASE64.designerBlouse,
  ladiesSuit: REAL_BASE64.ladiesSuit,
  shararaKurti: REAL_BASE64.shararaKurti,
  partywear: REAL_BASE64.partywear,
  masterTailorFit: REAL_BASE64.masterTailorFit,
  cottonSuit: REAL_BASE64.cottonSuit,
  workshopStudio: REAL_BASE64.workshopStudio,
  realStudioSign: REAL_BASE64.realStudioSign,
  
  // Original Before/After Alteration & Landmark Assets
  alterationBefore: REAL_BASE64.alterationBefore,
  alterationAfter: REAL_BASE64.alterationAfter,
  shopExterior: REAL_BASE64.shopExterior,
  templeLandmark: REAL_BASE64.templeLandmark,

  // Dedicated Service Images (100% matched to text, zero text overlays)
  svcLehenga: REAL_BASE64.svcLehenga,
  svcAlteration: REAL_BASE64.svcAlteration,
  svcSuit: REAL_BASE64.svcSuit,
  svcBlouse: REAL_BASE64.svcBlouse,
  svcCustom: REAL_BASE64.svcCustom,

  // Dedicated High-Fashion Blog Photography (Hosted via GitHub CDN)
  blogBridalBlouse: `${CDN_BASE}/images/blog_bridal_blouse.jpg`,
  blogPatialaSuit: `${CDN_BASE}/images/blog_patiala_suit.jpg`,
  blogHimachaliPattu: `${CDN_BASE}/images/blog_himachali_pattu.jpg`,
  blogBridalLehenga: `${CDN_BASE}/images/blog_bridal_lehenga.jpg`,
  blogExpressAlteration: `${CDN_BASE}/images/blog_express_alteration.jpg`,
  blogVelvetWinterSuit: `${CDN_BASE}/images/blog_velvet_winter_suit.jpg`,
  blogNeckSleeves: `${CDN_BASE}/images/blog_neck_sleeves.jpg`,
  blogMandiFestive: `${CDN_BASE}/images/blog_mandi_festive.jpg`,

  // Backwards compatibility aliases
  shopFront: REAL_BASE64.shopExterior,
  realWorkshop1: REAL_BASE64.workshopStudio,
  realWorkshop2: REAL_BASE64.workshopStudio,
  coutureSample: REAL_BASE64.partywear,
};

// Legacy alias mapping with 100% matched service visuals
export const ASSETS = {
  hero: REAL_ASSETS.alterationAfter,
  suit: REAL_ASSETS.svcSuit,
  blouse: REAL_ASSETS.svcBlouse,
  lehenga: REAL_ASSETS.svcLehenga,
  alteration: REAL_ASSETS.svcAlteration,
  custom: REAL_ASSETS.svcCustom,
  shopExterior: REAL_ASSETS.shopExterior,
  templeLandmark: REAL_ASSETS.templeLandmark,
  flyer: REAL_ASSETS.svcLehenga,
};

