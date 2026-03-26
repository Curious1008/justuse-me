import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const stringReverse: ToolPlugin = {
  id: "string-reverse",
  category: "text",
  name: "String Reverse",
  description: "Reverse a string or each line of text independently.",
  keywords: ["reverse string", "reverse text", "flip text", "mirror text"],
  icon: "🔄",
  inputMode: "text",
  textPlaceholder: "Paste text to reverse",
  textButtonLabel: "Reverse",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,
  runtime: "browser",
  previewUI: TextPreview,
  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const result = text
      .split("\n")
      .map((line) => [...line].reverse().join(""))
      .join("\n");

    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "reversed.txt",
      mimeType: "text/plain",
    };
  },
};

export default stringReverse;
