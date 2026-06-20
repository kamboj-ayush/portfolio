'use client';

import * as React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSiteConfig } from '@/lib/profile';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const [isVisible, setIsVisible] = React.useState(false);
  const siteConfig = getSiteConfig();

  React.useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!siteConfig.features.showBackToTop) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      size="sm"
      className={cn(
        'fixed bottom-8 right-8 h-12 w-12 rounded-full p-0 shadow-lg transition-all duration-300 z-40',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-16 pointer-events-none'
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
