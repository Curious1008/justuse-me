import type { ToolPlugin, ToolResult } from "../types";

function minifyCss(css: string): string {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, "")
    // Remove whitespace around selectors and properties
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")
    // Remove last semicolon before closing brace
    .replace(/;}/g, "}")
    // Collapse multiple whitespace
    .replace(/\s+/g, " ")
    // Remove leading/trailing whitespace
    .trim();
}

const cssMinifier: ToolPlugin = {
  id: "css-minifier",
  category: "text",
  name: "CSS Minifier",
  description: "Minify and optimize CSS stylesheets.",
  keywords: [
    "minify css",
    "css minifier",
    "compress css",
    "css optimizer",
    "css compressor",
  ],
  icon: "🎨",

  acceptedTypes: ["text/css", ".css"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const minified = minifyCss(text);

    const baseName = files[0].name.replace(/\.css$/i, "");
    return {
      blob: new Blob([minified], { type: "text/css" }),
      filename: `${baseName}.min.css`,
      mimeType: "text/css",
    };
  },
};

export default cssMinifier;
