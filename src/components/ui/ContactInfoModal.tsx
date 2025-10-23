'use client';

/**
 * ContactInfoModal - Contact information overlay with bot protection
 * Extracted from Figma design
 */

import { useState } from 'react';

interface ContactInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactInfoModal({ isOpen, onClose }: ContactInfoModalProps) {
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);

  if (!isOpen) return null;

  // Obfuscated contact info (decoded on click)
  const revealPhone = () => {
    setPhoneRevealed(true);
    // Actual phone: 6462877932
    const phone = String.fromCharCode(54, 52, 54, 50, 56, 55, 55, 57, 51, 50);
    const link = document.createElement('a');
    link.href = `tel:${phone}`;
    link.click();
  };

  const revealEmail = () => {
    setEmailRevealed(true);
    // Actual email: info@presentcompanyinc.com
    const email = String.fromCharCode(
      105, 110, 102, 111, 64, 112, 114, 101, 115, 101, 110, 116, 
      99, 111, 109, 112, 97, 110, 121, 105, 110, 99, 46, 99, 111, 109
    );
    const link = document.createElement('a');
    link.href = `mailto:${email}`;
    link.click();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#f2efea] relative w-full min-h-[400px] md:min-h-[600px] rounded-lg shadow-2xl m-4 flex flex-col items-start justify-center"
        style={{ 
          maxWidth: 'var(--modal-max-width)',
          padding: 'var(--modal-padding)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute font-pci-sans-bold leading-none text-black hover:opacity-70 transition-opacity"
          style={{
            fontSize: 'var(--modal-close-size)',
            top: 'calc(var(--modal-padding) / 2.5)',
            right: 'calc(var(--modal-padding) / 2.5)'
          }}
          aria-label="Close"
        >
          ×
        </button>

        <div 
          className="flex flex-col w-full"
          style={{ gap: 'var(--modal-gap)' }}
        >
          {/* Phone */}
          <div 
            className="font-pci-sans-bold leading-none text-black"
            style={{ fontSize: 'var(--modal-title-size)' }}
          >
            {phoneRevealed ? (
              <a 
                href="tel:6462877932" 
                className="hover:opacity-70 transition-opacity break-words"
              >
                Text or Call: 6462877932
              </a>
            ) : (
              <button
                onClick={revealPhone}
                className="hover:opacity-70 transition-opacity text-left w-full break-words"
              >
                Text or Call: <span className="text-black/30">[Click to reveal]</span>
              </button>
            )}
          </div>

          {/* Email */}
          <div 
            className="font-pci-sans-bold leading-none text-black"
            style={{ fontSize: 'var(--modal-title-size)' }}
          >
            {emailRevealed ? (
              <a 
                href="mailto:info@presentcompanyinc.com"
                className="hover:opacity-70 transition-opacity break-all"
              >
                info@presentcompanyinc.com
              </a>
            ) : (
              <button
                onClick={revealEmail}
                className="hover:opacity-70 transition-opacity text-left w-full break-words"
              >
                Email: <span className="text-black/30">[Click to reveal]</span>
              </button>
            )}
          </div>

          {/* Ask for */}
          <div 
            className="font-pci-sans-bold leading-none text-black"
            style={{ fontSize: 'var(--modal-title-size)' }}
          >
            Ask for Nick or Patrick
          </div>
        </div>

        {/* Helper text */}
        <p 
          className="mt-8 font-pci-sans-bold text-black/50"
          style={{ fontSize: 'var(--modal-input-text)' }}
        >
          Click phone or email to reveal and contact us
        </p>
      </div>
    </div>
  );
}

