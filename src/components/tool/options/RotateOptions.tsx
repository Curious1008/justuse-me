"use client";

import { motion } from "framer-motion";
import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
}

const angles = [90, 180, 270] as const;
const labels: Record<number, string> = {
  90: "90\u00B0",
  180: "180\u00B0",
  270: "270\u00B0",
};

export default function RotateOptions({ options, onChange }: Props) {
  const degrees = (options.degrees as number) || 90;

  return (
    <div className="flex items-center justify-center gap-1 p-1 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
      {angles.map((a) => {
        const active = degrees === a;
        return (
          <button
            key={a}
            onClick={() => onChange({ ...options, degrees: a })}
            className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              active
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
            }`}
          >
            {active && (
              <motion.div
                layoutId="rotate-angle"
                className="absolute inset-0 bg-[var(--color-surface)] rounded-lg shadow-sm border border-[var(--color-border)]"
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
            <span className="relative z-10">{labels[a]}</span>
          </button>
        );
      })}
    </div>
  );
}
