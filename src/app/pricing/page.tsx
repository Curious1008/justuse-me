"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

function PricingContent() {
  const { user, profile, loading } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const isPro = profile?.plan === "pro" || !!success;

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

export default function PricingPage() {
  return (
    <Suspense>
      <PricingContent />
    </Suspense>
  );
}
