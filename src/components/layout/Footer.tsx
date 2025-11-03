'use client';

/**
 * Footer component
 * Extracted from Figma design
 */

import { useState, useEffect } from 'react';
import { useContactModal } from '@/contexts/ContactModalContext';
import { CONTACT_MODAL_TYPE } from '@/config/contact';
import { WeatherTimeWidget } from '@/components/ui/WeatherTimeWidget';
import { getRandomButtonColor, getFixedButtonColor } from '@/lib/contactButtonRandomizer';
import { ContactButton } from '@/components/ui/ContactButton';

export function Footer() {
  const { openFormModal, openInfoModal } = useContactModal();
  const openContactModal = CONTACT_MODAL_TYPE === 'form' ? openFormModal : openInfoModal;
  const [isHovered, setIsHovered] = useState(false);
  const [buttonColor, setButtonColor] = useState(getFixedButtonColor());

  // Randomize color on client-side mount to prevent hydration mismatch
  useEffect(() => {
    setButtonColor(getRandomButtonColor());
  }, []);

  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-center w-full pb-20 md:pb-0"
      style={{
        gap: 'var(--padding-gap-large)',
        padding: 'var(--padding-tb) var(--padding-lr) 0'
      }}
    >
      {/* Contact Button */}
      <div className="flex items-center justify-center">
        <button 
          onClick={openContactModal}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative cursor-pointer"
          style={{
            width: 'var(--contact-button-width)',
            height: 'auto',
            aspectRatio: '356/95.986'
          }}
        >
          <ContactButton
            fillColor={isHovered ? buttonColor : 'transparent'}
            animationStyle="wipe"
            className="w-full h-full transition-transform hover:scale-105"
          />
        </button>
      </div>

      {/* Footer Info */}
      <div 
        className="bg-[#f2efea] flex flex-col md:flex-row items-center md:items-start justify-between text-black text-center w-full max-w-[1440px]"
        style={{
          fontSize: 'var(--text-tiny)',
          padding: '0 var(--padding-lr)',
          gap: 'var(--padding-gap)'
        }}
      >
        <div className="font-pci-sans-bold shrink-0">
          <p className="leading-normal whitespace-pre">COPYRIGHT 2025 P.C.I.</p>
        </div>

        <WeatherTimeWidget />

        <a 
          href="https://www.instagram.com/swiftstudiesdaily/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-pci-sans-bold shrink-0 hover:opacity-70 transition-opacity"
        >
          <p className="leading-normal whitespace-pre">INSTAGRAM</p>
        </a>
      </div>
    </div>
  );
}
