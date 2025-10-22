/**
 * ClientsSection component - Selected clients showcase
 * Extracted from Figma design
 */

const IMG_ABC = 'http://localhost:3845/assets/8af789c4031c636f5a740a41602082f3d093b425.svg';
const IMG_NBC = 'http://localhost:3845/assets/3adf0c5f53c2c3a7cfd625b878821b364dea38f7.png';
const IMG_NETFLIX = 'http://localhost:3845/assets/7cf3085baac1974a85a7c5aa4f30a3adeb9ec3b2.png';
const IMG_HBO = 'http://localhost:3845/assets/73d1d07eb63cb148819b16b425947faf499c80b6.png';
const IMG_PARAMOUNT = 'http://localhost:3845/assets/3cce681854ebc916778f73c6929a0404162f3ed7.svg';
const IMG_DISNEY = 'http://localhost:3845/assets/95ce79f9954b86e12a94e5a267f9da33db6b015d.svg';
const IMG_CBS = 'http://localhost:3845/assets/52f75f72689a1119c366a034be65f37a998cbb3e.svg';

export function ClientsSection() {
  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start justify-end w-full" 
      style={{ padding: '49px 0' }}
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

      {/* Client Logos */}
      <div className="flex flex-col flex-1 items-start w-full">
        {/* Row 1 */}
        <div 
          className="flex flex-wrap items-center w-full"
          style={{ 
            gap: 'var(--padding-gap-large)',
            padding: '0 var(--padding-lr)'
          }}
        >
          <div className="w-[150px] md:w-[200px] lg:w-[225px] aspect-square relative shrink-0">
            <img alt="ABC" className="w-full h-full" src={IMG_ABC} />
          </div>
          <div className="w-[150px] md:w-[200px] lg:w-[225px] aspect-square relative shrink-0">
            <img alt="NBC" className="w-full h-full" src={IMG_NBC} />
          </div>
          <div className="w-full md:w-[300px] lg:w-[500px] h-auto relative shrink-0">
            <img alt="Netflix" className="w-full h-full object-cover" src={IMG_NETFLIX} />
          </div>
        </div>

        {/* Row 2 */}
        <div 
          className="flex flex-wrap items-center w-full"
          style={{ 
            gap: 'var(--padding-gap-large)',
            padding: '0 var(--padding-lr)'
          }}
        >
          <div className="w-[200px] md:w-[250px] lg:w-[300px] h-auto relative shrink-0">
            <img alt="HBO" className="w-full h-full object-cover" src={IMG_HBO} />
          </div>
          <div className="w-[150px] md:w-[200px] lg:w-[225px] h-auto relative shrink-0">
            <img alt="Paramount" className="w-full h-full" src={IMG_PARAMOUNT} />
          </div>
          <div className="w-[150px] md:w-[200px] lg:w-[225px] h-auto relative shrink-0">
            <img alt="Disney" className="w-full h-full" src={IMG_DISNEY} />
          </div>
          <div className="w-[150px] md:w-[200px] lg:w-[225px] aspect-square relative shrink-0">
            <img alt="CBS" className="w-full h-full" src={IMG_CBS} />
          </div>
        </div>
      </div>
    </div>
  );
}

