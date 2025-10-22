'use client';

/**
 * ContactModals - Renders appropriate contact modal based on state
 */

import { useContactModal } from '@/contexts/ContactModalContext';
import { ContactFormModal } from './ContactFormModal';
import { ContactInfoModal } from './ContactInfoModal';

export function ContactModals() {
  const { modalType, closeModal } = useContactModal();

  return (
    <>
      <ContactFormModal 
        isOpen={modalType === 'form'} 
        onClose={closeModal} 
      />
      <ContactInfoModal 
        isOpen={modalType === 'info'} 
        onClose={closeModal} 
      />
    </>
  );
}

