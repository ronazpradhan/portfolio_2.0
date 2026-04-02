'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LETTERS = ['R', 'O', 'N', 'A', 'Z']

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ''
        },
      })

      // Letters start below clip, rise into place one by one
      tl.set(lettersRef.current, { y: 80, opacity: 0 })

      tl.to(lettersRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      })

      // Hold briefly
      tl.to({}, { duration: 0.55 })

      // Exit — letters drift up and fade out staggered
      tl.to(lettersRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.in',
      })

      // Fade out whole container
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none'
          }
        },
      }, '-=0.15')

    }, containerRef)

    // Skip on interaction
    const skip = () => {
      ctx.kill()
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = 'none'
          document.body.style.overflow = ''
        },
      })
    }

    window.addEventListener('click',   skip, { once: true })
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('wheel',   skip, { once: true, passive: true })

    return () => {
      ctx.kill()
      window.removeEventListener('click',   skip)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel',   skip)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
    >
      <div className="flex items-end gap-[0.05em]">
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            ref={el => { lettersRef.current[i] = el }}
            className="anton text-white leading-none select-none"
            style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
}
