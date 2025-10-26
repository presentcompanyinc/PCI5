/**
 * Demos Layout - Navigation and structure for animation demos
 */

import { Header, MenuBar } from '@/components/layout';
import Link from 'next/link';

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const demoPages = [
    { href: '/demos', label: 'Overview', exact: true },
    { href: '/demos/page-load', label: 'Page Load' },
    { href: '/demos/scroll', label: 'Scroll Animations' },
    { href: '/demos/enhancements', label: 'Enhancements' },
    { href: '/demos/micro', label: 'Micro Animations' },
  ];

  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      <div className="w-full max-w-[1700px]">
        <Header />
        <MenuBar />
        
        {/* Demo Navigation */}
        <div 
          className="bg-[#8b5fbf] border-y-2 border-black flex flex-wrap gap-2 p-4"
          style={{ padding: '16px var(--padding-lr)' }}
        >
          <div className="font-pci-sans-bold text-white mr-4">
            ANIMATION DEMOS:
          </div>
          {demoPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="px-3 py-1 bg-white border-2 border-black font-pci-sans-bold text-xs hover:bg-[#03bed8] transition-colors"
            >
              {page.label}
            </Link>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '48px var(--padding-lr)' }}>
          {children}
        </div>
      </div>
    </main>
  );
}

