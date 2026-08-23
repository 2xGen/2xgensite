-- Operator SaaS: profiles, sites, subscriptions, tracking links + clicks
-- Run in Supabase → SQL Editor after enabling Email auth in Authentication settings.

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  company text,
  role text not null default 'operator' check (role in ('operator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Operator product sites (one per operator for v1)
create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'waitlist'
    check (status in ('waitlist', 'queued', 'building', 'live')),
  destination text,
  domain text,
  public_url text,
  screenshot_url text,
  listing_urls text,
  notes text,
  operator_ideas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists sites_one_per_profile on public.sites (profile_id);

-- Existing projects: create table if not exists won't add new columns
alter table public.sites add column if not exists screenshot_url text;
alter table public.sites add column if not exists listing_urls text;
alter table public.sites add column if not exists operator_ideas text;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles (id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'inactive'
    check (status in ('inactive', 'active', 'past_due', 'canceled')),
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions
  add column if not exists cancel_at_period_end boolean not null default false;

create table if not exists public.tracking_links (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites (id) on delete cascade,
  code text not null unique,
  label text not null default 'Booking link',
  destination_url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tracking_links_site_id_idx on public.tracking_links (site_id);
create index if not exists tracking_links_code_idx on public.tracking_links (code);

create table if not exists public.link_clicks (
  id uuid primary key default gen_random_uuid(),
  tracking_link_id uuid not null references public.tracking_links (id) on delete cascade,
  clicked_at timestamptz not null default now(),
  user_agent text,
  referer text
);

create index if not exists link_clicks_link_id_clicked_at_idx
  on public.link_clicks (tracking_link_id, clicked_at desc);

-- Auto-create profile + waitlist site + inactive subscription on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_list text := coalesce(current_setting('app.admin_emails', true), '');
  is_admin boolean := false;
  user_role text := 'operator';
begin
  -- Promote emails listed in Supabase custom setting, or common founder email via env sync:
  -- Prefer checking raw_user_meta_role or a simple hard-coded allowlist in SQL is avoided;
  -- use metadata: new.raw_user_meta_data->>'role' = 'admin' only if set server-side.
  if coalesce(new.raw_user_meta_data->>'role', '') = 'admin' then
    user_role := 'admin';
  end if;

  insert into public.profiles (id, email, full_name, company, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'company', ''),
    user_role
  );

  if user_role = 'operator' then
    insert into public.sites (profile_id, status, destination)
    values (
      new.id,
      'waitlist',
      coalesce(new.raw_user_meta_data->>'destination', '')
    );

    insert into public.subscriptions (profile_id, status)
    values (new.id, 'inactive');
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helpers
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

create or replace function public.owns_site(site uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.sites s
    where s.id = site and s.profile_id = auth.uid()
  );
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.sites enable row level security;
alter table public.subscriptions enable row level security;
alter table public.tracking_links enable row level security;
alter table public.link_clicks enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

drop policy if exists "sites_select_own_or_admin" on public.sites;
create policy "sites_select_own_or_admin"
  on public.sites for select
  to authenticated
  using (profile_id = auth.uid() or public.is_admin());

drop policy if exists "sites_update_admin" on public.sites;
drop policy if exists "sites_update_own_or_admin" on public.sites;
create policy "sites_update_own_or_admin"
  on public.sites for update
  to authenticated
  using (profile_id = auth.uid() or public.is_admin())
  with check (profile_id = auth.uid() or public.is_admin());

create or replace function public.sites_guard_operator_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(auth.jwt() ->> 'role', '') = 'service_role' then
    return new;
  end if;

  if public.is_admin() then
    return new;
  end if;

  if new.profile_id is distinct from old.profile_id
     or new.status is distinct from old.status
     or new.domain is distinct from old.domain
     or new.public_url is distinct from old.public_url
     or new.screenshot_url is distinct from old.screenshot_url
  then
    raise exception 'Operators can only update destination and listing details';
  end if;

  return new;
end;
$$;

drop trigger if exists sites_guard_operator_update on public.sites;
create trigger sites_guard_operator_update
  before update on public.sites
  for each row
  execute function public.sites_guard_operator_update();

drop policy if exists "sites_insert_admin" on public.sites;
create policy "sites_insert_admin"
  on public.sites for insert
  to authenticated
  with check (public.is_admin() or profile_id = auth.uid());

drop policy if exists "subscriptions_select_own_or_admin" on public.subscriptions;
create policy "subscriptions_select_own_or_admin"
  on public.subscriptions for select
  to authenticated
  using (profile_id = auth.uid() or public.is_admin());

drop policy if exists "subscriptions_update_admin" on public.subscriptions;
create policy "subscriptions_update_admin"
  on public.subscriptions for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "tracking_links_select_own_or_admin" on public.tracking_links;
create policy "tracking_links_select_own_or_admin"
  on public.tracking_links for select
  to authenticated
  using (public.owns_site(site_id) or public.is_admin());

drop policy if exists "tracking_links_admin_write" on public.tracking_links;
create policy "tracking_links_admin_write"
  on public.tracking_links for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "link_clicks_select_own_or_admin" on public.link_clicks;
create policy "link_clicks_select_own_or_admin"
  on public.link_clicks for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.tracking_links tl
      join public.sites s on s.id = tl.site_id
      where tl.id = link_clicks.tracking_link_id
        and s.profile_id = auth.uid()
    )
  );

-- Click inserts happen via service role in Next.js /go route (bypasses RLS).
-- Optional: allow anon insert if you prefer not to use service role:
-- create policy "link_clicks_insert_anon" on public.link_clicks for insert to anon, authenticated with check (true);

comment on table public.sites is 'Operator product site lifecycle: waitlist → queued → building → live';
comment on table public.tracking_links is 'Short codes for /go/[code] → destination_url with click logging';
