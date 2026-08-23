-- Fix: add missing columns + operator intake RLS/trigger.
-- Run this in Supabase → SQL Editor if you see:
--   record "new" has no field "screenshot_url"

alter table public.sites
  add column if not exists listing_urls text;

alter table public.sites
  add column if not exists screenshot_url text;

comment on column public.sites.listing_urls is
  'Operator-provided Viator/GYG listing URLs (one per line) for build intake';

comment on column public.sites.screenshot_url is
  'Public image URL of the live site preview shown in the operator dashboard';

-- Operators may update their own site row; privileged columns are locked by trigger.
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
