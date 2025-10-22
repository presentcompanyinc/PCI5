/**
 * Selected Work Page
 * Showcases PCI's portfolio of work
 */

import { Header, MenuBar, Footer } from '@/components/layout';
import {
  WorkIntroSection,
  DividerSection,
  WorkGridSection,
} from '@/components/sections';

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#f2efea]">
      {/* Header */}
      <Header />
      
      {/* Menu Bar */}
      <MenuBar />
      
      {/* Intro Text */}
      <WorkIntroSection />
      
      {/* Olive Divider */}
      <DividerSection variant="olive" />
      
      {/* Work Grid */}
      <WorkGridSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}

