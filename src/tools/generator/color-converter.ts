import type { ToolPlugin, ToolResult } from "../types";

const colorConverter: ToolPlugin = {
  id: "color-converter",
  category: "generator",
  name: "Color Converter",
  description: "Convert colors between HEX, RGB, HSL, and other formats.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "color picker",
    "hsl converter",
  ],
  icon: "\u{1F3A8}",

  inputMode: "text",
  textPlaceholder: "Enter a color (e.g. #ff6600, rgb(255,102,0), teal)...",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      throw new Error("Please enter a color value.");
    }

    const results: string[] = [];

    for (const line of lines) {
      try {
        const chroma = (await import("chroma-js")).default;
        const color = chroma(line);
        const hex = color.hex();
        const [r, g, b] = color.rgb();
        const [h, s, l] = color.hsl();
        const [labL, labA, labB] = color.lab();

        results.push(`Input: ${line}`);
        results.push(`  HEX: ${hex}`);
        results.push(`  RGB: rgb(${r}, ${g}, ${b})`);
        results.push(
          `  HSL: hsl(${isNaN(h) ? 0 : Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
        );
        results.push(
          `  LAB: lab(${labL.toFixed(2)}, ${labA.toFixed(2)}, ${labB.toFixed(2)})`
        );
        results.push("");
      } catch {
        results.push(`Input: ${line}`);
        results.push(`  ERROR: Could not parse "${line}" as a color.`);
        results.push("");
      }
    }

    const output = results.join("\n");

    return {
      blob: new Blob([output], { type: "text/plain" }),
      filename: "colors.txt",
      mimeType: "text/plain",
    };
  },
};

export default colorConverter;
