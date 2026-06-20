import { MetadataRoute } from 'next';
import { getPersonalInfo, getSEOConfig } from '@/lib/profile';

export default function manifest(): MetadataRoute.Manifest {
  const personalInfo = getPersonalInfo();
  const seo = getSEOConfig();

  return {
    name: `${personalInfo.name} - ${personalInfo.role}`,
    short_name: personalInfo.name,
    description: seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icon?size=192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon?size=512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
