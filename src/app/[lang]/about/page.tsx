import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/page/PageTitle";
import { getAllTools } from "@/tools/registry";
import { getDictionary, locales, defaultLocale, localePath, pageAlternates, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const t = await getDictionary(locale);

  const alternates = pageAlternates(locale, "/about");

  return {
    title: t.about.title,
    description: t.about.description,
    alternates,
    openGraph: {
      title: `${t.about.title} — JustUse.me`,
      description: t.about.description,
      url: alternates.canonical,
      type: "website",
      siteName: "JustUse.me",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const t = await getDictionary(locale);

  const canonical = locale === defaultLocale
    ? "https://www.justuse.me/about"
    : `https://www.justuse.me/${locale}/about`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: canonical,
    name: t.about.title,
    description: t.about.description,
    inLanguage: locale,
    isPartOf: { "@id": "https://www.justuse.me/#organization" },
    about: { "@id": "https://www.justuse.me/#organization" },
    mainEntity: { "@id": "https://www.justuse.me/#organization" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: locale === defaultLocale ? "https://www.justuse.me" : `https://www.justuse.me/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t.about.title,
        item: canonical,
      },
    ],
  };

  const toolCount = getAllTools(locale).length;
  const stats = [
    { n: String(toolCount), l: "tools" },
    { n: "0", l: "files uploaded" },
    { n: String(locales.length), l: "languages" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageTitle eyebrow="About" title={t.about.title} lede={t.about.description} />

      <div className="grid grid-cols-3 gap-2.5 mb-10">
        {stats.map((s) => (
          <div
            key={s.l}
            className="text-center px-4 py-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <div className="font-[family-name:var(--font-sora)] text-[32px] font-bold leading-none tracking-tight text-[var(--color-text)]">
              {s.n}
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mt-1.5">
              {s.l}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-lg font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-2">
            {t.about.mission}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {t.about.missionDesc}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-2">
            {t.about.howItWorks}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {t.about.howItWorksDesc}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-2">
            {t.about.team}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {t.about.teamDesc}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-2">
            {t.about.contact}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
            {t.about.contactDesc}
          </p>
          <Link
            href={localePath(locale, "/contact")}
            className="inline-flex px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
          >
            {t.about.contactLink}
          </Link>
        </section>
      </div>
    </div>
  );
}
