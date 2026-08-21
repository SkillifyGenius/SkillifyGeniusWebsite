# 02 - Technical System Architecture & Directory Structure

---

## 1. Top-Level Directory Topology

```
SkillifyGenius/
├── docs/                        # Master AI-agent documentation (10 Core Files)
├── public/                      # Static assets, icons, and og_preview
├── server/                      # Node.js / Express REST API backend
│   └── src/
│       ├── config/              # Appwrite server SDK configuration
│       ├── middleware/          # Helmet, rate limit, Zod validators, auth guards
│       ├── routes/              # Express API route declarations (/api/v1/*)
│       ├── services/            # Reactive store, telemetry engine, Socratic AI
│       └── index.ts             # Express server entry point (0.0.0.0:5000)
├── src/                         # Next.js 15+ App Router frontend
│   ├── app/                     # App Router pages & API routes
│   │   ├── (public)/            # Homepage, courses, projects, pathfinder, trial
│   │   ├── dashboard/           # Student, Parent, and Mentor role portals
│   │   ├── admin/               # Admin operations console & login
│   │   ├── learn/               # Socratic Learning Studio & Sandbox
│   │   ├── login/               # Dedicated Student Login
│   │   ├── mentor/              # Dedicated Mentor Login
│   │   ├── error.tsx            # Global production error boundary
│   │   ├── loading.tsx          # Global light pulsing skeleton loader
│   │   ├── not-found.tsx        # 404 page
│   │   └── layout.tsx           # Root layout with Schema.org JSON-LD
│   ├── components/              # UI Component Library & layout wrappers
│   │   ├── layout/              # Navbar, Footer
│   │   ├── shared/              # SkillGraphVisualizer, ProjectEvidenceCard, Feedback
│   │   └── ui/                  # Button, Card, Badge, Input, Skeleton
│   ├── contexts/                # AuthContext (RBAC session state)
│   ├── lib/                     # Client API SDK (`api.ts`), Appwrite Web client, utils
│   ├── middleware.ts            # Next.js Edge Middleware (security & route guards)
│   └── types/                   # Unified TypeScript domain definitions
├── tests/                       # Automated telemetry & Socratic AI tests
├── package.json                 # Project dependencies and npm scripts
├── run_local.bat                # 1-Click concurrent runner with LAN IP detection
└── start.bat                    # Alias batch runner
```

---

## 2. Data Flow & Communication Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                 BROWSER CLIENT (React 19)                   │
│  • Client-side hooks & Server Component SSR                 │
│  • Typed API calls via `src/lib/api.ts`                     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / REST JSON
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             EXPRESS REST GATEWAY (PORT 5000)                │
│  • Zod request body validation                              │
│  • Dynamic local & LAN CORS resolver                        │
│  • Rate Limiting: 150 requests / 15 mins                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
┌──────────────────────────────┐┌──────────────────────────────┐
│       Appwrite BaaS          ││  Local In-Memory Sync Store  │
│  • Databases & Documents     ││  • Instant dev & test sync   │
│  • Storage & Bucket media    ││  • Zero downtime fallback    │
└──────────────────────────────┘└──────────────────────────────┘
```

---

## 3. Server vs. Client Component Rules

- **Server Components (Default)**: Use for static marketing pages (`/about`, `/courses`, `/faq`, `/blog`) for optimal SEO and rapid first-paint.
- **Client Components (`"use client"`)**: Use only when React state, hooks, or browser event listeners are required (`/dashboard/*`, `/learn/*`, `/trial`, `Navbar`, `SkillGraphVisualizer`, `ProductFeedbackWidget`).
