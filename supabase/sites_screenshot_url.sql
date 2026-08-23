-- Add screenshot preview URL for live operator sites (dashboard + admin).
-- Safe to run on existing projects.

alter table public.sites
  add column if not exists screenshot_url text;

comment on column public.sites.screenshot_url is
  'Public image URL of the live site preview shown in the operator dashboard';
