import Link from "next/link";
import { getAllTools, getToolById } from "@/tools/registry";
import { type Locale, localePath } from "@/lib/i18n";
import type { Category } from "@/tools/types";
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

const MORNING = ["pomodoro-timer", "word-counter", "json-formatter", "regex-tester", "diff-checker", "markdown-to-html"];
const MIDDAY = ["tip-calculator", "mortgage-calculator", "compress-image", "qr-code", "csv-to-json", "percentage-calculator"];
const EVENING = ["color-palette-generator", "qr-code", "crop-image", "favicon-generator", "css-gradient-generator", "password-generator"];
const WEEKEND = ["calorie-calculator", "bmi-calculator", "cooking-converter", "pdf-to-jpg", "background-remover", "qr-code"];
const FALLBACK = ["qr-code", "password-generator", "json-formatter", "compress-image", "word-counter", "color-palette-generator"];

function pickIds(): string[] {
  const d = new Date();
  const day = d.getDay();
  const h = d.getHours();
  if (day === 0 || day === 6) return WEEKEND;
  if (h < 11) return MORNING;
  if (h < 17) return MIDDAY;
  return EVENING;
}

const headings: Record<Locale, { title: string; seeAll: string }> = {
  en: { title: "Picked for you, right now", seeAll: "See all" },
  "zh-CN": { title: "此刻为你挑选", seeAll: "查看全部" },
  "zh-TW": { title: "此刻為你挑選", seeAll: "查看全部" },
};

export default function SmartPicks({ lang, reason }: { lang: Locale; reason: string }) {
  const t = headings[lang] || headings.en;
  const allTools = getAllTools(lang);
  const total = allTools.length;
  const ids = pickIds();
  let picks = ids.map((id) => getToolById(id)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  if (picks.length < 6) {
    const seen = new Set(picks.map((p) => p.id));
    for (const id of FALLBACK) {
      if (picks.length >= 6) break;
      const t = getToolById(id);
      if (t && !seen.has(t.id)) { picks.push(t); seen.add(t.id); }
    }
  }
  picks = picks.slice(0, 6);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-2 pb-6">
      <div className="flex items-end justify-between flex-wrap gap-2 mb-[14px]">
        <div>
          <h2 className="text-[22px] font-semibold font-[family-name:var(--font-sora)] tracking-[-0.5px] text-[var(--color-text)]">
            {t.title}
          </h2>
          <div className="text-[12px] font-mono text-[var(--color-text-muted)] mt-1">
            {reason}
          </div>
        </div>
        <Link
          href={localePath(lang, "/#categories")}
          className="text-[13px] text-[var(--color-text-secondary)] inline-flex items-center gap-1 hover:text-[var(--color-text)] transition-colors"
        >
          {t.seeAll} {total} →
        </Link>
      </div>

      <ul
        className="grid gap-2 list-none p-0 m-0"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(196px, 1fr))" }}
      >
        {picks.map((tool) => {
          const hue = CATEGORY_HUES[tool.category];
          return (
            <li key={tool.id}>
              <Link
                href={localePath(lang, `/tools/${tool.id}`)}
                className="group flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:-translate-y-[1px] transition-all"
              >
                <div
                  className="w-7 h-7 shrink-0 rounded-lg inline-flex items-center justify-center"
                  style={{
                    background: `oklch(96% 0.02 ${hue})`,
                    color: `oklch(48% 0.10 ${hue})`,
                  }}
                >
                  <CatIcon category={tool.category} size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold font-[family-name:var(--font-sora)] tracking-[-0.2px] text-[var(--color-text)] truncate">
                    {tool.name}
                  </div>
                  <div className="text-[11px] text-[var(--color-text-muted)] truncate mt-px">
                    {tool.description}
                  </div>
                </div>
                <span className="text-[13px] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors shrink-0">→</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
