import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const removeWhitespace: ToolPlugin = {
  id: "remove-whitespace",
  category: "text",
  name: "Remove Whitespace",
  description: "Strip extra spaces, tabs, and blank lines from text.",
  keywords: ["remove whitespace", "trim spaces", "clean text", "strip blank lines"],
  icon: "🧹",
  inputMode: "text",
  textPlaceholder: "Paste text to clean up whitespace",
  textButtonLabel: "Clean",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,
  runtime: "browser",
  previewUI: TextPreview,
  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    const result = text
      .split("\n")
      .map((line) => line.replace(/\t/g, " ").replace(/ {2,}/g, " ").trim())
      .filter((line, i, arr) => {
        // Remove consecutive blank lines
        if (line === "") {
          const prev = i > 0 ? arr[i - 1] : "x";
          return prev !== "";
        }
        return true;
      })
      .join("\n")
      .trim();

    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "cleaned.txt",
      mimeType: "text/plain",
    };
  },
};

export default removeWhitespace;
