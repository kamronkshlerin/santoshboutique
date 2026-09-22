import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distHtmlPath = path.join(__dirname, 'dist', 'index.html');
const outXmlPath = path.join(__dirname, 'blogger-theme.xml');

if (!fs.existsSync(distHtmlPath)) {
  console.error('dist/index.html not found!');
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
  <title>Santosh Boutique &amp; Stitching Studio | Ladies Fashion &amp; Custom Tailoring Bilaspur</title>

  <meta content='Santosh Boutique &amp; Stitching Studio in Bilaspur (HP) near Baba Balak Nath Temple, Sarti. Premium suit stitching, designer bridal blouses, custom tailoring, and express alteration services.' name='description'/>
  <meta content='Santosh Boutique, Boutique Bilaspur, Ladies Tailor Sarti Bilaspur, Designer Blouse Bilaspur, Suit Stitching Himachal, Tailor near Baba Balak Nath Temple' name='keywords'/>

  <!-- Open Graph -->
  <meta content='website' property='og:type'/>
  <meta content='Santosh Boutique &amp; Stitching Studio' property='og:title'/>
  <meta content='Exquisite bespoke tailoring, designer bridal couture &amp; master alterations in Bilaspur, Himachal Pradesh.' property='og:description'/>
  <meta content='https://cdn.jsdelivr.net/gh/kamronkshlerin/santoshboutique@dffa8f8/public/images/hero.jpg' property='og:image'/>

  <!-- Google Fonts -->
  <link href='https://fonts.googleapis.com' rel='preconnect'/>
  <link crossorigin='anonymous' href='https://fonts.gstatic.com' rel='preconnect'/>
  <link href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&amp;family=Plus+Jakarta+Sans:wght@300;400;500;600;700&amp;display=swap' rel='stylesheet'/>

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
    .status-msg-wrap, .blogger-header, .blog-feeds, .post-feeds, .header-widget {
      display: none !important;
    }
    /* Hide CMS config raw data block on live website, visible to Layout Engine */
    #blogger-layout-container {
      display: none !important;
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
</head>
<body class='bg-[#120407] text-[#fff7f2] font-sans antialiased overflow-x-hidden'>

  <!-- LIVE REACT APPLICATION CONTAINER -->
  <div id='root'></div>

  <!-- ======================================================= -->
  <!-- BLOGGER LAYOUT ADMIN SECTIONS (EDIT ALL OPTIONS HERE)   -->
  <!-- In Blogger Admin > Layout, each section will show an     -->
  <!-- [Edit] button so you can change phone, prices, address! -->
  <!-- ======================================================= -->
  <div id='blogger-layout-container'>

    <!-- 1. STUDIO CONTACT & WHATSAPP SETTINGS -->
    <b:section class='layout-section' id='sec-contact' name='1. 📱 Studio Contact &amp; WhatsApp Settings' showaddelement='yes'>
      <b:widget id='HTML101' locked='false' title='WhatsApp &amp; Calling Numbers' type='HTML' version='2'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[whatsapp: 919816000000
phone: +91 98160 00000
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
heroTagline: Near Baba Balak Nath Temple, Sarti, Bilaspur (H.P.)]]></b:widget-setting>
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
          <b:widget-setting name='content'><![CDATA[address: Near Baba Balak Nath Temple, Sarti, Bilaspur, Himachal Pradesh - 174004
landmark: Directly near Baba Balak Nath Temple, Sarti
mapsUrl: https://maps.google.com/?q=Baba+Balak+Nath+Temple+Sarti+Bilaspur+Himachal+Pradesh+174004]]></b:widget-setting>
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
      <b:widget id='Blog1' locked='true' title='Blog Core System' type='Blog' version='2' visible='false'/>
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
