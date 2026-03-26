import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const percentageCalculator: ToolPlugin = {
  id: "percentage-calculator",
  category: "calculator",
  name: "Percentage Calculator",
  description: "Calculate percentages, find what percent one number is of another, or compute values from percentages.",
  keywords: ["percentage", "percent", "calculator", "math", "ratio"],
  icon: "%",

  inputMode: "text",
  textPlaceholder: "Enter: value percentage\nExample: 200 15%",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a value and percentage (e.g. 200 15%) or 'what % is 30 of 200'.");

    const lines: string[] = [];

    // Format: "what % is X of Y"
    const whatPctMatch = text.match(/what\s*%?\s*(?:is|percent(?:age)?\s+is)\s+([\d.]+)\s+of\s+([\d.]+)/i);
    if (whatPctMatch) {
      const part = parseFloat(whatPctMatch[1]);
      const whole = parseFloat(whatPctMatch[2]);
      if (isNaN(part) || isNaN(whole)) throw new Error("Invalid numbers.");
      if (whole === 0) throw new Error("Cannot divide by zero.");
      const pct = (part / whole) * 100;
      lines.push("=== Percentage Result ===");
      lines.push(`${part} is ${pct.toFixed(4).replace(/\.?0+$/, "")}% of ${whole}`);
      lines.push("");
      lines.push(`Calculation: (${part} / ${whole}) × 100 = ${pct.toFixed(4).replace(/\.?0+$/, "")}%`);
    } else {
      // Format: "value percentage" e.g. "200 15%" or "200 15"
      const parts = text.split(/\s+/);
      if (parts.length < 2) throw new Error("Please enter two values, e.g. '200 15%' or 'what % is 30 of 200'.");
      const value = parseFloat(parts[0]);
      const pctStr = parts[1].replace("%", "");
      const pct = parseFloat(pctStr);
      if (isNaN(value) || isNaN(pct)) throw new Error("Invalid numbers. Example: 200 15%");
      const result = (value * pct) / 100;
      const remaining = value - result;
      lines.push("=== Percentage Result ===");
      lines.push(`${pct}% of ${value} = ${result.toFixed(4).replace(/\.?0+$/, "")}`);
      lines.push("");
      lines.push("=== Additional Info ===");
      lines.push(`Value:           ${value}`);
      lines.push(`Percentage:      ${pct}%`);
      lines.push(`Result:          ${result.toFixed(4).replace(/\.?0+$/, "")}`);
      lines.push(`Remaining:       ${remaining.toFixed(4).replace(/\.?0+$/, "")} (${value} - ${result.toFixed(2)})`);
      lines.push(`Inverse:         ${value} is ${((value / result) * 100).toFixed(2)}% of the result`);
    }

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "percentage-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default percentageCalculator;
