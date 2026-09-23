import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distHtmlPath = path.join(__dirname, 'dist', 'index.html');
const outXmlPath = path.join(__dirname, 'blogger-theme.xml');

if (!fs.existsSync(distHtmlPath)) {
  console.error('dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

const html = fs.readFileSync(distHtmlPath, 'utf8');

// Extract inline CSS
const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
const inlineCss = styleMatch ? styleMatch[1] : '';

// Extract JSON-LD script
const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const jsonLd = jsonLdMatch ? jsonLdMatch[1] : '';

// Extract Module Bundle Script
const scriptMatch = html.match(/<script type="module"[^>]*>([\s\S]*?)<\/script>/);
const jsBundle = scriptMatch ? scriptMatch[1] : '';

const sanitizedCss = inlineCss.replace(/\]\]>/g, ']]]]><![CDATA[>');
const sanitizedJs = jsBundle.replace(/\]\]>/g, ']]]]><![CDATA[>');

const bloggerXml = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultmessages='false' b:defaultstyles='false' b:layoutsVersion='3' b:responsive='true' class='scroll-smooth' lang='en' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='UTF-8'/>
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=5.0' name='viewport'/>
  <title>Santosh Boutique | Ladies Fashion &amp; Custom Tailoring Bilaspur (HP)</title>

  <meta content='Santosh Boutique in Fatoh, Ghumarwin, Bilaspur (HP) near Baba Balak Nath Temple - 174021. Designer bridal blouses, custom suit stitching, lehenga tailoring &amp; express alteration services. Call +91 94181 03213.' name='description'/>
  <meta content='Santosh Boutique, Boutique Bilaspur, Ladies Tailor Ghumarwin, Designer Blouse Bilaspur, Suit Stitching Himachal, Tailor near Baba Balak Nath Temple Fatoh' name='keywords'/>

  <!-- Open Graph -->
  <meta content='website' property='og:type'/>
  <meta content='Santosh Boutique | Fatoh, Ghumarwin, Bilaspur (HP)' property='og:title'/>
  <meta content='Exquisite bespoke tailoring, designer bridal blouses &amp; master alterations in Fatoh, Ghumarwin, Bilaspur, Himachal Pradesh.' property='og:description'/>
  <meta content='https://cdn.jsdelivr.net/gh/kamronkshlerin/santoshboutique@main/public/images/shop_front.webp' property='og:image'/>

  <!-- Security & Anti-Injection Protection -->
  <meta http-equiv='X-Content-Type-Options' content='nosniff'/>
  <meta http-equiv='X-XSS-Protection' content='1; mode=block'/>
  <meta name='robots' content='index, follow, max-image-preview:large'/>

  <!-- Google Rich Snippets, Sitelinks & Knowledge Graph Schema -->
  <script type='application/ld+json'>
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://santoshboutique.blogspot.com/#website",
        "url": "https://santoshboutique.blogspot.com/",
        "name": "Santosh Boutique",
        "description": "Premier bespoke ladies tailoring, bridal lehengas, custom designer blouses, and alteration studio in Fatoh, Ghumarwin, Bilaspur, Himachal Pradesh 174021.",
        "inLanguage": "en-IN"
      },
      {
        "@type": ["LocalBusiness", "ClothingStore"],
        "@id": "https://santoshboutique.blogspot.com/#organization",
        "name": "Santosh Boutique",
        "alternateName": [
          "Santosh Boutique &amp; Stitching Studio",
          "Santosh Ladies Tailor Fatoh",
          "Santosh Tailor Ghumarwin"
        ],
        "url": "https://santoshboutique.blogspot.com/",
        "telephone": "+919418103213",
        "priceRange": "₹80 - ₹1200",
        "image": [
          "https://cdn.jsdelivr.net/gh/kamronkshlerin/santoshboutique@main/public/images/shop_front.webp",
          "https://cdn.jsdelivr.net/gh/kamronkshlerin/santoshboutique@main/public/images/designer_blouse.webp",
          "https://cdn.jsdelivr.net/gh/kamronkshlerin/santoshboutique@main/public/images/ladies_suit.webp",
          "https://cdn.jsdelivr.net/gh/kamronkshlerin/santoshboutique@main/public/images/sharara_kurti.webp"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "near Baba Balak Nath Temple, Fatoh, Ghumarwin",
          "addressLocality": "Ghumarwin, Bilaspur",
          "addressRegion": "Himachal Pradesh",
          "postalCode": "174021",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 31.412639,
          "longitude": 76.744472
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "09:00",
            "closes": "19:30"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/santoshboutiquehp/",
          "https://www.facebook.com/santoshboutiquehp/",
          "https://share.google/VjLoLEBNcQzAPxhq5"
        ],
        "hasMap": "https://maps.google.com/?q=31.412639,76.744472",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "134"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://santoshboutique.blogspot.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Bilaspur me sabse acchi ladies boutique kaunsi hai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Santosh Boutique (Fatoh, Ghumarwin, Bilaspur HP - 174021 near Baba Balak Nath Temple) 15+ salon ke anubhav ke saath Punjabi suit stitching, designer bridal blouse aur express alteration ke liye sabse lokpriya boutique hai."
            }
          },
          {
            "@type": "Question",
            "name": "Suit stitching ka price kitna hai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Santosh Boutique par plain simple suit stitching ₹250 se, lining/astar suit ₹350 se, designer Anarkali &amp; Sharara suit ₹500 se shuru hoti hai. Express 24-48 hours delivery bhi uplabdh hai."
            }
          },
          {
            "@type": "Question",
            "name": "Bridal blouse stitching kahan milegi Bilaspur me?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Santosh Boutique par premium bridal blouse stitching milti hai (Princess cut, padded cup, deep back dori latkan, heavy zari aari work). Rate ₹300 se ₹800 ke beech hai with perfect fitting guarantee."
            }
          },
          {
            "@type": "Question",
            "name": "Boutique ke opening hours kya hain?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Santosh Boutique Somwar se Ravivar (Monday to Sunday) subah 9:00 AM se shaam 7:30 PM tak saaton din khuli rehti hai. Fitting ya measurement ke liye kabhi bhi walk-in kar sakte hain."
            }
          },
          {
            "@type": "Question",
            "name": "Kya emergency ya express alteration service available hai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Haan, Santosh Boutique express same-day aur 24-hour urgent alteration provide karti hai. Fitting loose/tight, pant length, blouse adjustment ₹80 se start hota hai."
            }
          },
          {
            "@type": "Question",
            "name": "Santosh Boutique ka exact location aur contact number kya hai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Exact Address: near Baba Balak Nath Temple, Fatoh, Ghumarwin, Himachal Pradesh 174021. Phone/WhatsApp: +91 94181 03213. Ghumarwin aur Bilaspur Bus Stand se seedhi road connectivity hai."
            }
          }
        ]
      },
      {
        "@type": "SiteNavigationElement",
        "name": [
          "Designs &amp; Catalog",
          "Our Tailoring Process",
          "Price Guide &amp; Rates",
          "About Our Atelier",
          "Rate &amp; Review on Google",
          "Studio Location &amp; Directions"
        ],
        "url": [
          "https://santoshboutique.blogspot.com/designs",
          "https://santoshboutique.blogspot.com/process",
          "https://santoshboutique.blogspot.com/pricing",
          "https://santoshboutique.blogspot.com/about",
          "https://santoshboutique.blogspot.com/review",
          "https://santoshboutique.blogspot.com/contact"
        ]
      }
    ]
  }
  </script>

  <!-- Google Fonts -->
  <link href='https://fonts.googleapis.com' rel='preconnect'/>
  <link crossorigin='anonymous' href='https://fonts.gstatic.com' rel='preconnect'/>
  <link href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&amp;family=Plus+Jakarta+Sans:wght@300;400;500;600;700&amp;display=swap' rel='stylesheet'/>

  <!-- Required for Blogger Layout Editor Version 3 -->
  <b:template-skin>
    <![CDATA[
      body#layout {
        background: #f1f5f9;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      body#layout #blogger-layout-container {
        display: block !important;
      }
      body#layout .layout-section {
        margin: 15px 0;
        padding: 15px;
        background: #ffffff;
        border: 2px dashed #cbd5e1;
        border-radius: 8px;
      }
    ]]>
  </b:template-skin>

  <b:skin><![CDATA[
    /* Reset default Blogger styles */
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100%;
      background: #120407;
      color: #fff7f2;
    }
    .status-msg-wrap, .status-msg-body, .status-msg-border, #error-page, .blogger-header, .blog-feeds, .post-feeds, .header-widget {
      display: none !important;
    }

    /* Anti-Copy, Anti-Select & Code Scraping Protection */
    body:not(#layout) {
      -webkit-touch-callout: none !important;
      -webkit-user-select: none !important;
      -khtml-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
    input, textarea {
      -webkit-user-select: text !important;
      user-select: text !important;
    }

    /* Live Website: hide raw CMS blocks so they do NOT affect the React UI */
    body:not(#layout) #blogger-layout-container,
    body:not(#layout) .layout-section {
      display: none !important;
    }

    /* Blogger Layout Dashboard Editor Mode (body#layout) */
    body#layout {
      background: #f8fafc !important;
      color: #0f172a !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      padding: 24px !important;
      margin: 0 !important;
    }
    body#layout #santosh-root,
    body#layout #root {
      display: none !important;
    }
    body#layout #blogger-layout-container {
      display: block !important;
      max-width: 900px !important;
      margin: 0 auto !important;
    }
    body#layout .layout-admin-header {
      background: linear-gradient(135deg, #8a1c32 0%, #120407 100%) !important;
      color: #fff7f2 !important;
      padding: 24px !important;
      border-radius: 12px !important;
      margin-bottom: 24px !important;
      border: 1px solid rgba(243, 207, 152, 0.3) !important;
    }
    body#layout .layout-admin-header h2 {
      margin: 0 0 6px 0 !important;
      color: #f3cf98 !important;
      font-size: 20px !important;
    }
    body#layout .layout-admin-header p {
      margin: 0 !important;
      font-size: 13px !important;
      opacity: 0.9 !important;
    }
    body#layout .layout-section {
      display: block !important;
      margin-bottom: 20px !important;
      background: #ffffff !important;
      border: 2px dashed #94a3b8 !important;
      border-radius: 10px !important;
      padding: 16px !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
    }
  ]]></b:skin>

  <!-- Tailwind & Boutique CSS Stylesheet -->
  <style type='text/css'>
  /*<![CDATA[*/
