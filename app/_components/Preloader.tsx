'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const hasSkippedRef = useRef(false)

  useGSAP(
    () => {
      if (!preloaderRef.current) return

      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'

      const skipAnimation = () => {
        if (hasSkippedRef.current) return
        hasSkippedRef.current = true

        gsap.killTweensOf('.name-text')
        gsap.killTweensOf('.name-text span')
        gsap.killTweensOf(preloaderRef.current)

        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            gsap.set(preloaderRef.current, { display: 'none' })
            document.body.style.overflow = ''
          },
        })
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          gsap.set(preloaderRef.current, { display: 'none' })
          document.body.style.overflow = ''
        },
      })

      // Letters rise up from below clip (translate-y-full → 0)
      tl.to('.name-text span', {
        y: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power3.out',
      })
      // Hold
      .to({}, { duration: 0.35 })
      // Name fades + lifts
      .to('.name-text', {
        opacity: 0,
        y: -20,
        duration: 0.25,
      })
      // Preloader slides up out of view
      .to(preloaderRef.current, {
        y: '-100%',
        duration: 0.65,
        ease: 'power2.inOut',
      }, '-=0.05')

      window.addEventListener('keydown',    skipAnimation, { once: true })
      window.addEventListener('click',      skipAnimation, { once: true })
      window.addEventListener('wheel',      skipAnimation, { once: true, passive: true } as EventListenerOptions)
      window.addEventListener('touchstart', skipAnimation, { once: true, passive: true } as EventListenerOptions)

      return () => {
        tl.kill()
        window.removeEventListener('keydown',    skipAnimation)
        window.removeEventListener('click',      skipAnimation)
        window.removeEventListener('wheel',      skipAnimation)
        window.removeEventListener('touchstart', skipAnimation)
        document.body.style.overflow = ''
      }
    },
    { scope: preloaderRef },
  )

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      <p className="name-text flex overflow-hidden leading-none font-anton"
        style={{ fontSize: 'clamp(18vw, 20vw, 200px)' }}
      >
        {['R','O','N','A','Z'].map((l) => (
          <span
            key={l}
            className="inline-block text-white"
            style={{ transform: 'translateY(100%)' }}
          >
            {l}
          </span>
        ))}
      </p>

      <p className="absolute bottom-6 text-xs uppercase tracking-[0.3em] text-white/30">
        click, scroll, or press any key to skip
      </p>
    </div>
  )
}
