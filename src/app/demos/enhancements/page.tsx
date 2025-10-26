'use client';

/**
 * Enhancement Demos
 * Improvements to existing animations with better physics and smoothness
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { DemoCard, CodeBlock, ComparisonView } from '@/components/demos';

export default function EnhancementDemos() {
  return (
    <div>
      <h1 
        className="font-pci-sans-bold text-black mb-6"
        style={{ fontSize: 'var(--text-header)' }}
      >
        ENHANCEMENTS
      </h1>

      <p 
        className="font-pci-sans-bold leading-[1.15] mb-8"
        style={{ fontSize: 'var(--text-paragraph)' }}
      >
        Improvements to existing animations, replacing linear transitions with physics-based springs and organic motion.
      </p>

      {/* Demo G: Carousel Pause on Hover */}
      <DemoGCarouselPause />

      {/* Demo H: Menu Squiggle Morphing */}
      <DemoHSquiggleMorph />

      {/* Demo I: Work Overlay Spring */}
      <DemoIOverlaySpring />
    </div>
  );
}

// Demo G: Client Carousel Pause/Highlight on Hover
function DemoGCarouselPause() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const logos = ['ABC', 'NBC', 'HBO', 'CBS', 'FOX', 'FX', 'BBC', 'IFC'];

  const codeExample = `import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';

function Logo({ name, isHovered, onHover }) {
  const spring = useSpring({
    scale: isHovered ? 1.15 : 1,
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div
      style={spring}
      onMouseEnter={onHover}
    >
      {name}
    </animated.div>
  );
}`;

  return (
    <DemoCard
      title="G. Client Carousel Pause & Highlight on Hover"
      description="Hovering a logo slows the carousel and adds a spring-based scale effect. Desktop only."
    >
      <ComparisonView
        before={
          <div>
            <p className="text-xs mb-4 opacity-70">Current: Continuous scroll, no hover effect</p>
            <div className="flex gap-4 overflow-hidden">
              <style jsx>{`
                @keyframes marquee-demo {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
              `}</style>
              <div 
                className="flex gap-4"
                style={{ animation: 'marquee-demo 12s linear infinite' }}
              >
                {[...logos, ...logos].map((logo, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 border-2 border-black flex items-center justify-center bg-white font-pci-sans-bold shrink-0"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
        after={
          <div>
            <p className="text-xs mb-4 opacity-70">Enhanced: Hover to pause & scale</p>
            <div className="flex gap-4 overflow-hidden">
              <div 
                className="flex gap-4"
                style={{ 
                  animation: hoveredIndex !== null ? 'none' : 'marquee-demo 12s linear infinite',
                }}
              >
                {logos.map((logo, i) => {
                  const spring = useSpring({
                    scale: hoveredIndex === i ? 1.15 : 1,
                    config: { tension: 300, friction: 20 }
                  });

                  return (
                    <animated.div
                      key={i}
                      style={spring}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="w-20 h-20 border-2 border-black flex items-center justify-center bg-white font-pci-sans-bold shrink-0 cursor-pointer"
                    >
                      {logo}
                    </animated.div>
                  );
                })}
              </div>
            </div>
          </div>
        }
      />

      <CodeBlock code={codeExample} title="React Spring Enhancement" />
    </DemoCard>
  );
}

// Demo H: Menu Squiggle with Path Morphing
function DemoHSquiggleMorph() {
  const [isHovered, setIsHovered] = useState(false);

  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    hover: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] }
    },
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] }
    }
  };

  const codeExample = `import { motion } from 'framer-motion';

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  hover: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  exit: { pathLength: 0, opacity: 0 }
};

<div onMouseEnter={() => setHovered(true)}>
  <p>Menu Item</p>
  <motion.svg>
    <motion.path
      d="M0,3 Q10,0 20,3 T40,3"
      variants={pathVariants}
      initial="initial"
      animate={isHovered ? "hover" : "exit"}
    />
  </motion.svg>
</div>`;

  return (
    <DemoCard
      title="H. Menu Squiggle with Path Morphing"
      description="Smoother squiggle animation using Motion's path morphing instead of frame-by-frame images."
    >
      <ComparisonView
        before={
          <div>
            <p className="text-xs mb-4 opacity-70">Current: Frame-by-frame images</p>
            <div 
              className="border-2 border-black p-6 bg-[#f2efea] inline-block cursor-pointer"
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.src = '/assets/Squiggle 3.svg';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.src = '/assets/Squiggle 1.svg';
              }}
            >
              <p className="font-pci-sans-bold mb-2" style={{ fontSize: 'var(--text-menu)' }}>
                WORK
              </p>
              <img src="/assets/Squiggle 1.svg" alt="" className="w-full h-2" />
            </div>
          </div>
        }
        after={
          <div>
            <p className="text-xs mb-4 opacity-70">Enhanced: Smooth path animation</p>
            <div 
              className="border-2 border-black p-6 bg-[#f2efea] inline-block cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <p className="font-pci-sans-bold mb-2" style={{ fontSize: 'var(--text-menu)' }}>
                WORK
              </p>
              <svg className="w-full h-2" viewBox="0 0 100 6">
                <motion.path
                  d="M0,3 Q12.5,0 25,3 T50,3 T75,3 T100,3"
                  stroke="#000"
                  strokeWidth="2"
                  fill="none"
                  variants={pathVariants}
                  initial="initial"
                  animate={isHovered ? "hover" : "exit"}
                />
              </svg>
            </div>
          </div>
        }
      />

      <CodeBlock code={codeExample} title="Framer Motion Path Animation" />
    </DemoCard>
  );
}

