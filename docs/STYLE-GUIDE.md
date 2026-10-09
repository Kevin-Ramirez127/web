# Style Guide

Single source of truth for this portfolio's visual language. It replicates the
reference screenshots (`reference/Hero.png`, `reference/About.png`): dark warm
ink, bone text, lavender `[ bracket ]` links, dot-matrix side rails.

## 1. Principles

- Minimal terminal-bracket aesthetic: content over chrome.
- Left-aligned, generous whitespace, hairline dividers — never heavy cards.
- One accent only (`accent`). Everything else is bone/ink opacity steps.
- Motion is subtle: fade + 18–28px rise, never bounce/rotate.
- No-JS and `prefers-reduced-motion` users always see final content.

## 2. Colors

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `ink` | `#222222` | `bg-ink` | page background |
| `ink-soft` | `#2a2a2a` | `bg-ink-soft/40` | card / form surface (always with alpha) |
| `bone` | `#F1E8D9` | `text-bone` | headings, primary text |
| `bone-dim` | `#D9CFB8` | `text-bone-dim` | tags, secondary text |
| `bone-faint` | `#A89D87` | `text-bone-faint` | labels, meta, placeholders |
| `accent` | `#8E8BFF` | `text-accent` | bracket links, highlights |
| `accent-dim` | `#7172D8` | — | hover borders, focus fallbacks |
| `line` | `#3a3a3a` | `bg-line` / `border-line` | hairlines, grid gaps |

Rules:

- Body text: `text-bone/85`–`text-bone/90`, `font-light`.
- Muted labels: `font-matrix text-xs tracking-[0.2em+] text-bone-faint`.
- Dividers: `border-t hairline` (`.hairline` sets `border-color: var(--color-line)`).
- Selection: accent background, ink text (`src/styles/global.css`).

Defined in `src/styles/global.css` (`@theme`).

## 3. Typography

- Display/headings: `"Raleway"`, weights 200–500 (`h1/h2/h3` always Raleway via `global.css`).
- Body: `"Inter"`, weights 200–500.
- Mono: `"JetBrains Mono"`, weights 200–400. Brackets, labels, tags, stats meta.
- Pixel: `"Bitcount Grid Double"`, weights 300–500. Rail words only (`.dot-matrix-lg`, solid dim `#6f6e67` — the typeface is the dot matrix, no clip-texture).
- Scale: hero `text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl`; section titles `text-5xl md:text-6xl font-extralight`; body `17–18px / relaxed / font-light`.
- Mono kickers look like `...HELLO, I AM...`, `...CAREER...`, `...STACK...`, `...CONTACT...`.

## 4. Layout

- Container: `mx-auto max-w-6xl px-6 md:px-10`.
- Sections: `py-20 md:py-28`, separated by `border-t hairline`.
- Hero: `min-h-screen flex flex-col`, content vertically centered (`justify-center pt-28 pb-16`), `...Scroll...` pinned at bottom.
- Stats / skills grids: `gap-px bg-line border hairline` with `bg-ink` cells (1px hairline grid trick).

## 5. Components

### Bracket link (`src/styles/global.css`)

```html
<a href="#contact" class="bracket-link text-2xl">
  <span class="br">[</span><span>Send Message</span><span class="br">]</span>
</a>
```

- Accent, `inline-flex gap-0.45rem`; brackets use mono font.
- Hover: `#b3b4ff`. Active: 1px press (`transform: translateY(1px)`).

### Dot-matrix rails (`src/components/GlobalRails.astro`)

One fixed rail for the whole page (desktop). Lives on the RIGHT, spanning to
mid-screen (`right-0 w-1/2`, words from `right-10 lg:right-16`), behind content:

```html
<span class="vertical-rl rotate-180 dot-matrix-lg text-[40px] lg:text-[52px]">Golang .</span>
```

- `.dot-matrix-lg`: Bitcount Grid Double, solid `#6f6e67` (no texture trick — the face is the matrix). Base `.dot-matrix` (5px 4px-grid clip-text) remains for small text.
- 3 columns × 5 section cells (`top/about/experience/skills/contact`, `h-[70vh]` slots). Each column holds its word at a different level (top / middle / bottom), words only, no filler. An IntersectionObserver on `main section[id]` (middle viewport band) slides each strip to the active cell with a 0.06s per-column cascade (`src/lib/motion-config.ts` easing). Resize snaps instantly; reduced motion snaps.
- No star/plus backdrops anywhere (`.plus-grid` / `.cross-grid` removed entirely).
- Rail order must match section order in `src/pages/index.astro`.
- Former per-section `SideRails.astro` was replaced by this fixed rail; do not reintroduce per-section rails.

