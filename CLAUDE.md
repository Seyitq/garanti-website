# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build
npm run lint     # eslint
npx prisma migrate dev --name <name>   # new migration (dev only)
npx prisma migrate deploy              # apply migrations (prod)
npx prisma studio                      # DB GUI
```

No test framework is installed.

## Architecture

**Garanti İş Makineleri** — Türkçe kurumsal web sitesi, Ankara merkezli iş makinesi yedek parça satıcısı. Stack: Next.js 16 App Router, React 19, TypeScript, Prisma 6 (SQLite dev), Tailwind v4.

### Route Groups

| Group | Path | Auth |
|---|---|---|
| Public site | `src/app/(public)/` | None |
| Admin panel | `src/app/admin/(dashboard)/` | JWT cookie |
| Admin login | `src/app/admin/giris/` | None |
| API | `src/app/api/` | JWT (per route) |

### Auth — Custom JWT (NOT NextAuth)

Auth is handled with `jose` library, **not** NextAuth. Session lives in an httpOnly cookie `admin_token` (8h TTL).

```typescript
// Protecting server components / layouts
import { getSession } from '@/lib/auth';
const session = await getSession();
if (!session) redirect('/admin/giris');

// Protecting API routes
import { requireAuth } from '@/lib/auth';
const session = await requireAuth(['super_admin', 'editor']); // throws on fail
```

Roles: `super_admin` · `editor` · `viewer`

Brute-force protection built into `/api/auth`: 5 failed attempts → 15-min lockout, tracked in `User.failedAttempts` / `User.lockedUntil`.

### Data Layer

No service/repo layer — API routes call Prisma directly from `src/lib/prisma.ts` (singleton). Public Server Components also query Prisma directly.

Prisma client is generated to `src/generated/prisma/` (not the default location). After schema changes run `npx prisma generate`.

### Key Utilities (`src/lib/constants.ts`)

- `getStockInfo(quantity)` — returns label + CSS class for stock badges
- `slugify(text)` — Turkish-aware slug generator (ç→c, ğ→g, etc.)
- `getWhatsAppUrl(name?, code?)` — builds WhatsApp deep link with pre-filled message
- `COLORS` — brand color tokens (`primary: #0057A8`, `accent: #F5A800`)

### Image Uploads

`POST /api/upload` saves files to `public/uploads/` on the local filesystem. Returns `{ url: "/uploads/<uuid>.ext" }`. No cloud storage.

### Public Product URLs

`/urunler/[brand]/[category]/[slug]` — slugs are unique per `(brandId, categoryId, slug)` composite.

### Data Model Highlights

- `Product` — belongs to `Brand` + `Category`, has `ProductImage[]`, `ProductSpec[]`, `ProductAttribute[]`
- `FilterGroup` ↔ `Category` via `FilterGroupCategory` join table — drives faceted filtering on catalog page
- `SiteSetting` — key/value table for site-wide config
- `compatibleModels` stored as comma-separated string on `Product`

### Environment Variables

| Variable | Side |
|---|---|
| `DATABASE_URL` | Server |
| `JWT_SECRET` | Server |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Client |
| `NEXT_PUBLIC_SITE_URL` | Client |