// Demo I: Work Overlay with Spring Physics
function DemoIOverlaySpring() {
  const [isHovered, setIsHovered] = useState(false);

  const overlaySpring = useSpring({
    opacity: isHovered ? 1 : 0,
    scale: isHovered ? 1 : 0.95,
    y: isHovered ? 0 : 10,
    config: { tension: 200, friction: 20 }
  });

  const imageSpring = useSpring({
    y: isHovered ? -5 : 0,
    config: { tension: 180, friction: 12 }
  });

  const codeExample = `import { useSpring, animated } from '@react-spring/web';

const overlaySpring = useSpring({
  opacity: isHovered ? 1 : 0,
  scale: isHovered ? 1 : 0.95,
  y: isHovered ? 0 : 10,
  config: { tension: 200, friction: 20 }
});

const imageSpring = useSpring({
  y: isHovered ? -5 : 0,
  config: { tension: 180, friction: 12 }
});

<div onMouseEnter={() => setHovered(true)}>
  <animated.img style={imageSpring} src="..." />
  <animated.div style={overlaySpring}>
    Overlay Content
  </animated.div>
</div>`;

  return (
    <DemoCard
      title="I. Work Overlay with Spring Physics"
      description="Replace CSS transitions with spring physics for more organic hover effects on work cards."
    >
      <ComparisonView
        before={
          <div>
            <p className="text-xs mb-4 opacity-70">Current: CSS transitions (linear)</p>
            <div className="relative group cursor-pointer border-2 border-black overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-[#8b5fbf] to-[#f37d7d]" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                <p className="font-pci-sans-bold text-white text-xl">PROJECT TITLE</p>
              </div>
            </div>
          </div>
        }
        after={
          <div>
            <p className="text-xs mb-4 opacity-70">Enhanced: Spring physics (organic)</p>
            <div 
              className="relative cursor-pointer border-2 border-black overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <animated.div 
                style={imageSpring}
                className="aspect-video bg-gradient-to-br from-[#8b5fbf] to-[#f37d7d]" 
              />
              <animated.div 
                style={{
                  ...overlaySpring,
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <p className="font-pci-sans-bold text-white text-xl">PROJECT TITLE</p>
              </animated.div>
            </div>
          </div>
        }
      />

      <CodeBlock code={codeExample} title="React Spring Overlay Effect" />
    </DemoCard>
  );
}

