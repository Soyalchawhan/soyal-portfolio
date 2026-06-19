import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
