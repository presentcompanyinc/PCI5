'use client';

/**
 * Footer component
 * Extracted from Figma design
 */

import { useContactModal } from '@/contexts/ContactModalContext';
import { CONTACT_MODAL_TYPE } from '@/config/contact';
import { WeatherTimeWidget } from '@/components/ui/WeatherTimeWidget';

const CONTACT_BUTTON = '/assets/ContactUs.svg';

export function Footer() {
  const { openFormModal, openInfoModal } = useContactModal();
  const openContactModal = CONTACT_MODAL_TYPE === 'form' ? openFormModal : openInfoModal;

  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-center pb-0 w-full"
      style={{
        gap: 'var(--padding-gap-large)',
        padding: 'var(--padding-tb) var(--padding-lr) 0'
      }}
    >
      {/* Contact Button */}
      <div className="flex items-center justify-center">
        <button 
          onClick={openContactModal}
          className="relative cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{
            width: 'var(--contact-button-width)',
            height: 'auto',
            aspectRatio: '356/95.986'
          }}
        >
          <img alt="Contact Us" className="w-full h-full" src={CONTACT_BUTTON} />
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
          <p className="leading-normal whitespace-pre">COPYRIGHT 2025 P.C.I</p>
        </div>

        <WeatherTimeWidget />

        <div className="font-pci-sans-bold shrink-0">
          <p className="leading-normal whitespace-pre">INSTAGRAM</p>
        </div>
      </div>
    </div>
  );
}
