# Typography & Layout Review - All Breakpoints

## Breakpoint Definitions

- **Very Small Mobile**: `< 390px`
- **Base Mobile**: `390px - 639px` (default/base)
- **Intermediate Mobile**: `390px - 679px` (squiggle interpolation only)
- **Tablet**: `640px - 767px` (Tailwind `sm:`)
- **Large Tablet**: `768px - 1023px` (Tailwind `md:`)
- **Desktop**: `1024px+` (Tailwind `lg:`)
- **Extra Large Desktop**: `1701px+` (removes horizontal padding)

**Note**: CSS custom property breakpoints are now aligned with Tailwind breakpoints.

---

## Typography (Font Sizes)

### Base Text Sizes

| Variable | Very Small Mobile (<390px) | Base Mobile (390-639px) | Tablet (640-767px) | Large Tablet (768-1023px) | Desktop (1024px+) |
|----------|---------------------------|-------------------------|---------------------|---------------------------|-------------------|
| `--text-tiny` | 12px | 12px | 12px | 12px | 16px |
| `--text-menu` | 14px | 14px | 16px | 22px | 24px |
| `--text-paragraph` | 16px | 16px | 18px | 24px | 26px |
| `--text-header` | 24px | 32px | 48px | 58px | 63px |

### Overlay Text (Image Overlays)

| Variable | Base Mobile | Tablet | Large Tablet | Desktop |
|----------|-------------|--------|--------------|---------|
| `--text-overlay-title` | 20px | 28px | 34px | 40px |
| `--text-overlay-subtitle` | 14px | 18px | 21px | 24px |

### Modal Text

| Variable | Base Mobile | Tablet | Large Tablet | Desktop |
|----------|-------------|--------|--------------|---------|
| `--modal-title-size` | 28px | 40px | 52px | 64px |
| `--modal-label-size` | 20px | 26px | 29px | 32px |
| `--modal-input-text` | 16px | 20px | 22px | 24px |
| `--modal-button-text` | 20px | 26px | 29px | 32px |
| `--modal-close-size` | 32px | 48px | 56px | 64px |

### Other Font Sizes (Inline/Component-Specific)

- **CatalogGridSection "Coming Soon"**: `clamp(1rem, 4vw, 1.5rem)` - Responsive clamp function
- **Preview page**: `text-sm md:text-base` (Tailwind classes)

---

## Line Height

### Component-Level Line Heights

| Component/Usage | Value | Notes |
|----------------|-------|-------|
| IntroSection | `1.15` | Tight line-height for hero text |
| AnimatedIntroSection | `1.15` | Tight line-height for hero text |
| FeaturedWorkSection headers | `normal` | Default line-height |
| FeaturedWorkSection paragraphs | `normal` | Default line-height |
| ServicesSection | `normal` | Default line-height |
| MenuBar | `normal` | Default line-height |
| ContactFormModal | `none` (leading-none) | Close button only |

### Design Token Line Heights (from typography.ts)

- `tight`: `0.99`
- `normal`: `1`
- `relaxed`: `1.2`

---

## Letter Spacing

| Component/Usage | Value | Notes |
|----------------|-------|-------|
| MenuBar menu items | `0.04em` | Applied via inline style |
| AnimatedMenuBar menu items | `0.04em` | Applied via inline style |
| CatalogGridSection "Coming Soon" | `0.1em` | Applied via inline style |
| Design Token (typography.ts) | `1.28px` | Defined but may not be used |

---

## Max Widths

### Content Max Widths

| Variable | Base Mobile | Tablet | Large Tablet | Desktop |
|----------|-------------|--------|--------------|---------|
| `--max-width` | 340px | 500px | 600px | 800px |
| `--min-width` | 100px | 460px | 460px | 460px |
| `--display-width` | 390px | 900px | 1200px | 1700px |
| `--modal-max-width` | 95vw | 700px | 900px | 1135px |

### Fixed Max Widths (from theme)

- `--max-width-prose`: `800px` (fixed)
- `--max-width-full`: `1700px` (fixed)

