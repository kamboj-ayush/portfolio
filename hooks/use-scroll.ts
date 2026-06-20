'use client';

import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalHeight = documentHeight - windowHeight;
      const currentProgress = (scrollTop / totalHeight) * 100;

      setProgress(currentProgress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';

      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }

      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
}

export function useScrollTop() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const updateScrollTop = () => {
      setIsAtTop(window.scrollY < 10);
    };

    window.addEventListener('scroll', updateScrollTop);
    updateScrollTop();

    return () => window.removeEventListener('scroll', updateScrollTop);
  }, []);

  return isAtTop;
}
