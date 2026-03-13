"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ToolPlugin, ToolResult, ToolOptions } from "@/tools/types";
import { useAuth } from "@/hooks/useAuth";
import { checkUsage, logUsage } from "@/lib/usage";
import { getAnonId } from "@/lib/anon-id";
import DropZone from "./DropZone";
import TextInput from "./TextInput";
import ProcessingAnimation from "./ProcessingAnimation";
import DownloadButton from "./DownloadButton";
import UsageLimitModal from "./UsageLimitModal";

type ToolState = "idle" | "configuring" | "processing" | "done" | "error";

interface ToolShellProps {
  tool: ToolPlugin;
}

async function extractFileInfo(
  toolId: string,
  files: File[]
): Promise<Record<string, unknown>> {
  const file = files[0];
  if (!file) return {};

  // Image tools: read dimensions + pass file for visual options (e.g. crop)
  if (file.type.startsWith("image/")) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight, fileName: file.name, fileSize: file.size, file });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => resolve({ fileName: file.name, fileSize: file.size, file });
      img.src = URL.createObjectURL(file);
    });
  }

  // PDF tools: read page count
  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    try {
      const { PDFDocument } = await import("pdf-lib");
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf);
      return { pageCount: pdf.getPageCount(), fileName: file.name, fileSize: file.size };
    } catch {
      return { fileName: file.name, fileSize: file.size };
    }
  }

  return { fileName: file.name, fileSize: file.size };
}

