export const site = {
  name: 'Kevin Ramirez',
  title: 'Kevin Ramirez — Automation & Web Development',
  description:
    'I create modern web experiences and automate processes that transform data into effective decisions. Full-stack developer in Montevideo, Uruguay.',
  url: 'https://www.ramirezkevin.dev',
  locale: 'en_US',
  language: 'en',
  author: 'Kevin Ramirez',
  location: 'Montevideo, Uruguay',
  keywords: [
    'Kevin Ramirez',
    'Frontend Developer',
    'Full Stack Developer',
    'Automation',
    'Web Development',
    'React',
    'TypeScript',
    'Astro',
    'Tailwind CSS',
  ],
  social: {
    github: 'https://github.com/Kevin-Ramirez127',
    linkedin: 'https://www.linkedin.com/in/kevin-ramirez-silva/',
  },
  themeColor: '#1c1b19',
} as const;

export type SiteConfig = typeof site;
