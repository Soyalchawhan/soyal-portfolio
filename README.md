# Soyal Chawhan — Portfolio (Full Stack MERN + Vite)

A professional developer portfolio built with React (Vite) + Express + MongoDB.

## Tech Stack
- **Frontend:** React 18 + Vite, React Router, Axios, external CSS files (no inline styles)
- **Backend:** Node.js, Express.js, MongoDB + Mongoose
- **Features:** Contact form (saved to DB), Projects API, rate limiting, scroll-reveal animations

## Project Structure
```
portfolio2/
├── client/                     # React frontend (Vite)
│   ├── index.html
│   ├── vite.config.js          # Proxies /api to localhost:5000
│   ├── public/
│   │   └── soyal.jpg           # Your profile photo
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx        # Photo blended into background
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx    # Fetches /api/projects
│       │   ├── About.jsx
│       │   ├── Contact.jsx     # Posts to /api/contact
│       │   ├── Footer.jsx
│       │   └── useReveal.js
│       ├── styles/              # External CSS — one file per component
│       │   ├── global.css
│       │   ├── Navbar.css
│       │   ├── Hero.css
│       │   ├── Skills.css
│       │   ├── Projects.css
│       │   ├── About.css
│       │   ├── Contact.css
│       │   └── Footer.css
│       ├── App.jsx
│       └── main.jsx
└── server/                      # Express backend
    ├── models/Contact.js
    ├── routes/
    │   ├── contact.js           # POST /api/contact
    │   └── projects.js          # GET /api/projects
    ├── index.js
    ├── .env.example
    └── package.json
```

## Setup & Run

### 1. Install dependencies
```bash
cd client && npm install
cd ../server && npm install
```

### 2. Configure environment
```bash
cd server
copy .env.example .env      # Windows
# cp .env.example .env       # Mac/Linux
# Edit .env — add your MONGO_URI (optional, app works without it)
```

### 3. Run in development (two terminals)
```bash
# Terminal 1 — backend (port 5000)
cd server
npm run dev

# Terminal 2 — frontend (port 3000)
cd client
npm run dev
```

Open **http://localhost:3000** — Vite proxies `/api/*` calls to your Express server automatically.

### 4. Build for production
```bash
cd client
npm run build       # outputs to client/dist/
```
Serve `client/dist/` as static files from Express, or deploy separately
(e.g. client → Vercel, server → Render/Railway).

## Why Vite instead of `react-scripts`?
Create React App (`react-scripts`) is deprecated and frequently fails with
"not recognized" errors on fresh installs. Vite is faster, actively maintained,
and the `npm run dev` / `npm run build` commands work the same way.

## Customise Before Going Live
1. Add your **LinkedIn**, **GitHub**, and **Instagram** URLs in `Contact.jsx`
   (replace the `href: null` entries)
2. Drop your **resume PDF** into `client/public/` and link it from `Hero.jsx`
3. Set `MONGO_URI` in `server/.env` to store contact form messages
4. Project screenshots load live from your deployed URLs via thum.io —
   if a site fails to render, it falls back to a styled placeholder card

## Design Tokens (`global.css`)
| Token | Value | Usage |
|---|---|---|
| `--forest` | `#0D1F1A` | Page background |
| `--ivory` | `#F5F0E8` | Primary text |
| `--gold` | `#C9A84C` | Accent — labels, links, highlights |
| `--font-display` | Cormorant Garamond | Headings, name |
| `--font-body` | DM Sans | Body & UI text |
| `--font-mono` | DM Mono | Labels, tags, eyebrows |
