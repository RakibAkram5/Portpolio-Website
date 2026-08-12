# Rakib Akram — Portfolio

A premium, full-stack personal portfolio for **Rakib Akram**, Full-Stack / Flutter / Backend Developer — with a built-in admin panel to edit every piece of content without touching code.

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Lenis + React Router
- **Backend:** Node.js + Express 5 + TypeScript + Prisma + PostgreSQL
- **Admin panel:** password-protected CMS at `/admin` for Projects, Skills, Services, Timeline, and Profile/About content
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
│   │   │   ├── icons/      # Custom brand SVG icons (GitHub, LinkedIn)
│   │   │   └── admin/      # Admin layout, protected route, list row, page header
│   │   ├── sections/       # One folder per public page section (hero, about, skills...)
│   │   ├── pages/          # Home (public site) + admin/* (Login, ProjectsAdmin, ...)
│   │   ├── hooks/          # useAuth, useApiData, useAdminCrud, useProfile, useLenis...
│   │   ├── services/       # api.ts (public fetches) + adminApi.ts (authenticated CRUD)
│   │   ├── data/           # Static fallback content, used if the API is unreachable
│   │   ├── config/         # Nav links, API base URL, social link builder
│   │   ├── types/          # Shared TypeScript types
│   │   └── utils/          # Small helpers (cn, etc.)
│   └── .env.example
└── server/                 # Express + TypeScript + Prisma backend
    ├── src/
    │   ├── controllers/    # Request handlers (projects, skills, services, timeline, profile, auth, contact)
    │   ├── routes/         # Express routers
    │   ├── services/       # Business logic / Prisma queries
    │   ├── middleware/     # Error handler, rate limiter, requireAuth (JWT)
    │   ├── validators/     # Zod schemas
    │   └── utils/          # env, prisma client, asyncHandler, ApiError, sanitize, jwt
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

# Admin panel auth — generate your own values, do not reuse the example ones:
#   node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
#   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ADMIN_PASSWORD_HASH="$2b$10$replace.with.a.real.bcrypt.hash"
JWT_SECRET="replace-with-a-long-random-string"
```

**client/.env** (copy from `client/.env.example`):

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### 3. Set up the database

```bash
cd server
npx prisma migrate dev --name init   # creates tables from prisma/schema.prisma
npm run prisma:seed                  # seeds projects, skills, services, timeline, and profile
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

Visit `http://localhost:5173` for the site, or `http://localhost:5173/admin` to log in and edit content.

---

## Admin Panel

The site's content (Projects, Skills, Services, Timeline, and the Profile/About/Hero text) lives in the database and is editable at **`/admin`** — no code changes needed to update it.

- **Login:** `/admin/login`, protected by a single admin password (set via `ADMIN_PASSWORD_HASH` in `server/.env`, checked with bcrypt). A successful login issues a 12-hour JWT stored in the browser's `localStorage`.
- **Sections:**
  - **Projects** — full CRUD: title, slug, tagline, description, problem/architecture write-ups, tech stack, features, screenshots, GitHub/live URLs, featured flag, display order.
  - **Skills** — full CRUD, grouped by category (Frontend/Backend/Database/Mobile/Tools) with a level (Beginner/Intermediate/Advanced).
  - **Services** — full CRUD for the Services section cards.
  - **Timeline** — full CRUD for both the About-section "journey" steps and the Experience-section year-by-year track (`track: JOURNEY | CAREER`).
  - **Profile** — a single form for hero heading/intro, About paragraphs, stats, and contact/social links (name, roles, email, location, resume URL, GitHub/LinkedIn).
- **Public read endpoints require no auth**; only create/update/delete requests need the `Authorization: Bearer <token>` header, enforced by `requireAuth` middleware on the server.
- **Resilience:** every public section fetches live data from the API but falls back to the bundled static defaults in `client/src/data/` if the API is unreachable, so the site never shows a broken/empty state.

