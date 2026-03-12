import type { ToolPlugin, ToolResult, ToolOptions } from "../types";

const resizeImage: ToolPlugin = {
  id: "resize-image",
  category: "image",
  name: "Resize Image",
  description: "Resize images to any dimension.",
  keywords: [
    "resize image",
    "image resizer",
    "change image size",
    "resize photo online",
  ],
  icon: "\u2194\uFE0F",

  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
  maxFiles: 1,
  maxFileSize: 50 * 1024 * 1024,

  runtime: "browser",

  async process(files, options?: ToolOptions): Promise<ToolResult> {
    const file = files[0];
    const width = Number(options?.width) || 800;
    const height = Number(options?.height) || 600;

    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, width, height);

    const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b!), mimeType, 0.92)
    );

    const ext = mimeType === "image/png" ? "png" : "jpg";
    return {
      blob,
      filename: `resized-${width}x${height}.${ext}`,
      mimeType,
    };
  },
};

export default resizeImage;
