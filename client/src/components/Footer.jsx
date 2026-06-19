import React from 'react'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">Soyal.</div>
          <div className="footer-copy">&copy; {new Date().getFullYear()} Soyal Chawhan. All rights reserved.</div>
          <div className="footer-stack">Built with <span>React</span> &middot; <span>Node.js</span> &middot; <span>MongoDB</span></div>
        </div>
      </div>
    </footer>
  )
}
