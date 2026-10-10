# Anra Social Media Management CRM

Agency CRM for managing clients, content calendars, design approvals, uploads, packages, and audit logs across Admin, Graphic Designer, Social Media Marketer, and Manager roles.

## What's included

- **Frontend** (`/src`) — React 18 + Vite + Tailwind, running fully on mock data out of the box (`src/data/mockData.js`), so `npm run dev` works immediately with zero setup.
- **Backend** (`/backend`) — Express API with routes for clients, posts (calendar/workflow), notifications, and reports, wired for Supabase via the service-role key.
- **Database** (`/supabase/schema.sql`) — Full Postgres schema for all 11 tables from the spec (users, clients, packages, posts, designs, uploads, notifications, media_library, audit_logs), with row-level security policies and a trigger that auto-notifies Admins when a package is within 5 days of expiry.

## Quick start (frontend only, mock data)

```bash
npm install
npm run dev
```

Open http://localhost:5173 — login screen lets you pick any of the 5 demo users to preview each role (Admin, 2x Graphic Designer, Social Media Marketer, Manager). The role switcher in the top bar lets you swap roles live without logging out.

## Going to production (real data)

1. **Create a Supabase project** at supabase.com.
2. **Run the schema** — paste `supabase/schema.sql` into the Supabase SQL editor and run it. This creates all tables, indexes, RLS policies, and the package-expiry trigger.
3. **Set up Supabase Auth** — create users in Supabase Auth, then insert matching rows in the `users` table with the same `auth_id`, and assign each a `role`.
4. **Configure environment variables**:
   - Frontend: copy `.env.example` to `.env` and fill in your Supabase URL/anon key.
   - Backend: copy `backend/.env.example` to `backend/.env` and fill in your Supabase URL/service-role key.
5. **Run the backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
6. **Swap mock data for API calls** — the frontend currently reads from `src/data/mockData.js`. Replace those imports with calls to `src/lib/supabaseClient.js` (direct Supabase queries) or your backend's `/api/*` routes (see `backend/routes/`), page by page. Every mock object (`clients`, `posts`, `notifications`, etc.) is already shaped to match the schema, so this is a drop-in swap.
7. **Deploy**: frontend to Vercel (`vercel deploy`), backend to Vercel Serverless Functions or Railway/Render, database stays on Supabase.

## Project structure

```
src/
  components/     Sidebar, Topbar, Layout, shared UI (StatCard, StatusBadge, Progress)
  context/        AuthContext — current user, role switching, permission checks
  data/           mockData.js — swap for live Supabase queries
  lib/            supabaseClient.js — frontend Supabase client
  pages/          One file per module (Dashboard, Clients, Calendar, Scheduler,
                   Graphic Designer, Marketing, Approval, Reports, Audit Logs,
                   Media Library, Notifications, Settings)
backend/
  routes/         clients.js, posts.js, notifications.js, reports.js
  supabaseAdmin.js  Server-side Supabase client (service role key)
  server.js       Express app entry point
supabase/
  schema.sql      Full table + RLS + trigger definitions
```

## Roles implemented

| Role | Access |
|---|---|
| Admin | Everything — users, clients, packages, approvals, audit logs, settings |
| Graphic Designer | Assigned clients, design uploads (PSD/AI/PNG), calendar |
| Social Media Marketer | Approved posts, platform links, mark-as-uploaded, assigned clients |
| Manager | Dashboard, approvals, reports (read-only elsewhere) |

## Notes on what's stubbed vs. wired

- File uploads (design files, media library) show working upload UI but don't yet persist to Supabase Storage — the API calls for that are a small addition to `backend/routes/` using `supabaseAdmin.storage`.
- Email/WhatsApp notifications have toggles in Settings but need a provider (Resend/SendGrid for email, Twilio/WhatsApp Business API for WhatsApp) wired into a Supabase Edge Function or the backend.
- PDF/Excel export buttons in Reports are present but not yet wired to a generation library (`jspdf` / `exceljs` are the natural fits).
