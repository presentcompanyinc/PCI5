'use client';

/**
 * CarnivalPopperClientsSection - Client logos with comic book explosion effect
 * Click any logo to make it explode with cartoon-style burst effects!
 */

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useAnimationFrame } from 'framer-motion';

// Existing client logos
const IMG_ABC = '/assets/ABC.svg';
const IMG_NBC = '/assets/NBC.svg';
const IMG_NETFLIX = '/assets/Netflix.svg';
const IMG_HBO = '/assets/HBO.svg';
const IMG_PARAMOUNT = '/assets/Paramount.svg';
const IMG_DISNEY = '/assets/Disney.svg';
const IMG_CBS = '/assets/CBS.svg';

// New client logos
const IMG_AUDIBLE = '/assets/Audible.png';
const IMG_BBC = '/assets/BBC-Logo.png';
const IMG_CARTOON_NETWORK = '/assets/Cartoon-Network-Logo.png';
const IMG_FX = '/assets/FX_Networks_logo.svg.png';
const IMG_FOX = '/assets/Fox_Broadcasting_Company_logo_(2019).svg.png';
const IMG_HULU = '/assets/hulu-logo-black-transparent.png';
const IMG_IFC = '/assets/IFC_2018_logo.svg.png';
const IMG_MCSWEENEYS = '/assets/McSweeneys.png';
const IMG_NEON = '/assets/Neon-Logo.png';

// Comic book explosion particles
interface ExplosionParticle {
  id: string;
  x: number;
  y: number;
  type: 'star' | 'burst' | 'line' | 'circle' | 'spiral' | 'cloud' | 'bolt' | 'pow';
  size: number;
  rotation: number;
  velocity: { x: number; y: number };
  angularVelocity: number;
  scale: number;
}

// Comic book particle components
const StarBurst = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2">
    <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
  </svg>
);

const JaggedBurst = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2">
    <path d="M12 2 L15 8 L22 7 L17 12 L20 18 L12 15 L4 18 L7 12 L2 7 L9 8 Z" />
  </svg>
);

const ImpactLine = ({ size }: { size: number }) => (
  <div 
    style={{ 
      width: size, 
      height: 4, 
      background: 'black',
      borderRadius: 2,
    }} 
  />
);

const SpiralSwirl = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
    <path d="M12 12 Q14 10 16 12 T18 16 Q18 19 15 20 T10 19 Q7 17 7 14 T9 9 Q11 7 14 7" />
  </svg>
);

const CloudPuff = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2">
    <circle cx="8" cy="14" r="4" />
    <circle cx="14" cy="12" r="5" />
    <circle cx="18" cy="15" r="3" />
    <circle cx="11" cy="17" r="3" />
  </svg>
);

const ZigzagBolt = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2">
    <path d="M13 2 L3 14 L10 14 L8 22 L20 10 L13 10 Z" />
  </svg>
);

const PowText = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 24" fill="white" stroke="black" strokeWidth="3">
    <text 
      x="20" 
      y="18" 
      fontFamily="Arial Black, sans-serif" 
      fontSize="18" 
      fontWeight="900" 
      textAnchor="middle"
      strokeWidth="2"
    >
      POW
    </text>
  </svg>
);

