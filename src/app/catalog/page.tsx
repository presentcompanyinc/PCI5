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
const DIVIDER_WAVY = 'http://localhost:3845/assets/939f4772e8c7d8abcfff2f29a2bedac61ef7dba0.png';
const DIVIDER_BOTTOM = 'http://localhost:3845/assets/a59f317f4c84c6948bb3d3539d995bf445c54504.svg';

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

