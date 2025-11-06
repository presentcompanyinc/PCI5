/**
 * AboutIntroSection component - About PCI intro text
 * Extracted from Figma design
 */

export function AboutIntroSection() {
  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start justify-end w-full"
      style={{ padding: '24px var(--padding-lr)' }}
    >
      <div className="w-full relative" style={{ maxWidth: 'var(--max-width)' }}>
        <div 
          className="w-full"
          style={{ transform: 'rotate(0.25deg)' }}
        >
          <div 
            className="font-pci-sans-bold leading-[1.15] text-black"
            style={{ fontSize: 'var(--text-paragraph)' }}
          >
            <p className="leading-[1.15]">
            Conceived by two Los Angeles based musicians,PCI fills the unconventional void in TV and Film.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

