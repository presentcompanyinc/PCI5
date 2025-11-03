'use client';

import { useEffect, useState, RefObject } from 'react';
import { useInView } from 'framer-motion';

/**
 * Hook to track when a work card scrolls into and out of view
 * Used for triggering image transitions on touch devices
 * Returns isInView (current state) and hasBeenInView (ever been in view)
 */
export function useWorkCardInView(ref: RefObject<HTMLElement>) {
  const isInView = useInView(ref, { 
    amount: 0.3, // Trigger when 30% of element is visible
    margin: '-50px' // Add some offset for better trigger timing
  });
  
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (isInView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [isInView, hasBeenInView]);

  return { isInView, hasBeenInView };
}

