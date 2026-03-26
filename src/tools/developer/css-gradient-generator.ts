import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

function isValidColor(color: string): boolean {
  // Basic validation: hex, rgb, rgba, hsl, named colors
  return (
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(color) ||
    /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/.test(color) ||
    /^hsla?\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%/.test(color) ||
    /^[a-z]+$/.test(color) // named color
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }
  if (clean.length === 6) {
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16),
    };
  }
  return null;
}

function buildTextPreview(color1: string, color2: string, steps = 20): string {
  // Create a text-based gradient preview using block characters and color names
  const blocks = ["░", "▒", "▓", "█"];
  const line = Array.from({ length: steps }, (_, i) => {
    const t = i / (steps - 1);
    if (t < 0.25) return blocks[0];
    if (t < 0.5) return blocks[1];
    if (t < 0.75) return blocks[2];
    return blocks[3];
  }).join("");
  return `${color1}  ${line}  ${color2}`;
}

const cssGradientGenerator: ToolPlugin = {
  id: "css-gradient-generator",
  category: "developer",
  name: "CSS Gradient Generator",
  description: "Generate CSS linear-gradient code from two colors and an optional direction or angle.",
  keywords: [
    "css gradient",
    "linear gradient",
    "background gradient",
    "css background",
    "gradient generator",
    "color gradient",
  ],
  icon: "🎨",

  inputMode: "text",
  textPlaceholder: "Enter colors and direction, e.g.:\n#ff6b6b #4ecdc4 135deg",
  textButtonLabel: "Generate Gradient",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim();

    if (!raw) {
      throw new Error("Please enter two colors and an optional direction.");
    }

    const parts = raw.split(/\s+/);
    if (parts.length < 2) {
      throw new Error("Please provide at least two colors, e.g. #ff0000 #0000ff");
    }

    const color1 = parts[0];
    const color2 = parts[1];
    const direction = parts[2] || "to right";

    if (!isValidColor(color1)) {
      throw new Error(`"${color1}" does not look like a valid CSS color.`);
    }
    if (!isValidColor(color2)) {
      throw new Error(`"${color2}" does not look like a valid CSS color.`);
    }

    const gradientValue = `linear-gradient(${direction}, ${color1}, ${color2})`;

    const lines: string[] = [];
    lines.push("=== CSS Gradient ===");
    lines.push("");
    lines.push("/* Basic usage */");
    lines.push(`background: ${color1};`);
    lines.push(`background: ${gradientValue};`);
    lines.push("");
    lines.push("/* With vendor prefixes (legacy support) */");
    lines.push(`background: -webkit-linear-gradient(${direction}, ${color1}, ${color2});`);
    lines.push(`background: -moz-linear-gradient(${direction}, ${color1}, ${color2});`);
    lines.push(`background: -o-linear-gradient(${direction}, ${color1}, ${color2});`);
    lines.push(`background: ${gradientValue};`);
    lines.push("");
    lines.push("/* As background-image property */");
    lines.push(`background-image: ${gradientValue};`);
    lines.push("");
    lines.push("/* React inline style */");
    lines.push(`style={{ background: "${gradientValue}" }}`);
    lines.push("");
    lines.push("/* Tailwind arbitrary value */");
    lines.push(`className="[background:${gradientValue.replace(/\s/g, "_")}]"`);
    lines.push("");
    lines.push("=== Gradient Preview ===");
    lines.push("");
    lines.push(buildTextPreview(color1, color2));
    lines.push("");
    lines.push("=== Parameters ===");
    lines.push(`  Color 1:   ${color1}`);
    lines.push(`  Color 2:   ${color2}`);
    lines.push(`  Direction: ${direction}`);
    lines.push("");
    lines.push("=== Direction Reference ===");
    lines.push("  to right    = 90deg   (left → right)");
    lines.push("  to left     = 270deg  (right → left)");
    lines.push("  to bottom   = 180deg  (top → bottom, default)");
    lines.push("  to top      = 0deg    (bottom → top)");
    lines.push("  135deg              (diagonal top-left → bottom-right)");
    lines.push("  to bottom right     (diagonal)");

    // Add hex RGB info if hex colors provided
    const rgb1 = color1.startsWith("#") ? hexToRgb(color1) : null;
    const rgb2 = color2.startsWith("#") ? hexToRgb(color2) : null;
    if (rgb1 || rgb2) {
      lines.push("");
      lines.push("=== Color Details ===");
      if (rgb1) lines.push(`  ${color1} = rgb(${rgb1.r}, ${rgb1.g}, ${rgb1.b})`);
      if (rgb2) lines.push(`  ${color2} = rgb(${rgb2.r}, ${rgb2.g}, ${rgb2.b})`);
    }

    const result = lines.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "gradient.css",
      mimeType: "text/plain",
    };
  },
};

export default cssGradientGenerator;
