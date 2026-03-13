"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface TextInputProps {
  placeholder?: string;
  buttonLabel?: string;
  onSubmit: (files: File[]) => void;
}

export default function TextInput({ placeholder, buttonLabel, onSubmit }: TextInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const file = new File([trimmed], "input.txt", { type: "text/plain" });
    onSubmit([file]);
  }, [value, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Enter text..."}
        rows={3}
        aria-label={placeholder || "Enter text"}
        className="w-full px-5 py-4 rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
      />
      <motion.button
        onClick={handleSubmit}
        disabled={!value.trim()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="w-full mt-3 py-3 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold font-[family-name:var(--font-sora)] cursor-pointer transition-all hover:bg-[var(--color-accent-dim)] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {buttonLabel || "Generate"}
      </motion.button>
    </div>
  );
}