export function CarnivalPopperClientsSection() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row1InView = useInView(row1Ref, { once: true, amount: 0.3 });
  const row2InView = useInView(row2Ref, { once: true, amount: 0.3 });
  
  const [explodedLogos, setExplodedLogos] = useState<Set<string>>(new Set());
  const [particles, setParticles] = useState<ExplosionParticle[]>([]);
  const animationFrameRef = useRef<number>();
  const particlesStartTimeRef = useRef<number>(0);

  // Row 1: Scrolls left to right (normal direction)
  const row1Logos = [
    { src: IMG_ABC, alt: "ABC" },
    { src: IMG_NETFLIX, alt: "Netflix" },
    { src: IMG_PARAMOUNT, alt: "Paramount" },
    { src: IMG_CBS, alt: "CBS" },
    { src: IMG_AUDIBLE, alt: "Audible" },
    { src: IMG_CARTOON_NETWORK, alt: "Cartoon Network" },
    { src: IMG_FOX, alt: "Fox Broadcasting" },
    { src: IMG_HULU, alt: "Hulu" },
  ];

  // Row 2: Scrolls right to left (reverse direction)
  const row2Logos = [
    { src: IMG_NBC, alt: "NBC" },
    { src: IMG_HBO, alt: "HBO" },
    { src: IMG_DISNEY, alt: "Disney" },
    { src: IMG_BBC, alt: "BBC" },
    { src: IMG_FX, alt: "FX Networks" },
    { src: IMG_IFC, alt: "IFC" },
    { src: IMG_MCSWEENEYS, alt: "McSweeney's" },
    { src: IMG_NEON, alt: "Neon" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1] as const, // Bounce easing
      },
    },
  };

  // Handle logo explosion
  const handleLogoClick = (key: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Mark logo as exploded (permanently!)
    setExplodedLogos(prev => new Set(prev).add(key));

    // Create comic book explosion particles
    const newParticles: ExplosionParticle[] = [];
    const particleCount = 15;
    const types: Array<'star' | 'burst' | 'line' | 'circle' | 'spiral' | 'cloud' | 'bolt' | 'pow'> = 
      ['star', 'burst', 'line', 'circle', 'spiral', 'cloud', 'bolt', 'pow'];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = 10 + Math.random() * 6;
      const size = 15 + Math.random() * 25;
      
      newParticles.push({
        id: `${key}-${i}-${Date.now()}`,
        x: centerX,
        y: centerY,
        type: types[Math.floor(Math.random() * types.length)],
        size,
        rotation: Math.random() * 360,
        scale: 1,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed - 5, // Stronger upward bias
        },
        angularVelocity: (Math.random() - 0.5) * 25,
      });
    }

    setParticles(prev => [...prev, ...newParticles]);
    particlesStartTimeRef.current = Date.now();
  };

  // Animate particles with physics
  useEffect(() => {
    if (particles.length === 0) return;

    const gravity = 0.4;
    const bounce = 0.5;
    const friction = 0.97;

    const animate = () => {
      const elapsed = Date.now() - particlesStartTimeRef.current;
      
      // Remove particles after 2.5 seconds with fade out
      if (elapsed > 2500) {
        setParticles([]);
        return;
      }

      setParticles(prev => {
        return prev.map(particle => {
          // Apply physics
          let newVelocityY = particle.velocity.y + gravity;
          let newY = particle.y + newVelocityY;
          let newVelocityX = particle.velocity.x * friction;
          let newX = particle.x + newVelocityX;
          let newRotation = particle.rotation + particle.angularVelocity;
          let newScale = particle.scale;

          // Bounce off bottom
          if (newY > window.innerHeight - particle.size) {
            newY = window.innerHeight - particle.size;
            newVelocityY = -newVelocityY * bounce;
            newScale = newScale * 0.9; // Shrink slightly on bounce
          }

          // Bounce off sides
          if (newX < 0 || newX > window.innerWidth) {
            newVelocityX = -newVelocityX * bounce;
            newX = Math.max(0, Math.min(window.innerWidth, newX));
          }

          // Fade out in last 500ms
          if (elapsed > 2000) {
            newScale = newScale * 0.95;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            rotation: newRotation,
            scale: newScale,
            velocity: { x: newVelocityX, y: newVelocityY },
          };
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles.length]);

  return (
    <div 
      className="bg-[#f2efea] flex flex-col items-start justify-end w-full relative" 
      style={{ padding: '48px 0' }}
      data-name="Selected Clients"
    >
      {/* Title */}
      <div 
        className="flex items-center justify-center w-full"
        style={{ padding: '0 var(--padding-lr)', gap: '10px', marginBottom: '24px' }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <p 
            className="font-pci-sans-bold text-black leading-normal uppercase"
            style={{ fontSize: 'var(--text-header)' }}
          >
            Selected Clients
          </p>
        </div>
      </div>

      {/* Dual-Row Client Logos with Pop Animation and Smooth Scrolling */}
      <div className="w-full flex flex-col" style={{ gap: 'var(--padding-gap-large)' }}>

        {/* Row 1: Scrolls left to right with pop animation and buttery smooth motion */}
        <div 
          className="w-full overflow-hidden" 
          style={{ 
            padding: '0 var(--padding-lr)',
            paddingTop: '20px',
            paddingBottom: '20px',
            marginTop: '-20px',
            marginBottom: '-20px'
          }}
        >
          <motion.div
            ref={row1Ref}
            variants={containerVariants}
            initial="hidden"
            animate={row1InView ? "visible" : "hidden"}
            className="flex items-center"
            style={{ 
              gap: 'var(--padding-gap-large)',
              willChange: 'transform'
            }}
          >
            <motion.div
              className="flex items-center"
              style={{ 
                gap: 'var(--padding-gap-large)',
                willChange: 'transform',
                transform: 'translateZ(0)' // Force GPU acceleration
              }}
              animate={row1InView ? { x: [0, '-50%'] } : {}}
              transition={{
                x: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                  delay: 0.5 // Start scrolling after pop-in
                }
              }}
            >
            {/* Render logos 4 times for seamless infinite loop */}
            {[...Array(4)].map((_, setIndex) => (
              row1Logos.map((logo, index) => {
                const key = `row1-set${setIndex}-${index}`;
                const isExploded = explodedLogos.has(key);
                
                return (
                  <motion.div 
                    key={key}
                    variants={setIndex === 0 ? itemVariants : {}}
                    className="relative shrink-0 w-[79px] md:w-[105px] lg:w-[118px] aspect-square cursor-pointer"
                    onClick={(e) => handleLogoClick(key, e)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {!isExploded ? (
                        <motion.img 
                          key={`img-${key}`}
                          alt={logo.alt} 
                          className="w-full h-full object-contain" 
                          src={logo.src}
                          initial={{ scale: 1, rotate: 0, opacity: 1 }}
                          exit={{ 
                            scale: 1.3, 
                            rotate: 15, 
                            opacity: 0,
                            transition: { duration: 0.2 }
                          }}
                        />
                      ) : (
                        <div key={`empty-${key}`} />
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Row 2: Scrolls right to left with pop animation and buttery smooth motion */}
        <div 
          className="w-full overflow-hidden" 
          style={{ 
            padding: '0 var(--padding-lr)',
            paddingTop: '20px',
            paddingBottom: '20px',
            marginTop: '-20px',
            marginBottom: '-20px'
          }}
        >
          <motion.div
            ref={row2Ref}
            variants={containerVariants}
            initial="hidden"
            animate={row2InView ? "visible" : "hidden"}
            className="flex items-center"
            style={{ 
              gap: 'var(--padding-gap-large)',
              willChange: 'transform'
            }}
          >
            <motion.div
              className="flex items-center"
              style={{ 
                gap: 'var(--padding-gap-large)',
                willChange: 'transform',
                transform: 'translateZ(0)' // Force GPU acceleration
              }}
              animate={row2InView ? { x: ['-50%', 0] } : {}}
              transition={{
                x: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                  delay: 0.5 // Start scrolling after pop-in
                }
              }}
            >
            {/* Render logos 4 times for seamless infinite loop */}
            {[...Array(4)].map((_, setIndex) => (
              row2Logos.map((logo, index) => {
                const key = `row2-set${setIndex}-${index}`;
                const isExploded = explodedLogos.has(key);
                
                return (
                  <motion.div 
                    key={key}
                    variants={setIndex === 0 ? itemVariants : {}}
                    className="relative shrink-0 w-[79px] md:w-[105px] lg:w-[118px] aspect-square cursor-pointer"
                    onClick={(e) => handleLogoClick(key, e)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {!isExploded ? (
                        <motion.img 
                          key={`img-${key}`}
                          alt={logo.alt} 
                          className="w-full h-full object-contain" 
                          src={logo.src}
                          initial={{ scale: 1, rotate: 0, opacity: 1 }}
                          exit={{ 
                            scale: 1.3, 
                            rotate: 15, 
                            opacity: 0,
                            transition: { duration: 0.2 }
                          }}
                        />
                      ) : (
                        <div key={`empty-${key}`} />
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Comic Book Explosion Particles Layer */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map((particle) => {
          const ParticleComponent = 
            particle.type === 'star' ? StarBurst :
            particle.type === 'burst' ? JaggedBurst :
            particle.type === 'line' ? ImpactLine :
            particle.type === 'spiral' ? SpiralSwirl :
            particle.type === 'cloud' ? CloudPuff :
            particle.type === 'bolt' ? ZigzagBolt :
            particle.type === 'pow' ? PowText :
            () => (
              <div 
                style={{ 
                  width: particle.size, 
                  height: particle.size, 
                  border: '2px solid black',
                  background: 'white',
                  borderRadius: '50%'
                }} 
              />
            );

          return (
            <div
              key={particle.id}
              style={{
                position: 'absolute',
                left: particle.x,
                top: particle.y,
                transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
                opacity: particle.scale,
                filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.3))',
              }}
            >
              <ParticleComponent size={particle.size} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

