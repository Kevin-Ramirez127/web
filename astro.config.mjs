import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://www.ramirezkevin.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  // Static pages are prerendered; POST /api/contact stays server-rendered.
  // Run with `node ./dist/server/entry.mjs` (or `pnpm preview`).
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap()],
});
