"use client";

import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
}

export default function CompressOptions({ options, onChange }: Props) {
  const quality = (options.quality as number) ?? 80;

  return (
    <div className="flex items-center justify-center gap-4">
      <span className="text-sm text-[var(--color-text-muted)]">Quality</span>
      <input
        type="range"
        min={10}
        max={100}
        step={5}
        value={quality}
        onChange={(e) =>
          onChange({ ...options, quality: Number(e.target.value) })
        }
        className="w-40 h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${
            ((quality - 10) / 90) * 100
          }%, var(--color-border) ${((quality - 10) / 90) * 100}%, var(--color-border) 100%)`,
        }}
      />
      <span className="text-sm font-medium text-[var(--color-text)] w-10 text-right">
        {quality}%
      </span>
    </div>
  );
}
