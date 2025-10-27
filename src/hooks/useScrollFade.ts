/**
 * useScrollFade - Custom hook for scroll-linked fade effect
 * Fades elements as they approach viewport edges (top/bottom)
 */

import { useScroll, useTransform } from 'framer-motion';
import { RefObject } from 'react';

interface UseScrollFadeOptions {
  /** Element reference to track */
  target: RefObject<HTMLElement>;
  /** Fade completes when element reaches this % into viewport (0-1, default: 0.2 = 20%) */
  fadeInStart?: number;
  /** Fade out begins when element reaches this % through viewport (0-1, default: 0.8 = 80%) */
  fadeOutEnd?: number;
  /** Minimum opacity value (default: 0) */
  minOpacity?: number;
  /** Maximum opacity value (default: 1) */
  maxOpacity?: number;
}

export function useScrollFade({
  target,
  fadeInStart = 0.2,
  fadeOutEnd = 0.8,
  minOpacity = 0,
  maxOpacity = 1,
}: UseScrollFadeOptions) {
  // Track scroll progress of the target element
  // offset: ["start end", "end start"] means:
  // - "start end": when element's top hits viewport bottom (entering)
  // - "end start": when element's bottom hits viewport top (exiting)
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to opacity
  // [0, fadeInStart, fadeOutEnd, 1] are scroll positions (0 = entering, 1 = exiting)
  // [minOpacity, maxOpacity, maxOpacity, minOpacity] are corresponding opacity values
  const opacity = useTransform(
    scrollYProgress,
    [0, fadeInStart, fadeOutEnd, 1],
    [minOpacity, maxOpacity, maxOpacity, minOpacity]
  );

  return { opacity, scrollYProgress };
}

