'use client';

/**
 * Page Load Animation Demos
 * Demonstrations of animations that trigger on page load
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { DemoCard, DemoControls, CodeBlock } from '@/components/demos';

export default function PageLoadDemos() {
  return (
    <div>
      <h1 
        className="font-pci-sans-bold text-black mb-6"
        style={{ fontSize: 'var(--text-header)' }}
      >
        PAGE LOAD ANIMATIONS
      </h1>

      <p 
        className="font-pci-sans-bold leading-[1.15] mb-8"
        style={{ fontSize: 'var(--text-paragraph)' }}
      >
        Animations that create impact when pages first load, establishing tone and drawing attention.
      </p>

      {/* Demo A: Staggered Text Reveal */}
      <DemoAStaggeredText />

      {/* Demo B: Logo Stamp Effect */}
      <DemoBLogoStamp />

      {/* Demo C: Divider Draw In */}
      <DemoCDividerDraw />
    </div>
  );
}

// Demo A: Staggered Text Reveal with Rotation Jitter
function DemoAStaggeredText() {
  const [key, setKey] = useState(0);
  const [duration, setDuration] = useState(0.6);
  const [delay, setDelay] = useState(0.05);

  const text = "Made-to-measure music from artists with years of experience.";
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotate: Math.random() * 4 - 2, // -2 to +2 degrees
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: Math.random() * 2 - 1, // -1 to +1 degrees
      transition: { 
        duration: duration,
        ease: [0.43, 0.13, 0.23, 0.96] as const
      }
    },
  };

  const codeExample = `import { motion } from 'framer-motion';

const text = "Made-to-measure music from artists with years of experience.";
const words = text.split(' ');

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    rotate: Math.random() * 4 - 2,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotate: Math.random() * 2 - 1,
    transition: { duration: 0.6 }
  },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {words.map((word, i) => (
    <motion.span
      key={i}
      variants={wordVariants}
      style={{ display: 'inline-block', marginRight: '0.3em' }}
    >
      {word}
    </motion.span>
  ))}
</motion.div>`;

  return (
    <DemoCard
      title="A. Staggered Text Reveal with Rotation Jitter"
      description="Words fade in one by one with subtle rotation, creating a hand-drawn, organic feel. Perfect for intro text sections."
    >
      <DemoControls
        onDurationChange={setDuration}
        onDelayChange={setDelay}
        showView={false}
        defaultDuration={duration}
        defaultDelay={delay}
      />

      <button
        onClick={() => setKey(k => k + 1)}
        className="mb-4 px-4 py-2 bg-[#03bed8] border-2 border-black font-pci-sans-bold text-sm hover:translate-x-1 hover:translate-y-1 transition-transform"
      >
        Replay Animation
      </button>

      <div className="bg-[#f2efea] border-2 border-black p-8">
        <motion.div
          key={key}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-pci-sans-bold leading-[1.15]"
          style={{ fontSize: 'var(--text-paragraph)' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <CodeBlock code={codeExample} title="Framer Motion Implementation" />
    </DemoCard>
  );
}

// Demo B: Logo Stamp Effect
function DemoBLogoStamp() {
  const [isAnimating, setIsAnimating] = useState(false);

  const spring1 = useSpring({
    from: { scale: 0, rotate: -5 },
    to: isAnimating ? { scale: 1, rotate: 359 } : { scale: 0, rotate: -5 },
    config: { tension: 300, friction: 15 },
    delay: 0,
    onRest: () => setIsAnimating(false),
  });

  const spring2 = useSpring({
    from: { scale: 0, rotate: 3 },
    to: isAnimating ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 3 },
    config: { tension: 300, friction: 15 },
    delay: 100,
  });

  const spring3 = useSpring({
    from: { scale: 0, rotate: -2 },
    to: isAnimating ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -2 },
    config: { tension: 300, friction: 15 },
    delay: 200,
  });

  const replay = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  };

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const codeExample = `import { useSpring, animated } from '@react-spring/web';

const spring1 = useSpring({
  from: { scale: 0, rotate: -5 },
  to: { scale: 1, rotate: 359 },
  config: { tension: 300, friction: 15 },
  delay: 0,
});

const spring2 = useSpring({
  from: { scale: 0, rotate: 3 },
  to: { scale: 1, rotate: 0 },
  config: { tension: 300, friction: 15 },
  delay: 100,
});

<animated.div style={spring1}>Present</animated.div>
<animated.div style={spring2}>Company</animated.div>
<animated.div style={spring3}>Included</animated.div>`;

  return (
    <DemoCard
      title="B. Logo Stamp Effect with Spring Bounce"
      description="Header words stamp in with elastic bounce, like rubber stamps hitting paper. Creates playful, energetic page entry."
    >
      <button
        onClick={replay}
        className="mb-4 px-4 py-2 bg-[#03bed8] border-2 border-black font-pci-sans-bold text-sm hover:translate-x-1 hover:translate-y-1 transition-transform"
      >
        Replay Animation
      </button>

      <div className="bg-[#f2efea] border-2 border-black p-8 flex flex-col gap-4">
        <animated.div 
          className="font-pci-sans-bold"
          style={{...spring1, fontSize: 'var(--text-header)' }}
        >
          PRESENT
        </animated.div>
        <animated.div 
          className="font-pci-sans-bold"
          style={{...spring2, fontSize: 'var(--text-header)' }}
        >
          COMPANY
        </animated.div>
        <animated.div 
          className="font-pci-sans-bold"
          style={{...spring3, fontSize: 'var(--text-header)' }}
        >
          INCLUDED
        </animated.div>
      </div>

      <CodeBlock code={codeExample} title="React Spring Implementation" />
    </DemoCard>
  );
}

