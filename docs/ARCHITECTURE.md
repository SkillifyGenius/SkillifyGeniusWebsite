# Architecture

Skillify Genius currently deploys as a static React frontend backed by self-hosted Appwrite. The Express backend directory remains in the repository for possible future use but is not part of the current deployment.

Browser → React frontend → Appwrite submission collections
                         └→ new trial booking event → Appwrite Function → Telegram Bot API → educator chat

The frontend holds only public Appwrite endpoint, project ID, database ID, and collection IDs. It never holds an Appwrite server key or Telegram bot token.

## Frontend routes

| Path | Purpose |
| --- | --- |
| `/` | Educator profile, course content, registration |
| `/trial` | Free 1:1 assessment request |
| `/courses` | Course pathways |
| `/about` | Educator profile |
| `/blog` | Educational resources |
| `/contact` | General inquiry |
| `/privacy`, `/safeguarding`, `/terms` | Public policy pages |

Course and article content is stored in typed frontend arrays. Reviews are currently empty. Vite builds a static SPA; the host must rewrite unknown routes to `index.html`.

## Submission persistence

| Flow | Appwrite collection | Frontend environment variable |
| --- | --- | --- |
| Course registration | `course_registrations` | `VITE_APPWRITE_REGISTRATIONS_COLLECTION_ID` |
| Contact inquiry | `leads` | `VITE_APPWRITE_LEADS_COLLECTION_ID` |
| 1:1 assessment | `trial_bookings` | `VITE_APPWRITE_TRIALS_COLLECTION_ID` |

The frontend uses Appwrite's document-create REST endpoint. Each document has the same generated UUID in its `id` attribute and Appwrite document ID. Collection schemas validate fields. The three collections grant public create permission only; public users cannot read, update, or delete submissions.

The Telegram Function subscribes to the `trial_bookings` document-create event. Event executions are asynchronous: a form success means the document was saved, while Telegram delivery must be checked in Function executions. If Appwrite rejects a document or cannot be reached, the form shows an error. There is no in-memory submission fallback.
