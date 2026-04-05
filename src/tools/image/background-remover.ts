import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const backgroundRemover: ToolPlugin = {
  id: "background-remover",
  category: "image",
  name: "Background Remover",
  description: "Remove image backgrounds to get a transparent PNG.",
  keywords: ["background remover", "remove background", "transparent background", "bg remover", "cutout", "background eraser"],
  icon: "✂️",

  acceptedTypes: ["image/png", "image/jpeg", "image/webp"],
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024,

  runtime: "browser",
  previewUI: ImagePreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const w = canvas.width;
    const h = canvas.height;

    // Sample corner pixels to determine background color
    const corners = [
      0, // top-left
      (w - 1) * 4, // top-right
      (h - 1) * w * 4, // bottom-left
      ((h - 1) * w + (w - 1)) * 4, // bottom-right
    ];

    let bgR = 0, bgG = 0, bgB = 0;
    for (const idx of corners) {
      bgR += data[idx];
      bgG += data[idx + 1];
      bgB += data[idx + 2];
    }
    bgR = Math.round(bgR / 4);
    bgG = Math.round(bgG / 4);
    bgB = Math.round(bgB / 4);

    // Flood-fill from edges: mark pixels similar to background as transparent
    const tolerance = 30;
    const visited = new Uint8Array(w * h);
    const queue: number[] = [];

    // Seed from all edge pixels
    for (let x = 0; x < w; x++) {
      queue.push(x); // top row
      queue.push((h - 1) * w + x); // bottom row
    }
    for (let y = 1; y < h - 1; y++) {
      queue.push(y * w); // left col
      queue.push(y * w + (w - 1)); // right col
    }

    while (queue.length > 0) {
      const pos = queue.pop()!;
      if (visited[pos]) continue;
      visited[pos] = 1;

      const idx = pos * 4;
      const dr = Math.abs(data[idx] - bgR);
      const dg = Math.abs(data[idx + 1] - bgG);
      const db = Math.abs(data[idx + 2] - bgB);

      if (dr <= tolerance && dg <= tolerance && db <= tolerance) {
        data[idx + 3] = 0; // Make transparent

        const x = pos % w;
        const y = Math.floor(pos / w);

        if (x > 0 && !visited[pos - 1]) queue.push(pos - 1);
        if (x < w - 1 && !visited[pos + 1]) queue.push(pos + 1);
        if (y > 0 && !visited[pos - w]) queue.push(pos - w);
        if (y < h - 1 && !visited[pos + w]) queue.push(pos + w);
      }
    }

    ctx.putImageData(imageData, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed"))), "image/png")
    );
    canvas.width = 0;
    canvas.height = 0;

    const baseName = file.name.replace(/\.[^.]+$/, "");
    return { blob, filename: `${baseName}-nobg.png`, mimeType: "image/png" };
  },
};

export default backgroundRemover;
