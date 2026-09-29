# Operation Smile reference audit

Inspected September 29, 2026. These observations record the public reference site at that time; future changes to it do not automatically change this chapter site.

## Sources

- [Home](https://www.operationsmile.org/): persistent header, campaign hero, story carousel, impact figures, split sections, donation CTA, footer.
- [Our Story and Impact](https://www.operationsmile.org/about-us/our-story-impact/): editorial introduction, alternating photo/text sections, impact figures, related content.
- [Leadership](https://www.operationsmile.org/about-us/leadership/): sticky section navigation, square portraits, grouped profiles, generous spacing.
- [Student Programs](https://www.operationsmile.org/make-an-impact/student-programs/): membership introduction, starter steps, pillars, event and participation sections.
- [Public theme CSS](https://www.operationsmile.org/wp-content/themes/operationsmile/assets/css/style.css?ver=1790612064): exact typography, colors, breakpoints, spacing, and interaction values below.

## Observed design system

| Element | Reference value or behavior |
| --- | --- |
| Display font | FF Cocon Pro, light 300; rounded, approachable proportions |
| Body / navigation | Inter; body 400, navigation 600, button 700 |
| Heading blue | `#0051a7` |
| Donation red | `#ee2c3c`, hover `#d61121` |
| Text | `#333333` |
| Accent colors | Cyan `#00b2ed`, lavender `#7e77bb` |
| Pale surfaces | `#deedff`, `#f0f7ff`, `#f5f5f5` |
| Hairlines | `#e7e7e7` |
| Desktop H1 / H2 / H3 | 62px / 52px / 41px; line heights 1.16 / 1.15 / 1.24 |
| Mobile H1 / H2 / H3 | 32px / 28px / 22px; line heights 1.25 / 1.14 / 1.27 |
| Body copy | Desktop 18px / 1.67; mobile 14px / 1.57 |
| CTA typography | Inter 12px / 18px, 700, uppercase, 1px tracking |
| Filled buttons | Compact rounded pills, padding 14px 24px; 16px 32px above 1400px |
| Text CTA | Cyan 3px underline, increasing to 5px on hover |
| Section spacing | Typically 96px desktop and 64px mobile |
| Page gutters | 100px above 1400px; 48–100px between 1024–1400px; 16px mobile |
| Header | Fixed white shell, utility links above primary navigation, prominent red CTA; contracts on scroll |
| Navigation feedback | Lavender bottom rule, approximately 150ms transitions |
| Image treatment | Rectangular photography; occasional curved crops and red/lavender/cyan edge accents |
| Leadership | Three-column square portraits, approximately 6% column gaps, pale blue fade under photographs |
| Footer | Blue full-width CTA followed by a light gray, divided multi-column footer |

The original logo is an inline SVG with a `260 × 50` viewBox and fills `#0853a4` and `#ed2c3d`. Its slightly different colors are preserved in the supplied mark rather than recoloring its paths.

## Chapter adaptation

- Preserve the white, blue, and red palette, editorial pacing, image-led composition, compact CTA styling, and consistent page shell.
- Use four real static pages: Home, About Us, Our History, and Get Involved. Adapt the global donation CTA to Join Now and the supplied chapter Linktree.
- Integrate the South Forsyth Chapter identifier with the wordmark. Identify the site as a school chapter rather than the international organization.
- Substitute locally hosted Nunito for the proprietary Cocon display font. Inter remains the body/UI font. Nunito preserves a warm rounded character without shipping Cocon font binaries.
- Replace national impact statistics with the three supplied chapter accomplishments, presented through a visitor-controlled highlight interface.
- Adapt the portrait system into exactly five editable officer profiles with red names above images and darker blue description accents.
- Extend the reference's curves and alternating editorial sections into the requested ten-milestone history, connected by a white SVG path. Keep the connector clear of text and simplify its course on mobile.
- Use deliberately styled photo slots until chapter images arrive. Officer names, biographies, timeline dates/events, social destinations, and video remain clearly documented replacement content.
- Keep motion restrained, keyboard interactions explicit, and reduced-motion support built in. Video is loaded only after a source is configured and a visitor chooses playback.

## Local font assets

Both font families are distributed under the SIL Open Font License 1.1. Full licenses are kept beside the fonts.

| Family | Local file | Size | Supported use |
| --- | --- | --- | --- |
| Inter | `assets/fonts/inter-latin-variable.woff2` | 48,256 bytes | Normal Latin variable, requested weights 400–700 |
| Nunito | `assets/fonts/nunito-latin-variable.woff2` | 39,128 bytes | Normal Latin variable, requested weights 400–700 |

Use `font-display: swap` and `font-weight: 400 700` in each `@font-face`. Nunito supplies display weights 400, 600, and 700; Inter supplies body/UI weights 400, 500, 600, and 700. The current English content uses Latin glyphs; add appropriate subsets if other writing systems are introduced.

Downloaded September 29, 2026 from these primary sources:

- [Google Fonts CSS request](https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Nunito:wght@400..700&display=swap)
- [Inter Latin WOFF2](https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2) and [Inter license](https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt)
- [Nunito Latin WOFF2](https://fonts.gstatic.com/s/nunito/v32/XRXV3I6Li01BKofINeaB.woff2) and [Nunito license](https://raw.githubusercontent.com/google/fonts/main/ofl/nunito/OFL.txt)
