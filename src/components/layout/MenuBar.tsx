'use client';

/**
 * MenuBar component - Navigation with slightly rotated menu items
 * Extracted from Figma design - maintains the playful rotations
 */

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useContactModal } from '@/contexts/ContactModalContext';
import { CONTACT_MODAL_TYPE } from '@/config/contact';

// Squiggle animation frames from local assets
const SQUIGGLE_FRAMES = [
  '/assets/Squiggle 1.svg',
  '/assets/Squiggle 2.svg',
  '/assets/Squiggle 3.svg',
  '/assets/Squiggle 4.svg',
  '/assets/Squiggle 5.svg',
  '/assets/Squiggle 6.svg',
  '/assets/Squiggle 7.svg',
];

interface MenuItemProps {
  children: React.ReactNode;
  rotation: number;
  width?: string;
  href?: string;
  onClick?: () => void;
}

function MenuItem({ children, rotation, width, href, onClick }: MenuItemProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      // Animate forward through frames
      intervalRef.current = setInterval(() => {
        setFrameIndex((prev) => {
          if (prev < SQUIGGLE_FRAMES.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 50); // 50ms per frame for smooth animation
    } else {
      // Animate backward through frames when not hovered
      if (frameIndex > 0) {
        intervalRef.current = setInterval(() => {
          setFrameIndex((prev) => {
            if (prev > 0) {
              return prev - 1;
            }
            return prev;
          });
        }, 50);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, frameIndex]);

  const content = (
    <div 
      className="flex flex-col items-start justify-center w-full"
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
      {/* Animated squiggle underline */}
      <div className="relative w-full h-[6px] mt-1 flex items-center justify-start">
        {frameIndex > 0 && (
          <img 
            src={SQUIGGLE_FRAMES[frameIndex]} 
            alt="" 
            className="h-full w-full object-fill"
          />
        )}
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
        onClick={onClick}
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
      className="bg-[#f2efea] flex items-start overflow-hidden cursor-pointer"
      style={itemStyle}
    >
      {content}
    </Link>
  );
}

export function MenuBar() {
  const { openFormModal, openInfoModal } = useContactModal();
  const openContactModal = CONTACT_MODAL_TYPE === 'form' ? openFormModal : openInfoModal;

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
      <MenuItem rotation={358.749} href="/">Home</MenuItem>
      <MenuItem rotation={2} href="/work">Work</MenuItem>
      <MenuItem rotation={359.25} width="var(--menu-catalog-width)" href="/catalog">
        Catalog
      </MenuItem>
      <MenuItem rotation={1} href="/about">About</MenuItem>
      <MenuItem rotation={358.25} width="var(--menu-catalog-width)" onClick={openContactModal}>
        Contact
      </MenuItem>
    </div>
  );
}

