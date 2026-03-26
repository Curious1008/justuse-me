import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export interface Article {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: "tutorial" | "comparison" | "use-case" | "trend";
  tools: string[];
  keywords: string[];
  published_at: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "news");

function parseArticle(filename: string): Article | null {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");

  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const meta = yaml.load(match[1]) as Record<string, unknown>;
  const content = match[2].trim();
  const slug = filename.replace(/\.md$/, "");

  return {
    slug,
    title: meta.title as string,
    summary: meta.summary as string,
    content,
    category: meta.category as Article["category"],
    tools: (meta.tools as string[]) || [],
    keywords: (meta.keywords as string[]) || [],
    published_at: String(meta.published_at),
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(parseArticle)
    .filter((a): a is Article => a !== null)
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
}

export function getArticleBySlug(slug: string): Article | null {
  const filename = `${slug}.md`;
  const filePath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  return parseArticle(filename);
}

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getArticles(
  category?: string,
  limit = 20,
  offset = 0
): { articles: Article[]; count: number } {
  let articles = getAllArticles();
  if (category) {
    articles = articles.filter((a) => a.category === category);
  }
  const count = articles.length;
  return { articles: articles.slice(offset, offset + limit), count };
}

export function getRelatedArticles(
  toolIds: string[],
  excludeSlug: string,
  limit = 3
): Article[] {
  return getAllArticles()
    .filter(
      (a) =>
        a.slug !== excludeSlug && a.tools.some((t) => toolIds.includes(t))
    )
    .slice(0, limit);
}
