// Theme switch transition: the View Transitions API keeps the old page as a
// snapshot while a quadtree grid of squares grows over it. Squares are
// biggest at the viewport center and shrink toward the edges. While a square
// grows it is a solid fill; the moment it completes, the snapshot of the new
// page replaces the fill inside it. Reduced-motion users get a short
// cross-fade instead, and browsers without View Transitions switch instantly.

export type Theme = 'light' | 'dark';

// Mirrors the `--color-ink` tokens in src/styles/global.css.
export const THEME_INK: Record<Theme, string> = {
  light: '#e5e5e5',
  dark: '#222222',
};

// Solid fill for squares that are still expanding, per switch direction.
// Matches `--color-accent` of the outgoing theme.
export const SQUARE_FILL = {
  lightToDark: '#4C4CD9',
  darkToLight: '#8E8BFF',
} as const;

interface ThemeSquaresOptions {
  /** Viewport coordinates the radial ripple starts from (page center). */
  origin: { x: number; y: number };
  /** Total duration in ms, viewport covered included. */
  duration?: number;
  /** Fill shown inside squares that are still expanding. */
  fill: string;
  /** Applies the incoming theme; runs while the old snapshot is held. */
  apply: () => void;
}

interface Square {
  x: number;
  y: number;
  size: number;
  delay: number;
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// Quadtree tiling centered on the viewport: nodes keep subdividing while
// they're bigger than the size wanted at their distance from the center, so
// center cells stay large and edge cells end up small. Leaves tile the whole
// (oversized) root square, so the union always covers the viewport.
function buildSquares(
  width: number,
  height: number,
  origin: { x: number; y: number },
  duration: number,
): Square[] {
  const maxRadius = Math.hypot(
    Math.max(origin.x, width - origin.x),
    Math.max(origin.y, height - origin.y),
  );
  const rootSize = maxRadius * 2;
  const centerSize = Math.min(128, Math.max(72, Math.min(width, height) / 7));
  const minSize = Math.max(14, centerSize / 6);
  const maxDelay = duration * 0.45;
  const overlap = 1.5; // hides seams between neighbouring squares
  const squares: Square[] = [];

  const visit = (x: number, y: number, size: number, depth: number) => {
    // Skip branches entirely outside the viewport.
    if (x + size <= 0 || x >= width || y + size <= 0 || y >= height) return;

    const cx = x + size / 2;
    const cy = y + size / 2;
    const distance = clamp01(Math.hypot(cx - origin.x, cy - origin.y) / maxRadius);
    const desired = Math.max(minSize, centerSize * (1 - 0.65 * distance));

    if (depth < 9 && size / 2 >= minSize && size > desired) {
      const half = size / 2;
      visit(x, y, half, depth + 1);
      visit(x + half, y, half, depth + 1);
      visit(x, y + half, half, depth + 1);
      visit(x + half, y + half, half, depth + 1);
      return;
    }

    squares.push({ x: cx, y: cy, size: size + overlap, delay: distance * maxDelay });
  };

  visit(origin.x - rootSize / 2, origin.y - rootSize / 2, rootSize, 0);
  return squares;
}

// View Transition pseudos are laid out against the "snapshot containing
// block": the viewport with retractable browser UI (mobile URL bar, root
// scrollbar) hidden. That box is taller than window.innerHeight on mobile, so
// sizing the clips to innerHeight leaves the group's accent background
// exposed as a bar at the bottom of the screen. Measure the real box instead.
function snapshotViewport(): { width: number; height: number } {
  const pseudoNames = [
    '::view-transition',
    '::view-transition-group(root)',
    '::view-transition-old(root)',
  ];
  for (const pseudoName of pseudoNames) {
    const pseudo = getComputedStyle(document.documentElement, pseudoName);
    const width = parseFloat(pseudo.width);
    const height = parseFloat(pseudo.height);
    if (Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0) {
      return { width, height };
    }
  }

  // Fallback: 100vw/100vh also describe the snapshot viewport (browser UI
  // hidden), unlike innerWidth/innerHeight.
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;top:0;left:0;width:100vw;height:100vh;visibility:hidden;pointer-events:none;';
  document.body.appendChild(probe);
  const measured = { width: probe.offsetWidth, height: probe.offsetHeight };
  probe.remove();
  return {
    width: measured.width || window.innerWidth,
    height: measured.height || window.innerHeight,
  };
}

// Reduced-motion fallback: keep a short cross-fade between the old and new
// snapshots instead of the square reveal.
function animateThemeFade(apply: () => void): Promise<void> {
  const root = document.documentElement;
  root.classList.add('theme-fade', 'theme-instant');

  let transition: ViewTransition;
  try {
    transition = document.startViewTransition(() => apply());
  } catch {
    root.classList.remove('theme-fade', 'theme-instant');
    apply();
    return Promise.resolve();
  }

  const cleanup = () => root.classList.remove('theme-fade', 'theme-instant');
  return transition.finished.then(cleanup, cleanup);
}

export function animateThemeSquares({
  origin,
  duration = 600,
  fill,
  apply,
}: ThemeSquaresOptions): Promise<void> {
  const root = document.documentElement;

  // No View Transition support: switch instantly, without any animation.
  if (typeof document.startViewTransition !== 'function') {
    apply();
    return Promise.resolve();
  }

  // Reduced motion: no squares, just a simple cross-fade.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return animateThemeFade(apply);
  }

