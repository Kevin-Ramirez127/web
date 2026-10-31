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

Dark is the default (`:root` values). Light mode overrides every token under
`html[data-theme="light"]` — all Tailwind utilities reference the vars, so the
whole site flips with zero class changes.

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `ink` | `#222222` | `bg-ink` | page background |
| `ink-soft` | `#2a2a2a` | `bg-ink-soft/95` | card / form surface (always with alpha) |
| `bone` | `#e5e5e5` | `text-bone` | headings, primary text |
| `bone-dim` | `#D9CFB8` | `text-bone-dim` | tags, secondary text |
| `bone-faint` | `#A89D87` | `text-bone-faint` | labels, meta, placeholders |
| `accent` | `#8E8BFF` | `text-accent` | bracket links, highlights |
| `accent-dim` | `#7172D8` | — | hover borders, focus fallbacks |
| `line` | `#3a3a3a` | `bg-line` / `border-line` | hairlines, grid gaps |

### Light mode

Light mode keeps three brand anchors — `#e5e5e5` paper, `#4c4cd9` accent,
`#bbbbc8` rails — and derives the rest from them. The text/surface ramp is a
cool indigo-gray (not the old warm brown) so every neutral shares the accent's
hue.

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#e5e5e5` | page background |
| `ink-soft` | `#eeeef2` | card / form surface |
| `bone` | `#1e1e2a` | headings, primary text |
| `bone-dim` | `#454555` | tags, secondary text |
| `bone-faint` | `#5f5f70` | labels, meta, placeholders |
| `accent` | `#4c4cd9` | bracket links, highlights |
| `accent-dim` | `#3b3bb0` | hover borders, focus fallbacks |
| `line` | `#bbbbc8b3` | hairlines (70% of the rail tone) |
| `rail` | `#bbbbc8` | dot-matrix rails |
| `rail-dim` | `#d2d2dc` | backdrop dots |

Rules:

- Body text: `text-bone/85`–`text-bone/90`, `font-light`.
- Muted labels: `font-matrix text-xs tracking-[0.2em+] text-bone-faint`.
- Dividers: `border-t hairline` (`.hairline` sets `border-color: var(--color-line)`).
- Selection: accent background, ink text (`src/styles/global.css`).

Defined in `src/styles/global.css` (`@theme` + `html[data-theme="light"]`).

### Theming

- Dark default; light override via CSS vars. A head-inline script sets
  `documentElement.dataset.theme` from `localStorage` before first paint (no
  flash); `BaseLayout` script syncs both toggles, persists, and updates
  `meta theme-color`.
- Toggles: `ThemeToggle.astro` in the header (left of menu) and the menu
  overlay (left of close). Labels name the ACTION (`[ light ]` in dark mode).
- Switch transition: `src/lib/theme-transition.ts` uses the View Transitions
  API to hold the old page while a center-out quadtree of squares grows over
  it. Squares are largest in the middle and shrink toward the edges; each is
  solid (`SQUARE_FILL`, one value per direction: `lightToDark` / `darkToLight`,
  matching the outgoing theme's `--color-accent`) while growing and swaps to
  the new page's snapshot the moment it completes. Reduced motion gets a short
  cross-fade instead (no squares), and browsers without View Transition
  support switch instantly. The `::view-transition-*` rules live in
  `global.css`, scoped to `html.theme-squares` / `html.theme-fade`;
  `THEME_INK` mirrors `--color-ink` for `meta theme-color` — keep both in sync.
- When adding theme-dependent color, ALWAYS use a var token — never a raw
  hex — or it won't flip. (Past traps: rail dots, scroll hint, selection.)

## 3. Typography

- Display/headings: `"Raleway"` variable (200–700), self-hosted `public/fonts/`.
- Body: `"Inter"` variable (200–700), self-hosted.
- Mono/labels: `"Open Sans"` variable (300–700), self-hosted.
- Pixel: `"Bitcount Grid Double"` variable (300–700), self-hosted. Rail words only, solid dim.
- Scale: hero `text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl`; section titles `text-5xl md:text-6xl font-extralight`; body `17–18px / relaxed / font-light`.
- Mono kickers look like `...HELLO, I AM...`, `...CAREER...`, `...STACK...`, `...CONTACT...`.

## 4. Layout

- Container: `mx-auto max-w-6xl px-6 md:px-10`.
- Sections: `py-20 md:py-28`, flowing continuously with no divider lines (removed).
- Hero: `min-h-screen flex flex-col`, content vertically centered (`justify-center pt-28 pb-16`), `...Scroll...` pinned at bottom.
- Stats / skills grids: `gap-px bg-line border hairline` with `bg-ink` cells (1px hairline grid trick).

## 5. Components

### Bracket link (`src/styles/global.css`)

```html
<a href="#contact" class="bracket-link text-2xl">
  <span class="br">[</span><span>Send Message</span><span class="br">]</span><span class="fill-wipe" aria-hidden="true"><span class="br">[</span><span>Send Message</span><span class="br">]</span></span>
</a>
```

- Accent, `inline-flex gap-0.45rem`; brackets use mono font, always accent.
- Hover/focus-visible: accent box wipes the whole button from the `[` left→right (`::before` scaleX) while an ink `.fill-wipe` copy of the FULL content (appended, `aria-hidden`) wipes in via `clip-path` (same .45s easing, edges synced) — brackets included, flipping as the fill passes. Active: 1px press.
- Menu links (`[data-menu-link]`) use `transition-colors` (not `transition`) and are parked `opacity:0` before the overlay fades, so they never flash before their stagger (no blink).

### Dot-matrix rails (`src/components/GlobalRails.astro`)

One fixed rail for the whole page (desktop). Lives on the RIGHT, spanning to
mid-screen (`right-0 w-1/2`, words from `right-10 lg:right-16`), behind content:

```html
<span class="vertical-rl rotate-180 dot-matrix-lg text-[40px] lg:text-[52px]">Golang .</span>
```

- `.dot-matrix-lg`: Bitcount Grid Double, solid `#6f6e67` (no texture trick — the face is the matrix). Base `.dot-matrix` (5px 4px-grid clip-text) remains for small text.
- 3 columns × 5 section cells (`top/about/experience/skills/contact`, `h-[70vh]` slots). Each cell renders a full-height dotted column BEHIND the word; the word carries a solid `bg-ink` backdrop so it covers the dots where they overlap. Words sit at staggered levels (top / middle / bottom). The word MUST stay in-flow (only the dots are absolute) or the columns collapse to zero width and clip everything. An IntersectionObserver on `main section[id]` (middle viewport band) slides each strip to the active cell with a 0.06s per-column cascade (`src/lib/motion-config.ts` easing). Resize snaps instantly; reduced motion snaps.
- No star/plus backdrops anywhere (`.plus-grid` / `.cross-grid` removed entirely).
- Rail order must match section order in `src/pages/index.astro`.
- Former per-section `SideRails.astro` was replaced by this fixed rail; do not reintroduce per-section rails. No absolute positioning inside cells: `inset-y-*` maps to the wrong physical axis under `vertical-rl`, and absolute-only cells collapse to zero width.

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
| `ease.out` | `[0.22, 1, 0.36, 1]` | everything (motion v14 key is `ease`, not `easing`) |
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
- `public/robots.txt` points to `/sitemap-index.xml`; `public/favicon.svg` for icons.
- No web manifest on purpose: the site must not be installable as a PWA, so browsers never show the install prompt.
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
