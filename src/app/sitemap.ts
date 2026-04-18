import type { MetadataRoute } from "next";
import { getAllTools, getCategories } from "@/tools/registry";
import { getAllArticles } from "@/lib/articles";
import { competitorSlugs } from "@/app/[lang]/compare/compare-data";

const baseUrl = "https://www.justuse.me";
const locales = ["en", "zh-CN", "zh-TW"] as const;

// Stable site-wide last-modified date for pages that don't track their own date.
// Bump when there is a meaningful content/structure change; keep in sync with
// WebApplication.dateModified in src/config/seo.ts.
const SITE_LAST_MODIFIED = new Date("2026-04-18");

function localeUrl(locale: string, path: string): string {
  return locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;
}

function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = localeUrl(l, path);
  }
  languages["x-default"] = localeUrl("en", path);
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "", freq: "weekly" as const, priority: 1 },
    { path: "/pricing", freq: "monthly" as const, priority: 0.5 },
    { path: "/contact", freq: "monthly" as const, priority: 0.3 },
    { path: "/privacy", freq: "yearly" as const, priority: 0.2 },
    { path: "/terms", freq: "yearly" as const, priority: 0.2 },
    { path: "/about", freq: "monthly" as const, priority: 0.5 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    for (const page of staticPaths) {
      entries.push({
        url: localeUrl(locale, page.path || "/"),
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: page.freq,
        priority: locale === "en" ? page.priority : page.priority * 0.9,
        alternates: alternates(page.path || "/"),
      });
    }
  }

  // Category pages
  for (const locale of locales) {
    for (const cat of getCategories()) {
      entries.push({
        url: localeUrl(locale, `/${cat}`),
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: locale === "en" ? 0.8 : 0.7,
        alternates: alternates(`/${cat}`),
      });
    }
  }

  // Tool pages
  for (const locale of locales) {
    for (const tool of getAllTools(locale)) {
      entries.push({
        url: localeUrl(locale, `/tools/${tool.id}`),
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: locale === "en" ? 0.9 : 0.8,
        alternates: alternates(`/tools/${tool.id}`),
      });
    }
  }

  // Compare overview page
  for (const locale of locales) {
    entries.push({
      url: localeUrl(locale, "/compare"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: locale === "en" ? 0.8 : 0.7,
      alternates: alternates("/compare"),
    });
  }

  // Individual compare pages
  for (const locale of locales) {
    for (const slug of competitorSlugs) {
      entries.push({
        url: localeUrl(locale, `/compare/${slug}`),
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: locale === "en" ? 0.8 : 0.7,
        alternates: alternates(`/compare/${slug}`),
      });
    }
  }

  // Individual article pages (English-only content but accessible from all locales)
  const articles = getAllArticles();

  // News list page — lastMod reflects the newest article
  const newsLastMod = articles.length
    ? new Date(articles[0].updated_at ?? articles[0].published_at)
    : SITE_LAST_MODIFIED;
  for (const locale of locales) {
    entries.push({
      url: localeUrl(locale, "/news"),
      lastModified: newsLastMod,
      changeFrequency: "daily" as const,
      priority: locale === "en" ? 0.8 : 0.7,
    });
  }

  for (const article of articles) {
    const lastMod = article.updated_at ?? article.published_at;
    entries.push({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(lastMod),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  return entries;
}
