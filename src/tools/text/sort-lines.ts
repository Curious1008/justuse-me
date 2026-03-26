import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const sortLines: ToolPlugin = {
  id: "sort-lines",
  category: "text",
  name: "Sort Lines",
  description: "Sort lines of text alphabetically from A to Z.",
  keywords: ["sort lines", "alphabetical sort", "line sorter", "text sort"],
  icon: "🔤",
  inputMode: "text",
  textPlaceholder: "Paste lines to sort alphabetically",
  textButtonLabel: "Sort",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,
  runtime: "browser",
  previewUI: TextPreview,
  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const lines = text.split("\n");
    const sorted = [...lines].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    const result = sorted.join("\n");

    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "sorted-lines.txt",
      mimeType: "text/plain",
    };
  },
};

export default sortLines;
