"use client";

import Link from "next/link";
import { openCommandK } from "@/components/search/CommandK";
import { type Locale, localePath } from "@/lib/i18n";

const labels: Record<Locale, { search: string; browse: string; context: string }> = {
  en: { search: "Search tools", browse: "Browse by category →", context: "tuned to what people usually reach for now" },
  "zh-CN": { search: "搜索工具", browse: "按分类浏览 →", context: "根据此刻人们常用的工具调整" },
  "zh-TW": { search: "搜尋工具", browse: "依分類瀏覽 →", context: "根據此刻人們常用的工具調整" },
};

function timeLabel(lang: Locale): string {
  const d = new Date();
  const day = d.getDay();
  const hr = d.getHours();
  const part = hr < 5 ? "late night" : hr < 12 ? "morning" : hr < 17 ? "afternoon" : hr < 22 ? "evening" : "late night";
  const dayNames: Record<Locale, string[]> = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "zh-CN": ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    "zh-TW": ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
  };
  const partLabels: Record<Locale, Record<string, string>> = {
    en: { "morning": "morning", "afternoon": "afternoon", "evening": "evening", "late night": "late night" },
    "zh-CN": { "morning": "上午", "afternoon": "下午", "evening": "晚上", "late night": "深夜" },
    "zh-TW": { "morning": "上午", "afternoon": "下午", "evening": "晚上", "late night": "深夜" },
  };
  const names = dayNames[lang] || dayNames.en;
  const parts = partLabels[lang] || partLabels.en;
  return lang === "en" ? `${names[day]} ${parts[part]}` : `${names[day]}${parts[part]}`;
}

export default function HeroCtas({ lang }: { lang: Locale }) {
  const t = labels[lang] || labels.en;
  const tl = timeLabel(lang);

  return (
    <div className="flex flex-wrap items-center gap-3 gap-y-2">
      <button
        onClick={openCommandK}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-text)] text-[var(--color-bg)] text-sm font-semibold font-[family-name:var(--font-sora)] hover:opacity-90 transition-opacity"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        {t.search}
        <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-bg)]/15 text-[var(--color-bg)]">⌘K</kbd>
      </button>
      <Link
        href={localePath(lang, "/#cat-pdf")}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] hover:border-[var(--color-text-muted)] transition-colors"
      >
        {t.browse}
      </Link>
      <span className="text-[12px] text-[var(--color-text-muted)] font-mono ml-auto">
        {tl} — {t.context}
      </span>
    </div>
  );
}
