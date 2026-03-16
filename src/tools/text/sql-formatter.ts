import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const sqlFormatter: ToolPlugin = {
  id: "sql-formatter",
  category: "text",
  name: "SQL Formatter",
  description: "Format and beautify SQL queries with proper indentation.",
  keywords: [
    "sql formatter",
    "format sql",
    "sql beautifier",
    "sql pretty print",
  ],
  icon: "\u{1F5C3}\uFE0F",

  inputMode: "text",
  textPlaceholder: "Paste your SQL query here...",
  textButtonLabel: "Format",
  acceptedTypes: [".sql", ".txt", "text/plain"],
  maxFiles: 1,
  maxFileSize: 2 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();

    if (!text) {
      throw new Error("Please provide SQL to format.");
    }

    try {
      const { format } = await import("sql-formatter");
      const formatted = format(text);

      return {
        blob: new Blob([formatted], { type: "text/plain" }),
        filename: "formatted.sql",
        mimeType: "text/plain",
      };
    } catch {
      throw new Error("Failed to format SQL. Please check your SQL syntax.");
    }
  },
};

export default sqlFormatter;
