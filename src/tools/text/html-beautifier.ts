import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const htmlBeautifier: ToolPlugin = {
  id: "html-beautifier",
  category: "text",
  name: "HTML Beautifier",
  description: "Format and beautify HTML code with proper indentation.",
  keywords: [
    "html beautifier",
    "html formatter",
    "format html",
    "html pretty print",
  ],
  icon: "\u{1F310}",

  inputMode: "text",
  textPlaceholder: "Paste your HTML code here...",
  textButtonLabel: "Beautify",
  acceptedTypes: [".html", ".htm", "text/html", ".txt"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();

    if (!text) {
      throw new Error("Please provide HTML to beautify.");
    }

    try {
      const { html: beautifyHtml } = await import("js-beautify");
      const formatted = beautifyHtml(text, {
        indent_size: 2,
        wrap_line_length: 120,
      });

      return {
        blob: new Blob([formatted], { type: "text/html" }),
        filename: "beautified.html",
        mimeType: "text/html",
      };
    } catch {
      throw new Error("Failed to beautify HTML. Please check your HTML syntax.");
    }
  },
};

export default htmlBeautifier;
