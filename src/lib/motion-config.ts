// Central Motion (Framer Motion successor: `motion` package) configuration.
// Keep in sync with `docs/STYLE-GUIDE.md` and `src/styles/global.css`.
export const MOTION = {
  duration: {
    instant: 0.18,
    fast: 0.35,
    base: 0.7,
    slow: 0.9,
  },
  easing: {
    out: [0.22, 1, 0.36, 1] as const,
    spring: { type: 'spring', stiffness: 260, damping: 28 } as const,
  },
  distance: {
    rise: 22,
    heroRise: 28,
  },
  stagger: {
    hero: 0.09,
    menu: 0.06,
  },
  viewport: {
    // Mirrors the old IntersectionObserver threshold (~0.12) with a margin
    // so reveals trigger slightly before entering the viewport.
    margin: '-8% 0px -8% 0px',
  },
} as const;
