"use client";

import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
  fileInfo?: Record<string, unknown>;
}

export default function CompressOptions({ options, onChange, fileInfo }: Props) {
  const quality = (options.quality as number) ?? 80;
  const fileSize = (fileInfo?.fileSize as number) || 0;

  const qualityLabel =
    quality >= 80 ? "High" : quality >= 50 ? "Medium" : "Low";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--color-text-muted)]">Lower quality = smaller file</span>
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">
          {qualityLabel} · {quality}%
        </span>
      </div>
      <input
        type="range"
        min={10}
        max={100}
        step={5}
        value={quality}
        onChange={(e) =>
          onChange({ ...options, quality: Number(e.target.value) })
        }
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${
            ((quality - 10) / 90) * 100
          }%, var(--color-border) ${((quality - 10) / 90) * 100}%, var(--color-border) 100%)`,
        }}
      />
      <div className="flex justify-between text-[10px] text-[var(--color-text-muted)]">
        <span>10% (smallest)</span>
        <span>100% (original)</span>
      </div>
      {fileSize > 0 && (
        <p className="text-xs text-[var(--color-text-muted)] text-center">
          Original size: {fileSize < 1024 * 1024 ? `${(fileSize / 1024).toFixed(0)} KB` : `${(fileSize / 1024 / 1024).toFixed(1)} MB`}
          <span className="mx-1">·</span>
          Est. output: ~{fileSize < 1024 * 1024
            ? `${((fileSize * quality / 100) / 1024).toFixed(0)} KB`
            : `${((fileSize * quality / 100) / 1024 / 1024).toFixed(1)} MB`}
        </p>
      )}
    </div>
  );
}
