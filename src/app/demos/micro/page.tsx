'use client';

/**
 * Micro Animation Demos
 * Small interactive details and polish
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated, config } from '@react-spring/web';
import { DemoCard, CodeBlock } from '@/components/demos';

export default function MicroDemos() {
  return (
    <div>
      <h1 
        className="font-pci-sans-bold text-black mb-6"
        style={{ fontSize: 'var(--text-header)' }}
      >
        MICRO ANIMATIONS
      </h1>

      <p 
        className="font-pci-sans-bold leading-[1.15] mb-8"
        style={{ fontSize: 'var(--text-paragraph)' }}
      >
        Small, delightful interactions that add polish and personality without overwhelming the user.
      </p>

      {/* Demo J: Button Wiggle */}
      <DemoJButtonWiggle />

      {/* Demo K: Footer Float */}
      <DemoKFooterFloat />

      {/* Demo L: Modal Spring Entry */}
      <DemoLModalSpring />
    </div>
  );
}

// Demo J: Button Wiggle on Hover
function DemoJButtonWiggle() {
  const [isHovered, setIsHovered] = useState(false);

  const wiggleVariants = {
    hover: {
      rotate: [0, -1, 1, -1, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 0.2
      }
    }
  };

  const codeExample = `import { motion } from 'framer-motion';

const wiggleVariants = {
  hover: {
    rotate: [0, -1, 1, -1, 1, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 0.2
    }
  }
};

<motion.button
  variants={wiggleVariants}
  whileHover="hover"
>
  VIEW MORE WORK
</motion.button>`;

  return (
    <DemoCard
      title="J. Button Wiggle on Hover"
      description="Buttons get a subtle rotation oscillation on hover, fitting the hand-drawn aesthetic."
    >
      <div className="bg-[#f2efea] border-2 border-black p-8 flex items-center justify-center">
        <motion.button
          variants={wiggleVariants}
          whileHover="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="px-6 py-3 bg-white border-2 border-black font-pci-sans-bold flex items-center gap-2 cursor-pointer"
          style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
        >
          VIEW MORE WORK
          <span>→</span>
        </motion.button>
      </div>

      <CodeBlock code={codeExample} title="Framer Motion Wiggle Effect" />

      <div className="mt-4 bg-[#fff3cd] border-2 border-black p-4">
        <p className="text-sm font-pci-sans-bold">
          💡 Mobile: Use single bounce on tap instead of continuous wiggle.
        </p>
      </div>
    </DemoCard>
  );
}

// Demo K: Footer Float Elements
function DemoKFooterFloat() {
  const float1 = useSpring({
    from: { y: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: -8 });
        await next({ y: 0 });
      }
    },
    config: { duration: 3000 }
  });

  const float2 = useSpring({
    from: { y: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: -6 });
        await next({ y: 0 });
      }
    },
    config: { duration: 3500 }
  });

  const float3 = useSpring({
    from: { y: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: -10 });
        await next({ y: 0 });
      }
    },
    config: { duration: 4000 }
  });

  const codeExample = `import { useSpring, animated } from '@react-spring/web';

const float = useSpring({
  from: { y: 0 },
  to: async (next) => {
    while (true) {
      await next({ y: -8 });
      await next({ y: 0 });
    }
  },
  config: { duration: 3000 }
});

<animated.div style={float}>
  Floating Element
</animated.div>`;

  return (
    <DemoCard
      title="K. Footer Float Elements"
      description="Very subtle floating motion creates a living, organic quality. Desktop only to preserve battery."
    >
      <div className="bg-[#f2efea] border-2 border-black p-8">
        <div className="flex justify-around items-end h-40">
          <animated.div 
            style={float1}
            className="w-16 h-16 bg-[#f37d7d] border-2 border-black flex items-center justify-center font-pci-sans-bold text-xs"
          >
            PCI
          </animated.div>
          <animated.div 
            style={float2}
            className="w-20 h-20 bg-[#03bed8] border-2 border-black rounded-full flex items-center justify-center font-pci-sans-bold text-xs"
          >
            MUSIC
          </animated.div>
          <animated.div 
            style={float3}
            className="w-16 h-16 bg-[#8b5fbf] border-2 border-black flex items-center justify-center font-pci-sans-bold text-xs"
          >
            2025
          </animated.div>
        </div>
      </div>

      <CodeBlock code={codeExample} title="React Spring Infinite Loop" />

      <div className="mt-4 bg-[#fff3cd] border-2 border-black p-4">
        <p className="text-sm font-pci-sans-bold">
          💡 Keep motion very subtle (1-2px) and slow (3-4s cycles) to avoid distraction.
        </p>
      </div>
    </DemoCard>
  );
}

// Demo L: Contact Modal Spring Entry
function DemoLModalSpring() {
  const [isOpen, setIsOpen] = useState(false);

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 50
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const codeExample = `import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: { scale: 0.8, opacity: 0, y: 50 }
};

<AnimatePresence>
  {isOpen && (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      Modal Content
    </motion.div>
  )}
</AnimatePresence>`;

  return (
    <DemoCard
      title="L. Contact Modal Spring Entry"
      description="Modal bounces in with spring physics instead of simple fade, creating a more engaging interaction."
    >
      <div className="bg-[#f2efea] border-2 border-black p-8 flex flex-col items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-[#03bed8] border-2 border-black font-pci-sans-bold cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform"
        >
          OPEN MODAL
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 cursor-pointer"
              />

              {/* Modal */}
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-black p-8 z-50 max-w-md w-full"
                style={{ boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-pci-sans-bold text-2xl">
                    CONTACT US
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 border-2 border-black font-pci-sans-bold hover:bg-[#f37d7d] transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full border-2 border-black p-2 font-pci-sans-bold"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email"
                    className="w-full border-2 border-black p-2 font-pci-sans-bold"
                  />
                  <textarea 
                    placeholder="Your Message"
                    className="w-full border-2 border-black p-2 font-pci-sans-bold h-24"
                  />
                  <button className="w-full bg-[#03bed8] border-2 border-black p-3 font-pci-sans-bold hover:translate-x-1 hover:translate-y-1 transition-transform">
                    SEND MESSAGE
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <CodeBlock code={codeExample} title="Framer Motion Modal with Spring" />

      <div className="mt-4 bg-[#fff3cd] border-2 border-black p-4">
        <p className="text-sm font-pci-sans-bold">
          💡 Always respect prefers-reduced-motion by disabling spring effects when needed.
        </p>
      </div>
    </DemoCard>
  );
}

