import Link from "next/link";
import { getToolsByCategory } from "@/tools/registry";
import { type Locale, localePath } from "@/lib/i18n";
import type { Category } from "@/tools/types";
import CategorySearchPill from "./CategorySearchPill";
import CatIcon from "@/components/icons/CatIcon";

const CATEGORY_HUES: Record<Category, number> = {
  pdf: 15,
  image: 280,
  text: 230,
  convert: 170,
  generator: 45,
  calculator: 200,
  developer: 310,
  utility: 140,
};

const CATEGORY_ORDER: Category[] = [
  "pdf",
  "image",
  "text",
  "convert",
  "generator",
  "calculator",
  "developer",
  "utility",
];

const headings: Record<Locale, { title: string; sub: (n: number, c: number) => string; more: (n: number) => string }> = {
  en: {
    title: "Browse by category",
    sub: (n, c) => `${c} neighborhoods · ${n} tools · all free, all local.`,
    more: (n) => `+${n} more`,
  },
  "zh-CN": {
    title: "按分类浏览",
    sub: (n, c) => `${c} 个类别 · ${n} 个工具 · 全部免费，全部本地运行。`,
    more: (n) => `还有 ${n} 个`,
  },
  "zh-TW": {
    title: "依分類瀏覽",
    sub: (n, c) => `${c} 個類別 · ${n} 個工具 · 全部免費，全部本地執行。`,
    more: (n) => `還有 ${n} 個`,
  },
};

interface Props {
  lang: Locale;
  categoryLabels: Record<Category, string>;
  categoryBlurbs: Record<Category, string>;
}

export default function CategoryCards({ lang, categoryLabels, categoryBlurbs }: Props) {
  const t = headings[lang] || headings.en;
  const cards = CATEGORY_ORDER.map((cat) => {
    const tools = getToolsByCategory(cat, lang);
    return { cat, tools, top: tools.slice(0, 3), count: tools.length };
  }).filter((c) => c.count > 0);
  const total = cards.reduce((s, c) => s + c.count, 0);

  return (
    <section
      id="categories"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-8 scroll-mt-20"
    >
      <div className="flex items-end justify-between flex-wrap gap-2 mb-5">
        <div>
          <h2 className="text-[22px] font-semibold font-[family-name:var(--font-sora)] tracking-[-0.5px] text-[var(--color-text)]">
            {t.title}
          </h2>
          <div className="text-[13px] text-[var(--color-text-muted)] mt-1">
            {t.sub(total, cards.length)}
          </div>
        </div>
        <CategorySearchPill lang={lang} />
      </div>

      <div
        className="grid gap-2.5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(252px, 1fr))" }}
      >
        {cards.map(({ cat, top, count }) => {
          const hue = CATEGORY_HUES[cat];
          const label = categoryLabels[cat];
          const blurb = categoryBlurbs[cat];
          const extra = count - top.length;
          return (
            <Link
              key={cat}
              href={localePath(lang, `/#cat-${cat}`)}
              className="group relative overflow-hidden block p-4 rounded-[14px] bg-[var(--color-surface)] border border-[var(--color-border)] hover:-translate-y-[2px] transition-all"
              style={{ transitionDuration: "150ms" }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-[30px] -right-[30px] w-[120px] h-[120px] rounded-full"
                style={{
                  background: `oklch(70% 0.12 ${hue})`,
                  opacity: 0.08,
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ boxShadow: `inset 0 0 0 1px oklch(60% 0.10 ${hue})` }}
              />
              <div className="relative flex items-center justify-between mb-2.5">
                <div
                  className="w-9 h-9 rounded-[10px] inline-flex items-center justify-center"
                  style={{
                    background: `oklch(95% 0.04 ${hue})`,
                    color: `oklch(45% 0.12 ${hue})`,
                  }}
                >
                  <CatIcon category={cat} size={18} />
                </div>
                <div className="text-[11px] font-mono text-[var(--color-text-muted)]">
                  {count} {lang === "en" ? "tools" : lang === "zh-CN" ? "个工具" : "個工具"}
                </div>
              </div>
              <div className="relative text-[17px] font-semibold font-[family-name:var(--font-sora)] tracking-[-0.3px] text-[var(--color-text)]">
                {label}
              </div>
              <div className="relative text-[12px] text-[var(--color-text-secondary)] mt-[3px]">
                {blurb}
              </div>
              <div className="relative flex gap-1 mt-3 flex-wrap">
                {top.map((tt) => (
                  <span
                    key={tt.id}
                    className="text-[10.5px] font-mono px-[7px] py-[3px] rounded-full bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]"
                  >
                    {tt.name}
                  </span>
                ))}
                {extra > 0 && (
                  <span className="text-[10.5px] font-mono px-[7px] py-[3px] rounded-full text-[var(--color-text-muted)]">
                    {t.more(extra)}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
