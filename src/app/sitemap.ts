import type { MetadataRoute } from "next";
import { getAllTools, getCategories } from "@/tools/registry";
import { getAllArticleSlugs } from "@/lib/articles";

const baseUrl = "https://justuse.me";
const locales = ["en", "zh-CN", "zh-TW"] as const;

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
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    for (const page of staticPaths) {
      entries.push({
        url: localeUrl(locale, page.path || "/"),
        lastModified: new Date(),
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
        lastModified: new Date(),
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
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: locale === "en" ? 0.9 : 0.8,
        alternates: alternates(`/tools/${tool.id}`),
      });
    }
  }

  // News list page
  for (const locale of locales) {
    entries.push({
      url: localeUrl(locale, "/news"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: locale === "en" ? 0.8 : 0.7,
    });
  }

  // Individual article pages (English-only content but accessible from all locales)
  const articleSlugs = getAllArticleSlugs();
  for (const slug of articleSlugs) {
    entries.push({
      url: `${baseUrl}/news/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  return entries;
}
