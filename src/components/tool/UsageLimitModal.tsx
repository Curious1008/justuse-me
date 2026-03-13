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
