"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropZoneProps {
  acceptedTypes: string[];
  maxFiles: number;
  maxFileSize?: number;
  onFiles: (files: File[]) => void;
}

export default function DropZone({
  acceptedTypes,
  maxFiles,
  maxFileSize,
  onFiles,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndEmit = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      setError(null);

      const files = Array.from(fileList).slice(0, maxFiles);

      if (acceptedTypes.length > 0 && !acceptedTypes.includes("*/*")) {
        const invalid = files.find(
          (f) =>
            !acceptedTypes.some(
              (t) => f.type === t || f.name.endsWith(t.replace("*", ""))
            )
        );
        if (invalid) {
          setError(`"${invalid.name}" is not a supported file type.`);
          return;
        }
      }

      if (maxFileSize) {
        const tooBig = files.find((f) => f.size > maxFileSize);
        if (tooBig) {
          const mb = Math.round(maxFileSize / 1024 / 1024);
          setError(`"${tooBig.name}" exceeds the ${mb}MB limit.`);
          return;
        }
      }

      onFiles(files);
    },
    [acceptedTypes, maxFiles, maxFileSize, onFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      validateAndEmit(e.dataTransfer.files);
    },
    [validateAndEmit]
  );

  const handleClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = maxFiles > 1;
    input.accept = acceptedTypes.join(",");
    input.onchange = () => validateAndEmit(input.files);
    input.click();
  }, [acceptedTypes, maxFiles, validateAndEmit]);

  return (
    <div className="w-full">
      <motion.div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        animate={{
          borderColor: isDragging ? "#3b82f6" : "#d1d5db",
          backgroundColor: isDragging
            ? "rgba(59, 130, 246, 0.05)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer"
      >
        <motion.div
          animate={{ y: isDragging ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-col items-center gap-3 text-gray-500"
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm font-medium">
            Drop {maxFiles > 1 ? "files" : "a file"} here, or{" "}
            <span className="text-blue-500 underline">browse</span>
          </p>
          <p className="text-xs text-gray-400">
            {acceptedTypes
              .map((t) => t.split("/")[1]?.toUpperCase())
              .filter(Boolean)
              .join(", ")}
          </p>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm text-red-500 text-center"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
