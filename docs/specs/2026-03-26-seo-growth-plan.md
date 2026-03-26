# JustUse.me SEO Growth — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Maximize Google organic traffic through AI-generated content, programmatic long-tail pages, and technical SEO improvements.

**Architecture:** Five phases executed sequentially. Phase A enriches existing tool pages (quick wins). Phase B builds /news infrastructure on Next.js + Supabase ISR. Phase C creates a reusable Cloudflare Worker cron template + JustUse.me instance for automated article generation. Phase D adds programmatic long-tail variation pages. Phase E handles technical SEO cleanup.

**Tech Stack:** Next.js 16 (App Router, ISR), Supabase (articles table), Cloudflare Workers (cron), Anthropic SDK (Sonnet via aicodemirror proxy), Tailwind CSS, Framer Motion

**Spec:** `docs/specs/2026-03-26-seo-growth-design.md`

---

## File Map

### Phase A — Tool Page Enrichment
| Action | Path | Purpose |
|--------|------|---------|
| Modify | `src/config/tool-seo-content.ts` | Add `whyUs` field + enhance FAQ content |
| Modify | `src/app/[lang]/tools/[toolId]/page.tsx` | Render "Why JustUse.me" section |
| Modify | `public/llms.txt` | Fix pricing ($9.9) and limit (3/day) data |

**Note:** HowTo JSON-LD and Organization JSON-LD already exist in `src/config/seo.ts`. No changes needed.

### Phase B — /news Infrastructure
| Action | Path | Purpose |
|--------|------|---------|
| Create | `src/lib/supabase/articles.ts` | Fetch articles from Supabase |
| Create | `src/app/[lang]/news/page.tsx` | Article list page (ISR) |
| Create | `src/app/[lang]/news/[slug]/page.tsx` | Article detail page (ISR) |
| Create | `src/components/news/ArticleCard.tsx` | Article card for list/sidebar |
| Create | `src/components/news/ArticleContent.tsx` | Article body renderer (markdown → HTML) |
| Create | `src/components/news/ToolLinkCard.tsx` | Inline tool link card for articles |
| Create | `src/app/api/revalidate/route.ts` | On-demand ISR revalidation endpoint |
| Modify | `src/components/layout/Header.tsx` | Add "News" nav link |
| Modify | `src/app/sitemap.ts` | Include /news pages |
| Modify | `src/locales/en.ts` | Add news section strings |
| Modify | `src/locales/zh-CN.ts` | Add news section strings |
| Modify | `src/locales/zh-TW.ts` | Add news section strings |

### Phase C — Cloudflare Worker Cron
| Action | Path | Purpose |
|--------|------|---------|
| Create | `~/cron-content-worker/` | Reusable Worker template (separate repo) |
| Create | `~/justuseme-cron/` | JustUse.me Worker instance (separate repo) |

### Phase D — Programmatic Long-tail Pages
| Action | Path | Purpose |
|--------|------|---------|
| Create | `src/tools/variations.json` | Variation config (tool_id + slug + keyword) |
| Create | `src/tools/variation-content.json` | Generated variation SEO content |
| Create | `src/app/[lang]/tools/[toolId]/[variation]/page.tsx` | Variation page |
| Modify | `src/app/sitemap.ts` | Include variation pages |

### Phase E — Technical SEO
| Action | Path | Purpose |
|--------|------|---------|
| Modify | `public/llms.txt` | Add /news section + new tools |
| Modify | `src/app/sitemap.ts` | Final hreflang verification |

**Note:** Organization JSON-LD already exists on homepage via `generateSiteJsonLd()`. No changes needed.

---

## Phase A — Tool Page Enrichment

### Task 1: Add "Why JustUse.me" comparison section + enhance FAQ

**Files:**
- Modify: `src/config/tool-seo-content.ts`
- Modify: `src/app/[lang]/tools/[toolId]/page.tsx`

- [ ] **Step 1: Add `whyUs` field to tool-seo-content.ts**

Add a `whyUs` string field to the `ToolSEOContent` interface and populate it for the top 6 tools first (merge-pdf, compress-pdf, pdf-to-jpg, compress-image, heic-to-jpg, resize-image). Example:

```typescript
// In the ToolSEOContent interface, add:
whyUs?: string;

// In merge-pdf entry:
whyUs: "Unlike Smallpdf and iLovePDF, JustUse.me merges your PDFs entirely in your browser. Your documents are never uploaded to any server — ideal for contracts, medical records, or any sensitive files. No watermarks, no account required, no file size tricks.",
```

Write similar comparison paragraphs for each of the 6 priority tools. Each should be 2-3 sentences mentioning specific competitors and the privacy/no-watermark advantage.

Also enhance the `faq` arrays for these 6 tools with more targeted questions based on Google "People Also Ask" patterns. Replace generic questions with specific, search-intent-driven ones. Each tool should have 4-5 FAQs.

- [ ] **Step 2: Render "Why JustUse.me" section on tool page**

In `src/app/[lang]/tools/[toolId]/page.tsx`, after the FAQ section, add:

