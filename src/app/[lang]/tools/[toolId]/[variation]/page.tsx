import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolById } from "@/tools/registry";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import ToolPageClient from "../client";
import variations from "@/tools/variations.json";
import variationContent from "@/tools/variation-content.json";

interface Props {
  params: Promise<{ lang: string; toolId: string; variation: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    variations.map((v) => ({ lang, toolId: v.toolId, variation: v.slug }))
  );
}

function getVariation(toolId: string, slug: string) {
  return variations.find((v) => v.toolId === toolId && v.slug === slug) ?? null;
}

function getVariationContent(toolId: string, slug: string) {
  return (
    variationContent.find((v) => v.toolId === toolId && v.slug === slug) ?? null
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, toolId, variation } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const tool = getToolById(toolId);
  const varMeta = getVariation(toolId, variation);
  const content = getVariationContent(toolId, variation);

  if (!tool || !varMeta || !content) return {};

  const canonical =
    locale === defaultLocale
      ? `https://www.justuse.me/tools/${toolId}/${variation}`
      : `https://www.justuse.me/${locale}/tools/${toolId}/${variation}`;

  return {
    title: content.title,
    description: content.description,
    keywords: [varMeta.keyword, ...(tool.keywords ?? [])],
    alternates: { canonical },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      type: "website",
      siteName: "JustUse.me",
    },
    twitter: {
      card: "summary",
      title: content.title,
      description: content.description,
    },
  };
}

export default async function VariationPage({ params }: Props) {
  const { lang, toolId, variation } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const tool = getToolById(toolId);

  if (!tool) notFound();

  const varMeta = getVariation(toolId, variation);
  if (!varMeta) notFound();

  const content = getVariationContent(toolId, variation);
  if (!content) notFound();

  const t = await getDictionary(locale);

  // JSON-LD: WebApplication + HowTo + FAQPage
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: content.title,
      description: content.description,
      url: `https://www.justuse.me/tools/${toolId}/${variation}`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: content.title,
      description: content.description,
      step: content.steps.map((text, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      {/* JSON-LD structured data */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-2">
          {content.title}
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm">
          {content.description}
        </p>
        {tool.runtime === "browser" && !tool.inputMode && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <p className="text-xs text-[var(--color-accent)]">
              {t.tool.processedLocally}
            </p>
          </div>
        )}
      </div>

      {/* Tool UI */}
      <ToolPageClient
        toolId={toolId}
        labels={{
          chooseDifferentFile: t.tool.chooseDifferentFile,
          processFallback: t.tool.processFallback,
          processAnother: t.tool.processAnother,
          tryAgain: t.tool.tryAgain,
          addMoreFiles: t.tool.addMoreFiles,
          dropFileHere: t.tool.dropFileHere,
          dropFilesHere: t.tool.dropFilesHere,
          browse: t.tool.browse,
          anyFile: t.tool.anyFile,
          dragToReorder: t.tool.dragToReorder,
          processNFiles: t.tool.processNFiles,
          downloaded: t.tool.downloaded,
          download: t.tool.download,
          processing: t.tool.processing,
          dailyLimitTitle: t.tool.dailyLimitTitle,
          dailyLimitDesc: t.tool.dailyLimitDesc,
          createFreeAccount: t.tool.createFreeAccount,
          seeProPlans: t.tool.seeProPlans,
          upgradeToPro: t.tool.upgradeToPro,
          maybeLater: t.tool.maybeLater,
          nFiles: t.tool.nFiles,
        }}
      />

      {/* SEO Content */}
      <div className="mt-24 space-y-12">

        {/* How it works */}
        <section>
          <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">
            {t.tool.howItWorks}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]"
              >
                <span className="w-7 h-7 rounded-full bg-[var(--color-accent-glow)] text-[var(--color-accent)] text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        {content.faq.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">
              {t.tool.faq}
            </h2>
            <div className="space-y-3">
              {content.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-[var(--color-text)] select-none">
                    {item.q}
                    <svg
                      className="w-4 h-4 text-[var(--color-text-muted)] transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </summary>
                  <p className="px-4 pb-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
