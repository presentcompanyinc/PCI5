/**
 * CatalogGridSection component - Grid of catalog album covers
 * Extracted from Figma design - 30 albums in a 4-column grid
 */

'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { useTouchDevice } from '@/hooks/useTouchDevice';

// Catalog album cover images with streaming URLs from DISCO
// Extracted from: https://present-company-inc.disco.ac/cat/1732058163/albums
const ALBUMS = [
  // Corrected mapping: titles read from artwork, URLs matched by title
  { id: 1, src: '/assets/PCI001final.jpg', alt: 'PCI001', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25188763' }, // Mind Out Of Time
  { id: 2, src: '/assets/PCI002final.jpg', alt: 'PCI002', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25188721' }, // Down To A Science
  { id: 3, src: '/assets/PCI003final.jpg', alt: 'PCI003', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25188735' }, // Event Horizons
  { id: 4, src: '/assets/PCI004final.jpg', alt: 'PCI004', streamingUrl: '' }, // Sixes & Sevens (not on list yet)
  { id: 5, src: '/assets/PCI005final.jpg', alt: 'PCI005', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25184394' }, // A Few Dark Clouds
  { id: 6, src: '/assets/PCI006final.jpg', alt: 'PCI006', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25188751' }, // 300 Cigarettes (EP on DISCO)
  { id: 7, src: '/assets/PCI007final.jpg', alt: 'PCI007', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25188750' }, // The Big Chill
  { id: 8, src: '/assets/PCI008final.jpg', alt: 'PCI008', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25254569' }, // The Quiet Tenant
  { id: 9, src: '/assets/pci009final.jpg', alt: 'PCI009', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25241082' }, // The Fixer
  { id: 10, src: '/assets/PCI010final.jpg', alt: 'PCI010', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25254707' }, // Morbid Curiosity
  { id: 11, src: '/assets/PCI011final.jpg', alt: 'PCI011', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25243309' }, // Folie A Deux
  { id: 12, src: '/assets/PCI012final.jpg', alt: 'PCI012', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25254570' }, // Media Massage
  { id: 13, src: '/assets/PCI013final.jpg', alt: 'PCI013', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25254677' }, // TV Eye
  { id: 14, src: '/assets/PCI014final.jpg', alt: 'PCI014', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25254235' }, // Yanquis
  { id: 15, src: '/assets/PCI015final.jpg', alt: 'PCI015', streamingUrl: '' }, // On All Fours (not on list yet)
  { id: 16, src: '/assets/PCI016final.jpg', alt: 'PCI016', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25254115' }, // I Can Explain
  { id: 17, src: '/assets/PCI017final.jpg', alt: 'PCI017', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25254231' }, // Falling Down
  { id: 18, src: '/assets/PCI018final.jpg', alt: 'PCI018', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25241157' }, // Random Axe Of Violence
  { id: 19, src: '/assets/PCI019final.jpg', alt: 'PCI019', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25255681' }, // Sectionals I
  { id: 20, src: '/assets/PCI020final.jpg', alt: 'PCI020', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25255680' }, // Sectionals II
  { id: 21, src: '/assets/PCI021final.jpg', alt: 'PCI021', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25255678' }, // Sectionals III
  { id: 22, src: '/assets/PCI022final.jpg', alt: 'PCI022', streamingUrl: 'https://present-company-inc.disco.ac/cat/1732058163/albums/25255674' }, // Sectionals IV
  { id: 23, src: '/assets/PCI023final.jpg', alt: 'PCI023', streamingUrl: '' }, // East Of Exeter (not on list yet)
  { id: 24, src: '/assets/PCI024final.jpg', alt: 'PCI024', streamingUrl: '' }, // The Void (not on list yet)
  { id: 25, src: '/assets/PCI025final.jpg', alt: 'PCI025', streamingUrl: '' }, // Tailored Kitsch (not on list yet)
  { id: 26, src: '/assets/PCI026final.jpg', alt: 'PCI026', streamingUrl: 'https://s.disco.ac/oaiqewpddksi' }, // For Your Amusement Only
  { id: 27, src: '/assets/PCI027final.jpg', alt: 'PCI027', streamingUrl: '' }, // A Bend In The Road (not on list yet)
  { id: 28, src: '/assets/PCI028final.jpg', alt: 'PCI028', streamingUrl: '' }, // Stellar Drift (not on list yet)
  { id: 29, src: '/assets/PCI029final.jpg', alt: 'PCI029', streamingUrl: '' }, // Give Me Back My Face (not on list yet)
  { id: 30, src: '/assets/PCI030final.jpg', alt: 'PCI030', streamingUrl: '' }, // Familial Strangers (not on list yet)
];

interface AlbumCoverProps {
  src: string;
  alt: string;
  streamingUrl?: string;
  isTouchDevice: boolean;
}

function AlbumCover({ src, alt, streamingUrl, isTouchDevice }: AlbumCoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  
  // Motion values for smooth mouse tracking (only used for non-touch devices)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring animation for smooth, natural movement (only used for non-touch devices)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });
  
  // Dynamic shadow based on tilt
  const shadowX = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const shadowY = useTransform(y, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize mouse position from -0.5 to 0.5
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleTap = () => {
    if (!isTouchDevice) return;
    
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 300);
  };

  const hasStreamingUrl = streamingUrl && streamingUrl.length > 0;
  const showComingSoon = !hasStreamingUrl && (isHovered || isTapped);

  const albumContent = (
    <motion.div
      className="relative w-full cursor-pointer"
      style={{ 
        aspectRatio: '1/1',
        perspective: isTouchDevice ? 'none' : '1000px',
      }}
      onMouseMove={isTouchDevice ? undefined : handleMouseMove}
      onMouseEnter={isTouchDevice ? undefined : () => setIsHovered(true)}
      onMouseLeave={isTouchDevice ? undefined : handleMouseLeave}
      onTap={isTouchDevice ? handleTap : undefined}
      whileHover={isTouchDevice ? undefined : { 
        scale: 1.05,
        transition: { 
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      animate={isTouchDevice && isTapped ? {
        scale: 1.05
      } : {}}
    >
      <motion.div
        className="w-full h-full relative"
        style={isTouchDevice ? {} : {
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          boxShadow: (isTouchDevice ? isTapped : isHovered)
            ? '0 25px 50px rgba(0, 0, 0, 0.3)' 
            : '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
          <Image
            alt={alt}
            src={src}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            quality={90}
            className="object-cover"
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Coming Soon Overlay for albums without streaming URLs */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: showComingSoon ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: showComingSoon ? 'auto' : 'none' }}
          >
            <div className="text-white text-center px-4">
              <p 
                className="font-bold tracking-wide"
                style={{ 
                  fontFamily: 'var(--font-pci-sans)',
                  fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Coming Soon...
              </p>
            </div>
          </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="flex-1 min-w-0 basis-0">
      <a 
        href={hasStreamingUrl ? streamingUrl : 'https://present-company-inc.disco.ac/cat/1732058163'} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {albumContent}
      </a>
    </div>
  );
}

export function CatalogGridSection() {
  const isTouchDevice = useTouchDevice();
  
  // Group albums into rows of 4
  const rows: typeof ALBUMS[] = [];
  for (let i = 0; i < ALBUMS.length; i += 4) {
    rows.push(ALBUMS.slice(i, i + 4));
  }

  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start w-full"
      style={{ 
        gap: 'var(--padding-gap)',
        padding: '0 var(--padding-lr)'
      }}
    >
      {rows.map((row, rowIndex) => {
        // Alternate direction: even rows from left, odd rows from right
        const isEvenRow = rowIndex % 2 === 0;
        
        return (
          <motion.div 
            key={rowIndex} 
            className="flex flex-col md:flex-row w-full"
            style={{ gap: 'var(--padding-gap)' }}
            initial={{ 
              opacity: 0, 
              x: isEvenRow ? -200 : 200 
            }}
            whileInView={{ 
              opacity: 1, 
              x: 0 
            }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ 
              duration: 1.2, 
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {row.map((album) => (
              <AlbumCover 
                key={album.id} 
                src={album.src} 
                alt={album.alt}
                streamingUrl={album.streamingUrl}
                isTouchDevice={isTouchDevice}
              />
            ))}
            {/* Fill empty slots in last row to maintain grid alignment */}
            {row.length < 4 && Array.from({ length: 4 - row.length }).map((_, idx) => (
              <div key={`empty-${idx}`} className="flex-1 min-w-0 basis-0 md:block hidden" />
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}

