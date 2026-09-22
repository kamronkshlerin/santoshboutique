import { useState, useEffect } from 'react';

export interface BoutiqueConfig {
  boutiqueName: string;
  phone: string;
  whatsapp: string;
  address: string;
  landmark: string;
  hours: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroTagline: string;
  priceSuit: string;
  priceBlouse: string;
  priceAlteration: string;
  priceLehenga: string;
  mapsUrl: string;
  announcement: string;
}

export const DEFAULT_CONFIG: BoutiqueConfig = {
  boutiqueName: 'Santosh Boutique & Stitching Studio',
  phone: '+91 98160 00000',
  whatsapp: '919816000000',
  address: 'Near Baba Balak Nath Temple, Sarti, Bilaspur, Himachal Pradesh - 174004',
  landmark: 'Directly near Baba Balak Nath Temple, Sarti',
  hours: '9:00 AM - 8:00 PM (Daily)',
  heroHeadline: 'Stitching Your Dreams With Care',
  heroSubtitle: 'Traditional Designs • Modern Styles • Perfect Fit',
  heroTagline: 'Near Baba Balak Nath Temple, Sarti, Bilaspur (H.P.)',
  priceSuit: '₹350 onwards',
  priceBlouse: '₹400 onwards',
  priceAlteration: '₹80 onwards',
  priceLehenga: '₹1200 onwards',
  mapsUrl: 'https://maps.google.com/?q=Baba+Balak+Nath+Temple+Sarti+Bilaspur+Himachal+Pradesh+174004',
  announcement: 'Festive Season Stitching Slots Open | Express 24-48h Alteration Service',
};

export function parseBloggerConfig(): BoutiqueConfig {
  const config = { ...DEFAULT_CONFIG };

  if (typeof document === 'undefined') return config;

  // Search for any .cms-block elements rendered by Blogger widgets
  const blocks = document.querySelectorAll('.cms-block');
  blocks.forEach((el) => {
    const rawText = el.textContent || '';
    const lines = rawText.split('\n');
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) return;
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex > -1) {
        const key = trimmed.slice(0, colonIndex).trim() as keyof BoutiqueConfig;
        const val = trimmed.slice(colonIndex + 1).trim();
        if (key && val && key in config) {
          // Clean quotes if any
          const cleanVal = val.replace(/^["']|["']$/g, '');
          config[key] = cleanVal;
        }
      }
    });
  });

  return config;
}

// React Hook for dynamic Blogger Layout settings
export function useBloggerConfig(): BoutiqueConfig {
  const [config, setConfig] = useState<BoutiqueConfig>(() => parseBloggerConfig());

  useEffect(() => {
    // Re-check after full DOM load in case Blogger widgets loaded asynchronously
    const updated = parseBloggerConfig();
    setConfig(updated);
  }, []);

  return config;
}
