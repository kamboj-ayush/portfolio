'use client';

import { useScrollProgress } from '@/hooks';
import { getSiteConfig } from '@/lib/profile';

export function ScrollProgress() {
  const progress = useScrollProgress();
  const siteConfig = getSiteConfig();

  if (!siteConfig.features.showScrollProgress) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 transition-all duration-150"
      style={{ width: `${progress}%` }}
    />
  );
}
