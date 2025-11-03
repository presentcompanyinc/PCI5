/**
 * Divider Randomizer Utility
 * Generates randomized assignments of dividers and colors
 * Ensures no divider pattern or color appears twice
 */

export type DividerVariant = 'divider1' | 'divider2' | 'divider3' | 'divider4' | 'divider5' | 'divider6' | 'divider7';
export type ColorVariant = 'red' | 'teal' | 'blue' | 'olive' | 'purple' | 'yellow' | 'green';

export interface DividerConfig {
  variant: DividerVariant;
  color: ColorVariant;
  bgColor: string;
  imgSrc: string;
  aspectRatio: string;
}

// All available dividers
const DIVIDERS: Array<{ variant: DividerVariant; imgSrc: string; aspectRatio: string }> = [
  { variant: 'divider1', imgSrc: '/assets/PCI_Divider_1.svg', aspectRatio: '3546/282.001' },
  { variant: 'divider2', imgSrc: '/assets/Divider2.svg', aspectRatio: '2838/175' },
  { variant: 'divider3', imgSrc: '/assets/Divider3.svg', aspectRatio: '2838/175' },
  { variant: 'divider4', imgSrc: '/assets/PCI_Divider_4.svg', aspectRatio: '6001.53/482.588' },
  { variant: 'divider5', imgSrc: '/assets/Divider 5.svg', aspectRatio: '2838/175' },
  { variant: 'divider6', imgSrc: '/assets/PCI_Divider_6.svg', aspectRatio: '4096/328' },
  { variant: 'divider7', imgSrc: '/assets/Divider7.svg', aspectRatio: '2838/175' },
];

// All available colors (from catalog artwork)
const COLORS: Array<{ color: ColorVariant; bgColor: string }> = [
  { color: 'red', bgColor: '#f37d7d' },      // Coral/salmon
  { color: 'teal', bgColor: '#afbab6' },     // Grey-green
  { color: 'blue', bgColor: '#03bed8' },     // Bright cyan
  { color: 'olive', bgColor: '#666a47' },    // Olive green
  { color: 'purple', bgColor: '#8b5fbf' },   // Purple
  { color: 'yellow', bgColor: '#ddc34d' },   // Yellow (from PCI artwork)
  { color: 'green', bgColor: '#8ebf87' },    // Light green (from PCI artwork)
];

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a fixed (non-random) divider configuration
 * Used for initial SSR to prevent hydration mismatches
 */
export function generateFixedDividers(): DividerConfig[] {
  return DIVIDERS.map((divider, index) => ({
    variant: divider.variant,
    color: COLORS[index].color,
    bgColor: COLORS[index].bgColor,
    imgSrc: divider.imgSrc,
    aspectRatio: divider.aspectRatio,
  }));
}

/**
 * Generate randomized divider configurations
 * Each divider pattern and color appears exactly once
 */
export function generateRandomDividers(): DividerConfig[] {
  const shuffledDividers = shuffle(DIVIDERS);
  const shuffledColors = shuffle(COLORS);
  
  return shuffledDividers.map((divider, index) => ({
    variant: divider.variant,
    color: shuffledColors[index].color,
    bgColor: shuffledColors[index].bgColor,
    imgSrc: divider.imgSrc,
    aspectRatio: divider.aspectRatio,
  }));
}

/**
 * Get a specific randomized divider by index (0-6)
 */
export function getRandomDivider(index: number, randomDividers: DividerConfig[]): DividerConfig {
  if (index < 0 || index >= randomDividers.length) {
    throw new Error(`Invalid divider index: ${index}. Must be between 0 and ${randomDividers.length - 1}`);
  }
  return randomDividers[index];
}

