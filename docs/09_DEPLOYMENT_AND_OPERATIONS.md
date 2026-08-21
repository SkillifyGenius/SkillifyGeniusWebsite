# 09 - Deployment, Operations & Production Runbook

---

## 1. Production Hosting Topology

- **Frontend**: Next.js 15 App Router deployed on **Vercel** or **Cloudflare Pages**.
- **Backend API**: Express REST API (`server/src/index.ts`) running on Node.js 20+ with PM2 or Docker.
- **BaaS Cluster**: Appwrite (`https://api.attanjil.com/v1`, Project ID: `6a888ff500009da26174`).

---

## 2. Environment Variables Specification

```env
# Frontend & Backend
NODE_ENV=production
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://api.attanjil.com/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=6a888ff500009da26174
NEXT_PUBLIC_APPWRITE_PROJECT_NAME="Skillify Genius - EdTech"
NEXT_PUBLIC_APPWRITE_DATABASE_ID=skillify_genius_db
NEXT_PUBLIC_API_URL=https://api.skillifygenius.com/api/v1

# Backend Only (Keep Secret)
APPWRITE_API_KEY="standard_7ee5a7a7783a901a99a6c338..."
PORT=5000
```

---

## 3. Production Deployment Commands

### Dockerfile (Backend Container)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "server"]
```

### PM2 Process Manager
```bash
# Install & build
npm ci --production
npm run build

# Start with PM2
pm2 start "npx tsx server/src/index.ts" --name "skillify-api"
pm2 save
pm2 startup
```

---

## 4. Production Readiness Checklist

- [x] Single consistent light theme across all pages & portals.
- [x] No sensitive API keys bundled into client JavaScript.
- [x] Helmet & Rate limiting enabled on Express API.
- [x] All 22 static and dynamic routes compiled cleanly in Next.js build.
- [x] Automated test suite passed with 0 failures (`npm test`).
- [x] Role authentication & route middleware protection active.
