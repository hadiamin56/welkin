-- Student leaderboard / top achievers, shown alongside the teacher leaderboard.

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  class_name text not null default '',
  photo_url text not null default '',
  achievement text not null default '',
  score numeric not null default 0,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table students enable row level security;

create policy "public read students" on students for select using (is_published = true);
create policy "admin all students" on students for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into students (name, class_name, achievement, score, sort_order) values
  ('Aarohi Sharma', 'Class XII', 'School Topper — Science Stream', 98.6, 1),
  ('Zain Malik', 'Class XII', 'School Topper — Commerce Stream', 97.2, 2),
  ('Iqra Nazir', 'Class X', 'Board Topper', 98.0, 3),
  ('Danish Rather', 'Class XI', 'District Rank 1 — Mathematics Olympiad', 96.4, 4)
on conflict do nothing;
