# Tracked booking redirects

Operators’ microsites should use tracked URLs instead of raw Viator/GYG links:

```
{NEXT_PUBLIC_TRACKING_BASE_URL}/go/{code}
```

Default base: `https://2xgen.com`

Example: `https://2xgen.com/go/abc12345` → logs a click → 302 to the Viator listing.

## Setup

1. Run [`supabase/operator_saas.sql`](../supabase/operator_saas.sql) in the Supabase SQL editor.
2. Enable Email auth in Supabase → Authentication.
3. Set `ADMIN_EMAILS` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
4. Create a Stripe Product/Price ($249/year) and set `STRIPE_PRICE_ID_ANNUAL`.
5. Point Stripe webhook to `https://your-domain/api/stripe/webhook` for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## Moving to a short domain later

You do **not** need a short domain for v1.

When you want one (e.g. `go.2xgen.com` or a vanity TLD):

1. Point the domain’s DNS at the same Next.js deployment (Vercel domain add).
2. Set `NEXT_PUBLIC_TRACKING_BASE_URL=https://your-short-domain` (no trailing slash).
3. New links copied from admin will use the new host. Existing pasted links on live microsites should be updated to match.

The `/go/[code]` route stays the same; only the public hostname changes.
