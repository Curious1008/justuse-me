import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const BASE_PX = 16; // 1rem = 16px
const VIEWPORT_W = 1920; // for vw calculation
const PT_RATIO = 0.75; // 1px = 0.75pt

const cssUnitConverter: ToolPlugin = {
  id: "css-unit-converter",
  category: "developer",
  name: "CSS Unit Converter",
  description: "Convert CSS values between px, rem, em, pt, and vw units.",
  keywords: ["css units", "px to rem", "rem to px", "em to px", "css converter", "unit converter", "pt to px"],
  icon: "📏",

  inputMode: "text",
  textPlaceholder: "Enter CSS value:\nExample: 16px\nExample: 1rem\nExample: 1.5em\nExample: 12pt",
  textButtonLabel: "Convert Units",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim().toLowerCase();
    if (!raw) throw new Error("Please enter a CSS value like 16px, 1rem, or 12pt.");

    const match = raw.match(/^([\d.]+)\s*(px|rem|em|pt|vw)$/);
    if (!match) {
      throw new Error(`Could not parse "${raw}". Use format like: 16px, 1rem, 1.5em, 12pt, 100vw`);
    }

    const value = parseFloat(match[1]);
    const unit = match[2];

    let px: number;
    switch (unit) {
      case "px":  px = value; break;
      case "rem": px = value * BASE_PX; break;
      case "em":  px = value * BASE_PX; break;
      case "pt":  px = value / PT_RATIO; break;
      case "vw":  px = (value / 100) * VIEWPORT_W; break;
      default:    throw new Error(`Unknown unit: ${unit}`);
    }

    const rem = px / BASE_PX;
    const em = px / BASE_PX;
    const pt = px * PT_RATIO;
    const vw = (px / VIEWPORT_W) * 100;

    const fmt = (n: number) => parseFloat(n.toFixed(4)).toString();

    const lines: string[] = [];
    lines.push("=== CSS Unit Conversion ===");
    lines.push("");
    lines.push(`Input: ${value}${unit}`);
    lines.push("");
    lines.push("=== Converted Values ===");
    lines.push("");
    lines.push(`px:  ${fmt(px)}px`);
    lines.push(`rem: ${fmt(rem)}rem`);
    lines.push(`em:  ${fmt(em)}em`);
    lines.push(`pt:  ${fmt(pt)}pt`);
    lines.push(`vw:  ${fmt(vw)}vw`);
    lines.push("");
    lines.push("=== Assumptions ===");
    lines.push(`  Base font size: ${BASE_PX}px (1rem = ${BASE_PX}px)`);
    lines.push(`  em = same as rem (relative to root font size)`);
    lines.push(`  Viewport width: ${VIEWPORT_W}px (for vw)`);
    lines.push(`  1pt = ${fmt(1 / PT_RATIO)}px`);

    const result = lines.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "css-units.txt",
      mimeType: "text/plain",
    };
  },
};

export default cssUnitConverter;
