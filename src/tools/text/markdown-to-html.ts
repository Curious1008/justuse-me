import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const markdownToHtml: ToolPlugin = {
  id: "markdown-to-html",
  category: "text",
  name: "Markdown to HTML",
  description: "Convert Markdown files to clean HTML.",
  keywords: [
    "markdown to html",
    "md to html",
    "markdown converter",
    "markdown render",
  ],
  icon: "📋",

  acceptedTypes: ["text/markdown", ".md", "text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const { marked } = await import("marked");
    const body = await marked.parse(text);
    const sanitized = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>body{font-family:sans-serif;max-width:800px;margin:0 auto;padding:2rem;}</style>
</head>
<body>
${sanitized}
</body>
</html>`;

    return {
      blob: new Blob([html], { type: "text/html" }),
      filename: "converted.html",
      mimeType: "text/html",
    };
  },
};

export default markdownToHtml;
