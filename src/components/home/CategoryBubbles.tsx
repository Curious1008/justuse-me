"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getToolsByCategory, searchTools } from "@/tools/registry";
import type { Category, ToolPlugin } from "@/tools/types";
import ToolIcon from "@/components/tool/ToolIcon";

const categories = [
  { id: "pdf" as Category, label: "PDF" },
  { id: "image" as Category, label: "Image" },
  { id: "text" as Category, label: "Text & Code" },
  { id: "convert" as Category, label: "Convert" },
  { id: "generator" as Category, label: "Generator" },
];

const catVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 22 },
  },
};

const toolVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 22 },
  },
};

export default function CategoryBubbles() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearching = query.trim().length > 0;
  const searchResults = isSearching ? searchTools(query) : [];
  const activeCategory = categories.find((c) => c.id === active);
  const categoryTools = active ? getToolsByCategory(active) : [];

  // Clear category selection when searching
  useEffect(() => {
    if (isSearching) setActive(null);
  }, [isSearching]);

  const scrollToPanel = useCallback(() => {
    setTimeout(() => {
      const el = panelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const targetTop = window.scrollY + rect.top - 120;
      if (rect.bottom > viewportH || rect.top < 0) {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    }, 450);
  }, []);

  const handleSelect = useCallback((id: Category) => {
    const isClosing = active === id;
    setActive(isClosing ? null : id);
    setQuery("");
    if (!isClosing) scrollToPanel();
  }, [active, scrollToPanel]);

  // Which tools to show in the results panel
  const visibleTools: ToolPlugin[] = isSearching ? searchResults : categoryTools;
  const showPanel = visibleTools.length > 0;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--color-text-muted)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Try "merge PDF" or "compress image"'
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_var(--color-accent-glow)] transition-all"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>

      {/* Category buttons — hidden when searching */}
      <AnimatePresence>
        {!isSearching && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap justify-center gap-2 py-1"
          >
            {categories.map((cat) => {
              const isActive = active === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  variants={catVariant}
                  initial="hidden"
                  animate="show"
                  onClick={() => handleSelect(cat.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className={`relative px-4 py-2 rounded-full text-[13px] font-medium font-[family-name:var(--font-sora)] cursor-pointer transition-all duration-200 ${
                    isActive
                      ? `bg-[var(--color-text)] text-white`
                      : "bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)]"
                  }`}
                >
                  {cat.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results panel — search results or category tools */}
      <div ref={panelRef} className="w-full">
        <AnimatePresence mode="wait">
          {showPanel && (
            <motion.div
              key={isSearching ? `search-${query}` : `cat-${active}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full overflow-hidden"
            >
              <motion.div
                initial="hidden"
                animate="show"
                transition={{ staggerChildren: 0.04, delayChildren: 0.05 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 pb-1 auto-rows-fr"
              >
                {visibleTools.map((tool) => (
                  <motion.div key={tool.id} variants={toolVariant} className="h-full">
                    <Link href={`/tools/${tool.id}`} className="block h-full">
                      <motion.div
                        whileHover={{ y: -4, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className="group relative flex flex-col items-center justify-center gap-2.5 p-5 rounded-xl bg-white border border-[var(--color-border)] hover:border-transparent cursor-pointer text-center transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.05] h-full"
                      >
                        <ToolIcon toolId={tool.id} fallbackEmoji={tool.icon} />
                        <span className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                          {tool.name}
                        </span>
                        <span className="text-[11px] text-[var(--color-text-muted)] leading-snug line-clamp-2">
                          {tool.description}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}

                {/* "View all" link — only for category browsing */}
                {!isSearching && active && activeCategory && (
                  <motion.div variants={toolVariant} className="h-full">
                    <Link href={`/${active}`} className="block h-full">
                      <motion.div
                        whileHover={{ y: -4, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-accent)] cursor-pointer text-center transition-all duration-200 h-full"
                      >
                        <svg className="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="text-xs text-[var(--color-text-muted)] font-medium">
                          View all {activeCategory.label} tools
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* No results */}
              {isSearching && searchResults.length === 0 && (
                <p className="text-sm text-[var(--color-text-muted)] text-center py-8">
                  No tools found for &ldquo;{query}&rdquo;
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
