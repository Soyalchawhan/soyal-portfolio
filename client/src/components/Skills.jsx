import React from 'react'
import '../styles/Skills.css'
import { useReveal } from './useReveal'

const CATS = [
  {
    label: 'Frontend', color: 'violet',
    skills: [
      { name: 'React', icon: '⚛️' }, { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: '🔷' }, { name: 'HTML5', icon: '🌐' },
      { name: 'CSS3', icon: '🎨' }, { name: 'Tailwind CSS', icon: '💨' },
      { name: 'React Hooks', icon: '🪝' }, { name: 'Zod', icon: '✅' }, { name: 'Axios', icon: '🔗' },
    ]
  },
  {
    label: 'Backend', color: 'cyan',
    skills: [
      { name: 'Node.js', icon: '🟢' }, { name: 'Express.js', icon: '🚂' },
      { name: 'JavaScript', icon: '🟨' }, { name: 'JWT + bcrypt', icon: '🔐' },
      { name: 'Socket.io', icon: '🔌' }, { name: 'REST APIs', icon: '📡' }, { name: 'Multer', icon: '📁' },
    ]
  },
  {
    label: 'Database & Cloud', color: 'emerald',
    skills: [
      { name: 'MongoDB', icon: '🍃' }, { name: 'Mongoose', icon: '🗄️' },
      { name: 'Supabase', icon: '⚡' }, { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Firebase', icon: '🔥' }, { name: 'Vercel', icon: '▲' }, { name: 'OpenAI API', icon: '🤖' },
    ]
  }
]

export default function Skills() {
  const ref = useReveal()
  return (
    <section className="skills-section section" id="skills" ref={ref}>
      <div className="container">
        <span className="section-label reveal">
          <span className="section-label-dot" style={{ background: 'var(--cyan)' }} />
          <span style={{ color: 'var(--cyan-lt)' }}>Tech Stack</span>
        </span>
        <h2 className="section-heading reveal reveal-delay-1" style={{ color: 'var(--text)' }}>
          What I build{' '}
          <span style={{
            background: 'var(--grad-2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: 'italic'
          }}>
            with
          </span>
        </h2>
        <p className="section-sub reveal reveal-delay-2">
          Every tool chosen deliberately — the full stack I use to ship real applications.
        </p>
        <div className="skills-categories">
          {CATS.map((cat, ci) => (
            <div className="skill-category reveal" key={cat.label} style={{ transitionDelay: ci * 0.1 + 's' }}>
              <div className="skill-cat-header">
                <span className={'skill-cat-label ' + cat.color}>{cat.label}</span>
                <div className="skill-cat-line" />
              </div>
              <div className="skill-chips">
                {cat.skills.map(s => (
                  <div className={'skill-chip ' + cat.color} key={s.name}>
                    <span className="skill-chip-icon">{s.icon}</span>
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
