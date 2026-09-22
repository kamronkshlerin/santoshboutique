/**
 * Santosh Boutique - Anti-Copy, Anti-Tampering & Anti-Injection Security Shield
 * Protects proprietary code, design assets, and booking data from unauthorized copying and script injection.
 */

export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

export const initSecurityShield = () => {
  if (typeof window === 'undefined') return;

  // 1. Anti-Iframe / Clickjacking Protection
  try {
    if (window.top && window.top !== window.self) {
      // Check if framed by unauthorized domain
      const isBloggerAdmin = window.location.hostname.includes('blogger.com') || window.location.hostname.includes('blogspot.com');
      if (!isBloggerAdmin) {
        window.top.location.href = window.location.href;
      }
    }
  } catch (e) {
    // If cross-origin frame block
    console.warn('Sandbox frame detected');
  }

  // 2. Disable Right-Click Context Menu (Anti-Inspect & Image Theft)
  document.addEventListener('contextmenu', (e: MouseEvent) => {
    // Allow right click only in form input fields
    const target = e.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }
    e.preventDefault();
    return false;
  }, { capture: true });

  // 3. Disable DevTools & Source Scraping Keyboard Shortcuts
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    // F12 (DevTools)
    if (e.key === 'F12') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I / Cmd+Opt+I (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+J / Cmd+Opt+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+C / Cmd+Opt+C (Element Picker)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+Opt+U (View Page Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S / Cmd+S (Save Webpage)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 4. Disable Dragging of Boutique Images & Assets
  document.addEventListener('dragstart', (e: DragEvent) => {
    const target = e.target as HTMLElement;
    if (target && target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  }, { capture: true });

  // 5. Console Warning & Anti-Scraping Watermark
  const warnStyle1 = 'color: #d85c72; font-size: 20px; font-weight: bold; text-shadow: 1px 1px 2px black;';
  const warnStyle2 = 'color: #f3cf98; font-size: 13px; font-weight: normal;';
  console.log('%c⚠️ SANTOSH BOUTIQUE - SECURE SYSTEM', warnStyle1);
  console.log('%cProprietary bespoke tailoring system. Unauthorized code injection, scraping, or duplication is strictly prohibited and monitored.', warnStyle2);
};
