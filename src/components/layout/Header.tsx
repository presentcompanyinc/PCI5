/**
 * Header component - Top bar with PCI logotype
 * Extracted from Figma design
 */

const LOGO_PRESENT = 'http://localhost:3845/assets/87e88b25f8ac14117a73b6c420ad130ce498ca31.svg';
const LOGO_COMPANY = 'http://localhost:3845/assets/d08ac9a2c7f626affd33a6205067a5e2c6396e2a.svg';
const LOGO_INCLUDED = 'http://localhost:3845/assets/31ed3677e15cc21430f0e425a46b5cf899e05bc7.svg';

export function Header() {
  return (
    <div className="bg-[#f2efea] flex flex-wrap items-center gap-0 w-full" data-name="Top Bar">
      <div 
        className="bg-[#f2efea] flex flex-wrap items-start w-full"
        style={{ 
          gap: 'var(--padding-gap)',
          padding: 'var(--padding-gap) var(--padding-lr)'
        }}
      >
        <div className="flex-1 min-w-[100px] md:min-w-[150px] lg:min-w-[200px] min-h-[31.639px] relative">
          <img
            alt="Present"
            className="w-full h-auto"
            src={LOGO_PRESENT}
            style={{ aspectRatio: '231.507/36.6232' }}
          />
        </div>
        <div className="flex-1 min-w-[100px] md:min-w-[150px] lg:min-w-[200px] min-h-[30.26px] relative">
          <img
            alt="Company"
            className="w-full h-auto"
            src={LOGO_COMPANY}
            style={{ aspectRatio: '461.533/69.8303' }}
          />
        </div>
        <div className="flex-1 min-w-[100px] md:min-w-[150px] lg:min-w-[200px] min-h-[29.476px] relative">
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