### Component-Specific Max Widths

| Component | Value | Breakpoint |
|-----------|-------|------------|
| Footer | `max-w-[1440px]` | All breakpoints |
| ServicesSection description | `md:max-w-[600px]` | Tablet+ |
| ServicesSection list | `md:max-w-[459px]` | Tablet+ |
| ServicesSection list min | `md:min-w-[300px]` | Tablet+ |

---

## Spacing (Padding & Gaps)

### Padding Variables

| Variable | Base Mobile | Tablet | Large Tablet | Desktop | Extra Large (1701px+) |
|----------|-------------|--------|--------------|---------|----------------------|
| `--padding-gap` | 16px | 24px | 24px | 24px | 24px |
| `--padding-lr` | 16px | 24px | 24px | 24px | **0px** |
| `--padding-tb` | 48px | 72px | 84px | 96px | 96px |
| `--padding-gap-large` | 48px | 72px | 84px | 96px | 96px |
| `--padding-tb-large` | 96px | 144px | 168px | 192px | 192px |
| `--gutter` | 16px | 24px | 28px | 32px | 32px |

### Overlay Spacing

| Variable | Base Mobile | Tablet | Large Tablet | Desktop |
|----------|-------------|--------|--------------|---------|
| `--overlay-padding` | 15px | 20px | 25px | 30px |
| `--overlay-gap` | 16px | 24px | 28px | 32px |

### Modal Spacing

| Variable | Base Mobile | Tablet | Large Tablet | Desktop |
|----------|-------------|--------|--------------|---------|
| `--modal-padding` | 24px | 40px | 50px | 60px |
| `--modal-gap` | 16px | 24px | 26px | 28px |

### Fixed Spacing Scale (from theme)

- `--spacing-4`: `16px`
- `--spacing-6`: `24px`
- `--spacing-12`: `48px`
- `--spacing-24`: `96px`
- `--spacing-48`: `192px`

### Component-Specific Spacing

| Component | Property | Base Mobile | Tablet+ |
|-----------|----------|-------------|---------|
| IntroSection | padding | `24px var(--padding-lr)` | `24px var(--padding-lr)` |
| ServicesSection | padding | `48px var(--padding-lr)` | `48px var(--padding-lr)` |
| Footer | padding-bottom | `pb-20` (80px) | `pb-0` (0px) |
| MenuBar | padding | `16px var(--padding-lr)` | `16px var(--padding-lr)` |
| CatalogGridSection | gap | `var(--padding-gap)` | `var(--padding-gap)` |
| WorkGridSection | gap | `var(--padding-gap)` | `var(--padding-gap)` |

---

## Menu/Button Widths

| Variable | Base Mobile | Very Small Mobile (<390px) | Tablet | Large Tablet | Desktop |
|----------|-------------|---------------------------|--------|--------------|---------|
| `--menu-home-width` | 80px | 65px | 75px | 85px | 100px |
| `--menu-catalog-width` | 110px | 95px | 100px | 110px | 130px |
| `--contact-button-width` | 100px | 100px | 200px | 250px | 356px |
| `--contact-button-weight` | 3 | 3 | 8 | 9 | 10 |

---

## Grid System

| Variable | Base Mobile | Tablet | Large Tablet | Desktop |
|----------|-------------|--------|--------------|---------|
| `--columns` | 4 | 8 | 10 | 12 |

---

## Font Weights

| Usage | Value | Notes |
|-------|-------|-------|
| Body/Base | `700` | Applied via `.font-pci-sans-bold` class |
| FeaturedWorkSection header | `700` | Via `fontVariationSettings: "'wght' 700"` |
| ServicesSection paragraph | `400` | Via `fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400"` |

---

## Squiggle Decorations (Height Values)

