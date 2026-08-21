# 00 - Skillify Genius 2.0: Master Project Documentation & Agent Guide

> **Target Audience**: AI Coding Agents (Antigravity, Cursor, Claude Code, GPT Agents) & Software Engineers.
> **Mandatory First Step**: Read this document in full before analyzing, modifying, or executing code.

---

## 1. Project Identity & Mission

- **Project Name**: Skillify Genius 2.0
- **Domain**: Founder-Led Future Skills Academy for Ages 6-18
- **Core Product**: Real skill development (Problem Solving, Self-Learning, Engineering Mindset, and Builder Mindset) - **NOT** a certificate mill or video tutorial marketplace.
- **Core Philosophy**: *"Students should not only learn technology. They should learn how to learn technology."*
- **Current Stage**: Production-Ready MVP (Pilot Users, 1-on-1 Assessments, Socratic Learning Studio).

---

## 2. Core Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                 FRONTEND WEB APPLICATION                    │
│  • Framework:   Next.js 15+ App Router (React 19)           │
│  • Language:    TypeScript (Strict Mode)                    │
│  • Styling:     Tailwind CSS (Single Light Theme)           │
│  • Icons:       Lucide React                                │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP REST (/api/v1/*)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND REST API GATEWAY                    │
│  • Runtime:     Node.js 20+ / Express.js                    │
│  • Tooling:     tsx / TypeScript                            │
│  • Middleware:  Helmet, Express Rate Limit, Zod Validation  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 DATA LAYER & BAAS INTEGRATION               │
│  • Endpoint:    https://api.attanjil.com/v1                 │
│  • Project ID:  6a888ff500009da26174                        │
│  • Database:    skillify_genius_db                          │
│  • Client SDK:  appwrite (Web) & node-appwrite (Server)     │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Four Role Portals (RBAC Architecture)

1. **Student** (`/dashboard/student`, `/learn/[track]/[moduleId]`):
   - Dynamic Skill Graph™ (6 telemetry dimensions).
   - Socratic Learning Studio with live in-browser code sandbox.
   - Root Cause Analysis (RCA) journal for unassisted debugging reflections.
   - Project Publishing (`/dashboard/student/projects/new`).
2. **Parent** (`/dashboard/parent`):
   - High-trust plain-English growth metrics (+18% Problem Solving).
   - Monthly Milestone Growth Timeline (Jan ➔ Feb ➔ Mar).
   - Live project links to test actual student cloud apps.
   - Weekly mentor observations.
3. **Mentor / Teacher** (`/dashboard/mentor`):
   - Student roster CRM with search and filter (`All`, `Active`, `At-Risk`).
   - Real-time telemetry calibration sliders.
   - Project Verification Queue (`Submitted` ➔ `Approved` ➔ `Verified Capstone`).
4. **Admin** (`/admin`):
   - 1-on-1 assessment CRM table with status progression (`Pending` ➔ `Confirmed` ➔ `Completed`).
   - SVG interactive enrollment trend charts & curriculum phase funnels.
   - Admissions lead inquiry management.

---

## 4. Public Navigation vs. Private Portals

- **Public Navigation**: Only clean academy links (`Programs`, `Projects`, `Pathfinder`, `About`), `Student Login` (`/login/student`), and `Book Assessment` (`/trial`).
- **Private Entrypoints**:
  - Mentor Login: `/mentor/login`
  - Admin Login: `/admin/login`
- **Rule**: Public navigation must **NEVER** expose role switchers or internal faculty links.

---

## 5. Mandatory AI Agent Operating Rules

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     AI CODING AGENT WORKFLOW RULES                      │
├─────────────────────────────────────────────────────────────────────────┤
│ 1. Read Documentation First:                                            │
│    • 00_PROJECT_DOCUMENTATION.md (This file)                            │
│    • 02_SYSTEM_ARCHITECTURE.md                                          │
│    • 04_FRONTEND_ARCHITECTURE_AND_DESIGN_SYSTEM.md                      │
│    • 08_CHANGELOG_AND_ARCHITECTURE_DECISIONS.md                         │
│                                                                         │
│ 2. Design System Integrity:                                             │
│    • NEVER introduce Dark Mode, Cyberpunk, or Neon gaming styles.       │
│    • Maintain Apple Education / Linear / Notion / Vercel light theme.   │
│    • Primary: #2563EB | AI: #6366F1 | Emerald: #10B981 | Card: #FFFFFF │
│    • Card Radius: 20px (rounded-[20px]) | Shadow: 0 10px 30px rgba(...) │
│                                                                         │
│ 3. Engineering Rigor:                                                   │
│    • Always verify with `npm run typecheck` and `npm run build`.        │
│    • Do NOT add complex third-party state managers or bloat.            │
│    • Prefer clean, simple solutions and reuse existing store & SDKs.    │
└─────────────────────────────────────────────────────────────────────────┘
```
