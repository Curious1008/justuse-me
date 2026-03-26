import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

const imageColorPicker: ToolPlugin = {
  id: "image-color-picker",
  category: "image",
  name: "Image Color Picker",
  description: "Sample and extract the top 8 most common colors from an image as hex values.",
  keywords: ["color picker", "image colors", "extract colors", "color palette", "dominant colors", "hex colors"],
  icon: "🎨",

  acceptedTypes: ["image/*"],
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");

    // Scale down for performance
    const maxDim = 200;
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = 0;
    canvas.height = 0;

    // Quantize colors by bucketing into 32-step increments
    const colorMap = new Map<string, number>();
    const data = imageData.data;
    const step = 32;

    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      if (a < 128) continue; // skip transparent pixels
      const r = Math.round(data[i] / step) * step;
      const g = Math.round(data[i + 1] / step) * step;
      const b = Math.round(data[i + 2] / step) * step;
      const key = `${r},${g},${b}`;
      colorMap.set(key, (colorMap.get(key) ?? 0) + 1);
    }

    const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

    const lines: string[] = [];
    lines.push("=== Top 8 Colors ===");
    lines.push("");
    sorted.forEach(([key, count], i) => {
      const [r, g, b] = key.split(",").map(Number);
      const hex = rgbToHex(Math.min(255, r), Math.min(255, g), Math.min(255, b));
      lines.push(`${i + 1}. ${hex}  (rgb(${r}, ${g}, ${b}))  — ${count} pixels`);
    });
    lines.push("");
    lines.push("=== Hex Values Only ===");
    lines.push(sorted.map(([key]) => {
      const [r, g, b] = key.split(",").map(Number);
      return rgbToHex(Math.min(255, r), Math.min(255, g), Math.min(255, b));
    }).join(", "));

    const result = lines.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: `${file.name.replace(/\.[^.]+$/, "")}-colors.txt`,
      mimeType: "text/plain",
    };
  },
};

export default imageColorPicker;
