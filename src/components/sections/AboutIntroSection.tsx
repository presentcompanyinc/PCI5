/**
 * AboutIntroSection component - About PCI intro text
 * Extracted from Figma design
 */

export function AboutIntroSection() {
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
            className="font-pci-sans-bold leading-none text-black"
            style={{ fontSize: 'var(--text-paragraph)' }}
          >
            <p>
              Conceived by two Los Angeles based musicians with a knack for timeless melodies, out of the ordinary productions, and resonant emotional impact, PCI wants to fill the void in TV and Film.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

