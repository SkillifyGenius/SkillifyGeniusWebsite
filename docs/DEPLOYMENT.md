# Deployment

## Frontend

Deploy the `frontend` directory to a Next.js-capable host such as Vercel, or run `npm run build` and `npm run start` on a Node.js host. A static-only host cannot serve the dynamic assessment and trial routes.

```text
Root directory: frontend
Framework: Next.js
Build: npm run build
Environment: NEXT_PUBLIC_APPWRITE_ENDPOINT=https://api.attanjil.com/v1
Environment: NEXT_PUBLIC_APPWRITE_PROJECT_ID=6aa5f4880020ee2b7f5b
Environment: NEXT_PUBLIC_APPWRITE_DATABASE_ID=6aa5fbd8001e67a857e3
Environment: NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID=course_registrations
Environment: NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION_ID=leads
Environment: NEXT_PUBLIC_APPWRITE_TRIALS_COLLECTION_ID=trial_bookings
```

Next.js handles routes and metadata directly. Set the production domain to `https://www.skillifygenius.com` or update `SITE_URL` in `frontend/src/lib/site-metadata.ts` if the canonical domain changes. `/courses` is preserved as a direct page.

For a traditional Node.js host, install dependencies at the repository root, set the public Appwrite variables, run `npm run build`, then run `npm run start --workspace @skillify/frontend`. Use Node.js 20 or newer and forward port 3000 through the host's HTTPS reverse proxy. This app needs a Node.js runtime; copying static files to a static-only server is insufficient.

For Docker, build from the repository root with `docker build -f Dockerfile.frontend -t skillify-frontend .` and run with `docker run --rm -p 3000:3000 skillify-frontend`. The Docker build enables Next.js standalone output. Pass any nondefault public Appwrite configuration with `--build-arg NEXT_PUBLIC_APPWRITE_ENDPOINT=...` and the other `NEXT_PUBLIC_APPWRITE_*` build arguments. These values are embedded in the browser bundle at build time. Do not pass server secrets as public variables. The Docker image has not been run locally because Docker is unavailable in this workspace.

## Appwrite and Telegram Function

No Express deployment is needed. Create the three Appwrite collections and grant public create-only permission as described in [APPWRITE_SETUP.md](APPWRITE_SETUP.md). Register both local and production frontend origins as Web platforms in Appwrite.

```text
Function source: functions/telegram-trial-alert/src/main.js
Runtime: supported Node.js 18+
Event: document create in trial_bookings only
Function variables: TRIAL_DATABASE_ID, TRIAL_COLLECTION_ID, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
```

Set the Telegram token and chat ID in Appwrite Function settings, not in the Next.js host environment. Mark the token secret where supported and redeploy the Function after changes. The bot must already have a conversation with the destination chat.

Public frontend values:

```text
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://api.attanjil.com/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=6aa5f4880020ee2b7f5b
NEXT_PUBLIC_APPWRITE_DATABASE_ID=6aa5fbd8001e67a857e3
NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID=course_registrations
NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION_ID=leads
NEXT_PUBLIC_APPWRITE_TRIALS_COLLECTION_ID=trial_bookings
```

## Production verification

1. Confirm `/`, `/courses`, `/blog`, `/about`, `/contact`, `/trial`, `/privacy`, `/safeguarding`, and `/terms` load directly. Check an article URL and the added `/mentorship`, `/programs`, and `/assessment` pages.
2. Create a sample roadmap and check `/journey` shows the stages, weekly goals, skill ratings, portfolio, feedback notes, journal, and AI guidance. The draft is session-only and is not sent to Appwrite.
3. Submit a course registration and verify the private document in `course_registrations`.
4. Submit a contact inquiry and verify the private document in `leads`.
5. Submit a trial request and verify the private document in `trial_bookings`.
6. Confirm the Function execution completes and the alert arrives in the intended Telegram chat.
7. Confirm visitors cannot list, read, update, or delete submissions.
8. Confirm the production frontend origin is accepted by Appwrite CORS.
9. Check page metadata, `robots.txt`, `sitemap.xml`, and the Open Graph preview against the final domain.

Do not go live until registration, contact, and trial submissions save successfully in production and the Telegram alert works for a trial booking.
