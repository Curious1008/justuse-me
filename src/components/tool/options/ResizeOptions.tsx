"use client";

import { useState, useCallback } from "react";
import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
}

export default function ResizeOptions({ options, onChange }: Props) {
  const width = (options.width as number) || "";
  const height = (options.height as number) || "";
  const [locked, setLocked] = useState(true);

  const handleWidthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newWidth = Number(e.target.value) || undefined;
      if (locked && newWidth && height) {
        const ratio = Number(height) / Number(width || 1);
        const newHeight = Math.round(newWidth * ratio);
        onChange({ ...options, width: newWidth, height: newHeight || undefined });
      } else {
        onChange({ ...options, width: newWidth });
      }
    },
    [locked, width, height, options, onChange]
  );

  const handleHeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHeight = Number(e.target.value) || undefined;
      if (locked && newHeight && width) {
        const ratio = Number(width) / Number(height || 1);
        const newWidth = Math.round(newHeight * ratio);
        onChange({ ...options, height: newHeight, width: newWidth || undefined });
      } else {
        onChange({ ...options, height: newHeight });
      }
    },
    [locked, width, height, options, onChange]
  );

  return (
    <div className="flex items-center justify-center gap-3">
      <input
        type="number"
        value={width}
        onChange={handleWidthChange}
        placeholder="Width"
        min={1}
        max={10000}
        className="w-28 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-center text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
      />
      <button
        type="button"
        onClick={() => setLocked((prev) => !prev)}
        className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
        title={locked ? "Aspect ratio locked" : "Aspect ratio unlocked"}
      >
        {locked ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-accent)]"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-text-muted)]"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
          </svg>
        )}
      </button>
      <input
        type="number"
        value={height}
        onChange={handleHeightChange}
        placeholder="Height"
        min={1}
        max={10000}
        className="w-28 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-center text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
      />
      <span className="text-xs text-[var(--color-text-muted)]">px</span>
    </div>
  );
}
