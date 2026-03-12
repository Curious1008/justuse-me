"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropZoneProps {
  acceptedTypes: string[];
  maxFiles: number;
  maxFileSize?: number;
  onFiles: (files: File[]) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DropZone({
  acceptedTypes,
  maxFiles,
  maxFileSize,
  onFiles,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [staged, setStaged] = useState<File[]>([]);

  const isMultiFile = maxFiles > 1;

  const validate = useCallback(
    (fileList: FileList | null): File[] | null => {
      if (!fileList || fileList.length === 0) return null;
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
          return null;
        }
      }

      if (maxFileSize) {
        const tooBig = files.find((f) => f.size > maxFileSize);
        if (tooBig) {
          const mb = Math.round(maxFileSize / 1024 / 1024);
          setError(`"${tooBig.name}" exceeds the ${mb}MB limit.`);
          return null;
        }
      }

      return files;
    },
    [acceptedTypes, maxFiles, maxFileSize]
  );

  const handleIncoming = useCallback(
    (fileList: FileList | null) => {
      const files = validate(fileList);
      if (!files) return;

      if (isMultiFile) {
        setStaged((prev) => {
          const combined = [...prev, ...files].slice(0, maxFiles);
          return combined;
        });
      } else {
        onFiles(files);
      }
    },
    [validate, isMultiFile, maxFiles, onFiles]
  );

  const removeFile = useCallback((index: number) => {
    setStaged((prev) => prev.filter((_, i) => i !== index));
  }, []);

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
      handleIncoming(e.dataTransfer.files);
    },
    [handleIncoming]
  );

  const handleClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = maxFiles > 1;
    input.accept = acceptedTypes.join(",");
    input.onchange = () => handleIncoming(input.files);
    input.click();
  }, [acceptedTypes, maxFiles, handleIncoming]);

  return (
    <div className="w-full">
      <motion.div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`relative w-full ${staged.length > 0 ? "h-32" : "h-56"} rounded-2xl cursor-pointer border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
          isDragging
            ? "border-[var(--color-accent)] bg-[var(--color-accent-glow)]"
            : "border-[var(--color-border)] bg-white hover:border-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)]"
        }`}
      >
        <motion.div
          animate={{
            y: isDragging ? -10 : 0,
            scale: isDragging ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-col items-center gap-3"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              isDragging
                ? "bg-[var(--color-accent-glow-strong)]"
                : "bg-[var(--color-surface-elevated)]"
            }`}
          >
            <svg
              className={`w-5 h-5 transition-colors duration-300 ${
                isDragging
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text-muted)]"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              {staged.length > 0
                ? "Add more files, or "
                : `Drop ${maxFiles > 1 ? "files" : "a file"} here, or `}
              <span className="text-[var(--color-accent)] font-medium">
                browse
              </span>
            </p>
            {staged.length === 0 && (
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                {acceptedTypes
                  .map((t) => t.split("/")[1]?.toUpperCase())
                  .filter(Boolean)
                  .join(", ") || "Any file"}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Staged file list for multi-file uploads */}
      <AnimatePresence>
        {staged.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-1.5"
          >
            {staged.map((file, i) => (
              <motion.div
                key={`${file.name}-${file.size}-${i}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-[var(--color-border)]"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--color-text)] truncate">{file.name}</p>
                  <p className="text-[11px] text-[var(--color-text-muted)]">{formatSize(file.size)}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="w-6 h-6 rounded-full hover:bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors shrink-0"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}

            <motion.button
              onClick={() => onFiles(staged)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="w-full mt-3 py-3 rounded-xl bg-[var(--color-text)] text-white text-sm font-semibold font-[family-name:var(--font-sora)] cursor-pointer transition-colors hover:opacity-90"
            >
              Process {staged.length} file{staged.length !== 1 ? "s" : ""}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm text-[var(--color-error)] text-center"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
