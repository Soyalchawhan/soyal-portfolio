const express = require('express');
const router = express.Router();

const projects = [
  {
    id: 1,
    name: 'DocSign',
    tagline: 'Digital Document Signing Platform',
    description: 'A secure full-stack web application enabling users to upload documents, place digital signatures, share signing links, and generate legally traceable signed PDFs.',
    liveUrl: 'https://docsign-frontend-seven.vercel.app',
    emoji: '✍️',
    color: '#7C6B3F',
    stack: ['React Vite', 'TypeScript', 'TailwindCSS', 'Node.js', 'Express', 'MongoDB', 'DND Kit', 'Zod']
  },
  {
    id: 2,
    name: 'Travel Together',
    tagline: 'Find Your Perfect Travel Partner',
    description: 'Enables users to find travel partners by preferences, collaboratively plan trips, match with compatible travelers, and manage shared expenses with real-time chat.',
    liveUrl: 'https://travel-together-lovat.vercel.app',
    emoji: '✈️',
    color: '#3D6B5E',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Socket.io']
  },
  {
    id: 3,
    name: 'BugTrack',
    tagline: 'Team Bug & Issue Tracker',
    description: 'Full-stack bug tracker where teams report bugs, track features, assign work to members, and visualize everything on a Kanban board with real-time updates.',
    liveUrl: 'https://bugtrack.vercel.app',
    emoji: '🐛',
    color: '#6B3D3D',
    stack: ['React.js', 'Tailwind', 'React Router', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io', 'Multer']
  },
  {
    id: 4,
    name: 'NimbusCloud',
    tagline: 'Cloud File Storage & Sharing',
    description: 'Google Drive–style cloud storage with auth, folders, file upload/download, search, and granular sharing. Strong access controls and scalable storage.',
    liveUrl: 'https://nimbuscloud-frontend.vercel.app',
    emoji: '☁️',
    color: '#3D4F6B',
    stack: ['Next.js', 'React', 'Tailwind', 'TanStack Query', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'React DnD']
  },
  {
    id: 5,
    name: 'Threadly',
    tagline: 'Community Discussion Platform',
    description: 'Reddit-inspired web app for creating communities, posting content, engaging through voting, and participating in threaded discussions.',
    liveUrl: 'https://threadly-frontend-zeta.vercel.app',
    emoji: '🗣️',
    color: '#5E4B3D',
    stack: ['HTML5', 'CSS3', 'Vanilla JS', 'Firebase SDK', 'Node.js', 'Express.js', 'JWT', 'Nodemailer', 'bcryptjs']
  },
  {
    id: 6,
    name: 'Nexus-AI',
    tagline: 'AI-Powered Real-Time Chatbot',
    description: 'Fully functional AI chatbot powered by OpenAI GPT API with real-time streaming responses, persistent chat history, and full-stack session management.',
    liveUrl: 'https://nexus-ai-phi-hazel.vercel.app',
    emoji: '🤖',
    color: '#4B3D6B',
    stack: ['Next.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'OpenAI API']
  }
];

// GET /api/projects
router.get('/', (req, res) => {
  res.json(projects);
});

// GET /api/projects/:id
router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

module.exports = router;
