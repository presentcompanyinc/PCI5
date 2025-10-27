'use client';

/**
 * AnimatedMenuBar - Navigation with smooth squiggle path morphing
 * Animation 5: Menu Squiggle with Path Morphing
 */

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContactModal } from '@/contexts/ContactModalContext';
import { CONTACT_MODAL_TYPE } from '@/config/contact';

interface MenuItemProps {
  children: React.ReactNode;
  rotation: number;
  width?: string;
  href?: string;
  onClick?: () => void;
}

function MenuItem({ children, rotation, width, href, onClick }: MenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  const content = (
    <div 
      className="flex flex-col items-center justify-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <div className="relative w-full h-[6px] mt-1 flex items-center justify-start">
        <svg className="w-full h-full" viewBox="0 0 100 6" preserveAspectRatio="none">
          <motion.path
            d="M0,3 Q12.5,0 25,3 T50,3 T75,3 T100,3"
            stroke="#000"
            strokeWidth="2"
            fill="none"
            variants={pathVariants}
            initial="initial"
            animate={isHovered ? "hover" : "exit"}
          />
        </svg>
      </div>
    </div>
  );

  const itemStyle = {
    minWidth: width || 'var(--menu-home-width)',
    flexShrink: 0
  };

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="bg-[#f2efea] flex items-start overflow-hidden shrink-0 cursor-pointer"
        style={itemStyle}
      >
        {content}
      </button>
    );
  }

  return (
    <Link 
      href={href!}
      className="bg-[#f2efea] flex items-start overflow-hidden shrink-0 cursor-pointer"
      style={itemStyle}
    >
      {content}
    </Link>
  );
}

export function AnimatedMenuBar() {
  const { openFormModal, openInfoModal } = useContactModal();
  const openContactModal = CONTACT_MODAL_TYPE === 'form' ? openFormModal : openInfoModal;

  return (
    <div 
      className="bg-[#f2efea] flex flex-nowrap items-start w-full overflow-x-auto overflow-y-hidden scrollbar-hide" 
      style={{
        gap: 'var(--padding-gap)',
        padding: '16px var(--padding-lr)',
        maxWidth: 'var(--display-width)',
        WebkitOverflowScrolling: 'touch'
      }}
      data-name="Menu Bar"
    >
      <MenuItem rotation={358.749} href="/preview">Home</MenuItem>
      <MenuItem rotation={2} href="/preview/work">Work</MenuItem>
      <MenuItem rotation={359.25} width="var(--menu-catalog-width)" href="/preview/catalog">
        Catalog
      </MenuItem>
      <MenuItem rotation={1} href="/preview/about">About</MenuItem>
      <MenuItem rotation={358.25} width="var(--menu-catalog-width)" onClick={openContactModal}>
        Contact
      </MenuItem>
    </div>
  );
}

