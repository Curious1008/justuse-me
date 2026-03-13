"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ToolIcon from "@/components/tool/ToolIcon";
import { type Locale, localePath } from "@/lib/i18n";

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  lang?: Locale;
}

export default function ToolCard({
  id,
  name,
  description,
  icon,
  lang = "en",
}: ToolCardProps) {
  return (
    <Link href={localePath(lang, `/tools/${id}`)}>
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] cursor-pointer text-center transition-all duration-300 overflow-hidden hover:shadow-md hover:shadow-black/[0.03]"
      >
        <div className="relative z-10"><ToolIcon toolId={id} fallbackEmoji={icon} /></div>
        <h3 className="font-semibold text-sm font-[family-name:var(--font-sora)] text-[var(--color-text)] relative z-10">
          {name}
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed relative z-10">
          {description}
        </p>
      </motion.div>
    </Link>
  );
}
