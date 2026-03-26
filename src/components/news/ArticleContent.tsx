import { marked } from "marked";

interface ArticleContentProps {
  content: string;
}

function sanitizeHtml(html: string): string {
  // Remove script tags
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  // Remove all event handlers (quoted, unquoted, with spaces)
  clean = clean.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  // Remove javascript: protocol in any attribute
  clean = clean.replace(/\b(href|src|action|formaction|data)\s*=\s*(?:"[^"]*javascript:[^"]*"|'[^']*javascript:[^']*')/gi, "");
  // Remove data: protocol in src attributes (except images)
  clean = clean.replace(/\bsrc\s*=\s*(?:"data:(?!image\/)[^"]*"|'data:(?!image\/)[^']*')/gi, "");
  // Remove iframe, object, embed, form tags
  clean = clean.replace(/<\s*\/?\s*(iframe|object|embed|form|base|meta)\b[^>]*>/gi, "");
  // Remove style attributes (can contain expression())
  clean = clean.replace(/\s+style\s*=\s*(?:"[^"]*"|'[^']*')/gi, "");
  return clean;
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
        prose-li:text-[var(--color-text-secondary)]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
