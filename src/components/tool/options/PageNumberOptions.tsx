"use client";

import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
  fileInfo?: Record<string, unknown>;
}

const positions = [
  { value: "top-left", label: "Top Left" },
  { value: "top-center", label: "Top Center" },
  { value: "top-right", label: "Top Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right", label: "Bottom Right" },
];

export default function PageNumberOptions({ options, onChange, fileInfo }: Props) {
  const position = (options.position as string) || "bottom-center";
  const startFrom = (options.startFrom as number) ?? 1;
  const pageCount = (fileInfo?.pageCount as number) || 0;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-[var(--color-text-muted)] mb-2">Position</p>
        <div className="grid grid-cols-3 gap-1.5">
          {positions.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onChange({ ...options, position: p.value })}
              className={`py-2 px-2 text-[10px] rounded-lg border transition-all cursor-pointer ${
                position === p.value
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-glow)] text-[var(--color-accent)] font-medium"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 justify-center">
        <label className="text-xs text-[var(--color-text-muted)]">Start from</label>
        <input
          type="number"
          value={startFrom}
          onChange={(e) => onChange({ ...options, startFrom: Math.max(1, Number(e.target.value) || 1) })}
          min={1}
          className="w-16 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-center text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
        />
        {pageCount > 0 && (
          <span className="text-xs text-[var(--color-text-muted)]">
            → {startFrom} to {startFrom + pageCount - 1}
          </span>
        )}
      </div>
    </div>
  );
}
