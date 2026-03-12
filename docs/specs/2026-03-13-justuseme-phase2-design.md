# JustUse.me Phase 2 — Auth, Usage Tracking, Payments & Server Tools

## Goal

Add authentication (Supabase + Google OAuth), enforce per-tier usage limits (anonymous 3/day, registered 3/day, Pro unlimited), integrate Stripe Checkout for the $9.9/month Pro plan, and establish the API route infrastructure for future server-side tools. Deploy to Vercel with justuse.me custom domain.

## Context

Phase 1 delivered a fully browser-side toolbox with 27 tools across 5 categories. All tools run client-side — no backend, no auth, no payments. The pricing page and Sign In button exist as UI but link to nonexistent pages. Supabase packages (`@supabase/supabase-js`, `@supabase/ssr`) are installed but not configured.

**Business model:**
- **Anonymous**: 3 tool uses per day (no account needed)
- **Registered (Free)**: 3 tool uses per day
- **Pro ($9.9/month)**: Unlimited uses

**Company**: Paymomentum LLC, Wyoming. Payment via Stripe. Contact: nev901008@gmail.com.

---

## 1. Authentication (Supabase + Google OAuth)

### Approach

Use Supabase Auth with `@supabase/ssr` for Next.js 16 App Router integration. Support Google OAuth as the primary (and initially only) sign-in method — lowest friction for non-technical users.

### Architecture

```
Browser → Supabase Auth (Google OAuth) → JWT session cookie → Next.js middleware
```

**Key decisions:**
- **Cookie-based sessions** via `@supabase/ssr` — works with SSR, SSG, and API routes
- **Google OAuth only** at launch — one-click sign-in, no password management
- **No custom auth pages** — use a modal or inline Supabase UI component on `/auth/login`
- **Middleware** validates session on protected routes (API routes, account page)

### Files

| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Browser Supabase client (singleton) |
| `src/lib/supabase/server.ts` | Server Supabase client (per-request, reads cookies) |
| `src/lib/supabase/middleware.ts` | Session refresh logic for Next.js middleware |
| `src/middleware.ts` | Next.js middleware — refresh session, protect routes |
| `src/context/AuthContext.tsx` | React context providing `user`, `session`, `signIn()`, `signOut()` |
| `src/app/auth/login/page.tsx` | Login page with Google OAuth button |
| `src/app/auth/callback/route.ts` | OAuth callback handler (exchanges code for session) |
| `src/app/api/profile/route.ts` | Safe profile update endpoint (strips protected fields) |
| `src/components/layout/Header.tsx` | Update: show user avatar/name when logged in, Sign Out |

### Supabase Setup

- Create a new Supabase project (or use existing)
- Enable Google OAuth provider in Supabase Dashboard → Authentication → Providers
- Set redirect URL to `https://justuse.me/auth/callback`
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### User Table

Supabase Auth creates `auth.users` automatically. We add a `public.profiles` table for app-specific data:

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  subscription_status TEXT, -- 'active', 'past_due', 'canceled', null
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Row Level Security

```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update only display_name and avatar_url (NOT plan or stripe fields)
-- Plan and stripe fields are only updated by the Stripe webhook via service role client
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- Ensure plan and stripe fields are not being changed by the user
  );
```

**Critical security note:** The UPDATE policy alone cannot restrict individual columns in Supabase RLS. To protect `plan`, `stripe_customer_id`, and `stripe_subscription_id` from client-side modification, all profile updates from the client must go through an API route (`/api/profile`) that strips protected fields before writing. The Stripe webhook handler uses the **service role client** (bypasses RLS) to update plan/stripe fields.

---

## 2. Usage Tracking

### Approach

Track tool uses per day per user (or per anonymous fingerprint). Store in Supabase. Check before allowing tool processing.

### Architecture

```
User clicks "Process" → Client checks usage → If under limit, process → Log usage
                                             → If over limit, show upgrade prompt
```

**Key decisions:**
- **Anonymous tracking**: Use a fingerprint stored in `localStorage` (UUID). Not bulletproof, but sufficient for a soft limit. No need for server-side fingerprinting — this is a friction mechanism, not DRM.
- **Registered users**: Track by `user.id` in Supabase.
- **Pro users**: Skip usage check entirely.
- **Client-side check + server-side log**: Since browser tools run client-side, we can't truly enforce server-side. The check is a courtesy gate. For server-side tools (future), the API route enforces the limit.
- **Daily reset**: Usage resets at midnight UTC.

### Database

```sql
CREATE TABLE public.usage_log (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  anon_id TEXT, -- localStorage UUID for anonymous users
  tool_id TEXT NOT NULL,
  used_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_usage_user_day ON public.usage_log (user_id, used_at);
CREATE INDEX idx_usage_anon_day ON public.usage_log (anon_id, used_at);

ALTER TABLE public.usage_log ENABLE ROW LEVEL SECURITY;

-- Authenticated users: can insert/read their own records only
CREATE POLICY "Auth users can insert own usage"
  ON public.usage_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Auth users can read own usage"
  ON public.usage_log FOR SELECT
  USING (auth.uid() = user_id);
```

