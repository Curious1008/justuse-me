import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

/**
 * Regex-based SVG optimizer that removes common bloat:
 * - XML comments
 * - <metadata> blocks
 * - Empty groups <g></g> and <g/>
 * - XML declaration <?xml ...?>
 * - doctype declarations
 * - Default unnecessary attributes (e.g. version="1.1", xmlns:xlink if unused)
 * - Trailing whitespace and blank lines
 * - Multiple spaces in attribute lists
 */
function optimizeSvg(input: string): string {
  let svg = input;

  // Remove XML declaration
  svg = svg.replace(/<\?xml[^?]*\?>\s*/gi, "");

  // Remove DOCTYPE
  svg = svg.replace(/<!DOCTYPE[^>]*>\s*/gi, "");

  // Remove XML/HTML comments
  svg = svg.replace(/<!--[\s\S]*?-->/g, "");

  // Remove <metadata>...</metadata> blocks
  svg = svg.replace(/<metadata[\s\S]*?<\/metadata>/gi, "");

  // Remove <title>...</title> blocks (often editor-generated)
  svg = svg.replace(/<title>[\s\S]*?<\/title>/gi, "");

  // Remove <desc>...</desc> blocks
  svg = svg.replace(/<desc>[\s\S]*?<\/desc>/gi, "");

  // Remove sodipodi and inkscape namespaced elements
  svg = svg.replace(/<sodipodi:[^/]*\/>/gi, "");
  svg = svg.replace(/<sodipodi:[\s\S]*?<\/sodipodi:[^>]*>/gi, "");
  svg = svg.replace(/<inkscape:[^/]*\/>/gi, "");

  // Remove inkscape/sodipodi/dc/cc/rdf namespace attributes on <svg>
  svg = svg.replace(/\s+xmlns:(sodipodi|inkscape|dc|cc|rdf)="[^"]*"/gi, "");
  svg = svg.replace(/\s+(sodipodi|inkscape):[a-z-]+=("[^"]*"|'[^']*')/gi, "");

  // Remove xmlns:xlink if xlink: is not used in the SVG
  if (!svg.includes("xlink:")) {
    svg = svg.replace(/\s+xmlns:xlink="[^"]*"/gi, "");
  }

  // Remove version="1.1" attribute (implied)
  svg = svg.replace(/\s+version="1\.1"/gi, "");

  // Remove empty groups: <g></g> and <g/>
  // Run twice to handle nested empties
  for (let i = 0; i < 3; i++) {
    svg = svg.replace(/<g(\s[^>]*)?\s*>\s*<\/g>/gi, "");
    svg = svg.replace(/<g(\s[^>]*)?\s*\/>/gi, "");
  }

  // Collapse multiple spaces inside tags (not between tags)
  svg = svg.replace(/(<[^>]+>)/g, (match) => match.replace(/\s+/g, " ").trim());

  // Remove blank lines and collapse multiple newlines
  svg = svg.replace(/^\s*[\r\n]/gm, "");
  svg = svg.replace(/\n{3,}/g, "\n\n");

  return svg.trim();
}

const svgOptimizer: ToolPlugin = {
  id: "svg-optimizer",
  category: "developer",
  name: "SVG Optimizer",
  description: "Remove comments, metadata, empty groups, and unnecessary attributes to reduce SVG file size.",
  keywords: ["svg optimizer", "svgo", "optimize svg", "compress svg", "svg cleaner", "svg minifier"],
  icon: "✨",

  acceptedTypes: ["image/svg+xml", ".svg"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const input = await file.text();

    if (!input.trim()) throw new Error("File appears to be empty.");
    if (!/<svg/i.test(input)) throw new Error("File does not appear to be a valid SVG.");

    const optimized = optimizeSvg(input);

    const originalBytes = new TextEncoder().encode(input).length;
    const optimizedBytes = new TextEncoder().encode(optimized).length;
    const savings = originalBytes - optimizedBytes;
    const savingsPct = ((savings / originalBytes) * 100).toFixed(1);

    const result = [
      `<!-- Optimized by SVG Optimizer -->`,
      `<!-- Original: ${(originalBytes / 1024).toFixed(2)} KB | Optimized: ${(optimizedBytes / 1024).toFixed(2)} KB | Saved: ${savings} bytes (${savingsPct}%) -->`,
      "",
      optimized,
    ].join("\n");

    const baseName = file.name.replace(/\.svg$/i, "");
    return {
      blob: new Blob([result], { type: "image/svg+xml" }),
      filename: `${baseName}-optimized.svg`,
      mimeType: "image/svg+xml",
    };
  },
};

export default svgOptimizer;
