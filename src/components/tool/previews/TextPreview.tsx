"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { ToolResult } from "@/tools/types";

export default function TextPreview({ result }: { result: ToolResult }) {
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    result.blob.text().then(setText);
  }, [result.blob]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  if (!text) return null;

  const isJson = result.mimeType === "application/json" || result.filename.endsWith(".json");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-full max-w-lg rounded-xl border border-[var(--color-border)] overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <span className="text-xs text-[var(--color-text-muted)]">
          {result.filename}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs px-2.5 py-1 rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] transition-all cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Content */}
      <div className="max-h-80 overflow-auto p-4">
        <pre
          className={`text-xs leading-relaxed whitespace-pre-wrap break-words text-[var(--color-text)] ${
            isJson ? "font-mono" : "font-sans"
          }`}
        >
          {text}
        </pre>
      </div>
    </motion.div>
  );
}
