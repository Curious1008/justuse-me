"use client";

import ToolIcon from "@/components/tool/ToolIcon";

export default function ToolPageIcon({ toolId, fallbackEmoji }: { toolId: string; fallbackEmoji: string }) {
  return (
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
      <ToolIcon toolId={toolId} fallbackEmoji={fallbackEmoji} size="md" />
    </div>
  );
}
