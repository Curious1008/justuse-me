import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const cssBoxShadowGenerator: ToolPlugin = {
  id: "css-box-shadow-generator",
  category: "developer",
  name: "CSS Box Shadow Generator",
  description: "Generate CSS box-shadow code from offset, blur, spread, and color parameters.",
  keywords: ["box shadow", "css shadow", "drop shadow", "css box-shadow", "shadow generator"],
  icon: "🌑",

  inputMode: "text",
  textPlaceholder: "Enter: x y blur spread color [inset]\nExample: 5 5 10 0 rgba(0,0,0,0.3)\nExample: 0 4 6 -1 #00000033 inset",
  textButtonLabel: "Generate Shadow",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim();
    if (!raw) throw new Error("Please enter shadow parameters.");

    // Split but preserve color values like rgba(0,0,0,0.3)
    // Strategy: extract inset keyword, then parse remaining tokens
    const isInset = /\binset\b/i.test(raw);
    const withoutInset = raw.replace(/\binset\b/gi, "").trim();

    // Split on spaces but not inside parentheses
    const tokens: string[] = [];
    let current = "";
    let depth = 0;
    for (const ch of withoutInset) {
      if (ch === "(") depth++;
      if (ch === ")") depth--;
      if (ch === " " && depth === 0) {
        if (current) tokens.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    if (current) tokens.push(current);

    if (tokens.length < 4) {
      throw new Error("Please provide at least 4 values: x y blur spread color\nExample: 5 5 10 0 rgba(0,0,0,0.3)");
    }

    const [x, y, blur, spread, ...colorParts] = tokens;
    const color = colorParts.join(" ") || "rgba(0,0,0,0.3)";

    // Validate numeric values
    for (const [name, val] of [["x", x], ["y", y], ["blur", blur], ["spread", spread]] as [string, string][]) {
      if (isNaN(parseFloat(val))) throw new Error(`"${val}" is not a valid number for ${name}.`);
    }

    const insetStr = isInset ? " inset" : "";
    const shadowValue = `${x}px ${y}px ${blur}px ${spread}px ${color}${insetStr}`;

    const lines: string[] = [];
    lines.push("=== CSS Box Shadow ===");
    lines.push("");
    lines.push("/* Standard */");
    lines.push(`box-shadow: ${shadowValue};`);
    lines.push("");
    lines.push("/* With vendor prefix (legacy) */");
    lines.push(`-webkit-box-shadow: ${shadowValue};`);
    lines.push(`box-shadow: ${shadowValue};`);
    lines.push("");
    lines.push("/* Multiple shadows example */");
    lines.push(`box-shadow: ${shadowValue}, 0 1px 3px rgba(0,0,0,0.12);`);
    lines.push("");
    lines.push("/* React inline style */");
    lines.push(`style={{ boxShadow: "${shadowValue}" }}`);
    lines.push("");
    lines.push("/* Tailwind arbitrary value */");
    lines.push(`className="[box-shadow:${shadowValue.replace(/\s/g, "_")}]"`);
    lines.push("");
    lines.push("=== Parameters ===");
    lines.push(`  Offset X:  ${x}px`);
    lines.push(`  Offset Y:  ${y}px`);
    lines.push(`  Blur:      ${blur}px`);
    lines.push(`  Spread:    ${spread}px`);
    lines.push(`  Color:     ${color}`);
    lines.push(`  Inset:     ${isInset ? "yes" : "no"}`);

    const result = lines.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "box-shadow.css",
      mimeType: "text/plain",
    };
  },
};

export default cssBoxShadowGenerator;
