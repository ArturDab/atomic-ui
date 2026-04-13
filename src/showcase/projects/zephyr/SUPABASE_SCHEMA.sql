-- Zephyr – schemat bazy danych
-- Wykonaj w Supabase SQL Editor

-- Klienci
create table clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  slug text not null,
  color text not null default '#0ea5e9',
  status text not null default 'active' check (status in ('active', 'paused')),
  newsletter_count int not null default 0,
  last_sent_at timestamptz,
  next_scheduled timestamptz,
  created_at timestamptz default now(),
  unique(user_id, slug)
);

-- Konfiguracja klienta (1:1)
create table client_configs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients on delete cascade unique not null,
  primary_color text not null default '#0ea5e9',
  secondary_color text not null default '#0284c7',
  font text not null default 'inter',
  logo_url text,
  ai_system_prompt text not null default '',
  ai_guidelines text not null default '',
  utm_presets jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now()
);

-- Sekcje HTML
create table sections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  client_id uuid references clients on delete cascade,  -- null = globalna
  name text not null,
  type text not null check (type in ('header','hero','cta','product','content','divider','footer')),
  description text not null default '',
  html_content text not null default '',
  scope text not null default 'global' check (scope in ('global','client')),
  used_count int not null default 0,
  created_at timestamptz default now()
);

-- Newslettery
create table newsletters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  client_id uuid references clients on delete cascade not null,
  subject text not null,
  preheader text not null default '',
  brief text not null default '',
  html_output text not null default '',
  status text not null default 'draft' check (status in ('draft','generated','exported')),
  sections_used jsonb not null default '[]'::jsonb,
  tokens_used int not null default 0,
  campaign_slug text not null default '',
  created_at timestamptz default now()
);

-- Grafiki newsletterów
create table newsletter_images (
  id uuid primary key default gen_random_uuid(),
  newsletter_id uuid references newsletters on delete cascade not null,
  original_name text not null,
  cf_url text not null,
  size_bytes int not null default 0,
  created_at timestamptz default now()
);

-- RLS policies
alter table clients enable row level security;
alter table client_configs enable row level security;
alter table sections enable row level security;
alter table newsletters enable row level security;
alter table newsletter_images enable row level security;

create policy "Users own their clients"
  on clients for all using (auth.uid() = user_id);

create policy "Users own their client configs"
  on client_configs for all using (
    client_id in (select id from clients where user_id = auth.uid())
  );

create policy "Users own their sections"
  on sections for all using (auth.uid() = user_id);

create policy "Users own their newsletters"
  on newsletters for all using (auth.uid() = user_id);

create policy "Users own their images"
  on newsletter_images for all using (
    newsletter_id in (select id from newsletters where user_id = auth.uid())
  );

-- Trigger: increment newsletter_count po zapisie
create or replace function increment_newsletter_count()
returns trigger as $$
begin
  update clients
  set newsletter_count = newsletter_count + 1,
      last_sent_at = now()
  where id = new.client_id;
  return new;
end;
$$ language plpgsql;

create trigger on_newsletter_exported
  after update of status on newsletters
  for each row
  when (new.status = 'exported' and old.status != 'exported')
  execute function increment_newsletter_count();
