"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ToolPlugin, ToolResult, ToolOptions } from "@/tools/types";
import DropZone from "./DropZone";
import ProcessingAnimation from "./ProcessingAnimation";
import DownloadButton from "./DownloadButton";

type ToolState = "idle" | "processing" | "done" | "error";

interface ToolShellProps {
  tool: ToolPlugin;
}

export default function ToolShell({ tool }: ToolShellProps) {
  const [state, setState] = useState<ToolState>("idle");
  const [result, setResult] = useState<ToolResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<ToolOptions>({});

  const handleFiles = useCallback(
    async (files: File[]) => {
      setState("processing");
      setError(null);
      setResult(null);

      try {
        const output = await tool.process(files, options);
        setResult(output);
        setState("done");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
        setState("error");
      }
    },
    [tool, options]
  );

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {tool.optionsUI && state === "idle" && (
        <div className="mb-6">
          <tool.optionsUI options={options} onChange={setOptions} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <DropZone
              acceptedTypes={tool.acceptedTypes}
              maxFiles={tool.maxFiles}
              maxFileSize={tool.maxFileSize}
              onFiles={handleFiles}
            />
          </motion.div>
        )}

        {state === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ProcessingAnimation />
          </motion.div>
        )}

        {state === "done" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-6"
          >
            {tool.previewUI && <tool.previewUI result={result} />}
            <DownloadButton result={result} />
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm text-gray-400 hover:text-gray-600 underline"
            >
              Process another file
            </motion.button>
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-4 h-64 justify-center"
          >
            <p className="text-red-500 text-sm">{error}</p>
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 border border-gray-300 rounded-xl text-sm text-gray-600 hover:border-gray-400"
            >
              Try again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
