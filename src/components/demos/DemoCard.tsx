/**
 * DemoCard - Wrapper component for individual animation demos
 */

interface DemoCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?: 'default' | 'comparison';
}

export function DemoCard({ title, description, children, variant = 'default' }: DemoCardProps) {
  return (
    <div 
      className="bg-white border-2 border-black p-6 mb-8 relative"
      style={{ 
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
      }}
    >
      {/* Demo Label */}
      <div 
        className="absolute -top-3 left-4 bg-[#f37d7d] px-3 py-1 border-2 border-black font-pci-sans-bold"
        style={{ fontSize: '12px' }}
      >
        DEMO
      </div>

      {/* Title */}
      <h3 
        className="font-pci-sans-bold text-black mb-2 mt-2"
        style={{ fontSize: 'var(--text-menu)' }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p 
          className="text-black mb-4 opacity-70"
          style={{ fontSize: '14px' }}
        >
          {description}
        </p>
      )}

      {/* Demo Content */}
      <div className={`${variant === 'comparison' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}`}>
        {children}
      </div>
    </div>
  );
}

