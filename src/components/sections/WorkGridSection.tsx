/**
 * WorkGridSection component - Grid of work samples
 * Extracted from Figma design
 */

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useWorkCardInView } from '@/hooks/useWorkCardInView';

// Work sample images - Default
const IMG_OH_JEROME_NO = '/assets/PCI_OhJeromeNo.jpg';
const IMG_INGRID_GOES_WEST = '/assets/PCI_IngridGoesWest.jpg';
const IMG_SISTERS = '/assets/PCI_Sisters.jpg';
const IMG_JOE_MANDE = '/assets/PCI_JoeMandeChill.jpg';
const IMG_DUCK_BUTTER = '/assets/PCI_DuckButter.jpg';
const IMG_NEW_YORKER = '/assets/PCI_NewYorkerPresents.jpg';
const IMG_PAST_MY_BEDTIME = '/assets/PCI_PastMyBedtime.jpg';
const IMG_SUNDOWNERS = '/assets/PCI_Sundowners.jpg';
const IMG_CITY_OF_LIES = '/assets/PCI_CityofLies.jpg';
const IMG_DICKINSON = '/assets/PCI_Dickinson.jpg';
const IMG_FAMILY_GUY = '/assets/PCI_FamilyGuy.jpg';
const IMG_TELL_ME_YOUR_SECRETS = '/assets/PCI_TellMeYourSecrets.jpg';
const IMG_THE_DRY = '/assets/PCI_TheDry.jpg';

// Work sample images - Overlay (noTitle versions)
const IMG_OH_JEROME_NO_OVERLAY = '/assets/PCI_OhJeromeNo_NoTitle.jpg';
const IMG_INGRID_GOES_WEST_OVERLAY = '/assets/PCI_IngridGoesWest_NoTitle.jpg';
const IMG_SISTERS_OVERLAY = '/assets/PCI_Sisters_NoTitle.jpg';
const IMG_JOE_MANDE_OVERLAY = '/assets/PCI_JoeMandeChill_NoTitle.jpg';
const IMG_DUCK_BUTTER_OVERLAY = '/assets/PCI_DuckButter_NoTitle.jpg';
const IMG_NEW_YORKER_OVERLAY = '/assets/PCI_NewYorkerPresents_NoTitle.jpg';
const IMG_PAST_MY_BEDTIME_OVERLAY = '/assets/PCI_PastMyBedtime_NoTitle.jpg';
const IMG_SUNDOWNERS_OVERLAY = '/assets/PCI_Sundowners_NoTitle.jpg';
const IMG_CITY_OF_LIES_OVERLAY = '/assets/PCI_CityofLies_NoTitle.jpg';
const IMG_DICKINSON_OVERLAY = '/assets/PCI_Dickinson_NoTitle.jpg';
const IMG_FAMILY_GUY_OVERLAY = '/assets/PCI_FamilyGuy_NoTitle.jpg';
const IMG_TELL_ME_YOUR_SECRETS_OVERLAY = '/assets/PCI_TellMeYourSecrets_NoTitle.jpg';
const IMG_THE_DRY_OVERLAY = '/assets/PCI_TheDry_NoTitle.jpg';

interface WorkItemProps {
  src: string;
  srcOverlay: string;
  alt: string;
  title: string;
  subtitle1: string;
  subtitle2?: string;
  studio: string;
  className?: string;
  delay?: number;
  isTouchDevice: boolean;
}

