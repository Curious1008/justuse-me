"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { ToolResult } from "@/tools/types";

interface ColorEntry {
  input: string;
  hex?: string;
  rgb?: string;
  hsl?: string;
  lab?: string;
  error?: string;
}

function parseColorOutput(text: string): ColorEntry[] {
  const entries: ColorEntry[] = [];
  const blocks = text.split("\n\n").filter((b) => b.trim());

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim());
    const inputLine = lines.find((l) => l.startsWith("Input:"));
    if (!inputLine) continue;

    const input = inputLine.replace("Input:", "").trim();
    const errorLine = lines.find((l) => l.startsWith("ERROR:"));

    if (errorLine) {
      entries.push({ input, error: errorLine.replace("ERROR:", "").trim() });
      continue;
    }

    const hex = lines.find((l) => l.startsWith("HEX:"))?.replace("HEX:", "").trim();
    const rgb = lines.find((l) => l.startsWith("RGB:"))?.replace("RGB:", "").trim();
    const hsl = lines.find((l) => l.startsWith("HSL:"))?.replace("HSL:", "").trim();
    const lab = lines.find((l) => l.startsWith("LAB:"))?.replace("LAB:", "").trim();

    entries.push({ input, hex, rgb, hsl, lab });
  }

  return entries;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-[10px] px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] transition-all cursor-pointer"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function ColorPreview({ result }: { result: ToolResult }) {
  const [entries, setEntries] = useState<ColorEntry[]>([]);

  useEffect(() => {
    result.blob.text().then((text) => {
      setEntries(parseColorOutput(text));
    });
  }, [result.blob]);

  if (entries.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-full max-w-md flex flex-col gap-4"
    >
      {entries.map((entry, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-xl border border-[var(--color-border)] overflow-hidden"
        >
          {entry.error ? (
            <div className="p-4 text-sm text-[var(--color-error)]">
              Could not parse &ldquo;{entry.input}&rdquo;
            </div>
          ) : (
            <div className="flex">
              {/* Color swatch */}
              <div
                className="w-20 shrink-0"
                style={{ backgroundColor: entry.hex }}
              />
              {/* Values */}
              <div className="flex-1 p-3 flex flex-col gap-1.5 text-xs font-mono">
                <div className="flex items-center">
                  <span className="text-[var(--color-text-muted)] w-8">HEX</span>
                  <span className="text-[var(--color-text)]">{entry.hex}</span>
                  <CopyButton text={entry.hex ?? ""} />
                </div>
                <div className="flex items-center">
                  <span className="text-[var(--color-text-muted)] w-8">RGB</span>
                  <span className="text-[var(--color-text)]">{entry.rgb}</span>
                  <CopyButton text={entry.rgb ?? ""} />
                </div>
                <div className="flex items-center">
                  <span className="text-[var(--color-text-muted)] w-8">HSL</span>
                  <span className="text-[var(--color-text)]">{entry.hsl}</span>
                  <CopyButton text={entry.hsl ?? ""} />
                </div>
                <div className="flex items-center">
                  <span className="text-[var(--color-text-muted)] w-8">LAB</span>
                  <span className="text-[var(--color-text)]">{entry.lab}</span>
                  <CopyButton text={entry.lab ?? ""} />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
