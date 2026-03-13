"use client";

import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
}

export default function ResizeOptions({ options, onChange }: Props) {
  const width = (options.width as number) || "";
  const height = (options.height as number) || "";

  return (
    <div className="flex items-center justify-center gap-3">
      <input
        type="number"
        value={width}
        onChange={(e) => onChange({ ...options, width: Number(e.target.value) || undefined })}
        placeholder="Width"
        min={1}
        max={10000}
        className="w-28 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-center text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
      />
      <span className="text-sm text-[var(--color-text-muted)]">&times;</span>
      <input
        type="number"
        value={height}
        onChange={(e) => onChange({ ...options, height: Number(e.target.value) || undefined })}
        placeholder="Height"
        min={1}
        max={10000}
        className="w-28 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-center text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
      />
      <span className="text-xs text-[var(--color-text-muted)]">px</span>
    </div>
  );
}
