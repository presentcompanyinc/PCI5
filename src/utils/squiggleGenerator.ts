/**
 * Generates organic, hand-drawn squiggle paths for SVG animations
 * Uses seeded randomization to create consistent but varied squiggles
 */

/**
 * Simple seeded pseudo-random number generator
 * Returns a deterministic random number between 0 and 1
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

/**
 * Generates an organic squiggle path with randomized variations
 * 
 * @param seed - Seed for consistent randomization (use different seeds for variety)
 * @param numWaves - Approximate number of wave cycles (actual count will vary)
 * @param amplitudeVariation - How much wave height varies (0-1, default 0.4)
 * @param frequencyVariation - How much wave spacing varies (0-1, default 0.35)
 * @returns SVG path string with organic squiggle
 */
export function generateOrganicSquiggle(
  seed: number = 1,
  numWaves: number = 4,
  amplitudeVariation: number = 0.4,
  frequencyVariation: number = 0.35
): string {
  const random = seededRandom(seed);
  const baseY = 3; // Center line
  const width = 100;
  
  // Start at the beginning
  let pathData = `M0,${baseY}`;
  
  let currentX = 0;
  let waveCount = 0;
  
  while (currentX < width && waveCount < numWaves * 2) {
    // Randomize wave width (frequency variation)
    const baseWaveWidth = width / (numWaves * 2);
    const waveWidth = baseWaveWidth * (1 + (random() - 0.5) * 2 * frequencyVariation);
    
    // Randomize amplitude (height variation) - adjusted for expanded viewBox
    const baseAmplitude = 2.2;
    const amplitude = baseAmplitude * (0.5 + random() * (1 + amplitudeVariation));
    
    // Alternate between peaks and valleys with some randomness
    const direction = waveCount % 2 === 0 ? -1 : 1;
    const directionVariation = 1 + (random() - 0.5) * 0.3; // Vary the intensity
    const controlY = baseY + (direction * amplitude * directionVariation);
    
    // Control point X position with slight randomness
    const controlXOffset = waveWidth * (0.4 + random() * 0.2); // Between 40-60% of wave width
    const controlX = currentX + controlXOffset;
    
    // End point X with some variation
    const endX = Math.min(currentX + waveWidth, width);
    const endY = baseY + (random() - 0.5) * 0.5; // Slight variation from center line
    
    // Add quadratic bezier curve
    pathData += ` Q${controlX.toFixed(2)},${controlY.toFixed(2)} ${endX.toFixed(2)},${endY.toFixed(2)}`;
    
    currentX = endX;
    waveCount++;
  }
  
  // Ensure we end at width=100
  if (currentX < width) {
    pathData += ` L${width},${baseY}`;
  }
  
  return pathData;
}

/**
 * Generates a set of unique squiggles for multiple items
 * Each squiggle will be different but reproducible
 * 
 * @param count - Number of squiggles to generate
 * @param baseSeed - Base seed for randomization
 * @param numWaves - Approximate number of wave cycles per squiggle
 * @returns Array of SVG path strings
 */
export function generateSquiggleSet(
  count: number,
  baseSeed: number = 1000,
  numWaves: number = 4
): string[] {
  return Array.from({ length: count }, (_, index) => 
    generateOrganicSquiggle(
      baseSeed + index * 137, // Use different seeds with good distribution
      numWaves,
      0.4 + (index % 3) * 0.05, // Slight variation in amplitude
      0.35 + (index % 2) * 0.05  // Slight variation in frequency
    )
  );
}

