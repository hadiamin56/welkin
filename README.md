# SRM Welkin — Website Redesign

A modern, fully admin-controlled rebuild of the SRM Welkin Higher Secondary
School (Sopore) website, built with Next.js, Tailwind CSS and Supabase.

Every piece of content on the public site — school name, logo, contact
details, homepage hero, chairman's message, notifications, stat counters,
staff, achievements, gallery, results, mandatory disclosures and alumni — is
editable from a password-protected `/admin` dashboard. Nothing is hardcoded.

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **Tailwind CSS v4** for styling
- **Supabase** for auth (admin login), Postgres (content) and Storage (image uploads)
- **lucide-react** for icons

## Getting started

```bash
npm install
cp .env.local.example .env.local
```

### 1. Create a Supabase project

Create a free project at [supabase.com](https://supabase.com).

### 2. Run the migrations

In the Supabase SQL editor, run, in order:

1. `supabase/migrations/0001_init.sql` — creates all tables, row-level
   security policies, and the `media` storage bucket.
2. `supabase/migrations/0002_seed.sql` — seeds starter content (site
   settings, stat counters, hero slides, notifications) inferred from the
   original site so the clone isn't empty on first load.
3. `supabase/migrations/0003_students.sql` — creates the Student Leaderboard
   table and seeds a few sample top achievers.
4. `supabase/migrations/0004_events_testimonials_milestones.sql` — creates
   the Events Calendar, Testimonials and "Our Journey" milestones tables,
   seeds sample content, and enables Supabase Realtime on `notifications`
   (used for the live notification toasts).
5. `supabase/migrations/0005_nav_menu.sql` — creates the configurable
   navigation menu tables (`nav_categories`, `nav_items`) and seeds a
   default menu structure grouping the existing pages.

### 3. Create an admin user

In Supabase → Authentication → Users, add a user with an email and
password. Any authenticated user can access `/admin` — there's currently a
single admin role.

### 4. Configure environment variables

Copy your Project URL and publishable key from Supabase → Settings → API
into `.env.local` (Supabase's newer `sb_publishable_...` key works the same
way the legacy anon key used to — just under a new name):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

### 5. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` to sign in to the dashboard.

Without Supabase configured, the public site still renders with sensible
built-in defaults, and `/admin` shows setup instructions instead of erroring.

## Admin dashboard

- **Site Settings** — school name, logo, contact info, social links, hero
  copy, chairman's message, About page copy, Admissions copy.
- **Navigation — Categories / Items** — the header menu itself. A category
  with no sub-items renders as a plain link; a category with sub-items
  renders as a dropdown. Add, remove, rename or re-nest any menu entry from
  here — nothing about the nav bar is hardcoded.
- **Hero Slides**, **Notifications**, **Events Calendar**, **Stat
  Counters**, **Teacher Leaderboard**, **Student Leaderboard**,
  **Achievements**, **Gallery**, **Testimonials**, **Our Journey**
  (milestones), **Results**, **Disclosures**, **Alumni** — full CRUD with
  image upload (stored in Supabase Storage) or a pasted URL. Lists with a
  `sort_order` field can be reordered by dragging.
- **Messages** — contact form and admission enquiry submissions from the
  public site, plus a 7-day submissions chart and recent-activity feed on
  the dashboard home.

## Modern features

- **Events calendar** — homepage strip + full `/events` page, admin-managed.
- **Testimonials carousel** — auto-rotating parent/alumni quotes on the homepage.
- **"Our Journey" timeline** — animated milestones on the About page.
- **Scroll-reveal & route transitions** — sections fade in on scroll; page
  content crossfades on navigation; a top progress bar shows during route
  changes.
- **Configurable navigation** — the header menu is fully admin-managed
  (see Admin dashboard above): categories, dropdowns and links are all
  editable, reorderable and extensible without touching code.
- **Live notifications** — new notices published from the admin panel appear
  as an instant toast + unread badge on the bell icon via Supabase Realtime.
- **Command palette (⌘K / Ctrl+K)** — fuzzy search across pages,
  notifications, results and achievements.
- **Structured data** — JSON-LD `EducationalOrganization` markup for richer
  search results.
- **PWA support** — installable with a manifest and offline caching for the
  homepage and notice board via a service worker (`public/sw.js`, only
  active in production builds).

## Project structure

```
src/app/                 Public pages (home, about, admissions, ...)
src/app/admin/           Admin dashboard (protected by middleware)
src/components/site/     Public site UI (header, footer, hero, etc.)
src/components/admin/    Reusable admin CRUD components
src/lib/queries.ts       Server-side content fetchers with built-in defaults
src/lib/admin-actions.ts Server actions used by the admin dashboard
supabase/migrations/     SQL schema + seed data
```
