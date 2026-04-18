import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
} from "@/lib/articles";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import ArticleContent from "@/components/news/ArticleContent";
import ArticleCard from "@/components/news/ArticleCard";
import ToolLinkCard from "@/components/news/ToolLinkCard";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return locales.flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const canonical =
    locale === defaultLocale
      ? `https://www.justuse.me/news/${slug}`
      : `https://www.justuse.me/${locale}/news/${slug}`;

  return {
    title: `${article.title} — JustUse.me`,
    description: article.summary,
    keywords: article.keywords,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: canonical,
      type: "article",
      publishedTime: article.published_at,
      siteName: "JustUse.me",
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const dict = await getDictionary(locale);
  const related = getRelatedArticles(article.tools, slug, 3);

  const categoryLabel =
    dict.news[article.category as keyof typeof dict.news] ?? article.category;

  const publishDate = new Date(article.published_at);
  const formattedDate = publishDate.toLocaleDateString(
    locale === "en" ? "en-US" : locale,
    { year: "numeric", month: "long", day: "numeric" }
  );

  const canonical =
    locale === defaultLocale
      ? `https://www.justuse.me/news/${slug}`
      : `https://www.justuse.me/${locale}/news/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    url: canonical,
    datePublished: article.published_at,
    dateModified: article.updated_at ?? article.published_at,
    image: {
      "@type": "ImageObject",
      url: `https://www.justuse.me${locale === defaultLocale ? "" : `/${locale}`}/news/${slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    author: { "@id": "https://www.justuse.me/#organization" },
    publisher: { "@id": "https://www.justuse.me/#organization" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: locale === defaultLocale ? "https://www.justuse.me" : `https://www.justuse.me/${locale}` },
      { "@type": "ListItem", position: 2, name: dict.news.title, item: locale === defaultLocale ? "https://www.justuse.me/news" : `https://www.justuse.me/${locale}/news` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          {/* Category badge + date */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--color-accent)]">
              {categoryLabel}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-4">
            {article.title}
          </h1>

          {/* Summary */}
          <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-8 border-l-2 border-[var(--color-accent)] pl-4">
            {article.summary}
          </p>

          {/* Article body */}
          <ArticleContent content={article.content} />

          {/* Related tool link cards */}
          {article.tools.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg font-semibold mb-4">
                {dict.news.relatedTools}
              </h2>
              <div className="flex flex-wrap gap-3">
                {article.tools.map((toolId) => (
                  <ToolLinkCard key={toolId} toolId={toolId} locale={locale} />
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar — desktop: beside content, mobile: below */}
        {related.length > 0 && (
          <aside className="lg:w-80 shrink-0">
            <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">
              {dict.news.relatedArticles}
            </h2>
            <div className="flex flex-col gap-4">
              {related.map((rel) => (
                <ArticleCard
                  key={rel.slug}
                  article={rel}
                  locale={locale}
                  categoryLabel={
                    (dict.news[rel.category as keyof typeof dict.news] as string) ??
                    rel.category
                  }
                />
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
