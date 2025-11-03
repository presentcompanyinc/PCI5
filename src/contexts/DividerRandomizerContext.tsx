'use client';

/**
 * DividerRandomizerContext
 * Provides randomized divider configurations to the entire app
 * Generates once per page load and shares across all components
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateRandomDividers, generateFixedDividers, DividerConfig } from '@/lib/dividerRandomizer';

interface DividerRandomizerContextType {
  dividers: DividerConfig[];
  getDivider: (index: number) => DividerConfig;
}

const DividerRandomizerContext = createContext<DividerRandomizerContextType | undefined>(undefined);

export function DividerRandomizerProvider({ children }: { children: ReactNode }) {
  // Start with a fixed set of dividers (non-randomized) to avoid hydration mismatch
  // Then randomize on the client after hydration
  const [dividers, setDividers] = useState<DividerConfig[]>(generateFixedDividers);
  
  useEffect(() => {
    // Only randomize on the client side after hydration
    setDividers(generateRandomDividers());
  }, []);
  
  const getDivider = (index: number): DividerConfig => {
    if (index < 0 || index >= dividers.length) {
      throw new Error(`Invalid divider index: ${index}. Must be between 0 and ${dividers.length - 1}`);
    }
    return dividers[index];
  };
  
  return (
    <DividerRandomizerContext.Provider value={{ dividers, getDivider }}>
      {children}
    </DividerRandomizerContext.Provider>
  );
}

export function useDividerRandomizer() {
  const context = useContext(DividerRandomizerContext);
  if (!context) {
    throw new Error('useDividerRandomizer must be used within a DividerRandomizerProvider');
  }
  return context;
}

