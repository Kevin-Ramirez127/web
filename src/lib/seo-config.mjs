// Shared by astro.config.mjs (integration + contract) and SEO.astro (payload).
// Keep the canonical host and base URL in sync with `site` in astro.config.mjs.
export const seoConfig = {
  canonicalHost: 'www.ramirezkevin.dev',
  publicBaseUrl: 'https://www.ramirezkevin.dev',
  siteName: 'Kevin Ramirez',
  titleTemplate: '{title}',
  locale: 'en_US',
  twitterSite: '@kevinramdev',
  publisherName: 'Kevin Ramirez',
  defaultOgImage: 'https://www.ramirezkevin.dev/og-cover.png',
};
