/**
 * IntroSection component - Hero text section
 * Extracted from Figma design
 */

export function IntroSection() {
  return (
    <div 
      className="flex flex-col items-start justify-end w-full" 
      style={{
        padding: '24px var(--padding-lr)'
      }}
      data-name="Intro Text"
    >
      <div
        className="flex flex-col justify-center leading-[1.15] w-full text-black font-pci-sans-bold"
        style={{
          fontSize: 'var(--text-paragraph)',
          maxWidth: 'var(--max-width)'
        }}
      >
        <p className="leading-[1.15]">
        Made-to-measure music from artists with years of experience. We deliver with precision, quality and exceptional value for projects that demand novel creativity and professional standards.
        </p>
      </div>
    </div>
  );
}