```tsx
{seoContent?.whyUs && (
  <section className="mt-12">
    <h2 className="text-xl font-semibold mb-4">
      Why JustUse.me for {tool.name}?
    </h2>
    <p className="text-[var(--color-text-secondary)] leading-relaxed">
      {seoContent.whyUs}
    </p>
  </section>
)}
```

- [ ] **Step 3: Verify locally**

Run: `cd /Users/harry/Desktop/justuse-me && npm run dev`
Check: Visit `http://localhost:3000/tools/merge-pdf`, scroll down past FAQ, verify "Why JustUse.me" section appears.

- [ ] **Step 4: Commit**

```bash
git add src/config/tool-seo-content.ts src/app/[lang]/tools/[toolId]/page.tsx
git commit -m "feat: add 'Why JustUse.me' section + enhance FAQ content"
```

---

### Task 2: Fix llms.txt data inconsistencies

**Files:**
- Modify: `public/llms.txt`

- [ ] **Step 1: Fix pricing and limit data**

In `public/llms.txt`, find and fix:
- `Free (5 uses/day per tool)` → `Free (3 uses/day)`
- `Pro $6/month` → `Pro $9.9/month`
- Update the tool count to reflect actual count (50 tools, not 30)
- Update the comparison table free daily limit from `3/tool/day` to `3/day`

- [ ] **Step 2: Commit**

```bash
git add public/llms.txt
git commit -m "fix: correct pricing and usage limits in llms.txt"
```

---

## Phase B — /news Infrastructure

### Task 4: Create Supabase articles table

- [ ] **Step 1: Run SQL in Supabase Dashboard**

Go to Supabase Dashboard → SQL Editor → run:

```sql
CREATE TABLE public.articles (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tutorial', 'comparison', 'use-case', 'trend')),
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  tools TEXT[] NOT NULL DEFAULT '{}',
  keywords TEXT[] NOT NULL DEFAULT '{}',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_articles_slug ON public.articles (slug);
CREATE INDEX idx_articles_category ON public.articles (category);
CREATE INDEX idx_articles_published ON public.articles (published_at DESC);
CREATE INDEX idx_articles_status ON public.articles (status);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published articles"
  ON public.articles FOR SELECT
  USING (status = 'published');
```

- [ ] **Step 2: Insert a test article for development**

```sql
INSERT INTO public.articles (slug, title, summary, content, category, tools, keywords)
VALUES (
  'how-to-merge-pdf-files',
  'How to Merge PDF Files Online Without Uploading',
  'Learn how to combine multiple PDF documents into one file using a free browser-based tool that never uploads your data.',
  '## Why Merge PDFs in the Browser?\n\nMost online PDF tools require uploading your files to remote servers...\n\n## Step-by-Step Guide\n\n1. Open [JustUse.me Merge PDF](/tools/merge-pdf)\n2. Drag and drop your PDF files\n3. Reorder pages if needed\n4. Click Merge and download\n\n## Privacy Advantage\n\nUnlike Smallpdf or iLovePDF, JustUse.me processes everything client-side.',
  'tutorial',
  ARRAY['merge-pdf', 'split-pdf'],
  ARRAY['merge pdf', 'combine pdf', 'pdf merger']
);
```

---

### Task 5: Create article data fetching layer

**Files:**
- Create: `src/lib/supabase/articles.ts`

- [ ] **Step 1: Create articles.ts**

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Article {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: "tutorial" | "comparison" | "use-case" | "trend";
  status: "draft" | "published";
  tools: string[];
  keywords: string[];
  published_at: string;
  updated_at: string;
}

export async function getArticles(
  category?: string,
  limit = 20,
  offset = 0
): Promise<{ articles: Article[]; count: number }> {
  let query = supabase
    .from("articles")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, count, error } = await query;
  if (error) throw error;
  return { articles: (data as Article[]) ?? [], count: count ?? 0 };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data as Article;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .eq("status", "published");

  if (error) return [];
  return (data ?? []).map((a) => a.slug);
}

export async function getRelatedArticles(
  toolIds: string[],
  excludeSlug: string,
  limit = 3
): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .neq("slug", excludeSlug)
    .overlaps("tools", toolIds)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data as Article[]) ?? [];
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/harry/Desktop/justuse-me && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/lib/supabase/articles.ts
git commit -m "feat: add article data fetching layer for /news"
```

---

### Task 6: Add i18n strings for /news

**Files:**
- Modify: `src/locales/en.ts`
- Modify: `src/locales/zh-CN.ts`
- Modify: `src/locales/zh-TW.ts`

- [ ] **Step 1: Read current locale files to find the pattern**

Run: Read `src/locales/en.ts` to see the dictionary structure

- [ ] **Step 2: Add news section strings to all 3 locales**

Add to each locale file:

```typescript
// en.ts
news: {
  title: "News & Guides",
  description: "Tips, tutorials, and insights about file tools and productivity.",
  readMore: "Read more",
  publishedOn: "Published on",
  relatedTools: "Related Tools",
  relatedArticles: "Related Articles",
  allCategories: "All",
  tutorial: "Tutorial",
  comparison: "Comparison",
  "use-case": "Use Case",
  trend: "Trend",
  noArticles: "No articles yet. Check back soon!",
},

