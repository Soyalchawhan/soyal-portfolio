import React from 'react'
import '../styles/About.css'
import { useReveal } from './useReveal'

const INFO = [
  { icon: '🎓', label: 'Education',       value: 'B.Tech (Pursuing) — Computer Science' },
  { icon: '💼', label: 'Experience',       value: '3 Months Full Stack Internship' },
  { icon: '🚀', label: 'Projects Shipped', value: '6+ Industry-Level Applications' },
  { icon: '📍', label: 'Location',         value: 'India · Open to Remote' },
  { icon: '⚡', label: 'Specialty',        value: 'MERN · Real-Time · Auth Systems' },
  { icon: '📧', label: 'Email',            value: 'Soyalchawhan@gmail.com' },
]

export default function About() {
  const ref = useReveal()
  return (
    <section className="about-section section" id="about" ref={ref}>
      <div className="container">
        <span className="section-label reveal">
          <span className="section-label-dot" style={{ background: 'var(--rose)' }} />
          <span style={{ color: 'var(--rose-lt)' }}>About Me</span>
        </span>
        <h2 className="section-heading reveal reveal-delay-1" style={{ color: 'var(--text)' }}>
          Builder,{' '}
          <span style={{
            background: 'var(--grad-3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: 'italic'
          }}>
            Problem solver.
          </span>
        </h2>
        <div className="about-grid">
          <div className="about-text">
            <p className="reveal reveal-delay-2">
              I'm <strong>Soyal Chawhan</strong>, a B.Tech student who started coding because I wanted to build
              things people actually use. That led to six full-stack applications, a{' '}
              <span className="hl-violet">real internship</span>, and a genuine obsession with shipping clean,
              working software.
            </p>
            <p className="reveal reveal-delay-3">
              My core stack is <strong>MERN</strong> but I reach for whatever the project demands — Next.js for SSR,
              <span className="hl-cyan"> Supabase</span> for managed backends,{' '}
              <span className="hl-emerald">Socket.io</span> for real-time, and OpenAI API when there's a
              chance to add intelligence.
            </p>
            <blockquote className="about-quote reveal reveal-delay-4">
              "I love solving problems at the intersection of user experience and backend logic."
            </blockquote>
            <p className="reveal reveal-delay-5">
              When I'm not building, I'm exploring new web tech or thinking about how software can{' '}
              <span className="hl-emerald">remove real friction</span> from people's lives.
            </p>
          </div>
          <div className="about-blocks reveal reveal-delay-2">
            {INFO.map(b => (
              <div className="about-block" key={b.label}>
                <div className="about-block-icon">{b.icon}</div>
                <div>
                  <div className="about-block-label">{b.label}</div>
                  <div className="about-block-value">{b.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
