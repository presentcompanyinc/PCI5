'use client';

/**
 * AnimatedDividerSection - Memphis-style dividers with simple fade-in
 * Animation 2: Divider Fade-In (using actual SVG files)
 * Now with randomization support - pass an index (0-6) instead of variant
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useDividerRandomizer } from '@/contexts/DividerRandomizerContext';

interface AnimatedDividerSectionProps {
  index: number; // Index 0-6 to get a randomized divider
}

export function AnimatedDividerSection({ index }: AnimatedDividerSectionProps) {
  const ref = useRef(null);
  // Trigger when divider reaches center of viewport (50% visible)
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const { getDivider } = useDividerRandomizer();
  const { bgColor, imgSrc, aspectRatio } = getDivider(index);

  return (
    <motion.div 
      ref={ref} 
      className="flex flex-col items-start w-full min-w-full overflow-hidden relative"
      data-name="Divider"
    >
      {/* Animated background color that fades in with the SVG */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: bgColor }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ 
          duration: 0.6, 
          ease: [0, 0, 0.58, 1] as const
        }}
      />

      {/* Desktop divider */}
      <motion.div
        className="w-full relative lg:block hidden"
        style={{ aspectRatio }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          ease: [0, 0, 0.58, 1] as const
        }}
      >
        <img alt="" className="w-full h-auto" src={imgSrc} />
      </motion.div>

      {/* Mobile divider */}
      <motion.div
        className="w-full relative overflow-hidden lg:hidden h-[80px]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          ease: [0, 0, 0.58, 1] as const
        }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgSrc} />
      </motion.div>
    </motion.div>
  );
}

