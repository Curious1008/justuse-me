import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

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

function sRGBToLinear(val: number): number {
  const c = val / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * sRGBToLinear(r) + 0.7152 * sRGBToLinear(g) + 0.0722 * sRGBToLinear(b);
}

function contrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

const colorContrastChecker: ToolPlugin = {
  id: "color-contrast-checker",
  category: "developer",
  name: "Color Contrast Checker",
  description: "Check WCAG AA/AAA contrast ratio between foreground and background colors.",
  keywords: ["color contrast", "wcag", "accessibility", "contrast ratio", "a11y", "color checker", "contrast checker"],
  icon: "♿",

  inputMode: "text",
  textPlaceholder: "Enter: foreground background\nExample: #333333 #ffffff\nExample: #fff #1a1a2e",
  textButtonLabel: "Check Contrast",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim();
    if (!raw) throw new Error("Please enter foreground and background colors.");

    const parts = raw.split(/\s+/);
    if (parts.length < 2) {
      throw new Error("Please provide two hex colors.\nExample: #333333 #ffffff");
    }

    const [fgHex, bgHex] = parts;

    const fg = hexToRgb(fgHex);
    if (!fg) throw new Error(`"${fgHex}" is not a valid hex color (use #rgb or #rrggbb).`);
    const bg = hexToRgb(bgHex);
    if (!bg) throw new Error(`"${bgHex}" is not a valid hex color (use #rgb or #rrggbb).`);

    const fgLum = relativeLuminance(fg.r, fg.g, fg.b);
    const bgLum = relativeLuminance(bg.r, bg.g, bg.b);
    const ratio = contrastRatio(fgLum, bgLum);
    const ratioStr = ratio.toFixed(2);

    const pass = (threshold: number) => ratio >= threshold ? "PASS" : "FAIL";

    // WCAG thresholds:
    // AA normal text: 4.5:1, large text: 3:1
    // AAA normal text: 7:1, large text: 4.5:1
    const aaNormal = pass(4.5);
    const aaLarge = pass(3);
    const aaaNormal = pass(7);
    const aaaLarge = pass(4.5);

    const lines: string[] = [];
    lines.push("=== Color Contrast Check ===");
    lines.push("");
    lines.push(`Foreground: ${fgHex.toUpperCase()}  (rgb(${fg.r}, ${fg.g}, ${fg.b}))`);
    lines.push(`Background: ${bgHex.toUpperCase()}  (rgb(${bg.r}, ${bg.g}, ${bg.b}))`);
    lines.push("");
    lines.push(`Contrast Ratio: ${ratioStr}:1`);
    lines.push("");
    lines.push("=== WCAG 2.1 Results ===");
    lines.push("");
    lines.push(`  Level AA`);
    lines.push(`    Normal text (≥4.5:1):  ${aaNormal}`);
    lines.push(`    Large text  (≥3:1):    ${aaLarge}`);
    lines.push("");
    lines.push(`  Level AAA`);
    lines.push(`    Normal text (≥7:1):    ${aaaNormal}`);
    lines.push(`    Large text  (≥4.5:1):  ${aaaLarge}`);
    lines.push("");
    lines.push("=== Notes ===");
    lines.push("  Large text = 18pt+ normal or 14pt+ bold (~24px / 18.67px)");
    lines.push("  AA is the minimum legal/accessibility standard");
    lines.push("  AAA is recommended for maximum readability");
    lines.push("");
    lines.push("=== Luminance ===");
    lines.push(`  Foreground: ${fgLum.toFixed(4)}`);
    lines.push(`  Background: ${bgLum.toFixed(4)}`);

    const result = lines.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "contrast-check.txt",
      mimeType: "text/plain",
    };
  },
};

export default colorContrastChecker;
