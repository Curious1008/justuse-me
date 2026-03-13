"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ToolResult } from "@/tools/types";
import { triggerDownload } from "@/lib/download";

interface DownloadButtonProps {
  result: ToolResult;
}

export default function DownloadButton({ result }: DownloadButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    triggerDownload(result.blob, result.filename);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const size = result.blob.size;
  const sizeLabel =
    size < 1024 * 1024
      ? `${(size / 1024).toFixed(0)} KB`
      : `${(size / 1024 / 1024).toFixed(1)} MB`;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="group relative px-8 py-3.5 rounded-xl font-semibold text-sm font-[family-name:var(--font-sora)] text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-colors overflow-hidden shadow-sm"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
        <span className="relative flex items-center gap-2">
          {downloaded ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Downloaded!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </>
          )}
        </span>
      </motion.button>
      <p className="text-xs text-[var(--color-text-muted)]">
        {result.filename}
        <span className="mx-1.5">·</span>
        {sizeLabel}
      </p>
    </div>
  );
}
