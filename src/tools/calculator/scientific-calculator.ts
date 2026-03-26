import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const scientificCalculator: ToolPlugin = {
  id: "scientific-calculator",
  category: "calculator",
  name: "Scientific Calculator",
  description: "Evaluate mathematical expressions with support for trigonometry, logarithms, square roots, and more.",
  keywords: ["scientific calculator", "math", "expression", "trigonometry", "logarithm", "sqrt", "formula"],
  icon: "🧮",

  inputMode: "text",
  textPlaceholder: "Enter math expression:\nExample: sqrt(144) + sin(45 * pi / 180)",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const rawText = (await files[0].text()).trim();
    if (!rawText) throw new Error("Please enter a mathematical expression.");

    // Process each non-empty line
    const inputLines = rawText.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    const results: string[] = [];

    for (const expr of inputLines) {
      // Replace common math functions and constants
      let processed = expr
        .replace(/\bpi\b/gi, "Math.PI")
        .replace(/\be\b/g, "Math.E")
        .replace(/\bsqrt\b/gi, "Math.sqrt")
        .replace(/\babs\b/gi, "Math.abs")
        .replace(/\bsin\b/gi, "Math.sin")
        .replace(/\bcos\b/gi, "Math.cos")
        .replace(/\btan\b/gi, "Math.tan")
        .replace(/\basin\b/gi, "Math.asin")
        .replace(/\bacos\b/gi, "Math.acos")
        .replace(/\batan\b/gi, "Math.atan")
        .replace(/\batan2\b/gi, "Math.atan2")
        .replace(/\bln\b/gi, "Math.log")
        .replace(/\blog10\b/gi, "Math.log10")
        .replace(/\blog2\b/gi, "Math.log2")
        .replace(/\blog\b/gi, "Math.log10")
        .replace(/\bceil\b/gi, "Math.ceil")
        .replace(/\bfloor\b/gi, "Math.floor")
        .replace(/\bround\b/gi, "Math.round")
        .replace(/\bmax\b/gi, "Math.max")
        .replace(/\bmin\b/gi, "Math.min")
        .replace(/\bpow\b/gi, "Math.pow")
        .replace(/\^/g, "**");

      // Security: only allow safe characters
      if (/[a-zA-Z_$]/.test(processed.replace(/Math\.\w+/g, ""))) {
        throw new Error(`Unsafe expression: "${expr}". Only math functions (sin, cos, sqrt, log, etc.) are allowed.`);
      }

      let result: number;
      try {
        // eslint-disable-next-line no-new-func
        result = Function(`"use strict"; return (${processed})`)() as number;
      } catch {
        throw new Error(`Cannot evaluate: "${expr}". Check your syntax.`);
      }

      if (typeof result !== "number") throw new Error(`Expression did not return a number: "${expr}"`);

      if (!isFinite(result)) {
        if (isNaN(result)) {
          results.push(`${expr} = NaN (undefined result)`);
        } else {
          results.push(`${expr} = ${result > 0 ? "Infinity" : "-Infinity"}`);
        }
      } else {
        // Format the result: show full precision but trim trailing zeros
        const formatted = Number.isInteger(result)
          ? result.toLocaleString("en-US", { maximumFractionDigits: 0 })
          : result.toPrecision(10).replace(/\.?0+$/, "");
        results.push(`${expr} = ${formatted}`);
      }
    }

    const lines: string[] = [
      "=== Scientific Calculator Result ===",
      ...results,
      "",
      "=== Supported Functions ===",
      "  Arithmetic:  + - * / ** (power) ^ (power)",
      "  Trigonometry: sin, cos, tan, asin, acos, atan, atan2",
      "  Roots/Logs:  sqrt, abs, ln, log (log10), log2, log10",
      "  Rounding:    ceil, floor, round",
      "  Other:       max, min, pow",
      "  Constants:   pi, e",
      "  Grouping:    (parentheses)",
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "calculator-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default scientificCalculator;
