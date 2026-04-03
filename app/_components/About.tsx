'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function About() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: {
          id: 'about-me-in',
          trigger: container.current,
          start: 'top 70%',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      }).from('.slide-up-and-fade', {
        y: 150,
        opacity: 0,
        stagger: 0.05,
      })
    },
    { scope: container },
  )

  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: {
          id: 'about-me-out',
          trigger: container.current,
          start: 'bottom 50%',
          end: 'bottom 10%',
          scrub: 0.5,
        },
      }).to('.slide-up-and-fade', {
        y: -150,
        opacity: 0,
        stagger: 0.02,
      })
    },
    { scope: container },
  )

  return (
    <section id="about" className="py-28 px-6 max-w-6xl mx-auto">
      <div ref={container}>

        <h2
          className="font-light mb-20 slide-up-and-fade leading-tight text-white"
          style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)' }}
        >
          I build things that are simple, useful,
          and actually meant to be used.
        </h2>

        <p
          className="pb-3 border-b slide-up-and-fade text-xs tracking-[0.2em] uppercase font-medium"
          style={{ color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }}
        >
          This is me.
        </p>

        <div className="grid md:grid-cols-12 mt-9 gap-8 md:gap-0">
          <div className="md:col-span-5">
            <p
              className="anton text-white slide-up-and-fade"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Hi, I&apos;m Ronaj.
            </p>
          </div>

          <div className="md:col-span-7">
            <div
              className="max-w-[450px] space-y-3"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', color: 'hsl(var(--muted-foreground))' }}
            >
              <p className="slide-up-and-fade leading-relaxed">
                I&apos;m currently a BSc CSIT student passionate about web
                development and emerging technologies. I enjoy building
                user-friendly interfaces and exploring how AI can enhance
                real-world applications.
              </p>
              <p className="slide-up-and-fade leading-relaxed">
                I focus on writing clean, maintainable code and continuously
                improving my skills through projects and learning. Always
                curious, always building.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
