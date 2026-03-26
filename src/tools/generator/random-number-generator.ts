import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const randomNumberGenerator: ToolPlugin = {
  id: "random-number-generator",
  category: "generator",
  name: "Random Number Generator",
  description: "Generate random numbers within a specified range.",
  keywords: [
    "random number",
    "random number generator",
    "dice roller",
    "number picker",
    "random integer",
  ],
  icon: "\u{1F3B2}",

  inputMode: "text",
  textPlaceholder: "Enter: min max [count]\nExample: 1 100 5",
  textButtonLabel: "Generate",

  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    const parts = text.split(/\s+/).map(Number);

    if (parts.length < 2 || parts.some(isNaN)) {
      throw new Error("Please enter at least two numbers: min max [count]. Example: 1 100 5");
    }

    let [min, max] = parts;
    let count = parts[2] ?? 1;

    if (min > max) [min, max] = [max, min];
    if (count < 1 || isNaN(count)) count = 1;
    if (count > 1000) count = 1000;

    const randInt = (lo: number, hi: number) =>
      Math.floor(Math.random() * (hi - lo + 1)) + lo;

    const numbers = Array.from({ length: count }, () => randInt(min, max));

    const lines = [
      `Range: ${min} – ${max}`,
      `Count: ${count}`,
      "",
      "Results:",
      numbers.join(", "),
    ];

    if (count > 1) {
      const sorted = [...numbers].sort((a, b) => a - b);
      lines.push("", `Min: ${sorted[0]}  Max: ${sorted[sorted.length - 1]}`);
      const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
      lines.push(`Average: ${avg.toFixed(2)}`);
    }

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "random-numbers.txt",
      mimeType: "text/plain",
    };
  },
};

export default randomNumberGenerator;
