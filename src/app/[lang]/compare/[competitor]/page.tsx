import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { competitors, competitorSlugs, getCompetitor, justuseme } from "../compare-data";
import CompareHero from "../components/CompareHero";
import CompareTable from "../components/CompareTable";
import CompareFAQ from "../components/CompareFAQ";
import CompareCTA from "../components/CompareCTA";
import { getToolById } from "@/tools/registry";
import { locales, defaultLocale, localePath, type Locale } from "@/lib/i18n";
import ToolIcon from "@/components/tool/ToolIcon";

export const dynamicParams = false;

interface Props {
  params: Promise<{ lang: string; competitor: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    competitorSlugs.map((competitor) => ({ lang, competitor }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, competitor: slug } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};

  const title = `${competitor.name} vs JustUse.me — Price, Features & Privacy Compared (2026)`;
  const description = `Side-by-side comparison of ${competitor.name} and JustUse.me. Compare pricing (${competitor.price} vs ${justuseme.price}/mo), tool count, file privacy, watermarks, and free-tier limits.`;

  const canonical =
    locale === defaultLocale
      ? `https://www.justuse.me/compare/${slug}`
      : `https://www.justuse.me/${locale}/compare/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "JustUse.me",
    },
    twitter: {
      card: "summary",
      title: `${competitor.name} vs JustUse.me`,
      description,
    },
  };
}

export default async function CompareCompetitorPage({ params }: Props) {
  const { lang, competitor: slug } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const competitor = getCompetitor(slug);

  if (!competitor) notFound();

  /* ── JSON-LD: BreadcrumbList ── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.justuse.me",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: "https://www.justuse.me/compare",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: competitor.name,
        item: `https://www.justuse.me/compare/${slug}`,
      },
    ],
  };

  /* ── JSON-LD: FAQPage ── */
  const faqJsonLd =
    competitor.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: competitor.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;

  /* ── Related tools ── */
  const relatedTools = competitor.relatedTools
    .map((id) => getToolById(id))
    .filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Hero */}
      <CompareHero competitor={competitor} />

      {/* Feature comparison table */}
      <CompareTable competitor={competitor} />

      {/* Editorial sections */}
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-10">
        {competitor.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
              {section.title}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      {/* FAQ */}
      <CompareFAQ faq={competitor.faq} />

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="max-w-2xl mx-auto px-6 py-12">
          <h2 className="text-lg font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-6">
            Related Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {relatedTools.map(
              (tool) =>
                tool && (
                  <Link
                    key={tool.id}
                    href={localePath(locale, `/tools/${tool.id}`)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors text-center"
                  >
                    <ToolIcon toolId={tool.id} size="sm" />
                    <span className="text-xs font-medium text-[var(--color-text)]">
                      {tool.name}
                    </span>
                  </Link>
                )
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <CompareCTA />
    </div>
  );
}
