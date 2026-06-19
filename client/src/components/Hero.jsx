import React, { useEffect, useState, useRef } from 'react'
import '../styles/Hero.css'

const ROLES = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'React + Node.js Builder',
  'Open to Opportunities',
]

function useTyping(phrases) {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur = phrases[idx]
    let t
    if (!del) {
      if (text.length < cur.length) t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 80)
      else t = setTimeout(() => setDel(true), 2400)
    } else {
      if (text.length > 0) t = setTimeout(() => setText(s => s.slice(0, -1)), 40)
      else { setDel(false); setIdx(i => (i + 1) % phrases.length) }
    }
    return () => clearTimeout(t)
  }, [text, del, idx, phrases])
  return text
}

export default function Hero() {
  const typed = useTyping(ROLES)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setTimeout(() => {
      el.querySelectorAll('.reveal').forEach((n, i) =>
        setTimeout(() => n.classList.add('visible'), i * 120))
    }, 80)
  }, [])

  return (
    <section className="hero" ref={ref}>
      <div className="hero-photo-bg">
        <img src="/soyal.jpg" alt="" aria-hidden="true" />
      </div>
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />
      <div className="hero-glow-3" />
      <div className="hero-grain" />

      <div className="hero-content">
        <div className="hero-text-box">
          <div className="hero-badge reveal">
            <span className="hero-badge-pulse" />
            Available for Work
          </div>

          <h1 className="hero-name reveal reveal-delay-1">
            <span className="hero-name-line1">Soyal</span>
            <span className="hero-name-line2">Chawhan</span>
          </h1>

          <div className="hero-role reveal reveal-delay-2">
            {typed}<span className="hero-cursor" />
          </div>

          <p className="hero-desc reveal reveal-delay-3">
            B.Tech student building <strong>production-ready full-stack applications</strong> from scratch.
            6+ deployed projects, 3 months internship experience.
          </p>

          <div className="hero-ctas reveal reveal-delay-4">
            <button
              className="btn-grad"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </button>
            <a href="/resume.pdf" download="Soyal_Chawhan_Resume.pdf" className="btn-ghost">
              Download Resume
            </a>
          </div>

          <div className="hero-statbar reveal reveal-delay-5">
            <div className="hero-stat">
              <span className="hero-stat-num">6+</span>
              <span className="hero-stat-lbl">Projects</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">3mo</span>
              <span className="hero-stat-lbl">Internship</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">MERN</span>
              <span className="hero-stat-lbl">Core Stack</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-line" />
        Scroll to explore
      </div>
    </section>
  )
}