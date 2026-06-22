import { MetadataRoute } from 'next';
import { getSEOConfig } from '@/lib/profile';

export default function robots(): MetadataRoute.Robots {
  const seo = getSEOConfig();
  const baseUrl = seo.siteUrl || 'https://ayushkamboj.dev';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
