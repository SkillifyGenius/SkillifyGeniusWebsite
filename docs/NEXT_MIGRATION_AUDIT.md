# Next.js migration audit and plan

Baseline: commit `56611228313e642ab78ac9d9299d73fa9bb0f7a7` on `main`. The `nextjs-migration` branch retains the working migration. The original React application remains recoverable from `main`; no production deployment has been changed.

## Existing application

- Frontend: Vite, React 19, TypeScript, React Router, Tailwind CSS, Radix Slot and Lucide icons. The original route set is `/`, `/courses`, `/blog`, `/about`, `/contact`, `/trial`, `/privacy`, `/safeguarding`, `/terms`, and a custom 404.
- Forms and state: homepage course registration, contact inquiry, trial booking with timezone conversion and course query preselection, homepage pathway diagnostic, blog reader modal, FAQ accordion, scroll progress button and mobile navigation. State is local React state; no global store, login, protected route, analytics or tracking code exists in the frontend.
- Data: local fallback courses and posts. Frontend `api.ts` submits directly to Appwrite collections for registrations, leads and trials. Public Appwrite endpoint, project, database and collection IDs are client configuration; the Appwrite API key and Telegram token are server/function secrets. The separate Express API exposes parallel read and submission endpoints and uses Appwrite persistence, but the original frontend does not call it.
- Assets and styling: images and favicon in `frontend/public`, global Tailwind stylesheet, Inter and Plus Jakarta Sans fonts. The backend and Telegram function are separate workspaces/services.

## Migration risks found

- An earlier Next.js pass redirected `/courses` to `/programs`, changed homepage course cards and registration into mentorship cards, changed trial choices and age bounds, and replaced the `/blog` modal with a different list. These are compatibility regressions against the React baseline.
- New mentorship, assessment and journey pages are additional features. Keep them on their own URLs while restoring the original routes and flows.
- Direct Appwrite submissions depend on Appwrite Web platform origins and public create permissions. Live submission cannot be validated without a configured, reachable production Appwrite instance.
- The public pages contain client interactions. Preserve their behavior while using App Router server route wrappers for metadata and static initial HTML. Avoid changing the backend contract.

## Execution plan

1. Preserve the baseline in Git and keep work on `nextjs-migration`.
2. Restore the original homepage, `/courses`, `/blog` modal and `/trial` fields using the existing React components adapted only for Next routing and client boundaries. Keep additive mentorship routes separate.
3. Verify old URLs, links, assets, forms, API payloads and 404 behavior. Add route error/loading states and page metadata without changing visible copy for the original pages.
4. Check TypeScript, production build, backend/function tests, HTTP route/asset responses and dependency audit. Record browser and live integration limits honestly.
5. Update deployment and rollback documentation and publish a URL comparison and migration log. Deploy only after production Appwrite smoke tests and product approval.
