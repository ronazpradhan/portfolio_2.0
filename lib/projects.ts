export interface Project {
  slug: string
  title: string
  year: number
  short: string
  description: string
  tech: string[]
  features: string[]
  image: string        // /public/projects/
  live: string | null
  comingSoon?: boolean
}

export const PROJECTS: Project[] = [
  {
    slug: 'portfolio',
    title: 'Portfolio',
    year: 2025,
    short: 'Personal portfolio built with Next.js, Tailwind CSS, and GSAP.',
    description:
      'A modern personal portfolio showcasing my work, skills, and projects. Built with performance and aesthetics in mind — smooth animations, responsive design, and a clean dark theme.',
    tech: ['Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'TypeScript'],
    features: [
      'Scroll-based GSAP animations with scrub',
      'Burger menu with full-screen overlay',
      'Expressive Skills section with local icon assets',
      'Project detail pages with dynamic routing',
    ],
    image: '/projects/portfolio.png',
    live: 'YOUR_LIVE_URL',
  },
  {
    slug: 'coming-soon-1',
    title: 'Coming Soon',
    year: 2025,
    short: 'Next project in progress.',
    description: '',
    tech: [],
    features: [],
    image: '/projects/placeholder.png',
    live: null,
    comingSoon: true,
  },
  {
    slug: 'coming-soon-2',
    title: 'Coming Soon',
    year: 2025,
    short: 'Another project on the way.',
    description: '',
    tech: [],
    features: [],
    image: '/projects/placeholder.png',
    live: null,
    comingSoon: true,
  },
]
