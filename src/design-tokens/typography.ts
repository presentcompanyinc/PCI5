/**
 * Typography tokens extracted from Figma design variables
 * Font sizes, families, and text styles
 */

export const typography = {
  // Font families
  fontFamily: {
    primary: 'PCI Sans Bold', // Custom PCI font
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  
  // Font sizes from Figma variables
  fontSize: {
    tiny: '16px',
    menu: '32px',
    paragraph: '48px',
    header: '72px',
    display: '1440px', // This seems like a width variable, not font size
  },
  
  // Text styles
  lineHeight: {
    tight: '0.99',
    normal: '1',
    relaxed: '1.2',
  },
  
  letterSpacing: {
    menu: '1.28px',
  },
} as const;

export type TypographyToken = keyof typeof typography;