  if (window.innerWidth === 0 || window.innerHeight === 0) {
    apply();
    return Promise.resolve();
  }

  // Old = full snapshot at first, new = nothing. Squares punch holes in the
  // old snapshot and expose the incoming ink; once a square finishes, the
  // same cell is added to the new snapshot so its content replaces the ink.
  // The exact snapshot size is only readable once the pseudos exist, so start
  // with the old snapshot fully visible (no accent bar can leak through).
  root.style.setProperty('--theme-old-clip', 'none');
  root.style.setProperty('--theme-new-clip', "path('M 0 0')");
  root.style.setProperty('--theme-square-fill', fill);
  // Keep the snapshots on screen for the full run.
  root.style.setProperty('--theme-vt-duration', `${duration}ms`);

  // Freeze color transitions while the new snapshot is captured, so it shows
  // the incoming theme at full strength instead of mid-fade. The
  // `theme-squares` class opts into the square-specific pseudo-element CSS.
  root.classList.add('theme-instant', 'theme-squares');

  let transition: ViewTransition;
  try {
    transition = document.startViewTransition(() => apply());
  } catch {
    root.classList.remove('theme-instant', 'theme-squares');
    root.style.removeProperty('--theme-old-clip');
    root.style.removeProperty('--theme-new-clip');
    root.style.removeProperty('--theme-square-fill');
    root.style.removeProperty('--theme-vt-duration');
    apply();
    return Promise.resolve();
  }

  let frame = 0;

  const cleanup = () => {
    cancelAnimationFrame(frame);
    root.classList.remove('theme-instant', 'theme-squares');
    root.style.removeProperty('--theme-old-clip');
    root.style.removeProperty('--theme-new-clip');
    root.style.removeProperty('--theme-square-fill');
    root.style.removeProperty('--theme-vt-duration');
  };

  const run = () => {
    // Read the snapshot containing block size now that the transition pseudos
    // exist, so clips cover the full box (including mobile browser chrome).
    const { width, height } = snapshotViewport();

    // Finish the squares slightly before the snapshot window closes so the
    // final frame lands while the overlay is still up (no end-of-run pop).
    const motionDuration = duration * 0.94;
    const squares = buildSquares(width, height, origin, motionDuration);
    const maxDelay = motionDuration * 0.45;
    const grow = motionDuration - maxDelay;

    root.style.setProperty('--theme-old-clip', `path('M0 0H${width}V${height}H0Z')`);
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      // Outer rect (clockwise) minus growing squares (counter-clockwise) =
      // the old page with expanding accent holes.
      let oldPath = `M0 0H${width}V${height}H0Z`;
      // Squares that finished growing: reveal their content from the new
      // snapshot instead of the flat accent fill.
      let newPath = '';

      for (const square of squares) {
        const progress = clamp01((elapsed - square.delay) / grow);
        if (progress === 0) continue;
        // Slight overshoot hides anti-aliased seams at full size too.
        const size = square.size * (easeInOutCubic(progress) * 1.04);
        const left = square.x - size / 2;
        const top = square.y - size / 2;
        oldPath += `M${left.toFixed(1)} ${top.toFixed(1)}v${size.toFixed(1)}h${size.toFixed(1)}v${(-size).toFixed(1)}Z`;
        if (progress === 1) {
          newPath += `M${left.toFixed(1)} ${top.toFixed(1)}h${size.toFixed(1)}v${size.toFixed(1)}h${(-size).toFixed(1)}Z`;
        }
      }

      if (elapsed < motionDuration) {
        root.style.setProperty('--theme-old-clip', `path('${oldPath}')`);
        root.style.setProperty('--theme-new-clip', newPath ? `path('${newPath}')` : "path('M 0 0')");
        frame = requestAnimationFrame(tick);
        return;
      }

      // Every cell is done: hide the old snapshot entirely and let the new
      // one show fully before the transition overlay is torn down.
      root.style.setProperty('--theme-old-clip', "path('M 0 0')");
      root.style.setProperty('--theme-new-clip', 'none');
    };

    frame = requestAnimationFrame(tick);
  };

  transition.ready.then(run, () => {
    // Transition was skipped (e.g. document hidden); the theme still applied.
    cleanup();
  });

  return transition.finished.then(cleanup, cleanup);
}
