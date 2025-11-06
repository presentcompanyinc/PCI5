# Album URL Verification Guide

## Current Mapping (Based on DISCO Order)

This shows the current URL assignments. **You need to verify these match your actual album titles!**

| Catalog # | Image File | Current DISCO URL | Album Title on DISCO | ✓ Status |
|-----------|------------|-------------------|---------------------|----------|
| PCI001 | PCI001final.jpg | .../albums/25184394 | A Few Dark Clouds | ❓ VERIFY |
| PCI002 | PCI002final.jpg | .../albums/25255681 | Sectionals I | ❓ VERIFY |
| PCI003 | PCI003final.jpg | .../albums/25255680 | Sectionals II | ❓ VERIFY |
| PCI004 | PCI004final.jpg | .../albums/25255678 | Sectionals III | ❓ VERIFY |
| PCI005 | PCI005final.jpg | .../albums/25255674 | Sectionals IV | ❓ VERIFY |
| PCI006 | PCI006final.jpg | .../albums/25254707 | Morbid Curiousity | ❓ VERIFY |
| PCI007 | PCI007final.jpg | .../albums/25254677 | TV Eye | ❓ VERIFY |
| PCI008 | PCI008final.jpg | .../albums/25254570 | Media Massage | ❓ VERIFY |
| PCI009 | pci009final.jpg | .../albums/25254569 | The Quiet Tenant | ❓ VERIFY |
| PCI010 | PCI010final.jpg | .../albums/25254235 | Yanquis | ❓ VERIFY |
| PCI011 | PCI011final.jpg | .../albums/25254231 | Falling Down | ❓ VERIFY |
| PCI012 | PCI012final.jpg | .../albums/25241157 | Random Axe Of Violence | ❓ VERIFY |
| PCI013 | PCI013final.jpg | .../albums/25254115 | I Can Explain | ❓ VERIFY |
| PCI014 | PCI014final.jpg | .../albums/25243354 | For Your Amusement Only | ❓ VERIFY |
| PCI015 | PCI015final.jpg | .../albums/25243309 | Folie A Deux | ❓ VERIFY |
| PCI016 | PCI016final.jpg | .../albums/25241082 | The Fixer | ❓ VERIFY |
| PCI017 | PCI017final.jpg | .../albums/25188750 | The Big Chill | ❓ VERIFY |
| PCI018 | PCI018final.jpg | .../albums/25188763 | Mind Out Of Time | ❓ VERIFY |
| PCI019 | PCI019final.jpg | .../albums/25188751 | 300 Cigarettes EP | ❓ VERIFY |
| PCI020 | PCI020final.jpg | .../albums/25188735 | Event Horizons | ❓ VERIFY |
| PCI021 | PCI021final.jpg | (not yet added) | ??? | ⏳ PENDING |
| PCI022 | PCI022final.jpg | (not yet added) | ??? | ⏳ PENDING |
| PCI023 | PCI023final.jpg | (not yet added) | ??? | ⏳ PENDING |
| PCI024 | PCI024final.jpg | (not yet added) | ??? | ⏳ PENDING |
| PCI025 | PCI025final.jpg | (not yet added) | ??? | ⏳ PENDING |
| PCI026 | PCI026final.jpg | (not yet added) | ??? | ⏳ PENDING |
| PCI027 | PCI027final.jpg | (not yet added) | ??? | ⏳ PENDING |
| PCI028 | PCI028final.jpg | (not yet added) | ??? | ⏳ PENDING |
| PCI029 | PCI029final.jpg | (not yet added) | ??? | ⏳ PENDING |
| PCI030 | PCI030final.jpg | (not yet added) | ??? | ⏳ PENDING |

## How to Verify

### Option 1: Visual Verification
1. Open http://localhost:3000/catalog in your browser
2. Open https://present-company-inc.disco.ac/cat/1732058163/albums in another tab
3. Click on each album on your catalog page (PCI001-PCI020)
4. Compare the album artwork and title on DISCO with what you expected
5. Note any mismatches below

### Option 2: Using the Album Artwork
1. Look at the album artwork files in `/public/assets/`
2. Each file shows the album title on the cover
3. Open each DISCO URL above to see its title
4. Check if they match

## If There Are Mismatches

Please provide the **correct mapping** in this format:

```
PCI001 should be: [Album Title] → [Correct DISCO URL]
PCI005 should be: [Album Title] → [Correct DISCO URL]
```

Or provide a list of your album titles in order (PCI001-PCI030) and I'll match them to the DISCO URLs.

## Full URL Reference

For easy copy-paste, here are all the current URLs:

```
PCI001: https://present-company-inc.disco.ac/cat/1732058163/albums/25184394
PCI002: https://present-company-inc.disco.ac/cat/1732058163/albums/25255681
PCI003: https://present-company-inc.disco.ac/cat/1732058163/albums/25255680
PCI004: https://present-company-inc.disco.ac/cat/1732058163/albums/25255678
PCI005: https://present-company-inc.disco.ac/cat/1732058163/albums/25255674
PCI006: https://present-company-inc.disco.ac/cat/1732058163/albums/25254707
PCI007: https://present-company-inc.disco.ac/cat/1732058163/albums/25254677
PCI008: https://present-company-inc.disco.ac/cat/1732058163/albums/25254570
PCI009: https://present-company-inc.disco.ac/cat/1732058163/albums/25254569
PCI010: https://present-company-inc.disco.ac/cat/1732058163/albums/25254235
PCI011: https://present-company-inc.disco.ac/cat/1732058163/albums/25254231
PCI012: https://present-company-inc.disco.ac/cat/1732058163/albums/25241157
PCI013: https://present-company-inc.disco.ac/cat/1732058163/albums/25254115
PCI014: https://present-company-inc.disco.ac/cat/1732058163/albums/25243354
PCI015: https://present-company-inc.disco.ac/cat/1732058163/albums/25243309
PCI016: https://present-company-inc.disco.ac/cat/1732058163/albums/25241082
PCI017: https://present-company-inc.disco.ac/cat/1732058163/albums/25188750
PCI018: https://present-company-inc.disco.ac/cat/1732058163/albums/25188763
PCI019: https://present-company-inc.disco.ac/cat/1732058163/albums/25188751
PCI020: https://present-company-inc.disco.ac/cat/1732058163/albums/25188735
```

## Album Titles from DISCO (in order found)

These are the 20 album titles that were extracted from DISCO:

1. A Few Dark Clouds
2. Sectionals I
3. Sectionals II
4. Sectionals III
5. Sectionals IV
6. Morbid Curiousity
7. TV Eye
8. Media Massage
9. The Quiet Tenant
10. Yanquis
11. Falling Down
12. Random Axe Of Violence
13. I Can Explain
14. For Your Amusement Only
15. Folie A Deux
16. The Fixer
17. The Big Chill
18. Mind Out Of Time
19. 300 Cigarettes EP
20. Event Horizons

(Plus 10 more albums that need to be loaded by scrolling on DISCO)




