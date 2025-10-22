'use client';

/**
 * AboutPagePlayground - Client component wrapper for Memphis Playground
 * Handles the dynamic import and client-side rendering
 */

import dynamic from 'next/dynamic';

// Dynamically import Memphis Playground (client-side only)
const MemphisPlayground = dynamic(
  () => import('./Playground'),
  { ssr: false }
);

interface AboutPagePlaygroundProps {
  initialBlobCount?: number;
  showOverlayControls?: boolean;
  showCounter?: boolean;
  className?: string;
}

export function AboutPagePlayground({ 
  initialBlobCount = 7,
  showOverlayControls = true,
  showCounter = true,
  className = "w-full h-full"
}: AboutPagePlaygroundProps) {
  return (
    <MemphisPlayground 
      initialBlobCount={initialBlobCount}
      showOverlayControls={showOverlayControls}
      showCounter={showCounter}
      className={className}
    />
  );
}
