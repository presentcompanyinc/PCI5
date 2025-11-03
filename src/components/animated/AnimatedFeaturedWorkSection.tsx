'use client';

/**
 * AnimatedFeaturedWorkSection - Featured work with button wiggle on hover
 * Animation 6: Button Wiggle on Hover
 * Animation 3: Parallax Depth Effect
 * Scroll-linked fade applied to individual cards
 */

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useScrollFade } from '@/hooks/useScrollFade';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useWorkCardInView } from '@/hooks/useWorkCardInView';

const IMG_THE_PAPER = '/assets/PCI_ThePaper.jpg';
const IMG_THE_PAPER_OVERLAY = '/assets/PCI_ThePaper_NoTitle.jpg';
const IMG_ANYTHING_ROOTS = '/assets/PCI_RootsSquare.jpg';
const IMG_ANYTHING_ROOTS_OVERLAY = '/assets/PCI_RootsSquare_NoTitle.png';
const IMG_SERIAL = '/assets/PCI_Serial.jpg';
const IMG_SERIAL_OVERLAY = '/assets/PCI_Serial_NoTitle.jpg';
const ARROW = '/assets/arrow.svg';

interface WorkCardProps {
  cardRef: React.RefObject<HTMLDivElement>;
  imageSrc: string;
  imageOverlaySrc: string;
  alt: string;
  title: string;
  subtitle1: string;
  subtitle2: string;
  company: string;
  isTouchDevice: boolean;
  style?: React.CSSProperties;
  className?: string;
}

