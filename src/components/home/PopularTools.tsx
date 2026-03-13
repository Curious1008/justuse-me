"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getToolsByCategory, getCategories } from "@/tools/registry";

const categoryMeta: Record<string, { label: string; color: string }> = {
  pdf: { label: "PDF", color: "#DC2626" },
  image: { label: "Image", color: "#2563EB" },
  text: { label: "Text & Code", color: "#059669" },
};

function ToolRow({ category }: { category: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const tools = getToolsByCategory(category as "pdf" | "image" | "text");
  const meta = categoryMeta[category];

  if (!meta || tools.length === 0) return null;

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex items-center gap-2.5 px-1">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: meta.color }}
        />
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)] font-[family-name:var(--font-sora)]">
          {meta.label}
        </span>
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 16, scale: 0.95 }
            }
            transition={{
              type: "spring" as const,
              stiffness: 280,
              damping: 24,
              delay: i * 0.06,
            }}
            className="flex-shrink-0"
          >
            <Link href={`/tools/${tool.id}`}>
              <motion.div
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="group relative flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-black/[0.03]"
              >
                <span className="text-lg">{tool.icon}</span>
                <div>
                  <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors block whitespace-nowrap">
                    {tool.name}
                  </span>
                  <span className="text-[11px] text-[var(--color-text-muted)] block whitespace-nowrap">
                    {tool.description.length > 35
                      ? tool.description.slice(0, 35) + "..."
                      : tool.description}
                  </span>
                </div>
                <svg
                  className="w-3.5 h-3.5 text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-all ml-2 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function PopularTools() {
  const categories = getCategories();

  if (categories.length === 0) return null;

  return (
    <section className="w-full space-y-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-[family-name:var(--font-sora)]">
          Explore tools
        </p>
      </div>
      {categories.map((cat) => (
        <ToolRow key={cat} category={cat} />
      ))}
    </section>
  );
}
