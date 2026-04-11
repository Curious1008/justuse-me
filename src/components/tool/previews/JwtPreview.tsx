"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { ToolResult } from "@/tools/types";

export default function JwtPreview({ result }: { result: ToolResult }) {
  const [sections, setSections] = useState<{ header: string; payload: string; timestamps: string[]; expired: boolean | null }>({
    header: "",
    payload: "",
    timestamps: [],
    expired: null,
  });
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    result.blob.text().then((text) => {
      const headerMatch = text.match(/=== HEADER ===\n([\s\S]*?)\n\n/);
      const payloadMatch = text.match(/=== PAYLOAD ===\n([\s\S]*?)(\n\n|$)/);
      const tsMatch = text.match(/=== TIMESTAMPS[\s\S]*?===\n([\s\S]*?)(\n\n|$)/);
      const expiredMatch = text.includes("TOKEN IS EXPIRED");
      const validMatch = text.includes("Token is still valid");

      setSections({
        header: headerMatch ? headerMatch[1].trim() : "",
        payload: payloadMatch ? payloadMatch[1].trim() : "",
        timestamps: tsMatch ? tsMatch[1].trim().split("\n").map((s) => s.trim()) : [],
        expired: expiredMatch ? true : validMatch ? false : null,
      });
    });
  }, [result.blob]);

  const copySection = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  if (!sections.header) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-full max-w-lg space-y-3"
    >
      {/* Header */}
      <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-rose-50 dark:bg-rose-950/20">
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">HEADER</span>
          <button
            onClick={() => copySection(sections.header, "header")}
            className="text-xs px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors cursor-pointer"
          >
            {copied === "header" ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="p-4 text-xs font-mono leading-relaxed text-[var(--color-text)] bg-[var(--color-surface)] overflow-auto">
          {sections.header}
        </pre>
      </div>

      {/* Payload */}
      <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-violet-50 dark:bg-violet-950/20">
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">PAYLOAD</span>
          <button
            onClick={() => copySection(sections.payload, "payload")}
            className="text-xs px-2 py-0.5 rounded border border-violet-200 dark:border-violet-800 text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors cursor-pointer"
          >
            {copied === "payload" ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="p-4 text-xs font-mono leading-relaxed text-[var(--color-text)] bg-[var(--color-surface)] overflow-auto">
          {sections.payload}
        </pre>
      </div>

      {/* Timestamps + Expiry */}
      {(sections.timestamps.length > 0 || sections.expired !== null) && (
        <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
          <div className="px-4 py-2 border-b border-[var(--color-border)] bg-amber-50 dark:bg-amber-950/20">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">TIMESTAMPS</span>
          </div>
          <div className="p-4 bg-[var(--color-surface)] space-y-1.5">
            {sections.timestamps.map((ts, i) => {
              const [field, ...rest] = ts.split(":");
              return (
                <div key={i} className="flex gap-2 text-xs">
                  <span className="font-mono font-semibold text-amber-600 dark:text-amber-400 shrink-0">{field.trim()}:</span>
                  <span className="font-mono text-[var(--color-text-muted)]">{rest.join(":").trim()}</span>
                </div>
              );
            })}
            {sections.expired !== null && (
              <div className={`mt-2 text-xs font-semibold ${sections.expired ? "text-red-500" : "text-emerald-500"}`}>
                {sections.expired ? "Token is expired" : "Token is still valid"}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
