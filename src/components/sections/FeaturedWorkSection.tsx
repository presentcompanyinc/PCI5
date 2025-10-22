/**
 * FeaturedWorkSection component - Latest work highlights
 * Extracted from Figma design
 */

const IMG_THE_PAPER = 'http://localhost:3845/assets/6b056cbef0d74452c101d2fe650b9f48adc39590.png';
const IMG_OH_JEROME_NO = 'http://localhost:3845/assets/f5cd5f883385b00ea8164435e2956816c32bd088.png';
const IMG_SERIAL = 'http://localhost:3845/assets/239c3b04f7788306b5599489856e79cdc543d423.png';
const ARROW = 'http://localhost:3845/assets/7ad8b653b5180dee53269218576fd041a9683490.svg';

export function FeaturedWorkSection() {
  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start w-full" 
      style={{ gap: 'var(--padding-gap)' }}
      data-name="Latest Work Frame"
    >
      {/* Title and View More */}
      <div 
        className="flex items-center justify-between w-full"
        style={{ padding: '0 var(--padding-lr)' }}
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

        <div className="desktop-hide flex items-center h-full justify-end" style={{ gap: 'var(--padding-gap)' }}>
          <div style={{ transform: 'rotate(0.75deg)' }}>
            <p 
              className="font-['PCI_Sans_Bold',_sans-serif] text-black leading-normal whitespace-pre"
              style={{ fontSize: 'var(--text-menu)' }}
            >
              VIEW MORE WORK
            </p>
          </div>
          <div className="w-[24px] h-[16px] md:w-[30px] md:h-[20px] lg:w-[36px] lg:h-[24px]">
            <img alt="arrow" className="w-full h-full" src={ARROW} />
          </div>
        </div>
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