### Tags / meta chips

```html
<span class="font-matrix text-xs border hairline px-2.5 py-1 text-bone-dim">TypeScript</span>
```

Hover on skills: `hover:text-accent hover:border-accent/50 transition`.

### Section header pattern

```html
<p class="reveal font-matrix text-xs tracking-[0.25em] text-bone-faint">...STACK...</p>
<h2 class="reveal mt-3 text-5xl md:text-6xl font-extralight tracking-tight">Skills</h2>
<p class="reveal mt-4 max-w-xl text-bone-faint font-light">Modern technologies and automation tooling.</p>
```

### Form fields (`src/components/Contact.astro`)

Transparent inputs, hairline border, accent focus:

```html
<input class="mt-2 w-full bg-transparent border hairline px-3 py-2.5 font-light text-bone placeholder:text-bone-faint/70 focus:outline-none focus:border-accent transition" />
```

Labels: `font-matrix text-xs tracking-widest text-bone-faint`.

## 6. Motion (Motion package — Framer Motion successor)

Library: [`motion`](https://motion.dev/) (vanilla JS, bundled by Vite — no React needed).
Config: `src/lib/motion-config.ts`. Runtime: `src/layouts/BaseLayout.astro`.

| Token | Value | Use |
|---|---|---|
| `duration.instant` | `0.18s` | menu close |
| `duration.fast` | `0.35s` | menu open / links |
| `duration.base` | `0.7s` | reveals, hero |
| `easing.out` | `[0.22, 1, 0.36, 1]` | everything |
| `distance.rise` | `22px` | scroll reveals |
| `distance.heroRise` | `28px` | hero entrance |
| `stagger.hero` | `0.09s` | hero sequence |
| `stagger.menu` | `0.06s` | menu links |

Patterns:

- Hero: `[data-hero]` inside `#top` animates on load with stagger (`src/components/Hero.astro`).
- Scroll: `.reveal` animates via `inView` with `margin: -8%` (triggers just before viewport). Optional `data-reveal-delay="0.1"`.
- Menu: overlay fades, `[data-menu-link]` items (`src/components/Nav.astro`) rise + stagger on open.
- Initial hidden state is CSS-gated behind `html.js-motion` (added by a tiny inline script), so no-JS stays visible. Reduced motion adds `.is-visible` immediately with no animation.
- API contract (motion v14): `inView(el, onStart)` calls `onStart(element, entry)` — the first arg IS the element, not an entry. Destructuring `{ target }` yields `undefined` and leaves reveals invisible.
- Every animation call has a `try/catch` → `.is-visible` fallback, and `html .reveal.is-visible` outranks the hidden rule, so a motion failure can never blank the page.

When adding a new animated block, prefer `.reveal`; reserve `[data-hero]` for above-the-fold load sequences only.

## 7. SEO

- Central config: `src/lib/site.ts` (URL, title, description, keywords, socials).
- Head tags: `src/components/SEO.astro` — canonical, robots, Open Graph, Twitter card, theme-color, JSON-LD (`Person` + `WebSite`).
- `astro.config.mjs`: `site: https://www.ramirezkevin.dev` + `@astrojs/sitemap`.
- `public/robots.txt` points to `/sitemap-index.xml`; `public/site.webmanifest` + `public/favicon.svg` for icons.
- Pages pass `path` for canonical: `<BaseLayout path="/">`.
- OG image convention: `/og-cover.png` in `public/` (1200×630). Current default 404s gracefully until you add the file — keep the filename stable.

## 8. Accessibility

- Skip link (`#main`), `:focus-visible` accent outline, `aria-expanded` on menu, `Escape` closes, focus moves into/out of overlay.
- Decorative rails are `aria-hidden`. Contrast: bone-on-ink AAA; `bone-faint` is meta-only, never body copy.
- Images (when added) require `alt`; icons `aria-hidden="true"`.

## 9. Adding a section

1. Create `src/components/<Name>.astro` with `border-t hairline` + container + mono kicker + `.reveal` blocks.
2. Import + place in `src/pages/index.astro` inside `<main id="main">`.
3. Add a `[data-menu-link]` entry in `src/components/Nav.astro` if it needs nav.
4. Keep to the tokens above — no new colors without updating this guide.
