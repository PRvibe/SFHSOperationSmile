# Operation Smile - South Forsyth Chapter

A responsive, four-page chapter website built with semantic HTML5, CSS, and vanilla JavaScript. It has no framework, build step, package installation, or backend. Content is available in the HTML; JavaScript adds the mobile menu, highlight controls, and timeline connector. The Get Involved page plays the supplied member recording with native browser video controls.

## Preview

From this folder, run:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open **http://127.0.0.1:4173/**. Stop the server with `Ctrl+C`.

You can also open `index.html` directly in a browser: the site uses relative paths and classic deferred scripts. Use the local server when checking video captions and embedded media, whose browser restrictions can differ on `file:` URLs.

## Where to edit

| File | Content |
| --- | --- |
| `index.html` | Homepage, introduction, and three Recent Highlights |
| `about.html` | Chapter introduction and five officer profiles |
| `join.html` | Get Involved page, member recording, participation topics, and joining steps |
| `history.html` | Three history entries about chapter purpose, community, and patient cards |
| `css/styles.css` | Brand tokens, typography, shared components, and page styles |
| `css/responsive.css` | Responsive layouts and reduced-motion behavior |
| `css/history.css` | Timeline-specific layout and connector appearance |
| `css/join.css` | Member recording layout and native video presentation |
| `assets/media/chapter-members.mp4` | Supplied member recording shown on the Get Involved page |
| `js/config.js` | Unused optional configuration helper for the alternate video player |
| `js/navigation.js`, `js/slider.js` | Mobile navigation and visitor-controlled highlights |
| `js/main.js`, `js/timeline.js` | Small reveal effects, current year, and SVG connector sizing |
| `js/video.js` | Unused optional utility for video URLs and click-to-load players |

Keep files encoded as **UTF-8**. The header, chapter CTA, and footer are intentionally duplicated so every page works independently. Their `SHARED HEADER` and `SHARED CTA AND FOOTER` comments mark the sections: update all four pages together, retaining each page's own `aria-current="page"` navigation attribute.

All Join Now / Join Our Chapter links use **https://linktr.ee/sfhsoperationsmile**, with `target="_blank"` and `rel="noopener noreferrer"`. Keep this destination and new-tab behavior consistent.

## Update chapter content

- **Highlights:** the supplied accomplishments are **40K+ clothing items donated**, **200+ toothpaste items collected**, and **200+ cards written for patients with cleft conditions**. Edit the three `.highlight-slide` articles in `index.html`. Preserve the matching tab IDs, `aria-controls`, and `aria-labelledby` values when changing copy.
- **Officers:** edit the five `.officer-profile` articles in `about.html`. The chapter has confirmed Nikash Nemmara as President, Renesh Mylapuram as Vice President, and Advaith Kotha, Yagnaram Chintu, and Pranav Rajkumar as Officers. Each name appears above its supplied portrait. Keep the five-profile layout unless the chapter structure changes.
- **History:** edit the three `.milestone` articles in `history.html`: chapter purpose, chapter community, and **200+ cards written for patients with cleft conditions**. These retain the original entries 1, 2, and 6, now displayed as 01, 02, and 03. The chapter-purpose entry is text-only; the other two have supplied photos. Preserve heading IDs `milestone-title-01`, `milestone-title-02`, and `milestone-title-06`. There are no placeholder dates or story labels. Add historical dates or events only when confirmed by the chapter. The connector measures its markers automatically after content and layout changes.
- **Contacts:** the footer's Instagram and email entries are labeled placeholders. Replace them with verified links, such as an Instagram profile URL or `mailto:` address, across all four pages.

Chapter photography, officer names, roles and portraits, and the member recording have been supplied. Personal biographies and social contacts can be expanded with confirmed chapter input. This site identifies itself as the South Forsyth school chapter, not the international organization's website.

## Update chapter photographs

Store chapter photographs in `assets/images/`. The [image inventory](assets/images/README.md) lists supplied files and their placements. Unmatched picture slots have been removed; preserve the text-only layouts until a relevant photo is available.

1. Replace each image's `src` with its local path, such as `assets/images/chapter-service.webp`.
2. Write accurate `alt` text describing the photograph's relevant content. Replace placeholder language.
3. Set `width` and `height` to the image's actual pixel dimensions. Use `photo-slot--natural` to preserve the full frame of group photos and supporting images; officer portraits use fixed aspect ratios with `object-fit: cover`.
4. Adjust `object-position` when a face or important detail needs a different crop, for example `style="object-position: 50% 35%"`.
5. Remove decorative placeholder text: `.photo-slot__message`, `.photo-slot__overline`, and `.photo-slot__index` spans. Remove a placeholder `.photo-slot__label` caption or replace it with a real, useful caption. Keep the containing figure and layout classes.

Use approximately **1400 × 1200** for hero/chapter photos, **600 × 750** for officer portraits, and **800 × 520** for milestone photos. The homepage highlight photos work well at **1200 × 900**. Keep below-the-fold images lazy-loaded and preserve the hero's loading priority.

## Update the member recording

`join.html` embeds `assets/media/chapter-members.mp4` in a native `<video controls playsinline preload="metadata">` element. Visitors start playback themselves; the recording does not autoplay. Its layout is in `css/join.css`.

To replace the recording, put the new file in `assets/media/` and update the `<source src>` and both recording links in `join.html`. Keep the source's `type` accurate, such as `video/mp4` for an MP4. Update the video description if the subject changes.

An optional poster can be added with the video's `poster` attribute. If captions are supplied, add a `<track kind="captions" src="assets/media/chapter-members.vtt" srclang="en" label="English">` inside the video. Check playback, native controls, and any caption track using the preview server on desktop and mobile.

`js/config.js` and `js/video.js` remain available as optional utilities, but the current page does not load them. Changing their configuration will not change the native player.

## Fonts and reference

Nunito and Inter are hosted locally in `assets/fonts/`; their SIL Open Font License files are included. Nunito is the openly licensed display substitute for the reference site's proprietary FF Cocon Pro. No Cocon font binary is bundled.

The chapter lockup uses `assets/operation-smile.svg`, extracted from the official site's inline mark, together with chapter text. The dated [reference audit](docs/REFERENCE-AUDIT.md) records the official source pages, exact brand values, typography observations, and font download sources.

## Check changes

With a recent Node.js version installed, run the dependency-free checks:

```powershell
node --test --test-isolation=none tests/site.test.cjs tests/video.test.cjs
```

These cover route and asset paths, fragments, ID/ARIA relationships, navigation, Join links, static content counts, image metadata, font files, and the retained optional video URL utility. They do not replace visual review or playback checks for the member recording.

After editing, check all four pages at desktop and mobile widths, including 320px. Try the mobile menu with Tab and Escape, the highlights with arrow keys/Home/End and previous/next buttons, the participation disclosures, the timeline's image/text spacing, and reduced-motion settings. Confirm new photos have useful crops and the footer contacts work.

Stylesheet URLs use version query strings to refresh cached CSS: shared styles use `?v=4`, history styles use `?v=5`, and recording styles use `?v=1`. If a browser or host keeps showing an earlier style after deployment, increase the affected stylesheet's version on each page that loads it, or perform a hard refresh during local work.

## Hosting

This repository is ready for an ordinary static host: upload the four root HTML files plus the `css/`, `js/`, and `assets/` folders, preserving paths. Use `index.html` as the entry page and leave the build command empty. No server application or environment variables are required. Join actions open the chapter Linktree; there is no local membership database or form backend.

The project has been prepared locally; this guide does not indicate that it has been published. The test files and documentation do not need to be uploaded.
