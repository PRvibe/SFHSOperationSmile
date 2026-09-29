# Chapter photograph inventory

Put final chapter images in this folder. These are suggested filenames, not supplied photographs. Export optimized WebP files where practical, then update the corresponding HTML `src` attributes.

| Suggested file | Where it belongs | Suggested dimensions |
| --- | --- | --- |
| `chapter-service.webp` | `index.html` main hero | 1400 × 1200 |
| `chapter-group.webp` | `about.html` chapter story | 1400 × 1200 |
| `highlight-clothing.webp` | `index.html` clothing highlight | 1200 × 900 |
| `highlight-toothpaste.webp` | `index.html` essentials highlight | 1200 × 900 |
| `highlight-patient-cards.webp` | `index.html` cards highlight | 1200 × 900 |
| `officer-01.webp` through `officer-05.webp` | Five profiles in `about.html` | 600 × 750 each |
| `milestone-01.webp` through `milestone-10.webp` | Ten timeline entries in `history.html` | 800 × 520 each |
| `chapter-film-poster.webp` | Optional `joinVideoPoster` in `js/config.js` | 1600 × 900 |

The chapter history's dates, events, and order are provisional. Match photographs to confirmed milestones before replacing the slots. Officer roles also await confirmation.

For every replacement:

1. Set `src`, descriptive `alt`, and the file's actual `width` / `height` in HTML.
2. Keep the existing image/figure classes; they provide responsive cropping and stable aspect ratios.
3. Adjust `object-position` if necessary to keep faces and the activity visible.
4. Remove the placeholder message, overline, and index spans. Remove or rewrite captions that say a photo is coming soon.
5. Check the crop on both desktop and phone screens. Retain lazy loading for images below the hero.

The existing `assets/placeholder-landscape.svg` and `assets/placeholder-portrait.svg` are reusable slot artwork. They should remain available until all references to them have been replaced.
