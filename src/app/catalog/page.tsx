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

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      <div className="w-full max-w-[1700px]">
        {/* Header */}
        <Header />
      </div>
      
      {/* Menu Bar */}
      <AnimatedMenuBar />
      
      <div className="w-full max-w-[1700px]">
        
        {/* Intro Text */}
        <CatalogIntroSection />
        
        {/* Top Divider */}
        <div className="py-6"><DividerSection index={0} /></div>
        
        {/* Catalog Grid */}
        <div className="pt-6">
          <CatalogGridSection />
        </div>
        
        {/* Bottom Divider */}
        <div className="py-6"><DividerSection index={1} /></div>
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}

