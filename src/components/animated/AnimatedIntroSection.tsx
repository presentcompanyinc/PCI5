'use client';

/**
 * AnimatedIntroSection - Intro text with staggered reveal animation
 * Animation 1: Page Load Staggered Text Reveal (0.4s duration, 0.12s stagger)
 */

import { motion } from 'framer-motion';

export function AnimatedIntroSection() {
  const text = "Made-to-measure music from artists with years of experience. We deliver with precision, quality and exceptional value for projects that demand novel creativity and professional standards.";
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06, // 2x faster: 0.06s stagger delay
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2, // 2x faster: 0.2s duration
        ease: [0.43, 0.13, 0.23, 0.96] as const
      }
    },
  };

  return (
    <div 
      className="flex flex-col items-start justify-end w-full" 
      style={{
        padding: '24px var(--padding-lr)'
      }}
      data-name="Intro Text"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center leading-[1.15] w-full text-black font-pci-sans-bold"
        style={{
          fontSize: 'var(--text-paragraph)',
          maxWidth: 'var(--max-width)'
        }}
      >
        <p className="leading-[1.15]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </div>
  );
}

