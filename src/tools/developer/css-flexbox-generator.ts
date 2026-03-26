import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const cssFlexboxGenerator: ToolPlugin = {
  id: "css-flexbox-generator",
  category: "developer",
  name: "CSS Flexbox Generator",
  description: "Generate complete CSS flexbox code from direction, justify, align, wrap, and gap parameters.",
  keywords: ["flexbox", "css flex", "flex container", "justify-content", "align-items", "flex generator"],
  icon: "📐",

  inputMode: "text",
  textPlaceholder: "Enter: direction justify align [wrap] [gap]\nExample: row center center wrap 16px\nExample: column flex-start stretch nowrap 8px",
  textButtonLabel: "Generate Flexbox",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim();
    if (!raw) throw new Error("Please enter flexbox parameters.");

    const parts = raw.split(/\s+/);
    if (parts.length < 3) {
      throw new Error("Please provide at least 3 values: direction justify align\nExample: row center center");
    }

    const [direction, justify, align, wrap = "nowrap", gap = "0"] = parts;

    const validDirections = ["row", "row-reverse", "column", "column-reverse"];
    const validJustify = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "start", "end"];
    const validAlign = ["flex-start", "flex-end", "center", "baseline", "stretch", "start", "end"];
    const validWrap = ["nowrap", "wrap", "wrap-reverse"];

    if (!validDirections.includes(direction)) {
      throw new Error(`Invalid direction "${direction}". Use: ${validDirections.join(", ")}`);
    }
    if (!validJustify.includes(justify)) {
      throw new Error(`Invalid justify "${justify}". Use: ${validJustify.join(", ")}`);
    }
    if (!validAlign.includes(align)) {
      throw new Error(`Invalid align "${align}". Use: ${validAlign.join(", ")}`);
    }
    if (!validWrap.includes(wrap)) {
      throw new Error(`Invalid wrap "${wrap}". Use: ${validWrap.join(", ")}`);
    }

    const lines: string[] = [];
    lines.push("=== CSS Flexbox ===");
    lines.push("");
    lines.push(".container {");
    lines.push("  display: flex;");
    lines.push(`  flex-direction: ${direction};`);
    lines.push(`  justify-content: ${justify};`);
    lines.push(`  align-items: ${align};`);
    lines.push(`  flex-wrap: ${wrap};`);
    if (gap !== "0") lines.push(`  gap: ${gap};`);
    lines.push("}");
    lines.push("");
    lines.push("/* React inline style */");
    lines.push("style={{");
    lines.push("  display: 'flex',");
    lines.push(`  flexDirection: '${direction}',`);
    lines.push(`  justifyContent: '${justify}',`);
    lines.push(`  alignItems: '${align}',`);
    lines.push(`  flexWrap: '${wrap}',`);
    if (gap !== "0") lines.push(`  gap: '${gap}',`);
    lines.push("}}");
    lines.push("");
    lines.push("/* Tailwind classes */");
    const tailwindDir: Record<string, string> = {
      row: "flex-row", "row-reverse": "flex-row-reverse",
      column: "flex-col", "column-reverse": "flex-col-reverse",
    };
    const tailwindJustify: Record<string, string> = {
      "flex-start": "justify-start", "flex-end": "justify-end", center: "justify-center",
      "space-between": "justify-between", "space-around": "justify-around", "space-evenly": "justify-evenly",
      start: "justify-start", end: "justify-end",
    };
    const tailwindAlign: Record<string, string> = {
      "flex-start": "items-start", "flex-end": "items-end", center: "items-center",
      baseline: "items-baseline", stretch: "items-stretch", start: "items-start", end: "items-end",
    };
    const tailwindWrap: Record<string, string> = {
      nowrap: "flex-nowrap", wrap: "flex-wrap", "wrap-reverse": "flex-wrap-reverse",
    };
    const classes = [
      "flex",
      tailwindDir[direction] || direction,
      tailwindJustify[justify] || justify,
      tailwindAlign[align] || align,
      tailwindWrap[wrap] || wrap,
    ].filter(Boolean);
    lines.push(`className="${classes.join(" ")}"`);
    lines.push("");
    lines.push("=== Parameters ===");
    lines.push(`  flex-direction:  ${direction}`);
    lines.push(`  justify-content: ${justify}`);
    lines.push(`  align-items:     ${align}`);
    lines.push(`  flex-wrap:       ${wrap}`);
    lines.push(`  gap:             ${gap}`);

    const result = lines.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "flexbox.css",
      mimeType: "text/plain",
    };
  },
};

export default cssFlexboxGenerator;
