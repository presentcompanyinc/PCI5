/**
 * Demos Index Page - Overview of all animation demos
 */

import Link from 'next/link';

export default function DemosPage() {
  const demos = [
    {
      title: 'Page Load Animations',
      href: '/demos/page-load',
      description: 'Animations that trigger when pages first load',
      items: [
        'A: Staggered text reveal with rotation jitter (Motion)',
        'B: Logo stamp effect with spring bounce (React Spring)',
        'C: Divider draw-in using SVG path animation (Motion)',
      ],
    },
    {
      title: 'Scroll Animations',
      href: '/demos/scroll',
      description: 'Animations triggered by scrolling behavior',
      items: [
        'D: Section fade-up with rotation jitter (Motion InView)',
        'E: Parallax depth effect on images (React Spring)',
        'F: Logo pop sequence on scroll into view (Motion)',
      ],
    },
    {
      title: 'Enhancements',
      href: '/demos/enhancements',
      description: 'Improvements to existing animations',
      items: [
        'G: Client carousel pause/highlight on hover (React Spring)',
        'H: Menu squiggle with path morphing (Motion)',
        'I: Work overlay with spring physics (React Spring)',
      ],
    },
    {
      title: 'Micro Animations',
      href: '/demos/micro',
      description: 'Small interactive details and polish',
      items: [
        'J: Button wiggle on hover (Motion)',
        'K: Footer float elements (React Spring)',
        'L: Contact modal spring entry (React Spring)',
      ],
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="font-pci-sans-bold text-black mb-4"
          style={{ 
            fontSize: 'var(--text-header)',
            transform: 'rotate(359deg)' 
          }}
        >
          ANIMATION DEMOS
        </h1>
        <p 
          className="font-pci-sans-bold leading-[1.15] max-w-3xl"
          style={{ fontSize: 'var(--text-paragraph)' }}
        >
          Explore proposed animation concepts for the Present Company Included website. 
          Each demo showcases different animation techniques using Framer Motion and React Spring, 
          maintaining the printed zine aesthetic with hand-drawn squiggles and playful rotations.
        </p>
      </div>

      {/* Demo Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {demos.map((demo) => (
          <Link
            key={demo.href}
            href={demo.href}
            className="bg-white border-2 border-black p-6 hover:translate-x-1 hover:translate-y-1 transition-transform group"
            style={{ 
              boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
            }}
          >
            <h2 
              className="font-pci-sans-bold text-black mb-2"
              style={{ 
                fontSize: 'var(--text-menu)',
                transform: 'rotate(0.5deg)' 
              }}
            >
              {demo.title}
            </h2>
            <p className="text-sm mb-4 opacity-70">
              {demo.description}
            </p>
            <ul className="space-y-1">
              {demo.items.map((item, index) => (
                <li key={index} className="text-sm flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-[#03bed8] font-pci-sans-bold text-sm group-hover:translate-x-1 transition-transform">
              View Demos →
            </div>
          </Link>
        ))}
      </div>

      {/* Implementation Notes */}
      <div className="mt-12 bg-[#f37d7d] border-2 border-black p-6">
        <h3 className="font-pci-sans-bold text-black mb-3">
          Implementation Notes
        </h3>
        <ul className="space-y-2 text-sm">
          <li>• All animations respect <code className="bg-white px-1 border border-black">prefers-reduced-motion</code></li>
          <li>• Desktop and mobile behaviors can be toggled in each demo</li>
          <li>• Animation parameters (duration, delay) are adjustable</li>
          <li>• Code snippets provided for easy implementation</li>
          <li>• Performance metrics available for testing</li>
        </ul>
      </div>
    </div>
  );
}

