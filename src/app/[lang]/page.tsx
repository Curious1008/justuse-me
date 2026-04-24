import Link from "next/link";
import LiveTools from "@/components/home/LiveTools";
import HeroCtas from "@/components/home/HeroCtas";
import SmartPicks from "@/components/home/SmartPicks";
import CategoryCards from "@/components/home/CategoryCards";
import CatIcon from "@/components/icons/CatIcon";
import { generateSiteJsonLd } from "@/config/seo";
import { getDictionary, locales, defaultLocale, localePath, type Locale } from "@/lib/i18n";
import { getAllTools, getToolsByCategory } from "@/tools/registry";
import type { Category } from "@/tools/types";

function pickReason(lang: Locale): string {
  const d = new Date();
  const day = d.getDay();
  const h = d.getHours();
  const part = h < 5 ? "late night" : h < 12 ? "morning" : h < 17 ? "afternoon" : h < 21 ? "evening" : "night";
  if (lang === "en") {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${days[day]} ${part} — tuned to what people usually reach for now`;
  }
  const daysCN = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const daysTW = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
  const partMap: Record<string, string> = { "late night": "深夜", morning: "上午", afternoon: "下午", evening: "晚上", night: "夜晚" };
  const names = lang === "zh-TW" ? daysTW : daysCN;
  return `${names[day]}${partMap[part]} — 根据此刻常用工具调整`;
}

interface Props {
  params: Promise<{ lang: string }>;
}

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

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const t = await getDictionary(locale);
  const jsonLd = generateSiteJsonLd();
  const allTools = getAllTools(locale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: t.faq.q1, acceptedAnswer: { "@type": "Answer", text: t.faq.a1 } },
      { "@type": "Question", name: t.faq.q2, acceptedAnswer: { "@type": "Answer", text: t.faq.a2 } },
      { "@type": "Question", name: t.faq.q3, acceptedAnswer: { "@type": "Answer", text: t.faq.a3 } },
      { "@type": "Question", name: t.faq.q4, acceptedAnswer: { "@type": "Answer", text: t.faq.a4 } },
    ],
  };

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ───────── Hero ───────── */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[720px] h-[320px] -z-0"
          style={{
            background: "radial-gradient(ellipse at center, var(--color-accent-glow) 0%, transparent 60%)",
            filter: "blur(20px)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-5 items-start">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] font-mono text-[var(--color-text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              {t.hero.badge}
            </span>
            <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
              {t.hero.badgeExtra}
            </span>
          </div>

          <h1
            className="font-[family-name:var(--font-sora)] font-bold tracking-tight leading-[1.02] text-[var(--color-text)] max-w-4xl text-balance"
            style={{ fontSize: "clamp(38px, 6vw, 64px)", letterSpacing: "-1.5px" }}
          >
            {t.hero.title}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, var(--color-accent), var(--color-warm, #E8693A))",
              }}
            >
              {t.hero.titleAccent}
            </span>
          </h1>

          <p className="text-[15px] sm:text-[17px] leading-[1.55] text-[var(--color-text-secondary)] max-w-2xl">
            {t.hero.subtitle}
          </p>

          <HeroCtas lang={locale} />
        </div>
      </section>

      {/* ───────── Live tools strip ───────── */}
      <LiveTools
        labels={{
          heading: t.live.heading,
          sub: t.live.sub,
          runsLocal: t.live.runsLocal,
          qrTitle: t.live.qrTitle,
          qrPlaceholder: t.live.qrPlaceholder,
          qrHint: t.live.qrHint,
          pwTitle: t.live.pwTitle,
          pwLength: t.live.pwLength,
          pwCopy: t.live.pwCopy,
          pwCopied: t.live.pwCopied,
          pwRegen: t.live.pwRegen,
          wcTitle: t.live.wcTitle,
          wcPlaceholder: t.live.wcPlaceholder,
          wcWords: t.live.wcWords,
          wcChars: t.live.wcChars,
          wcSentences: t.live.wcSentences,
          colorTitle: t.live.colorTitle,
          colorHex: t.live.colorHex,
          colorRgb: t.live.colorRgb,
          colorHsl: t.live.colorHsl,
        }}
      />

      {/* ───────── Picked for you, right now ───────── */}
      <SmartPicks lang={locale} reason={pickReason(locale)} />

      {/* ───────── Browse by category (cards) ───────── */}
      <CategoryCards
        lang={locale}
        categoryLabels={t.categories as Record<Category, string>}
        categoryBlurbs={Object.fromEntries(
          CATEGORY_ORDER.map((c) => [c, t.categoryPage[c]?.description ?? ""])
        ) as Record<Category, string>}
      />

      {/* ───────── Full crawlable tool list (SEO) ───────── */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-6">
          <h2 className="text-[22px] font-semibold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)]">
            {t.home.toolCategories} · {allTools.length}
          </h2>
          <p className="text-[13px] text-[var(--color-text-muted)] mt-1 max-w-2xl">
            {t.home.whatIsDesc}
          </p>
        </div>

        {CATEGORY_ORDER.map((cat) => {
          const tools = getToolsByCategory(cat, locale);
          if (tools.length === 0) return null;
          const hue = CATEGORY_HUES[cat];
          const catLabel = t.categories[cat];
          const catBlurb = t.categoryPage[cat]?.description ?? "";
          return (
            <section
              key={cat}
              id={`cat-${cat}`}
              className="border-t border-[var(--color-border-subtle)] pt-5 pb-2 mb-1 scroll-mt-20"
            >
              <div className="flex items-center gap-2.5 flex-wrap mb-3">
                <div
                  className="w-8 h-8 rounded-lg inline-flex items-center justify-center"
                  style={{
                    background: `oklch(95% 0.04 ${hue})`,
                    color: `oklch(45% 0.12 ${hue})`,
                  }}
                >
                  <CatIcon category={cat} size={16} />
                </div>
                <h3 className="text-[17px] font-semibold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)]">
                  {catLabel}
                </h3>
                <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                  {tools.length}
                </span>
                <span className="text-[12px] text-[var(--color-text-muted)]">— {catBlurb}</span>
              </div>

              <ul className="grid gap-[2px] list-none p-0 m-0" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {tools.map((tool) => (
                  <li key={tool.id}>
                    <Link
                      href={localePath(locale, `/tools/${tool.id}`)}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-[13px] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <span className="truncate">{tool.name}</span>
                      <span className="text-[var(--color-text-muted)] shrink-0 ml-2">›</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 border-t border-[var(--color-border-subtle)]">
        <h2 className="text-[22px] font-semibold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-6">
          {t.faq.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: t.faq.q1, a: t.faq.a1 },
            { q: t.faq.q2, a: t.faq.a2 },
            { q: t.faq.q3, a: t.faq.a3 },
            { q: t.faq.q4, a: t.faq.a4 },
          ].map((item) => (
            <div key={item.q}>
              <h3 className="text-[14px] font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-1.5">
                {item.q}
              </h3>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.55]">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
