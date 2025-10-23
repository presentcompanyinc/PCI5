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
    <main className="min-h-screen bg-[#f2efea]">
      <Header />
      <MenuBar />
      <IntroSection />
      <DividerSection variant="red" />
      <FeaturedWorkSection />
      <DividerSection variant="teal" />
      <ServicesSection />
      <DividerSection variant="blue" />
      <ClientsSection />
      <DividerSection variant="purple" />
      <Footer />
    </main>
  );
}
