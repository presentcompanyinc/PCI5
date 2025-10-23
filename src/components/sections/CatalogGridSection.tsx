/**
 * CatalogGridSection component - Grid of catalog album covers
 * Extracted from Figma design - 30 albums in a 4-column grid
 */

// Catalog album cover images
const ALBUMS = [
  { id: 1, src: '/assets/PCI001final.jpg', alt: 'PCI001' },
  { id: 2, src: '/assets/PCI002final.jpg', alt: 'PCI002' },
  { id: 3, src: '/assets/PCI003final.jpg', alt: 'PCI003' },
  { id: 4, src: '/assets/PCI004final.jpg', alt: 'PCI004' },
  { id: 5, src: '/assets/PCI005final.jpg', alt: 'PCI005' },
  { id: 6, src: '/assets/PCI006final.jpg', alt: 'PCI006' },
  { id: 7, src: '/assets/PCI007final.jpg', alt: 'PCI007' },
  { id: 8, src: '/assets/PCI008final.jpg', alt: 'PCI008' },
  { id: 9, src: '/assets/pci009final.jpg', alt: 'PCI009' },
  { id: 10, src: '/assets/PCI010final.jpg', alt: 'PCI010' },
  { id: 11, src: '/assets/PCI011final.jpg', alt: 'PCI011' },
  { id: 12, src: '/assets/PCI012final.jpg', alt: 'PCI012' },
  { id: 13, src: '/assets/PCI013final.jpg', alt: 'PCI013' },
  { id: 14, src: '/assets/PCI014final.jpg', alt: 'PCI014' },
  { id: 15, src: '/assets/PCI015final.jpg', alt: 'PCI015' },
  { id: 16, src: '/assets/PCI016final.jpg', alt: 'PCI016' },
  { id: 17, src: '/assets/PCI017final.jpg', alt: 'PCI017' },
  { id: 18, src: '/assets/PCI018final.jpg', alt: 'PCI018' },
  { id: 19, src: '/assets/PCI019final.jpg', alt: 'PCI019' },
  { id: 20, src: '/assets/PCI020final.jpg', alt: 'PCI020' },
  { id: 21, src: '/assets/PCI021final.jpg', alt: 'PCI021' },
  { id: 22, src: '/assets/PCI022final.jpg', alt: 'PCI022' },
  { id: 23, src: '/assets/PCI023final.jpg', alt: 'PCI023' },
  { id: 24, src: '/assets/PCI024final.jpg', alt: 'PCI024' },
  { id: 25, src: '/assets/PCI025final.jpg', alt: 'PCI025' },
  { id: 26, src: '/assets/PCI026final.jpg', alt: 'PCI026' },
  { id: 27, src: '/assets/PCI027final.jpg', alt: 'PCI027' },
  { id: 28, src: '/assets/PCI028final.jpg', alt: 'PCI028' },
  { id: 29, src: '/assets/PCI029final.jpg', alt: 'PCI029' },
  { id: 30, src: '/assets/PCI030final.jpg', alt: 'PCI030' },
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

