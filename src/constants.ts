// Fast CDN base URL for assets hosted on GitHub repo
export const CDN_BASE = 'https://cdn.jsdelivr.net/gh/kamronkshlerin/santoshboutique@main/public';

// Smart asset resolver: prefers localhost local path when developing, CDN when deployed
export const getAssetUrl = (fileName: string) => {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return `/images/${fileName}`;
  }
  return `${CDN_BASE}/images/${fileName}`;
};

// Official NAP Constants (Google Business Profile Exact Match)
export const BUSINESS_NAME = 'Santosh Boutique';
export const OFFICIAL_TAGLINE = 'Stitching Your Dreams With Care';
export const FULL_ADDRESS = 'near Baba Balak Nath Temple, Fatoh, Ghumarwin, Himachal Pradesh 174021';
export const SHORT_LANDMARK = 'near Baba Balak Nath Temple, Fatoh, Ghumarwin';
export const LANDMARK_NOTE = SHORT_LANDMARK;
export const PINCODE = '174021';
export const PHONE_DISPLAY = '+91 94180 83935';
export const PHONE_TEL = '+919418083935';
export const WHATSAPP_NUMBER = '919418083935';
export const GEO_COORDS = { lat: 31.412639, lng: 76.744472 };

// Social Media & Google Business Profile Links
export const INSTAGRAM_URL = 'https://www.instagram.com/santoshboutiquehp/';
export const FACEBOOK_URL = 'https://www.facebook.com/santoshboutiquehp/';
export const GOOGLE_REVIEW_URL = 'https://share.google/VjLoLEBNcQzAPxhq5';
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=31.412639,76.744472';

// 100% Real Boutique Atelier & Work Photos (WebP compressed <200KB)
export const REAL_ASSETS = {
  shopFront: getAssetUrl('shop_front.webp'),
  designerBlouse: getAssetUrl('designer_blouse.webp'),
  ladiesSuit: getAssetUrl('ladies_suit.webp'),
  shararaKurti: getAssetUrl('sharara_kurti.webp'),
  partywear: getAssetUrl('partywear.webp'),
  masterTailorFit: getAssetUrl('master_tailor_fit.webp'),
  cottonSuit: getAssetUrl('cotton_suit.webp'),
  realWorkshop1: getAssetUrl('real_workshop_1.webp'),
  realStudioSign: getAssetUrl('real_studio_sign.webp'),
  realWorkshop2: getAssetUrl('real_workshop_2.webp'),
  coutureSample: getAssetUrl('couture_sample.webp'),
};

// Legacy alias mapping for backwards compatibility
export const ASSETS = {
  hero: REAL_ASSETS.shopFront,
  blouse: REAL_ASSETS.designerBlouse,
  lehenga: REAL_ASSETS.partywear,
  suit: REAL_ASSETS.ladiesSuit,
  shopExterior: REAL_ASSETS.shopFront,
  templeLandmark: REAL_ASSETS.realStudioSign,
  flyer: REAL_ASSETS.coutureSample,
};

