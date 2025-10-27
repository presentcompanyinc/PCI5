/**
 * About Us Page
 * Company information with interactive Memphis Playground
 */

import { Header, Footer } from '@/components/layout';
import { AnimatedMenuBar } from '@/components/animated';
import { AboutIntroSection, DividerSection } from '@/components/sections';
import { AboutPagePlayground } from '@/components/memphis/AboutPagePlayground';

// Divider assets
const DIVIDER_BW_PATTERN = '/assets/PCI_Divider_6.svg';
const DIVIDER_CYAN = '/assets/Divider3.svg';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      <div className="w-full max-w-[1700px]">
        {/* Header */}
        <Header />
        
        {/* Menu Bar */}
        <AnimatedMenuBar />
        
        {/* Intro Text */}
        <AboutIntroSection />
        
        {/* Top Divider - Black & White Pattern */}
        <div className="py-6">
          <div className="w-full relative lg:block hidden" style={{ aspectRatio: '4096/328' }}>
            <img 
              alt="" 
              className="w-full h-full object-cover" 
              src={DIVIDER_BW_PATTERN} 
            />
          </div>
          <div className="w-full relative overflow-hidden lg:hidden h-[80px]">
            <img 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover" 
              src={DIVIDER_BW_PATTERN} 
            />
          </div>
        </div>
        
        {/* Memphis Playground - Interactive Music Blob Game */}
        <div className="bg-[#f2efea] w-full" style={{ minHeight: '300px', height: '40vh', maxHeight: '600px' }}>
          <AboutPagePlayground 
            initialBlobCount={7}
            showOverlayControls={true}
            showCounter={true}
            className="w-full h-full"
          />
        </div>
        
        {/* Bottom Divider - Cyan Pattern */}
        <div className="py-6"><DividerSection variant="blue" /></div>
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}

