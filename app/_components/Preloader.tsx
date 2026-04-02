'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem('preloader_seen')
    if (!seen) {
      setShow(true)
      const t = setTimeout(() => {
        setShow(false)
        sessionStorage.setItem('preloader_seen', '1')
      }, 1400)
      return () => clearTimeout(t)
    }
  }, [])

  const letters = ['R', 'P']

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Initials stagger */}
          <div className="flex gap-1 overflow-hidden">
            {letters.map((l, i) => (
              <motion.span
                key={l}
                className="anton text-5xl text-[hsl(215,25%,70%)] leading-none"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {l}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-3 text-xs tracking-[0.25em] uppercase text-[#444444]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            Web Developer
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 h-px bg-[#222222] w-24 overflow-hidden rounded-full"
          >
            <motion.div
              className="h-full bg-[hsl(215,25%,70%)] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.1, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
