/**
 * DividerSection component - Memphis-style decorative dividers
 * Extracted from Figma design
 */

const DIVIDER_RED_BLOBS = '/assets/PCI_Divider_1.svg';
const DIVIDER_TEAL = '/assets/Divider2.svg';
const DIVIDER_BLUE = '/assets/Divider3.svg';
const DIVIDER_OLIVE = '/assets/PCI_Divider_4.svg';
const DIVIDER_PURPLE = '/assets/Divider 5.svg';

interface DividerSectionProps {
  variant?: 'red' | 'teal' | 'blue' | 'olive' | 'purple';
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
      aspectRatio: '2838/175',
    },
    blue: {
      bgColor: 'bg-[#03bed8]',
      imgSrc: DIVIDER_BLUE,
      aspectRatio: '2838/175',
    },
    olive: {
      bgColor: 'bg-[#666a47]',
      imgSrc: DIVIDER_OLIVE,
      aspectRatio: '6001.53/482.588',
    },
    purple: {
      bgColor: 'bg-[#8b5fbf]',
      imgSrc: DIVIDER_PURPLE,
      aspectRatio: '2838/175',
    },
  };

  const { bgColor, imgSrc, aspectRatio } = config[variant];

  return (
    <div className={`${bgColor} flex flex-col items-start w-full min-w-full`} data-name="Divider">
      <div className="w-full relative" style={{ aspectRatio }}>
        <img alt="" className="w-full h-auto" src={imgSrc} />
      </div>
    </div>
  );
}

