'use client'

import Preloader from './_components/Preloader'
import BurgerNav from './_components/BurgerNav'
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
      <BurgerNav />
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
