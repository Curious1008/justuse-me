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

      {/* SEO Content — visually de-emphasized, crawlable by Googlebot */}
      <div className="w-full max-w-2xl mt-24 pt-10 border-t border-[var(--color-border)] relative z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <div className="space-y-6">
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
      </div>
    </div>
  );
}
