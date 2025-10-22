'use client';

/**
 * ContactModalContext - Manages contact modal state globally
 */

import { createContext, useContext, useState, ReactNode } from 'react';

type ContactModalType = 'form' | 'info' | null;

interface ContactModalContextType {
  modalType: ContactModalType;
  openFormModal: () => void;
  openInfoModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<ContactModalType>(null);

  const openFormModal = () => setModalType('form');
  const openInfoModal = () => setModalType('info');
  const closeModal = () => setModalType(null);

  return (
    <ContactModalContext.Provider value={{ modalType, openFormModal, openInfoModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return context;
}

