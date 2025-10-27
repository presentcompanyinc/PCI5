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
  ScrollFadeWrapper,
} from '@/components/animated';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      <div className="w-full max-w-[1700px]">
        <Header />
        <AnimatedMenuBar />
        
        <ScrollFadeWrapper>
          <AnimatedIntroSection />
        </ScrollFadeWrapper>
        
        <ScrollFadeWrapper>
          <div className="py-6"><AnimatedDividerSection variant="red" /></div>
        </ScrollFadeWrapper>
        
        {/* FeaturedWork has individual card scroll-fade built-in */}
        <AnimatedFeaturedWorkSection />
        
        <ScrollFadeWrapper>
          <div className="py-6"><AnimatedDividerSection variant="teal" /></div>
        </ScrollFadeWrapper>
        
        <ScrollFadeWrapper>
          <AnimatedServicesSection />
        </ScrollFadeWrapper>
        
        <ScrollFadeWrapper>
          <div className="py-6"><AnimatedDividerSection variant="blue" /></div>
        </ScrollFadeWrapper>
        
        <ScrollFadeWrapper>
          <CarnivalPopperClientsSection />
        </ScrollFadeWrapper>
        
        <ScrollFadeWrapper>
          <div className="py-6"><AnimatedDividerSection variant="purple" /></div>
        </ScrollFadeWrapper>
        
        {/* Footer stays at full opacity */}
        <AnimatedFooter />
      </div>
    </main>
  );
}
