import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const faviconGenerator: ToolPlugin = {
  id: "favicon-generator",
  category: "developer",
  name: "Favicon Generator",
  description: "Resize any image to a 32×32 PNG favicon ready for web use.",
  keywords: ["favicon", "favicon generator", "icon generator", "website icon", "32x32 icon", "ico"],
  icon: "🌐",

  acceptedTypes: ["image/*"],
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",
  previewUI: ImagePreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const bitmap = await createImageBitmap(file);

    // Generate 32x32 favicon (most universal size)
    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Use high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, size, size);
    bitmap.close();

    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Failed to generate favicon"))),
        "image/png"
      )
    );
    canvas.width = 0;
    canvas.height = 0;

    return {
      blob,
      filename: "favicon.png",
      mimeType: "image/png",
    };
  },
};

export default faviconGenerator;
