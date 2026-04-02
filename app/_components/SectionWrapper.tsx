'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animation'

interface SectionWrapperProps {
  id: string
  label: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ id, label, children, className = '' }: SectionWrapperProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} className={`py-28 px-6 max-w-6xl mx-auto ${className}`}>
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.span variants={staggerItem} className="section-label block mb-4">
          {label}
        </motion.span>
        {children}
      </motion.div>
    </section>
  )
}
