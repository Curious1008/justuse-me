import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const placeholderImageGenerator: ToolPlugin = {
  id: "placeholder-image-generator",
  category: "generator",
  name: "Placeholder Image Generator",
  description: "Generate placeholder images with custom size, background color, and text using Canvas.",
  keywords: [
    "placeholder image",
    "dummy image",
    "placeholder generator",
    "image placeholder",
    "test image",
    "mock image",
  ],
  icon: "\u{1F5BC}",

  inputMode: "text",
  textPlaceholder: "Enter: width x height [bg-color] [text]\nExample: 800x600 #eee Placeholder",
  textButtonLabel: "Generate",

  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: ImagePreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim();

    if (typeof document === "undefined") {
      throw new Error("Placeholder image generation requires a browser environment.");
    }

    // Parse: WIDTHxHEIGHT [#color] [text...]
    // e.g. "800x600 #cccccc Hello World" or "400x300" or "800x600 Hello"
    const parts = raw.split(/\s+/);
    if (!parts[0]) throw new Error("Please enter dimensions, e.g. 800x600");

    const dimMatch = parts[0].match(/^(\d+)[xX](\d+)$/);
    if (!dimMatch) throw new Error("Invalid dimensions. Use format: WIDTHxHEIGHT (e.g. 800x600)");

    const width = Math.min(Math.max(parseInt(dimMatch[1], 10), 1), 4096);
    const height = Math.min(Math.max(parseInt(dimMatch[2], 10), 1), 4096);

    let bgColor = "#cccccc";
    let textColor = "#555555";
    let labelText = `${width} x ${height}`;

    let idx = 1;
    // Check if next token is a color
    if (parts[idx] && /^#[0-9a-fA-F]{3,6}$/.test(parts[idx])) {
      bgColor = parts[idx];
      idx++;
    }

    // Remaining tokens = custom text
    if (parts.slice(idx).join(" ").trim()) {
      labelText = parts.slice(idx).join(" ");
    }

    // Auto-pick text color for contrast
    const r = parseInt(bgColor.slice(1, 3).padEnd(2, bgColor[1]), 16);
    const g = parseInt(bgColor.slice(3, 5).padEnd(2, bgColor[3] ?? "0"), 16);
    const b = parseInt(bgColor.slice(5, 7).padEnd(2, bgColor[5] ?? "0"), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    textColor = luminance > 0.5 ? "#333333" : "#eeeeee";

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available.");

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Subtle grid lines
    ctx.strokeStyle = luminance > 0.5 ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    const gridStep = Math.max(20, Math.min(width, height) / 10);
    for (let x = 0; x <= width; x += gridStep) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y <= height; y += gridStep) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Diagonal lines
    ctx.strokeStyle = luminance > 0.5 ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(width, height); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(width, 0); ctx.lineTo(0, height); ctx.stroke();

    // Text
    const fontSize = Math.max(12, Math.min(width, height) / 8);
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(labelText, width / 2, height / 2, width * 0.9);

    // Size label below if custom text was given
    if (labelText !== `${width} x ${height}`) {
      const subSize = Math.max(10, fontSize * 0.5);
      ctx.font = `${subSize}px Arial, sans-serif`;
      ctx.fillStyle = textColor;
      ctx.globalAlpha = 0.6;
      ctx.fillText(`${width} x ${height}`, width / 2, height / 2 + fontSize * 0.8);
      ctx.globalAlpha = 1;
    }

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Failed to generate image."))),
        "image/png"
      );
    });

    return {
      blob,
      filename: `placeholder-${width}x${height}.png`,
      mimeType: "image/png",
    };
  },
};

export default placeholderImageGenerator;
