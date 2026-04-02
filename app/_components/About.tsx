'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionWrapper from './SectionWrapper'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function About() {
  const container = useRef<HTMLDivElement>(null)

  // Scroll in — staggered slide up + fade
  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: {
          id: 'about-in',
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

  // Scroll out — drift up + fade
  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: {
          id: 'about-out',
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
    <SectionWrapper id="about" label="About Me">
      <div ref={container}>

        {/* Large quote — forced 2 lines via manual line breaks */}
        <h2
          className="anton leading-[1.05] text-white mb-20 slide-up-and-fade"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}
        >
          <span className="block">I build things that are simple,</span>
          <span className="block text-[hsl(215,25%,70%)]">
            useful, and actually meant to be used.
          </span>
        </h2>

        {/* Divider label */}
        <p
          className="pb-3 border-b text-xs tracking-[0.2em] uppercase font-medium slide-up-and-fade"
          style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
        >
          This is me.
        </p>

        {/* Split layout */}
        <div className="grid md:grid-cols-12 mt-10 gap-8 md:gap-0">
          {/* Left — name */}
          <div className="md:col-span-5">
            <p
              className="anton text-white slide-up-and-fade"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Hi, I&apos;m Ronaj.
            </p>
          </div>

          {/* Right — bio */}
          <div className="md:col-span-7">
            <div className="max-w-[480px] space-y-4">
              <p
                className="leading-relaxed text-[#888] slide-up-and-fade"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}
              >
                I&apos;m currently a BSc CSIT student passionate about web development
                and emerging technologies. I enjoy building user-friendly interfaces
                and exploring how AI can enhance real-world applications.
              </p>
              <p
                className="leading-relaxed text-[#888] slide-up-and-fade"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}
              >
                I focus on writing clean, maintainable code and continuously
                improving my skills through projects and learning. Always
                curious, always building.
              </p>
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
