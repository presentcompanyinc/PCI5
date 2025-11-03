'use client';

/**
 * AnimatedContactModals - Contact modals with spring entry animation
 * Animation 8: Contact Modal Spring Entry
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactModal } from '@/contexts/ContactModalContext';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AnimatedContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 50
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div 
              className="bg-[#f2efea] relative w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl m-4 pointer-events-auto"
              style={{ maxWidth: 'var(--modal-max-width)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute font-pci-sans-bold leading-none text-black hover:opacity-70 transition-opacity z-10"
                style={{
                  fontSize: 'var(--modal-close-size)',
                  top: 'calc(var(--modal-padding) / 2.5)',
                  right: 'calc(var(--modal-padding) / 2.5)'
                }}
                aria-label="Close"
              >
                ×
              </button>

              {/* Contact Content */}
              <div 
                className="flex items-center justify-center min-h-[400px]"
                style={{ 
                  padding: 'var(--modal-padding)',
                  paddingTop: 'calc(var(--modal-padding) * 1.5)'
                }}
              >
                <div className="text-center">
                  <p 
                    className="font-pci-sans-bold text-black"
                    style={{ fontSize: 'var(--modal-title-size)' }}
                  >
                    
                    <a 
                      href="mailto:pci@presentcompanymusic.com"
                      className="hover:opacity-70 transition-opacity underline"
                    >
                      pci@presentcompanymusic.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function AnimatedContactInfoModal({ isOpen, onClose }: ContactFormModalProps) {
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);

  const revealPhone = () => {
    setPhoneRevealed(true);
    const phone = String.fromCharCode(54, 52, 54, 50, 56, 55, 55, 57, 51, 50);
    const link = document.createElement('a');
    link.href = `tel:${phone}`;
    link.click();
  };

  const revealEmail = () => {
    setEmailRevealed(true);
    const email = String.fromCharCode(
      105, 110, 102, 111, 64, 112, 114, 101, 115, 101, 110, 116, 
      99, 111, 109, 112, 97, 110, 121, 105, 110, 99, 46, 99, 111, 109
    );
    const link = document.createElement('a');
    link.href = `mailto:${email}`;
    link.click();
  };

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 50
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div 
              className="bg-[#f2efea] relative w-full min-h-[400px] md:min-h-[600px] rounded-lg shadow-2xl m-4 flex flex-col items-start justify-center pointer-events-auto"
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function AnimatedContactModals() {
  const { modalType, closeModal } = useContactModal();

  return (
    <>
      <AnimatedContactFormModal 
        isOpen={modalType === 'form'} 
        onClose={closeModal} 
      />
      <AnimatedContactInfoModal 
        isOpen={modalType === 'info'} 
        onClose={closeModal} 
      />
    </>
  );
}

