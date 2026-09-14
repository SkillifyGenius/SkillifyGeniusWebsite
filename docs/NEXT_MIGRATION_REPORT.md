# Next.js migration report

Baseline: React/Vite commit `56611228313e642ab78ac9d9299d73fa9bb0f7a7` on `main`. Migration branch: `nextjs-migration`. Full baseline archive: `backups/react-baseline.zip` (ignored by Git). The original product can be recovered without relying on the current working tree.

## URL comparison

| React baseline | Next.js result | Behavior |
| --- | --- | --- |
| `/` | `/` | Original homepage, course cards, pathway diagnostic, registration form |
| `/courses` | `/courses` | Original course list and trial links; no redirect |
| `/blog` | `/blog` | Original card grid and article reader modal |
| `/about` | `/about` | Original content |
| `/contact` | `/contact` | Original inquiry form and Appwrite collection |
| `/trial?course=<slug>` | `/trial?course=<slug>` | Original course preselection, age range, timezone slots, and booking payload |
| `/privacy` | `/privacy` | Original content |
| `/safeguarding` | `/safeguarding` | Original content |
| `/terms` | `/terms` | Original content |
| Other paths | 404 | Custom not-found page |

Additional routes: `/mentorship` retains the newer mentorship homepage, `/programs` shows mentorship details, `/assessment` creates a local draft, `/journey` displays that session-only draft, and `/blog/[slug]` exposes static, indexable articles. No original URL redirects or route renames remain.

## Architecture and decisions

- The frontend uses Next.js 16.3.5 App Router and strict TypeScript. The root layout owns global styles and organization/website structured data. Server route wrappers provide metadata; interactive original components remain client components to preserve state and forms.
- React Router links became Next links. The previous Vite environment names have `NEXT_PUBLIC_APPWRITE_*` equivalents with migration fallback. Public Appwrite configuration remains in the browser; the Appwrite API key and Telegram token remain outside the frontend. The Appwrite document-create URL, payloads, errors, and collection names are unchanged.
- The original homepage, blog, and trial components were restored from `main` and adapted for Next routing. The course component was already converted with the same design and data. The old home is served at `/`; the previously added mentorship home is retained at `/mentorship`.
- Original public routes are prerendered where their initial content is static. Trial and assessment use dynamic rendering for query parameters. The draft journey is not indexed and remains in session storage.
- Route titles, descriptions, canonicals, Open Graph cards, sitemap, robots, `EducationalOrganization`, `WebSite`, `Course`, `BreadcrumbList`, and article data are included. Location claims were not invented. The public page does not display search-optimization terminology.
- Hero and course images use Next Image with intrinsic dimensions, responsive sizes, and hero preload. Route loading and error states were added. The blog modal now supports Enter, Space, Escape, and focus restoration.
- Docker can build standalone output with `Dockerfile.frontend`; ordinary builds still support `next start` for traditional Node hosting. Vercel can use the `frontend` workspace and the documented public environment values.

## Migration log and dependency review

| Area | Main files | Result |
| --- | --- | --- |
| Baseline and plan | `docs/NEXT_MIGRATION_AUDIT.md`, `backups/react-baseline.zip`, Git branches | Original Vite snapshot preserved; route and integration risks recorded before restoration |
| Next foundation | `frontend/package.json`, `frontend/next.config.ts`, `frontend/tsconfig.json`, `frontend/src/app`, `frontend/src/components/layout/ClientShell.tsx` | App Router route files, TypeScript settings, shared layout and client navigation |
| Preserved React flows | `frontend/src/views/HomePage.tsx`, `CoursesPage.tsx`, `BlogPage.tsx`, `TrialPage.tsx`, shared form and navigation components | Original URLs, content, interactions, and Appwrite payloads restored |
| Additional features | `frontend/src/views/MentorshipHomePage.tsx`, `frontend/src/components/mentorship`, `frontend/src/data/mentorship.ts` | New mentorship and roadmap work retained separately |
| Search and assets | `frontend/src/lib/site-metadata.ts`, route metadata, `robots.ts`, `sitemap.ts`, `frontend/src/app/layout.tsx` | Crawlable metadata and relevant structured data; optimized image delivery |
| Launch | `run_local.bat`, `start.bat`, `Dockerfile.frontend`, `docs/DEPLOYMENT.md` | Local Next launcher and hosting instructions |

The frontend added `next` and removed `vite`, `@vitejs/plugin-react`, and `react-router-dom`; React, TypeScript, Tailwind, Lucide, Radix Slot, and the UI utility packages remain. The backend and Telegram Function packages were not changed as part of this preservation pass.

## Verification

- `npm run build`: passed, including Next compilation, TypeScript, and 20 generated routes.
- `npm run typecheck`: passed.
- Production HTTP checks: all nine original URLs returned 200, added public routes returned 200, robots/sitemap and assets returned 200, and an unknown path returned 404.
- Chrome and Edge interactive smoke: registration, trial, and contact payloads reached mocked Appwrite collection endpoints; blog modal opened and closed; no horizontal overflow at 390, 768, and 1440 px across the main routes. The Chrome run reported no browser exceptions or console errors.
- Firefox: homepage rendered in a headless screenshot. Safari is unavailable on Windows, so Safari interaction and layout have not been verified.
- Backend: 6 tests passed and the backend TypeScript build passed. Telegram Function: 4 tests passed. Full `npm audit` found 0 vulnerabilities. The npm registry reported Next.js 16.3.5 as the latest stable version during this migration.
- Live Appwrite submissions, CORS, the Telegram alert, and the Docker image have not been executed. The browser test deliberately intercepts document writes so no test records are created in production.

## Remaining launch checks and rollback

Before deployment, use a staging Appwrite project to submit registration, contact, and trial forms. Verify saved document fields, public create-only permissions, CORS, and the Telegram Function. Test Safari on a Mac or hosted browser service. Run a Lighthouse/Web Vitals baseline on the deployed domain; no measured speed claim is made from a local build alone. No login or analytics code existed in the React baseline, so there are no related flows to migrate.

If the migration must be rolled back, redeploy the `main` baseline commit above or unpack `backups/react-baseline.zip` into a separate directory. Do not switch the current working tree without committing or otherwise preserving its uncommitted migration changes. The baseline uses Vite; restore its original build and hosting configuration from that commit.
