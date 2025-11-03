'use client';

/**
 * ScrollFadeWrapper - Wrapper component that fades children as they scroll near viewport edges
 * Creates smooth fade in/out effect at top and bottom of viewport
 */

import { motion } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useScrollFade } from '@/hooks/useScrollFade';

interface ScrollFadeWrapperProps {
  children: ReactNode;
  /** Start fade when element is this % into viewport (0-1) */
  fadeInStart?: number;
  /** End fade when element is this % through viewport (0-1) */
  fadeOutEnd?: number;
  /** Minimum opacity (default: 0) */
  minOpacity?: number;
  /** CSS classes to apply to wrapper */
  className?: string;
  /** Enable/disable the effect (useful for testing) */
  enabled?: boolean;
}

export function ScrollFadeWrapper({
  children,
  fadeInStart = 0.2,
  fadeOutEnd = 0.8,
  minOpacity = 0,
  className = '',
  enabled = true,
}: ScrollFadeWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { opacity } = useScrollFade({
    target: ref,
    fadeInStart,
    fadeOutEnd,
    minOpacity,
    maxOpacity: 1,
  });

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, overflow: 'visible' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

