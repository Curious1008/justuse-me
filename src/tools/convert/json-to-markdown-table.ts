import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const jsonToMarkdownTable: ToolPlugin = {
  id: "json-to-markdown-table",
  category: "convert",
  name: "JSON to Markdown Table",
  description: "Convert JSON arrays to formatted Markdown tables.",
  keywords: [
    "json to markdown",
    "json to table",
    "markdown table",
    "json table",
    "json2md",
  ],
  icon: "\uD83D\uDCCB",

  acceptedTypes: [".json", ".txt", "application/json", "text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON. Please check your file and try again.");
    }

    if (!Array.isArray(parsed) || parsed.length === 0 || typeof parsed[0] !== "object" || parsed[0] === null) {
      throw new Error("Input must be a JSON array of objects.");
    }

    if (parsed.length > 10000) {
      throw new Error("Too many rows (max 10,000). Please reduce the data size.");
    }

    // Extract all unique keys across all objects
    const headersSet = new Set<string>();
    for (const row of parsed) {
      if (typeof row === "object" && row !== null) {
        for (const key of Object.keys(row)) {
          headersSet.add(key);
        }
      }
    }
    const headers = [...headersSet];

    // Build header row (escape pipes in header names)
    const headerRow = "| " + headers.map((h) => h.replace(/\|/g, "\\|")).join(" | ") + " |";
    const separatorRow = "| " + headers.map(() => "---").join(" | ") + " |";

    // Escape pipe and newline characters in cell values
    function escapeCell(val: unknown): string {
      if (val === null || val === undefined) return "";
      const str = typeof val === "object" ? JSON.stringify(val) : String(val);
      return str.replace(/\|/g, "\\|").replace(/\n/g, " ");
    }

    // Build data rows
    const dataRows = parsed.map((row) => {
      const cells = headers.map((h) => escapeCell(row?.[h]));
      return "| " + cells.join(" | ") + " |";
    });

    const markdown = [headerRow, separatorRow, ...dataRows].join("\n");

    return {
      blob: new Blob([markdown], { type: "text/markdown" }),
      filename: "table.md",
      mimeType: "text/markdown",
    };
  },
};

export default jsonToMarkdownTable;
