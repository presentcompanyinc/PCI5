/**
 * Color tokens extracted from Figma design
 * These colors define the PCI brand palette
 */

export const colors = {
  // Primary brand colors
  background: '#f2efea', // Warm off-white background
  foreground: '#000000', // Black text
  
  // Accent colors
  coral: '#f37d7d', // Coral/salmon accent for dividers
  
  // Semantic colors
  text: {
    primary: '#000000',
    secondary: '#000000',
  },
} as const;

export type ColorToken = keyof typeof colors;

