# Appwrite setup

The frontend writes directly to Appwrite. Create one database and three collections in the self-hosted Appwrite project.

In project `6aa5f4880020ee2b7f5b`, the database named `skillify_genius_db` has ID `6aa5fbd8001e67a857e3`. Use that **ID**, rather than the display name, for `NEXT_PUBLIC_APPWRITE_DATABASE_ID`. Inside it, create a collection with the exact ID `trial_bookings`, or set `NEXT_PUBLIC_APPWRITE_TRIALS_COLLECTION_ID` to its actual ID. The database and collection names can differ from their IDs. Add the attributes listed below and grant collection-level `Create` to `Any`.

Set the Function variables `TRIAL_DATABASE_ID=6aa5fbd8001e67a857e3` and `TRIAL_COLLECTION_ID=trial_bookings` (or its actual ID). The Function's deployment ID and URL are not database or collection IDs.

To set up the three collections and Telegram Function automatically, create an API key in this project with `databases.read`, `databases.write`, `functions.read`, and `functions.write` scopes. Save it as `APPWRITE_API_KEY=...` in the ignored `scripts/.env` file, then run `node scripts/setup-appwrite.mjs` from the repository root. The script reads the IDs in `frontend/.env`, creates any missing collection attributes, grants only public Create permission, sets the Function's event and database variables, and redeploys it if its settings changed. If the project has multiple Functions, set `APPWRITE_TRIAL_FUNCTION_ID` in `scripts/.env` as well. Never put the API key in `frontend/.env` or any `NEXT_PUBLIC_` variable.

## Frontend environment mapping

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | HTTPS Appwrite API endpoint ending in `/v1` |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Public Appwrite project ID |
| `NEXT_PUBLIC_APPWRITE_PROJECT_NAME` | Optional display label; not used for API requests |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Database containing the three collections |
| `NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID` | Course registration collection |
| `NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION_ID` | Contact inquiry collection |
| `NEXT_PUBLIC_APPWRITE_TRIALS_COLLECTION_ID` | 1:1 assessment collection |

Add the local and production frontend origins as Web platforms in the Appwrite Console so browser requests pass CORS. Do not put an Appwrite API key or Telegram bot token in any `NEXT_PUBLIC_` variable.

## Collection permissions

Grant `Create` to `Any` on each submission collection so visitors without accounts can send forms. Do not grant public `Read`, `Update`, or `Delete`. The frontend sends empty document permissions, so submissions stay private. Public create access can attract spam; monitor usage and add abuse controls if needed.

## `course_registrations`

| Attribute | Type | Required | Size |
| --- | --- | --- | --- |
| `id` | string | yes | 64 |
| `studentName` | string | yes | 80 |
| `parentName` | string | yes | 80 |
| `phone` | string | yes | 30 |
| `email` | email/string | no | 255 |
| `courseSlug` | string | yes | 120 |
| `message` | string | no | 500 |
| `status` | enum (`new`) | yes | — |
| `createdAt` | datetime/string | yes | — |

## `leads`

| Attribute | Type | Required | Size |
| --- | --- | --- | --- |
| `id` | string | yes | 64 |
| `fullName` | string | yes | 80 |
| `email` | email/string | yes | 255 |
| `phone` | string | no | 30 |
| `subject` | string | yes | 120 |
| `message` | string | yes | 1000 |
| `status` | enum (`new`) | yes | — |
| `createdAt` | datetime/string | yes | — |

## `trial_bookings` — free 1:1 assessment requests

| Attribute | Type | Required | Size |
| --- | --- | --- | --- |
| `id` | string | yes | 64 |
| `parentName` | string | yes | 80 |
| `studentName` | string | yes | 80 |
| `studentAge` | integer | yes | — |
| `email` | email/string | yes | 255 |
| `phone` | string | yes | 30 |
| `courseSlug` | string | yes | 120 |
| `preferredDate` | string | yes | 10 |
| `preferredTime` | string | yes | 120 |
| `timezone` | string | yes | 80 |
| `message` | string | no | 500 |
| `status` | enum (`pending`) | yes | — |
| `createdAt` | datetime/string | yes | — |

The trial form sends a full preferred-time description, so do not configure `preferredTime` as a morning/afternoon/evening enum. All forms write directly to Appwrite; there is no in-memory submission fallback.

## Telegram Function

Deploy [`functions/telegram-trial-alert/src/main.js`](../functions/telegram-trial-alert/src/main.js) as an Appwrite Function using a supported Node.js 18+ runtime. For a Git deployment, set the root directory to `functions/telegram-trial-alert` and the entrypoint to `src/main.js`. It needs no npm dependencies or Appwrite API key. In Function Settings → Events, select only the document-create event for this database and the `trial_bookings` collection. Leave public execute access empty.

Set these variables on the Function, mark the bot token secret where supported, and redeploy after changing variables:

| Variable | Value |
| --- | --- |
| `TRIAL_DATABASE_ID` | Same database ID as the frontend |
| `TRIAL_COLLECTION_ID` | `trial_bookings`, or your chosen collection ID |
| `TELEGRAM_BOT_TOKEN` | BotFather token, kept secret |
| `TELEGRAM_CHAT_ID` | Numeric Telegram group chat ID; this is not the public contact phone number |

Add the bot to the target Telegram group and allow it to post messages. Set `TELEGRAM_CHAT_ID` to that group's chat ID, not to the bot's token, your phone number, or the public Telegram contact link. The Function sends the parent's contact details, course, preferred date/time, timezone, and booking ID. It excludes the student's name, age, and free-text message. Telegram delivery happens after Appwrite saves the booking; check Function executions for failures and handle any missed bookings from the stored document. If the group uses forum topics and the alert must go to a specific topic, the Function will also need that topic's thread ID.

For self-hosted Appwrite, ensure a Node.js function runtime is enabled and the Function container can reach `api.telegram.org` over HTTPS.

## Troubleshooting a 404 on trial submission

If the browser's document-create request returns `database_not_found`, the value of `NEXT_PUBLIC_APPWRITE_DATABASE_ID` does not exist in the selected Appwrite project. Confirm the project ID and copy the exact database ID from the Console. If the response is `collection_not_found`, check `NEXT_PUBLIC_APPWRITE_TRIALS_COLLECTION_ID` inside that database. Restart the local Next.js server after changing `frontend/.env`, or rebuild and redeploy the hosted frontend. A successful document save is required before the Telegram Function can run.
