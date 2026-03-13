"use client";

import { useState } from "react";
import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
  fileInfo?: Record<string, unknown>;
}

export default function ProtectPdfOptions({ options, onChange }: Props) {
  const password = (options.password as string) || "";
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-[var(--color-text-muted)]">Set a password to open the PDF</p>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => onChange({ ...options, password: e.target.value })}
          placeholder="Enter password (min 4 characters)"
          className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {password.length > 0 && password.length < 4 && (
        <p className="text-xs text-[var(--color-error)]">Password must be at least 4 characters</p>
      )}
    </div>
  );
}
