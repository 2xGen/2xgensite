-- Run this once in Supabase → SQL Editor
-- Project: iemgpccgdlwpsrsjuumo

create table if not exists public.acquisitiechecks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  challenge_id text,
  challenge text,
  situation_id text,
  situation text,
  source text not null default 'website'
);

alter table public.acquisitiechecks enable row level security;

-- Anyone can submit (website form)
drop policy if exists "Anyone can insert acquisitiechecks" on public.acquisitiechecks;
create policy "Anyone can insert acquisitiechecks"
  on public.acquisitiechecks
  for insert
  to anon, authenticated
  with check (true);

-- No public reads — view rows only in the Supabase dashboard (or with a secret key)
drop policy if exists "No public select acquisitiechecks" on public.acquisitiechecks;
