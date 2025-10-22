/**
 * CatalogIntroSection component - Intro text for the Catalog page
 * Extracted from Figma design
 */

export function CatalogIntroSection() {
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
            className="font-['PCI_Sans_Bold',_sans-serif] leading-normal text-black"
            style={{ fontSize: 'var(--text-paragraph)' }}
          >
            <p>
              Inspired by the music libraries of yesteryear like KPM, etc. etc. we've created and crafted thematic albums for a variety of usages where original yet unusual library music is wanted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

