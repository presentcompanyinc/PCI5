'use client';

/**
 * Scroll Animation Demos
 * Demonstrations of animations triggered by scrolling
 */

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { DemoCard, DemoControls, CodeBlock } from '@/components/demos';

export default function ScrollDemos() {
  return (
    <div>
      <h1 
        className="font-pci-sans-bold text-black mb-6"
        style={{ fontSize: 'var(--text-header)' }}
      >
        SCROLL ANIMATIONS
      </h1>

      <p 
        className="font-pci-sans-bold leading-[1.15] mb-8"
        style={{ fontSize: 'var(--text-paragraph)' }}
      >
        Animations that respond to user scrolling, revealing content progressively and adding depth.
      </p>

      {/* Demo D: Section Fade-Up */}
      <DemoDSectionFadeUp />

      {/* Demo E: Parallax Effect */}
      <DemoEParallax />

      {/* Demo F: Logo Pop Sequence */}
      <DemoFLogoPop />
    </div>
  );
}

// Demo D: Section Fade-Up with Rotation Jitter
function DemoDSectionFadeUp() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const sections = [
    { title: "FEATURED", color: "#f37d7d", rotation: 359 },
    { title: "SERVICES", color: "#03bed8", rotation: 1 },
    { title: "CLIENTS", color: "#8b5fbf", rotation: 358 },
  ];

  const codeExample = `import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function Section() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: -2 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotate: 359 
      } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2>SECTION TITLE</h2>
    </motion.div>
  );
}`;

  return (
    <DemoCard
      title="D. Section Fade-Up with Rotation Jitter"
      description="Sections fade up and rotate slightly when they enter the viewport. Maintains the playful, hand-placed aesthetic."
    >
      <div className="bg-white border-2 border-black p-4 space-y-32">
        <p className="text-sm opacity-70">Scroll down to see sections animate in ↓</p>
        
        <div style={{ height: '200px' }} className="flex items-center justify-center opacity-30">
          <p>Scroll down...</p>
        </div>

        {sections.map((section, index) => {
          const sectionRef = useRef(null);
          const sectionInView = useInView(sectionRef, { once: true, amount: 0.3 });
          
          return (
            <motion.div
              key={section.title}
              ref={sectionRef}
              initial={{ opacity: 0, y: 50, rotate: section.rotation - 359 }}
              animate={sectionInView ? { 
                opacity: 1, 
                y: 0, 
                rotate: section.rotation 
              } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="border-2 border-black p-8"
              style={{ backgroundColor: section.color }}
            >
              <h3 className="font-pci-sans-bold text-4xl">{section.title}</h3>
              <p className="mt-2 opacity-80">This section animates when scrolled into view</p>
            </motion.div>
          );
        })}

        <div style={{ height: '200px' }} />
      </div>

      <CodeBlock code={codeExample} title="Framer Motion useInView" />
    </DemoCard>
  );
}

// Demo E: Parallax Depth Effect
function DemoEParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const codeExample = `import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={ref}>
      <motion.div style={{ y: y1 }}>Background Layer</motion.div>
      <motion.div style={{ y: y2 }}>Foreground Layer</motion.div>
    </div>
  );
}`;

  return (
    <DemoCard
      title="E. Parallax Depth Effect"
      description="Images move at different speeds when scrolling, creating depth. Perfect for featured work sections."
    >
      <div className="bg-[#f2efea] border-2 border-black overflow-hidden" style={{ height: '600px' }}>
        <p className="text-sm opacity-70 p-4">Scroll within this area to see parallax ↓</p>
        
        <div 
          ref={containerRef}
          className="h-full overflow-y-scroll relative"
          style={{ perspective: '1000px' }}
        >
          <div style={{ height: '1200px', position: 'relative' }}>
            {/* Background Layer - slowest */}
            <motion.div
              style={{ 
                y: y1,
                position: 'absolute',
                top: '100px',
                left: '20px',
                width: '200px',
                height: '200px',
                backgroundColor: '#8b5fbf',
                border: '2px solid black'
              }}
              className="flex items-center justify-center font-pci-sans-bold"
            >
              SLOW
            </motion.div>

            {/* Middle Layer */}
            <motion.div
              style={{ 
                y: y2,
                position: 'absolute',
                top: '150px',
                right: '20px',
                width: '180px',
                height: '180px',
                backgroundColor: '#03bed8',
                border: '2px solid black',
                zIndex: 10
              }}
              className="flex items-center justify-center font-pci-sans-bold"
            >
              MEDIUM
            </motion.div>

            {/* Foreground Layer - fastest */}
            <motion.div
              style={{ 
                y: y3,
                position: 'absolute',
                top: '300px',
                left: '50%',
                marginLeft: '-100px',
                width: '200px',
                height: '200px',
                backgroundColor: '#f37d7d',
                border: '2px solid black',
                zIndex: 20
              }}
              className="flex items-center justify-center font-pci-sans-bold"
            >
              FAST
            </motion.div>
          </div>
        </div>
      </div>

      <CodeBlock code={codeExample} title="Framer Motion Parallax" />

      <div className="mt-4 bg-[#fff3cd] border-2 border-black p-4">
        <p className="text-sm font-pci-sans-bold">
          💡 Mobile: Reduce parallax offset (10-20px) or disable entirely to avoid motion sickness.
        </p>
      </div>
    </DemoCard>
  );
}

// Demo F: Logo Pop Sequence
function DemoFLogoPop() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const logos = [
    { name: 'ABC', color: '#f37d7d' },
    { name: 'NBC', color: '#03bed8' },
    { name: 'HBO', color: '#8b5fbf' },
    { name: 'CBS', color: '#666a47' },
    { name: 'FOX', color: '#f37d7d' },
    { name: 'FX', color: '#03bed8' },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1], // Bounce easing
      },
    },
  };

  const codeExample = `import { motion, useInView } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1], // Bounce
    },
  },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
>
  {logos.map((logo) => (
    <motion.div key={logo} variants={itemVariants}>
      {logo}
    </motion.div>
  ))}
</motion.div>`;

  return (
    <DemoCard
      title="F. Logo Pop Sequence on Scroll"
      description="Client logos pop in with bounce when section enters view. Only triggers once per page load."
    >
      <div className="bg-white border-2 border-black p-8">
        <p className="text-sm opacity-70 mb-8">Scroll down to trigger the animation ↓</p>
        
        <div style={{ height: '300px' }} className="flex items-center justify-center opacity-30">
          <p>Keep scrolling...</p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-8"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              variants={itemVariants}
              className="aspect-square border-2 border-black flex items-center justify-center font-pci-sans-bold"
              style={{ backgroundColor: logo.color }}
            >
              {logo.name}
            </motion.div>
          ))}
        </motion.div>

        <div style={{ height: '300px' }} />
      </div>

      <CodeBlock code={codeExample} title="Framer Motion Stagger Animation" />
    </DemoCard>
  );
}

