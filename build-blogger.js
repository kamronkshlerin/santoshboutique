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

console.log(`Extracted:
- CSS length: ${inlineCss.length} bytes
- JSON-LD length: ${jsonLd.length} bytes
- JS Bundle length: ${jsBundle.length} bytes
`);

if (inlineCss.length === 0 || jsBundle.length === 0) {
  console.error('Error: Failed to extract CSS or JS bundle.');
  process.exit(1);
}

// Ensure no CDATA terminators exist in code
if (inlineCss.includes(']]>') || jsBundle.includes(']]>')) {
  console.warn('Warning: found "]]>" in CSS or JS, sanitizing for XML CDATA...');
}

const sanitizedCss = inlineCss.replace(/\]\]>/g, ']]]]><![CDATA[>');
const sanitizedJs = jsBundle.replace(/\]\]>/g, ']]]]><![CDATA[>');

// Clean XML-compliant theme
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
      background: #0D131A;
      color: #FAF6EF;
    }
    .status-msg-wrap, .widget, .blogger-header, .blog-feeds, .post-feeds, .header-widget {
      display: none !important;
    }
  ]]></b:skin>

  <!-- Tailwind & App Stylesheet -->
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
<body class='bg-boutique-navy text-boutique-cream selection:bg-boutique-gold/30 selection:text-white font-sans antialiased overflow-x-hidden'>

  <!-- React Root Container -->
  <div id='root'></div>

  <!-- Mandatory Blogger Section & Widget (Required by Blogger XML engine) -->
  <div style='display: none !important;'>
    <b:section class='main' id='main' showaddelement='no'>
      <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog' version='2' visible='false'/>
    </b:section>
  </div>

  <!-- React Application Bundle -->
  <script type='text/javascript'>
  //<![CDATA[
${sanitizedJs}
  //]]>
  </script>
</body>
</html>
`;

fs.writeFileSync(outXmlPath, bloggerXml, 'utf8');
console.log(`\nSUCCESS! Generated Blogger theme: ${outXmlPath}`);
console.log(`File size: ${(fs.statSync(outXmlPath).size / 1024).toFixed(2)} KB`);
