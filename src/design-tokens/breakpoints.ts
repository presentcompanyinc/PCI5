/**
 * Breakpoint tokens for responsive design
 * Extracted from Figma design system
 */

export const breakpoints = {
  minWidth: '460px',
  maxWidth: '800px', // Max content width for text
  desktop: '1440px',
  
  // Component-specific widths
  menuHomeWidth: '100px',
  menuCatalogWidth: '130px',
  contactButtonWidth: '356px',
} as const;

export type BreakpointToken = keyof typeof breakpoints;

