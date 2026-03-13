import type { ToolPlugin, ToolResult } from "../types";

const svgToPng: ToolPlugin = {
  id: "svg-to-png",
  category: "image",
  name: "SVG to PNG",
  description: "Convert SVG vector graphics to PNG images.",
  keywords: ["svg to png", "convert svg", "vector to raster", "svg converter"],
  icon: "\u270F\uFE0F",

  acceptedTypes: ["image/svg+xml", ".svg"],
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const svgText = await file.text();
    const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    const loaded = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load SVG image"));
    });
    img.src = url;
    await loaded;

    const maxDim = 4096;
    const scale = 2;
    let w = img.naturalWidth * scale;
    let h = img.naturalHeight * scale;
    if (w > maxDim || h > maxDim) {
      const ratio = Math.min(maxDim / w, maxDim / h);
      w = Math.round(w * ratio);
      h = Math.round(h * ratio);
    }
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(url);

    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b!), "image/png")
    );

    const baseName = file.name.replace(/\.svg$/i, "");
    return {
      blob,
      filename: `${baseName}.png`,
      mimeType: "image/png",
    };
  },
};

export default svgToPng;
