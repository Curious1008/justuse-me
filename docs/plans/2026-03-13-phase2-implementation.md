# JustUse.me Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add authentication, usage tracking, Stripe payments, and server-side tool infrastructure to the JustUse.me toolbox.

**Architecture:** Supabase handles auth (Google OAuth) and database (profiles, usage_log). Stripe Checkout handles payments with webhooks updating plan status via Supabase service role. Usage tracking is enforced client-side for browser tools (courtesy gate) and server-side for API tools (atomic check). All wired into the existing Next.js 16 App Router.

**Tech Stack:** Next.js 16, Supabase Auth + PostgreSQL, Stripe Checkout + Webhooks, `@supabase/ssr`, Vercel deployment

**Spec:** `docs/specs/2026-03-13-justuseme-phase2-design.md`

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `src/lib/supabase/client.ts` | Browser-side Supabase client (singleton) |
| `src/lib/supabase/server.ts` | Server-side Supabase client (per-request, cookie-based) |
| `src/lib/supabase/middleware.ts` | Session refresh helper for Next.js middleware |
| `src/middleware.ts` | Refresh auth session on every request |
| `src/context/AuthContext.tsx` | React context: `user`, `profile`, `signIn()`, `signOut()` |
| `src/hooks/useAuth.ts` | Convenience hook wrapping AuthContext |
| `src/lib/anon-id.ts` | Get/create anonymous UUID in localStorage |
| `src/lib/usage.ts` | `checkUsage()` and `logUsage()` — routes auth vs anon |
| `src/app/auth/login/page.tsx` | Login page with Google OAuth button |
| `src/app/auth/callback/route.ts` | OAuth callback (exchange code for session) |
| `src/app/api/usage/check/route.ts` | Anonymous usage check (service role) |
| `src/app/api/usage/log/route.ts` | Anonymous usage log (service role) |
| `src/app/api/stripe/checkout/route.ts` | Create Stripe Checkout session |
| `src/app/api/stripe/webhook/route.ts` | Handle Stripe webhook events |
| `src/app/api/stripe/portal/route.ts` | Create Stripe Customer Portal session |
| `src/app/api/tools/[toolId]/route.ts` | Server-side tool processing endpoint |
| `src/lib/tools/server-process.ts` | Server-side tool runner |
| `src/components/tool/UsageLimitModal.tsx` | Usage limit exceeded modal |
| `src/app/api/profile/route.ts` | Safe profile update (strips protected fields) |
| `.env.local` | Environment variables (not committed) |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Wrap children with `AuthProvider` |
| `src/components/layout/Header.tsx` | Auth-aware: avatar dropdown when logged in |
| `src/components/tool/ToolShell.tsx` | Usage check before processing, server tool routing |
| `src/app/pricing/page.tsx` | Wire Stripe checkout, show current plan |
| `package.json` | Add `stripe` dependency |

---

## Chunk 1: Authentication

### Task 1: Install dependencies and set up environment variables

**Files:**
- Modify: `package.json`
- Create: `.env.local`

- [ ] **Step 1: Install stripe package**

```bash
cd /Users/harry/Desktop/justuse-me && npm install stripe
```

- [ ] **Step 2: Create `.env.local` with placeholder values**

Create `/Users/harry/Desktop/justuse-me/.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_PRICE_ID=price_xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

- [ ] **Step 3: Verify `.env.local` is in `.gitignore`**

Run: `grep -q '.env*.local' .gitignore && echo "OK" || echo "MISSING"`
Expected: OK (Next.js default gitignore includes this)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install stripe dependency"
```

---

### Task 2: Create Supabase client helpers

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`

- [ ] **Step 1: Create browser client**

Create `src/lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] **Step 2: Create server client**

Create `src/lib/supabase/server.ts`:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component — ignore
          }
        },
      },
    }
  );
}

