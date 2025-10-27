'use client';

/**
 * AnimatedContactModals - Contact modals with spring entry animation
 * Animation 8: Contact Modal Spring Entry
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactModal } from '@/contexts/ContactModalContext';

const SUBMIT_BUTTON_SVG = 'http://localhost:3845/assets/72d112f625199abc50ee8106c5d270d9db2a6b3e.svg';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AnimatedContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Form submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setSubmitted(false);
      onClose();
    }, 2000);
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

              {submitted ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <h2 
                      className="font-pci-sans-bold text-black mb-4"
                      style={{ fontSize: 'var(--modal-title-size)' }}
                    >
                      Thanks for reaching out!
                    </h2>
                    <p 
                      className="font-pci-sans-bold text-black opacity-70"
                      style={{ fontSize: 'var(--modal-label-size)' }}
                    >
                      We'll get back to you soon.
                    </p>
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={handleSubmit}
                  style={{ 
                    padding: 'var(--modal-padding)',
                    paddingTop: 'calc(var(--modal-padding) * 1.5)'
                  }}
                >
                  {/* First Name & Last Name */}
                  <div 
                    className="flex flex-col md:flex-row mb-8"
                    style={{ gap: 'var(--modal-gap)' }}
                  >
                    <div className="flex-1">
                      <label 
                        htmlFor="firstName"
                        className="block font-pci-sans-bold text-black uppercase mb-4"
                        style={{ fontSize: 'var(--modal-label-size)' }}
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="optional"
                        className="w-full px-6 border-[3px] border-black border-dashed rounded-sm bg-[#f2efea] font-pci-sans-bold text-black placeholder:text-black/40 focus:outline-none focus:border-solid"
                        style={{
                          height: 'var(--modal-input-height)',
                          fontSize: 'var(--modal-input-text)'
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <label 
                        htmlFor="lastName"
                        className="block font-pci-sans-bold text-black uppercase mb-4"
                        style={{ fontSize: 'var(--modal-label-size)' }}
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="optional"
                        className="w-full px-6 border-[3px] border-black border-dashed rounded-sm bg-[#f2efea] font-pci-sans-bold text-black placeholder:text-black/40 focus:outline-none focus:border-solid"
                        style={{
                          height: 'var(--modal-input-height)',
                          fontSize: 'var(--modal-input-text)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-8">
                    <label 
                      htmlFor="email"
                      className="block font-pci-sans-bold text-black uppercase mb-4"
                      style={{ fontSize: 'var(--modal-label-size)' }}
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full md:max-w-[449px] px-6 border-[3px] border-black border-dashed rounded-sm bg-[#f2efea] font-pci-sans-bold text-black focus:outline-none focus:border-solid"
                      style={{
                        height: 'var(--modal-input-height)',
                        fontSize: 'var(--modal-input-text)'
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <label 
                      htmlFor="message"
                      className="block font-pci-sans-bold text-black uppercase mb-4"
                      style={{ fontSize: 'var(--modal-label-size)' }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={8}
                      className="w-full md:max-w-[700px] px-6 py-4 border-[3px] border-black border-dashed rounded-sm bg-[#f2efea] font-pci-sans-bold text-black focus:outline-none focus:border-solid resize-none"
                      style={{ fontSize: 'var(--modal-input-text)' }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end md:max-w-[700px]">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative group disabled:opacity-50"
                      style={{
                        height: 'calc(var(--modal-input-height) * 1.2)',
                        minWidth: '200px'
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <img 
                          src={SUBMIT_BUTTON_SVG} 
                          alt="" 
                          className="w-full h-auto transition-transform group-hover:scale-105" 
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center border-4 border-black rounded-[36px] mx-[6px] my-[6px] bg-[#f2efea] group-hover:bg-black/5 transition-colors">
                        <span 
                          className="font-pci-sans-bold text-black leading-none"
                          style={{ fontSize: 'var(--modal-button-text)' }}
                        >
                          {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                        </span>
                      </div>
                    </button>
                  </div>
                </form>
              )}
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

