/**
 * IntroSection component - Hero text section
 * Extracted from Figma design
 */

export function IntroSection() {
  return (
    <div 
      className="flex flex-col items-start justify-end w-full" 
      style={{
        padding: 'var(--padding-tb) var(--padding-lr)'
      }}
      data-name="Intro Text"
    >
      <div
        className="flex flex-col justify-center leading-[0.99] w-full text-black"
        style={{
          fontFamily: "var(--font-geist-sans), 'PCI_Sans_Bold', 'Noto_Sans', sans-serif",
          fontSize: 'var(--text-paragraph)',
          maxWidth: 'var(--max-width)'
        }}
      >
        <p className="leading-[0.99]">
          Made-to-measure music from artists with years of experience. We deliver with precision,
          quality and exceptional value for projects that demand novel creativity and professional
          standards.
        </p>
      </div>
    </div>
  );
}

