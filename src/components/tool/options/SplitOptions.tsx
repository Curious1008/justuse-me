"use client";

import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
  fileInfo?: Record<string, unknown>;
}

export default function SplitOptions({ options, onChange, fileInfo }: Props) {
  const pages = (options.pages as string) || "";
  const pageCount = (fileInfo?.pageCount as number) || 0;

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={pages}
        onChange={(e) => onChange({ ...options, pages: e.target.value })}
        placeholder={
          pageCount
            ? `All ${pageCount} pages (e.g. 1-3, 5, 8-${pageCount})`
            : "All pages (e.g. 1-3, 5, 8-10)"
        }
        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
      />
      {pageCount > 0 && (
        <p className="text-xs text-[var(--color-text-muted)] text-center">
          Leave empty to split all {pageCount} pages
        </p>
      )}
    </div>
  );
}
