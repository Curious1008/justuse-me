"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ToolResult } from "@/tools/types";

export default function ImagePreview({ result }: { result: ToolResult }) {
  const src = useMemo(() => URL.createObjectURL(result.blob), [result.blob]);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const sizeKB = (result.blob.size / 1024).toFixed(0);
  const sizeMB = (result.blob.size / (1024 * 1024)).toFixed(1);
  const sizeLabel = result.blob.size >= 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-full rounded-xl overflow-hidden border border-[var(--color-border)] bg-white"
    >
      <img
        src={src}
        alt="Result preview"
        className="w-full max-h-80 object-contain"
        onLoad={(e) => {
          const img = e.currentTarget;
          setDims({ w: img.naturalWidth, h: img.naturalHeight });
        }}
      />
      {dims && (
        <div className="px-3 py-2 border-t border-[var(--color-border)] flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-muted)]">
            {dims.w} × {dims.h} px
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {sizeLabel}
          </span>
        </div>
      )}
    </motion.div>
  );
}
