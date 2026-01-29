'use client';

import { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';

type SectionType = 'light' | 'dark';

/**
 * Hook to detect if the FloatingDock is over a light or dark section
 * Returns 'light' for bright backgrounds, 'dark' for dark backgrounds
 *
 * Optimized with throttling to prevent excessive re-renders
 */
export function useSectionDetection(): SectionType {
  const [currentSection, setCurrentSection] = useState<SectionType>('light');
  const { scrollY } = useScroll();

  useEffect(() => {
    let rafId: number | null = null;
    let lastCheck = 0;
    const CHECK_INTERVAL = 100; // Throttle: check every 100ms

    const detectSection = (_value: number) => {
      const now = Date.now();
      if (now - lastCheck < CHECK_INTERVAL) return;
      lastCheck = now;

      // Dock position (top on desktop, bottom on mobile)
      const dockPosition = typeof window !== 'undefined' && window.innerWidth >= 768
        ? 80
        : typeof window !== 'undefined'
          ? window.innerHeight - 100
          : 100;

      const sections = document.querySelectorAll('section, div[role="region"]');

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= dockPosition && rect.bottom >= dockPosition) {
          const bg = window.getComputedStyle(section).backgroundColor;
          const rgb = bg.match(/\d+/g);

          if (rgb) {
            const [r, g, b] = rgb.map(Number);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            const newType: SectionType = brightness > 200 ? 'light' : 'dark';
            if (newType !== currentSection) {
              setCurrentSection(newType);
            }
          }
          break;
        }
      }
    };

    const unsubscribe = scrollY.on('change', (value) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => detectSection(value));
    });

    detectSection(scrollY.get());

    return () => {
      unsubscribe();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollY, currentSection]);

  return currentSection;
}
