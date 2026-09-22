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
  address: 'Fatoh, Near Radha Soami Satsang Beas, Bilaspur, Himachal Pradesh - 174004 (GPS: 31°24′45.5″N 76°44′40.1″E)',
  landmark: 'Near Radha Soami Satsang Beas & Gram Panchayat Fatoh',
  hours: '9:00 AM - 8:00 PM (Daily)',
  heroHeadline: 'Stitching Your Dreams With Care',
  heroSubtitle: 'Traditional Designs • Modern Styles • Perfect Fit',
  heroTagline: 'Fatoh, Bilaspur (H.P.) • Near Radha Soami Satsang Beas',
  priceSuit: '₹350 onwards',
  priceBlouse: '₹400 onwards',
  priceAlteration: '₹80 onwards',
  priceLehenga: '₹1200 onwards',
  mapsUrl: 'https://maps.google.com/?q=31.412639,76.744472',
  announcement: 'Festive Season Stitching Slots Open | Express 24-48h Alteration Service',
};

const LIVE_STORAGE_KEY = 'sb_live_config_v1';

export function parseBloggerConfig(): BoutiqueConfig {
  const config = { ...DEFAULT_CONFIG };

  if (typeof document === 'undefined') return config;

  // 1. Search for any .cms-block elements rendered by Blogger widgets
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
          const cleanVal = val.replace(/^["']|["']$/g, '');
          config[key] = cleanVal;
        }
      }
    });
  });

  // 2. Override with live admin settings if saved via Admin Dashboard
  try {
    const liveRaw = localStorage.getItem(LIVE_STORAGE_KEY);
    if (liveRaw) {
      const live = JSON.parse(liveRaw);
      return { ...config, ...live };
    }
  } catch (e) {}

  return config;
}

export function saveLiveConfig(newConfig: Partial<BoutiqueConfig>): void {
  try {
    const current = parseBloggerConfig();
    const merged = { ...current, ...newConfig };
    localStorage.setItem(LIVE_STORAGE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new Event('sb_config_updated'));
  } catch (e) {
    console.error('Failed to save live config:', e);
  }
}

export function resetLiveConfig(): void {
  try {
    localStorage.removeItem(LIVE_STORAGE_KEY);
    window.dispatchEvent(new Event('sb_config_updated'));
  } catch (e) {
    console.error('Failed to reset config:', e);
  }
}

// React Hook for dynamic live settings
export function useBloggerConfig(): BoutiqueConfig {
  const [config, setConfig] = useState<BoutiqueConfig>(() => parseBloggerConfig());

  useEffect(() => {
    const refresh = () => setConfig(parseBloggerConfig());
    window.addEventListener('sb_config_updated', refresh);
    refresh();
    return () => window.removeEventListener('sb_config_updated', refresh);
  }, []);

  return config;
}
