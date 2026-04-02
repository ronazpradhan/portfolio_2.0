'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS, Project } from '@/lib/projects'
import { wordContainer, wordItem, staggerContainer, staggerItem } from '@/lib/animation'
import SectionWrapper from './SectionWrapper'

// ── Project row ───────────────────────────────────────────────────────────────
function ProjectRow({
  project,
  index,
  isActive,
  isDimmed,
  onHover,
  onLeave,
}: {
  project: Project
  index: number
  isActive: boolean
  isDimmed: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative border-b border-[#1a1a1a] overflow-hidden"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Accent wipe — slides in from left on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'hsla(215,25%,70%,0.04)' }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative flex items-center justify-between py-7 gap-6">
        {/* Index */}
        <span
          className="anton text-sm transition-colors duration-300 flex-shrink-0 w-8"
          style={{ color: isActive ? 'hsl(215,25%,70%)' : '#333' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title — accent wipe via clip-path on a colored clone */}
        <div className="flex-1 relative overflow-hidden">
          {/* Base white title */}
          <h3
            className="anton transition-opacity duration-300"
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
              lineHeight: 1,
              color: 'white',
              opacity: isDimmed ? 0.18 : 1,
            }}
          >
            {project.title}
          </h3>

          {/* Accent-colored clone — reveals left-to-right via clipPath */}
          <motion.h3
            className="anton absolute inset-0 pointer-events-none"
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
              lineHeight: 1,
              color: 'hsl(215,25%,70%)',
            }}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: isActive ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </motion.h3>
        </div>

        {/* Year */}
        <span
          className="text-xs transition-colors duration-300 hidden md:block"
          style={{ color: isActive ? 'hsl(215,25%,70%)' : '#444' }}
        >
          {project.year}
        </span>

        {/* Arrow — appears on hover */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          {!project.comingSoon ? (
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-1.5 text-sm font-medium text-[hsl(215,25%,70%)]"
            >
              View
              <ArrowUpRight size={15} />
            </Link>
          ) : (
            <span className="text-xs text-[#555]">Soon</span>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// ── Preview panel ─────────────────────────────────────────────────────────────
function PreviewPanel({ project }: { project: Project | null }) {
  return (
    <div className="hidden lg:flex items-center justify-center w-[420px] flex-shrink-0">
      <div className="w-full aspect-[4/3] relative rounded-sm overflow-hidden border border-[#1a1a1a] bg-[#0f0f0f]">
        <AnimatePresence mode="wait">
          {project ? (
            <motion.div
              key={project.slug}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                onError={() => {}}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              {/* Live link */}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-sm border border-[hsl(215,25%,70%,0.4)] text-[hsl(215,25%,70%)] hover:bg-[hsl(215,25%,70%,0.1)] transition-colors duration-200"
                >
                  Live <ArrowUpRight size={12} />
                </a>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-xs text-[#333] tracking-widest uppercase">Hover a project</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  const activeProject = activeIndex !== null ? PROJECTS[activeIndex] : null

  return (
    <SectionWrapper id="projects" label="Projects">
      {/* Heading */}
      <motion.h2
        ref={headerRef}
        className="anton leading-none mb-16"
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

      {/* List + Preview */}
      <div className="flex gap-16 items-start">
        {/* Project rows */}
        <motion.div
          className="flex-1 min-w-0"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i}
              isActive={activeIndex === i}
              isDimmed={activeIndex !== null && activeIndex !== i}
              onHover={() => setActiveIndex(i)}
              onLeave={() => setActiveIndex(null)}
            />
          ))}
        </motion.div>

        {/* Preview — desktop only */}
        <PreviewPanel project={activeProject} />
      </div>
    </SectionWrapper>
  )
}
