'use client';

/**
 * AnimatedMenuBar - Navigation with smooth squiggle path morphing
 * Animation 5: Menu Squiggle with Path Morphing
 */

import Link from 'next/link';
import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useContactModal } from '@/contexts/ContactModalContext';
import { CONTACT_MODAL_TYPE } from '@/config/contact';
import { generateOrganicSquiggle } from '@/utils/squiggleGenerator';
import { useTouchDevice } from '@/hooks/useTouchDevice';

interface MenuItemProps {
  children: React.ReactNode;
  rotation: number;
  width?: string;
  href?: string;
  onClick?: () => void;
  menuIndex: number;
  isTouchDevice: boolean;
}

function MenuItem({ children, rotation, width, href, onClick, menuIndex, isTouchDevice }: MenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const router = useRouter();
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Generate organic squiggle path (consistent per menu item)
  const squigglePath = useMemo(() => {
    return generateOrganicSquiggle(
      1000 + menuIndex * 137, // Unique seed per menu item
      4, // Approximately 4 wave cycles
      0.45, // Moderate amplitude variation
      0.4 // Moderate frequency variation
    );
  }, [menuIndex]);

  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    hover: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] as const }
    },
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] as const }
    }
  };

  // Handle tap on touch devices - show animation then navigate
  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isTouchDevice) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Trigger squiggle animation
    setIsTapped(true);
    
    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    
    // Navigate after animation plays (300ms animation + 50ms buffer)
    navigationTimeoutRef.current = setTimeout(() => {
      if (onClick) {
        onClick();
      } else if (href) {
        router.push(href);
      }
    }, 350);
  };

  const content = (
    <div 
      className="flex flex-col items-center justify-center w-full"
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      onTouchStart={isTouchDevice ? handleTap : undefined}
      onClick={isTouchDevice ? handleTap : undefined}
    >
      <div style={{ transform: `rotate(${rotation}deg)` }}>
        <p
          className="font-pci-sans-bold text-black leading-normal whitespace-nowrap"
          style={{ 
            fontSize: 'var(--text-menu)',
            letterSpacing: '0.04em'
          }}
        >
          {children}
        </p>
      </div>
      {/* Animated squiggle underline with path morphing */}
      <div className="relative w-full h-[6px] mt-1 flex items-center justify-start" style={{ overflow: 'visible' }}>
        <svg className="w-full h-[6px]" style={{ overflow: 'visible' }} viewBox="0 -3 100 12" preserveAspectRatio="none">
          <defs>
            {/* Subtle texture filter for hand-drawn effect - reduced by additional 50% */}
            <filter id={`pencil-texture-menu-${menuIndex}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" seed={menuIndex} />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.1125" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            {/* Mask for pen-like tapering at ends */}
            <mask id={`taper-mask-menu-${menuIndex}`}>
              <linearGradient id={`taper-gradient-menu-${menuIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="black" />
                <stop offset="2%" stopColor="white" />
                <stop offset="98%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </linearGradient>
              <rect x="0" y="-3" width="100" height="12" fill={`url(#taper-gradient-menu-${menuIndex})`} />
            </mask>
          </defs>
          <motion.path
            d={squigglePath}
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            mask={`url(#taper-mask-menu-${menuIndex})`}
            style={{
              filter: `url(#pencil-texture-menu-${menuIndex})`
            }}
            variants={pathVariants}
            initial="initial"
            animate={isTouchDevice ? (isTapped ? "hover" : "exit") : (isHovered ? "hover" : "exit")}
          />
        </svg>
      </div>
    </div>
  );

  const itemStyle = {
    flexShrink: 0,
    flexBasis: 'auto',
    width: 'auto'
  };

  if (onClick) {
    return (
      <button
        onClick={isTouchDevice ? undefined : onClick}
        className="bg-[#f2efea] flex items-start overflow-hidden cursor-pointer"
        style={itemStyle}
      >
        {content}
      </button>
    );
  }

  return (
    <Link 
      href={href!}
      onClick={isTouchDevice ? handleTap : undefined}
      className="bg-[#f2efea] flex items-start overflow-hidden cursor-pointer"
      style={itemStyle}
    >
      {content}
    </Link>
  );
}

export function AnimatedMenuBar() {
  const { openFormModal, openInfoModal } = useContactModal();
  const openContactModal = CONTACT_MODAL_TYPE === 'form' ? openFormModal : openInfoModal;
  const isTouchDevice = useTouchDevice();

  return (
    <div 
      className="bg-[#f2efea] flex flex-nowrap items-start w-full overflow-x-auto overflow-y-hidden scrollbar-hide" 
      style={{
        gap: 'var(--padding-gap)',
        padding: '16px var(--padding-lr)',
        maxWidth: 'min(100%, var(--display-width))',
        WebkitOverflowScrolling: 'touch',
        minWidth: 0
      }}
      data-name="Menu Bar"
    >
      <MenuItem rotation={358.749} href="/" menuIndex={0} isTouchDevice={isTouchDevice}>Home</MenuItem>
      <MenuItem rotation={2} href="/work" menuIndex={1} isTouchDevice={isTouchDevice}>Work</MenuItem>
      <MenuItem rotation={359.25} width="var(--menu-catalog-width)" href="/catalog" menuIndex={2} isTouchDevice={isTouchDevice}>
        Catalog
      </MenuItem>
      <MenuItem rotation={1} href="/about" menuIndex={3} isTouchDevice={isTouchDevice}>About</MenuItem>
      <MenuItem rotation={358.25} width="var(--menu-catalog-width)" onClick={openContactModal} menuIndex={4} isTouchDevice={isTouchDevice}>
        Contact
      </MenuItem>
    </div>
  );
}

