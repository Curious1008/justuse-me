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

      {/* SEO Content — collapsed by default, fully crawlable by Googlebot */}
      <details className="w-full max-w-2xl mt-20 relative z-10 group">
        <summary className="flex items-center justify-center gap-2 cursor-pointer text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors py-4 border-t border-[var(--color-border)] select-none">
          <span>{t.home.learnMore}</span>
          <svg className="w-3 h-3 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </summary>
        <div className="space-y-6 pt-4 pb-2">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
              {t.home.whatIs}
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              {t.home.whatIsDesc}
            </p>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
              {t.home.whyChoose}
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              {t.home.whyChooseDesc}
            </p>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              {t.home.toolCategories}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
              {[
                { label: "PDF Tools", desc: t.home.pdfDesc },
                { label: "Image Tools", desc: t.home.imageDesc },
                { label: "Text & Code", desc: t.home.textDesc },
                { label: "Converters", desc: t.home.convertDesc },
                { label: "Generators", desc: t.home.generatorDesc },
                { label: "Calculators", desc: t.home.calculatorDesc },
                { label: "Developer", desc: t.home.developerDesc },
                { label: "Utilities", desc: t.home.utilityDesc },
              ].map((cat) => (
                <div key={cat.label}>
                  <h3 className="text-xs font-medium text-[var(--color-text-muted)]">{cat.label}</h3>
                  <p className="text-[10px] text-[var(--color-text-muted)] leading-snug">{cat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
              {t.home.privacyPromise}
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              {t.home.privacyPromiseDesc}
            </p>
          </section>
        </div>
      </details>
    </div>
  );
}
