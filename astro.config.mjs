import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.ramirezkevin.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  // Static pages are prerendered; POST /api/contact stays server-rendered
  // as a Vercel serverless function.
  adapter: vercel(),
  integrations: [sitemap()],
});
