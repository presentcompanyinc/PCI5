/**
 * ComparisonView - Side-by-side before/after comparison
 */

interface ComparisonViewProps {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ComparisonView({ 
  before, 
  after, 
  beforeLabel = 'Before',
  afterLabel = 'After'
}: ComparisonViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Before */}
      <div className="border-2 border-black p-4 bg-white">
        <div className="bg-[#666a47] text-white px-2 py-1 mb-3 inline-block font-pci-sans-bold text-xs">
          {beforeLabel}
        </div>
        <div>{before}</div>
      </div>

      {/* After */}
      <div className="border-2 border-black p-4 bg-white">
        <div className="bg-[#03bed8] text-black px-2 py-1 mb-3 inline-block font-pci-sans-bold text-xs">
          {afterLabel}
        </div>
        <div>{after}</div>
      </div>
    </div>
  );
}

