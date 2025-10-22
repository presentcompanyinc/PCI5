/**
 * Spacing tokens extracted from Figma design variables
 * These values correspond to Figma's spacing system
 */

export const spacing = {
  // Padding variables from Figma
  gapPadding: '24px',
  leftRightPadding: '24px',
  topBottomPadding: '96px',
  largeGapPadding: '96px',
  largeTopBottomPadding: '192px',
  
  // Component-specific spacing
  menuPadding: '16px',
  footerGap: '48px',
} as const;

export type SpacingToken = keyof typeof spacing;

