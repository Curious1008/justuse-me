"use client";

import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
}

const FORMATS = [
  { value: "CODE128", label: "CODE128", desc: "General purpose" },
  { value: "EAN13", label: "EAN-13", desc: "Retail (international)" },
  { value: "UPC", label: "UPC-A", desc: "Retail (North America)" },
  { value: "CODE39", label: "CODE39", desc: "Industrial / logistics" },
  { value: "ITF14", label: "ITF-14", desc: "Shipping cartons" },
  { value: "pharmacode", label: "Pharmacode", desc: "Pharmaceutical" },
];

export default function BarcodeOptions({ options, onChange }: Props) {
  const format = (options.format as string) || "CODE128";

  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">
        Barcode Format
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {FORMATS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => onChange({ ...options, format: f.value })}
            className={`px-3 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
              format === f.value
                ? "border-[var(--color-accent)] bg-[var(--color-accent-glow)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text-muted)]"
            }`}
          >
            <span className={`block text-xs font-medium ${
              format === f.value ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"
            }`}>
              {f.label}
            </span>
            <span className="block text-[10px] text-[var(--color-text-muted)] mt-0.5">
              {f.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
