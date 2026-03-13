import type { ToolPlugin, ToolResult } from "../types";

function minifyJs(code: string): string {
  return code
    // Remove single-line comments (but not URLs like http://)
    .replace(/(?<![:"'])\/\/.*$/gm, "")
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, "")
    // Collapse whitespace
    .replace(/\s+/g, " ")
    // Remove spaces around operators
    .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, "$1")
    // Remove trailing whitespace
    .trim();
}

const jsMinifier: ToolPlugin = {
  id: "js-minifier",
  category: "text",
  name: "JS Minifier",
  description: "Minify and compress JavaScript code.",
  keywords: [
    "minify js",
    "javascript minifier",
    "compress js",
    "uglify",
    "js compressor",
  ],
  icon: "⚡",

  acceptedTypes: ["text/javascript", "application/javascript", ".js", ".mjs"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const minified = minifyJs(text);

    if (!minified) {
      throw new Error("Minification produced empty output. Please check your JavaScript.");
    }

    const baseName = files[0].name.replace(/\.(js|mjs)$/i, "");
    return {
      blob: new Blob([minified], { type: "text/javascript" }),
      filename: `${baseName}.min.js`,
      mimeType: "text/javascript",
    };
  },
};

export default jsMinifier;
