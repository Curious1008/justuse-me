import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));
  const sl = s / 100;
  const ll = l / 100;
  const a = sl * Math.min(ll, 1 - ll);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ll - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function randomHex(): string {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
}

const colorPaletteGenerator: ToolPlugin = {
  id: "color-palette-generator",
  category: "generator",
  name: "Color Palette Generator",
  description: "Generate harmonious color palettes based on color theory from any hex color.",
  keywords: [
    "color palette",
    "color generator",
    "complementary colors",
    "color scheme",
    "color harmony",
    "hex color",
  ],
  icon: "\u{1F3A8}",

  inputMode: "text",
  textPlaceholder: "Enter a hex color (e.g. #ff6b6b) or type 'random'",
  textButtonLabel: "Generate Palette",

  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim().toLowerCase();

    let hex: string;
    if (raw === "random" || raw === "") {
      hex = randomHex();
    } else {
      hex = raw.startsWith("#") ? raw : `#${raw}`;
      if (!/^#[0-9a-f]{6}$/i.test(hex)) {
        throw new Error("Invalid hex color. Use format #RRGGBB or type 'random'.");
      }
    }

    const [h, s, l] = hexToHsl(hex);

    const palettes: Array<{ name: string; colors: string[] }> = [
      {
        name: "Base",
        colors: [hex],
      },
      {
        name: "Complementary",
        colors: [hex, hslToHex(h + 180, s, l)],
      },
      {
        name: "Analogous",
        colors: [hslToHex(h - 30, s, l), hex, hslToHex(h + 30, s, l)],
      },
      {
        name: "Triadic",
        colors: [hex, hslToHex(h + 120, s, l), hslToHex(h + 240, s, l)],
      },
      {
        name: "Split-Complementary",
        colors: [hex, hslToHex(h + 150, s, l), hslToHex(h + 210, s, l)],
      },
      {
        name: "Tetradic (Square)",
        colors: [
          hex,
          hslToHex(h + 90, s, l),
          hslToHex(h + 180, s, l),
          hslToHex(h + 270, s, l),
        ],
      },
    ];

    const lines = [`Base Color: ${hex.toUpperCase()}  (H:${h} S:${s}% L:${l}%)`, ""];
    for (const p of palettes) {
      lines.push(`${p.name}:`);
      lines.push("  " + p.colors.map((c) => c.toUpperCase()).join("  "));
      lines.push("");
    }

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "color-palette.txt",
      mimeType: "text/plain",
    };
  },
};

export default colorPaletteGenerator;
