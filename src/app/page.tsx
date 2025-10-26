/**
 * Homepage - Present Company Included
 * Pixel-perfect implementation from Figma design
 */

import { Header, MenuBar, Footer } from '@/components/layout';
import {
  IntroSection,
  DividerSection,
  FeaturedWorkSection,
  ServicesSection,
  ClientsSection,
} from '@/components/sections';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      <div className="w-full max-w-[1700px]">
        <Header />
        <MenuBar />
        <IntroSection />
        <div className="py-6"><DividerSection variant="red" /></div>
        <FeaturedWorkSection />
        <div className="py-6"><DividerSection variant="teal" /></div>
        <ServicesSection />
        <div className="py-6"><DividerSection variant="blue" /></div>
        <ClientsSection />
        <div className="py-6"><DividerSection variant="purple" /></div>
        <Footer />
      </div>
    </main>
  );
}
