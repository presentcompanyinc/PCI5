/**
 * WorkIntroSection component - Intro text for the Selected Work page
 * Extracted from Figma design
 */

export function WorkIntroSection() {
  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start justify-end w-full"
      style={{ padding: 'var(--padding-tb) var(--padding-lr)' }}
    >
      <div className="w-full relative" style={{ maxWidth: 'var(--max-width)' }}>
        <div 
          className="w-full"
          style={{ transform: 'rotate(0.25deg)' }}
        >
          <div 
            className="font-['PCI_Sans_Bold',_sans-serif] leading-[1.15] text-black"
            style={{ fontSize: 'var(--text-paragraph)' }}
          >
            <p>
              Our work ranges from iconic themes for podcasts and television shows to original songwriting for cutting edge dramas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

