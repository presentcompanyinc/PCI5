/**
 * ContactButton - SVG button with dynamic fill color and animation
 * The SVG contains two layers: a colored interior fill and the black outline
 * 
 * Animation options:
 * - fade: Simple opacity fade in/out
 * - wipe: Left-to-right reveal animation
 * - scale: Scale from center
 * - instant: No animation (default)
 */

interface ContactButtonProps {
  fillColor: string;
  className?: string;
  animationStyle?: 'fade' | 'wipe' | 'scale' | 'instant';
}

export function ContactButton({ 
  fillColor, 
  className = '',
  animationStyle = 'fade' 
}: ContactButtonProps) {
  const isTransparent = fillColor === 'transparent';
  
  // Define transition styles
  const transitions = {
    instant: '',
    fade: 'transition-opacity duration-300 ease-in-out',
    wipe: 'transition-all duration-500 ease-out',
    scale: 'transition-transform duration-400 ease-out origin-center'
  };
  
  // Define animation-specific styles
  const getAnimationStyles = () => {
    if (isTransparent) {
      switch (animationStyle) {
        case 'fade':
          return 'opacity-0';
        case 'wipe':
          return 'translate-x-[-100%]';
        case 'scale':
          return 'scale-0';
        default:
          return '';
      }
    }
    return '';
  };
  
  return (
    <svg
      className={className}
      viewBox="0 0 356 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id="button-shape">
          <rect x="8" y="8" width="340" height="80" rx="40" />
        </clipPath>
      </defs>
      
      {/* Interior fill - can be dynamically colored with animations */}
      <g clipPath="url(#button-shape)">
        <rect
          x="8"
          y="8"
          width="340"
          height="80"
          rx="40"
          fill={fillColor}
          className={`${transitions[animationStyle]} ${getAnimationStyles()}`}
        />
      </g>
      
      {/* Black outline - the hand-drawn border */}
      <image
        href="/assets/ContactUs.svg"
        width="356"
        height="96"
      />
    </svg>
  );
}

