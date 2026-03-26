import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const webpToPng: ToolPlugin = {
  id: "webp-to-png",
  category: "image",
  name: "WebP to PNG",
  description: "Convert WebP images to PNG format.",
  keywords: ["webp to png", "convert webp", "webp converter", "image converter"],
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
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Failed to convert image"))),
        "image/png"
      )
    );
    canvas.width = 0;
    canvas.height = 0;

    const baseName = file.name.replace(/\.webp$/i, "");
    return {
      blob,
      filename: `${baseName}.png`,
      mimeType: "image/png",
    };
  },
};

export default webpToPng;
