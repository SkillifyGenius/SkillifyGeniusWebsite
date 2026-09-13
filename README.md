# Skillify Genius Monorepo

A lightweight EdTech platform for customized live 1:1 technology learning. The current deployment uses a static frontend, Appwrite collections, and one Appwrite Function for Telegram trial alerts. The existing Express backend is optional legacy code and is not required to run the site.

```text
SkillifyGenius/
├── frontend/   # Vite + React + TypeScript SPA
├── backend/    # Express API + Appwrite control layer
├── docs/       # Architecture, content, Appwrite, and hosting notes
└── package.json
```

## Applications

| Package | Technology | Local URL |
| --- | --- | --- |
| `frontend` | Vite, React, TypeScript, Tailwind, shadcn-style UI, Lucide | `http://localhost:3000` |
| `backend` | Express, Zod, Appwrite Server SDK | `http://localhost:5000` |

Submission flow: `browser → React frontend → Appwrite collection`. New trial documents trigger an Appwrite Function that sends an alert to the educator's Telegram chat. The browser receives only public Appwrite configuration, never a server key or Telegram token.

## Product positioning

Skillify Genius focuses on customized 1:1 mentorship in problem solving, self-learning, and digital safety. The public educator profile presents the approved facts documented in [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md), including teaching since 2012, a 2014 National Award, experience with learners from 20+ countries, and active work as a Senior Coding Instructor, Software Engineer, and Educator.

The primary conversion flow is a free, no-obligation, live 1:1 assessment at `/trial`.

Public contact: [skillifygenius@gmail.com](mailto:skillifygenius@gmail.com), [+880 1860 99 88 88](tel:+8801860998888), [WhatsApp](https://wa.me/8801860998888), and [Telegram](https://t.me/+8801860998888).

## Local development

Requires Node.js 20+ and npm 10+.

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

Set the public `VITE_APPWRITE_*` values and `VITE_SITE_URL` in `frontend/.env`. The project, database, and collection IDs are public configuration; never add `APPWRITE_API_KEY` or `TELEGRAM_BOT_TOKEN` to a `VITE_` variable.

## Hosting

Deploy only `frontend` as a static site. Configure the Appwrite collections and Telegram Function separately in Appwrite.

Frontend:

```text
Build command: npm install && npm run build
Publish directory: dist
VITE_APPWRITE_ENDPOINT=https://your-appwrite-host/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=skillify_genius_db
VITE_APPWRITE_REGISTRATIONS_COLLECTION_ID=course_registrations
VITE_APPWRITE_LEADS_COLLECTION_ID=leads
VITE_APPWRITE_TRIALS_COLLECTION_ID=trial_bookings
VITE_SITE_URL=https://www.example.com
```

The frontend host must rewrite unknown routes to `index.html`. Vercel and Netlify configuration files are included.

The existing backend directory remains available for future use but is not part of the current frontend build. Configure all three submission collections and the Telegram Function as described in [`docs/APPWRITE_SETUP.md`](docs/APPWRITE_SETUP.md) before accepting production submissions.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): frontend-to-Appwrite submission flow
- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md): approved positioning, educator facts, and CTA language
- [`docs/APPWRITE_SETUP.md`](docs/APPWRITE_SETUP.md): collections, permissions, and Telegram Function
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md): static hosting and launch verification
