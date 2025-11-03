'use client';

/**
 * AnimatedIntroSection - Intro text with quick, smooth fade-in
 * Uses a simple fade-in that works smoothly with ScrollFadeWrapper
 */

import { motion } from 'framer-motion';

export function AnimatedIntroSection() {
  return (
    <div 
      className="flex flex-col items-start justify-end w-full" 
      style={{
        padding: '24px var(--padding-lr)'
      }}
      data-name="Intro Text"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
        className="flex flex-col justify-center leading-[1.15] w-full text-black font-pci-sans-bold"
        style={{
          fontSize: 'var(--text-paragraph)',
          maxWidth: 'var(--max-width)'
        }}
      >
        <p className="leading-[1.15]">
          Made-to-measure music from artists with years of experience. We deliver with precision, quality and exceptional value for projects that demand novel creativity and professional standards.
        </p>
      </motion.div>
    </div>
  );
}