// zh-CN.ts
news: {
  title: "资讯与教程",
  description: "文件工具使用技巧、教程和生产力建议。",
  readMore: "阅读更多",
  publishedOn: "发布于",
  relatedTools: "相关工具",
  relatedArticles: "相关文章",
  allCategories: "全部",
  tutorial: "教程",
  comparison: "对比",
  "use-case": "使用场景",
  trend: "趋势",
  noArticles: "暂无文章，敬请期待！",
},

// zh-TW.ts
news: {
  title: "資訊與教學",
  description: "檔案工具使用技巧、教學和生產力建議。",
  readMore: "閱讀更多",
  publishedOn: "發佈於",
  relatedTools: "相關工具",
  relatedArticles: "相關文章",
  allCategories: "全部",
  tutorial: "教學",
  comparison: "比較",
  "use-case": "使用場景",
  trend: "趨勢",
  noArticles: "暫無文章，敬請期待！",
},
```

Also update the Dictionary type if it exists.

- [ ] **Step 3: Commit**

```bash
git add src/locales/en.ts src/locales/zh-CN.ts src/locales/zh-TW.ts
git commit -m "feat: add i18n strings for /news section"
```

---

### Task 7: Create ArticleCard component

**Files:**
- Create: `src/components/news/ArticleCard.tsx`

- [ ] **Step 1: Read ToolCard.tsx for design reference**

Run: Read `src/components/category/ToolCard.tsx` to match style patterns (card shape, hover effects, Framer Motion usage, color variables).

- [ ] **Step 2: Create ArticleCard.tsx**

Match the visual style of ToolCard — same rounded corners, shadow, hover scale, color variables. The card shows: title, summary (truncated to 2 lines), published date, category badge, tool tags.

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Article } from "@/lib/supabase/articles";
import { localePath, type Locale } from "@/lib/i18n";

interface ArticleCardProps {
  article: Article;
  locale: Locale;
  dict: Record<string, string>;
}

export default function ArticleCard({ article, locale, dict }: ArticleCardProps) {
  const date = new Date(article.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={localePath(locale, `/news/${article.slug}`)}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium">
            {dict[article.category] || article.category}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">{date}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
          {article.summary}
        </p>
        {article.tools.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {article.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </Link>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/news/ArticleCard.tsx
git commit -m "feat: add ArticleCard component for /news list"
```

---

### Task 8: Create ToolLinkCard component

**Files:**
- Create: `src/components/news/ToolLinkCard.tsx`

- [ ] **Step 1: Create ToolLinkCard.tsx**

Inline tool link card for use inside article content. Shows tool icon + name + description with hover animation.

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getToolById } from "@/tools/registry";
import { localePath, type Locale } from "@/lib/i18n";

interface ToolLinkCardProps {
  toolId: string;
  locale: Locale;
}

export default function ToolLinkCard({ toolId, locale }: ToolLinkCardProps) {
  const tool = getToolById(toolId);
  if (!tool) return null;

  return (
    <Link href={localePath(locale, `/tools/${toolId}`)}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="inline-flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 hover:shadow-md transition-shadow"
      >
        <span className="text-2xl">{tool.icon}</span>
        <div>
          <div className="font-medium text-sm">{tool.name}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">{tool.description}</div>
        </div>
      </motion.div>
    </Link>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/news/ToolLinkCard.tsx
git commit -m "feat: add ToolLinkCard for inline tool links in articles"
```

---

### Task 9: Create ArticleContent renderer

**Files:**
- Create: `src/components/news/ArticleContent.tsx`

- [ ] **Step 1: Create ArticleContent.tsx**

Renders markdown article content to HTML. The project already has `marked` installed. Content comes from our own Supabase (Worker-generated), but sanitize as defense-in-depth.

```tsx
import { marked } from "marked";

interface ArticleContentProps {
  content: string;
}

function sanitizeHtml(html: string): string {
  // Strip script tags and event handlers as defense-in-depth
  // Content is from our own Worker but sanitize anyway
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\bon\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\bon\w+\s*=\s*'[^']*'/gi, "");
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const rawHtml = marked.parse(content, { async: false }) as string;
  const html = sanitizeHtml(rawHtml);

  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:text-[var(--color-text)]
        prose-p:text-[var(--color-text-secondary)]
        prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-[var(--color-text)]
        prose-code:text-[var(--color-accent)] prose-code:bg-[var(--color-bg-secondary)] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-li:text-[var(--color-text-secondary)]
        dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/news/ArticleContent.tsx
git commit -m "feat: add ArticleContent markdown renderer for /news"
```

---

### Task 10: Create /news list page

**Files:**
- Create: `src/app/[lang]/news/page.tsx`

- [ ] **Step 1: Read category page for layout reference**

Run: Read `src/app/[lang]/[category]/page.tsx` for grid layout patterns, metadata generation, and locale handling.

- [ ] **Step 2: Create /news list page**

```tsx
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getArticles } from "@/lib/supabase/articles";
import ArticleCard from "@/components/news/ArticleCard";

export const revalidate = 3600; // ISR: 1 hour

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${dict.news.title} - JustUse.me`,
    description: dict.news.description,
  };
}

export default async function NewsPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { category, page } = await searchParams;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const pageNum = parseInt(page || "1", 10);
  const limit = 12;
  const offset = (pageNum - 1) * limit;

  const { articles, count } = await getArticles(category, limit, offset);
  const totalPages = Math.ceil((count ?? 0) / limit);

  const categories = ["tutorial", "comparison", "use-case", "trend"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{dict.news.title}</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">{dict.news.description}</p>

      {/* Category filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <a
          href={`/${locale === "en" ? "" : locale + "/"}news`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !category
              ? "bg-[var(--color-accent)] text-white"
              : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
          }`}
        >
          {dict.news.allCategories}
        </a>
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/${locale === "en" ? "" : locale + "/"}news?category=${cat}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
            }`}
          >
            {dict.news[cat as keyof typeof dict.news] || cat}
          </a>
        ))}
      </div>

      {/* Article grid */}
      {articles.length === 0 ? (
        <p className="text-center text-[var(--color-text-secondary)] py-20">
          {dict.news.noArticles}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={locale}
              dict={dict.news}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/${locale === "en" ? "" : locale + "/"}news?${category ? `category=${category}&` : ""}page=${p}`}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                p === pageNum
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify locally**

