import type { Metadata } from 'next';
import { ContactModalProvider } from '@/contexts/ContactModalContext';
import { AnimatedContactModals } from '@/components/animated';

export const metadata: Metadata = {
  title: 'Animation Preview | Present Company Included',
  description: 'Preview of animated version',
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ContactModalProvider>
        {children}
        <AnimatedContactModals />
      </ContactModalProvider>
    </>
  );
}
