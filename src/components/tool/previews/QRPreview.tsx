"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { ToolResult } from "@/tools/types";

export default function QRPreview({ result }: { result: ToolResult }) {
  const src = useMemo(() => URL.createObjectURL(result.blob), [result.blob]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex items-center justify-center rounded-xl overflow-hidden border border-[var(--color-border)] bg-white p-4"
    >
      <img
        src={src}
        alt="Generated QR Code"
        className="w-48 h-48 object-contain"
      />
    </motion.div>
  );
}
