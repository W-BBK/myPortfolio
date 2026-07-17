# Portfolio Website Design — Brixton

**Date:** 2026-07-17
**Status:** Approved by Brixton

## Overview

A single-page portfolio website built with plain HTML, CSS, and JavaScript — no build step, no frameworks. The page has three sections (About Me, 2048Race, Beary the Bear) stacked vertically. A sticky top nav jumps to each section. As a section scrolls into view, the entire page's color theme cross-fades (~0.6s) to that section's palette. The structure makes adding a fourth project a copy-paste job.

## Files

```
myPortfolio/
├── index.html      # Sticky nav + three <section> blocks
├── style.css       # Layout, per-section themes, fade transition
├── script.js       # IntersectionObserver theme switching + nav smooth-scroll
└── assets/         # Images (screenshots, photo, Beary sprites) — placeholder-ready
```

Opens by double-clicking `index.html`; deployable to GitHub Pages as-is.

## Theming System

- Each `<section>` declares its theme: `<section id="about" data-theme="about">`.
- A theme is a block of CSS custom properties scoped to a body attribute, e.g.
  `body[data-theme="race2048"] { --bg: #0b0e14; --text: ...; --accent: #7c5cff; ... }`.
- All components (nav, headings, cards, buttons) use only the variables, so one
  attribute swap re-themes the whole page.
- `body` and themed elements have `transition: background-color 0.6s, color 0.6s, border-color 0.6s`
  so the swap cross-fades instead of snapping.
- `script.js` uses an `IntersectionObserver` (threshold around 50% visibility) to set
  `document.body.dataset.theme` to the visible section's theme and highlight its nav link.
- Nav links are anchor links (`#about`, etc.) with `scroll-behavior: smooth`.

### Section Palettes (from the real projects)

| Section | Feel | Colors |
|---|---|---|
| About Me | LinkedIn-style professional | LinkedIn's warm gray page background (`#f4f2ee`), white cards, near-black text (`#191919`), LinkedIn blue accent (`#0a66c2`) for links/buttons |
| 2048Race | Dark, neon blue/purple (matches the game's Tailwind theme) | Background `#0b0e14`, panel `#12161f`, purple accent `#7c5cff`, cyan accent `#5cc8ff`, hot pink highlight `#ff5c7c` |
| Beary the Bear | Warm, cozy, matches the sprite | Beary's body brown `#966c46`, muzzle tan `#c4a484` (background), dark brown `#281c12` (text/outline), cream backdrop |

## Section Content

1. **About Me — Brixton**: styled like a LinkedIn profile — a white card with a blue
   banner, circular profile photo overlapping the banner edge, name/headline/school
   lines, and pill buttons for LinkedIn, GitHub, and email. All personal details are
   clearly marked `TODO` placeholders for Brixton to fill in.
2. **2048Race**: title, description placeholder, screenshot spot, tech tags
   (TypeScript, Socket.IO, Tailwind, SQLite), "Play it" link button (placeholder URL).
3. **Beary the Bear**: same showcase layout; described as a desktop pet in the spirit
   of early-2000s desk buddies. Sprite art spot (can use the real sprites from the
   deskPet repo), tech tags (C#/.NET 8, WPF), "View on GitHub" button (placeholder URL).

## Expandability

Adding project #4 requires exactly three edits, documented in an HTML comment:
1. Copy an existing `<section>` block and edit its content.
2. Add one `body[data-theme="newname"] { ... }` variable block in `style.css`.
3. Add one nav link.

The script discovers sections automatically (queries all `section[data-theme]`), so no JS changes.

## Error Handling / Edge Cases

- If JS fails to load, the page still works: anchor links jump to sections and the
  default (About) theme applies everywhere.
- Small screens: nav collapses to a compact row; sections stack with fluid widths.
- Missing images: `alt` text and fixed-size placeholder frames prevent layout shift.

## Testing

Manual: open `index.html` in a browser; verify nav jumps, theme cross-fade on scroll
in both directions, nav highlight tracking, and mobile-width layout via devtools.
