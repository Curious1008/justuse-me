"use client";

import { motion } from "framer-motion";

export default function CompareCTA() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-20">
      <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center overflow-hidden">
        {/* Accent glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, var(--color-accent-glow-strong) 0%, transparent 70%)",
          }}
        />

        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] tracking-tight">
            Try 122 tools for free
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            No sign-up, no watermarks, no file uploads.
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block mt-8 px-8 py-3 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold font-[family-name:var(--font-sora)] hover:bg-[var(--color-accent-dim)] shadow-sm transition-colors"
          >
            Get Started
          </motion.a>
        </div>
      </div>
    </section>
  );
}
