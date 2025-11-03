'use client';

/**
 * AnimatedFooter - Footer with floating elements and button fill animation
 * Animation 7: Footer Float Elements + Contact Button Fill Effect
 */

import { useState, useRef, useEffect } from 'react';
import { useContactModal } from '@/contexts/ContactModalContext';
import { CONTACT_MODAL_TYPE } from '@/config/contact';
import { WeatherTimeWidget } from '@/components/ui/WeatherTimeWidget';
import { useSpring, animated } from '@react-spring/web';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { getRandomButtonColor, getFixedButtonColor } from '@/lib/contactButtonRandomizer';
import { ContactButton } from '@/components/ui/ContactButton';

export function AnimatedFooter() {
  const { openFormModal, openInfoModal } = useContactModal();
  const openContactModal = CONTACT_MODAL_TYPE === 'form' ? openFormModal : openInfoModal;
  const [isHovered, setIsHovered] = useState(false);
  const [buttonColor, setButtonColor] = useState(getFixedButtonColor());
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTouchDevice = useTouchDevice();

  // Randomize color on client-side mount to prevent hydration mismatch
  useEffect(() => {
    setButtonColor(getRandomButtonColor());
  }, []);

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
            ref={buttonRef}
            onClick={openContactModal}
            onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
            onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
            className="relative cursor-pointer w-full h-full"
          >
            <ContactButton
              fillColor={isHovered ? buttonColor : 'transparent'}
              animationStyle="wipe"
              className="w-full h-full transition-transform hover:scale-105"
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
          <p className="leading-normal whitespace-pre">COPYRIGHT 2025 P.C.I.</p>
        </animated.div>

        <WeatherTimeWidget />

        <animated.a 
          href="https://www.instagram.com/swiftstudiesdaily/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            y: float3.y,
            x: float3.x,
            rotate: float3.rotate
          }} 
          className="font-pci-sans-bold shrink-0 hover:opacity-70 transition-opacity"
        >
          <p className="leading-normal whitespace-pre">INSTAGRAM</p>
        </animated.a>
      </div>
    </div>
  );
}

