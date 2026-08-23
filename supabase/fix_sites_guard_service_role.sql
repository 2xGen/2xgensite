-- Allow service_role (webhooks / sync) to update site status.
-- Run in Supabase → SQL Editor.

create or replace function public.sites_guard_operator_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Stripe webhooks & server sync use the service role
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

-- Promote any already-paid waitlist sites
update public.sites s
set status = 'queued',
    updated_at = now()
from public.subscriptions sub
where sub.profile_id = s.profile_id
  and sub.status = 'active'
  and s.status = 'waitlist';
