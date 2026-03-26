"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { localePath, type Locale } from "@/lib/i18n";

interface ArticleCardProps {
  article: {
    slug: string;
    title: string;
    summary: string;
    category: string;
    tools: string[];
    published_at: string;
  };
  locale: Locale;
  categoryLabel: string;
}

// Map category names to colors
const categoryColors: Record<string, string> = {
  news: "#6366f1",
  tutorial: "#8b5cf6",
  announcement: "#ec4899",
  update: "#06b6d4",
  guide: "#14b8a6",
};

export default function ArticleCard({
  article,
  locale,
  categoryLabel,
}: ArticleCardProps) {
  const categoryColor = categoryColors[article.category] || "#6366f1";
  const href = localePath(locale, `/news/${article.slug}`);

  // Format date
  const publishDate = new Date(article.published_at);
  const formattedDate = publishDate.toLocaleDateString(locale === "en" ? "en-US" : locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative flex flex-col gap-3 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] cursor-pointer transition-all duration-300 overflow-hidden hover:shadow-md hover:shadow-black/[0.03]"
      >
        {/* Category badge and date */}
        <div className="flex items-center justify-between gap-2 relative z-10">
          <div
            className="inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryLabel}
          </div>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {formattedDate}
          </span>
        </div>

        {/* Title - 2 lines max */}
        <h3 className="font-semibold text-sm font-[family-name:var(--font-sora)] text-[var(--color-text)] line-clamp-2 relative z-10">
          {article.title}
        </h3>

        {/* Summary - 2 lines max */}
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2 relative z-10">
          {article.summary}
        </p>

        {/* Tool tags - up to 3 */}
        {article.tools && article.tools.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1 relative z-10">
            {article.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="inline-flex px-2 py-1 rounded-md text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)]"
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
