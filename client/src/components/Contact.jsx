import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Contact.css'
import { useReveal } from './useReveal'

const LINKS = [
  { icon: '✉️', label: 'Email',     value: 'Soyalchawhan@gmail.com', href: 'mailto:Soyalchawhan@gmail.com', active: true },
  { icon: '💼', label: 'LinkedIn',  value: 'Linkedin Account',href: 'https://www.linkedin.com/in/soyal-chawhan-34a4b6331', active: true },
  { icon: '🐙', label: 'GitHub',    value: 'GitHub Account',href: 'https://github.com/Soyalchawhan', active: true },
  { icon: '📷', label: 'Instagram', value: 'Instagram Account', href: 'https://www.instagram.com/_.soyal_', active: true },
]

export default function Contact() {
  const ref = useReveal()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault(); setLoading(true); setStatus(null)
    try {
      const res = await axios.post('/api/contact', form)
      setStatus({ type: 'success', text: res.data.message })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus({ type: 'error', text: err.response?.data?.error || 'Something went wrong.' })
    } finally { setLoading(false) }
  }

  return (
    <section className="contact-section section" id="contact" ref={ref}>
      <div className="container">
        <span className="section-label reveal">
          <span className="section-label-dot" style={{ background: 'var(--amber)' }} />
          <span style={{ color: 'var(--amber-lt)' }}>Contact</span>
        </span>
        <h2 className="section-heading reveal reveal-delay-1" style={{ color: 'var(--text)' }}>
          Let's build{' '}
          <span style={{
            background: 'var(--grad-4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: 'italic'
          }}>
            something
          </span>
        </h2>
        <div className="contact-grid">
          <form className="contact-form reveal reveal-delay-2" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input className="form-input" id="name" name="name" type="text"
                  placeholder="Your name" value={form.name} onChange={onChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-input" id="email" name="email" type="email"
                  placeholder="your@email.com" value={form.email} onChange={onChange} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="subject">Subject</label>
              <input className="form-input" id="subject" name="subject" type="text"
                placeholder="What's this about?" value={form.subject} onChange={onChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea className="form-textarea" id="message" name="message"
                placeholder="Tell me about your project or opportunity..."
                value={form.message} onChange={onChange} required />
            </div>
            {status && <div className={'form-status ' + status.type}>{status.text}</div>}
            <button type="submit" className="btn-grad form-submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="contact-info reveal reveal-delay-3">
            <p className="contact-intro">
              Available for full-time roles, freelance projects, and interesting collaborations. I respond within 24 hours.
            </p>
            {LINKS.map(c => c.active ? (
              <a key={c.label} href={c.href} className="contact-card contact-card-link">
                <div className="contact-card-icon">{c.icon}</div>
                <div className="contact-card-body">
                  <span className="contact-card-label">{c.label}</span>
                  <span className="contact-card-value">{c.value}</span>
                </div>
                <span className="contact-card-arrow">→</span>
              </a>
            ) : (
              <div key={c.label} className="contact-card contact-card-muted">
                <div className="contact-card-icon">{c.icon}</div>
                <div className="contact-card-body">
                  <span className="contact-card-label">{c.label}</span>
                  <span className="contact-card-value">{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
