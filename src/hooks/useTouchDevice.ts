'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the device is a touch device
 * Uses media query (hover: none) for reliable touch detection
 * Returns true for touch devices, false for devices with hover capability
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if hover is not available (indicates touch device)
    const touchQuery = window.matchMedia('(hover: none)');
    
    // Set initial value
    setIsTouchDevice(touchQuery.matches);

    // Listen for changes (e.g., connecting/disconnecting external mouse)
    const handleChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    touchQuery.addEventListener('change', handleChange);

    return () => {
      touchQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isTouchDevice;
}

