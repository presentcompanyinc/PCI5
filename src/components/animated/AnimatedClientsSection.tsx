'use client';

/**
 * AnimatedClientsSection - Client logos with pop animation on scroll
 * Animation 4: Logo Pop Sequence on Scroll
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Existing client logos
const IMG_ABC = '/assets/ABC.svg';
const IMG_NBC = '/assets/NBC.svg';
const IMG_NETFLIX = '/assets/Netflix.svg';
const IMG_HBO = '/assets/HBO.svg';
const IMG_PARAMOUNT = '/assets/Paramount.svg';
const IMG_DISNEY = '/assets/Disney.svg';
const IMG_CBS = '/assets/CBS.svg';

// New client logos
const IMG_AUDIBLE = '/assets/Audible.png';
const IMG_BBC = '/assets/BBC-Logo.png';
const IMG_CARTOON_NETWORK = '/assets/Cartoon-Network-Logo.png';
const IMG_FX = '/assets/FX_Networks_logo.svg.png';
const IMG_FOX = '/assets/Fox_Broadcasting_Company_logo_(2019).svg.png';
const IMG_HULU = '/assets/hulu-logo-black-transparent.png';
const IMG_IFC = '/assets/IFC_2018_logo.svg.png';
const IMG_MCSWEENEYS = '/assets/McSweeneys.png';
const IMG_NEON = '/assets/Neon-Logo.png';

export function AnimatedClientsSection() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row1InView = useInView(row1Ref, { once: true, amount: 0.3 });
  const row2InView = useInView(row2Ref, { once: true, amount: 0.3 });

  // Row 1: Scrolls left to right (normal direction)
  const row1Logos = [
    { src: IMG_ABC, alt: "ABC" },
    { src: IMG_NETFLIX, alt: "Netflix" },
    { src: IMG_PARAMOUNT, alt: "Paramount" },
    { src: IMG_CBS, alt: "CBS" },
    { src: IMG_AUDIBLE, alt: "Audible" },
    { src: IMG_CARTOON_NETWORK, alt: "Cartoon Network" },
    { src: IMG_FOX, alt: "Fox Broadcasting" },
    { src: IMG_HULU, alt: "Hulu" },
  ];

  // Row 2: Scrolls right to left (reverse direction)
  const row2Logos = [
    { src: IMG_NBC, alt: "NBC" },
    { src: IMG_HBO, alt: "HBO" },
    { src: IMG_DISNEY, alt: "Disney" },
    { src: IMG_BBC, alt: "BBC" },
    { src: IMG_FX, alt: "FX Networks" },
    { src: IMG_IFC, alt: "IFC" },
    { src: IMG_MCSWEENEYS, alt: "McSweeney's" },
    { src: IMG_NEON, alt: "Neon" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1] as const, // Bounce easing
      },
    },
  };

  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start justify-end w-full" 
      style={{ padding: '48px 0' }}
      data-name="Selected Clients"
    >
      {/* Title */}
      <div 
        className="flex items-center justify-center w-full"
        style={{ padding: '0 var(--padding-lr)', gap: '10px', marginBottom: '24px' }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <p 
            className="font-pci-sans-bold text-black leading-normal uppercase"
            style={{ fontSize: 'var(--text-header)' }}
          >
            Selected Clients
          </p>
        </div>
      </div>

      {/* Dual-Row Client Logos with Pop Animation and Scrolling */}
      <div className="w-full flex flex-col" style={{ gap: 'var(--padding-gap-large)' }}>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-33.333%); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(-33.333%); }
            100% { transform: translateX(0%); }
          }
        `}</style>

        {/* Row 1: Scrolls left to right with pop animation */}
        <div className="w-full overflow-hidden" style={{ padding: '0 var(--padding-lr)' }}>
          <motion.div
            ref={row1Ref}
            variants={containerVariants}
            initial="hidden"
            animate={row1InView ? "visible" : "hidden"}
            className="flex items-center"
            style={{ 
              animation: row1InView ? 'marquee 12s linear infinite' : 'none',
              gap: 'var(--padding-gap-large)',
              willChange: 'transform'
            }}
          >
            {/* Render logos 3 times for seamless infinite loop */}
            {[...Array(3)].map((_, setIndex) => (
              row1Logos.map((logo, index) => (
                <motion.div 
                  key={`row1-set${setIndex}-${index}`}
                  variants={setIndex === 0 ? itemVariants : {}}
                  className="relative shrink-0 w-[79px] md:w-[105px] lg:w-[118px] aspect-square"
                >
                  <img 
                    alt={logo.alt} 
                    className="w-full h-full object-contain" 
                    src={logo.src} 
                  />
                </motion.div>
              ))
            ))}
          </motion.div>
        </div>

        {/* Row 2: Scrolls right to left with pop animation */}
        <div className="w-full overflow-hidden" style={{ padding: '0 var(--padding-lr)' }}>
          <motion.div
            ref={row2Ref}
            variants={containerVariants}
            initial="hidden"
            animate={row2InView ? "visible" : "hidden"}
            className="flex items-center"
            style={{ 
              animation: row2InView ? 'marquee-reverse 12s linear infinite' : 'none',
              gap: 'var(--padding-gap-large)',
              willChange: 'transform'
            }}
          >
            {/* Render logos 3 times for seamless infinite loop */}
            {[...Array(3)].map((_, setIndex) => (
              row2Logos.map((logo, index) => (
                <motion.div 
                  key={`row2-set${setIndex}-${index}`}
                  variants={setIndex === 0 ? itemVariants : {}}
                  className="relative shrink-0 w-[79px] md:w-[105px] lg:w-[118px] aspect-square"
                >
                  <img 
                    alt={logo.alt} 
                    className="w-full h-full object-contain" 
                    src={logo.src} 
                  />
                </motion.div>
              ))
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

