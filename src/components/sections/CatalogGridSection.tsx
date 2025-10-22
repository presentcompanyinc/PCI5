/**
 * CatalogGridSection component - Grid of catalog album covers
 * Extracted from Figma design - 30 albums in a 4-column grid
 */

// Catalog album cover images
const ALBUMS = [
  { id: 1, src: 'http://localhost:3845/assets/50b689f9c59b966626afa3f2ca5c4826b6d49901.png', alt: 'PCI001' },
  { id: 2, src: 'http://localhost:3845/assets/81ee0332886d6185792c21b19ec46537fe279ee1.png', alt: 'PCI002' },
  { id: 3, src: 'http://localhost:3845/assets/4b275d86667e9db0d0b98ce007e433f3adcef72b.png', alt: 'PCI003' },
  { id: 4, src: 'http://localhost:3845/assets/cbff90131eedaedd1bc97eaf0e6b6add0d253aa9.png', alt: 'PCI004' },
  { id: 5, src: 'http://localhost:3845/assets/433d75aafe6a0398ff244c0dc1121ce768a4c20c.png', alt: 'PCI005' },
  { id: 6, src: 'http://localhost:3845/assets/97206f9c77529a9f6f4219549a3ac336994f97a9.png', alt: 'PCI006' },
  { id: 7, src: 'http://localhost:3845/assets/fe6bae81bfbeb1d65a8dc3e2fdfef9e02c7bff24.png', alt: 'PCI007' },
  { id: 8, src: 'http://localhost:3845/assets/1c1e3c557b18aa2a7a65ff1b4da38a34bc51df22.png', alt: 'PCI008' },
  { id: 9, src: 'http://localhost:3845/assets/203cb3ee31148bc8f207256bf70903db7eee5db9.png', alt: 'PCI009' },
  { id: 10, src: 'http://localhost:3845/assets/925daaf976b813c46d51ca468ccd7345444701ef.png', alt: 'PCI010' },
  { id: 11, src: 'http://localhost:3845/assets/e531d2d9550f4df3598ed8ed4273e2cea81a741d.png', alt: 'PCI011' },
  { id: 12, src: 'http://localhost:3845/assets/3c2161480e3aea0e9c927bb468877534a4c00e08.png', alt: 'PCI012' },
  { id: 13, src: 'http://localhost:3845/assets/b4d8f83d9b9d2754e5ba4a2750f98e8668e0c676.png', alt: 'PCI013' },
  { id: 14, src: 'http://localhost:3845/assets/a9e98fce03be6c3de41d85dc58ef40b5489995ac.png', alt: 'PCI014' },
  { id: 15, src: 'http://localhost:3845/assets/1e506dd4fbe2bee72015f6ddb4a938f8c9495f2f.png', alt: 'PCI015' },
  { id: 16, src: 'http://localhost:3845/assets/7f71c1d1e9bfdd324a3aa60df869046381ae1ccd.png', alt: 'PCI016' },
  { id: 17, src: 'http://localhost:3845/assets/0394e49f35537edd34ffcab4480e071b03143b8c.png', alt: 'PCI017' },
  { id: 18, src: 'http://localhost:3845/assets/da17967de017b4e8160b7de599f318b5e91ecef9.png', alt: 'PCI023' },
  { id: 19, src: 'http://localhost:3845/assets/0aedb8ea2994045626515eedc6c8930bd07663f3.png', alt: 'PCI018' },
  { id: 20, src: 'http://localhost:3845/assets/e9e51013141453b904721a4e5af1b1203c5e806c.png', alt: 'PCI019' },
  { id: 21, src: 'http://localhost:3845/assets/79ae1dd3dd01c5a8cdaea82d88f8fdf48a5da27d.png', alt: 'PCI020' },
  { id: 22, src: 'http://localhost:3845/assets/07a461f7968bd1c7ad989a3c80e7903787e9a749.png', alt: 'PCI021' },
  { id: 23, src: 'http://localhost:3845/assets/c5608e0d6dff74a40d2038783a09ff0690ca4ba5.png', alt: 'PCI022' },
  { id: 24, src: 'http://localhost:3845/assets/af2d2fa90ed480946cbed880a66339fdc1e94bbf.png', alt: 'PCI024' },
  { id: 25, src: 'http://localhost:3845/assets/ba09a1a4c01f91c0a5c71f2f2966cf58b75322a3.png', alt: 'PCI025' },
  { id: 26, src: 'http://localhost:3845/assets/d1c812e672ba7bceeac8c70b3f5ab6178af2c0d4.png', alt: 'PCI030' },
  { id: 27, src: 'http://localhost:3845/assets/19e2329ed2dd7296f3ffadcd4bb56668afbabd55.png', alt: 'PCI026' },
  { id: 28, src: 'http://localhost:3845/assets/82fac98c4b073d5f54e94368d099d2d47feace1c.png', alt: 'PCI027' },
  { id: 29, src: 'http://localhost:3845/assets/cdf3d5ac9d897ba099325479c40e41dfda5a4d22.png', alt: 'PCI028' },
  { id: 30, src: 'http://localhost:3845/assets/85553f9a8aaacfa83a9775246aab7e89a5b92a77.png', alt: 'PCI029' },
];

interface AlbumCoverProps {
  src: string;
  alt: string;
}

function AlbumCover({ src, alt }: AlbumCoverProps) {
  return (
    <div className="flex-1 min-w-0 basis-0">
      <div 
        className="relative w-full overflow-hidden" 
        style={{ aspectRatio: '1/1' }}
      >
        <img
          alt={alt}
          className="w-full h-full object-cover"
          src={src}
        />
      </div>
    </div>
  );
}

export function CatalogGridSection() {
  // Group albums into rows of 4
  const rows: typeof ALBUMS[] = [];
  for (let i = 0; i < ALBUMS.length; i += 4) {
    rows.push(ALBUMS.slice(i, i + 4));
  }

  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start w-full"
      style={{ 
        gap: 'var(--padding-gap)',
        padding: '0 var(--padding-lr)'
      }}
    >
      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="flex flex-col md:flex-row w-full"
          style={{ gap: 'var(--padding-gap)' }}
        >
          {row.map((album) => (
            <AlbumCover 
              key={album.id} 
              src={album.src} 
              alt={album.alt} 
            />
          ))}
          {/* Fill empty slots in last row to maintain grid alignment */}
          {row.length < 4 && Array.from({ length: 4 - row.length }).map((_, idx) => (
            <div key={`empty-${idx}`} className="flex-1 min-w-0 basis-0 md:block hidden" />
          ))}
        </div>
      ))}
    </div>
  );
}

