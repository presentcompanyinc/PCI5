'use client';

/**
 * DividerSection component - Memphis-style decorative dividers
 * Now with randomization support - pass an index (0-6) instead of variant
 */

import { useDividerRandomizer } from '@/contexts/DividerRandomizerContext';

interface DividerSectionProps {
  index: number; // Index 0-6 to get a randomized divider
}

export function DividerSection({ index }: DividerSectionProps) {
  const { getDivider } = useDividerRandomizer();
  const { bgColor, imgSrc, aspectRatio } = getDivider(index);

  return (
    <div className="flex flex-col items-start w-full min-w-full" style={{ backgroundColor: bgColor }} data-name="Divider">
      <div className="w-full relative lg:block hidden" style={{ aspectRatio }}>
        <img alt="" className="w-full h-auto" src={imgSrc} />
      </div>
      <div className="w-full relative overflow-hidden lg:hidden h-[80px]">
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgSrc} />
      </div>
    </div>
  );
}

