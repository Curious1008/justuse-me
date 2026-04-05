import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, locales, defaultLocale, localePath, type Locale } from "@/lib/i18n";

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

  const canonical = locale === defaultLocale
    ? "https://www.justuse.me/about"
    : `https://www.justuse.me/${locale}/about`;

  return {
    title: t.about.title,
    description: t.about.description,
    alternates: { canonical },
    openGraph: {
      title: `${t.about.title} — JustUse.me`,
      description: t.about.description,
      url: canonical,
      type: "website",
      siteName: "JustUse.me",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const t = await getDictionary(locale);

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-6">
        {t.about.title}
      </h1>
      <p className="text-[var(--color-text-secondary)] mb-10 leading-relaxed">
        {t.about.description}
      </p>

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
