"use client";

import { motion } from "framer-motion";
import type { ToolResult } from "@/tools/types";
import { triggerDownload } from "@/lib/download";

interface DownloadButtonProps {
  result: ToolResult;
}

export default function DownloadButton({ result }: DownloadButtonProps) {
  const handleDownload = () => {
    triggerDownload(result.blob, result.filename);
  };

  const sizeMB = (result.blob.size / 1024 / 1024).toFixed(1);

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:bg-blue-600 transition-colors"
      >
        Download ({sizeMB} MB)
      </motion.button>
      <p className="text-xs text-gray-400">{result.filename}</p>
    </div>
  );
}
