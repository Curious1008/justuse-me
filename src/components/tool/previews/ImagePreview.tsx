"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { ToolResult } from "@/tools/types";

export default function ImagePreview({ result }: { result: ToolResult }) {
  const src = useMemo(() => URL.createObjectURL(result.blob), [result.blob]);

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
        className="w-full max-h-64 object-contain"
      />
    </motion.div>
  );
}
