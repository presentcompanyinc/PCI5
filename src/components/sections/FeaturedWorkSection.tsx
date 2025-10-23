/**
 * FeaturedWorkSection component - Latest work highlights
 * Extracted from Figma design
 */

"use client";

import { useRouter } from 'next/navigation';

const IMG_THE_PAPER = '/assets/PCI_ThePaper.jpg';
const IMG_OH_JEROME_NO = '/assets/PCI_OhJeromeNo.jpg';
const IMG_SERIAL = '/assets/PCI_Serial.jpg';
const ARROW = '/assets/arrow.svg';

export function FeaturedWorkSection() {
  const router = useRouter();

  const handleViewMoreClick = () => {
    router.push('/work');
  };

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
            className="font-['PCI_Sans_Bold',_sans-serif] text-black leading-normal whitespace-pre"
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
              className="font-['PCI_Sans_Bold',_sans-serif] text-black leading-normal whitespace-nowrap"
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
      <div className="w-full relative" style={{ aspectRatio: '4096/1886' }}>
        <img
          alt="The Paper"
          className="w-full h-full object-cover"
          src={IMG_THE_PAPER}
        />
      </div>

      {/* Two Column Grid - stacks on mobile */}
      <div 
        className="flex flex-col md:flex-row items-start w-full"
        style={{ gap: 'var(--padding-gap)' }}
      >
        <div className="w-full md:flex-1 relative" style={{ aspectRatio: '2000/2000' }}>
          <img
            alt="Oh Jerome No"
            className="w-full h-full object-cover"
            src={IMG_OH_JEROME_NO}
          />
        </div>
        <div className="w-full md:flex-1 relative" style={{ aspectRatio: '2000/2000' }}>
          <img
            alt="Serial"
            className="w-full h-full object-cover"
            src={IMG_SERIAL}
          />
        </div>
      </div>
    </div>
  );
}