export async function createServiceClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
```

- [ ] **Step 3: Create middleware helper**

Create `src/lib/supabase/middleware.ts`:

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — important for keeping the session alive
  await supabase.auth.getUser();

  return supabaseResponse;
}
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build 2>&1 | tail -5
```
Expected: Build succeeds (env vars are optional at build time for client code)

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase/
git commit -m "feat: add Supabase client helpers (browser, server, middleware)"
```

---

### Task 3: Create Next.js middleware for session refresh

**Files:**
- Create: `src/middleware.ts`

- [ ] **Step 1: Create middleware**

Create `src/middleware.ts`:

```typescript
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add Next.js middleware for Supabase session refresh"
```

---

### Task 4: Create AuthContext and useAuth hook

**Files:**
- Create: `src/context/AuthContext.tsx`
- Create: `src/hooks/useAuth.ts`

- [ ] **Step 1: Create AuthContext**

Create `src/context/AuthContext.tsx`:

```typescript
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  plan: "free" | "pro";
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Stable reference — createBrowserClient returns a singleton but we wrap in useMemo
  // to ensure fetchProfile and other callbacks don't re-trigger on every render
  const supabase = useMemo(() => createClient(), []);

  const fetchProfile = useCallback(
    async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("id, email, display_name, avatar_url, plan")
        .eq("id", userId)
        .single();
      setProfile(data as Profile | null);
    },
    [supabase]
  );

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) fetchProfile(s.user.id);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchProfile(s.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, fetchProfile]);

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }, [supabase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{ user, session, profile, loading, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be inside AuthProvider");
  return ctx;
}
```

- [ ] **Step 2: Create useAuth hook**

Create `src/hooks/useAuth.ts`:

```typescript
export { useAuthContext as useAuth } from "@/context/AuthContext";
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/context/AuthContext.tsx src/hooks/useAuth.ts
git commit -m "feat: add AuthContext provider and useAuth hook"
```

---

### Task 5: Wire AuthProvider into root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add AuthProvider to layout**

In `src/app/layout.tsx`, add the import and wrap children:

Add import at top:
```typescript
import { AuthProvider } from "@/context/AuthContext";
```

Wrap the body content with AuthProvider:
```tsx
<body className={`${sora.variable} ${dmSans.variable} font-[family-name:var(--font-dm-sans)] min-h-screen flex flex-col`}>
  <AuthProvider>
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </AuthProvider>
</body>
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wrap root layout with AuthProvider"
```

---

### Task 6: Create OAuth callback route

**Files:**
- Create: `src/app/auth/callback/route.ts`

- [ ] **Step 1: Create callback handler**

Create `src/app/auth/callback/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth failed — redirect to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/auth/callback/route.ts
git commit -m "feat: add OAuth callback route handler"
```

---

### Task 7: Create login page

**Files:**
- Create: `src/app/auth/login/page.tsx`

- [ ] **Step 1: Create login page with Google OAuth button**

Create `src/app/auth/login/page.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="max-w-sm mx-auto px-6 py-24 flex flex-col items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Sign in to track your usage and unlock Pro features.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={signInWithGoogle}
        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border border-[var(--color-border)] bg-white text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-text-muted)] hover:shadow-sm transition-all cursor-pointer"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </motion.button>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-[var(--color-error)] text-center"
        >
          Sign in failed. Please try again.
        </motion.p>
      )}

      <p className="text-xs text-[var(--color-text-muted)] text-center">
        By signing in, you agree to our{" "}
        <a href="/terms" className="underline hover:text-[var(--color-text-secondary)]">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-[var(--color-text-secondary)]">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/app/auth/login/page.tsx
