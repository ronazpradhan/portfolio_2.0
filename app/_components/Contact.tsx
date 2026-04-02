'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, MapPin } from 'lucide-react'
import { staggerContainer, staggerItem, wordContainer, wordItem } from '@/lib/animation'
import SectionWrapper from './SectionWrapper'

const links = [
  { icon: Mail,     label: 'Email',    value: 'your@email.com',             href: 'mailto:your@email.com' },
  { icon: Github,   label: 'GitHub',   value: 'github.com/yourusername',    href: 'YOUR_GITHUB_URL' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/yourusername', href: 'YOUR_LINKEDIN_URL' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="contact" label="Contact">
      <motion.div
        ref={ref}
        className="grid md:grid-cols-2 gap-16 items-start"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={staggerItem}>
          <h2
            className="anton leading-none text-white mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            LET&apos;S
            <br />
            <span className="text-[hsl(215,25%,70%)]">CONNECT.</span>
          </h2>
          <p className="text-sm leading-relaxed text-[#888888]">
            I&apos;m open to opportunities, collaborations, and conversations.
            Feel free to reach out — I&apos;ll get back to you.
          </p>
          <div className="flex items-center gap-2 mt-6">
            <MapPin size={14} className="text-[hsl(215,25%,70%)]" />
            <span className="text-sm text-[#888888]">Nepal</span>
          </div>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-4">
          {links.map(({ icon: Icon, label, value, href }) => (
            <motion.a
              key={label}
              variants={staggerItem}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="contact-link"
            >
              <div className="p-2 rounded-sm bg-[hsla(215,25%,70%,0.08)]">
                <Icon size={16} className="text-[hsl(215,25%,70%)]" />
              </div>
              <div>
                <p className="text-xs text-[#444444]">{label}</p>
                <p className="text-sm font-medium text-[#888888]">{value}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
