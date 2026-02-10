/**
 * Homepage - Present Company Included
 * With all animations applied
 */

import { Header } from '@/components/layout';
import {
  AnimatedIntroSection,
  AnimatedMenuBar,
  AnimatedDividerSection,
  AnimatedFeaturedWorkSection,
  CarnivalPopperClientsSection,
  AnimatedServicesSection,
  AnimatedFooter,
} from '@/components/animated';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      <div className="w-full max-w-[1700px]">
        <Header />
      </div>
      <AnimatedMenuBar />
      <div className="w-full max-w-[1700px]">
        
        <AnimatedIntroSection />
        
        <div className="py-6"><AnimatedDividerSection index={6} /></div>
        
        <AnimatedFeaturedWorkSection />
        
        <div className="py-4"><AnimatedDividerSection index={0} /></div>
        
        <AnimatedServicesSection />
        
        <div className="py-6"><AnimatedDividerSection index={1} /></div>
        
        <CarnivalPopperClientsSection />
        
        <div className="py-6"><AnimatedDividerSection index={2} /></div>
        
        <AnimatedFooter />
      </div>
    </main>
  );
}