// Demo C: Divider Draw In
function DemoCDividerDraw() {
  const [key, setKey] = useState(0);

  const pathVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0 
    },
    visible: { 
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    },
  };

  const codeExample = `import { motion } from 'framer-motion';

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" }
  },
};

<motion.svg viewBox="0 0 400 80">
  <motion.path
    d="M0,40 Q100,10 200,40 T400,40"
    variants={pathVariants}
    initial="hidden"
    animate="visible"
  />
</motion.svg>`;

  return (
    <DemoCard
      title="C. Divider Draw-In Effect"
      description="Memphis pattern dividers draw in from left to right, revealing decorative elements progressively. Works with SVG paths."
    >
      <button
        onClick={() => setKey(k => k + 1)}
        className="mb-4 px-4 py-2 bg-[#03bed8] border-2 border-black font-pci-sans-bold text-sm hover:translate-x-1 hover:translate-y-1 transition-transform"
      >
        Replay Animation
      </button>

      <div className="bg-[#f2efea] border-2 border-black p-8">
        <motion.svg 
          key={key}
          className="w-full h-20"
          viewBox="0 0 400 80"
          initial="hidden"
          animate="visible"
        >
          {/* Squiggly line */}
          <motion.path
            d="M0,40 Q50,20 100,40 T200,40 T300,40 T400,40"
            stroke="#f37d7d"
            strokeWidth="4"
            fill="none"
            variants={pathVariants}
          />
          {/* Circles */}
          <motion.circle cx="50" cy="40" r="5" fill="#03bed8" variants={pathVariants} />
          <motion.circle cx="150" cy="40" r="5" fill="#8b5fbf" variants={pathVariants} />
          <motion.circle cx="250" cy="40" r="5" fill="#03bed8" variants={pathVariants} />
          <motion.circle cx="350" cy="40" r="5" fill="#8b5fbf" variants={pathVariants} />
          {/* Triangles */}
          <motion.path
            d="M100,20 L110,35 L90,35 Z"
            fill="#666a47"
            variants={pathVariants}
          />
          <motion.path
            d="M300,20 L310,35 L290,35 Z"
            fill="#666a47"
            variants={pathVariants}
          />
        </motion.svg>
      </div>

      <CodeBlock code={codeExample} title="Framer Motion SVG Animation" />

      <div className="mt-4 bg-[#fff3cd] border-2 border-black p-4">
        <p className="text-sm font-pci-sans-bold">
          💡 Note: This works best with SVG dividers. Could be applied to existing Memphis patterns by tracing paths.
        </p>
      </div>
    </DemoCard>
  );
}

