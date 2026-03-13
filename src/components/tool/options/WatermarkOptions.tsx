"use client";

import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
}

export default function WatermarkOptions({ options, onChange }: Props) {
  const text = (options.text as string) || "";

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => onChange({ ...options, text: e.target.value })}
      placeholder="Watermark text (e.g. CONFIDENTIAL)"
      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
    />
  );
}
