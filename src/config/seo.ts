import type { Metadata } from "next";
import type { ToolPlugin } from "@/tools/types";

export function generateToolMetadata(tool: ToolPlugin): Metadata {
  return {
    title: `${tool.name} Online Free — JustUse.me`,
    description: `${tool.description} Free, no ads, no sign-up. Your files stay on your device.`,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} — JustUse.me`,
      description: tool.description,
      type: "website",
    },
  };
}