git commit -m "feat: add login page with Google OAuth"
```

---

### Task 8: Update Header with auth-aware UI

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Replace Header with auth-aware version**

Replace the entire content of `src/components/layout/Header.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, profile, loading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold font-[family-name:var(--font-sora)]">
                J
              </span>
            </div>
            <span className="text-lg font-semibold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)]">
              JustUse
              <span className="text-[var(--color-text-muted)]">.me</span>
            </span>
          </motion.div>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/pricing">
            <motion.span
              whileHover={{ color: "var(--color-accent)" }}
              className="text-sm text-[var(--color-text-secondary)] transition-colors"
            >
              Pricing
            </motion.span>
          </Link>

          {loading ? (
            <div className="w-8 h-8 rounded-full bg-[var(--color-surface-elevated)] animate-pulse" />
          ) : user ? (
            <div ref={menuRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-[var(--color-accent)] transition-colors cursor-pointer"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
                    {(profile?.display_name || user.email || "U")[0].toUpperCase()}
                  </div>
                )}
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute right-0 top-full mt-2 w-52 py-2 rounded-xl bg-white border border-[var(--color-border)] shadow-lg shadow-black/[0.08] z-50"
                  >
                    <div className="px-4 py-2 border-b border-[var(--color-border)]">
                      <p className="text-sm font-medium text-[var(--color-text)] truncate">
                        {profile?.display_name || user.email}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        {profile?.plan === "pro" ? "Pro Plan" : "Free Plan"}
                      </p>
                    </div>

                    {profile?.plan !== "pro" && (
                      <Link
                        href="/pricing"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-[var(--color-accent)] font-medium hover:bg-[var(--color-surface-elevated)] transition-colors"
                      >
                        Upgrade to Pro
                      </Link>
                    )}

                    {profile?.plan === "pro" && (
                      <button
                        onClick={async () => {
                          setMenuOpen(false);
                          const res = await fetch("/api/stripe/portal", { method: "POST" });
                          const { url } = await res.json();
                          if (url) window.location.href = url;
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors cursor-pointer"
                      >
                        Manage Subscription
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Link
                href="/auth/login"
                className="text-sm px-5 py-2 rounded-full bg-[var(--color-text)] text-white hover:bg-[var(--color-text-secondary)] transition-colors font-medium"
              >
                Sign In
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: auth-aware Header with user avatar dropdown"
```

---

### Task 8b: Create safe profile update API route

**Files:**
- Create: `src/app/api/profile/route.ts`

- [ ] **Step 1: Create profile update route that strips protected fields**

Create `src/app/api/profile/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";

// Fields that users are allowed to update
const ALLOWED_FIELDS = new Set(["display_name", "avatar_url"]);

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Strip any protected fields (plan, stripe_*, subscription_status)
  const safeUpdate: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (ALLOWED_FIELDS.has(key)) {
      safeUpdate[key] = value;
    }
  }

  if (Object.keys(safeUpdate).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  safeUpdate.updated_at = new Date().toISOString();

  const serviceClient = await createServiceClient();
  const { data, error } = await serviceClient
    .from("profiles")
    .update(safeUpdate)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json(data);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/profile/route.ts
git commit -m "feat: add safe profile update API route"
```

---

## Chunk 2: Usage Tracking

### Task 9: Create anon-id helper

**Files:**
- Create: `src/lib/anon-id.ts`

- [ ] **Step 1: Create anon-id module**

Create `src/lib/anon-id.ts`:

```typescript
const STORAGE_KEY = "justuse_anon_id";

export function getAnonId(): string {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/anon-id.ts
git commit -m "feat: add anonymous user ID helper"
```

---

### Task 10: Create usage API routes (anonymous)

**Files:**
- Create: `src/app/api/usage/check/route.ts`
- Create: `src/app/api/usage/log/route.ts`

- [ ] **Step 1: Create usage check route**

Create `src/app/api/usage/check/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const DAILY_LIMIT = 3;

export async function POST(request: Request) {
  const { anon_id, tool_id } = await request.json();

  if (!anon_id || !tool_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("usage_log")
    .select("*", { count: "exact", head: true })
    .eq("anon_id", anon_id)
    .is("user_id", null)
    .gte("used_at", today.toISOString());

  const used = count ?? 0;

  return NextResponse.json({
    allowed: used < DAILY_LIMIT,
    used,
    limit: DAILY_LIMIT,
  });
}
```

- [ ] **Step 2: Create usage log route**

Create `src/app/api/usage/log/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { anon_id, tool_id } = await request.json();

  if (!anon_id || !tool_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  const { error } = await supabase.from("usage_log").insert({
    anon_id,
    tool_id,
    user_id: null,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to log usage" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/usage/
git commit -m "feat: add anonymous usage check and log API routes"
```

---

### Task 11: Create usage client library

**Files:**
- Create: `src/lib/usage.ts`

- [ ] **Step 1: Create usage helper**

Create `src/lib/usage.ts`:

```typescript
import { createClient } from "@/lib/supabase/client";
import { getAnonId } from "@/lib/anon-id";

const DAILY_LIMIT = 3;

interface UsageCheck {
  allowed: boolean;
  used: number;
  limit: number;
}

export async function checkUsage(
  toolId: string,
  userId: string | null,
  plan: string | null
): Promise<UsageCheck> {
  // Pro users: always allowed
  if (plan === "pro") {
    return { allowed: true, used: 0, limit: Infinity };
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (userId) {
    // Authenticated user — query Supabase directly (RLS protects)
    const supabase = createClient();
    const { count } = await supabase
      .from("usage_log")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("used_at", today.toISOString());

    const used = count ?? 0;
    return { allowed: used < DAILY_LIMIT, used, limit: DAILY_LIMIT };
  }

  // Anonymous — go through API route
  const anonId = getAnonId();
  const res = await fetch("/api/usage/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ anon_id: anonId, tool_id: toolId }),
  });
  return res.json();
}

export async function logUsage(
  toolId: string,
  userId: string | null
): Promise<void> {
  if (userId) {
    // Authenticated — insert directly
    const supabase = createClient();
    await supabase.from("usage_log").insert({
      user_id: userId,
      tool_id: toolId,
    });
    return;
  }

  // Anonymous — go through API route
  const anonId = getAnonId();
  await fetch("/api/usage/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ anon_id: anonId, tool_id: toolId }),
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/usage.ts
git commit -m "feat: add usage check/log client library"
```

---

### Task 12: Create UsageLimitModal

**Files:**
- Create: `src/components/tool/UsageLimitModal.tsx`

- [ ] **Step 1: Create the modal component**

Create `src/components/tool/UsageLimitModal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  used: number;
  limit: number;
  isLoggedIn: boolean;
  onClose: () => void;
}

export default function UsageLimitModal({
  used,
  limit,
  isLoggedIn,
  onClose,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl border border-[var(--color-border)] shadow-xl p-8 max-w-sm mx-4 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-[var(--color-accent)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h2 className="text-lg font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-2">
          Daily limit reached
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          You&apos;ve used {used}/{limit} free uses today. Come back tomorrow, or
          upgrade for unlimited access.
        </p>

        <div className="flex flex-col gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                href="/auth/login"
                className="w-full py-3 rounded-xl bg-[var(--color-text)] text-white text-sm font-semibold font-[family-name:var(--font-sora)] text-center hover:opacity-90 transition-opacity"
              >
                Create a free account
              </Link>
              <Link
                href="/pricing"
                className="w-full py-3 rounded-xl border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] text-center hover:border-[var(--color-text-muted)] transition-colors"
              >
                See Pro plans
              </Link>
            </>
          ) : (
            <Link
              href="/pricing"
              className="w-full py-3 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold font-[family-name:var(--font-sora)] text-center hover:opacity-90 transition-opacity"
            >
              Upgrade to Pro
            </Link>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer"
        >
          Maybe later
        </button>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/tool/UsageLimitModal.tsx
git commit -m "feat: add usage limit modal component"
```

---

### Task 13: Integrate usage tracking into ToolShell

**Files:**
- Modify: `src/components/tool/ToolShell.tsx`

- [ ] **Step 1: Update ToolShell to check usage and route server tools**

Replace the entire content of `src/components/tool/ToolShell.tsx`:

```tsx
"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ToolPlugin, ToolResult, ToolOptions } from "@/tools/types";
import { useAuth } from "@/hooks/useAuth";
import { checkUsage, logUsage } from "@/lib/usage";
import { getAnonId } from "@/lib/anon-id";
import DropZone from "./DropZone";
import ProcessingAnimation from "./ProcessingAnimation";
import DownloadButton from "./DownloadButton";
import UsageLimitModal from "./UsageLimitModal";

type ToolState = "idle" | "processing" | "done" | "error";

interface ToolShellProps {
  tool: ToolPlugin;
}

export default function ToolShell({ tool }: ToolShellProps) {
  const [state, setState] = useState<ToolState>("idle");
  const [result, setResult] = useState<ToolResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<ToolOptions>({});
  const [usageModal, setUsageModal] = useState<{
    used: number;
    limit: number;
  } | null>(null);

  const { user, profile } = useAuth();

  const handleFiles = useCallback(
    async (files: File[]) => {
      // Check usage before processing
      const usage = await checkUsage(
        tool.id,
        user?.id ?? null,
        profile?.plan ?? null
      );

      if (!usage.allowed) {
        setUsageModal({ used: usage.used, limit: usage.limit });
        return;
      }

      setState("processing");
      setError(null);
      setResult(null);

      try {
        let output: ToolResult;

        if (tool.runtime === "server") {
          // Server-side tool: POST to API
          const formData = new FormData();
          files.forEach((f) => formData.append("files", f));
          if (Object.keys(options).length > 0) {
            formData.append("options", JSON.stringify(options));
          }

          const headers: Record<string, string> = {};
          if (!user) {
            headers["x-anon-id"] = getAnonId();
          }

          const res = await fetch(`/api/tools/${tool.id}`, {
            method: "POST",
            body: formData,
            headers,
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({ error: "Processing failed" }));
            throw new Error(err.error || "Processing failed");
          }

          const blob = await res.blob();
          const filename =
            res.headers
              .get("content-disposition")
              ?.match(/filename="?([^"]+)"?/)?.[1] ?? "output";
          const mimeType = res.headers.get("content-type") ?? "application/octet-stream";

          output = { blob, filename, mimeType };
        } else {
          // Browser-side tool: process locally
          output = await tool.process(files, options);
        }

        setResult(output);
        setState("done");

        // Log usage after successful processing
        await logUsage(tool.id, user?.id ?? null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
        setState("error");
      }
    },
    [tool, options, user, profile]
  );

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setError(null);
  };

  const transition = {
    initial: { opacity: 0, y: 16, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -12, filter: "blur(4px)" },
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {tool.optionsUI && state === "idle" && (
        <div className="mb-6">
          <tool.optionsUI options={options} onChange={setOptions} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div key="dropzone" {...transition}>
            <DropZone
              acceptedTypes={tool.acceptedTypes}
              maxFiles={tool.maxFiles}
              maxFileSize={tool.maxFileSize}
              onFiles={handleFiles}
            />
          </motion.div>
        )}

        {state === "processing" && (
          <motion.div key="processing" {...transition}>
            <ProcessingAnimation />
          </motion.div>
        )}

        {state === "done" && result && (
          <motion.div
            key="result"
            {...transition}
            className="flex flex-col items-center gap-8 py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.1,
              }}
              className="w-14 h-14 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-[var(--color-accent)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </motion.div>

            {tool.previewUI && <tool.previewUI result={result} />}
            <DownloadButton result={result} />

            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors underline underline-offset-4 decoration-[var(--color-border)]"
            >
              Process another file
            </motion.button>
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            key="error"
            {...transition}
            className="flex flex-col items-center gap-5 h-56 justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-error-dim)] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[var(--color-error)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <p className="text-sm text-[var(--color-error)]">{error}</p>
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="px-5 py-2 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)] transition-all"
            >
              Try again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {usageModal && (
          <UsageLimitModal
            used={usageModal.used}
            limit={usageModal.limit}
            isLoggedIn={!!user}
            onClose={() => setUsageModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/tool/ToolShell.tsx
git commit -m "feat: integrate usage tracking and server tool routing into ToolShell"
```

---

## Chunk 3: Payments (Stripe)

### Task 14: Create Stripe checkout API route

**Files:**
- Create: `src/app/api/stripe/checkout/route.ts`

- [ ] **Step 1: Create checkout route**

Create `src/app/api/stripe/checkout/route.ts`:

```typescript
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient, createServiceClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const serviceClient = await createServiceClient();

  // Check if user already has a Stripe customer ID
  const { data: profile } = await serviceClient
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    // Persist customer ID via service role (protected field)
    await serviceClient
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: { supabase_user_id: user.id },
  });

  return NextResponse.json({ url: session.url });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/stripe/checkout/route.ts
git commit -m "feat: add Stripe checkout session API route"
```

---

### Task 15: Create Stripe webhook handler

**Files:**
- Create: `src/app/api/stripe/webhook/route.ts`

- [ ] **Step 1: Create webhook route**

Create `src/app/api/stripe/webhook/route.ts`:

```typescript
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServiceClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      if (!userId) break;

      await supabase
        .from("profiles")
        .update({
          plan: "pro",
          subscription_status: "active",
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const status = sub.status; // active, past_due, canceled, unpaid

      // Keep pro during past_due (Stripe retries payment). Only downgrade on canceled/unpaid.
      const plan = status === "active" || status === "past_due" ? "pro" : "free";

      await supabase
        .from("profiles")
        .update({
          plan,
          subscription_status: status,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;

      await supabase
        .from("profiles")
        .update({
          plan: "free",
          subscription_status: null,
          stripe_subscription_id: null,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id);
      break;
    }

    case "invoice.payment_failed": {
      // Log only — no user action in Phase 2
      // Stripe will retry and eventually trigger subscription.updated with past_due/unpaid
      console.log("Invoice payment failed:", event.data.object);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/stripe/webhook/route.ts
git commit -m "feat: add Stripe webhook handler for subscription events"
```

---

### Task 16: Create Stripe customer portal route

**Files:**
- Create: `src/app/api/stripe/portal/route.ts`

- [ ] **Step 1: Create portal route**

Create `src/app/api/stripe/portal/route.ts`:

```typescript
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return NextResponse.json({ error: "No subscription found" }, { status: 400 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/stripe/portal/route.ts
git commit -m "feat: add Stripe customer portal API route"
```

---

### Task 17: Update pricing page with Stripe integration

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Replace pricing page with Stripe-integrated version**

Replace the entire content of `src/app/pricing/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function PricingPage() {
  const { user, profile, loading } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const isPro = profile?.plan === "pro";

  const handleUpgrade = async () => {
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setCheckoutLoading(false);
    }
  };

  const handleManage = async () => {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="text-3xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-3"
        >
          Simple pricing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.05 }}
          className="text-[var(--color-text-secondary)]"
        >
          No hidden fees. Cancel anytime.
        </motion.p>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 p-4 rounded-xl bg-green-50 border border-green-200 text-center text-sm text-green-800"
          >
            Welcome to Pro! Your subscription is now active.
          </motion.div>
        )}
        {canceled && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-center text-sm text-amber-800"
          >
            Checkout was canceled. No charges were made.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="relative p-8 rounded-2xl border border-[var(--color-border)] bg-white transition-all duration-300"
        >
          <h2 className="text-lg font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-1">
            Free
          </h2>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-3xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)]">
              $0
            </span>
          </div>
          <ul className="space-y-3 mb-8">
            {["3 uses per day", "All tools available", "No watermarks", "Browser-side privacy"].map(
              (f) => (
                <li
                  key={f}
                  className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2.5"
                >
                  <span className="w-4 h-4 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-2.5 h-2.5 text-[var(--color-accent)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  {f}
                </li>
              )
            )}
          </ul>
          {!user && !loading && (
            <motion.a
              href="/auth/login"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="block w-full py-3 rounded-xl border border-[var(--color-border)] text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)] text-center transition-all"
            >
              Get Started
            </motion.a>
          )}
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.18 }}
          whileHover={{ y: -4 }}
          className="relative p-8 rounded-2xl border border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent-glow)] bg-white transition-all duration-300"
        >
          <span className="absolute -top-3 left-6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] font-[family-name:var(--font-sora)] bg-[var(--color-accent)] text-white rounded-full">
            Popular
          </span>
          <h2 className="text-lg font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-1">
            Pro
          </h2>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-3xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)]">
              $9.9
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">/month</span>
          </div>
          <ul className="space-y-3 mb-8">
            {[
              "Unlimited uses",
              "All tools available",
              "No watermarks",
              "Browser-side privacy",
              "Priority support",
            ].map((f) => (
              <li
                key={f}
                className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2.5"
              >
                <span className="w-4 h-4 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-2.5 h-2.5 text-[var(--color-accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>

          {isPro ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleManage}
              className="w-full py-3 rounded-xl border border-[var(--color-accent)] text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-accent)] transition-all cursor-pointer"
            >
              Manage Subscription
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleUpgrade}
              disabled={checkoutLoading}
              className="w-full py-3 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold font-[family-name:var(--font-sora)] hover:bg-[var(--color-accent-dim)] shadow-sm transition-all cursor-pointer disabled:opacity-60"
            >
              {checkoutLoading ? "Redirecting..." : "Upgrade to Pro"}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat: wire pricing page to Stripe checkout and customer portal"
```

---

## Chunk 4: Server Tool Infrastructure & Deployment

### Task 18: Create server-side tool processing API route

**Files:**
- Create: `src/app/api/tools/[toolId]/route.ts`
- Create: `src/lib/tools/server-process.ts`

- [ ] **Step 1: Create server process helper**

Create `src/lib/tools/server-process.ts`:

```typescript
import { getToolById } from "@/tools/registry";
import type { ToolResult, ToolOptions } from "@/tools/types";

export async function processServerTool(
  toolId: string,
  files: File[],
  options?: ToolOptions
): Promise<ToolResult> {
  const tool = getToolById(toolId);

  if (!tool) throw new Error(`Tool "${toolId}" not found`);
  if (tool.runtime !== "server") throw new Error(`Tool "${toolId}" is not a server tool`);

  return tool.process(files, options);
}
```

- [ ] **Step 2: Create API route**

Create `src/app/api/tools/[toolId]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getToolById } from "@/tools/registry";
import { processServerTool } from "@/lib/tools/server-process";

const DAILY_LIMIT = 3;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ toolId: string }> }
) {
  const { toolId } = await params;
  const tool = getToolById(toolId);

  if (!tool || tool.runtime !== "server") {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  // Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Usage check
  const serviceClient = await createServiceClient();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let plan: string | null = null;

  if (user) {
    const { data: profile } = await serviceClient
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();
    plan = profile?.plan ?? null;
  }

  if (plan !== "pro") {
    const anonId = request.headers.get("x-anon-id");
    const identifier = user
      ? { user_id: user.id }
      : anonId
        ? { anon_id: anonId }
        : null;

    if (!identifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const query = serviceClient
      .from("usage_log")
      .select("*", { count: "exact", head: true })
      .gte("used_at", today.toISOString());

    if ("user_id" in identifier) {
      query.eq("user_id", identifier.user_id);
    } else {
      query.eq("anon_id", identifier.anon_id).is("user_id", null);
    }

    const { count } = await query;

    if ((count ?? 0) >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: "Daily usage limit reached", used: count, limit: DAILY_LIMIT },
        { status: 429 }
      );
    }
  }

  // Process
  try {
    const formData = await request.formData();
    const fileEntries = formData.getAll("files") as File[];
    const optionsStr = formData.get("options") as string | null;
    const options = optionsStr ? JSON.parse(optionsStr) : undefined;

    const result = await processServerTool(toolId, fileEntries, options);

    // Log usage
    const anonId = request.headers.get("x-anon-id");
    await serviceClient.from("usage_log").insert({
      user_id: user?.id ?? null,
      anon_id: user ? null : anonId,
      tool_id: toolId,
    });

    // Return blob
    return new NextResponse(result.blob, {
      headers: {
        "Content-Type": result.mimeType,
        "Content-Disposition": `attachment; filename="${result.filename}"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/tools/server-process.ts src/app/api/tools/
git commit -m "feat: add server-side tool processing API route"
```

---

### Task 19: Create Supabase SQL migration file

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`

- [ ] **Step 1: Create migration file**

Create `supabase/migrations/001_initial_schema.sql`:

```sql
-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  subscription_status TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

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

-- Usage log table
CREATE TABLE IF NOT EXISTS public.usage_log (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  anon_id TEXT,
  tool_id TEXT NOT NULL,
  used_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_usage_user_day ON public.usage_log (user_id, used_at);
CREATE INDEX idx_usage_anon_day ON public.usage_log (anon_id, used_at);

ALTER TABLE public.usage_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Auth users can insert own usage"
  ON public.usage_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Auth users can read own usage"
  ON public.usage_log FOR SELECT
  USING (auth.uid() = user_id);
```

- [ ] **Step 2: Commit**

```bash
git add supabase/
git commit -m "feat: add Supabase SQL migration for profiles and usage_log"
```

---

### Task 20: Final build verification and deployment prep

**Files:**
- No new files — verification only

- [ ] **Step 1: Run full build**

```bash
npm run build 2>&1 | tail -20
```
Expected: All pages generate successfully including new auth/api routes.

- [ ] **Step 2: Verify all API routes are created**

```bash
find src/app/api -type f -name "*.ts" | sort
```
Expected:
```
src/app/api/stripe/checkout/route.ts
src/app/api/stripe/portal/route.ts
src/app/api/stripe/webhook/route.ts
src/app/api/tools/[toolId]/route.ts
src/app/api/usage/check/route.ts
src/app/api/usage/log/route.ts
```

- [ ] **Step 3: Verify all auth routes exist**

```bash
find src/app/auth -type f -name "*.ts" -o -name "*.tsx" | sort
```
Expected:
```
src/app/auth/callback/route.ts
src/app/auth/login/page.tsx
```

- [ ] **Step 4: Commit all remaining changes**

```bash
git add -A && git status
```
If any unstaged files, commit them:
```bash
git commit -m "chore: Phase 2 implementation complete — auth, usage, payments, server tools"
```

---

## Deployment Checklist (Manual Steps)

These require dashboard access and credentials. Do them in this order:

1. **Supabase Project Setup**
   - Create project at supabase.com (or use existing)
   - Run `supabase/migrations/001_initial_schema.sql` in SQL Editor
   - Enable Google OAuth: Authentication → Providers → Google
   - Set redirect URL: `https://justuse.me/auth/callback`
   - Copy URL + anon key + service role key

2. **Stripe Setup**
   - Create product "JustUse.me Pro" with $9.9/month price
   - Copy Price ID, Secret Key, Publishable Key
   - Add webhook endpoint: `https://justuse.me/api/stripe/webhook`
   - Listen for: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
   - Copy Webhook Secret

3. **Vercel Deployment**
   - `vercel link`
   - Add all environment variables from `.env.local` template
   - Set `NEXT_PUBLIC_APP_URL=https://justuse.me`
   - Deploy: `vercel --prod`

4. **DNS (Namecheap)**
   - A record: `@` → Vercel IP (76.76.21.21)
   - CNAME: `www` → `cname.vercel-dns.com`
   - Add domain in Vercel Dashboard → Domains

5. **Post-Deploy Verification**
   - Visit https://justuse.me — homepage loads
   - Click Sign In → Google OAuth flow works
   - Use 3 tools → 4th shows usage limit modal
   - Upgrade to Pro → Stripe Checkout → subscription active
   - Manage Subscription → Stripe Customer Portal
