'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { staggerItem, wordContainer, wordItem } from '@/lib/animation'
import { GSAP_REVEAL, GSAP_EXIT, GSAP_FROM, GSAP_EXIT_TO } from '@/lib/animation'
import SectionWrapper from './SectionWrapper'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STACK: Record<string, { name: string; icon: string }[]> = {
  Frontend: [
    { name: 'JavaScript',   icon: '/skills/javascript.png' },
    { name: 'TypeScript',   icon: '/skills/typescript.png' },
    { name: 'React',        icon: '/skills/react.png' },
    { name: 'Next.js',      icon: '/skills/nextjs.png' },
    { name: 'Tailwind CSS', icon: '/skills/tailwind.png' },
  ],
  Animation: [
    { name: 'GSAP',          icon: '/skills/gsap.png' },
    { name: 'Framer Motion', icon: '/skills/framer-motion.png' },
  ],
  Tools: [
    { name: 'Node.js', icon: '/skills/nodejs.png' },
    { name: 'Git',     icon: '/skills/git.png' },
    { name: 'GitHub',  icon: '/skills/github.png' },
  ],
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  useGSAP(
    () => {
      const els = containerRef.current?.querySelectorAll('.slide-up')
      if (!els?.length) return
      gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, ...GSAP_REVEAL },
      }).from(els, GSAP_FROM)
    },
    { scope: containerRef },
  )

  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, ...GSAP_EXIT },
      }).to(containerRef.current, GSAP_EXIT_TO)
    },
    { scope: containerRef },
  )

  return (
    <SectionWrapper id="skills" label="Tech Stack">
      {/* Section heading — uses shared Framer Motion variant */}
      <motion.h2
        ref={headerRef}
        className="anton leading-none mb-16"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        variants={wordContainer}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
      >
        {['TOOLS I', 'WORK WITH'].map((word, i) => (
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

      {/* GSAP-controlled body */}
      <div ref={containerRef} className="space-y-20">
        {Object.entries(STACK).map(([category, items]) => (
          <div key={category} className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-0">
            <div className="sm:col-span-4 flex items-start">
              <p className="slide-up anton text-[clamp(3rem,5.5vw,5rem)] leading-none uppercase text-white tracking-tight transition-colors duration-300 cursor-default hover:text-[hsl(215,25%,70%)]">
                {category}
              </p>
            </div>
            <div className="sm:col-span-8 flex flex-wrap gap-x-12 gap-y-10 items-center">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="slide-up flex items-center gap-5 leading-none group cursor-default"
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300 max-h-12 w-auto"
                  />
                  <span className="text-2xl font-medium text-[#888] group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
