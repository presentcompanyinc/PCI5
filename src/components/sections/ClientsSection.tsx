/**
 * ClientsSection component - Selected clients showcase
 * Extracted from Figma design
 */

"use client";

const IMG_ABC = '/assets/ABC.svg';
const IMG_NBC = '/assets/NBC.svg';
const IMG_NETFLIX = '/assets/Netflix.svg';
const IMG_HBO = '/assets/HBO.svg';
const IMG_PARAMOUNT = '/assets/Paramount.svg';
const IMG_DISNEY = '/assets/Disney.svg';
const IMG_CBS = '/assets/CBS.svg';

export function ClientsSection() {
  // Client logo data with responsive sizing
  const clientLogos = [
    { src: IMG_ABC, alt: "ABC", isSquare: true },
    { src: IMG_NBC, alt: "NBC", isSquare: true },
    { src: IMG_NETFLIX, alt: "Netflix", isSquare: false },
    { src: IMG_HBO, alt: "HBO", isSquare: false },
    { src: IMG_PARAMOUNT, alt: "Paramount", isSquare: true },
    { src: IMG_DISNEY, alt: "Disney", isSquare: true },
    { src: IMG_CBS, alt: "CBS", isSquare: true },
  ];

  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start justify-end w-full" 
      style={{ padding: 'var(--padding-tb-large) 0' }}
      data-name="Selected Clients"
    >
      {/* Title */}
      <div 
        className="flex items-center justify-center w-full"
        style={{ padding: '0 var(--padding-lr)', gap: '10px' }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <p 
            className="font-['PCI_Sans_Bold',_sans-serif] text-black leading-normal uppercase"
            style={{ fontSize: 'var(--text-header)' }}
          >
            Selected Clients
          </p>
        </div>
      </div>

      {/* Client Logos - Rolling Animation */}
      <div className="w-full overflow-hidden" style={{ padding: '0 var(--padding-lr)' }}>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <div 
          className="flex items-center"
          style={{ 
            animation: 'marquee 18s linear infinite',
            gap: 'var(--padding-gap-large)'
          }}
        >
          {/* First set of logos */}
          {clientLogos.map((logo, index) => (
            <div 
              key={`first-${index}`}
              className={`relative shrink-0 ${
                logo.isSquare 
                  ? 'w-[113px] md:w-[150px] lg:w-[169px] aspect-square' 
                  : 'w-[150px] md:w-[188px] lg:w-[225px] h-auto'
              }`}
            >
              <img 
                alt={logo.alt} 
                className={`w-full h-full ${logo.isSquare ? '' : 'object-cover'}`} 
                src={logo.src} 
              />
            </div>
          ))}
          {/* Second set of logos for seamless loop */}
          {clientLogos.map((logo, index) => (
            <div 
              key={`second-${index}`}
              className={`relative shrink-0 ${
                logo.isSquare 
                  ? 'w-[113px] md:w-[150px] lg:w-[169px] aspect-square' 
                  : 'w-[150px] md:w-[188px] lg:w-[225px] h-auto'
              }`}
            >
              <img 
                alt={logo.alt} 
                className={`w-full h-full ${logo.isSquare ? '' : 'object-cover'}`} 
                src={logo.src} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

