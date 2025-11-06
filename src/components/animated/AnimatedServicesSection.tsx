'use client';

/**
 * AnimatedServicesSection - Services with wiggle effect and parallax
 * Animation: Service items wiggle on hover + "What is PCI" parallax with squiggle animation
 */

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { generateOrganicSquiggle } from '@/utils/squiggleGenerator';
import { useTouchDevice } from '@/hooks/useTouchDevice';

const SQUIGGLY_LINE = '/assets/services-list-squiggly-line.svg';

const services = [
  'Theme Songs',
  'Custom Music',
  'Music Supervision',
  'Sync Licensing',
];

function AnimatedServiceItem({
  children,
  rotation,
  itemIndex,
  isTouchDevice,
}: {
  children: React.ReactNode;
  rotation: number;
  itemIndex: number;
  isTouchDevice: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef(null);
  const squiggleRef = useRef(null);
  const textInView = useInView(textRef, { once: true, amount: 0.5 });
  const squiggleInView = useInView(squiggleRef, { once: true, amount: 0.3 });
  
  // Generate organic squiggle path (consistent per service item)
  const squigglePath = useMemo(() => {
    return generateOrganicSquiggle(
      2000 + itemIndex * 17, // Smaller seed variation for more uniformity
      4, // Fewer waves (same as menubar) - prevents too many bumps
      0.35, // Reduced amplitude variation to prevent cutoff
      0.35 // Moderate frequency variation
    );
  }, [itemIndex]);

  const wiggleVariants = {
    hover: {
      rotate: [rotation, rotation - 1, rotation + 1, rotation - 1, rotation + 1, rotation],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 0.2
      }
    },
    scrollTrigger: {
      rotate: [rotation, rotation - 1, rotation + 1, rotation - 1, rotation + 1, rotation],
      transition: {
        duration: 0.5,
        repeat: 2
      }
    }
  };

  return (
    <>
      {/* Text with wiggle on hover or scroll trigger */}
      <motion.div 
        ref={textRef}
        className="flex items-center justify-center w-full"
        variants={wiggleVariants}
        animate={isTouchDevice ? (textInView ? "scrollTrigger" : "") : (isHovered ? "hover" : "")}
        onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
        onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <p 
          className="font-pci-sans-bold text-black leading-normal w-full"
          style={{ fontSize: 'var(--text-menu)' }}
        >
          {children}
        </p>
      </motion.div>
      
      {/* Squiggle that animates in once on scroll */}
      <div 
        ref={squiggleRef}
        className="flex items-center justify-center w-full" 
        style={{ transform: 'rotate(0.5deg)', overflow: 'visible' }}
      >
        <div className="w-full relative" style={{ height: 'var(--squiggle-2)', overflow: 'visible' }}>
          <svg 
            className="w-full" 
            style={{ height: 'var(--squiggle-2)', overflow: 'visible' }}
            viewBox="0 -3 100 12" 
            preserveAspectRatio="none"
          >
            <defs>
              {/* Subtle texture filter for hand-drawn effect - reduced by 25% */}
              <filter id={`pencil-texture-service-${itemIndex}`}>
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" seed={itemIndex} />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.225" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              {/* Mask for pen-like tapering at ends */}
              <mask id={`taper-mask-service-${itemIndex}`}>
                <linearGradient id={`taper-gradient-service-${itemIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="black" />
                  <stop offset="2%" stopColor="white" />
                  <stop offset="98%" stopColor="white" />
                  <stop offset="100%" stopColor="black" />
                </linearGradient>
                <rect x="0" y="-3" width="100" height="12" fill={`url(#taper-gradient-service-${itemIndex})`} />
              </mask>
            </defs>
            {/* Organic hand-drawn squiggle with tapering */}
            <motion.path
              d={squigglePath}
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              mask={`url(#taper-mask-service-${itemIndex})`}
              style={{
                filter: `url(#pencil-texture-service-${itemIndex})`
              }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={squiggleInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] as const }}
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export function AnimatedServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isTouchDevice = useTouchDevice();

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row flex-wrap items-start justify-between w-full"
      style={{
        gap: 'var(--padding-gap-large)',
        padding: '48px var(--padding-lr)',
        overflow: 'visible'
      }}
      data-name="Services"
    >
      {/* Description with Parallax */}
      <motion.div 
        className="flex flex-col items-start w-full md:flex-shrink-0"
        style={{ gap: 'var(--padding-gap-large)' }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0, 0, 0.58, 1] as const }}
      >
        <motion.div 
          className="w-full md:w-auto md:min-w-fit"
          style={{ transform: 'rotate(359.75deg)' }}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p 
            className="font-pci-sans-bold text-black leading-normal whitespace-nowrap"
            style={{ fontSize: 'var(--text-header)' }}
          >
            HERE'S WHAT WE DO
          </p>
        </motion.div>

        <motion.div 
          className="w-full md:max-w-[600px]"
          style={{ transform: 'rotate(0.25deg)' }}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p
            className="font-pci-sans-bold text-black leading-normal"
            style={{ 
              fontSize: 'var(--text-paragraph)',
              fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" 
            }}
          >
            We've written iconic themes for award winning podcasts and hit television shows, original songs for cutting edge dramas, and gripping underscore for cult classics. What can we do for you?

          </p>
        </motion.div>
      </motion.div>

      {/* Services List with Wiggle */}
      <div 
        className="flex flex-col items-start w-full md:flex-1 md:max-w-[459px] md:min-w-[300px]"
        style={{ gap: 'var(--padding-gap)', overflow: 'visible' }}
      >
        <AnimatedServiceItem rotation={0.5} itemIndex={0} isTouchDevice={isTouchDevice}>{services[0]}</AnimatedServiceItem>
        <AnimatedServiceItem rotation={359.75} itemIndex={1} isTouchDevice={isTouchDevice}>{services[1]}</AnimatedServiceItem>
        <AnimatedServiceItem rotation={0.5} itemIndex={2} isTouchDevice={isTouchDevice}>{services[2]}</AnimatedServiceItem>
        <AnimatedServiceItem rotation={359.5} itemIndex={3} isTouchDevice={isTouchDevice}>{services[3]}</AnimatedServiceItem>
      </div>
    </div>
  );
}

