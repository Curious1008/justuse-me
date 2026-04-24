"use client";

import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { useMemo, type ReactNode } from "react";
import type { Session } from "next-auth";

interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  plan: "free" | "pro";
}

interface AuthUser {
  id: string;
  email: string | null;
}

interface AuthState {
  user: AuthUser | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function useAuthContext(): AuthState {
  const { data: session, status } = useSession();

  return useMemo<AuthState>(() => {
    const u = session?.user;
    const user: AuthUser | null = u
      ? { id: u.id, email: u.email ?? null }
      : null;
    const profile: Profile | null = u
      ? {
          id: u.id,
          email: u.email ?? null,
          display_name: u.displayName ?? u.name ?? null,
          avatar_url: u.avatarUrl ?? u.image ?? null,
          plan: u.plan ?? "free",
        }
      : null;

    return {
      user,
      session: session ?? null,
      profile,
      loading: status === "loading",
      signInWithGoogle: async () => {
        await signIn("google", { callbackUrl: window.location.pathname });
      },
      signOut: async () => {
        await signOut({ callbackUrl: "/" });
      },
    };
  }, [session, status]);
}