| Variable | Base Mobile | Intermediate Mobile (390-679px) | Tablet | Large Tablet | Desktop |
|----------|-------------|--------------------------------|--------|--------------|---------|
| `--squiggle-2` | 10px | 15px | 20px | 21px | 23px |
| `--squiggle-3` | 15px | 22px | 30px | 31px | 33px |
| `--squiggle-4` | 20px | 30px | 40px | 42px | 45px |
| `--squiggle-5` | 23px | 39px | 55px | 60px | 66px |
| `--squiggle-6` | 35px | 52px | 70px | 75px | 80px |
| `--squiggle-7` | 45px | 67px | 90px | 95px | 100px |
| `--squiggle-8` | 60px | 90px | 120px | 125px | 130px |

---

## Modal Input Heights

| Variable | Base Mobile | Tablet | Large Tablet | Desktop |
|----------|-------------|--------|--------------|---------|
| `--modal-input-height` | 45px | 52px | 55px | 59px |

---

## Responsive Image Sizes

| Component | Sizes Attribute | Notes |
|-----------|----------------|-------|
| CatalogGridSection AlbumCover | `(max-width: 768px) 100vw, 25vw` | 100vw on mobile, 25vw on tablet+ |
| FeaturedWorkSection main image | `100vw` | Full width |
| FeaturedWorkSection grid images | `50vw` | Half width |
| WorkGridSection images | `50vw` | Half width |

---

## Tailwind Breakpoint Classes Used

| Class | Breakpoint | Usage Examples |
|-------|------------|----------------|
| `sm:` | `640px+` | `sm:flex-row`, `sm:items-center` |
| `md:` | `768px+` | `md:flex-row`, `md:max-w-[600px]`, `md:text-base` |
| `lg:` | `1024px+` | `lg:block`, `lg:hidden`, `lg:w-[118px]` |

**Note**: Tailwind breakpoints may differ from CSS custom property breakpoints. Tailwind uses:
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## Summary of Breakpoint Alignment

✅ **Fixed**: All breakpoint inconsistencies have been resolved:
- Text paragraph sizes progress: Mobile (16px) → Tablet (18px) → Large Tablet (24px) → Desktop (26px)
- Text menu sizes progress: Mobile (14px) → Tablet (16px) → Large Tablet (22px) → Desktop (24px)
- Text header sizes progress: Very Small Mobile (24px) → Mobile (32px) → Tablet (48px) → Large Tablet (58px) → Desktop (63px)
- Modal gap now progresses correctly: Tablet (24px) → Large Tablet (26px) → Desktop (28px)
- CSS custom property breakpoints are aligned with Tailwind breakpoints

---

## Component-Specific Typography Notes

### IntroSection
- Uses `--text-paragraph` for font size
- Uses `leading-[1.15]` for line height
- Max width: `var(--max-width)`

### FeaturedWorkSection
- Header uses `--text-header` with `fontVariationSettings: "'wght' 700"`
- "VIEW MORE WORK" uses `--text-menu`
- Overlay titles use `--text-overlay-title`
- Overlay subtitles use `--text-overlay-subtitle`

### ServicesSection
- Header uses `--text-header`
- Paragraph uses `--text-paragraph` with `fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400"`
- Menu items use `--text-menu`

### CatalogGridSection
- "Coming Soon" text uses `clamp(1rem, 4vw, 1.5rem)` for responsive sizing
- Letter spacing: `0.1em`

### MenuBar
- All items use `--text-menu`
- Letter spacing: `0.04em`
- Line height: `normal`

### ContactFormModal
- Title uses `--modal-title-size`
- Close button uses `--modal-close-size` with `leading-none`

---

## Recommendations

1. ✅ **Fixed**: Desktop typography sizes are now larger than Large Tablet and progress correctly.

2. **Standardize Line Heights**: Most components use `normal`, but IntroSection uses `1.15`. Consider documenting when to use which value.

3. **Letter Spacing**: Currently only used in MenuBar (0.04em) and CatalogGridSection (0.1em). Consider standardizing.

4. ✅ **Fixed**: CSS custom property breakpoints are now aligned with Tailwind breakpoints.

5. ✅ **Fixed**: Modal gap now progresses correctly across all breakpoints.