Run: `cd /Users/harry/Desktop/justuse-me && npm run dev`
Check: Visit `http://localhost:3000/news` — should show the test article from Task 4.

- [ ] **Step 4: Commit**

```bash
git add src/app/[lang]/news/page.tsx
git commit -m "feat: add /news list page with ISR and category filters"
```

---

### Task 11: Create /news/[slug] article detail page

**Files:**
- Create: `src/app/[lang]/news/[slug]/page.tsx`

- [ ] **Step 1: Create article detail page**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
} from "@/lib/supabase/articles";
import { getToolById } from "@/tools/registry";
import ArticleContent from "@/components/news/ArticleContent";
import ArticleCard from "@/components/news/ArticleCard";
import ToolLinkCard from "@/components/news/ToolLinkCard";

export const revalidate = 86400; // ISR: 24 hours

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  // Articles are English-only per spec — only generate en params
  // Chinese locale users will see English content (Header/Footer still localized)
  const slugs = await getAllArticleSlugs();
  const locales = ["en", "zh-CN", "zh-TW"];
  return locales.flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}
// Note: all 3 locales get pages so Chinese users can access via their
// locale prefix, but content is always English. No hreflang alternates
// needed since all locales serve the same content.

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.title} - JustUse.me`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = await getRelatedArticles(article.tools, slug);
  const date = new Date(article.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    publisher: {
      "@type": "Organization",
      name: "JustUse.me",
      url: "https://justuse.me",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            <div className="mb-6">
              <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium">
                {dict.news[article.category as keyof typeof dict.news] || article.category}
              </span>
              <span className="text-sm text-[var(--color-text-secondary)] ml-3">
                {dict.news.publishedOn} {date}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              {article.summary}
            </p>
            <ArticleContent content={article.content} />

            {/* Tool links */}
            {article.tools.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">{dict.news.relatedTools}</h2>
                <div className="flex flex-wrap gap-3">
                  {article.tools.map((toolId) => (
                    <ToolLinkCard key={toolId} toolId={toolId} locale={locale} />
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar (desktop) / Bottom (mobile) */}
          {relatedArticles.length > 0 && (
            <aside className="lg:w-80 shrink-0">
              <h2 className="text-lg font-semibold mb-4">{dict.news.relatedArticles}</h2>
              <div className="flex flex-col gap-4">
                {relatedArticles.map((a) => (
                  <ArticleCard key={a.slug} article={a} locale={locale} dict={dict.news} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify locally**

Run: `npm run dev`
Check: Visit `http://localhost:3000/news/how-to-merge-pdf-files` — should show the test article with title, content, related tools sidebar.

- [ ] **Step 3: Commit**

```bash
git add src/app/[lang]/news/[slug]/page.tsx
git commit -m "feat: add /news/[slug] article detail page with Article JSON-LD"
```

---

### Task 12: Add /news to Header nav and sitemap

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add News link to Header**

Read `src/components/layout/Header.tsx`. Find the nav links section (where Pricing and Contact are). Add a "News" link between them:

```tsx
<Link href={localePath(locale, "/news")} className={navLinkClass}>
  {dict.nav.news || "News"}
</Link>
```

Also add `news: "News"` to the nav section of `en.ts` (and Chinese equivalents: `news: "资讯"` / `news: "資訊"`).

- [ ] **Step 2: Add /news pages to sitemap**

Read `src/app/sitemap.ts`. Add article pages after tool pages:

```typescript
import { getAllArticleSlugs } from "@/lib/supabase/articles";

// Inside sitemap() function, after tool pages:
const articleSlugs = await getAllArticleSlugs();
for (const slug of articleSlugs) {
  // News articles are English-only, no locale variants
  entries.push({
    url: `${baseUrl}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  });
}

