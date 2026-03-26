import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const removeDuplicateLines: ToolPlugin = {
  id: "remove-duplicate-lines",
  category: "text",
  name: "Remove Duplicate Lines",
  description: "Remove repeated lines from text, keeping only unique entries.",
  keywords: ["remove duplicates", "unique lines", "deduplicate", "distinct lines"],
  icon: "🔂",
  inputMode: "text",
  textPlaceholder: "Paste lines here — duplicates will be removed",
  textButtonLabel: "Remove Duplicates",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,
  runtime: "browser",
  previewUI: TextPreview,
  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const lines = text.split("\n");
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const line of lines) {
      if (!seen.has(line)) {
        seen.add(line);
        unique.push(line);
      }
    }
    const removed = lines.length - unique.length;
    const result = unique.join("\n");
    const summary = `# Removed ${removed} duplicate line(s). ${unique.length} unique line(s) remain.\n\n${result}`;

    return {
      blob: new Blob([summary], { type: "text/plain" }),
      filename: "unique-lines.txt",
      mimeType: "text/plain",
    };
  },
};

export default removeDuplicateLines;
