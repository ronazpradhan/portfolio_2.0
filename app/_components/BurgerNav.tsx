'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animation'

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

const SOCIALS = [
  { icon: Github,   label: 'GitHub',   href: 'YOUR_GITHUB_URL' },
  { icon: Linkedin, label: 'LinkedIn', href: 'YOUR_LINKEDIN_URL' },
]

// ── Burger icon ──────────────────────────────────────────────────────────────
function BurgerIcon({ open }: { open: boolean }) {
  return (
    // 32×22px target area, lines ~1.5px
    <div className="relative w-8 flex flex-col justify-between" style={{ height: 22 }}>
      {/* Top */}
      <motion.span
        className="block rounded-full origin-center"
        style={{ height: 1.5, background: 'var(--primary-color)' }}
        animate={open
          ? { rotate: 45, y: 10, width: '100%' }
          : { rotate: 0,  y: 0,  width: '100%' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Mid */}
      <motion.span
        className="block rounded-full"
        style={{ height: 1.5, background: 'var(--primary-color)' }}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Bottom */}
      <motion.span
        className="block rounded-full origin-center"
        style={{ height: 1.5, background: 'var(--primary-color)' }}
        animate={open
          ? { rotate: -45, y: -10, width: '100%' }
          : { rotate: 0,   y: 0,   width: '100%' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

// ── Full-screen overlay ───────────────────────────────────────────────────────
function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-40 flex flex-col px-8 pt-28 pb-12"
          style={{ background: '#0a0a0a' }}
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full h-px bg-[#222] mb-12" />

          {/* Nav links */}
          <motion.nav
            className="flex flex-col gap-1 flex-1"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <motion.a
                key={href}
                href={href}
                variants={staggerItem}
                onClick={onClose}
                className="anton group flex items-center gap-4 text-white/20 hover:text-white transition-colors duration-200"
                style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', lineHeight: 1.1 }}
              >
                <span className="w-2 h-2 rounded-full bg-[hsl(215,25%,70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                <span className="group-hover:text-[hsl(215,25%,70%)] transition-colors duration-200">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.nav>

          {/* Bottom bar */}
          <motion.div
            className="border-t border-[#222] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            <div>
              <p className="section-label mb-1.5">Get in touch</p>
              <a
                href="mailto:your@email.com"
                className="flex items-center gap-2 text-sm text-[#888] hover:text-[hsl(215,25%,70%)] transition-colors duration-200"
              >
                <Mail size={13} />
                your@email.com
              </a>
            </div>

            <div className="flex items-center gap-5">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#888] hover:text-[hsl(215,25%,70%)] transition-colors duration-200"
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function BurgerNav() {
  const [open, setOpen] = useState(false)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Fixed burger button — top-right */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="fixed top-6 right-6 z-50 p-2 rounded-sm transition-colors duration-200"
        style={{ background: 'transparent' }}
      >
        <BurgerIcon open={open} />
      </button>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  )
}
