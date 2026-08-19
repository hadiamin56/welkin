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
- **Hero Slides**, **Notifications**, **Stat Counters**, **Staff**,
  **Achievements**, **Gallery**, **Results**, **Disclosures**, **Alumni** —
  full CRUD with image upload (stored in Supabase Storage) or a pasted URL.
- **Messages** — contact form and admission enquiry submissions from the
  public site.

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
