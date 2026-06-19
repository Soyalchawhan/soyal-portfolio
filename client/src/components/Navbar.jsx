import React, { useState, useEffect } from 'react'
import '../styles/Navbar.css'

const SECTIONS = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40)
      let cur = ''
      SECTIONS.forEach(s => {
        const el = document.getElementById(s.toLowerCase())
        if (el && window.scrollY >= el.offsetTop - 120) cur = s.toLowerCase()
      })
      setActive(cur)
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={'navbar' + (scrolled ? ' scrolled' : '')}>
      <div className="nav-logo">Soyal.</div>

      <div className={'nav-links' + (open ? ' open' : '')}>
        {SECTIONS.map(s => (
          <button
            key={s}
            className={'nav-link' + (active === s.toLowerCase() ? ' active' : '')}
            onClick={() => go(s.toLowerCase())}
          >
            {s}
          </button>
        ))}
      </div>

      <button className="nav-cta" onClick={() => go('contact')}>Hire Me</button>

      <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}
