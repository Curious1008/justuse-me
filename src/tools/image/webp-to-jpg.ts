import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const webpToJpg: ToolPlugin = {
  id: "webp-to-jpg",
  category: "image",
  name: "WebP to JPG",
  description: "Convert WebP images to JPG format.",
  keywords: ["webp to jpg", "webp to jpeg", "convert webp", "webp converter", "image converter"],
  icon: "🔄",

  acceptedTypes: ["image/webp"],
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
    // Fill white background before JPEG export (no transparency support)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Failed to convert image"))),
        "image/jpeg",
        0.92
      )
    );
    canvas.width = 0;
    canvas.height = 0;

    const baseName = file.name.replace(/\.webp$/i, "");
    return {
      blob,
      filename: `${baseName}.jpg`,
      mimeType: "image/jpeg",
    };
  },
};

export default webpToJpg;
