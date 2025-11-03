/**
 * About Us Page
 * Company information with interactive Memphis Playground
 */

import { Header, Footer } from '@/components/layout';
import { AnimatedMenuBar } from '@/components/animated';
import { AboutIntroSection, DividerSection } from '@/components/sections';
import { AboutPagePlayground } from '@/components/memphis/AboutPagePlayground';

export default function AboutPage() {
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
        <AboutIntroSection />
        
        {/* Top Divider */}
        <div className="py-6"><DividerSection index={4} /></div>
        
        {/* Memphis Playground - Interactive Music Blob Game */}
        <div className="bg-[#f2efea] w-full" style={{ minHeight: '300px', height: '40vh', maxHeight: '600px' }}>
          <AboutPagePlayground 
            initialBlobCount={7}
            showOverlayControls={true}
            showCounter={true}
            className="w-full h-full"
          />
        </div>
        
        {/* Bottom Divider */}
        <div className="py-6"><DividerSection index={5} /></div>
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}

