import { createTwoFilesPatch } from "diff";
import type { ToolPlugin, ToolResult } from "../types";

const diffChecker: ToolPlugin = {
  id: "diff-checker",
  category: "text",
  name: "Diff Checker",
  description: "Compare two text files and highlight differences.",
  keywords: [
    "diff checker",
    "compare files",
    "text compare",
    "file diff",
    "difference",
  ],
  icon: "🔍",

  acceptedTypes: [
    "text/plain",
    ".txt",
    ".md",
    ".json",
    ".csv",
    ".xml",
    ".yaml",
    ".yml",
    "application/json",
    "text/markdown",
    "text/csv",
  ],
  maxFiles: 2,
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    if (files.length < 2) {
      throw new Error("Please upload exactly 2 files to compare.");
    }

    const [textA, textB] = await Promise.all([
      files[0].text(),
      files[1].text(),
    ]);

    const patch = createTwoFilesPatch(
      files[0].name,
      files[1].name,
      textA,
      textB,
      "",
      "",
      { context: 3 }
    );

    const linesA = textA.split("\n");
    const linesB = textB.split("\n");

    const escapeHtml = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const maxLines = Math.max(linesA.length, linesB.length);
    let rows = "";
    for (let i = 0; i < maxLines; i++) {
      const lineA = i < linesA.length ? linesA[i] : "";
      const lineB = i < linesB.length ? linesB[i] : "";
      const isDiff = lineA !== lineB;
      const bgA = isDiff ? "background:#fdd;" : "";
      const bgB = isDiff ? "background:#dfd;" : "";
      rows += `<tr>
        <td style="padding:2px 8px;color:#888;text-align:right;user-select:none;">${i < linesA.length ? i + 1 : ""}</td>
        <td style="padding:2px 8px;white-space:pre-wrap;font-family:monospace;${bgA}">${escapeHtml(lineA)}</td>
        <td style="padding:2px 8px;color:#888;text-align:right;user-select:none;">${i < linesB.length ? i + 1 : ""}</td>
        <td style="padding:2px 8px;white-space:pre-wrap;font-family:monospace;${bgB}">${escapeHtml(lineB)}</td>
      </tr>`;
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: sans-serif; margin: 0; padding: 1rem; }
  h2 { margin-top: 0; }
  pre { background: #f5f5f5; padding: 1rem; overflow-x: auto; font-size: 13px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  td { border: 1px solid #ddd; vertical-align: top; }
  th { background: #eee; padding: 4px 8px; text-align: left; }
</style>
</head>
<body>
<h2>Diff: ${escapeHtml(files[0].name)} vs ${escapeHtml(files[1].name)}</h2>
<h3>Unified Diff</h3>
<pre>${escapeHtml(patch)}</pre>
<h3>Side-by-Side</h3>
<table>
  <tr><th colspan="2">${escapeHtml(files[0].name)}</th><th colspan="2">${escapeHtml(files[1].name)}</th></tr>
  ${rows}
</table>
</body>
</html>`;

    return {
      blob: new Blob([html], { type: "text/html" }),
      filename: "diff.html",
      mimeType: "text/html",
    };
  },
};

export default diffChecker;