**Anonymous usage is handled via API route, not direct Supabase access.** Anonymous users cannot query Supabase directly because RLS cannot securely scope `anon_id` (any anonymous client could read/write any `anon_id`). Instead:

- `POST /api/usage/check` — accepts `{ anon_id, tool_id }`, queries usage via service role client, returns `{ allowed, used, limit }`
- `POST /api/usage/log` — accepts `{ anon_id, tool_id }`, inserts usage via service role client

For authenticated users, the client can query Supabase directly (RLS protects by `auth.uid()`). For anonymous users, the thin API route acts as a trusted proxy.

**Race conditions:** For browser-side tools, the usage check is a courtesy gate — multi-tab abuse is accepted as a trade-off. For server-side tools, the API route uses an atomic INSERT with a subquery check:

```sql
INSERT INTO usage_log (user_id, anon_id, tool_id)
SELECT :user_id, :anon_id, :tool_id
WHERE (SELECT COUNT(*) FROM usage_log
       WHERE (user_id = :user_id OR anon_id = :anon_id)
       AND used_at >= date_trunc('day', now() AT TIME ZONE 'UTC')
      ) < :limit;
```

### Files

| File | Purpose |
|------|---------|
| `src/lib/usage.ts` | `checkUsage(toolId)` and `logUsage(toolId)` — routes to Supabase (auth) or API (anon) |
| `src/lib/anon-id.ts` | Get/create anonymous ID from localStorage |
| `src/app/api/usage/check/route.ts` | Anonymous usage check via service role client |
| `src/app/api/usage/log/route.ts` | Anonymous usage log via service role client |
| `src/components/tool/UsageLimitModal.tsx` | "You've used 3/3 free uses today" prompt with Sign In / Upgrade CTA |
| `src/components/tool/ToolShell.tsx` | Update: check usage before processing, show modal if exceeded |

### Flow

1. User drops file → ToolShell calls `checkUsage(toolId)`
2. If `allowed`: process normally, then call `logUsage(toolId)` on success
3. If `!allowed`: show `UsageLimitModal` instead of processing
   - Anonymous → "Create a free account to keep using" (nudge toward registration)
   - Registered Free → "Upgrade to Pro for unlimited uses"
   - Pro → Never shown

**Note on anonymous vs registered limits:** Both get 3/day. The anonymous limit is a soft gate (localStorage-based, clearable). The value proposition for registering is: persistent identity (usage survives browser clears), access to future features, and a path to Pro. The nudge message encourages registration without promising more free uses.

### Anonymous-to-Registered Migration

When an anonymous user signs up, their `anon_id` usage records are NOT migrated. The registered user starts fresh for the current day. This is intentional — it's a minor gift that simplifies implementation. If they had 2/3 uses as anonymous and sign up, they get 3 fresh uses as a registered user that day.

### Limits

| Tier | Daily Limit |
|------|-------------|
| Anonymous | 3 |
| Free (registered) | 3 |
| Pro | Unlimited |

---

## 3. Payments (Stripe Checkout)

### Approach

Use Stripe Checkout (hosted payment page) for the simplest possible integration. No custom payment form needed. Stripe Webhooks update the user's plan in Supabase.

### Architecture

```
User clicks "Upgrade" → API route creates Stripe Checkout Session → Redirect to Stripe
                       → Stripe Webhook → Update profiles.plan = 'pro'
                       → Stripe handles billing portal for cancellation
```

**Key decisions:**
- **Stripe Checkout** (not Elements) — zero frontend payment UI to build
- **Stripe Customer Portal** for subscription management (cancel, update payment)
- **Webhook** updates plan status — single source of truth
- **$9.9/month** recurring subscription

### Files

| File | Purpose |
|------|---------|
| `src/app/api/stripe/checkout/route.ts` | Creates Stripe Checkout session, returns URL |
| `src/app/api/stripe/webhook/route.ts` | Handles `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated` |
| `src/app/api/stripe/portal/route.ts` | Creates Stripe Customer Portal session for subscription management |
| `src/app/pricing/page.tsx` | Update: "Upgrade to Pro" button calls checkout API |

### Stripe Setup

