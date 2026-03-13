import { marked } from "marked";
import type { ToolPlugin, ToolResult } from "../types";

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
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const body = await marked.parse(text);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>body{font-family:sans-serif;max-width:800px;margin:0 auto;padding:2rem;}</style>
</head>
<body>
${body}
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
