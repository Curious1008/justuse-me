import { marked } from "marked";

interface ArticleContentProps {
  content: string;
}

function sanitizeHtml(html: string): string {
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
        prose-li:text-[var(--color-text-secondary)]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
