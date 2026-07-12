/**
 * Header component - Top bar with PCI logotype
 * Extracted from Figma design
 *
 * Each word's flex-grow matches its SVG aspect ratio so all three words
 * render at the same cap height while filling the bar on desktop.
 */

const LOGO_PRESENT = '/assets/Present.svg';
const LOGO_COMPANY = '/assets/Company.svg';
const LOGO_INC = '/assets/Inc.svg';

export function Header() {
  return (
    <div className="bg-[#f2efea] flex flex-wrap items-center gap-0 w-full" data-name="Top Bar">
      <div
        className="bg-[#f2efea] flex flex-col md:flex-row items-start w-full gap-2 md:gap-[var(--padding-gap)]"
        style={{
          padding: 'var(--padding-gap) var(--padding-lr)'
        }}
      >
        <div className="w-full md:flex-[6.3214_1_0%] md:w-auto md:min-w-0 relative">
          <img
            alt="Present"
            className="w-full h-auto"
            src={LOGO_PRESENT}
            style={{ aspectRatio: '231.507/36.6232' }}
          />
        </div>
        <div className="w-full md:flex-[6.6094_1_0%] md:w-auto md:min-w-0 relative">
          <img
            alt="Company"
            className="w-full h-auto"
            src={LOGO_COMPANY}
            style={{ aspectRatio: '461.533/69.8303' }}
          />
        </div>
        <div className="w-[41.2%] md:flex-[2.722_1_0%] md:w-auto md:min-w-0 relative">
          <img
            alt="Inc."
            className="w-full h-auto"
            src={LOGO_INC}
            style={{ aspectRatio: '544.4/200' }}
          />
        </div>
      </div>
    </div>
  );
}
