# Kevin Ramirez — Portfolio

Astro + Tailwind CSS 4 portfolio. Content from [ramirezkevin.dev](https://www.ramirezkevin.dev/), styling from `reference/Hero.png` + `reference/About.png`: dark warm ink `#1c1b19`, bone text `#ece2cc`, lavender brackets `#8b8cff`, dot-matrix side rails, `[ menu ]` overlay.

## Stack

- Astro 5 (static)
- Tailwind 4 via `@tailwindcss/vite`
- TypeScript strict
- pnpm

## Develop

```sh
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # -> dist/
pnpm preview
```

Node 22 + pnpm 11 tested. If you see `ERR_PNPM_IGNORED_BUILDS`, run `pnpm approve-builds --all`.

## Structure

```
src/
  layouts/BaseLayout.astro   # fonts, reveal + menu script
  components/
    Nav.astro                # [ menu ] + fullscreen overlay
    SideRails.astro          # vertical dot-matrix rails + plus-grid
    Hero.astro               # Kevin Ramirez / Automation & web development
    About.astro              # About me + Areas of Expertise + stats
    Experience.astro         # Arbusta, Meta CAPI, Bridge for Billions
    Skills.astro             # 6 groups + additional tech
    Contact.astro            # form + footer
  pages/index.astro
  styles/global.css          # Tailwind 4 @theme tokens
```

## Customize

- Links: GitHub / LinkedIn URLs in `Hero.astro`, `Nav.astro`, `Contact.astro`.
- Contact form uses `mailto:` by default — swap `action` for Formspree / Resend / API route.
- Colors / fonts: `src/styles/global.css` `@theme`.
