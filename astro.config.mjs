import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import easeo from '@easeo/astro';
import { seoConfig } from './src/lib/seo-config.mjs';

export default defineConfig({
  site: 'https://www.ramirezkevin.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  // Static pages are prerendered; POST /api/contact stays server-rendered
  // as a Vercel serverless function.
  adapter: vercel(),
  integrations: [
    sitemap(),
    easeo({
      config: seoConfig,
      // Write .easeo/contract.json into the build output so SEO intent can be
      // diffed or uploaded as an artifact.
      contract: {
        canonicalHost: seoConfig.canonicalHost,
        scheme: 'https',
        defaults: {
          indexable: true,
          canonical: 'self',
          ogRequired: true,
          twitterRequired: true,
          schemaRequired: true,
          title: { required: true, minLength: 20, maxLength: 60 },
          description: { required: true, minLength: 70, maxLength: 160 },
        },
        rules: [{ match: '/', expect: { schemaRequired: true, schemaTypes: ['WebSite'] } }],
      },
    }),
  ],
});
