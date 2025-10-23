/**
 * ServicesSection component - Services description and list
 * Extracted from Figma design
 */

const SQUIGGLY_LINE = '/assets/services-list-squiggly-line.svg';

const services = [
  'Theme Songs',
  'Custom Music',
  'Music Supervision',
  'Sync Licensing',
  'Activations',
];

function ServiceItem({
  children,
  rotation,
}: {
  children: React.ReactNode;
  rotation: number;
}) {
  return (
    <>
      <div className="flex items-center justify-center w-full" style={{ transform: `rotate(${rotation}deg)` }}>
        <p 
          className="font-['PCI_Sans_Bold',_sans-serif] text-black leading-normal w-full"
          style={{ fontSize: 'var(--text-menu)' }}
        >
          {children}
        </p>
      </div>
      <div className="flex items-center justify-center w-full" style={{ transform: 'rotate(0.5deg)' }}>
        <div className="w-full" style={{ height: 'var(--squiggle-2)' }}>
          <img alt="" className="w-full h-full object-contain" src={SQUIGGLY_LINE} />
        </div>
      </div>
    </>
  );
}

export function ServicesSection() {
  return (
    <div
      className="flex flex-col md:flex-row flex-wrap items-start justify-between w-full"
      style={{
        gap: 'var(--padding-gap-large)',
        padding: 'var(--padding-tb-large) var(--padding-lr)'
      }}
      data-name="Services"
    >
      {/* Description */}
      <div 
        className="flex flex-col items-start w-full md:max-w-[600px]"
        style={{ gap: 'var(--padding-gap-large)' }}
      >
        <div style={{ transform: 'rotate(359.75deg)' }}>
          <p 
            className="font-['PCI_Sans_Bold',_sans-serif] text-black leading-normal"
            style={{ fontSize: 'var(--text-header)' }}
          >
            WHAT IS PCI?
          </p>
        </div>

        <div style={{ transform: 'rotate(0.25deg)' }}>
          <p
            className="font-['PCI_Sans_Bold',_sans-serif] text-black leading-normal"
            style={{ 
              fontSize: 'var(--text-paragraph)',
              fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" 
            }}
          >
            A one-stop shop for all your music needs. A music house with an off-beat library,
            production services, and the ability to tailor to your project&apos;s creative goals.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div 
        className="flex flex-col items-start w-full md:flex-1 md:max-w-[459px] md:min-w-[300px]"
        style={{ gap: 'var(--padding-gap)' }}
      >
        <ServiceItem rotation={0.5}>{services[0]}</ServiceItem>
        <ServiceItem rotation={359.75}>{services[1]}</ServiceItem>
        <ServiceItem rotation={0.5}>{services[2]}</ServiceItem>
        <ServiceItem rotation={359.5}>{services[3]}</ServiceItem>
        <ServiceItem rotation={359.75}>{services[4]}</ServiceItem>
      </div>
    </div>
  );
}

