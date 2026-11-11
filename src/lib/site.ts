export const site = {
  name: 'Kevin Ramirez',
  title: 'Kevin Ramirez — Full-Stack Developer & Automation Engineer',
  description:
    'Full-stack developer in Montevideo building fast React and Astro interfaces, the automation behind them, and open-source developer tools in Go and Rust. 5+ years across product, data and internal tooling.',
  url: 'https://www.ramirezkevin.dev',
  locale: 'en_US',
  language: 'en',
  author: 'Kevin Ramirez',
  location: 'Montevideo, Uruguay',
  keywords: [
    'Kevin Ramirez',
    'Full Stack Developer',
    'Automation Engineer',
    'Developer Tooling',
    'Web Development',
    'TypeScript',
    'React',
    'Astro',
    'Node.js',
    'Go',
    'Rust',
    'PostgreSQL',
    'MongoDB',
    'AWS',
    'Open Source',
  ],
  social: {
    github: 'https://github.com/Kevin-Ramirez127',
    linkedin: 'https://www.linkedin.com/in/kevin-ramirez-silva/',
  },
  themeColor: '#1c1b19',
} as const;

export type SiteConfig = typeof site;