To change the admin password later, generate a new bcrypt hash and update `ADMIN_PASSWORD_HASH` in `server/.env` (or your hosting provider's environment variables), then restart the server.

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
| `npm run prisma:seed`       | Seed the database with initial content     |

---

## API Documentation

Base URL: `{VITE_API_BASE_URL}` (default `http://localhost:4000/api`)

All responses follow the shape:

```json
{ "success": true, "data": "...", "message": "..." }
{ "success": false, "message": "...", "errors": { "field": "reason" } }
```

Routes marked 🔒 require `Authorization: Bearer <token>`.

| Method | Route                 | Description                              |
| ------ | ---------------------- | ----------------------------------------- |
| GET    | `/health`               | Health check (uptime, timestamp)          |
| POST   | `/auth/login`           | `{ password }` → `{ token }`              |
| GET    | `/auth/me` 🔒           | Verifies the current token                |
| GET    | `/projects`             | List all projects (featured first)        |
| GET    | `/projects/:slug`       | Get one project by slug                   |
| POST   | `/projects` 🔒          | Create a project                          |
| PUT    | `/projects/:id` 🔒      | Update a project                          |
| DELETE | `/projects/:id` 🔒      | Delete a project                          |
| GET    | `/skills`               | List all skills                           |
| POST   | `/skills` 🔒            | Create a skill                            |
| PUT    | `/skills/:id` 🔒        | Update a skill                            |
| DELETE | `/skills/:id` 🔒        | Delete a skill                            |
| GET    | `/services`             | List all services                         |
| POST   | `/services` 🔒          | Create a service                          |
| PUT    | `/services/:id` 🔒      | Update a service                          |
| DELETE | `/services/:id` 🔒      | Delete a service                          |
| GET    | `/timeline`             | List all timeline items (journey + career)|
| POST   | `/timeline` 🔒          | Create a timeline item                    |
| PUT    | `/timeline/:id` 🔒      | Update a timeline item                    |
| DELETE | `/timeline/:id` 🔒      | Delete a timeline item                    |
| GET    | `/profile`              | Get the profile/About singleton           |
| PUT    | `/profile` 🔒           | Update the profile/About singleton        |
| POST   | `/contact`              | Submit a contact form message             |

### `POST /api/contact`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Let's work together",
  "message": "Hi Rakib, I'd like to talk about a project..."
}
```

Validated and sanitized server-side (Zod schema + HTML-tag stripping). Rate-limited to 5 requests / 15 minutes per IP. On success, the message is stored in the `contact_messages` table and a `201` is returned with the created message id.

`POST /api/auth/login` is rate-limited to 10 attempts / 15 minutes per IP.

---

## Rebranding / Replacing Placeholder Data

The recommended way to update content is through the **`/admin` panel** — it writes directly to the database, so changes appear on the live site immediately without a redeploy.

If you'd rather change the *defaults* (used to seed the database, and as the offline fallback shown if the API is unreachable):

- `client/src/data/*.ts` — static fallback copies of profile, projects, skills, services, and timeline data.
- `server/prisma/seed.ts` — the same content, seeded into the database on `npm run prisma:seed`.
- `client/src/config/site.ts` — nav links and the API base URL (structural, not content).

Update project image paths (`public/projects/...`) once real screenshots are available — drop images into `client/public/projects/<slug>/`, or manage them through the admin Projects form.

The GitHub activity section (`client/src/sections/github`) fetches live public data from the GitHub REST API using the profile's `githubUsername` — no API key required, but it is rate-limited (60 requests/hour per IP) since it's unauthenticated.

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

## Deployment (Netlify)

This repo is set up to deploy as **two separate Netlify sites** from the same GitHub repo — one for the static frontend, one for the backend running as a Netlify Function. Each has its own `netlify.toml`.

### 0. Provision a cloud PostgreSQL database

Netlify Functions can't reach a database on your own machine, so you need a real, internet-reachable Postgres first — [Neon](https://neon.tech) or [Supabase](https://supabase.com) both have a free tier that takes under 2 minutes to set up. Copy the connection string it gives you (looks like `postgresql://user:pass@host/db?sslmode=require`) — you'll need it below.

### 1. Backend site (`server/`)

In Netlify: **Add new site → Import from Git** → pick this repo → set **Base directory** to `server`. Netlify will pick up `server/netlify.toml` automatically (build command `npm install && npx prisma generate`, functions in `netlify/functions`).

Set these environment variables on the site (Site settings → Environment variables):

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | the connection string from step 0 |
| `NODE_ENV` | `production` |
| `CLIENT_ORIGIN` | the frontend site's URL (set after step 2, e.g. `https://your-frontend.netlify.app`) |
| `ADMIN_PASSWORD_HASH` | `node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"` |
| `JWT_SECRET` | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

Deploy the site, then run the migration once against the production database (from your machine, with `DATABASE_URL` pointed at the cloud DB):

```bash
cd server
DATABASE_URL="<your cloud connection string>" npx prisma migrate deploy
DATABASE_URL="<your cloud connection string>" npm run prisma:seed
```

Your API is now live at `https://<backend-site>.netlify.app/api/...`.

### 2. Frontend site (`client/`)

**Add new site** again, same repo, **Base directory** = `client`. Netlify picks up `client/netlify.toml` (build command `npm run build`, publish `dist`, with an SPA fallback redirect so `/admin/*` routes work on refresh).

Set one environment variable:

| Variable | Value |
| --- | --- |
| `VITE_API_BASE_URL` | `https://<backend-site>.netlify.app/api` |

Deploy, then go back to the **backend** site's `CLIENT_ORIGIN` variable and set it to this frontend site's URL (needed for CORS), and redeploy the backend once.

### Notes

- The backend's rate limiting (`express-rate-limit`) uses in-memory storage, which resets on every cold start in a serverless function — it's a soft protection here, not a hard guarantee, which is fine for a portfolio site's traffic.
- Prisma's query engine is built for multiple platforms (`binaryTargets` in `schema.prisma`) so the same schema works both on your local machine and on Netlify's Linux-based Functions runtime.
- Never commit `.env` files — both `client/.env` and `server/.env` are gitignored. Use `.env.example` as the reference for required variables. Always set a fresh `ADMIN_PASSWORD_HASH` and `JWT_SECRET` in production — never reuse development values.

### Alternative: traditional Node hosting

If you'd rather not use serverless functions, the backend also runs as a normal long-lived Node process (`server/src/server.ts`, unrelated to the `netlify/functions/` wrapper) — deployable to Render, Railway, Fly.io, or a VPS the same way as before:

```bash
cd server
npm run build
npm run prisma:deploy
npm start
```
