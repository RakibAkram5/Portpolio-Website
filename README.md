# Rakib Akram — Portfolio

A premium, full-stack personal portfolio for **Rakib Akram**, Full-Stack / Flutter / Backend Developer.

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Lenis
- **Backend:** Node.js + Express 5 + TypeScript + Prisma + PostgreSQL
- **Monorepo layout:** `client/` (frontend) and `server/` (backend) as independent npm projects

---

## Project Structure

```
Portfolio/
├── client/                 # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/         # Button, Card, Modal, SectionHeading, FormField, Icon...
│   │   │   ├── layout/     # Navbar, Footer, BackgroundFX
│   │   │   └── icons/      # Custom brand SVG icons (GitHub, LinkedIn)
│   │   ├── sections/       # One folder per page section (hero, about, skills, projects...)
│   │   ├── hooks/          # useLenis, useActiveSection, useScrolled, useGithubProfile
│   │   ├── services/       # API client (fetch wrapper)
│   │   ├── data/           # Static content: skills, projects, experience, services
│   │   ├── config/         # Site config (name, links, nav) — edit here to rebrand
│   │   ├── types/          # Shared TypeScript types
│   │   └── utils/          # Small helpers (cn, etc.)
│   └── .env.example
└── server/                 # Express + TypeScript + Prisma backend
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── routes/         # Express routers
    │   ├── services/       # Business logic / Prisma queries
    │   ├── middleware/     # Error handler, rate limiter
    │   ├── validators/     # Zod schemas
    │   └── utils/          # env, prisma client, asyncHandler, ApiError, sanitize
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.ts
    └── .env.example
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (local install, Docker, or a hosted provider like Neon/Supabase/Railway)

### 1. Clone & install

```bash
git clone https://github.com/RakibAkram5/Portpolio-Website.git
cd Portpolio-Website

cd client && npm install
cd ../server && npm install
```

### 2. Configure environment variables

**server/.env** (copy from `server/.env.example`):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio?schema=public"
PORT=4000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

**client/.env** (copy from `client/.env.example`):

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### 3. Set up the database

```bash
cd server
npx prisma migrate dev --name init   # creates tables from prisma/schema.prisma
npm run prisma:seed                  # seeds the 3 featured projects
```

### 4. Run the app in development

In two terminals:

```bash
# Terminal 1 — backend
cd server
npm run dev        # http://localhost:4000

# Terminal 2 — frontend
cd client
npm run dev         # http://localhost:5173
```

---

## Available Scripts

### client/

| Script            | Description                        |
| ----------------- | ----------------------------------- |
| `npm run dev`      | Start Vite dev server               |
| `npm run build`    | Type-check and build for production |
| `npm run preview`  | Preview the production build        |

### server/

| Script                    | Description                              |
| -------------------------- | ----------------------------------------- |
| `npm run dev`               | Start the API with hot reload (tsx watch) |
| `npm run build`             | Compile TypeScript to `dist/`             |
| `npm start`                 | Run the compiled server                   |
| `npm run typecheck`         | Type-check without emitting                |
| `npm run prisma:generate`   | Regenerate the Prisma client               |
| `npm run prisma:migrate`    | Create/apply a dev migration               |
| `npm run prisma:deploy`     | Apply migrations in production             |
| `npm run prisma:studio`     | Open Prisma Studio (DB GUI)                |
| `npm run prisma:seed`       | Seed the database with featured projects   |

---

## API Documentation

Base URL: `{CLIENT-configured VITE_API_BASE_URL}` (default `http://localhost:4000/api`)

All responses follow the shape:

```json
{ "success": true, "data": "...", "message": "..." }
{ "success": false, "message": "...", "errors": { "field": "reason" } }
```

### `GET /api/health`

Health check. Returns server uptime and timestamp.

### `GET /api/projects`

Returns all projects (seeded from `server/prisma/seed.ts`), featured first.

### `GET /api/projects/:slug`

Returns a single project by slug, or `404` if not found.

### `POST /api/contact`

Submits a contact form message.

**Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Let's work together",
  "message": "Hi Rakib, I'd like to talk about a project..."
}
```

Validated and sanitized server-side (Zod schema + HTML-tag stripping). Rate-limited to 5 requests / 15 minutes per IP. On success, the message is stored in the `contact_messages` table and a `201` is returned with the created message id.

---

## Rebranding / Replacing Placeholder Data

All identity data lives in **`client/src/config/site.ts`** — update `githubUsername`, `githubUrl`, `linkedinUrl`, `email`, `resumeUrl`, etc. there.

Project data lives in **`client/src/data/projects.ts`** (frontend display) and **`server/prisma/seed.ts`** (database). Update `githubUrl`, `liveUrl`, and image paths (`public/projects/...`) once real screenshots and repos are available — drop images into `client/public/projects/<slug>/`.

The GitHub activity section (`client/src/sections/github`) fetches live public data from the GitHub REST API using `githubUsername` from `site.ts` — no API key required, but it is rate-limited (60 requests/hour per IP) since it's unauthenticated.

---

## Production Build

```bash
# Frontend
cd client
npm run build        # outputs to client/dist

# Backend
cd server
npm run build         # outputs to server/dist
npm start
```

---

## Deployment

- **Frontend (`client/`)**: deploy the static `dist/` output to Vercel, Netlify, or any static host. Set `VITE_API_BASE_URL` to your deployed API URL at build time.
- **Backend (`server/`)**: deploy to any Node host (Render, Railway, Fly.io, a VPS, etc.). Set `DATABASE_URL`, `PORT`, `NODE_ENV=production`, and `CLIENT_ORIGIN` (your deployed frontend URL) as environment variables, then run:
  ```bash
  npm run build
  npm run prisma:deploy   # applies migrations against the production DB
  npm start
  ```
- **Database**: any managed PostgreSQL provider (Neon, Supabase, Railway, RDS) works — just point `DATABASE_URL` at it.

Never commit `.env` files — both `client/.env` and `server/.env` are gitignored. Use `.env.example` as the reference for required variables.
