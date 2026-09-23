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

// 100% Real Boutique Atelier & Work Photos (Self-Contained Embedded WebP)
export const REAL_ASSETS = {
  shopFront: REAL_BASE64.shopFront,
  designerBlouse: REAL_BASE64.designerBlouse,
  ladiesSuit: REAL_BASE64.ladiesSuit,
  shararaKurti: REAL_BASE64.shararaKurti,
  partywear: REAL_BASE64.partywear,
  masterTailorFit: REAL_BASE64.masterTailorFit,
  cottonSuit: REAL_BASE64.cottonSuit,
  realWorkshop1: REAL_BASE64.realWorkshop1,
  realStudioSign: REAL_BASE64.realStudioSign,
  realWorkshop2: REAL_BASE64.realWorkshop2,
  coutureSample: REAL_BASE64.coutureSample,
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

