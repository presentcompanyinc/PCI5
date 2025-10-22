/**
 * WorkGridSection component - Grid of work samples
 * Extracted from Figma design
 */

// Work sample images - Default
const IMG_INGRID_GOES_WEST = 'http://localhost:3845/assets/44398f9b696f6c849b98ae4d6a631d6164f7d364.png';
const IMG_SISTERS = 'http://localhost:3845/assets/152c3218624df2103bb8a33c8e4ffda17ac8227f.png';
const IMG_JOE_MANDE = 'http://localhost:3845/assets/cc5b575c4fd8a880184fab8cf1e95abbabfec128.png';
const IMG_DUCK_BUTTER = 'http://localhost:3845/assets/3ff43df270f8af11c91cea2facebdb995cc1d4e4.png';
const IMG_NEW_YORKER = 'http://localhost:3845/assets/dddf154e369207a5e2443033b6e9e229fcd2676b.png';
const IMG_PAST_MY_BEDTIME = 'http://localhost:3845/assets/2e3ed2052311f816c86b7aeefe98484721514693.png';
const IMG_SUNDOWNERS = 'http://localhost:3845/assets/31293974e668043ae35355855b535e76eb4e9cbc.png';
const IMG_CITY_OF_LIES = 'http://localhost:3845/assets/c6efb453265f18a486cf18769fdcbadf5d1c3a1c.png';
const IMG_DICKINSON = 'http://localhost:3845/assets/f5160b3eb5b4b96772563f17502f7e9d8e3a6819.png';
const IMG_FAMILY_GUY = 'http://localhost:3845/assets/2f9c2972acfeddad5d89798e7cab4aa50ccfade4.png';
const IMG_TELL_ME_YOUR_SECRETS = 'http://localhost:3845/assets/26962d5c2ca22470df6ffcc47d5ed6ae66e12981.png';
const IMG_THE_DRY = 'http://localhost:3845/assets/e73de199a4e9e7eb09524fc566835ff409a62936.png';

// Work sample images - Overlay (noTitle versions)
const IMG_INGRID_GOES_WEST_OVERLAY = 'http://localhost:3845/assets/b77eec8ec56b01fbd7dfa0a0d0c2e57e67eded52.png';
const IMG_SISTERS_OVERLAY = 'http://localhost:3845/assets/d8131e9a05912cd1e7c73f395e9d9ef0abbd3954.png';
const IMG_JOE_MANDE_OVERLAY = 'http://localhost:3845/assets/80face50e95d22a8e4b916e1845d45764fda2055.png';
const IMG_DUCK_BUTTER_OVERLAY = 'http://localhost:3845/assets/8f537237924d08daf209e63091440af48d7197d8.png';
const IMG_NEW_YORKER_OVERLAY = 'http://localhost:3845/assets/1d1758519921efee5ca15c2502788d1b2c893c75.png';
const IMG_PAST_MY_BEDTIME_OVERLAY = 'http://localhost:3845/assets/d05f7437efd71d7b6b8ceeb9358f7b8d6bd6678a.png';
const IMG_SUNDOWNERS_OVERLAY = 'http://localhost:3845/assets/d95ca9ac3f123b77e56188de4f94418a99365216.png';
const IMG_CITY_OF_LIES_OVERLAY = 'http://localhost:3845/assets/ed2901ed56efc66839dabfe4005a4d74e22ade98.png';
const IMG_DICKINSON_OVERLAY = 'http://localhost:3845/assets/aee2c2a2b6d0a38f9441eae63210173b051c96cf.png';
const IMG_FAMILY_GUY_OVERLAY = 'http://localhost:3845/assets/a7a2a5e653944aa7505a3cfca7594df4b75d4b20.png';
const IMG_TELL_ME_YOUR_SECRETS_OVERLAY = 'http://localhost:3845/assets/ce544c7280a9e41f9626584b9e180663da56c7e3.png';
const IMG_THE_DRY_OVERLAY = 'http://localhost:3845/assets/9dcfd8a7e90ee0079fddcce5ad120cb932c5e8d1.png';

