"use client";

import { motion } from "framer-motion";
import { CompetitorData, justuseme } from "../compare-data";

interface CompareHeroProps {
  competitor: CompetitorData;
}

export default function CompareHero({ competitor }: CompareHeroProps) {
  return (
    <section className="text-center py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="max-w-2xl mx-auto"
      >
        <span className="text-7xl sm:text-8xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-accent)] leading-none">
          {competitor.multiplier}
        </span>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] tracking-tight">
          cheaper than {competitor.name}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.08 }}
          className="mt-8 flex items-center justify-center gap-6 text-lg"
        >
          <span className="line-through text-[var(--color-text-muted)]">
            {competitor.price}
          </span>
          <span className="text-[var(--color-accent)] font-bold font-[family-name:var(--font-sora)] text-2xl">
            {justuseme.price}/mo
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.14 }}
          className="mt-6 text-[var(--color-text-secondary)] max-w-lg mx-auto"
        >
          {competitor.tagline}
        </motion.p>

        <motion.a
          href="/"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block mt-10 px-8 py-3 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold font-[family-name:var(--font-sora)] hover:bg-[var(--color-accent-dim)] shadow-sm transition-colors"
        >
          Try JustUse.me Free
        </motion.a>
      </motion.div>
    </section>
  );
}
