'use client'

import Preloader from './_components/Preloader'
import Navbar from './_components/Navbar'
import Hero from './_components/Hero'
import About from './_components/About'
import Skills from './_components/Skills'
import Projects from './_components/Projects'
import Contact from './_components/Contact'
import Footer from './_components/Footer'

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
