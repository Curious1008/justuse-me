"use client";

import { useState, useCallback, useEffect } from "react";
import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
  fileInfo?: Record<string, unknown>;
}

const MAX_DIM = 8000;
const MIN_DIM = 1;

export default function ResizeOptions({ options, onChange, fileInfo }: Props) {
  const origW = (fileInfo?.width as number) || 0;
  const origH = (fileInfo?.height as number) || 0;
  const aspectRatio = origW && origH ? origW / origH : 1;

  const width = (options.width as number) || "";
  const height = (options.height as number) || "";
  const [locked, setLocked] = useState(true);

  // Pre-fill with original dimensions
  useEffect(() => {
    if (origW && origH && !options.width && !options.height) {
      onChange({ ...options, width: origW, height: origH });
    }
  }, [origW, origH]);

  const clamp = (v: number) => Math.max(MIN_DIM, Math.min(MAX_DIM, Math.round(v)));

  const handleWidthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = Number(e.target.value);
      if (!raw) { onChange({ ...options, width: undefined }); return; }
      const newWidth = clamp(raw);
      if (locked && aspectRatio) {
        onChange({ ...options, width: newWidth, height: clamp(newWidth / aspectRatio) });
      } else {
        onChange({ ...options, width: newWidth });
      }
    },
    [locked, aspectRatio, options, onChange]
  );

  const handleHeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = Number(e.target.value);
      if (!raw) { onChange({ ...options, height: undefined }); return; }
      const newHeight = clamp(raw);
      if (locked && aspectRatio) {
        onChange({ ...options, height: newHeight, width: clamp(newHeight * aspectRatio) });
      } else {
        onChange({ ...options, height: newHeight });
      }
    },
    [locked, aspectRatio, options, onChange]
  );

  // Preset buttons
  const presets = [
    { label: "50%", w: Math.round(origW * 0.5), h: Math.round(origH * 0.5) },
    { label: "75%", w: Math.round(origW * 0.75), h: Math.round(origH * 0.75) },
    { label: "1080p", w: 1920, h: 1080 },
    { label: "720p", w: 1280, h: 720 },
  ].filter((p) => p.w > 0 && p.h > 0 && p.w <= MAX_DIM && p.h <= MAX_DIM);

  const outputW = Number(width) || origW;
  const outputH = Number(height) || origH;
  const scalePercent = origW ? Math.round((outputW / origW) * 100) : 100;

  return (
    <div className="flex flex-col gap-4">
      {/* Presets */}
      {origW > 0 && (
        <div className="flex items-center justify-center gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => onChange({ ...options, width: p.w, height: p.h })}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                outputW === p.w && outputH === p.h
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-glow)] text-[var(--color-accent)] font-medium"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Width x Height inputs */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <label className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Width</label>
          <input
            type="number"
            value={width}
            onChange={handleWidthChange}
            placeholder={String(origW || 800)}
            min={MIN_DIM}
            max={MAX_DIM}
            className="w-24 px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-center text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={() => setLocked((prev) => !prev)}
          className="flex items-center justify-center w-8 h-8 mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
          title={locked ? "Aspect ratio locked" : "Aspect ratio unlocked"}
        >
          {locked ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent)]">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)]">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
          )}
        </button>
        <div className="flex flex-col items-center gap-1">
          <label className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Height</label>
          <input
            type="number"
            value={height}
            onChange={handleHeightChange}
            placeholder={String(origH || 600)}
            min={MIN_DIM}
            max={MAX_DIM}
            className="w-24 px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-center text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
          />
        </div>
        <span className="text-xs text-[var(--color-text-muted)] mt-4">px</span>
      </div>

      {/* Output info */}
      {origW > 0 && (
        <p className="text-xs text-[var(--color-text-muted)] text-center">
          {origW} × {origH}
          <span className="mx-1.5">→</span>
          <span className="font-medium text-[var(--color-text-secondary)]">{outputW} × {outputH}</span>
          <span className="ml-1.5">({scalePercent}%)</span>
          {outputW > MAX_DIM || outputH > MAX_DIM ? (
            <span className="text-[var(--color-error)] ml-1">Max {MAX_DIM}px</span>
          ) : null}
        </p>
      )}
    </div>
  );
}