${sanitizedCss}
  /*]]>*/
  </style>

  <!-- Schema.org JSON-LD Structured Data -->
  <script type='application/ld+json'>
  //<![CDATA[
${jsonLd}
  //]]>
  </script>

  <!-- Instant Clean URL Upgrade -->
  <script type='text/javascript'>
  //<![CDATA[
  try {
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      var cleanRoute = window.location.hash.replace(/^#\/?/, '/');
      if (window.history.replaceState) {
        window.history.replaceState(null, '', cleanRoute);
      }
    }
  } catch(e) {}
  //]]>
  </script>
</head>
<body class='bg-[#120407] text-[#fff7f2] font-sans antialiased overflow-x-hidden'>

  <!-- LIVE REACT APPLICATION CONTAINER -->
  <div id='santosh-root'></div>
  <div id='root'></div>

  <!-- ======================================================= -->
  <!-- BLOGGER LAYOUT ADMIN SECTIONS (EDIT ALL OPTIONS HERE)   -->
  <!-- In Blogger Admin > Layout, each section will show an     -->
  <!-- [Edit] button so you can change phone, prices, address! -->
  <!-- ======================================================= -->
  <div id='blogger-layout-container'>

    <div class='layout-admin-header'>
      <h2>🪡 Santosh Boutique - Visual Layout CMS Dashboard</h2>
      <p>Neeche diye gaye har section me <b>[Edit]</b> par click karke WhatsApp number, Calling Phone, Starting Prices, Address, aur Announcements change kar sakte hain!</p>
    </div>

    <!-- 0. REAL-TIME BOOKINGS & GOOGLE SHEETS AUTOMATION -->
    <b:section class='layout-section' id='sec-orders' name='0. 📋 Customer Orders &amp; Google Sheets Automation' showaddelement='yes'>
      <b:widget id='HTML100' locked='false' title='Bookings Automation &amp; Google Sheets' type='HTML' version='2'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[webhookUrl: 
instructions: Customer bookings Google Sheets me auto-sync karne ke liye apna Apps Script Webhook URL paste karein.]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <div class='cms-block' data-key='orders'>
            <data:content/>
          </div>
        </b:includable>
      </b:widget>
    </b:section>

    <!-- 1. STUDIO CONTACT & WHATSAPP SETTINGS -->
    <b:section class='layout-section' id='sec-contact' name='1. 📱 Studio Contact &amp; WhatsApp Settings' showaddelement='yes'>
      <b:widget id='HTML101' locked='false' title='WhatsApp &amp; Calling Numbers' type='HTML' version='2'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[whatsapp: 919418103213
phone: +91 94181 03213
hours: 9:00 AM - 8:00 PM (Everyday)]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <div class='cms-block' data-key='contact'>
            <data:content/>
          </div>
        </b:includable>
      </b:widget>
    </b:section>

    <!-- 2. HERO BANNER & TAGLINES -->
    <b:section class='layout-section' id='sec-hero' name='2. ✨ Hero Banner &amp; Tagline' showaddelement='yes'>
      <b:widget id='HTML102' locked='false' title='Hero Banner Texts' type='HTML' version='2'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[heroHeadline: Stitching Your Dreams With Care
heroSubtitle: Traditional Designs • Modern Styles • Perfect Fit
heroTagline: Near Baba Balak Nath Temple, Fatoh, Bilaspur (H.P.)]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <div class='cms-block' data-key='hero'>
            <data:content/>
          </div>
        </b:includable>
      </b:widget>
    </b:section>

    <!-- 3. SERVICES & STARTING PRICES -->
    <b:section class='layout-section' id='sec-pricing' name='3. 🏷️ Services &amp; Starting Prices' showaddelement='yes'>
      <b:widget id='HTML103' locked='false' title='Starting Prices' type='HTML' version='2'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[priceSuit: ₹350 onwards
priceBlouse: ₹400 onwards
priceAlteration: ₹80 onwards
priceLehenga: ₹1200 onwards]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <div class='cms-block' data-key='pricing'>
            <data:content/>
          </div>
        </b:includable>
      </b:widget>
    </b:section>

    <!-- 4. LOCATION & LANDMARK -->
    <b:section class='layout-section' id='sec-location' name='4. 📍 Studio Address &amp; Maps' showaddelement='yes'>
      <b:widget id='HTML104' locked='false' title='Address &amp; Landmark Details' type='HTML' version='2'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[address: Fatoh, Near Radha Soami Satsang Beas, Bilaspur, Himachal Pradesh - 174004 (GPS: 31°24'45.5"N 76°44'40.1"E)
landmark: Near Radha Soami Satsang Beas & Gram Panchayat Fatoh (Coordinates: 31°24'45.5"N 76°44'40.1"E)
mapsUrl: https://maps.google.com/?q=31.412639,76.744472]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <div class='cms-block' data-key='location'>
            <data:content/>
          </div>
        </b:includable>
      </b:widget>
    </b:section>

    <!-- 5. TOP ANNOUNCEMENT BAR -->
    <b:section class='layout-section' id='sec-announcement' name='5. 📢 Top Announcement / Notice' showaddelement='yes'>
      <b:widget id='HTML105' locked='false' title='Top Notification Banner' type='HTML' version='2'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[announcement: Festive Season Stitching Slots Open | Express 24-48h Alteration Service]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <div class='cms-block' data-key='announcement'>
            <data:content/>
          </div>
        </b:includable>
      </b:widget>
    </b:section>

    <!-- 6. ADSENSE & EXTRA GADGETS -->
    <b:section class='layout-section' id='sec-gadgets' name='6. 💰 Google AdSense &amp; Extra Widgets' showaddelement='yes'>
      <b:widget id='Blog1' locked='true' title='Blog Core System' type='Blog' version='2'>
        <b:includable id='main'>
          <!-- Clean container: prevents blog posts from corrupting standalone React UI -->
        </b:includable>
      </b:widget>
    </b:section>

  </div>

  <!-- Single File React Application Logic -->
  <script type='text/javascript'>
  //<![CDATA[
${sanitizedJs}
  //]]>
  </script>
</body>
</html>
`;

fs.writeFileSync(outXmlPath, bloggerXml, 'utf8');
console.log(`\nSUCCESS! Generated Blogger theme with Full Layout CMS: ${outXmlPath}`);
console.log(`File size: ${(fs.statSync(outXmlPath).size / 1024).toFixed(2)} KB`);
