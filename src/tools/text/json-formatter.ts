import type { ToolPlugin, ToolResult } from "../types";

const jsonFormatter: ToolPlugin = {
  id: "json-formatter",
  category: "text",
  name: "JSON Formatter",
  description: "Format and beautify JSON data with proper indentation.",
  keywords: [
    "json formatter",
    "json beautifier",
    "format json",
    "json pretty print",
  ],
  icon: "{ }",

  acceptedTypes: ["application/json", ".json", ".txt"],
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON. Please check your file and try again.");
    }

    const formatted = JSON.stringify(parsed, null, 2);
    return {
      blob: new Blob([formatted], { type: "application/json" }),
      filename: "formatted.json",
      mimeType: "application/json",
    };
  },
};

export default jsonFormatter;
