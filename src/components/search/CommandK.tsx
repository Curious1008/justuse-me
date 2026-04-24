"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getAllTools } from "@/tools/registry";
import type { ToolPlugin, Category } from "@/tools/types";
import { type Locale, localePath } from "@/lib/i18n";
import CatIcon from "@/components/icons/CatIcon";

const CATEGORY_HUES: Record<Category, number> = {
  pdf: 15, image: 280, text: 230, convert: 170,
  generator: 45, calculator: 200, developer: 310, utility: 140,
};

const labels: Record<Locale, { placeholder: string; empty: string; hint: string; open: string }> = {
  en: { placeholder: "Search 122 tools…", empty: "No tools found for", hint: "↑↓ to navigate · ↵ to open · esc to close", open: "open" },
  "zh-CN": { placeholder: "搜索 122 个工具…", empty: "未找到工具", hint: "↑↓ 导航 · ↵ 打开 · esc 关闭", open: "打开" },
  "zh-TW": { placeholder: "搜尋 122 個工具…", empty: "找不到工具", hint: "↑↓ 導航 · ↵ 開啟 · esc 關閉", open: "開啟" },
};

export function openCommandK() {
  window.dispatchEvent(new CustomEvent("justuse:open-commandk"));
}

export default function CommandK({ lang = "en" }: { lang?: Locale }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = labels[lang] || labels.en;

  const allTools = useMemo(() => getAllTools(lang), [lang]);

  const results = useMemo<ToolPlugin[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allTools.slice(0, 8);
    return allTools
      .filter((tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q)) ||
        tool.category.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [query, allTools]);

  useEffect(() => {
    function onOpen() { setOpen(true); }
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("justuse:open-commandk", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("justuse:open-commandk", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => { setIndex(0); }, [query]);

  const go = useCallback((tool: ToolPlugin) => {
    setOpen(false);
    router.push(localePath(lang, `/tools/${tool.id}`));
  }, [router, lang]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = results[index];
      if (chosen) go(chosen);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full max-w-xl rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] shadow-2xl shadow-black/25 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border-subtle)]">
              <svg className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent text-[15px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
              />
              <kbd className="text-[10px] font-mono text-[var(--color-text-muted)] px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)]">esc</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                  {t.empty} &ldquo;{query}&rdquo;
                </p>
              ) : (
                results.map((tool, i) => (
                  <button
                    key={tool.id}
                    onClick={() => go(tool)}
                    onMouseEnter={() => setIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === index ? "bg-[var(--color-surface-elevated)]" : ""
                    }`}
                  >
                    <div
                      className="w-7 h-7 shrink-0 rounded-lg inline-flex items-center justify-center"
                      style={{
                        background: `oklch(96% 0.02 ${CATEGORY_HUES[tool.category]})`,
                        color: `oklch(48% 0.10 ${CATEGORY_HUES[tool.category]})`,
                      }}
                    >
                      <CatIcon category={tool.category} size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium text-[var(--color-text)] truncate">{tool.name}</div>
                      <div className="text-[12px] text-[var(--color-text-muted)] truncate">{tool.description}</div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] shrink-0">
                      {tool.category}
                    </span>
                  </button>
                ))
              )}
            </div>

            <div className="px-4 py-2 border-t border-[var(--color-border-subtle)] text-[10px] font-mono text-[var(--color-text-muted)] text-center">
              {t.hint}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
