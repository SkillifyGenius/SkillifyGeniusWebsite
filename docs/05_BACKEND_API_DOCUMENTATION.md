# 05 - Backend REST API Specification

All backend endpoints are rooted at `/api/v1` and served by Express.js (`server/src/index.ts`).

---

## 1. Endpoints Summary Table

| Method | Endpoint | Description | Payload / Query |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server health check & environment info | None |
| `GET` | `/users` | List all users | None |
| `GET` | `/users/:id` | Get specific user by ID | None |
| `GET` | `/student/profiles` | List all student profiles | None |
| `GET` | `/student/profile` | Get active student profile | `?studentId=...` |
| `POST` | `/student/metrics` | Mentor calibration update | `{ studentId, metrics, mentorNotes }` |
| `POST` | `/student/telemetry/calculate` | Recalculate Skill Graph | `{ studentId }` |
| `GET` | `/student/timeline` | Get parent growth timeline | `?studentId=...` |
| `GET` | `/projects` | Get projects list | `?status=verified` (optional) |
| `GET` | `/projects/:slug` | Get project by slug | None |
| `POST` | `/projects` | Submit student project | Project DTO (validated via Zod) |
| `POST` | `/projects/:id/status`| Update project verification status | `{ status, mentorFeedback, mentorName }` |
| `GET` | `/rca` | List RCA journal logs | `?studentId=...` |
| `POST` | `/rca` | Submit Root Cause Analysis | RCA DTO (validated via Zod) |
| `POST` | `/ai/mentor` | Socratic AI Guidance | `{ studentId, moduleId, codeSnippet, userPrompt, chatHistory }` |
| `GET` | `/courses` | List curriculum tracks | None |
| `GET` | `/courses/:slug` | Course syllabus & outcomes | None |
| `GET` | `/modules` | List curriculum modules | None |
| `GET` | `/modules/:id` | Module detail & initial code | None |
| `GET` | `/trials` | List 1-on-1 trial bookings | None |
| `POST` | `/trials` | Book assessment session | Trial DTO (validated via Zod) |
| `PATCH`| `/trials/:id/status` | Update booking status | `{ status: "confirmed" \| "completed" }` |
| `GET` | `/leads` | List contact inquiries | None |
| `POST` | `/leads` | Submit contact form | Lead DTO (validated via Zod) |
| `GET` | `/reviews` | Get parent verified reviews | None |
| `GET` | `/blog` | List blog thought leadership | None |
| `GET` | `/blog/:slug` | Blog article post | None |
| `GET` | `/admin/analytics` | Real-time platform KPI metrics | None |
| `GET` | `/feedback` | List user feedback | `?role=student` (optional) |
| `POST` | `/feedback` | Submit feedback | `{ userRole, userName, category, message, rating }` |
| `POST` | `/events` | Track telemetry event | `{ eventName, metadata }` |

---

## 2. Dynamic Telemetry Engine Formula

The 6 dimensions of the Skill Graph are calculated algorithmically in `server/src/services/store.ts`:
- **Problem Solving**: `Min(98, 60 + (RCAs * 6) + (Projects * 4))`
- **Self-Learning**: `Min(96, 65 + (RCAs * 7) + (Challenges / 4))`
- **Programming**: `Min(95, 55 + (Projects * 6) + (Challenges / 3))`
- **System Thinking**: `Min(94, 50 + (Phase * 10) + (Projects * 5))`
- **Creativity**: `Min(96, 70 + (Projects * 4))`
- **Engineering Mindset**: `Min(95, 58 + (RCAs * 6) + (Projects * 4))`
