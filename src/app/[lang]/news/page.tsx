import type { Metadata } from "next";
import { getDictionary, locales, defaultLocale, localePath, type Locale } from "@/lib/i18n";
import { getArticles } from "@/lib/articles";
import ArticleCard from "@/components/news/ArticleCard";

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
}

const ARTICLES_PER_PAGE = 12;

const CATEGORIES = ["tutorial", "comparison", "use-case", "trend"] as const;

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const t = await getDictionary(locale);

  const canonical =
    locale === defaultLocale
      ? "https://justuse.me/news"
      : `https://justuse.me/${locale}/news`;

  return {
    title: t.news.title,
    description: t.news.description,
    alternates: { canonical },
    openGraph: {
      title: `${t.news.title} — JustUse.me`,
      description: t.news.description,
      url: canonical,
      type: "website",
      siteName: "JustUse.me",
    },
  };
}

export default async function NewsPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { category, page } = await searchParams;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const t = await getDictionary(locale);

  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const offset = (currentPage - 1) * ARTICLES_PER_PAGE;

  const { articles, count } = getArticles(category, ARTICLES_PER_PAGE, offset);
  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

  function buildHref(overrides: { category?: string; page?: number }) {
    const params = new URLSearchParams();
    const cat = "category" in overrides ? overrides.category : category;
    const pg = "page" in overrides ? overrides.page : currentPage;
    if (cat) params.set("category", cat);
    if (pg && pg > 1) params.set("page", String(pg));
    const qs = params.toString();
    const base = localePath(locale, "/news");
    return qs ? `${base}?${qs}` : base;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-3">
          {t.news.title}
        </h1>
        <p className="text-[var(--color-text-secondary)]">{t.news.description}</p>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <a
          href={buildHref({ category: undefined, page: 1 })}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !category
              ? "bg-[var(--color-accent)] text-white"
              : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          }`}
        >
          {t.news.allCategories}
        </a>
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={buildHref({ category: cat, page: 1 })}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            }`}
          >
            {t.news[cat as keyof typeof t.news] as string}
          </a>
        ))}
      </div>

      {/* Article grid */}
      {articles.length === 0 ? (
        <p className="text-[var(--color-text-secondary)] py-12 text-center">{t.news.noArticles}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={locale}
              categoryLabel={t.news[article.category as keyof typeof t.news] as string}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <a
              href={buildHref({ page: currentPage - 1 })}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              &larr;
            </a>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <a
              key={pg}
              href={buildHref({ page: pg })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pg === currentPage
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }`}
            >
              {pg}
            </a>
          ))}
          {currentPage < totalPages && (
            <a
              href={buildHref({ page: currentPage + 1 })}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  );
}
