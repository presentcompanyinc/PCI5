/**
 * About Us Page
 * Company information with interactive Memphis Playground
 */

import { Header, MenuBar, Footer } from '@/components/layout';
import { AboutIntroSection } from '@/components/sections';
import { AboutPagePlayground } from '@/components/memphis/AboutPagePlayground';

// Divider assets
const DIVIDER_BW_PATTERN = 'http://localhost:3845/assets/8a262ab8cff0c45f44317ac57ff9e491972ecd9f.png';
const DIVIDER_CYAN = 'http://localhost:3845/assets/e65793c9cf813cd55852717f75df2a8699396a25.svg';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f2efea]">
      {/* Header */}
      <Header />
      
      {/* Menu Bar */}
      <MenuBar />
      
      {/* Intro Text */}
      <AboutIntroSection />
      
      {/* Top Divider - Black & White Pattern */}
      <div className="w-full">
        <div className="w-full relative" style={{ aspectRatio: '4096/328' }}>
          <img 
            alt="" 
            className="w-full h-full object-cover" 
            src={DIVIDER_BW_PATTERN} 
          />
        </div>
      </div>
      
      {/* Memphis Playground - Interactive Music Blob Game */}
      <div className="bg-[#f2efea] w-full" style={{ height: '501px' }}>
        <AboutPagePlayground 
          initialBlobCount={7}
          showOverlayControls={true}
          showCounter={true}
          className="w-full h-full"
        />
      </div>
      
      {/* Bottom Divider - Cyan Pattern */}
      <div className="w-full bg-[#03bed8]">
        <div className="w-full relative" style={{ aspectRatio: '3546/282.001' }}>
          <img 
            alt="" 
            className="w-full h-auto" 
            src={DIVIDER_CYAN} 
          />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}

