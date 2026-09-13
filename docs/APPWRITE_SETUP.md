# Appwrite setup

The frontend writes directly to Appwrite. Create one database and three collections in the self-hosted Appwrite project.

## Frontend environment mapping

| Variable | Purpose |
| --- | --- |
| `VITE_APPWRITE_ENDPOINT` | HTTPS Appwrite API endpoint ending in `/v1` |
| `VITE_APPWRITE_PROJECT_ID` | Public Appwrite project ID |
| `VITE_APPWRITE_PROJECT_NAME` | Optional display label; not used for API requests |
| `VITE_APPWRITE_DATABASE_ID` | Database containing the three collections |
| `VITE_APPWRITE_REGISTRATIONS_COLLECTION_ID` | Course registration collection |
| `VITE_APPWRITE_LEADS_COLLECTION_ID` | Contact inquiry collection |
| `VITE_APPWRITE_TRIALS_COLLECTION_ID` | 1:1 assessment collection |

Add the local and production frontend origins as Web platforms in the Appwrite Console so browser requests pass CORS. Do not put an Appwrite API key or Telegram bot token in any `VITE_` variable.

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
