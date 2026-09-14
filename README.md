# Skillify Genius Monorepo

A personalized 1:1 technology education site built with Next.js. The original course, resource, registration, contact, and trial journeys are preserved. Appwrite collections handle submissions, and an Appwrite Function sends Telegram trial alerts. The Express backend is optional legacy code.

```text
SkillifyGenius/
├── frontend/   # Next.js + React + TypeScript
├── backend/    # Express API + Appwrite control layer
├── docs/       # Architecture, content, Appwrite, and hosting notes
└── package.json
```

## Applications

| Package | Technology | Local URL |
| --- | --- | --- |
| `frontend` | Next.js App Router, React, TypeScript, Tailwind, Lucide | `http://localhost:3000` |
| `backend` | Express, Zod, Appwrite Server SDK | `http://localhost:5000` |

Submission flow: `browser → React frontend → Appwrite collection`. New trial documents trigger an Appwrite Function that sends an alert to the educator's Telegram chat. The browser receives only public Appwrite configuration, never a server key or Telegram token.

## Product positioning

Skillify Genius focuses on customized 1:1 mentorship in problem solving, self-learning, and digital safety. The public educator profile presents the approved facts documented in [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md), including teaching since 2012, a 2014 National Award, experience with learners from 21+ countries, and active work as a Senior Coding Instructor, Software Engineer, and Educator.

Visitors can browse the original courses at `/courses`, use the homepage pathway diagnostic and registration form, read resources at `/blog`, and request a free live 1:1 trial at `/trial`. The newer mentorship experience is available at `/mentorship` and `/programs`, with an on-device draft roadmap at `/assessment`. The `/journey` draft is held in browser session storage; it is not an enrolled student account or mentor portal.

Public contact: [skillifygenius@gmail.com](mailto:skillifygenius@gmail.com), [+880 1860 99 88 88](tel:+8801860998888), [WhatsApp](https://wa.me/8801860998888), and [Telegram](https://t.me/+8801860998888).

## Local development

Requires Node.js 20+ and npm 10+.

On Windows, double-click `run_local.bat` or `start.bat` in the project root. The launcher installs missing dependencies, starts the Next.js frontend on `http://localhost:3000/`, and opens the browser when the page is ready. The Express backend is optional because the frontend submits directly to Appwrite.

```bash
npm install
copy frontend\.env.example frontend\.env
npm run dev
```

Useful commands:

```bash
npm run dev:frontend
npm run typecheck
npm test
npm run build
```

## Environment

- Frontend: [`frontend/.env.example`](frontend/.env.example)
- Telegram Function: [`functions/telegram-trial-alert/.env.example`](functions/telegram-trial-alert/.env.example) (set these values in Appwrite Function settings)

Set the public `NEXT_PUBLIC_APPWRITE_*` values in `frontend/.env` or `frontend/.env.local`. Existing `VITE_APPWRITE_*` values are accepted during migration. The project, database, and collection IDs are public configuration; never add `APPWRITE_API_KEY` or `TELEGRAM_BOT_TOKEN` to a `NEXT_PUBLIC_` variable.

## Hosting

Deploy `frontend` to a Next.js-capable host. Configure the Appwrite collections and Telegram Function separately in Appwrite.

Frontend:

```text
Root directory: frontend
Framework: Next.js
Build command: npm run build
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://api.attanjil.com/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=6aa5f4880020ee2b7f5b
NEXT_PUBLIC_APPWRITE_DATABASE_ID=6aa5fbd8001e67a857e3
NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID=course_registrations
NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION_ID=leads
NEXT_PUBLIC_APPWRITE_TRIALS_COLLECTION_ID=trial_bookings
```

Next.js serves the original URLs directly, along with route metadata, sitemap, robots.txt, and indexable article pages. `/courses` remains a page and does not redirect.

The backend directory remains available for future use but is not part of the frontend build. Configure the live registration, contact, and trial collections and the Telegram Function as described in [`docs/APPWRITE_SETUP.md`](docs/APPWRITE_SETUP.md) before accepting production submissions.

## Documentation

- [`docs/CHANGELOG.md`](docs/CHANGELOG.md): release history, features, and platform updates
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): frontend-to-Appwrite submission flow
- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md): approved positioning, educator facts, and CTA language
- [`docs/APPWRITE_SETUP.md`](docs/APPWRITE_SETUP.md): collections, permissions, and Telegram Function
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md): Next.js hosting and launch verification
- [`docs/NEXT_MIGRATION_AUDIT.md`](docs/NEXT_MIGRATION_AUDIT.md): React baseline, risks, and migration plan
- [`docs/NEXT_MIGRATION_REPORT.md`](docs/NEXT_MIGRATION_REPORT.md): URL comparison, verification, and rollback
