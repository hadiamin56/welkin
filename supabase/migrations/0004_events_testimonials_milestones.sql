-- Events calendar, testimonials and "Our Journey" milestones.

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  event_date date not null,
  event_time text not null default '',
  location text not null default '',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  quote text not null default '',
  photo_url text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists milestones (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title text not null,
  description text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table events enable row level security;
alter table testimonials enable row level security;
alter table milestones enable row level security;

create policy "public read events" on events for select using (is_published = true);
create policy "admin all events" on events for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read testimonials" on testimonials for select using (is_published = true);
create policy "admin all testimonials" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read milestones" on milestones for select using (is_published = true);
create policy "admin all milestones" on milestones for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Enable realtime for live notification toasts on the public site
do $$
begin
  alter publication supabase_realtime add table notifications;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;

insert into events (title, description, event_date, event_time, location) values
  ('Annual Sports Day', 'A full day of athletics, team games and prize distribution for all classes.', current_date + interval '20 days', '9:00 AM', 'Main Playground'),
  ('Parent-Teacher Meeting', 'Term progress discussion for Classes I–XII.', current_date + interval '10 days', '10:00 AM – 1:00 PM', 'Respective Classrooms'),
  ('Annual Day Celebration', 'Cultural performances, awards and the annual school showcase.', current_date + interval '45 days', '4:00 PM', 'Multipurpose Hall')
on conflict do nothing;

insert into testimonials (name, role, quote, sort_order) values
  ('Bilal Ahmad', 'Parent, Class VIII', 'The individual attention my daughter gets here is remarkable. The teachers genuinely care about every child''s progress.', 1),
  ('Rukhsana Jan', 'Parent, Class V', 'A perfect balance of academics and values. My son looks forward to school every single day.', 2),
  ('Owais Mattoo', 'Alumnus, Batch of 2019', 'SRM Welkin gave me the foundation and confidence to pursue engineering. Forever grateful to my teachers here.', 3)
on conflict do nothing;

insert into milestones (year, title, description, sort_order) values
  ('2005', 'Foundation Laid', 'SRM Welkin was established to bring quality education to Sopore.', 1),
  ('2010', 'Campus Expansion', 'Growth to seven spacious blocks across 58 kanals of land.', 2),
  ('2015', 'CBSE Accreditation', 'Recognised by CBSE for academic excellence and infrastructure.', 3),
  ('2020', 'Digital Library Launched', 'A fully digitalised library opened for students and staff.', 4),
  ('2025', '5,900+ Students', 'Grew to serve nearly six thousand students across the region.', 5)
on conflict do nothing;
