import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const jsonValidator: ToolPlugin = {
  id: "json-validator",
  category: "developer",
  name: "JSON Validator",
  description: "Validate JSON and get a formatted, pretty-printed version or a detailed error with line number.",
  keywords: ["json validator", "validate json", "json lint", "json formatter", "json checker", "json error"],
  icon: "✅",

  inputMode: "text",
  textPlaceholder: "Paste JSON to validate",
  textButtonLabel: "Validate JSON",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim();
    if (!raw) throw new Error("Please paste JSON to validate.");

    const lines: string[] = [];

    try {
      const parsed = JSON.parse(raw);
      const formatted = JSON.stringify(parsed, null, 2);

      const type = Array.isArray(parsed) ? "array" : typeof parsed;
      const keyCount = type === "object" ? Object.keys(parsed as object).length : null;
      const itemCount = Array.isArray(parsed) ? (parsed as unknown[]).length : null;

      lines.push("=== Valid JSON ===");
      lines.push("");
      lines.push(`Type:  ${type}`);
      if (keyCount !== null) lines.push(`Keys:  ${keyCount}`);
      if (itemCount !== null) lines.push(`Items: ${itemCount}`);
      lines.push(`Size:  ${(new TextEncoder().encode(raw).length / 1024).toFixed(2)} KB`);
      lines.push("");
      lines.push("=== Formatted JSON ===");
      lines.push("");
      lines.push(formatted);
    } catch (err) {
      const message = (err as SyntaxError).message;

      // Extract line/column from error message if available
      const posMatch = message.match(/position (\d+)/i);
      let lineInfo = "";
      if (posMatch) {
        const pos = parseInt(posMatch[1]);
        const before = raw.slice(0, pos);
        const lineNum = before.split("\n").length;
        const colNum = before.length - before.lastIndexOf("\n");
        lineInfo = ` (line ${lineNum}, column ${colNum})`;
      }

      lines.push("=== Invalid JSON ===");
      lines.push("");
      lines.push(`Error: ${message}${lineInfo}`);
      lines.push("");

      // Show context around the error
      if (posMatch) {
        const pos = parseInt(posMatch[1]);
        const before = raw.slice(0, pos);
        const lineNum = before.split("\n").length;
        const rawLines = raw.split("\n");
        const start = Math.max(0, lineNum - 3);
        const end = Math.min(rawLines.length, lineNum + 2);
        lines.push("=== Context ===");
        lines.push("");
        rawLines.slice(start, end).forEach((l, i) => {
          const ln = start + i + 1;
          const marker = ln === lineNum ? ">>>" : "   ";
          lines.push(`${marker} ${ln}: ${l}`);
        });
      }
    }

    const result = lines.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "json-validation.txt",
      mimeType: "text/plain",
    };
  },
};

export default jsonValidator;
