/**
 * DividerSection component - Memphis-style decorative dividers
 * Extracted from Figma design
 */

const DIVIDER_RED_BLOBS = 'http://localhost:3845/assets/e65793c9cf813cd55852717f75df2a8699396a25.svg';
const DIVIDER_TEAL = 'http://localhost:3845/assets/d539c52c2d27b4e22d52140d3ef22e96764fe5f6.svg';
const DIVIDER_BLUE = 'http://localhost:3845/assets/a140a061cbf015d8303ae4305bcaf404b65b330b.svg';
const DIVIDER_OLIVE = 'http://localhost:3845/assets/82e7dabeae944fac092c1b54e85c88639966fcc3.svg';

interface DividerSectionProps {
  variant?: 'red' | 'teal' | 'blue' | 'olive';
}

export function DividerSection({ variant = 'red' }: DividerSectionProps) {
  const config = {
    red: {
      bgColor: 'bg-[#f37d7d]',
      imgSrc: DIVIDER_RED_BLOBS,
      aspectRatio: '3546/282.001',
    },
    teal: {
      bgColor: 'bg-[#afbab6]',
      imgSrc: DIVIDER_TEAL,
      aspectRatio: '6000/480.001',
    },
    blue: {
      bgColor: 'bg-[#f2efea]',
      imgSrc: DIVIDER_BLUE,
      aspectRatio: '6000/480.622',
    },
    olive: {
      bgColor: 'bg-[#666a47]',
      imgSrc: DIVIDER_OLIVE,
      aspectRatio: '6001.53/482.588',
    },
  };

  const { bgColor, imgSrc, aspectRatio } = config[variant];

  return (
    <div className={`${bgColor} flex flex-col items-start w-full`} data-name="Divider">
      <div className="w-full relative" style={{ aspectRatio }}>
        <img alt="" className="w-full h-auto" src={imgSrc} />
      </div>
    </div>
  );
}