interface WorkItemProps {
  src: string;
  srcOverlay: string;
  alt: string;
  title: string;
  subtitle1: string;
  subtitle2?: string;
  studio: string;
  className?: string;
}

function WorkItem({ src, srcOverlay, alt, title, subtitle1, subtitle2, studio, className = '' }: WorkItemProps) {
  return (
    <div className={`flex-1 min-w-0 ${className} group cursor-pointer`}>
      <div 
        className="relative w-full overflow-hidden" 
        style={{ aspectRatio: '1/1' }}
      >
        {/* Default Image */}
        <img
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:opacity-0"
          src={src}
        />
        
        {/* Overlay Image - visible on hover */}
        <img
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100"
          src={srcOverlay}
        />
        
        {/* Text Overlay - Fade in on hover */}
        <div className="absolute inset-0 bg-[rgba(3,3,3,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out flex items-start justify-start p-[10px]">
          <div 
            className="flex flex-col w-full transform scale-95 group-hover:scale-100 transition-transform duration-700 ease-in-out"
            style={{
              padding: 'var(--overlay-padding)',
              gap: 'var(--overlay-gap)'
            }}
          >
            {/* Title and Subtitles */}
            <div className="flex flex-col gap-[13px]">
              <div className="w-full">
                <p 
                  className="font-['PCI_Sans_Bold',_sans-serif] text-[#cecece] uppercase leading-normal"
                  style={{ fontSize: 'var(--text-overlay-title)' }}
                >
                  {title}
                </p>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p 
                  className="font-['PCI_Sans_Bold',_sans-serif] text-[#cecece] uppercase leading-normal"
                  style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                >
                  {subtitle1}
                </p>
                {subtitle2 && (
                  <p 
                    className="font-['PCI_Sans_Bold',_sans-serif] text-[#cecece] uppercase leading-normal"
                    style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                  >
                    {subtitle2}
                  </p>
                )}
              </div>
            </div>
            
            {/* Studio */}
            <div className="w-full">
              <p 
                className="font-['PCI_Sans_Bold',_sans-serif] text-[#cecece] uppercase leading-normal"
                style={{ fontSize: 'var(--text-overlay-subtitle)' }}
              >
                {studio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkGridSection() {
  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start w-full"
      style={{ gap: 'var(--padding-gap)' }}
    >
      {/* Title */}
      <div className="w-full" style={{ padding: '0 var(--padding-lr)' }}>
        <div 
          className="inline-block"
          style={{ transform: 'rotate(0.5deg)' }}
        >
          <h2 
            className="font-['PCI_Sans_Bold',_sans-serif] leading-normal text-black whitespace-pre"
            style={{ fontSize: 'var(--text-header)' }}
          >
            SELECTED WORK
          </h2>
        </div>
      </div>

      {/* Grid Rows */}
      <div 
        className="flex flex-col md:flex-row w-full"
        style={{ 
          gap: 'var(--padding-gap)',
          padding: '0 var(--padding-lr)'
        }}
      >
        <WorkItem 
          src={IMG_INGRID_GOES_WEST}
          srcOverlay={IMG_INGRID_GOES_WEST_OVERLAY}
          alt="Ingrid Goes West" 
          title="Ingrid Goes West"
          subtitle1="Original Score"
          subtitle2="Dir. Matt Spicer"
          studio="NEON"
        />
        <WorkItem 
          src={IMG_SISTERS}
          srcOverlay={IMG_SISTERS_OVERLAY}
          alt="Sisters" 
          title="Sisters"
          subtitle1="Original Song"
          subtitle2="Created by: Sarah Goldberg + Susan Stanley"
          studio="Shaftesbury"
        />
      </div>

      <div 
        className="flex flex-col md:flex-row w-full"
        style={{ 
          gap: 'var(--padding-gap)',
          padding: '0 var(--padding-lr)'
        }}
      >
        <WorkItem 
          src={IMG_JOE_MANDE}
          srcOverlay={IMG_JOE_MANDE_OVERLAY}
          alt="Chill" 
          title="Chill"
          subtitle1="Main Theme"
          subtitle2="Created by Joe Mande"
          studio="HULU"
        />
        <WorkItem 
          src={IMG_DUCK_BUTTER}
          srcOverlay={IMG_DUCK_BUTTER_OVERLAY}
          alt="Duck Butter" 
          title="Duck Butter"
          subtitle1="Original Score"
          subtitle2="Dir. Miguel Arteta"
          studio="The Orchard"
        />
      </div>

      <div 
        className="flex flex-col md:flex-row w-full"
        style={{ 
          gap: 'var(--padding-gap)',
          padding: '0 var(--padding-lr)'
        }}
      >
        <WorkItem 
          src={IMG_NEW_YORKER}
          srcOverlay={IMG_NEW_YORKER_OVERLAY}
          alt="The New Yorker Presents" 
          title="The New Yorker Presents"
          subtitle1="Main Theme"
          studio="Amazon/Jigsaw Productions"
        />
        <WorkItem 
          src={IMG_PAST_MY_BEDTIME}
          srcOverlay={IMG_PAST_MY_BEDTIME_OVERLAY}
          alt="Past My Bedtime" 
          title="Past My Bedtime"
          subtitle1="Original Song"
          subtitle2="Created by: Max Silvestri + Leah Beckmann"
          studio="Audible"
        />
      </div>

      <div 
        className="flex flex-col md:flex-row w-full"
        style={{ 
          gap: 'var(--padding-gap)',
          padding: '0 var(--padding-lr)'
        }}
      >
        <WorkItem 
          src={IMG_SUNDOWNERS}
          srcOverlay={IMG_SUNDOWNERS_OVERLAY}
          alt="Sundowners" 
          title="Sundowners"
          subtitle1="Original Score"
          subtitle2="Dir. Pavan Moondi"
          studio="Search Engine Films"
        />
        <WorkItem 
          src={IMG_CITY_OF_LIES}
          srcOverlay={IMG_CITY_OF_LIES_OVERLAY}
          alt="City of Lies" 
          title="City of Lies"
          subtitle1="Score Production"
          subtitle2="Dir. Brad Furman"
          studio="Saban Films"
        />
      </div>

      <div 
        className="flex flex-col md:flex-row w-full"
        style={{ 
          gap: 'var(--padding-gap)',
          padding: '0 var(--padding-lr)'
        }}
      >
        <WorkItem 
          src={IMG_DICKINSON}
          srcOverlay={IMG_DICKINSON_OVERLAY}
          alt="Dickinson" 
          title="Dickinson"
          subtitle1="Synchronization"
          subtitle2="Created by Alena Smith"
          studio="Apple"
        />
        <WorkItem 
          src={IMG_FAMILY_GUY}
          srcOverlay={IMG_FAMILY_GUY_OVERLAY}
          alt="Family Guy" 
          title="Family Guy"
          subtitle1="Synchronization"
          subtitle2="Created by: Seth McFarlane"
          studio="FOX"
        />
      </div>

      <div 
        className="flex flex-col md:flex-row w-full"
        style={{ 
          gap: 'var(--padding-gap)',
          padding: '0 var(--padding-lr)'
        }}
      >
        <WorkItem 
          src={IMG_TELL_ME_YOUR_SECRETS}
          srcOverlay={IMG_TELL_ME_YOUR_SECRETS_OVERLAY}
          alt="Tell Me Your Secrets" 
          title="Tell Me Your Secrets"
          subtitle1="Score Production"
          subtitle2="Created by Harriet Warner"
          studio="Amazon"
        />
        <WorkItem 
          src={IMG_THE_DRY}
          srcOverlay={IMG_THE_DRY_OVERLAY}
          alt="The Dry" 
          title="The Dry"
          subtitle1="Score Production"
          subtitle2="Dir. Robert Connoly"
          studio="Roadshow Films"
        />
      </div>
    </div>
  );
}

