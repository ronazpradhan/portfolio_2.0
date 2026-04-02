'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { staggerContainer, staggerItem, wordContainer, wordItem } from '@/lib/animation'
import SectionWrapper from './SectionWrapper'

const projects = [
  {
    number: '01',
    name: 'Portfolio Website',
    description: 'A modern personal portfolio showcasing work, skills, and projects with smooth animations and responsive design.',
    tech: ['Next.js', 'Tailwind CSS', 'GSAP'],
    github: 'YOUR_GITHUB_URL',
    live: 'YOUR_LIVE_URL',
    featured: true,
  },
  {
    number: '02',
    name: 'Task Manager App',
    description: 'A task management application to create, update, and track daily tasks with a clean, intuitive interface.',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'YOUR_GITHUB_URL',
    live: null,
    featured: false,
  },
  {
    number: '03',
    name: 'Weather App',
    description: 'A weather application showing real-time weather data based on user location using a public weather API.',
    tech: ['JavaScript', 'Weather API', 'CSS'],
    github: 'YOUR_GITHUB_URL',
    live: null,
    featured: false,
  },
]

function FeaturedProject({ project }: { project: typeof projects[0] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="group relative border border-[#222222] rounded-sm overflow-hidden transition-all duration-300 hover:border-[hsla(215,25%,70%,0.4)] hover:-translate-y-1"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="relative w-full h-52 bg-[#0f0f0f] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="anton text-[6rem] text-[#1a1a1a] select-none leading-none">
            {project.number}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 h-px w-0 bg-[hsl(215,25%,70%)] transition-all duration-500 group-hover:w-full" />
      </div>

      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <div className="flex items-center gap-3 ml-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="text-[#444444] hover:text-[hsl(215,25%,70%)] transition-colors duration-200">
                <Github size={17} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="text-[#444444] hover:text-[hsl(215,25%,70%)] transition-colors duration-200">
                <ArrowUpRight size={17} />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[#888888] mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-sm bg-[#0a0a0a] text-[#444444] border border-[#1a1a1a]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function SmallProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="group flex items-start gap-6 py-6 border-b border-[#1a1a1a] hover:border-[hsla(215,25%,70%,0.25)] transition-colors duration-300 cursor-default"
    >
      <span className="anton text-3xl text-[#2a2a2a] group-hover:text-[hsl(215,25%,70%)] transition-colors duration-300 flex-shrink-0 leading-none mt-1">
        {project.number}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h3 className="text-base font-semibold text-white group-hover:text-[hsl(215,25%,70%)] transition-colors duration-200">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="text-[#888888] hover:text-[hsl(215,25%,70%)] transition-colors">
                <Github size={15} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="text-[#888888] hover:text-[hsl(215,25%,70%)] transition-colors">
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-[#555555] mb-3 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((t) => (
            <span key={t} className="text-xs text-[#444444]">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <SectionWrapper id="projects" label="Projects">
      <motion.h2
        ref={headerRef}
        className="anton leading-none mb-14"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        variants={wordContainer}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
      >
        {['SELECTED', 'WORK'].map((word, i) => (
          <motion.span
            key={word}
            variants={wordItem}
            className="inline-block mr-[0.2em]"
            style={{ color: i === 1 ? 'hsl(215,25%,70%)' : 'white' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>

      {featured.length > 0 && (
        <div className="mb-8">
          {featured.map((p) => <FeaturedProject key={p.number} project={p} />)}
        </div>
      )}

      {rest.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={staggerItem} className="section-label mb-2">More projects</motion.p>
          {rest.map((p, i) => <SmallProject key={p.number} project={p} index={i} />)}
        </motion.div>
      )}
    </SectionWrapper>
  )
}