// Add /news list page
entries.push({
  url: `${baseUrl}/news`,
  lastModified: new Date(),
  changeFrequency: "daily" as const,
  priority: 0.8,
});
```

Make the sitemap function `async` if it isn't already.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx src/app/sitemap.ts src/locales/en.ts src/locales/zh-CN.ts src/locales/zh-TW.ts
git commit -m "feat: add News to header nav and sitemap"
```

---

### Task 13: Create revalidation API endpoint

**Files:**
- Create: `src/app/api/revalidate/route.ts`

- [ ] **Step 1: Create revalidation endpoint**

```typescript
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ error: "Path required" }, { status: 400 });
  }

  revalidatePath(path);
  return NextResponse.json({ revalidated: true, path });
}
```

- [ ] **Step 2: Add REVALIDATE_SECRET to .env.local**

Generate a random secret and add to `.env.local`:
```
REVALIDATE_SECRET=justuseme-revalidate-<random-string>
```

Also add to Vercel env vars later during deployment.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/revalidate/route.ts
git commit -m "feat: add on-demand ISR revalidation endpoint"
```

---

## Phase C — Cloudflare Worker Cron

### Task 14: Create reusable cron-content-worker template

**Files:**
- Create: `~/cron-content-worker/` (new repo)

- [ ] **Step 1: Scaffold Worker project**

```bash
cd ~
mkdir cron-content-worker && cd cron-content-worker
npm init -y
npm install wrangler@latest @anthropic-ai/sdk @supabase/supabase-js
npm install -D typescript @types/node
npx tsc --init --target ES2022 --module ESNext --moduleResolution bundler --outDir dist
```

- [ ] **Step 2: Create wrangler.toml template**

```toml
name = "cron-content-worker-template"
main = "src/index.ts"
compatibility_date = "2024-12-01"

[triggers]
crons = ["0 6 * * *"]  # Default: 6 AM UTC daily, override in instance
```

- [ ] **Step 3: Create src/index.ts (main entry)**

```typescript
import { generateContent } from "./ai";
import { getNextTopics, saveArticle } from "./db";
import { triggerRevalidation } from "./revalidate";
import type { ContentConfig } from "./types";

export interface Env {
  ANTHROPIC_API_KEY: string;
  ANTHROPIC_BASE_URL: string;
  ANTHROPIC_MODEL: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  REVALIDATE_URL?: string;
  REVALIDATE_SECRET?: string;
  CONTENT_CONFIG: string; // JSON string of ContentConfig
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const config: ContentConfig = JSON.parse(env.CONTENT_CONFIG);
    const topics = await getNextTopics(env, config.topicsPerRun || 3);

    for (const topic of topics) {
      try {
        const article = await generateContent(env, config, topic);
        await saveArticle(env, article);
        console.log(`Generated: ${article.slug}`);
      } catch (err) {
        console.error(`Failed topic "${topic.keyword}":`, err);
      }
    }

    if (env.REVALIDATE_URL && env.REVALIDATE_SECRET) {
      await triggerRevalidation(env.REVALIDATE_URL, env.REVALIDATE_SECRET);
    }
  },
};
```

- [ ] **Step 4: Create src/types.ts**

```typescript
export interface ContentConfig {
  topicsPerRun: number;
  articleType: string;
  systemPrompt: string;
  articlePromptTemplate: string; // Uses {{keyword}}, {{context}}, {{tools}}
  targetTable: string;
  topicsTable: string;
}

export interface Topic {
  id: number;
  keyword: string;
  context: string;
  category: string;
  tools: string[];
  status: "pending" | "generated" | "failed";
}

export interface GeneratedArticle {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tools: string[];
  keywords: string[];
}
```

- [ ] **Step 5: Create src/ai.ts**

```typescript
import Anthropic from "@anthropic-ai/sdk";
import type { Env } from "./index";
import type { ContentConfig, Topic, GeneratedArticle } from "./types";

