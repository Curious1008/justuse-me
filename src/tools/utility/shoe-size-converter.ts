import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

// Standard shoe size conversion table (men's sizes)
// Each row: [US, EU, UK, JP(cm)]
const SIZES: [number, number, number, number][] = [
  [6, 39, 5.5, 24],
  [6.5, 39, 6, 24.5],
  [7, 40, 6.5, 25],
  [7.5, 40.5, 7, 25.5],
  [8, 41, 7.5, 26],
  [8.5, 42, 8, 26.5],
  [9, 42.5, 8.5, 27],
  [9.5, 43, 9, 27.5],
  [10, 44, 9.5, 28],
  [10.5, 44.5, 10, 28.5],
  [11, 45, 10.5, 29],
  [11.5, 45.5, 11, 29.5],
  [12, 46, 11.5, 30],
  [13, 47, 12.5, 31],
  [14, 48, 13.5, 32],
];

const shoeConverter: ToolPlugin = {
  id: "shoe-size-converter",
  category: "utility",
  name: "Shoe Size Converter",
  description: "Convert shoe sizes between US, EU, UK, and JP (Japanese cm) sizing standards.",
  keywords: [
    "shoe size converter",
    "US to EU shoe size",
    "shoe size chart",
    "european shoe size",
    "sneaker size converter",
  ],
  icon: "👟",

  inputMode: "text",
  textPlaceholder: "Enter: size system\nExample: 10 US",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a shoe size and system (e.g. 10 US).");

    const match = text.match(/^(\d+(?:\.\d+)?)\s*(US|EU|UK|JP)$/i);
    if (!match) {
      throw new Error(
        `Could not parse "${text}". Use format: size system — e.g. "10 US", "43 EU", "9 UK", "28 JP".`
      );
    }

    const value = parseFloat(match[1]);
    const system = match[2].toUpperCase();

    // Find the closest matching row
    const COL: Record<string, number> = { US: 0, EU: 1, UK: 2, JP: 3 };
    const col = COL[system];

    let closest: [number, number, number, number] | null = null;
    let minDiff = Infinity;
    for (const row of SIZES) {
      const diff = Math.abs(row[col] - value);
      if (diff < minDiff) {
        minDiff = diff;
        closest = row;
      }
    }

    if (!closest || minDiff > 1) {
      throw new Error(
        `Size ${value} ${system} is out of the standard range. Supported US: 6–14, EU: 39–48, UK: 5.5–13.5, JP: 24–32.`
      );
    }

    const note = minDiff > 0.01 ? ` (nearest match to ${value} ${system})` : "";

    const lines = [
      `Input: ${value} ${system}${note}`,
      "",
      "=== Conversion Results ===",
      `US Size: ${closest[0]}`,
      `EU Size: ${closest[1]}`,
      `UK Size: ${closest[2]}`,
      `JP Size: ${closest[3]} cm`,
      "",
      "Note: Based on standard men's sizing. Women's US sizes are typically 1.5 sizes smaller than men's.",
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "shoe-size-conversion.txt",
      mimeType: "text/plain",
    };
  },
};

export default shoeConverter;
