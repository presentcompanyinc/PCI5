/**
 * PCI Catalog Page
 * Music catalog browsing - library music albums
 */

import { Header, MenuBar, Footer } from '@/components/layout';
import {
  CatalogIntroSection,
  CatalogGridSection,
} from '@/components/sections';

// Divider image
const DIVIDER_WAVY = '/assets/PCI_Divider_1.svg';
const DIVIDER_BOTTOM = '/assets/PCI_Divider_4.svg';

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#f2efea]">
      {/* Header */}
      <Header />
      
      {/* Menu Bar */}
      <MenuBar />
      
      {/* Intro Text */}
      <CatalogIntroSection />
      
      {/* Top Divider */}
      <div className="w-full">
        <div className="w-full relative" style={{ aspectRatio: '4096/328' }}>
          <img alt="" className="w-full h-full object-cover" src={DIVIDER_WAVY} />
        </div>
      </div>
      
      {/* Catalog Grid */}
      <CatalogGridSection />
      
      {/* Bottom Divider */}
      <div className="w-full px-[10px] py-[10px]">
        <div className="w-full relative" style={{ aspectRatio: '6000/480.001' }}>
          <img alt="" className="w-full h-auto" src={DIVIDER_BOTTOM} />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}

