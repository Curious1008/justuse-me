"use client";

import { getToolById } from "@/tools/registry";
import type { ToolLabels } from "@/tools/types";
import ToolShell from "@/components/tool/ToolShell";

export default function ToolPageClient({ toolId, labels }: { toolId: string; labels: ToolLabels }) {
  const tool = getToolById(toolId);

  if (!tool) return <p className="text-center text-[var(--color-text-muted)]">Tool not found.</p>;

  return <ToolShell tool={tool} labels={labels} />;
}
