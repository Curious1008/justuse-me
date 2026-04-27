import Link from "next/link";
import type { Metadata } from "next";
import { competitors, competitorSlugs, justuseme } from "./compare-data";
import CompareCTA from "./components/CompareCTA";
import { locales, defaultLocale, localePath, pageAlternates, type Locale } from "@/lib/i18n";
import { TOOL_COUNT } from "@/tools/registry";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;

  const title = "Best Online Tool Subscriptions Compared (2026) — JustUse.me";
  const description =
    "Side-by-side comparison of Smallpdf, iLovePDF, Adobe Acrobat, TinyPNG, and JustUse.me. Compare pricing, tool count, privacy, watermarks, and free-tier limits to find the best value.";

  const alternates = pageAlternates(locale, "/compare");

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "website",
      siteName: "JustUse.me",
    },
    twitter: {
      card: "summary",
      title: "Online Tool Subscriptions Compared — JustUse.me",
      description,
    },
  };
}

function CheckMark() {
  return (
    <span className="w-5 h-5 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center flex-shrink-0">
      <svg
        className="w-3 h-3 text-[var(--color-accent)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </span>
  );
}

function XMark() {
  return (
    <span className="w-5 h-5 rounded-full bg-[var(--color-error-dim)] flex items-center justify-center flex-shrink-0">
      <svg
        className="w-3 h-3 text-[var(--color-error)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </span>
  );
}

export default async function CompareOverviewPage({ params }: Props) {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;

  const allCompetitors = competitorSlugs.map((slug) => competitors[slug]);

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
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] tracking-tight">
          Best Online Tool Subscriptions Compared
        </h1>
        <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
          How does JustUse.me stack up against Smallpdf, iLovePDF, Adobe Acrobat, and
          TinyPNG? Here is a factual breakdown of pricing, features, and privacy across
          all five services.
        </p>
      </section>

      {/* Summary comparison table */}
      <section className="mb-16">
        <h2 className="text-lg font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-6">
          At a Glance
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="py-4 pl-6 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Service
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Price
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Tools
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Scope
                </th>
                <th className="py-4 px-4 text-center text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Local Processing
                </th>
                <th className="py-4 px-4 text-center text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  No Watermark
                </th>
                <th className="py-4 pr-6 pl-4 text-center text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  No Sign-up
                </th>
              </tr>
            </thead>
            <tbody>
              {/* JustUse.me row — highlighted */}
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-accent-glow)]">
                <td className="py-4 pl-6 pr-4 font-semibold text-[var(--color-accent)]">
                  JustUse.me
                </td>
                <td className="py-4 px-4 font-bold text-[var(--color-accent)]">
                  {justuseme.price}/mo
                </td>
                <td className="py-4 px-4 text-[var(--color-text)]">{justuseme.toolCount}</td>
                <td className="py-4 px-4 text-[var(--color-text-secondary)]">
                  {justuseme.toolScope}
                </td>
                <td className="py-4 px-4">
                  <span className="flex justify-center"><CheckMark /></span>
                </td>
                <td className="py-4 px-4">
                  <span className="flex justify-center"><CheckMark /></span>
                </td>
                <td className="py-4 pr-6 pl-4">
                  <span className="flex justify-center"><CheckMark /></span>
                </td>
              </tr>

              {/* Competitor rows */}
              {allCompetitors.map((c) => (
                <tr
                  key={c.slug}
                  className="border-b border-[var(--color-border-subtle)] last:border-b-0"
                >
                  <td className="py-4 pl-6 pr-4 font-medium text-[var(--color-text)]">
                    <Link
                      href={localePath(locale, `/compare/${c.slug}`)}
                      className="hover:text-[var(--color-accent)] transition-colors underline underline-offset-2"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-[var(--color-text-muted)]">{c.price}</td>
                  <td className="py-4 px-4 text-[var(--color-text-secondary)]">
                    {c.toolCount}
                  </td>
                  <td className="py-4 px-4 text-[var(--color-text-secondary)]">
                    {c.toolScope}
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex justify-center">
                      {c.serverUpload ? <XMark /> : <CheckMark />}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex justify-center">
                      {c.watermark ? <XMark /> : <CheckMark />}
                    </span>
                  </td>
                  <td className="py-4 pr-6 pl-4">
                    <span className="flex justify-center">
                      {c.signupRequired ? <XMark /> : <CheckMark />}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Best Value section */}
      <section className="mb-16">
        <h2 className="text-lg font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">
          Best Value: Price per Tool
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
          One way to evaluate these services is cost per tool per month. Here is how
          the math works out:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* JustUse.me card */}
          <div className="rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-surface)] p-5">
            <p className="text-sm font-semibold text-[var(--color-accent)]">JustUse.me</p>
            <p className="mt-2 text-2xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)]">
              ~${(justuseme.priceNum / TOOL_COUNT).toFixed(2)}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              per tool / month ({justuseme.price} / {TOOL_COUNT} tools)
            </p>
          </div>

          {/* Competitor cards */}
          {allCompetitors.map((c) => {
            const perTool = (
              c.priceNum / Math.max(parseInt(c.toolCount.replace(/[^0-9]/g, ""), 10), 1)
            ).toFixed(2);
            return (
              <div
                key={c.slug}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <p className="text-sm font-semibold text-[var(--color-text)]">{c.name}</p>
                <p className="mt-2 text-2xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-text-muted)]">
                  ~${perTool}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  per tool / month ({c.price} / {c.toolCount} tools)
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Individual comparison links */}
      <section className="mb-16">
        <h2 className="text-lg font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-6">
          Detailed Comparisons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allCompetitors.map((c) => (
            <Link
              key={c.slug}
              href={localePath(locale, `/compare/${c.slug}`)}
              className="flex items-center justify-between p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors group"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {c.name} vs JustUse.me
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {c.price} vs {justuseme.price}/mo &middot; {c.multiplier} price difference
                </p>
              </div>
              <svg
                className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CompareCTA />
    </div>
  );
}
