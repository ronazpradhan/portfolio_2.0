// Shared animation system — single source of truth

export const EASE = [0.22, 1, 0.36, 1] as const

// Base stagger container
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

// Standard item — used for paragraphs, labels, cards
export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

// Word-level reveal — used for large expressive headings (Hero name, section H2s, quote words)
export const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const wordItem = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

// GSAP ScrollTrigger presets (used in Skills)
export const GSAP_REVEAL = {
  start: 'top 78%',
  end: 'bottom 65%',
  scrub: 1.2,
}

export const GSAP_EXIT = {
  start: 'bottom 55%',
  end: 'bottom 5%',
  scrub: 1.6,
}

export const GSAP_FROM = {
  opacity: 0,
  y: 48,
  ease: 'power2.out',
  stagger: 0.18,
}

export const GSAP_EXIT_TO = {
  y: -120,
  opacity: 0,
  ease: 'power1.inOut',
}
