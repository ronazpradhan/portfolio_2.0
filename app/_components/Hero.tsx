'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animation'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto"
    >
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full pointer-events-none bg-[hsl(215,25%,70%,0.05)] blur-[80px]" />

      <motion.div
        className="relative z-10 pt-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={staggerItem} className="section-label block mb-8">
          Web Developer &amp; AI Enthusiast
        </motion.span>

        {/* Name — word-by-word stagger like Skills labels */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="anton leading-none text-white"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {['RONAJ', 'PRADHAN'].map((word, i) => (
              <motion.span
                key={word}
                variants={staggerItem}
                className="block"
                style={{ color: i === 1 ? 'hsl(215,25%,70%)' : 'white' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        <motion.p
          variants={staggerItem}
          className="max-w-lg text-base leading-relaxed text-[#888888]"
        >
          Building modern, fast, and visually clean applications.
          I enjoy turning ideas into real-world digital products.
        </motion.p>

        <motion.div variants={staggerItem} className="mt-10 flex items-center gap-4 flex-wrap">
          <a href="#projects" className="btn-primary group">
            View Projects
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="YOUR_GITHUB_URL"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Github size={15} />
            GitHub
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-6 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.4, duration: 0.6 } }}
      >
        <span className="section-label text-[#444444]">scroll</span>
        <motion.div
          className="w-px h-10 bg-[#444444]"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
