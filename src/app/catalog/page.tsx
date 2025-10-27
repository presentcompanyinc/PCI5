/**
 * PCI Catalog Page
 * Music catalog browsing - library music albums
 */

import { Header, Footer } from '@/components/layout';
import { AnimatedMenuBar } from '@/components/animated';
import {
  CatalogIntroSection,
  CatalogGridSection,
  DividerSection,
} from '@/components/sections';

// Divider image
const DIVIDER_WAVY = '/assets/PCI_Divider_1.svg';
const DIVIDER_BOTTOM = '/assets/PCI_Divider_4.svg';

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      <div className="w-full max-w-[1700px]">
        {/* Header */}
        <Header />
        
        {/* Menu Bar */}
        <AnimatedMenuBar />
        
        {/* Intro Text */}
        <CatalogIntroSection />
        
        {/* Top Divider */}
        <div className="py-6"><DividerSection variant="red" /></div>
        
        {/* Catalog Grid */}
        <div className="pt-6">
          <CatalogGridSection />
        </div>
        
        {/* Bottom Divider */}
        <div className="py-6"><DividerSection variant="olive" /></div>
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}

