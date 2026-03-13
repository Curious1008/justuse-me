"use client";

import { useState, useCallback } from "react";
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

type ToolState = "idle" | "processing" | "done" | "error";

interface ToolShellProps {
  tool: ToolPlugin;
}

export default function ToolShell({ tool }: ToolShellProps) {
  const [state, setState] = useState<ToolState>("idle");
  const [result, setResult] = useState<ToolResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<ToolOptions>({});
  const [usageModal, setUsageModal] = useState<{
    used: number;
    limit: number;
  } | null>(null);

  const { user, profile } = useAuth();

  const handleFiles = useCallback(
    async (files: File[]) => {
      // Check usage before processing
      const usage = await checkUsage(
        tool.id,
        user?.id ?? null,
        profile?.plan ?? null
      );

      if (!usage.allowed) {
        setUsageModal({ used: usage.used, limit: usage.limit });
        return;
      }

      setState("processing");
      setError(null);
      setResult(null);

      try {
        let output: ToolResult;

        if (tool.runtime === "server") {
          // Server-side tool: POST to API
          const formData = new FormData();
          files.forEach((f) => formData.append("files", f));
          if (Object.keys(options).length > 0) {
            formData.append("options", JSON.stringify(options));
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
          // Browser-side tool: process locally
          output = await tool.process(files, options);
        }

        setResult(output);
        setState("done");

        // Log usage after successful processing
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
    [tool, options, user, profile]
  );

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setError(null);
  };

  const transition = {
    initial: { opacity: 0, y: 16, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -12, filter: "blur(4px)" },
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {tool.optionsUI && state === "idle" && (
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
              Process another file
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
              onClick={handleReset}
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
