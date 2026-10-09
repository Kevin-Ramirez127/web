# Kevin Ramirez — Portfolio

Astro + Tailwind CSS 4 portfolio. Content from [ramirezkevin.dev](https://www.ramirezkevin.dev/), styling from `reference/Hero.png` + `reference/About.png`: dark warm ink `#1c1b19`, bone text `#ece2cc`, lavender brackets `#8b8cff`, dot-matrix side rails, `[ menu ]` overlay.

## Stack

- Astro 5 + `@astrojs/vercel` (static pages, server `POST /api/contact`)
- Tailwind 4 via `@tailwindcss/vite`
- TypeScript strict (`pnpm check`)
- Resend for contact email delivery
- pnpm

## Develop

```sh
pnpm install
pnpm dev      # http://localhost:4321
pnpm check    # astro typecheck, must be 0 errors
pnpm build    # Vercel-ready output (static + serverless /api/contact)
```

Deploy on Vercel with Framework Preset = Astro, plus `RESEND_API_KEY` +
`CONTACT_TO_EMAIL` env vars (see `.env.example`).

Node 22 + pnpm 11 tested. If you see `ERR_PNPM_IGNORED_BUILDS`, run `pnpm approve-builds --all`.

## Contact form

Behavior ported from `dev_portfolio`'s `Contact.tsx`: hidden honeypot field (bots get a fake 200), required-field alert, `POST /api/contact` JSON, reset + toast on success, error toast with LinkedIn fallback. Email sending needs:

```sh
cp .env.example .env   # then fill RESEND_API_KEY + CONTACT_TO_EMAIL
```

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
- Colors / fonts: `src/styles/global.css` `@theme` (documented in `docs/STYLE-GUIDE.md`).
