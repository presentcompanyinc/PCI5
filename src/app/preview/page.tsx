/**
 * Preview Homepage - Animated version of Present Company Included homepage
 * All animations applied as specified
 */

import { Header } from '@/components/layout';
import {
  AnimatedIntroSection,
  AnimatedMenuBar,
  AnimatedDividerSection,
  AnimatedFeaturedWorkSection,
  AnimatedClientsSection,
  AnimatedServicesSection,
  AnimatedFooter,
} from '@/components/animated';

export default function PreviewHome() {
  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      {/* Preview Banner */}
      <div className="w-full bg-[#03bed8] border-b-4 border-black py-3 px-4 sticky top-0 z-50">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between">
          <p className="font-pci-sans-bold text-black text-sm md:text-base">
            🎬 ANIMATION PREVIEW - View all animations applied to your site
          </p>
          <a 
            href="/" 
            className="font-pci-sans-bold text-xs md:text-sm underline hover:opacity-70"
          >
            Back to Original
          </a>
        </div>
      </div>
      
      <div className="w-full max-w-[1700px]">
        <Header />
        <AnimatedMenuBar />
        <AnimatedIntroSection />
        <div className="py-6"><AnimatedDividerSection variant="red" /></div>
        <AnimatedFeaturedWorkSection />
        <div className="py-6"><AnimatedDividerSection variant="teal" /></div>
        <AnimatedServicesSection />
        <div className="py-6"><AnimatedDividerSection variant="blue" /></div>
        <AnimatedClientsSection />
        <div className="py-6"><AnimatedDividerSection variant="purple" /></div>
        <AnimatedFooter />
      </div>
    </main>
  );
}

