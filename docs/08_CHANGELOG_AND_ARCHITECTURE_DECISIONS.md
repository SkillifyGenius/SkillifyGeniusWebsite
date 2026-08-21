# 08 - Changelog & Architecture Decision Records (ADR)

---

## 1. Architecture Decision Records (ADR)

### ADR 001: Next.js 15+ App Router & React 19 Adoption
- **Date**: 2026-08-21
- **Context**: Needed high SEO indexation for global marketing pages combined with interactive client portals.
- **Decision**: Adopt Next.js 15 App Router with Express API gateway.

### ADR 002: Single Premium Light Theme Standard
- **Date**: 2026-08-21
- **Context**: Cyberpunk, gaming, and dark aesthetics alienated parents seeking high-trust education.
- **Decision**: Single Apple Education / Linear / Notion light theme (`#2563EB`, `#1E40AF`, `#6366F1`, `#10B981`, `#F8FAFC`, `#FFFFFF`, 20px card radius).

### ADR 003: Dynamic Algorithmic Skill Graph Telemetry
- **Date**: 2026-08-22
- **Context**: Students needed tangible skill progression based on actual output rather than video watching hours.
- **Decision**: Implemented algorithmic telemetry calculation triggered upon project publishing and RCA reflections.

### ADR 004: Removal of Public Role Switcher & Dedicated Auth Routes
- **Date**: 2026-08-22
- **Context**: The landing page exposed internal demo role dropdowns, compromising external brand perception.
- **Decision**: Replaced public role dropdown with minimal academy navigation (`Programs`, `Pathfinder`, `Blogs`, `About`), `Student Login` (`/login/student`), and dedicated private login routes (`/teacher/login`, `/admin/login`).

### ADR 005: Public Blog Navigation & Multi-Step Student Onboarding
- **Date**: 2026-08-22
- **Context**: Needed thought leadership discoverability in public header and a high-converting, split-screen registration flow for new academy students.
- **Decision**: Added `Blogs` (`/blog`) to public navbar, created 4-step student registration (`/register/student`) with Appwrite database synchronization, and created dedicated teacher login (`/teacher/login`).

### ADR 006: Hero Value Positioning, Playable Python Simulator & Admissions Desks
- **Date**: 2026-08-22
- **Context**: Needed crisp differentiation from generic coding bootcamps, an engaging interactive Python project preview, and frictionless WhatsApp/Telegram channels for prospective parents.
- **Decision**:
  - Upgraded headline to *"Build Problem Solvers, Not Just Coders."* with the 3 Core Pillars (*Problem Solving First*, *Self Learning Ability*, *Build Real Projects*).
  - Built playable text-based Python game simulator (`mars_adventure.py`) directly in the hero.
  - Added Interactive 6-D Skill Graph™ radar and Interactive Age-Based Curriculum Explorer.
  - Added top contact bar and global floating WhatsApp/Telegram widget (`+880 1860 99 88 88`).

---

## 2. Version Changelog

### v2.0.0 (Production-Ready MVP) - 2026-08-22
- **Hero Value Proposition Upgrade**: "Build Problem Solvers, Not Just Coders" + 3 Core Pillars.
- **Playable Python Mars Adventure Game**: Interactive text-based Python game directly in the landing page hero.
- **Interactive Age & Stage Curriculum Explorer**: Dynamic age switcher tabs for ages 6-8, 9-11, 12-14, 15-18.
- **Interactive 6-Dimensional Skill Graph™**: SVG radar chart modeling real cognitive capabilities.
- **Top Contact Bar & Floating Admissions Desk**: High-contrast header with official WhatsApp and Telegram links.
- **Complete Premium Light UI Transformation**: All routes standardized to Light Theme.
- **Public Blog System**: Article cards with category badges, reading time, and clean reading view (`/blog`, `/blog/[slug]`).
- **Student Registration Flow**: 4-step onboarding at `/register/student` with split-screen academy branding.
- **Private Faculty Access**: Dedicated `/teacher/login` and `/admin/login` routes.
- **Appwrite Authentication & BaaS Gateway**: Connected endpoint `https://api.attanjil.com/v1` and project `6a888ff500009da26174`.
- **Local & LAN Preview Batch Runner**: `run_local.bat` / `start.bat` with automatic IPv4 detection.
- **Full Documentation Consolidation**: Cleaned `docs/` down to 11 unified master documents.
