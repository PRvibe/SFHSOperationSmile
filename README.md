# Operation Smile - South Forsyth Chapter

A responsive, four-page chapter website built with semantic HTML5, CSS, and vanilla JavaScript. It has no framework, build step, package installation, or backend. Content is available in the HTML; JavaScript adds the mobile menu, highlight controls, timeline connector, and optional video player.

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
| `join.html` | Get Involved page, video placeholder, participation topics, and joining steps |
| `history.html` | Ten editable history milestones with alternating layouts |
| `css/styles.css` | Brand tokens, typography, shared components, and page styles |
| `css/responsive.css` | Responsive layouts and reduced-motion behavior |
| `css/history.css` | Timeline-specific layout and connector appearance |
| `js/config.js` | Chapter video URL, optional poster, and captions |
| `js/navigation.js`, `js/slider.js` | Mobile navigation and visitor-controlled highlights |
| `js/main.js`, `js/timeline.js` | Small reveal effects, current year, and SVG connector sizing |
| `js/video.js` | Video URL handling and click-to-load players |

Keep files encoded as **UTF-8**. The header, chapter CTA, and footer are intentionally duplicated so every page works independently. Their `SHARED HEADER` and `SHARED CTA AND FOOTER` comments mark the sections: update all four pages together, retaining each page's own `aria-current="page"` navigation attribute.

All Join Now / Join Our Chapter links use **https://linktr.ee/sfhsoperationsmile**, with `target="_blank"` and `rel="noopener noreferrer"`. Keep this destination and new-tab behavior consistent.

## Update chapter content

- **Highlights:** the supplied accomplishments are **40K+ clothing items donated**, **200+ toothpaste items collected**, and **200+ cards written for patients with cleft conditions**. Edit the three `.highlight-slide` articles in `index.html`. Preserve the matching tab IDs, `aria-controls`, and `aria-labelledby` values when changing copy.
- **Officers:** edit the five `.officer-profile` articles in `about.html`. Each name appears above its portrait; roles are provisional and explicitly marked for confirmation. Replace the name, role, photo, and short biography together. Keep the five-profile layout unless the chapter structure changes.
- **History:** edit the ten `.milestone` articles in `history.html`. Dates, stories, photos, and chronological order await confirmation. Three milestones carry the supplied accomplishments; the others are clearly identified story slots. Replace draft dates and copy with verified chapter records. Alternate the existing blue/reverse classes and preserve unique milestone heading IDs. The connector measures its markers automatically after content and layout changes.
- **Contacts:** the footer's Instagram and email entries are labeled placeholders. Replace them with verified links, such as an Instagram profile URL or `mailto:` address, across all four pages.

Real photography, officer names/confirmed roles/biographies, historical dates/events, social contacts, and the video URL still need chapter input. Review the editable chapter introduction as part of that content handoff. This site identifies itself as the South Forsyth school chapter, not the international organization's website.

## Replace image placeholders

Store chapter photographs in `assets/images/`. The [image inventory](assets/images/README.md) lists suggested filenames and sizes. Optimized WebP is recommended; JPEG also works.

1. Replace each image's `src` with its local path, such as `assets/images/chapter-service.webp`.
2. Write accurate `alt` text describing the photograph's relevant content. Replace placeholder language.
3. Set `width` and `height` to the image's actual pixel dimensions. The surrounding aspect-ratio slots preserve layout, while `object-fit: cover` crops photographs.
4. Adjust `object-position` when a face or important detail needs a different crop, for example `style="object-position: 50% 35%"`.
5. Remove decorative placeholder text: `.photo-slot__message`, `.photo-slot__overline`, and `.photo-slot__index` spans. Remove a placeholder `.photo-slot__label` caption or replace it with a real, useful caption. Keep the containing figure and layout classes.

Use approximately **1400 × 1200** for hero/chapter photos, **600 × 750** for officer portraits, and **800 × 520** for milestone photos. The homepage highlight photos work well at **1200 × 900**. Keep below-the-fold images lazy-loaded and preserve the hero's loading priority.

## Add the chapter film

Edit the existing object in `js/config.js`:

```js
window.CHAPTER_CONFIG = Object.freeze({
  joinVideoUrl: 'VIDEO_URL_HERE',
  joinVideoPoster: '',
  joinVideoCaptions: ''
});
```

Replace `VIDEO_URL_HERE` with a YouTube URL, Vimeo URL, or direct `.mp4` / `.webm` URL. A local relative path such as `assets/media/chapter-film.mp4` also works when that file is provided. Leave the placeholder value until the actual film is ready.

- YouTube is converted to `youtube-nocookie.com`; Vimeo uses its player with `dnt=1` and supports unlisted-video hashes.
- No player is loaded until the visitor presses the play button. Autoplay is not requested; a loaded player may require its own Play control.
- Direct media uses native `<video controls playsinline>`.
- `joinVideoPoster` accepts an optional image URL or local path.
- `joinVideoCaptions` accepts an optional English WebVTT `.vtt` path for direct media. Configure captions through YouTube/Vimeo for hosted videos. Serve local caption files through the preview server or static host when testing.

No final chapter film was supplied. URL handling is tested, but playback, captions, provider permissions, and the final film's content must be checked with the supplied media before sharing it publicly.

## Fonts and reference

Nunito and Inter are hosted locally in `assets/fonts/`; their SIL Open Font License files are included. Nunito is the openly licensed display substitute for the reference site's proprietary FF Cocon Pro. No Cocon font binary is bundled.

The chapter lockup uses `assets/operation-smile.svg`, extracted from the official site's inline mark, together with chapter text. The dated [reference audit](docs/REFERENCE-AUDIT.md) records the official source pages, exact brand values, typography observations, and font download sources.

## Check changes

With a recent Node.js version installed, run the dependency-free checks:

```powershell
node --test --test-isolation=none tests/site.test.cjs tests/video.test.cjs
```

These cover route and asset paths, fragments, ID/ARIA relationships, navigation, Join links, static content counts, image metadata, font files, and video URL resolution. They do not replace visual review.

After editing, check all four pages at desktop and mobile widths, including 320px. Try the mobile menu with Tab and Escape, the highlights with arrow keys/Home/End and previous/next buttons, the participation disclosures, the timeline's image/text spacing, and reduced-motion settings. Confirm new photos have useful crops and the footer contacts work.

Stylesheet URLs currently use a `?v=3` query string to refresh cached CSS. If a browser or host keeps showing an earlier style after deployment, increase this value consistently on all four HTML pages, or perform a hard refresh during local work.

## Hosting

This repository is ready for an ordinary static host: upload the four root HTML files plus the `css/`, `js/`, and `assets/` folders, preserving paths. Use `index.html` as the entry page and leave the build command empty. No server application or environment variables are required. Join actions open the chapter Linktree; there is no local membership database or form backend.

The project has been prepared locally; this guide does not indicate that it has been published. The test files and documentation do not need to be uploaded.
