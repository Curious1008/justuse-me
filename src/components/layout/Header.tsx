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
            <span className="text-lg font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)]">
              justuse<span className="text-[var(--color-accent)]">.me</span>
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
          <Link href="/contact">
            <motion.span
              whileHover={{ color: "var(--color-accent)" }}
              className="text-sm text-[var(--color-text-secondary)] transition-colors"
            >
              Contact
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