- Create Stripe account (if not exists)
- Create a Product ("JustUse.me Pro") with a $9.9/month recurring price
- Set webhook endpoint to `https://justuse.me/api/stripe/webhook`
- Listen for: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
- Environment variables: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_ID`

### Webhook Flow

The webhook handler uses the **Supabase service role client** (`SUPABASE_SERVICE_ROLE_KEY`) to bypass RLS and update protected fields (`plan`, `subscription_status`, `stripe_*`).

1. **`checkout.session.completed`**:
   - Extract `supabase_user_id` from `session.metadata`
   - Extract `customer` and `subscription` IDs from the session
   - Upsert `profiles` where `id = supabase_user_id`: set `plan = 'pro'`, `subscription_status = 'active'`, `stripe_customer_id`, `stripe_subscription_id`

2. **`customer.subscription.updated`**:
   - Look up profile by `stripe_subscription_id`
   - Update `subscription_status` to match Stripe status (`active`, `past_due`, `canceled`)
   - If status is `canceled` or `unpaid`, set `plan = 'free'`

3. **`customer.subscription.deleted`**:
   - Look up profile by `stripe_subscription_id`
   - Set `plan = 'free'`, `subscription_status = null`, clear `stripe_subscription_id`

4. **`invoice.payment_failed`** → Log only (no email notifications in Phase 2)

**Idempotency:** All webhook operations are idempotent upserts (SET fields to values, not increments). Stripe retries on failure (up to 3 days), so the handler naturally recovers from transient errors.

### Security

- Webhook signature verification using `STRIPE_WEBHOOK_SECRET` via `stripe.webhooks.constructEvent()`
- Checkout session creation requires authenticated user (check Supabase session in API route)
- Pass `user.id` as `metadata.supabase_user_id` in checkout session for webhook mapping
- Webhook route reads raw body (not JSON-parsed) for signature verification

---

## 4. Server-Side Tool Infrastructure

### Approach

Create API route infrastructure for tools that need server-side processing. Phase 2 establishes the pattern; individual server-side tools will be added incrementally.

**Why server-side tools?**
- Some libraries don't work in browser (e.g., OCR, advanced PDF operations)
- Large file processing may need more memory/CPU than browser allows
- Future tools may need external API calls (e.g., AI-powered tools)

### Architecture

```
Client uploads file → POST /api/tools/[toolId] → Server processes → Returns result blob
```

**Key decisions:**
- **Same ToolPlugin interface** — tools declare `runtime: "server"` instead of `"browser"`
- **ToolShell handles routing** — if `tool.runtime === "server"`, POST to API route instead of calling `process()` directly
- **API routes enforce usage limits** server-side (not just client-side courtesy check)
- **File size limit**: 50MB via Next.js body parser config
- **No server-side tools in Phase 2 scope** — just the infrastructure. First server tool can be added after deployment.

### Files

| File | Purpose |
|------|---------|
| `src/app/api/tools/[toolId]/route.ts` | Generic tool processing endpoint — validates auth, checks usage, runs tool, returns blob |
| `src/lib/tools/server-process.ts` | Server-side tool runner — imports and calls `process()` for server-runtime tools |
| `src/components/tool/ToolShell.tsx` | Update: route server tools to API endpoint |

### API Route: `POST /api/tools/[toolId]`

**Request:** `multipart/form-data` with files + optional JSON options
**Response:** Blob (the processed file) or JSON error

**Flow:**
1. Validate tool exists and `runtime === "server"`
2. Check auth (anonymous allowed but tracked)
3. Check usage limits (server-enforced, atomic INSERT with count check)
4. Run `tool.process(files, options)`
5. Log usage
6. Return result blob with appropriate Content-Type and Content-Disposition

**Rate limiting:** Basic rate limiting via a per-IP in-memory counter (e.g., 30 requests/minute). This is reset on each Vercel cold start, which is acceptable for Phase 2. For heavier abuse protection, Vercel's built-in WAF or a Redis-backed limiter can be added later.

---

## 5. Deployment (Vercel + justuse.me)

### Approach

Deploy to Vercel with custom domain `justuse.me` from Namecheap.

### Steps

1. `vercel link` the project
2. Add environment variables in Vercel Dashboard
3. Add custom domain `justuse.me` in Vercel
4. Update Namecheap DNS: point A record to Vercel's IP, CNAME `www` to `cname.vercel-dns.com`
5. Enable automatic HTTPS

### Environment Variables (Vercel)

```
NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
STRIPE_SECRET_KEY=<stripe-secret>
STRIPE_WEBHOOK_SECRET=<webhook-secret>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<publishable-key>
STRIPE_PRICE_ID=<price-id>
NEXT_PUBLIC_APP_URL=https://justuse.me
```

---

## 6. Updated Header UX

When logged in, the Header changes:

**Logged out:** `Logo — Pricing — [Sign In]`
**Logged in (Free):** `Logo — Pricing — [Avatar ▾]` → dropdown: Account, Upgrade to Pro, Sign Out
**Logged in (Pro):** `Logo — Pricing — [Avatar ▾]` → dropdown: Account, Manage Subscription, Sign Out

The avatar is the Google profile picture. "Manage Subscription" opens Stripe Customer Portal.

---

## Build Order

These must be built in sequence due to dependencies:

1. **Auth** — Supabase config, client/server helpers, middleware, login page, callback, AuthContext, Header update
2. **Usage Tracking** — usage_log table, checkUsage/logUsage, anon-id, UsageLimitModal, ToolShell integration
3. **Payments** — Stripe checkout/webhook/portal API routes, pricing page update, plan-aware usage checks
4. **Server Tool Infrastructure** — API route, server process runner, ToolShell server routing
5. **Deployment** — Vercel setup, DNS, environment variables

---

## Out of Scope

- Email/password auth (Google OAuth only for now)
- Admin dashboard
- Analytics/telemetry
- Email notifications
- Team/org accounts
- Specific server-side tool implementations (just the infrastructure)
- Billing history page (Stripe Customer Portal handles this)
