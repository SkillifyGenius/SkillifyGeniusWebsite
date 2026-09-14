# Architecture

Skillify Genius deploys as a Next.js App Router frontend backed by self-hosted Appwrite. The Express backend remains optional legacy code and is not part of the frontend deployment.

Browser → React frontend → Appwrite submission collections
                         └→ new trial booking event → Appwrite Function → Telegram Bot API → educator chat

The frontend holds only public Appwrite endpoint, project ID, database ID, and collection IDs. It never holds an Appwrite server key or Telegram bot token.

## Frontend routes

| Path | Purpose |
| --- | --- |
| `/` | Original course overview, pathway diagnostic, and registration |
| `/courses` | Original course list and trial links |
| `/blog` | Original resource cards and article reader modal |
| `/trial` | Original free 1:1 trial request with course preselection |
| `/mentorship` | Additional mentorship overview |
| `/programs` | Foundation, Professional, and Mastery mentorship details |
| `/assessment` | Pre-enrollment personalization questionnaire |
| `/journey` | Session-only personal roadmap and progress draft; no account or mentor sync |
| `/about` | Educator profile |
| `/blog/[slug]` | Additional indexable article pages |
| `/contact` | General inquiry |
| `/privacy`, `/safeguarding`, `/terms` | Public policy pages |

Program and article content is stored in typed frontend arrays. Next.js prerenders public static routes and articles with route-level titles, canonicals, Open Graph metadata, sitemap, and robots.txt. The personal journey draft is stored in browser session storage, so it does not create a student account or expose draft data to the server.

## Submission persistence

| Flow | Appwrite collection | Frontend environment variable |
| --- | --- | --- |
| Course registration | `course_registrations` | `NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID` |
| Contact inquiry | `leads` | `NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION_ID` |
| Live 1:1 assessment request | `trial_bookings` | `NEXT_PUBLIC_APPWRITE_TRIALS_COLLECTION_ID` |

The frontend uses Appwrite's document-create REST endpoint. Each document has the same generated UUID in its `id` attribute and Appwrite document ID. Collection schemas validate fields. The three collections grant public create permission only; public users cannot read, update, or delete submissions.

The Telegram Function subscribes to the `trial_bookings` document-create event. Event executions are asynchronous: a form success means the document was saved, while Telegram delivery must be checked in Function executions. If Appwrite rejects a document or cannot be reached, the form shows an error. There is no in-memory submission fallback.
