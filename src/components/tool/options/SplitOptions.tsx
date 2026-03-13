"use client";

import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
}

export default function SplitOptions({ options, onChange }: Props) {
  const pages = (options.pages as string) || "";

  return (
    <input
      type="text"
      value={pages}
      onChange={(e) => onChange({ ...options, pages: e.target.value })}
      placeholder="All pages (e.g. 1-3, 5, 8-10)"
      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
    />
  );
}
