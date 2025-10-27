'use client';

/**
 * AnimatedDividerSection - Memphis-style dividers with simple fade-in
 * Animation 2: Divider Fade-In (using actual SVG files)
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const DIVIDER_RED_BLOBS = '/assets/PCI_Divider_1.svg';
const DIVIDER_TEAL = '/assets/Divider2.svg';
const DIVIDER_BLUE = '/assets/Divider3.svg';
const DIVIDER_OLIVE = '/assets/PCI_Divider_4.svg';
const DIVIDER_PURPLE = '/assets/Divider 5.svg';

interface AnimatedDividerSectionProps {
  variant?: 'red' | 'teal' | 'blue' | 'olive' | 'purple';
}

export function AnimatedDividerSection({ variant = 'red' }: AnimatedDividerSectionProps) {
  const ref = useRef(null);
  // Trigger when divider reaches center of viewport (50% visible)
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const config = {
    red: {
      bgColor: 'bg-[#f37d7d]',
      imgSrc: DIVIDER_RED_BLOBS,
      aspectRatio: '3546/282.001',
    },
    teal: {
      bgColor: 'bg-[#afbab6]',
      imgSrc: DIVIDER_TEAL,
      aspectRatio: '2838/175',
    },
    blue: {
      bgColor: 'bg-[#03bed8]',
      imgSrc: DIVIDER_BLUE,
      aspectRatio: '2838/175',
    },
    olive: {
      bgColor: 'bg-[#666a47]',
      imgSrc: DIVIDER_OLIVE,
      aspectRatio: '6001.53/482.588',
    },
    purple: {
      bgColor: 'bg-[#8b5fbf]',
      imgSrc: DIVIDER_PURPLE,
      aspectRatio: '2838/175',
    },
  };

  const { bgColor, imgSrc, aspectRatio } = config[variant];

  return (
    <motion.div 
      ref={ref} 
      className="flex flex-col items-start w-full min-w-full overflow-hidden relative"
      data-name="Divider"
    >
      {/* Animated background color that fades in with the SVG */}
      <motion.div
        className={`absolute inset-0 ${bgColor}`}
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

