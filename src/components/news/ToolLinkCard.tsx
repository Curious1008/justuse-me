"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getToolById } from "@/tools/registry";
import { localePath, type Locale } from "@/lib/i18n";
import ToolIcon from "@/components/tool/ToolIcon";

interface ToolLinkCardProps {
  toolId: string;
  locale: Locale;
}

export default function ToolLinkCard({ toolId, locale }: ToolLinkCardProps) {
  const tool = getToolById(toolId);
  if (!tool) return null;

  return (
    <Link href={localePath(locale, `/tools/${toolId}`)}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="inline-flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 hover:shadow-md transition-shadow"
      >
        <ToolIcon toolId={toolId} size="sm" />
        <div>
          <div className="font-medium text-sm">{tool.name}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">{tool.description}</div>
        </div>
      </motion.div>
    </Link>
  );
}
