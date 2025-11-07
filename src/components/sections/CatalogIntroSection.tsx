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
            Inspired by the iconic music libraries of the past (KPM, DeWolfe, Chappell), we&apos;ve built a{' '}
            <a
              href="https://present-company-inc.disco.ac/cat/1732058163"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              custom catalog
            </a>{' '}
            of original instrumentals, when more sophisticated library music is needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

