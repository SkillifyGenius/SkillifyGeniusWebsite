# 07 - Development Guide & Developer Workflow

---

## 1. Quick Start & Local Execution

```bash
# 1. Install dependencies
npm install

# 2. Run both Frontend (Next.js) & Backend (Express) with LAN preview:
.\run_local.bat
# (Or run concurrently via: npm run dev:all)

# 3. Access URLs:
# - Frontend: http://localhost:3000 (LAN: http://192.168.0.102:3000)
# - Backend:  http://localhost:5000/api/v1/health
```

---

## 2. Core Scripts & Quality Assurance

| Command | Purpose | Target |
| :--- | :--- | :--- |
| `npm run dev` | Start Next.js App Router only | `http://localhost:3000` |
| `npm run server` | Start Express REST API only | `http://localhost:5000` |
| `npm run dev:all` | Start Next.js and Express concurrently | Ports 3000 & 5000 |
| `npm run typecheck`| Run TypeScript compiler without emitting JS | Must exit with 0 errors |
| `npm test` | Run automated telemetry & AI test suite | `tsx --test tests/telemetry.test.ts` |
| `npm run build` | Compile Next.js production bundle | Must exit with 0 errors |

---

## 3. Engineering & Architecture Rules

1. **Strict TypeScript Typing**: Avoid `any` where possible. Domain models must be defined in `src/types/index.ts`.
2. **Component Reusability**: Use components in `src/components/ui/` (`Card`, `Button`, `Badge`, `Input`, `Skeleton`).
3. **No Theme Regressions**: Never add dark mode classes or ad-hoc dark backgrounds. Maintain `#F8FAFC` canvas and `#FFFFFF` cards.
4. **Appwrite Integration**: Keep sensitive API keys inside server environment files (`.env`). Client components should only use `src/lib/appwrite.ts` or fetch via `src/lib/api.ts`.
