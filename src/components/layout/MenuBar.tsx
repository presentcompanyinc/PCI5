'use client';

/**
 * MenuBar component - Navigation with slightly rotated menu items
 * Extracted from Figma design - maintains the playful rotations
 */

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useContactModal } from '@/contexts/ContactModalContext';
import { CONTACT_MODAL_TYPE } from '@/config/contact';

// Squiggle animation frames from Figma
const SQUIGGLE_FRAMES = [
  'http://localhost:3845/assets/1c04e0543f2c207ebb0565dec9d7b20961229a31.svg',
  'http://localhost:3845/assets/26717a3a5ca808859f53c398652a6ee39f43ce73.svg',
  'http://localhost:3845/assets/2e1eeef50041cd20969622f82dfc113f1a4bbc00.svg',
  'http://localhost:3845/assets/a1898d03a6fe51d66d7b1533354a8e7c2fd89e26.svg',
  'http://localhost:3845/assets/57140007324da0acd6785793817235f17b112b18.svg',
  'http://localhost:3845/assets/7c5e3481b8421b849ab63c6d8c67c3d08b0e7e1f.svg',
  'http://localhost:3845/assets/285542f94aa38a7dd887073b0c769f7fd440edef.svg',
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
      className="flex flex-col items-center justify-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ transform: `rotate(${rotation}deg)` }}>
        <p
          className="font-['PCI_Sans_Bold',_sans-serif] text-black leading-normal whitespace-pre"
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
    width: width || 'var(--menu-home-width)'
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

export function MenuBar() {
  const { openFormModal, openInfoModal } = useContactModal();
  const openContactModal = CONTACT_MODAL_TYPE === 'form' ? openFormModal : openInfoModal;

  return (
    <div 
      className="bg-[#f2efea] flex items-start w-full max-w-[var(--max-width)]" 
      style={{
        gap: 'var(--padding-gap)',
        padding: '16px var(--padding-lr)'
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

