'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Project } from '@/lib/projects'
import { staggerContainer, staggerItem, wordContainer, wordItem } from '@/lib/animation'

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-24 max-w-5xl mx-auto">

      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[#555] hover:text-[hsl(215,25%,70%)] transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        className="mb-16"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          variants={staggerItem}
          className="section-label block mb-6"
        >
          {project.year}
        </motion.span>

        <motion.h1
          className="anton leading-none text-white mb-8"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          variants={wordContainer}
        >
          {project.title.split(' ').map((word, i, arr) => (
            <motion.span
              key={i}
              variants={wordItem}
              className="inline-block mr-[0.2em]"
              style={{ color: i === arr.length - 1 ? 'hsl(215,25%,70%)' : 'white' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tech stack */}
        <motion.div variants={staggerItem} className="flex flex-wrap gap-2 mb-8">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-xs px-3 py-1.5 rounded-sm border border-[#222] text-[#666] bg-[#111]"
            >
              {t}
            </span>
          ))}
        </motion.div>

        {/* Live link */}
        {project.live && (
          <motion.div variants={staggerItem}>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-colors duration-200"
              style={{
                background: 'hsl(215,25%,70%)',
                color: 'hsl(0,0%,10%)',
              }}
            >
              View Live <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </motion.div>

      {/* Preview image */}
      <motion.div
        className="w-full aspect-video relative rounded-sm overflow-hidden border border-[#1a1a1a] mb-20 bg-[#0f0f0f]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="grid md:grid-cols-2 gap-16"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Description */}
        <motion.div variants={staggerItem}>
          <p className="section-label mb-4">Overview</p>
          <p className="text-base leading-relaxed text-[#888]">{project.description}</p>
        </motion.div>

        {/* Features */}
        {project.features.length > 0 && (
          <motion.div variants={staggerItem}>
            <p className="section-label mb-4">Features</p>
            <ul className="space-y-3">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#888]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(215,25%,70%)] flex-shrink-0 mt-1.5" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>

    </main>
  )
}