export async function generateContent(
  env: Env,
  config: ContentConfig,
  topic: Topic
): Promise<GeneratedArticle> {
  const client = new Anthropic({
    apiKey: env.ANTHROPIC_API_KEY,
    baseURL: env.ANTHROPIC_BASE_URL,
  });

  const prompt = config.articlePromptTemplate
    .replace("{{keyword}}", topic.keyword)
    .replace("{{context}}", topic.context)
    .replace("{{tools}}", topic.tools.join(", "))
    .replace("{{category}}", topic.category);

  const message = await client.messages.create({
    model: env.ANTHROPIC_MODEL,
    max_tokens: 4096,
    system: config.systemPrompt,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  // Parse structured JSON response
  const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/);
  if (!jsonMatch) throw new Error("AI response did not contain JSON block");

  const parsed = JSON.parse(jsonMatch[1]) as GeneratedArticle;
  parsed.keywords = [topic.keyword, ...parsed.keywords];
  parsed.tools = topic.tools;
  parsed.category = topic.category;

  return parsed;
}
```

- [ ] **Step 6: Create src/db.ts**

```typescript
import { createClient } from "@supabase/supabase-js";
import type { Env } from "./index";
import type { ContentConfig, Topic, GeneratedArticle } from "./types";

function getClient(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function getNextTopics(
  env: Env,
  limit: number
): Promise<Topic[]> {
  const db = getClient(env);
  const config: ContentConfig = JSON.parse(env.CONTENT_CONFIG);

  const { data, error } = await db
    .from(config.topicsTable)
    .select("*")
    .eq("status", "pending")
    .order("id", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Topic[];
}

export async function saveArticle(
  env: Env,
  article: GeneratedArticle
): Promise<void> {
  const db = getClient(env);
  const config: ContentConfig = JSON.parse(env.CONTENT_CONFIG);

  const { error } = await db.from(config.targetTable).insert({
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    content: article.content,
    category: article.category,
    tools: article.tools,
    keywords: article.keywords,
    status: "published",
  });

  if (error) throw error;
}

export async function markTopicDone(
  env: Env,
  topicId: number,
  status: "generated" | "failed"
): Promise<void> {
  const db = getClient(env);
  const config: ContentConfig = JSON.parse(env.CONTENT_CONFIG);

  await db
    .from(config.topicsTable)
    .update({ status })
    .eq("id", topicId);
}
```

- [ ] **Step 7: Create src/revalidate.ts**

```typescript
export async function triggerRevalidation(
  url: string,
  secret: string
): Promise<void> {
  const res = await fetch(`${url}?secret=${secret}&path=/news`, {
    method: "POST",
  });
  if (!res.ok) {
    console.error("Revalidation failed:", await res.text());
  }
}
```

- [ ] **Step 8: Create .gitignore and README**

```bash
echo "node_modules/\ndist/\n.wrangler/\n.dev.vars" > .gitignore
```

- [ ] **Step 9: Init git and commit**

```bash
cd ~/cron-content-worker
git init
git add .
git commit -m "feat: initial cron-content-worker reusable template"
```

---

### Task 15: Create JustUse.me Worker instance

**Files:**
- Create: `~/justuseme-cron/` (new repo)

- [ ] **Step 1: Copy template and customize**

```bash
cp -r ~/cron-content-worker ~/justuseme-cron
cd ~/justuseme-cron
rm -rf .git
git init
```

- [ ] **Step 2: Update wrangler.toml**

```toml
name = "justuseme-cron"
main = "src/index.ts"
compatibility_date = "2024-12-01"

[triggers]
crons = ["0 6 * * *"]  # 6 AM UTC daily

[vars]
ANTHROPIC_MODEL = "claude-sonnet-4-5-20250929"
CONTENT_CONFIG = '{"topicsPerRun":3,"targetTable":"articles","topicsTable":"article_topics","systemPrompt":"...","articlePromptTemplate":"..."}'
```

- [ ] **Step 3: Create Supabase topics table**

Run in Supabase SQL Editor:

```sql
CREATE TABLE public.article_topics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  keyword TEXT NOT NULL,
  context TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('tutorial', 'comparison', 'use-case', 'trend')),
  tools TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'generated', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_topics_status ON public.article_topics (status);
```

- [ ] **Step 4: Seed initial keyword batch (10 topics)**

```sql
INSERT INTO public.article_topics (keyword, context, category, tools) VALUES
('how to merge pdf files online free', 'User wants to combine multiple PDFs without installing software', 'tutorial', ARRAY['merge-pdf']),
('compress pdf under 1mb for email', 'User needs to reduce PDF size for email attachment limits', 'tutorial', ARRAY['compress-pdf']),
('heic vs jpg which format is better', 'Compare Apple HEIC format with universal JPG', 'comparison', ARRAY['heic-to-jpg']),
('best free pdf tools 2026', 'Overview of browser-based PDF tools vs desktop software', 'comparison', ARRAY['merge-pdf', 'split-pdf', 'compress-pdf']),
('how to extract text from image', 'User wants OCR for screenshots or scanned documents', 'tutorial', ARRAY['ocr-image']),
('convert csv to json for api', 'Developer needs to transform spreadsheet data to JSON', 'tutorial', ARRAY['csv-to-json']),
('resize image for social media', 'Common dimensions for Instagram, Twitter, LinkedIn posts', 'use-case', ARRAY['resize-image', 'crop-image']),
('why browser based tools are safer', 'Privacy advantages of client-side file processing', 'trend', ARRAY['merge-pdf', 'compress-image']),
('best free image compressor online', 'Compare browser-based image compression tools', 'comparison', ARRAY['compress-image']),
('how to convert png to jpg without losing quality', 'Practical guide to format conversion with quality control', 'tutorial', ARRAY['png-to-jpg', 'jpg-to-png']);
```

- [ ] **Step 5: Write the CONTENT_CONFIG with full prompt**

Update `wrangler.toml` CONTENT_CONFIG var (or move to `.dev.vars` for development). The system prompt and article prompt template should enforce:
- Natural, specific writing (no AI filler phrases)
- 800-1500 words
- Response must be a JSON block with fields: slug, title, summary, content, keywords
- Internal links formatted as markdown: `[Tool Name](/tools/tool-id)`

- [ ] **Step 6: Configure Worker secrets**

```bash
cd ~/justuseme-cron
npx wrangler secret put ANTHROPIC_API_KEY
# Enter: (API key from memory: ai_api_proxy.md)
npx wrangler secret put ANTHROPIC_BASE_URL
# Enter: https://api.aicodemirror.com/api/claudecode
npx wrangler secret put SUPABASE_URL
# Enter: (JustUse.me Supabase URL from .env.local)
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
# Enter: (JustUse.me Supabase service role key from .env.local)
npx wrangler secret put REVALIDATE_SECRET
# Enter: (same as REVALIDATE_SECRET in .env.local)
npx wrangler secret put REVALIDATE_URL
# Enter: https://justuse.me/api/revalidate
```

- [ ] **Step 7: Test locally**

```bash
npx wrangler dev --test-scheduled
# Then trigger: curl "http://localhost:8787/__scheduled?cron=0+6+*+*+*"
```

Verify: check Supabase articles table for new entries.

- [ ] **Step 8: Deploy**

```bash
npx wrangler deploy
```

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "feat: JustUse.me cron worker for daily article generation"
```

---

## Phase D — Programmatic Long-tail Pages

### Task 16: Create variation config and content files

**Files:**
- Create: `src/tools/variations.json`
- Create: `src/tools/variation-content.json`

- [ ] **Step 1: Create variations.json with P0 tools (6 tools x 5 variations)**

```json
[
  { "toolId": "merge-pdf", "slug": "for-students", "keyword": "merge pdf for students", "context": "Combining assignment PDFs, lecture notes, research papers" },
  { "toolId": "merge-pdf", "slug": "for-lawyers", "keyword": "merge legal pdf documents", "context": "Combining contracts, court filings, legal briefs" },
  { "toolId": "merge-pdf", "slug": "for-email", "keyword": "merge pdf for email attachment", "context": "Combining documents to send as single email attachment" },
  { "toolId": "merge-pdf", "slug": "without-watermark", "keyword": "merge pdf free no watermark", "context": "Free alternative to tools that add watermarks" },
  { "toolId": "merge-pdf", "slug": "on-iphone", "keyword": "merge pdf on iphone", "context": "Using browser-based tool on mobile Safari" },
  // ... similar for compress-pdf, pdf-to-jpg, compress-image, heic-to-jpg, resize-image
]
```

Create the full 30 entries for 6 tools x 5 variations each.

- [ ] **Step 2: Create variation-content.json**

Initially empty array `[]`. This will be populated by a generation script that calls Sonnet to produce title, description, steps, and FAQ for each variation. For now, create a placeholder for the first variation to test the page template:

```json
[
  {
    "toolId": "merge-pdf",
    "slug": "for-students",
    "title": "Merge PDF Files for Students — Free, No Watermark",
    "description": "Combine assignment PDFs, lecture notes, and research papers into one document. Runs in your browser — your academic files stay private.",
    "steps": [
      "Open JustUse.me Merge PDF — no signup needed",
      "Drag your assignment PDFs, notes, or papers into the drop zone",
      "Reorder pages to match your submission requirements",
      "Click Merge and download your combined PDF"
    ],
    "faq": [
      { "q": "Can I merge my assignment PDFs without creating an account?", "a": "Yes. JustUse.me requires no account for free usage. Just drop your files and merge." },
      { "q": "Will my professor's documents be uploaded to a server?", "a": "No. All processing happens in your browser. Your files never leave your device." },
      { "q": "Is there a page limit for merging?", "a": "You can merge up to 20 PDFs, each up to 30MB. That covers most academic documents." }
    ]
  }
]
```

- [ ] **Step 3: Commit**

```bash
git add src/tools/variations.json src/tools/variation-content.json
git commit -m "feat: add variation config and content for long-tail pages"
```

---

### Task 17: Create variation page template

**Files:**
- Create: `src/app/[lang]/tools/[toolId]/[variation]/page.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Read the main tool page for reference**

Run: Read `src/app/[lang]/tools/[toolId]/page.tsx` to understand the rendering pattern.

- [ ] **Step 2: Create variation page**

This page imports the same tool UI (ToolPageClient) but uses variation-specific SEO content.

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getToolById } from "@/tools/registry";
import ToolPageClient from "../client";
import variations from "@/tools/variations.json";
import variationContent from "@/tools/variation-content.json";

interface Props {
  params: Promise<{ lang: string; toolId: string; variation: string }>;
}

export async function generateStaticParams() {
  const locales = ["en", "zh-CN", "zh-TW"];
  return locales.flatMap((lang) =>
    variations.map((v) => ({
      lang,
      toolId: v.toolId,
      variation: v.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolId, variation } = await params;
  const content = variationContent.find(
    (v) => v.toolId === toolId && v.slug === variation
  );
  if (!content) return { title: "Not Found" };

  return {
    title: `${content.title} - JustUse.me`,
    description: content.description,
    alternates: {
      canonical: `https://justuse.me/tools/${toolId}/${variation}`,
    },
  };
}

