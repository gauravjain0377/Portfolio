import { headers } from 'next/headers'

export default function robots() {
  const h = headers();
  const protocol = h.get('x-forwarded-proto') ?? 'https'
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000'
  const base = `${protocol}://${host}`

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/test', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
} 