/**
 * CatalogIntroSection component - Intro text for the Catalog page
 * Extracted from Figma design
 */

export function CatalogIntroSection() {
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
             KPM. DeWolfe. Chappell. Inspired by the music libraries of yesteryear, we've crafted thematic albums from our private collection where-ever unusual library music is needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

