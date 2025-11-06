/**
 * Selected Work Page
 * Showcases PCI's portfolio of work
 */

import { Header, Footer } from '@/components/layout';
import { AnimatedMenuBar } from '@/components/animated';
import {
  DividerSection,
  WorkGridSection,
} from '@/components/sections';

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      <div className="w-full max-w-[1700px]">
        {/* Header */}
        <Header />
      </div>
      
      {/* Menu Bar */}
      <AnimatedMenuBar />
      
      <div className="w-full max-w-[1700px]">
        
        {/* Top Divider */}
        <div className="py-6"><DividerSection index={2} /></div>
        
        {/* Work Grid */}
        <WorkGridSection />
        
        {/* Bottom Divider */}
        <div className="py-6"><DividerSection index={3} /></div>
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}

