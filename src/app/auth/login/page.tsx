"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

function LoginContent() {
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
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
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
        <a href="/terms" className="underline hover:text-[var(--color-text-secondary)]">Terms of Service</a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-[var(--color-text-secondary)]">Privacy Policy</a>.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
