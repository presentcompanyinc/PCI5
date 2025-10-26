/**
 * FeaturedWorkSection component - Latest work highlights
 * Extracted from Figma design
 */

"use client";

import { useRouter } from 'next/navigation';

const IMG_THE_PAPER = '/assets/PCI_ThePaper.jpg';
const IMG_THE_PAPER_OVERLAY = '/assets/PCI_ThePaper_NoTitle.jpg';
const IMG_OH_JEROME_NO = '/assets/PCI_OhJeromeNo.jpg';
const IMG_OH_JEROME_NO_OVERLAY = '/assets/PCI_OhJeromeNo_NoTitle.jpg';
const IMG_SERIAL = '/assets/PCI_Serial.jpg';
const IMG_SERIAL_OVERLAY = '/assets/PCI_Serial_NoTitle.jpg';
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
      <div className="w-full relative group cursor-pointer overflow-hidden" style={{ aspectRatio: '4096/1886' }}>
        <img
          alt="The Paper"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:opacity-0"
          src={IMG_THE_PAPER}
        />
        <img
          alt="The Paper"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100"
          src={IMG_THE_PAPER_OVERLAY}
        />
        <div className="absolute inset-0 bg-[rgba(3,3,3,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out flex items-start justify-start p-[10px]">
          <div 
            className="flex flex-col w-full transform scale-95 group-hover:scale-100 transition-transform duration-700 ease-in-out"
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
                  className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                  style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                >
                  Main Theme
                </p>
                <p 
                  className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                  style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                >
                  Created by Greg Daniels
                </p>
              </div>
            </div>
            <div className="w-full">
              <p 
                className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
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
        <div className="flex-1 relative group cursor-pointer overflow-hidden" style={{ aspectRatio: '2000/2000' }}>
          <img
            alt="Oh Jerome No"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:opacity-0"
            src={IMG_OH_JEROME_NO}
          />
          <img
            alt="Oh Jerome No"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100"
            src={IMG_OH_JEROME_NO_OVERLAY}
          />
          <div className="absolute inset-0 bg-[rgba(3,3,3,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out flex items-start justify-start p-[10px]">
            <div 
              className="flex flex-col w-full transform scale-95 group-hover:scale-100 transition-transform duration-700 ease-in-out"
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
                    Oh Jerome, No
                  </p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p 
                    className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                    style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                  >
                  Music Supervision
                </p>
                <p 
                  className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                  style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                >
                  Dir. Teddy Blanks/Alex Karpovsky
                </p>
              </div>
            </div>
            <div className="w-full">
              <p 
                className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                style={{ fontSize: 'var(--text-overlay-subtitle)' }}
              >
                FX
              </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 relative group cursor-pointer overflow-hidden" style={{ aspectRatio: '2000/2000' }}>
          <img
            alt="Serial"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:opacity-0"
            src={IMG_SERIAL}
          />
          <img
            alt="Serial"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100"
            src={IMG_SERIAL_OVERLAY}
          />
          <div className="absolute inset-0 bg-[rgba(3,3,3,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out flex items-start justify-start p-[10px]">
            <div 
              className="flex flex-col w-full transform scale-95 group-hover:scale-100 transition-transform duration-700 ease-in-out"
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
                    className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                    style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                  >
                  Original Theme + Music
                </p>
                <p 
                  className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                  style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                >
                  Prod. Sarah Koenig
                </p>
              </div>
            </div>
            <div className="w-full">
              <p 
                className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
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

