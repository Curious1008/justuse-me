import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const htmlToMarkdown: ToolPlugin = {
  id: "html-to-markdown",
  category: "convert",
  name: "HTML to Markdown",
  description: "Convert HTML files to clean Markdown format.",
  keywords: [
    "html to markdown",
    "html to md",
    "convert html",
    "html converter",
  ],
  icon: "\u{1F4DD}",

  acceptedTypes: [".html", ".htm", "text/html"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    let md;
    try {
      const TurndownService = (await import("turndown")).default;
      const td = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
      });
      md = td.turndown(text);
    } catch {
      throw new Error("Failed to convert HTML to Markdown. Please check your HTML.");
    }

    const baseName = files[0].name.replace(/\.(html|htm)$/i, "");
    return {
      blob: new Blob([md], { type: "text/markdown" }),
      filename: `${baseName}.md`,
      mimeType: "text/markdown",
    };
  },
};

export default htmlToMarkdown;
