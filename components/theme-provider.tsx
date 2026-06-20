'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';
import { getThemeConfig } from '@/lib/profile';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const themeConfig = getThemeConfig();

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={themeConfig.defaultTheme}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
