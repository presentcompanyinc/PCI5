'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the device is a touch device
 * Uses media query (hover: none) for reliable touch detection
 * Returns true for touch devices, false for devices with hover capability
 * 
 * SSR-safe: starts with false and updates on client-side mount
 */
export function useTouchDevice(): boolean {
  // Start with false for SSR, will update on client
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side
    setIsClient(true);
    
    // Fallback: check for touch support
    // msMaxTouchPoints is legacy IE/Edge property
    const legacyNavigator = navigator as Navigator & { msMaxTouchPoints?: number };
    const hasTouchScreen = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      (legacyNavigator.msMaxTouchPoints || 0) > 0;
    
    try {
      // Primary check: hover capability
      const touchQuery = window.matchMedia('(hover: none)');
      
      // Set initial value - prefer media query, fallback to touch detection
      setIsTouchDevice(touchQuery.matches || (hasTouchScreen && window.innerWidth < 1024));

      // Listen for changes (e.g., connecting/disconnecting external mouse)
      const handleChange = (e: MediaQueryListEvent) => {
        setIsTouchDevice(e.matches);
      };

      touchQuery.addEventListener('change', handleChange);

      return () => {
        touchQuery.removeEventListener('change', handleChange);
      };
    } catch (error) {
      // If matchMedia fails, use touch detection fallback (rare, but possible on very old browsers)
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('matchMedia not supported, using fallback touch detection', error);
      }
      setIsTouchDevice(hasTouchScreen);
    }
  }, []);

  return isClient ? isTouchDevice : false;
}

