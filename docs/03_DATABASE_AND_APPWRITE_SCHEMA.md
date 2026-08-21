# 03 - Database Architecture & Appwrite BaaS Schema

---

## 1. Appwrite Configuration

- **Endpoint**: `https://api.attanjil.com/v1`
- **Project ID**: `6a888ff500009da26174` (`Skillify Genius - EdTech`)
- **Database ID**: `skillify_genius_db`
- **API Key**: Configured in `APPWRITE_API_KEY` (Server-side only)

---

## 2. The 7 Appwrite Collections & Domain Schemas

### 2.1 `users`
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String (UUID) | Yes | Primary key |
| `userId` | String | Yes | Role-based identifier (e.g. `student-101`) |
| `name` | String | Yes | Full display name |
| `email` | String | Yes | User email address |
| `role` | Enum (`student`, `parent`, `mentor`, `admin`) | Yes | Role permissions |
| `studentId` | String | Optional | Linked student profile ID |
| `createdAt` | ISO DateTime | Yes | Record creation timestamp |

### 2.2 `student_profiles`
| Field | Type | Description |
| :--- | :--- | :--- |
| `studentId` | String | Unique student ID |
| `studentName` | String | Student name |
| `age` | Integer | Student age (6-18) |
| `currentPhase` | Integer | Active curriculum phase (1-4) |
| `level` | String | Engineering badge level |
| `learningPath` | String | Selected curriculum track |
| `verifiedProjectsCount` | Integer | Number of verified capstones |
| `challengesSolved` | Integer | Number of completed challenges |
| `strengths` | Array[String] | Demonstrated capabilities |
| `focusAreas` | Array[String] | Current target improvement areas |
| `recentMentorNotes` | String | Latest qualitative mentor observations |
| `isAtRisk` | Boolean | True if extra 1:1 attention is required |
| `atRiskReason` | String | Diagnostic notes for mentor |

### 2.3 `skill_telemetry`
| Field | Type | Description |
| :--- | :--- | :--- |
| `studentId` | String | Target student |
| `problemSolving` | Integer (0-100) | Algorithmic & decomposition score |
| `selfLearning` | Integer (0-100) | Research & hint independence score |
| `programming` | Integer (0-100) | Code syntax & assertion score |
| `systemThinking` | Integer (0-100) | Cloud architecture & data flow score |
| `creativity` | Integer (0-100) | Project uniqueness & mechanics score |
| `engineeringMindset` | Integer (0-100) | RCA depth & test coverage score |
| `updatedAt` | ISO DateTime | Last calculated timestamp |

### 2.4 `projects`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Project ID |
| `title` | String | Project title |
| `slug` | String | URL slug |
| `studentId` | String | Submitting student |
| `phase` | Integer | Curriculum phase (1-4) |
| `description` | String | Project architecture summary |
| `skillsDemonstrated`| Array[String]| Applied technical skills |
| `demoUrl` | URL String | Live deployed web app link |
| `repoUrl` | URL String | GitHub repository link |
| `status` | Enum (`submitted`, `under_review`, `approved`, `verified_capstone`)| Verification state |
| `mentorFeedback` | String | Qualitative review note |
| `mentorName` | String | Reviewing mentor name |

### 2.5 `rca_journal` (Root Cause Analysis)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | RCA record ID |
| `studentId` | String | Author student ID |
| `moduleId` | String | Associated curriculum module |
| `bugSummary` | String | What failed or threw errors |
| `rootCause` | String | Why the bug occurred |
| `solution` | String | How it was fixed |
| `preventionLearned` | String | Engineering habit learned |

### 2.6 `trial_bookings`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Booking ID |
| `parentName` | String | Parent full name |
| `parentEmail` | String | Parent email address |
| `parentPhone` | String | Phone with country code |
| `childName` | String | Student name |
| `childAge` | Integer | Student age (6-18) |
| `timezone` | String | Preferred timezone |
| `preferredSlot` | ISO DateTime | Scheduled trial timestamp |
| `interests` | Array[String] | Focus topics selected |
| `status` | Enum (`pending`, `confirmed`, `completed`, `cancelled`) | Booking CRM state |

### 2.7 `product_feedback` & `events`
- `product_feedback`: User role, category, message, rating.
- `events`: Lightweight event tracking (`homepage_visit`, `trial_click`, `pathfinder_complete`, `project_submit`).
