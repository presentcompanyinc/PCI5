# Animation Preview Guide

## Accessing the Preview

Visit: **http://localhost:3000/preview**

This is a complete copy of your homepage with all requested animations applied. Compare it with the original at http://localhost:3000 to see the differences.

---

## Animations Applied

### 1. Page Load: Staggered Text Reveal (2x Faster!)
**Location:** Intro paragraph text  
**Animation:** Words fade in one by one with staggered timing  
**Settings:** 0.2s duration, 0.06s stagger delay (twice as fast as original)
**Library:** Framer Motion

### 2. Divider Fade-In
**Location:** All colored divider sections (red, teal, blue, purple)  
**Animation:** Dividers fade in when reaching center of viewport  
**Effect:** 0.6s fade from transparent to full opacity  
**Background:** Color background fades in at same rate as SVG design  
**Trigger:** When divider is 50% visible (centered in viewport)  
**Uses:** Your actual SVG divider files  
**Library:** Framer Motion

### 3. Parallax Depth Effect
**Location:** Featured Work section images  
**Animation:** Images move at different speeds when scrolling  
**Effect:** Main image slower (-30px), side images faster (-50px)  
**Library:** Framer Motion

### 4. Logo Pop Sequence on Scroll
**Location:** Client logos section  
**Animation:** Logos bounce in with stagger when scrolled into view  
**Timing:** 0.05s stagger between each logo  
**Library:** Framer Motion

### 5. Menu Squiggle with Path Morphing
**Location:** Navigation menu items  
**Animation:** Smooth squiggle line draws under menu items on hover  
**Replaces:** Frame-by-frame squiggle images  
**Library:** Framer Motion SVG path animation

### 6. Button Wiggle on Hover
**Location:** "VIEW MORE WORK" button  
**Animation:** Subtle rotation oscillation on hover (-1° to +1°)  
**Repeats:** Continuous while hovering  
**Library:** Framer Motion

### 7. Footer Float Elements
**Location:** Footer (contact button, copyright, Instagram text)  
**Animation:** Subtle vertical floating motion (1-2px drift)  
**Timing:** Different speeds for each element (3-4s cycles)  
**Library:** React Spring

### 8. Contact Modal Spring Entry
**Location:** Contact modal (click "Contact" in menu or footer button)  
**Animation:** Modal bounces in with spring physics  
**Effect:** Scale from 0.8 → 1.0 with spring damping  
**Library:** Framer Motion

### 9. Contact Button Scribbled Fill
**Location:** "Contact Us" button in footer  
**Animation:** Teal color (#03bed8) fills in with organic, hand-drawn feel  
**Effect:** 3 overlapping layers animate at different speeds for sketchy look  
**Timing:** Staggered delays (0ms, 50ms, 100ms) create rough fill effect  
**Library:** Framer Motion

### 10. Service Items Wiggle & Squiggle Draw
**Location:** Services list (Theme Songs, Custom Music, etc.)  
**Animation:** Text wiggles on hover (±1°) + Squiggles draw in on scroll  
**Effect:** Same playful wiggle as "VIEW MORE WORK" button  
**Squiggle:** Draws in once when section enters view (~8 wave bumps)  
**Timing:** 0.6s smooth draw animation, triggers once per page load  
**Library:** Framer Motion

### 11. "What is PCI?" Parallax Entry
**Location:** Services section heading and description  
**Animation:** Text fades in and slides from left when scrolled into view  
**Effect:** Staggered appearance with 0.2s delays between elements  
**Library:** Framer Motion

---

## How to Test

1. **Page Load Animations:** Refresh the page (⌘R or Ctrl+R) to see:
   - Fast text stagger reveal (2x speed!)
   - Dividers fade in as you scroll to them

2. **Scroll Animations:** Scroll down the page to trigger:
   - Parallax on featured work images
   - "What is PCI?" section parallax entry
   - Service item squiggle lines draw in
   - Logo pop sequence in clients section

3. **Hover Animations:** Hover over:
   - Menu items (squiggle morphing)
   - "VIEW MORE WORK" button (wiggle)
   - Service items like "Theme Songs" (text wiggle only)
   - Footer "Contact Us" button (scribbled teal fill)

4. **Float Animation:** Watch the footer elements gently float

5. **Modal Animation:** Click "Contact" in menu or footer to see spring entry

---

## Comparison Tips

Open two browser windows side by side:
- **Original:** http://localhost:3000
- **Preview:** http://localhost:3000/preview

Compare the feel and impact of each animation.

---

## Notes

- All animations respect `prefers-reduced-motion` accessibility setting
- Animations are optimized for performance
- Mobile devices have slightly reduced animation intensity
- No changes to design, colors, or layout - only animations added

