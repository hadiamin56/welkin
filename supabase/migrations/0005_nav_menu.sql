-- Configurable navigation: top-level categories, each optionally containing
-- sub-items. A category with no items renders as a plain link (using its own
-- href). A category with items renders as a dropdown menu.

create table if not exists nav_categories (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists nav_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references nav_categories(id) on delete cascade,
  label text not null,
  href text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table nav_categories enable row level security;
alter table nav_items enable row level security;

create policy "public read nav_categories" on nav_categories for select using (is_published = true);
create policy "admin all nav_categories" on nav_categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read nav_items" on nav_items for select using (is_published = true);
create policy "admin all nav_items" on nav_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Seed a sensible default menu structure, grouping the site's existing pages.
do $$
declare
  about_id uuid;
  community_id uuid;
  resources_id uuid;
begin
  insert into nav_categories (label, href, sort_order) values ('Home', '/', 1) on conflict do nothing;

  insert into nav_categories (label, href, sort_order) values ('About', '', 2)
    returning id into about_id;
  insert into nav_items (category_id, label, href, sort_order) values
    (about_id, 'About Us', '/about', 1),
    (about_id, 'Academics', '/academics', 2);

  insert into nav_categories (label, href, sort_order) values ('Admissions', '/admissions', 3) on conflict do nothing;

  insert into nav_categories (label, href, sort_order) values ('Community', '', 4)
    returning id into community_id;
  insert into nav_items (category_id, label, href, sort_order) values
    (community_id, 'Achievements', '/achievements', 1),
    (community_id, 'Gallery', '/gallery', 2),
    (community_id, 'Events', '/events', 3),
    (community_id, 'Alumni', '/alumni', 4);

  insert into nav_categories (label, href, sort_order) values ('Resources', '', 5)
    returning id into resources_id;
  insert into nav_items (category_id, label, href, sort_order) values
    (resources_id, 'Notifications', '/notifications', 1),
    (resources_id, 'Results', '/results', 2),
    (resources_id, 'Mandatory Disclosures', '/mandatory-disclosures', 3);

  insert into nav_categories (label, href, sort_order) values ('Contact', '/contact', 6) on conflict do nothing;
end $$;
