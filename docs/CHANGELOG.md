# Changelog

All notable changes to the Skillify Genius platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [2.1.0] - 2026-09-13

### Added
- **"Go to TOP" Circular Scroll Progress Button**: Introduced floating `<ScrollToTopButton />` component (`frontend/src/components/shared/ScrollToTopButton.tsx`) that appears promptly after scrolling 120px. Features a textless sign-only design with an up arrow symbol and an animated SVG circular progress ring that fills clockwise proportionally to page scroll percentage. Anchored cleanly on the bottom-right above the contact widget (`bottom-[5.25rem] right-6 z-30`).
- **Brand Logo Scroll to Home Top**: Configured the Skillify Genius brand logo link in both the header (`Navbar.tsx`) and footer (`Footer.tsx`) to scroll smoothly to the top of the home page when clicked, even when already on the home route.
- **Footer Back to Top Action**: Added a semantic "Back to top ↑" action in the footer bottom bar (`frontend/src/components/layout/Footer.tsx`).
- **Bangladesh Time (BST) Alert Conversion**: Upgraded the Telegram alert Appwrite Function (`functions/telegram-trial-alert/src/main.js`) with an automatic time conversion utility (`formatBdTime()`). In addition to the parent's requested slot and timezone, the Telegram notification displays `BD Time: <formatted>` (`Asia/Dhaka`, UTC+6) for instant educator scheduling without manual timezone math.
- **Platform Changelog**: Added `docs/CHANGELOG.md` to track all releases, enhancements, and architectural fixes.

### Changed
- **Course Card Gradients**: Upgraded course card header gradients to cohesive, luxury dark-tech palettes:
  - *Python & Problem Solving*: Deep Alpine Emerald (`from-[#0b3328] via-[#0d3b2f] to-[#08221b]`).
  - *Web Development & Creative Tech*: Petrol Spruce (`from-[#0c3131] via-[#0f3d3d] to-[#092222]`).
  - *Artificial Intelligence & Future Tech*: Midnight Sapphire (`from-[#0b2638] via-[#0d3047] to-[#081b28]`).
  - Added radial ambient lighting overlays for a polished, illuminated appearance.
- **Educator Reach Metric**: Updated educator experience metric from "20+ Countries taught" to "21+ Countries taught" site-wide (`HomePage.tsx`, `AboutPage.tsx`, `CoursesPage.tsx`, `coursesMeta.ts`, `CONTENT_GUIDE.md`, and `README.md`).

### Fixed
- **Dark Container Heading Contrast**: Fixed an issue where headings (`h1`, `h2`, `h3`, `h4`) inside dark or emerald container elements (`bg-slate-900`, `bg-[#0d2922]`, `.text-white`) were rendered almost invisibly in dark green/black (`#102a25`). Added targeted CSS contrast overrides in `frontend/src/index.css`.
- **Appwrite Database ID Resolution**: Added resilient fallback mapping from database name `skillify_genius_db` to the Appwrite Database ID `6aa5fbd8001e67a857e3` in `frontend/src/lib/api.ts` to prevent 404 `database_not_found` errors when environment variables contain the database slug.

---

## [2.0.0] - 2026-08-22

### Added
- **Static React SPA Architecture**: Built with React 18, Vite, TypeScript, and Tailwind CSS for instant load speeds and zero-backend maintenance.
- **Direct Appwrite BaaS Integration**: Frontend connects directly to Appwrite Cloud/Self-Hosted collections (`trial_bookings`, `course_registrations`, `leads`).
- **Free 45-Minute 1:1 Trial Booking**: Interactive trial booking funnel (`/trial`) with form validation, timezone picker, and booking status feedback.
- **Telegram Notification Function**: Node.js Appwrite Function (`telegram-trial-alert`) triggered on new trial document creation to alert the educator via Telegram bot.
- **Omnichannel Contact Widget**: Floating contact drawer widget (`FloatingContactWidget.tsx`) with instant links for Email, Phone, WhatsApp, and Telegram.
- **Child Safeguarding & Legal Documentation**: Complete child safeguarding policy (`/safeguarding`), privacy policy (`/privacy`), and terms of service (`/terms`).
- **Documentation Suite**: Added `docs/ARCHITECTURE.md`, `docs/APPWRITE_SETUP.md`, `docs/CONTENT_GUIDE.md`, and `docs/DEPLOYMENT.md`.

### Security
- **Zero Secret Exposure**: Public client configuration exposes only public endpoint, project ID, and database/collection IDs. No Appwrite API server keys or Telegram bot tokens exist in the client bundle.
- **Role-Based Document Permissions**: Client role has write-only permission (`Role.any()` create) on submission collections; reads and updates are restricted.
