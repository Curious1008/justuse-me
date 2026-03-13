"use client";

import { getToolById } from "@/tools/registry";
import ToolShell from "@/components/tool/ToolShell";

export default function ToolPageClient({ toolId }: { toolId: string }) {
  const tool = getToolById(toolId);

  if (!tool) return <p className="text-center text-gray-400">Tool not found.</p>;

  return <ToolShell tool={tool} />;
}
