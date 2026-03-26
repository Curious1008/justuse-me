import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const caseConverter: ToolPlugin = {
  id: "case-converter",
  category: "text",
  name: "Case Converter",
  description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, or kebab-case.",
  keywords: ["case converter", "uppercase", "lowercase", "camelcase", "snake case"],
  icon: "🔡",
  inputMode: "text",
  textPlaceholder: "First line: upper, lower, title, camel, snake, or kebab\nThen paste your text below",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,
  runtime: "browser",
  previewUI: TextPreview,
  async process(files): Promise<ToolResult> {
    const raw = await files[0].text();
    const newlineIdx = raw.indexOf("\n");
    if (newlineIdx === -1) {
      throw new Error("Please provide a mode on the first line (upper, lower, title, camel, snake, kebab) followed by your text.");
    }
    const mode = raw.slice(0, newlineIdx).trim().toLowerCase();
    const text = raw.slice(newlineIdx + 1);

    let result: string;
    switch (mode) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
        break;
      case "camel":
        result = text
          .split("\n")
          .map((line) => {
            const words = line.split(/[\s_\-]+/).filter(Boolean);
            return words
              .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
              .join("");
          })
          .join("\n");
        break;
      case "snake":
        result = text
          .split("\n")
          .map((line) => line.trim().toLowerCase().replace(/[\s\-]+/g, "_").replace(/[^a-z0-9_]/g, ""))
          .join("\n");
        break;
      case "kebab":
        result = text
          .split("\n")
          .map((line) => line.trim().toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9\-]/g, ""))
          .join("\n");
        break;
      default:
        throw new Error(`Unknown mode "${mode}". Use: upper, lower, title, camel, snake, or kebab.`);
    }

    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "converted.txt",
      mimeType: "text/plain",
    };
  },
};

export default caseConverter;
