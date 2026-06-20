'use client';

import { useState, useEffect } from 'react';
import { CommandPalette } from './command-palette';
import { getSiteConfig } from '@/lib/profile';

export function CommandPaletteProvider() {
  const [isOpen, setIsOpen] = useState(false);
  const siteConfig = getSiteConfig();

  useEffect(() => {
    // Check if command palette is enabled
    if (!siteConfig.features.showCommandPalette) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [siteConfig.features.showCommandPalette]);

  if (!siteConfig.features.showCommandPalette) {
    return null;
  }

  return <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
