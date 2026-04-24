"use client";

import { openCommandK } from "@/components/search/CommandK";
import { type Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  en: "or search instead",
  "zh-CN": "或直接搜索",
  "zh-TW": "或直接搜尋",
};

export default function CategorySearchPill({ lang }: { lang: Locale }) {
  return (
    <button
      onClick={openCommandK}
      className="inline-flex items-center gap-1.5 text-[12px] font-mono px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] transition-colors"
    >
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      {labels[lang] || labels.en}
    </button>
  );
}
