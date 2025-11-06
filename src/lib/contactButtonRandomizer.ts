/**
 * Contact Button Randomizer Utility
 * Generates random colors for the contact button fill animation
 */

export type ButtonColorVariant = 'red' | 'teal' | 'blue' | 'olive' | 'purple' | 'yellow' | 'green';

// Using the same colors as the divider randomizer for consistency
const BUTTON_COLORS: Array<{ color: ButtonColorVariant; bgColor: string }> = [
  { color: 'red', bgColor: '#f37d7d' },      // Coral/salmon
  { color: 'teal', bgColor: '#afbab6' },     // Grey-green
  { color: 'blue', bgColor: '#03bed8' },     // Bright cyan
  { color: 'olive', bgColor: '#666a47' },    // Olive green
  { color: 'purple', bgColor: '#8b5fbf' },   // Purple
  { color: 'yellow', bgColor: '#ddc34d' },   // Yellow
  { color: 'green', bgColor: '#8ebf87' },    // Light green
];

/**
 * Get a random color for the contact button
 * Returns a new random color on each call
 */
export function getRandomButtonColor(): string {
  const randomIndex = Math.floor(Math.random() * BUTTON_COLORS.length);
  return BUTTON_COLORS[randomIndex].bgColor;
}

/**
 * Get a fixed color for SSR (to prevent hydration mismatch)
 * Returns the default blue color
 */
export function getFixedButtonColor(): string {
  return BUTTON_COLORS[2].bgColor; // Default to blue (#03bed8)
}



