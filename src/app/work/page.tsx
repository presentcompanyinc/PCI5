/**
 * Selected Work Page
 * Showcases PCI's portfolio of work
 */

import { Header, Footer } from '@/components/layout';
import { AnimatedMenuBar } from '@/components/animated';
import {
  WorkIntroSection,
  DividerSection,
  WorkGridSection,
} from '@/components/sections';

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      <div className="w-full max-w-[1700px]">
        {/* Header */}
        <Header />
        
        {/* Menu Bar */}
        <AnimatedMenuBar />
        
        {/* Intro Text */}
        <WorkIntroSection />
        
        {/* Olive Divider */}
        <div className="py-6"><DividerSection variant="olive" /></div>
        
        {/* Work Grid */}
        <WorkGridSection />
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}

