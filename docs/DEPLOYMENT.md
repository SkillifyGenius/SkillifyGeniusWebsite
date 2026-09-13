# Deployment

## Frontend

Deploy the `frontend` directory to any static host.

```text
Build: npm install && npm run build
Publish: dist
Environment: VITE_APPWRITE_ENDPOINT=https://your-appwrite-host/v1
Environment: VITE_APPWRITE_PROJECT_ID=your_project_id
Environment: VITE_APPWRITE_DATABASE_ID=skillify_genius_db
Environment: VITE_APPWRITE_REGISTRATIONS_COLLECTION_ID=course_registrations
Environment: VITE_APPWRITE_LEADS_COLLECTION_ID=leads
Environment: VITE_APPWRITE_TRIALS_COLLECTION_ID=trial_bookings
Environment: VITE_SITE_URL=https://www.your-site.example.com
```

Enable SPA history fallback to `/index.html`. `vercel.json` and `public/_redirects` cover Vercel and Netlify-style hosts.

## Appwrite and Telegram Function

No Express deployment is needed. Create the three Appwrite collections and grant public create-only permission as described in [APPWRITE_SETUP.md](APPWRITE_SETUP.md). Register both local and production frontend origins as Web platforms in Appwrite.

```text
Function source: functions/telegram-trial-alert/src/main.js
Runtime: supported Node.js 18+
Event: document create in trial_bookings only
Function variables: TRIAL_DATABASE_ID, TRIAL_COLLECTION_ID, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
```

Set the Telegram token and chat ID in Appwrite Function settings, not in the static host environment. Mark the token secret where supported and redeploy the Function after changes. The bot must already have a conversation with the destination chat.

Public frontend values:

```text
VITE_APPWRITE_ENDPOINT=https://your-appwrite-host/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=skillify_genius_db
VITE_APPWRITE_REGISTRATIONS_COLLECTION_ID=course_registrations
VITE_APPWRITE_LEADS_COLLECTION_ID=leads
VITE_APPWRITE_TRIALS_COLLECTION_ID=trial_bookings
```

## Production verification

1. Confirm `/`, `/about`, `/courses`, `/trial`, and `/contact` load when opened directly.
2. Submit a course registration and verify the private document in `course_registrations`.
3. Submit a contact inquiry and verify the private document in `leads`.
4. Submit a trial request and verify the private document in `trial_bookings`.
5. Confirm the Function execution completes and the alert arrives in the intended Telegram chat.
6. Confirm visitors cannot list, read, update, or delete submissions.
7. Confirm the production frontend origin is accepted by Appwrite CORS.
8. Check page metadata, `robots.txt`, `sitemap.xml`, and the Open Graph preview against the final domain.

Do not go live until all three submission flows save successfully in production and the Telegram alert works for a trial booking.
