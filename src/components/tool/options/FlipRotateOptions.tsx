"use client";

import { motion } from "framer-motion";
import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
}

const operations = [
  { value: "flip-h", label: "Flip H" },
  { value: "flip-v", label: "Flip V" },
  { value: "rotate-90", label: "90°" },
  { value: "rotate-180", label: "180°" },
  { value: "rotate-270", label: "270°" },
] as const;

type Operation = (typeof operations)[number]["value"];

export default function FlipRotateOptions({ options, onChange }: Props) {
  const operation = (options.operation as Operation) || "rotate-90";

  return (
    <div className="flex items-center justify-center gap-1 p-1 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
      {operations.map((op) => {
        const active = operation === op.value;
        return (
          <button
            key={op.value}
            onClick={() => onChange({ ...options, operation: op.value })}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              active
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
            }`}
          >
            {active && (
              <motion.div
                layoutId="flip-rotate-op"
                className="absolute inset-0 bg-[var(--color-surface)] rounded-lg shadow-sm border border-[var(--color-border)]"
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
            <span className="relative z-10">{op.label}</span>
          </button>
        );
      })}
    </div>
  );
}
