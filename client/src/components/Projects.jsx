import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import '../styles/Projects.css'
import { useReveal } from './useReveal'

const PROJECTS = [
  {
    id: 1, name: 'DocSign', tagline: 'Digital Document Signing Platform',
    description: 'Secure full-stack web app — upload documents, place digital signatures, share signing links, and generate legally traceable signed PDFs.',
    liveUrl: 'https://docsign-frontend-seven.vercel.app',
    emoji: '✍️', bgColor: 'rgba(124,58,237,0.15)',
    stack: ['React Vite', 'TypeScript', 'TailwindCSS', 'Node.js', 'MongoDB', 'DND Kit', 'Zod']
  },
  {
    id: 2, name: 'Travel Together', tagline: 'Find Your Perfect Travel Partner',
    description: 'Find travel partners by preferences, plan trips collaboratively, match compatible travelers, and manage shared expenses with real-time chat.',
    liveUrl: 'https://travel-together-lovat.vercel.app',
    emoji: '✈️', bgColor: 'rgba(6,182,212,0.15)',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Socket.io']
  },
  {
    id: 3, name: 'BugTrack', tagline: 'Team Bug and Issue Tracker',
    description: 'Full-stack bug tracker — teams report bugs, track features, assign work, and visualize everything on a live Kanban board with real-time updates.',
    liveUrl: 'https://bugtrack.vercel.app',
    emoji: '🐛', bgColor: 'rgba(244,63,94,0.15)',
    stack: ['React.js', 'Tailwind', 'Node.js', 'MongoDB', 'JWT', 'Socket.io', 'Multer']
  },
  {
    id: 4, name: 'NimbusCloud', tagline: 'Cloud File Storage and Sharing',
    description: 'Google Drive-style cloud storage with auth, folders, file upload/download, search, and granular access controls built for reliability at scale.',
    liveUrl: 'https://nimbuscloud-frontend.vercel.app',
    emoji: '☁️', bgColor: 'rgba(245,158,11,0.15)',
    stack: ['Next.js', 'React', 'Tailwind', 'Node.js', 'PostgreSQL', 'Supabase']
  },
  {
    id: 5, name: 'Threadly', tagline: 'Community Discussion Platform',
    description: 'Reddit-inspired platform for creating communities, posting content, engaging through voting, and participating in threaded discussions.',
    liveUrl: 'https://threadly-frontend-zeta.vercel.app',
    emoji: '🗣️', bgColor: 'rgba(16,185,129,0.15)',
    stack: ['HTML5', 'CSS3', 'Vanilla JS', 'Firebase', 'Node.js', 'JWT']
  },
  {
    id: 6, name: 'Nexus-AI', tagline: 'AI-Powered Real-Time Chatbot',
    description: 'Real-time AI chatbot powered by OpenAI GPT API with streaming responses, persistent chat history, and full-stack session management.',
    liveUrl: 'https://nexus-ai-phi-hazel.vercel.app',
    emoji: '🤖', bgColor: 'rgba(244,63,94,0.15)',
    stack: ['Next.js', 'Tailwind', 'Node.js', 'MongoDB', 'Socket.io', 'OpenAI API']
  }
]

function ProjectThumb({ project }) {
  const [idx, setIdx] = useState(0)
  const [failed, setFailed] = useState(false)

  const services = [
    `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(project.liveUrl)}?w=1200&h=630`,
    `https://image.thum.io/get/width/1200/crop/630/${project.liveUrl}`,
    `https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`,
  ]

  const onError = useCallback(() => {
    if (idx < services.length - 1) setIdx(i => i + 1)
    else setFailed(true)
  }, [idx, services.length])

  if (failed) {
    return (
      <div className="project-placeholder" style={{ background: project.bgColor }}>
        <div className="project-placeholder-emoji">{project.emoji}</div>
        <div className="project-placeholder-title">{project.name}</div>
        <div className="project-placeholder-bars">
          <div className="project-placeholder-bar bar-full" />
          <div className="project-placeholder-bar bar-3q" />
          <div className="project-placeholder-bar bar-half" />
        </div>
      </div>
    )
  }

  return (
    <img
      key={idx}
      src={services[idx]}
      alt={project.name + ' preview'}
      className="project-thumb-img"
      onError={onError}
      loading="lazy"
    />
  )
}

export default function Projects() {
  const [projects, setProjects] = useState(PROJECTS)
  const ref = useReveal()

  useEffect(() => {
    axios.get('/api/projects')
      .then(res => { if (res.data?.length) setProjects(res.data) })
      .catch(() => {})
  }, [])

  return (
    <section className="projects-section section" id="projects" ref={ref}>
      <div className="container">
        <span className="section-label reveal">
          <span className="section-label-dot" style={{ background: 'var(--violet)' }} />
          <span style={{ color: 'var(--violet-lt)' }}>Work</span>
        </span>
        <h2 className="section-heading reveal reveal-delay-1" style={{ color: 'var(--text)' }}>
          Projects I've{' '}
          <span style={{
            background: 'var(--grad-1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: 'italic'
          }}>
            shipped
          </span>
        </h2>
        <p className="section-sub reveal reveal-delay-2">
          Each one built end-to-end — real problems, real deployments, real code.
        </p>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className={'project-card reveal reveal-delay-' + ((i % 3) + 1)}
            >
              <div className="project-strip" />
              <div className="project-thumb">
                <div className="project-index">0{i + 1}</div>
                <ProjectThumb project={project} />
                <div className="project-thumb-overlay" />
              </div>
              <div className="project-body">
                <div className="project-header">
                  <h3 className="project-name">{project.name}</h3>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-live-btn"
                  >
                    Live
                  </a>
                </div>
                <p className="project-tagline">{project.tagline}</p>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.stack.map(t => (
                    <span className="project-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
