import CategoryBubbles from "@/components/home/CategoryBubbles";
import HeroGlow from "@/components/home/HeroGlow";
import { generateSiteJsonLd } from "@/config/seo";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const t = await getDictionary(locale);
  const jsonLd = generateSiteJsonLd();

  return (
    <div className="max-w-xl mx-auto px-6 pt-8 sm:pt-16 pb-16 sm:pb-24 flex flex-col items-center gap-6 sm:gap-10 relative">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HeroGlow />

      <div className="text-center space-y-2 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-sora)] tracking-tight leading-[1.15] text-[var(--color-text)]">
          {t.hero.title}{" "}
          <span className="bg-gradient-to-r from-[var(--color-accent)] to-teal-400 bg-clip-text text-transparent">
            {t.hero.titleAccent}
          </span>
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          {t.hero.subtitle}
        </p>
      </div>

      <CategoryBubbles lang={locale} />
    </div>
  );
}
