-- SRM Welkin website content schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

-- Generic key/value site settings (school name, phone, email, address, social links, hero copy, about copy, etc.)
create table if not exists site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

-- Hero / banner slides shown on the homepage
create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null default '',
  image_url text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Scrolling notice-board / notifications
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  attachment_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Homepage stat counters (e.g. "200+ Teachers")
create table if not exists stat_counters (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  start_value int not null default 0,
  end_value int not null default 0,
  suffix text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Staff / faculty leaderboard
create table if not exists staff_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text not null default '',
  photo_url text not null default '',
  bio text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Achievements / award gallery
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  image_url text not null,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- General photo gallery
create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  caption text not null default '',
  image_url text not null,
  category text not null default 'campus',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Results (exam results per class/session)
create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  class_name text not null default '',
  session text not null default '',
  file_url text not null default '',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Mandatory public disclosure documents
create table if not exists disclosures (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Alumni entries
create table if not exists alumni (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  batch text not null default '',
  photo_url text not null default '',
  message text not null default '',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Contact form submissions
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null default '',
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Admission enquiry submissions
create table if not exists admission_enquiries (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  parent_name text not null default '',
  class_applying text not null default '',
  phone text not null default '',
  email text not null default '',
  message text not null default '',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table site_settings enable row level security;
alter table hero_slides enable row level security;
alter table notifications enable row level security;
alter table stat_counters enable row level security;
alter table staff_members enable row level security;
alter table achievements enable row level security;
alter table gallery_images enable row level security;
alter table results enable row level security;
alter table disclosures enable row level security;
alter table alumni enable row level security;
alter table contact_messages enable row level security;
alter table admission_enquiries enable row level security;

-- Public (anon) can read published content
create policy "public read site_settings" on site_settings for select using (true);
create policy "public read hero_slides" on hero_slides for select using (is_published = true);
create policy "public read notifications" on notifications for select using (is_published = true);
create policy "public read stat_counters" on stat_counters for select using (true);
create policy "public read staff_members" on staff_members for select using (is_published = true);
create policy "public read achievements" on achievements for select using (is_published = true);
create policy "public read gallery_images" on gallery_images for select using (is_published = true);
create policy "public read results" on results for select using (is_published = true);
create policy "public read disclosures" on disclosures for select using (is_published = true);
create policy "public read alumni" on alumni for select using (is_published = true);

-- Anyone can submit contact / admission forms (insert only)
create policy "public insert contact_messages" on contact_messages for insert with check (true);
create policy "public insert admission_enquiries" on admission_enquiries for insert with check (true);

-- Authenticated (admin) users can do everything
create policy "admin all site_settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all hero_slides" on hero_slides for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all notifications" on notifications for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all stat_counters" on stat_counters for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all staff_members" on staff_members for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all achievements" on achievements for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all gallery_images" on gallery_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all results" on results for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all disclosures" on disclosures for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all alumni" on alumni for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all contact_messages" on contact_messages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all admission_enquiries" on admission_enquiries for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage bucket for media uploads
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects for select using (bucket_id = 'media');
create policy "admin write media" on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin update media" on storage.objects for update using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin delete media" on storage.objects for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
