/**
 * FeaturedWorkSection component - Latest work highlights
 * Extracted from Figma design
 */

"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTouchDevice } from '@/hooks/useTouchDevice';

const IMG_THE_PAPER = '/assets/PCI_ThePaper.jpg';
const IMG_THE_PAPER_OVERLAY = '/assets/PCI_ThePaper_NoTitle.jpg';
const IMG_ANYTHING_ROOTS = '/assets/PCI_RootsSquare.jpg';
const IMG_ANYTHING_ROOTS_OVERLAY = '/assets/PCI_RootsSquare_NoTitle.png';
const IMG_SERIAL = '/assets/PCI_Serial.jpg';
const IMG_SERIAL_OVERLAY = '/assets/PCI_Serial_NoTitle.jpg';
const ARROW = '/assets/arrow.svg';

export function FeaturedWorkSection() {
  const router = useRouter();
  const isTouchDevice = useTouchDevice();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [transitionSpeed, setTransitionSpeed] = useState<'fast' | 'slow'>('slow');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleViewMoreClick = () => {
    router.push('/work');
  };

  // Handle card tap on mobile devices
  const handleCardTap = (cardIndex: number) => {
    if (!isTouchDevice) return;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Toggle behavior: if card is already active, deactivate it with fast transition
    if (activeCard === cardIndex) {
      setTransitionSpeed('fast');
      setActiveCard(null);
      return;
    }
    
    // Set the card as active with slow transition
    setTransitionSpeed('slow');
    setActiveCard(cardIndex);
    
    // Set timer to deactivate after 1.25 seconds with slow transition
    timerRef.current = setTimeout(() => {
      setTransitionSpeed('slow');
      setActiveCard(null);
      timerRef.current = null;
    }, 1250);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const durationClass = transitionSpeed === 'fast' ? 'duration-200' : 'duration-500';

  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start w-full" 
      style={{ gap: 'var(--padding-gap)' }}
      data-name="Latest Work Frame"
    >
      {/* Title and View More */}
      <div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full"
        style={{ padding: '0 var(--padding-lr)', gap: '16px' }}
      >
        <div style={{ transform: 'rotate(359deg)' }}>
          <p
            className="font-pci-sans-bold text-black leading-normal whitespace-pre"
            style={{ 
              fontSize: 'var(--text-header)',
              fontVariationSettings: "'wght' 700" 
            }}
          >
            FEATURED
          </p>
        </div>

        <button 
          onClick={handleViewMoreClick}
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ gap: '8px' }}
        >
          <div style={{ transform: 'rotate(0.75deg)' }} className="flex items-center">
            <p 
              className="font-pci-sans-bold text-black leading-normal whitespace-nowrap"
              style={{ fontSize: 'var(--text-menu)' }}
            >
              VIEW MORE WORK
            </p>
            <div className="flex-shrink-0 ml-2 w-[18px] h-[12px] md:w-[24px] md:h-[16px] lg:w-[48px] lg:h-[32px]">
              <img alt="arrow" className="w-full h-full" src={ARROW} />
            </div>
          </div>
        </button>
      </div>

      {/* Main Featured Image */}
      <div 
        className="w-full relative group cursor-pointer overflow-hidden" 
        style={{ aspectRatio: '4096/1886' }}
        onClick={() => handleCardTap(0)}
      >
        <Image
          alt="The Paper"
          src={IMG_THE_PAPER}
          fill
          sizes="100vw"
          quality={90}
          priority
          className={`object-cover transition-all ${durationClass} ease-in-out ${
            isTouchDevice 
              ? (activeCard === 0 ? 'opacity-0' : 'opacity-100')
              : 'group-hover:opacity-0'
          }`}
        />
        <Image
          alt="The Paper"
          src={IMG_THE_PAPER_OVERLAY}
          fill
          sizes="100vw"
          quality={90}
          className={`object-cover transition-all ${durationClass} ease-in-out ${
            isTouchDevice 
              ? (activeCard === 0 ? 'opacity-100' : 'opacity-0')
              : 'opacity-0 group-hover:opacity-100'
          }`}
        />
        <div className={`absolute inset-0 bg-[rgba(3,3,3,0.6)] transition-opacity ${durationClass} ease-in-out flex items-start justify-start p-[10px] ${
          isTouchDevice 
            ? (activeCard === 0 ? 'opacity-100' : 'opacity-0')
            : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div 
            className="flex flex-col w-full"
            style={{
              padding: 'var(--overlay-padding)',
              gap: 'var(--overlay-gap)'
            }}
          >
            <div className="flex flex-col gap-[13px]">
              <div className="w-full">
                <p 
                  className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                  style={{ fontSize: 'var(--text-overlay-title)' }}
                >
                  The Paper
                </p>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p 
                  className="font-pci-sans-bold text-[#cecece] leading-normal"
                  style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                >
                  Main Theme
                </p>
                <p 
                  className="font-pci-sans-bold text-[#cecece] leading-normal"
                  style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                >
                  Created by Greg Daniels
                </p>
              </div>
            </div>
            <div className="w-full">
              <p 
                className="font-pci-sans-bold text-[#cecece] leading-normal"
                style={{ fontSize: 'var(--text-overlay-subtitle)' }}
              >
                NBC Universal Peacock
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid - stays side-by-side on mobile */}
      <div 
        className="flex flex-row items-start w-full"
        style={{ gap: 'var(--padding-gap)' }}
      >
        <div 
          className="flex-1 relative group cursor-pointer overflow-hidden" 
          style={{ aspectRatio: '2000/2000' }}
          onClick={() => handleCardTap(1)}
        >
          <Image
            alt="Anything Roots"
            src={IMG_ANYTHING_ROOTS}
            fill
            sizes="50vw"
            quality={90}
            className={`object-cover transition-all ${durationClass} ease-in-out ${
              isTouchDevice 
                ? (activeCard === 1 ? 'opacity-0' : 'opacity-100')
                : 'group-hover:opacity-0'
            }`}
          />
          <Image
            alt="Anything Roots"
            src={IMG_ANYTHING_ROOTS_OVERLAY}
            fill
            sizes="50vw"
            quality={90}
            className={`object-cover transition-all ${durationClass} ease-in-out ${
              isTouchDevice 
                ? (activeCard === 1 ? 'opacity-100' : 'opacity-0')
                : 'opacity-0 group-hover:opacity-100'
            }`}
          />
          <div className={`absolute inset-0 bg-[rgba(3,3,3,0.6)] transition-opacity ${durationClass} ease-in-out flex items-start justify-start p-[10px] ${
            isTouchDevice 
              ? (activeCard === 1 ? 'opacity-100' : 'opacity-0')
              : 'opacity-0 group-hover:opacity-100'
          }`}>
            <div 
              className="flex flex-col w-full"
              style={{
                padding: 'var(--overlay-padding)',
                gap: 'var(--overlay-gap)'
              }}
            >
              <div className="flex flex-col gap-[13px]">
                <div className="w-full">
                  <p 
                    className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                    style={{ fontSize: 'var(--text-overlay-title)' }}
                  >
                    ANYTHING ROOTS
                  </p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p 
                    className="font-pci-sans-bold text-[#cecece] leading-normal"
                    style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                  >
                  Custom Music
                </p>
                <p 
                  className="font-pci-sans-bold text-[#cecece] leading-normal"
                  style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                >
                  dir. Josh Locy
                </p>
              </div>
            </div>
            <div className="w-full">
              <p 
                className="font-pci-sans-bold text-[#cecece] leading-normal"
                style={{ fontSize: 'var(--text-overlay-subtitle)' }}
              >
                Cartel
              </p>
              </div>
            </div>
          </div>
        </div>
        <div 
          className="flex-1 relative group cursor-pointer overflow-hidden" 
          style={{ aspectRatio: '2000/2000' }}
          onClick={() => handleCardTap(2)}
        >
          <Image
            alt="Serial"
            src={IMG_SERIAL}
            fill
            sizes="50vw"
            quality={90}
            className={`object-cover transition-all ${durationClass} ease-in-out ${
              isTouchDevice 
                ? (activeCard === 2 ? 'opacity-0' : 'opacity-100')
                : 'group-hover:opacity-0'
            }`}
          />
          <Image
            alt="Serial"
            src={IMG_SERIAL_OVERLAY}
            fill
            sizes="50vw"
            quality={90}
            className={`object-cover transition-all ${durationClass} ease-in-out ${
              isTouchDevice 
                ? (activeCard === 2 ? 'opacity-100' : 'opacity-0')
                : 'opacity-0 group-hover:opacity-100'
            }`}
          />
          <div className={`absolute inset-0 bg-[rgba(3,3,3,0.6)] transition-opacity ${durationClass} ease-in-out flex items-start justify-start p-[10px] ${
            isTouchDevice 
              ? (activeCard === 2 ? 'opacity-100' : 'opacity-0')
              : 'opacity-0 group-hover:opacity-100'
          }`}>
            <div 
              className="flex flex-col w-full"
              style={{
                padding: 'var(--overlay-padding)',
                gap: 'var(--overlay-gap)'
              }}
            >
              <div className="flex flex-col gap-[13px]">
                <div className="w-full">
                  <p 
                    className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                    style={{ fontSize: 'var(--text-overlay-title)' }}
                  >
                    Serial
                  </p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p 
                    className="font-pci-sans-bold text-[#cecece] leading-normal"
                    style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                  >
                  Original Theme + Music
                </p>
                <p 
                  className="font-pci-sans-bold text-[#cecece] leading-normal"
                  style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                >
                  Prod. Sarah Koenig
                </p>
              </div>
            </div>
            <div className="w-full">
              <p 
                className="font-pci-sans-bold text-[#cecece] leading-normal"
                style={{ fontSize: 'var(--text-overlay-subtitle)' }}
              >
                Serial Productions
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

