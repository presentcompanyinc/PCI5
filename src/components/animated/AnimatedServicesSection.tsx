'use client';

/**
 * AnimatedServicesSection - Services with wiggle effect and parallax
 * Animation: Service items wiggle on hover + "What is PCI" parallax with squiggle animation
 */

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const SQUIGGLY_LINE = '/assets/services-list-squiggly-line.svg';

const services = [
  'Theme Songs',
  'Custom Music',
  'Music Supervision',
  'Sync Licensing',
  'Activations',
];

function AnimatedServiceItem({
  children,
  rotation,
}: {
  children: React.ReactNode;
  rotation: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const squiggleRef = useRef(null);
  const squiggleInView = useInView(squiggleRef, { once: true, amount: 0.3 });

  const wiggleVariants = {
    hover: {
      rotate: [rotation, rotation - 1, rotation + 1, rotation - 1, rotation + 1, rotation],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 0.2
      }
    }
  };

  return (
    <>
      {/* Text with wiggle on hover */}
      <motion.div 
        className="flex items-center justify-center w-full cursor-pointer"
        variants={wiggleVariants}
        animate={isHovered ? "hover" : ""}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
        style={{ transform: 'rotate(0.5deg)' }}
      >
        <div className="w-full relative" style={{ height: 'var(--squiggle-2)' }}>
          <svg 
            className="w-full h-full" 
            viewBox="0 0 100 6" 
            preserveAspectRatio="none"
          >
            {/* Squiggle with ~8 bumps/hills matching the wave frequency */}
            <motion.path
              d="M0,3 Q6.25,0 12.5,3 T25,3 T37.5,3 T50,3 T62.5,3 T75,3 T87.5,3 T100,3"
              stroke="#000"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={squiggleInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeInOut" }}
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

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row flex-wrap items-start justify-between w-full"
      style={{
        gap: 'var(--padding-gap-large)',
        padding: '48px var(--padding-lr)'
      }}
      data-name="Services"
    >
      {/* Description with Parallax */}
      <motion.div 
        className="flex flex-col items-start w-full md:max-w-[600px]"
        style={{ gap: 'var(--padding-gap-large)' }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          style={{ transform: 'rotate(359.75deg)' }}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p 
            className="font-pci-sans-bold text-black leading-normal"
            style={{ fontSize: 'var(--text-header)' }}
          >
            WHAT IS PCI?
          </p>
        </motion.div>

        <motion.div 
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
            A one-stop shop for all your music needs. A music house with an off-beat library, production services, and the ability to tailor to your project's creative goals.

          </p>
        </motion.div>
      </motion.div>

      {/* Services List with Wiggle */}
      <div 
        className="flex flex-col items-start w-full md:flex-1 md:max-w-[459px] md:min-w-[300px]"
        style={{ gap: 'var(--padding-gap)' }}
      >
        <AnimatedServiceItem rotation={0.5}>{services[0]}</AnimatedServiceItem>
        <AnimatedServiceItem rotation={359.75}>{services[1]}</AnimatedServiceItem>
        <AnimatedServiceItem rotation={0.5}>{services[2]}</AnimatedServiceItem>
        <AnimatedServiceItem rotation={359.5}>{services[3]}</AnimatedServiceItem>
        <AnimatedServiceItem rotation={359.75}>{services[4]}</AnimatedServiceItem>
      </div>
    </div>
  );
}

