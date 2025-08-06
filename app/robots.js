export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/test', '/api/'],
      },
    ],
    sitemap: 'https://www.gaurav-jain.me/sitemap.xml',
  }
} 