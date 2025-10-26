'use client';

/**
 * DemoControls - Interactive controls for adjusting animation parameters
 */

import { useState } from 'react';

interface DemoControlsProps {
  onDurationChange?: (duration: number) => void;
  onDelayChange?: (delay: number) => void;
  onViewChange?: (view: 'desktop' | 'mobile') => void;
  showDuration?: boolean;
  showDelay?: boolean;
  showView?: boolean;
  defaultDuration?: number;
  defaultDelay?: number;
}

export function DemoControls({ 
  onDurationChange,
  onDelayChange,
  onViewChange,
  showDuration = true,
  showDelay = true,
  showView = true,
  defaultDuration = 0.6,
  defaultDelay = 0.05
}: DemoControlsProps) {
  const [duration, setDuration] = useState(defaultDuration);
  const [delay, setDelay] = useState(defaultDelay);
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');

  const handleDurationChange = (value: number) => {
    setDuration(value);
    onDurationChange?.(value);
  };

  const handleDelayChange = (value: number) => {
    setDelay(value);
    onDelayChange?.(value);
  };

  const handleViewChange = (newView: 'desktop' | 'mobile') => {
    setView(newView);
    onViewChange?.(newView);
  };

  return (
    <div className="bg-[#f2efea] border-2 border-black p-4 mb-4 flex flex-wrap gap-4 items-center">
      {/* View Toggle */}
      {showView && (
        <div className="flex gap-2">
          <label className="font-pci-sans-bold text-sm">View:</label>
          <button
            onClick={() => handleViewChange('desktop')}
            className={`px-3 py-1 border-2 border-black font-pci-sans-bold text-xs ${
              view === 'desktop' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => handleViewChange('mobile')}
            className={`px-3 py-1 border-2 border-black font-pci-sans-bold text-xs ${
              view === 'mobile' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            Mobile
          </button>
        </div>
      )}

      {/* Duration Slider */}
      {showDuration && (
        <div className="flex gap-2 items-center">
          <label className="font-pci-sans-bold text-sm">Duration:</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={duration}
            onChange={(e) => handleDurationChange(parseFloat(e.target.value))}
            className="w-32"
          />
          <span className="text-sm w-8">{duration}s</span>
        </div>
      )}

      {/* Delay Slider */}
      {showDelay && (
        <div className="flex gap-2 items-center">
          <label className="font-pci-sans-bold text-sm">Stagger Delay:</label>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.01"
            value={delay}
            onChange={(e) => handleDelayChange(parseFloat(e.target.value))}
            className="w-32"
          />
          <span className="text-sm w-12">{delay}s</span>
        </div>
      )}
    </div>
  );
}

