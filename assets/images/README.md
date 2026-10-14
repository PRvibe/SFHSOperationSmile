# Chapter photograph inventory

These photographs were supplied by the chapter. Original files are preserved; CSS corrects the orientation of the sideways group photo and card photos.

| File in `chapter/` | Placement | Original dimensions |
| --- | --- | --- |
| `clothing-drive-team.png` | Homepage hero | 1024 × 768 |
| `clothing-donations.png` | Homepage clothing highlight | 337 × 252 |
| `patient-cards.png` | Homepage patient-card highlight | 811 × 1024 |
| `chapter-group.png` | About page chapter story | 923 × 2048 |
| `chapter-meeting.png` | History: Finding our community | 322 × 240 |
| `donation-delivery.png` | History: Turning care into action | 206 × 281 |
| `atlanta-mission-receipt.png` | History: Clothing collection | 342 × 166 |
| `patient-cards-colorful.png` | History: Patient cards | 768 × 1024 |

The five confirmed officer portraits remain in `leadership/` and appear on the About page. The receipt is shown at its original size or smaller; no dates or quantities were inferred from its text. History dates, detailed stories, and chronological order still require chapter confirmation.

The toothpaste highlight and six history entries have no matching supplied photo. Their image figures were removed, and text-only layouts retain their content. No empty photo panels remain. The optional chapter film is separate from the photograph collection.

For every replacement:

1. Set `src`, descriptive `alt`, and the file's actual `width` / `height` in HTML.
2. Use `photo-slot--natural` to keep group photos and supporting images fully visible.
3. Remove the `photo-slot__rotated` wrapper or card rotation rule if an already-upright replacement is used.
4. Remove the placeholder message, overline, and index spans. Remove or rewrite captions that say a photo is coming soon.
5. Check the crop on both desktop and phone screens. Retain lazy loading for images below the hero.

The legacy placeholder SVGs are no longer referenced by the public pages.
