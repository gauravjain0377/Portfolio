// scripts/generate-sitemap.js
const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const path = require('path');

// Your domain (fallback if needed)
const siteUrl = process.env.SITE_URL || 'https://www.gaurav-jain.me';

// List all your routes manually or dynamically
const pages = [
  '/',
  '/work',
  '/about',
  '/contact'
];

(async () => {
  const smStream = new SitemapStream({ hostname: siteUrl });
  pages.forEach((page) => {
    smStream.write({ url: page, changefreq: 'daily', priority: page === '/' ? 1.0 : 0.8 });
  });
  smStream.end();

  const sitemapOutput = await streamToPromise(smStream);
  const sitemapPath = path.resolve('./public/sitemap.xml');

  // Ensure public directory exists
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
  }

  fs.writeFileSync(sitemapPath, sitemapOutput.toString());
  console.log('✅ Sitemap generated at public/sitemap.xml');
})();
