'use client';

/**
 * AnimatedFooter - Footer with floating elements and button fill animation
 * Animation 7: Footer Float Elements + Contact Button Fill Effect
 */

import { useState } from 'react';
import { useContactModal } from '@/contexts/ContactModalContext';
import { CONTACT_MODAL_TYPE } from '@/config/contact';
import { WeatherTimeWidget } from '@/components/ui/WeatherTimeWidget';
import { useSpring, animated } from '@react-spring/web';
import { motion } from 'framer-motion';

const CONTACT_BUTTON = '/assets/ContactUs.svg';

export function AnimatedFooter() {
  const { openFormModal, openInfoModal } = useContactModal();
  const openContactModal = CONTACT_MODAL_TYPE === 'form' ? openFormModal : openInfoModal;
  const [isHovered, setIsHovered] = useState(false);

  // Subtle float animation for contact button - gentle movement with slight rotation
  const float1 = useSpring({
    from: { y: 0, rotate: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: -6, rotate: -0.5 });
        await next({ y: 0, rotate: 0 });
      }
    },
    config: { tension: 80, friction: 20, mass: 2 }
  });

  // Subtle float animation for copyright text - gentle vertical movement
  const float2 = useSpring({
    from: { y: 0, x: 0, rotate: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: -4, x: 1, rotate: 0.3 });
        await next({ y: 0, x: 0, rotate: 0 });
      }
    },
    config: { tension: 70, friction: 22, mass: 2.5 }
  });

  // Subtle float animation for instagram text - gentle opposite movement
  const float3 = useSpring({
    from: { y: 0, x: 0, rotate: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: -5, x: -1, rotate: -0.3 });
        await next({ y: 0, x: 0, rotate: 0 });
      }
    },
    config: { tension: 75, friction: 21, mass: 2.2 }
  });

  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-center w-full pb-20 md:pb-0"
      style={{
        gap: 'var(--padding-gap-large)',
        padding: 'var(--padding-tb) var(--padding-lr) 0'
      }}
    >
      {/* Contact Button with Float and Fill Animation */}
      <div className="flex items-center justify-center">
        <animated.div
          className="relative"
          style={{
            y: float1.y,
            rotate: float1.rotate,
            width: 'var(--contact-button-width)',
            height: 'auto',
            aspectRatio: '356/95.986'
          }}
        >
          <button
            onClick={openContactModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative cursor-pointer w-full h-full group"
          >
            {/* Scribbled fill animation - multiple irregular shapes for organic feel */}
            <div className="absolute inset-0" style={{ margin: '8px', zIndex: 0 }}>
              {/* Layer 1 - Bottom scribble */}
              <motion.div
                className="absolute inset-0 bg-[#03bed8] rounded-[48px]"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ 
                  clipPath: isHovered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)'
                }}
                transition={{ 
                  duration: 0.25, 
                  ease: [0.65, 0, 0.35, 1] as const,
                  delay: 0
                }}
              />
              {/* Layer 2 - Middle scribble with offset */}
              <motion.div
                className="absolute inset-0 bg-[#03bed8] rounded-[48px]"
                style={{ 
                  clipPath: 'polygon(0 30%, 100% 20%, 100% 70%, 0 80%)',
                  transformOrigin: 'left'
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.87, 0, 0.13, 1] as const,
                  delay: 0.05
                }}
              />
              {/* Layer 3 - Top scribble */}
              <motion.div
                className="absolute inset-0 bg-[#03bed8] rounded-[48px]"
                initial={{ clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' }}
                animate={{ 
                  clipPath: isHovered 
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                    : 'polygon(0 0, 0% 0, 0% 100%, 0 100%)'
                }}
                transition={{ 
                  duration: 0.35, 
                  ease: [0.76, 0, 0.24, 1] as const,
                  delay: 0.1
                }}
              />
            </div>
            {/* Button SVG on top */}
            <img 
              alt="Contact Us" 
              className="relative w-full h-full z-10 transition-transform group-hover:scale-105" 
              src={CONTACT_BUTTON} 
            />
          </button>
        </animated.div>
      </div>

      {/* Footer Info with Float */}
      <div 
        className="bg-[#f2efea] flex flex-col md:flex-row items-center md:items-start justify-between text-black text-center w-full max-w-[1440px]"
        style={{
          fontSize: 'var(--text-tiny)',
          padding: '0 var(--padding-lr)',
          gap: 'var(--padding-gap)'
        }}
      >
        <animated.div 
          style={{
            y: float2.y,
            x: float2.x,
            rotate: float2.rotate
          }} 
          className="font-pci-sans-bold shrink-0"
        >
          <p className="leading-normal whitespace-pre">COPYRIGHT 2025 P.C.I</p>
        </animated.div>

        <WeatherTimeWidget />

        <animated.div 
          style={{
            y: float3.y,
            x: float3.x,
            rotate: float3.rotate
          }} 
          className="font-pci-sans-bold shrink-0"
        >
          <p className="leading-normal whitespace-pre">INSTAGRAM</p>
        </animated.div>
      </div>
    </div>
  );
}

