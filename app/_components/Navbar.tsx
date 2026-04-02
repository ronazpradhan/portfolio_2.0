'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BurgerMenu from './BurgerMenu'
import MenuOverlay from './MenuOverlay'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled && !isOpen
            ? 'bg-[#0a0a0a]/85 backdrop-blur-md border-b border-[#222222]'
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="anton text-xl tracking-widest text-[hsl(215,25%,70%)] z-[60] relative"
            onClick={() => setIsOpen(false)}
          >
            RP
          </a>
          <BurgerMenu isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
        </div>
      </motion.header>

      <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