function WorkCard({
  cardRef,
  imageSrc,
  imageOverlaySrc,
  alt,
  title,
  subtitle1,
  subtitle2,
  company,
  isTouchDevice,
  style,
  className
}: WorkCardProps) {
  const { isInView } = useWorkCardInView(cardRef);
  const [showOverlay, setShowOverlay] = useState(false);
  
  useEffect(() => {
    if (!isTouchDevice) return;
    
    let timeoutId: NodeJS.Timeout;
    
    if (isInView) {
      // Wait 0.5s then show overlay (image B)
      timeoutId = setTimeout(() => {
        setShowOverlay(true);
      }, 500);
    } else {
      // Immediately show original image (image A) when scrolled out
      setShowOverlay(false);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView, isTouchDevice]);
  
  return (
    <motion.div 
      ref={cardRef}
      className={className}
      style={style}
    >
      <Image
        alt={alt}
        src={imageSrc}
        fill
        sizes="50vw"
        quality={90}
        className={`object-cover transition-all duration-300 ease-in-out ${
          isTouchDevice 
            ? (showOverlay ? 'opacity-0' : 'opacity-100')
            : 'group-hover:opacity-0'
        }`}
      />
      <Image
        alt={alt}
        src={imageOverlaySrc}
        fill
        sizes="50vw"
        quality={90}
        className={`object-cover transition-all duration-300 ease-in-out ${
          isTouchDevice 
            ? (showOverlay ? 'opacity-100' : 'opacity-0')
            : 'opacity-0 group-hover:opacity-100'
        }`}
      />
      <div className={`absolute inset-0 bg-[rgba(3,3,3,0.6)] transition-opacity duration-300 ease-in-out flex items-start justify-start p-[10px] ${
        isTouchDevice 
          ? (showOverlay ? 'opacity-100' : 'opacity-0')
          : 'opacity-0 group-hover:opacity-100'
      }`}>
        <div 
          className="flex flex-col w-full"
          style={{
            padding: 'var(--overlay-padding)',
            gap: 'var(--overlay-gap)'
          }}
        >
          <div className="flex flex-col gap-[13px]">
            <div className="w-full">
              <p 
                className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                style={{ fontSize: 'var(--text-overlay-title)' }}
              >
                {title}
              </p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p 
                className="font-pci-sans-bold text-[#cecece] leading-normal"
                style={{ fontSize: 'var(--text-overlay-subtitle)' }}
              >
                {subtitle1}
              </p>
              <p 
                className="font-pci-sans-bold text-[#cecece] leading-normal"
                style={{ fontSize: 'var(--text-overlay-subtitle)' }}
              >
                {subtitle2}
              </p>
            </div>
          </div>
          <div className="w-full">
            <p 
              className="font-pci-sans-bold text-[#cecece] leading-normal"
              style={{ fontSize: 'var(--text-overlay-subtitle)' }}
            >
              {company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AnimatedFeaturedWorkSection() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTouchDevice = useTouchDevice();
  
  // Refs for each card for scroll-fade effect
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Parallax effect for images
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]); // Main image - slower
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]); // Side images - faster
  
  // Scroll-fade for each individual card
  const { opacity: opacity1 } = useScrollFade({ target: card1Ref });
  const { opacity: opacity2 } = useScrollFade({ target: card2Ref });
  const { opacity: opacity3 } = useScrollFade({ target: card3Ref });
  
  // For touch devices: trigger button wiggle once on scroll into view
  const buttonInView = useInView(buttonRef, { once: true, amount: 0.5 });

  const handleViewMoreClick = () => {
    router.push('/work');
  };

  const wiggleVariants = {
    hover: {
      rotate: [0, -1, 1, -1, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 0.2
      }
    },
    scrollTrigger: {
      rotate: [0, -1, 1, -1, 1, 0],
      transition: {
        duration: 0.5,
        repeat: 2
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="bg-[#f2efea] flex flex-col items-start w-full" 
      style={{ gap: 'var(--padding-gap)' }}
      data-name="Latest Work Frame"
    >
      {/* Title and View More */}
      <div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full"
        style={{ padding: '0 var(--padding-lr)', gap: '16px' }}
      >
        <div style={{ transform: 'rotate(359deg)' }}>
          <p
            className="font-pci-sans-bold text-black leading-normal whitespace-pre"
            style={{ 
              fontSize: 'var(--text-header)',
              fontVariationSettings: "'wght' 700" 
            }}
          >
            FEATURED
          </p>
        </div>

        <motion.button 
          ref={buttonRef}
          onClick={handleViewMoreClick}
          variants={wiggleVariants}
          whileHover={isTouchDevice ? undefined : "hover"}
          animate={isTouchDevice && buttonInView ? "scrollTrigger" : undefined}
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ gap: '8px' }}
        >
          <div style={{ transform: 'rotate(0.75deg)' }} className="flex items-center">
            <p 
              className="font-pci-sans-bold text-black leading-normal whitespace-nowrap"
              style={{ fontSize: 'var(--text-menu)' }}
            >
              VIEW MORE WORK
            </p>
            <div className="flex-shrink-0 ml-2 w-[18px] h-[12px] md:w-[24px] md:h-[16px] lg:w-[48px] lg:h-[32px]">
              <img alt="arrow" className="w-full h-full" src={ARROW} />
            </div>
          </div>
        </motion.button>
      </div>

      {/* Main Featured Image with Parallax */}
      <WorkCard
        cardRef={card1Ref}
        imageSrc={IMG_THE_PAPER}
        imageOverlaySrc={IMG_THE_PAPER_OVERLAY}
        alt="The Paper"
        title="The Paper"
        subtitle1="Main Theme"
        subtitle2="Created by Greg Daniels"
        company="NBC Universal Peacock"
        isTouchDevice={isTouchDevice}
        className="w-full relative group cursor-pointer overflow-hidden"
        style={{ y: y1, opacity: opacity1, aspectRatio: '4096/1886' }}
      />

      {/* Two Column Grid with Parallax */}
      <div 
        className="flex flex-row items-start w-full"
        style={{ gap: 'var(--padding-gap)' }}
      >
        <WorkCard
          cardRef={card2Ref}
          imageSrc={IMG_ANYTHING_ROOTS}
          imageOverlaySrc={IMG_ANYTHING_ROOTS_OVERLAY}
          alt="Anything Roots"
          title="ANYTHING ROOTS"
          subtitle1="Custom Music"
          subtitle2="dir. Josh Locy"
          company="Cartel"
          isTouchDevice={isTouchDevice}
          className="flex-1 relative group cursor-pointer overflow-hidden"
          style={{ y: y2, opacity: opacity2, aspectRatio: '2000/2000' }}
        />
        <WorkCard
          cardRef={card3Ref}
          imageSrc={IMG_SERIAL}
          imageOverlaySrc={IMG_SERIAL_OVERLAY}
          alt="Serial"
          title="Serial"
          subtitle1="Original Theme + Music"
          subtitle2="Prod. Sarah Koenig"
          company="Serial Productions"
          isTouchDevice={isTouchDevice}
          className="flex-1 relative group cursor-pointer overflow-hidden"
          style={{ y: y2, opacity: opacity3, aspectRatio: '2000/2000' }}
        />
      </div>
    </div>
  );
}