export default async function VariationPage({ params }: Props) {
  const { lang, toolId, variation } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const tool = getToolById(toolId);
  if (!tool) notFound();

  const content = variationContent.find(
    (v) => v.toolId === toolId && v.slug === variation
  );
  if (!content) notFound();

  // JSON-LD for variation
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: content.title,
      description: content.description,
      url: `https://justuse.me/tools/${toolId}/${variation}`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: content.title,
      step: content.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text: s,
      })),
    },
    content.faq.length > 0 && {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Variation-specific hero */}
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
          {content.description}
        </p>

        {/* Reuse the same tool UI — must pass labels object matching ToolLabels interface */}
        <ToolPageClient toolId={toolId} labels={{
          chooseDifferentFile: dict.tool.chooseDifferentFile,
          processFallback: dict.tool.processFallback,
          processAnother: dict.tool.processAnother,
          tryAgain: dict.tool.tryAgain,
          addMoreFiles: dict.tool.addMoreFiles,
          dropFileHere: dict.tool.dropFileHere,
          dropFilesHere: dict.tool.dropFilesHere,
          browse: dict.tool.browse,
          anyFile: dict.tool.anyFile,
          dragToReorder: dict.tool.dragToReorder,
          processNFiles: dict.tool.processNFiles,
          downloaded: dict.tool.downloaded,
          download: dict.tool.download,
          processing: dict.tool.processing,
          dailyLimitTitle: dict.tool.dailyLimitTitle,
          dailyLimitDesc: dict.tool.dailyLimitDesc,
          createFreeAccount: dict.tool.createFreeAccount,
          seeProPlans: dict.tool.seeProPlans,
          upgradeToPro: dict.tool.upgradeToPro,
          maybeLater: dict.tool.maybeLater,
          nFiles: dict.tool.nFiles,
        }} />

        {/* Variation-specific steps */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">{dict.tool?.howItWorks || "How it works"}</h2>
          <ol className="list-decimal list-inside space-y-2 text-[var(--color-text-secondary)]">
            {content.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>

        {/* Variation-specific FAQ */}
        {content.faq.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">FAQ</h2>
            <div className="space-y-4">
              {content.faq.map((f, i) => (
                <details key={i} className="group border border-[var(--color-border)] rounded-xl p-4">
                  <summary className="font-medium cursor-pointer">{f.q}</summary>
                  <p className="mt-2 text-[var(--color-text-secondary)]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 3: Add variations to sitemap**

In `src/app/sitemap.ts`, add after tool pages:

```typescript
import variationsData from "@/tools/variations.json";

// Variation pages (English-only for SEO, but generate for all locales)
for (const locale of locales) {
  for (const v of variationsData) {
    entries.push({
      url: localeUrl(locale, `/tools/${v.toolId}/${v.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.8 : 0.7,
    });
  }
}
```

- [ ] **Step 4: Verify locally**

Run: `npm run dev`
Check: Visit `http://localhost:3000/tools/merge-pdf/for-students` — should show variation title, the merge-pdf tool UI, and variation-specific steps/FAQ.

- [ ] **Step 5: Commit**

```bash
git add src/app/[lang]/tools/[toolId]/[variation]/page.tsx src/app/sitemap.ts
git commit -m "feat: add programmatic variation pages for long-tail SEO"
```

---

## Phase E — Technical SEO Cleanup

**Note:** Organization JSON-LD already exists on homepage via `generateSiteJsonLd()` in `seo.ts`. No task needed.

### Task 18: Update llms.txt with new tools and /news

**Files:**
- Modify: `public/llms.txt`

- [ ] **Step 1: Add missing tools to llms.txt**

The current llms.txt lists ~30 tools but the site has 50. Add the missing tools (generators, converters, and newer tools) following the existing format.

- [ ] **Step 2: Add /news section**

Add after the tool sections:

```
## News & Guides

JustUse.me publishes tutorials, comparisons, and productivity guides at https://justuse.me/news. Articles cover practical file processing tips, format comparisons, and use-case guides. All articles link to relevant tools.
```

- [ ] **Step 3: Commit**

```bash
git add public/llms.txt
git commit -m "feat: update llms.txt with all 50 tools and /news section"
```

---

### Task 19: Final build verification

- [ ] **Step 1: Full build check**

```bash
cd /Users/harry/Desktop/justuse-me && npm run build
```

Verify: no build errors, all static pages generate correctly.

- [ ] **Step 2: Check sitemap output**

```bash
npm run dev
# In another terminal:
curl http://localhost:3000/sitemap.xml | head -100
```

Verify: sitemap includes /news, /news/[slug], and /tools/[toolId]/[variation] entries.

- [ ] **Step 3: Check JSON-LD on tool page**

Visit `http://localhost:3000/tools/merge-pdf`, view page source, search for `application/ld+json`. Verify WebApplication, FAQPage, AND HowTo schemas are all present.

- [ ] **Step 4: Deploy to Vercel**

```bash
vercel deploy --prod
```

Add `REVALIDATE_SECRET` to Vercel env vars if not already done.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "chore: final build verification and deployment"
```