function WorkItem({ src, srcOverlay, alt, title, subtitle1, subtitle2, studio, className = '', delay = 0, isTouchDevice }: WorkItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isInView } = useWorkCardInView(cardRef);
  const [showOverlay, setShowOverlay] = useState(false);
  
  useEffect(() => {
    if (!isTouchDevice) return;
    
    let timeoutId: NodeJS.Timeout;
    
    if (isInView) {
      // Wait 0.5s then show overlay (image B)
      timeoutId = setTimeout(() => {
        setShowOverlay(true);
      }, 500);
    } else {
      // Immediately show original image (image A) when scrolled out
      setShowOverlay(false);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView, isTouchDevice]);
  
  return (
    <motion.div 
      ref={cardRef}
      className={`flex-1 min-w-0 ${className} group cursor-pointer`}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.9, 
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth float
      }}
    >
      <div 
        className="relative w-full overflow-hidden" 
        style={{ aspectRatio: '1/1' }}
      >
        {/* Default Image */}
        <Image
          alt={alt}
          src={src}
          fill
          sizes="50vw"
          quality={90}
          className={`object-cover transition-all duration-300 ease-in-out ${
            isTouchDevice 
              ? (showOverlay ? 'opacity-0' : 'opacity-100')
              : 'group-hover:opacity-0'
          }`}
        />
        
        {/* Overlay Image - visible on hover or scroll trigger */}
        <Image
          alt={alt}
          src={srcOverlay}
          fill
          sizes="50vw"
          quality={90}
          className={`object-cover transition-all duration-300 ease-in-out ${
            isTouchDevice 
              ? (showOverlay ? 'opacity-100' : 'opacity-0')
              : 'opacity-0 group-hover:opacity-100'
          }`}
        />
        
        {/* Text Overlay - Fade in on hover or scroll trigger */}
        <div className={`absolute inset-0 bg-[rgba(3,3,3,0.6)] transition-opacity duration-300 ease-in-out flex items-start justify-start p-[10px] ${
          isTouchDevice 
            ? (showOverlay ? 'opacity-100' : 'opacity-0')
            : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div 
            className="flex flex-col w-full"
            style={{
              padding: 'var(--overlay-padding)',
              gap: 'var(--overlay-gap)'
            }}
          >
            {/* Title and Subtitles */}
            <div className="flex flex-col gap-[13px]">
              <div className="w-full">
                <p 
                  className="font-pci-sans-bold text-[#cecece] uppercase leading-normal"
                  style={{ fontSize: 'var(--text-overlay-title)' }}
                >
                  {title}
                </p>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p 
                  className="font-pci-sans-bold text-[#cecece] leading-normal"
                  style={{ fontSize: 'var(--text-overlay-subtitle)' }}
                >
                  {subtitle1}
                </p>
                {subtitle2 && (
                  <p 
                    className="font-pci-sans-bold text-[#cecece] leading-normal"
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
                className="font-pci-sans-bold text-[#cecece] leading-normal"
                style={{ fontSize: 'var(--text-overlay-subtitle)' }}
              >
                {studio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function WorkGridSection() {
  const isTouchDevice = useTouchDevice();
  
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
            className="font-pci-sans-bold leading-normal text-black whitespace-pre"
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
          src={IMG_OH_JEROME_NO}
          srcOverlay={IMG_OH_JEROME_NO_OVERLAY}
          alt="Oh Jerome, No" 
          title="Oh Jerome, No"
          subtitle1="Music Supervision"
          subtitle2="Dir. Teddy Blanks/Alex Karpovsky"
          studio="FX"
          delay={0}
          isTouchDevice={isTouchDevice}
        />
        <WorkItem 
          src={IMG_INGRID_GOES_WEST}
          srcOverlay={IMG_INGRID_GOES_WEST_OVERLAY}
          alt="Ingrid Goes West" 
          title="Ingrid Goes West"
          subtitle1="Original Score"
          subtitle2="Dir. Matt Spicer"
          studio="NEON"
          delay={0.1}
          isTouchDevice={isTouchDevice}
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
          src={IMG_SISTERS}
          srcOverlay={IMG_SISTERS_OVERLAY}
          alt="Sisters" 
          title="Sisters"
          subtitle1="Original Song"
          subtitle2="Created by: Sarah Goldberg + Susan Stanley"
          studio="Shaftesbury"
          delay={0.2}
          isTouchDevice={isTouchDevice}
        />
        <WorkItem 
          src={IMG_JOE_MANDE}
          srcOverlay={IMG_JOE_MANDE_OVERLAY}
          alt="Chill" 
          title="Chill"
          subtitle1="Main Theme"
          subtitle2="Created by Joe Mande"
          studio="HULU"
          delay={0.3}
          isTouchDevice={isTouchDevice}
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
          src={IMG_DUCK_BUTTER}
          srcOverlay={IMG_DUCK_BUTTER_OVERLAY}
          alt="Duck Butter" 
          title="Duck Butter"
          subtitle1="Original Score"
          subtitle2="Dir. Miguel Arteta"
          studio="The Orchard"
          delay={0.4}
          isTouchDevice={isTouchDevice}
        />
        <WorkItem 
          src={IMG_NEW_YORKER}
          srcOverlay={IMG_NEW_YORKER_OVERLAY}
          alt="The New Yorker Presents" 
          title="The New Yorker Presents"
          subtitle1="Main Theme"
          studio="Amazon/Jigsaw Productions"
          delay={0.5}
          isTouchDevice={isTouchDevice}
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
          src={IMG_PAST_MY_BEDTIME}
          srcOverlay={IMG_PAST_MY_BEDTIME_OVERLAY}
          alt="Past My Bedtime" 
          title="Past My Bedtime"
          subtitle1="Original Song"
          subtitle2="Created by: Max Silvestri + Leah Beckmann"
          studio="Audible"
          delay={0.6}
          isTouchDevice={isTouchDevice}
        />
        <WorkItem 
          src={IMG_SUNDOWNERS}
          srcOverlay={IMG_SUNDOWNERS_OVERLAY}
          alt="Sundowners" 
          title="Sundowners"
          subtitle1="Original Score"
          subtitle2="Dir. Pavan Moondi"
          studio="Search Engine Films"
          delay={0.7}
          isTouchDevice={isTouchDevice}
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
          src={IMG_CITY_OF_LIES}
          srcOverlay={IMG_CITY_OF_LIES_OVERLAY}
          alt="City of Lies" 
          title="City of Lies"
          subtitle1="Score Production"
          subtitle2="Dir. Brad Furman"
          studio="Saban Films"
          delay={0.8}
          isTouchDevice={isTouchDevice}
        />
        <WorkItem 
          src={IMG_DICKINSON}
          srcOverlay={IMG_DICKINSON_OVERLAY}
          alt="Dickinson" 
          title="Dickinson"
          subtitle1="Synchronization"
          subtitle2="Created by Alena Smith"
          studio="Apple"
          delay={0.9}
          isTouchDevice={isTouchDevice}
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
          src={IMG_FAMILY_GUY}
          srcOverlay={IMG_FAMILY_GUY_OVERLAY}
          alt="Family Guy" 
          title="Family Guy"
          subtitle1="Synchronization"
          subtitle2="Created by: Seth McFarlane"
          studio="FOX"
          delay={1.0}
          isTouchDevice={isTouchDevice}
        />
        <WorkItem 
          src={IMG_TELL_ME_YOUR_SECRETS}
          srcOverlay={IMG_TELL_ME_YOUR_SECRETS_OVERLAY}
          alt="Tell Me Your Secrets" 
          title="Tell Me Your Secrets"
          subtitle1="Score Production"
          subtitle2="Created by Harriet Warner"
          studio="Amazon"
          delay={1.1}
          isTouchDevice={isTouchDevice}
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
          src={IMG_THE_DRY}
          srcOverlay={IMG_THE_DRY_OVERLAY}
          alt="The Dry" 
          title="The Dry"
          subtitle1="Score Production"
          subtitle2="Dir. Robert Connoly"
          studio="Roadshow Films"
          delay={1.2}
          isTouchDevice={isTouchDevice}
        />
        {/* Invisible placeholder to maintain grid alignment */}
        <div className="flex-1 min-w-0 hidden md:block" />
      </div>
    </div>
  );
}

