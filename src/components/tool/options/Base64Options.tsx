"use client";

import { motion } from "framer-motion";
import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
}

export default function Base64Options({ options, onChange }: Props) {
  const mode = (options.mode as string) || "encode";

  return (
    <div className="flex items-center justify-center gap-1 p-1 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
      {(["encode", "decode"] as const).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            onClick={() => onChange({ ...options, mode: m })}
            className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              active
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
            }`}
          >
            {active && (
              <motion.div
                layoutId="base64-mode"
                className="absolute inset-0 bg-[var(--color-surface)] rounded-lg shadow-sm border border-[var(--color-border)]"
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
            <span className="relative z-10">
              {m === "encode" ? "Encode" : "Decode"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
