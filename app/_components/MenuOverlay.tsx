'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Github, label: 'GitHub', href: 'YOUR_GITHUB_URL' },
  { icon: Linkedin, label: 'LinkedIn', href: 'YOUR_LINKEDIN_URL' },
]

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-40 flex flex-col px-8 pt-28 pb-12"
          style={{ background: '#0a0a0a' }}
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Divider */}
          <div className="w-full h-px bg-[#222222] mb-12" />

          {/* Nav Links */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2 flex-1"
          >
            {navLinks.map(({ label, href }) => (
              <motion.a
                key={href}
                href={href}
                variants={itemVariants}
                onClick={onClose}
                className="anton text-[clamp(2.8rem,8vw,6rem)] leading-tight text-white/20 hover:text-white transition-colors duration-200 group flex items-center gap-4"
              >
                <span className="block w-2 h-2 rounded-full bg-[hsl(215,25%,70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                <span className="group-hover:text-[hsl(215,25%,70%)] transition-colors duration-200">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.nav>

          {/* Bottom bar */}
          <motion.div
            className="border-t border-[#222222] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4 } }}
          >
            {/* Get in touch */}
            <div>
              <p className="section-label mb-1">Get in touch</p>
              <a
                href="mailto:your@email.com"
                className="text-sm text-[#888888] hover:text-[hsl(215,25%,70%)] transition-colors duration-200 flex items-center gap-2"
              >
                <Mail size={14} />
                your@email.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 text-sm text-[#888888] hover:text-[hsl(215,25%,70%)] transition-colors duration-200"
                >
                  <Icon size={16} />
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
