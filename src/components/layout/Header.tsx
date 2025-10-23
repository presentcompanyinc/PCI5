/**
 * Header component - Top bar with PCI logotype
 * Extracted from Figma design
 */

const LOGO_PRESENT = '/assets/Present.svg';
const LOGO_COMPANY = '/assets/Company.svg';
const LOGO_INCLUDED = '/assets/Included.svg';

export function Header() {
  return (
    <div className="bg-[#f2efea] flex flex-wrap items-center gap-0 w-full" data-name="Top Bar">
      <div 
        className="bg-[#f2efea] flex flex-col md:flex-row items-start w-full"
        style={{ 
          gap: 'var(--padding-gap)',
          padding: 'var(--padding-gap) var(--padding-lr)'
        }}
      >
        <div className="w-full md:flex-1 md:min-w-[150px] lg:min-w-[200px] min-h-[31.639px] relative">
          <img
            alt="Present"
            className="w-full h-auto"
            src={LOGO_PRESENT}
            style={{ aspectRatio: '231.507/36.6232' }}
          />
        </div>
        <div className="w-full md:flex-1 md:min-w-[150px] lg:min-w-[200px] min-h-[30.26px] relative">
          <img
            alt="Company"
            className="w-full h-auto"
            src={LOGO_COMPANY}
            style={{ aspectRatio: '461.533/69.8303' }}
          />
        </div>
        <div className="w-full md:flex-1 md:min-w-[150px] lg:min-w-[200px] min-h-[29.476px] relative">
          <img
            alt="Included"
            className="w-full h-auto"
            src={LOGO_INCLUDED}
            style={{ aspectRatio: '461.373/67.9979' }}
          />
        </div>
      </div>
    </div>
  );
}