function ConfiguringView({
  tool,
  stagedFiles,
  fileInfo,
  options,
  onOptionsChange,
  onProcess,
  onBack,
  formatSize,
  transition,
}: {
  tool: ToolPlugin;
  stagedFiles: File[];
  fileInfo: Record<string, unknown>;
  options: ToolOptions;
  onOptionsChange: (opts: ToolOptions) => void;
  onProcess: () => void;
  onBack: () => void;
  formatSize: (bytes: number) => string;
  transition: Record<string, unknown>;
}) {
  const isImage = stagedFiles[0]?.type.startsWith("image/");
  const previewUrl = useMemo(
    () => (isImage && stagedFiles[0] ? URL.createObjectURL(stagedFiles[0]) : null),
    [isImage, stagedFiles]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <motion.div
      key="configuring"
      {...transition}
      className="flex flex-col items-center gap-5"
    >
      {/* Image preview — skip for crop (CropOptions renders its own interactive preview) */}
      {previewUrl && tool.id !== "crop-image" && (
        <div className="w-full rounded-xl border border-[var(--color-border)] bg-white overflow-hidden">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full max-h-64 object-contain"
          />
        </div>
      )}

      {/* File info bar */}
      <div className="w-full flex items-center justify-between px-1">
        <p className="text-xs text-[var(--color-text-muted)] truncate max-w-[60%]">
          {stagedFiles.length === 1
            ? (fileInfo.fileName as string) || stagedFiles[0].name
            : `${stagedFiles.length} files`}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {typeof fileInfo.width === "number" && typeof fileInfo.height === "number" && (
            <span>{fileInfo.width} × {fileInfo.height} px · </span>
          )}
          {typeof fileInfo.pageCount === "number" && (
            <span>{fileInfo.pageCount} pages · </span>
          )}
          {formatSize(stagedFiles.reduce((s, f) => s + f.size, 0))}
        </p>
      </div>

      {/* Options UI */}
      <div className="w-full">
        {tool.optionsUI && (
          <tool.optionsUI options={options} onChange={onOptionsChange} fileInfo={fileInfo} />
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 w-full">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-3 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)] transition-all cursor-pointer"
        >
          Choose different file
        </motion.button>
        <motion.button
          onClick={onProcess}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="flex-1 py-3 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold font-[family-name:var(--font-sora)] cursor-pointer transition-all hover:bg-[var(--color-accent-dim)]"
        >
          {tool.processButtonLabel || "Process"}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function ToolShell({ tool }: ToolShellProps) {
  const [state, setState] = useState<ToolState>("idle");
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [fileInfo, setFileInfo] = useState<Record<string, unknown>>({});
  const [result, setResult] = useState<ToolResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<ToolOptions>({});
  const [usageModal, setUsageModal] = useState<{
    used: number;
    limit: number;
  } | null>(null);

  const { user, profile } = useAuth();

  // Whether this tool shows options before upload
  const showOptionsBefore = tool.optionsBefore && tool.optionsUI;
  // Whether this tool needs a configuring step after upload
  const needsConfiguring = tool.optionsUI && !tool.optionsBefore;

  const processFiles = useCallback(
    async (files: File[], opts: ToolOptions) => {
      setState("processing");
      setError(null);
      setResult(null);

      try {
        let output: ToolResult;

        if (tool.runtime === "server") {
          const formData = new FormData();
          files.forEach((f) => formData.append("files", f));
          if (Object.keys(opts).length > 0) {
            formData.append("options", JSON.stringify(opts));
          }

          const headers: Record<string, string> = {};
          if (!user) {
            headers["x-anon-id"] = getAnonId();
          }

          const res = await fetch(`/api/tools/${tool.id}`, {
            method: "POST",
            body: formData,
            headers,
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({ error: "Processing failed" }));
            throw new Error(err.error || "Processing failed");
          }

          const blob = await res.blob();
          const filename =
            res.headers
              .get("content-disposition")
              ?.match(/filename="?([^"]+)"?/)?.[1] ?? "output";
          const mimeType = res.headers.get("content-type") ?? "application/octet-stream";

          output = { blob, filename, mimeType };
        } else {
          output = await tool.process(files, opts);
        }

        setResult(output);
        setState("done");

        await logUsage(tool.id, user?.id ?? null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
        setState("error");
      }
    },
    [tool, user]
  );

  const handleFiles = useCallback(
    async (files: File[]) => {
      const usage = await checkUsage(
        tool.id,
        user?.id ?? null,
        profile?.plan ?? null
      );

      if (!usage.allowed) {
        setUsageModal({ used: usage.used, limit: usage.limit });
        return;
      }

      if (needsConfiguring) {
        // Stage files and extract info, then show options
        setStagedFiles(files);
        const info = await extractFileInfo(tool.id, files);
        setFileInfo(info);
        setState("configuring");
      } else {
        // No config needed, process immediately
        await processFiles(files, options);
      }
    },
    [tool, options, user, profile, needsConfiguring, processFiles]
  );

  const handleProcess = useCallback(async () => {
    await processFiles(stagedFiles, options);
  }, [stagedFiles, options, processFiles]);

  const handleReset = () => {
    setState("idle");
    setStagedFiles([]);
    setFileInfo({});
    setResult(null);
    setError(null);
    setOptions({});
  };

  const handleRetry = () => {
    if (stagedFiles.length > 0 && needsConfiguring) {
      setState("configuring");
      setError(null);
    } else {
      handleReset();
    }
  };

  const transition = {
    initial: { opacity: 0, y: 16, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -12, filter: "blur(4px)" },
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  };

  const formatSize = useCallback((bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / 1024 / 1024).toFixed(1)} MB`, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Options shown BEFORE upload (e.g. Base64 encode/decode) */}
      {showOptionsBefore && state === "idle" && tool.optionsUI && (
        <div className="mb-6">
          <tool.optionsUI options={options} onChange={setOptions} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div key="dropzone" {...transition}>
            {tool.inputMode === "text" ? (
              <TextInput
                placeholder={tool.textPlaceholder}
                buttonLabel={tool.textButtonLabel}
                onSubmit={handleFiles}
              />
            ) : (
              <DropZone
                acceptedTypes={tool.acceptedTypes}
                maxFiles={tool.maxFiles}
                maxFileSize={tool.maxFileSize}
                onFiles={handleFiles}
              />
            )}
          </motion.div>
        )}

        {state === "configuring" && tool.optionsUI && (
          <ConfiguringView
            tool={tool}
            stagedFiles={stagedFiles}
            fileInfo={fileInfo}
            options={options}
            onOptionsChange={setOptions}
            onProcess={handleProcess}
            onBack={handleReset}
            formatSize={formatSize}
            transition={transition}
          />
        )}

        {state === "processing" && (
          <motion.div key="processing" {...transition}>
            <ProcessingAnimation />
          </motion.div>
        )}

        {state === "done" && result && (
          <motion.div
            key="result"
            {...transition}
            className="flex flex-col items-center gap-8 py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.1,
              }}
              className="w-14 h-14 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-[var(--color-accent)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </motion.div>

            {tool.previewUI && <tool.previewUI result={result} />}
            <DownloadButton result={result} />

            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors underline underline-offset-4 decoration-[var(--color-border)]"
            >
              {tool.inputMode === "text" ? "Try again" : "Process another file"}
            </motion.button>
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            key="error"
            {...transition}
            className="flex flex-col items-center gap-5 h-56 justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-error-dim)] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[var(--color-error)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <p className="text-sm text-[var(--color-error)]">{error}</p>
            <motion.button
              onClick={handleRetry}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="px-5 py-2 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)] transition-all"
            >
              Try again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {usageModal && (
          <UsageLimitModal
            used={usageModal.used}
            limit={usageModal.limit}
            isLoggedIn={!!user}
            onClose={() => setUsageModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
