import type { ToolPlugin, ToolResult } from "../types";

const compressImage: ToolPlugin = {
  id: "compress-image",
  category: "image",
  name: "Compress Image",
  description: "Reduce image file size while maintaining quality.",
  keywords: [
    "compress image",
    "reduce image size",
    "image compressor",
    "compress jpg png",
  ],
  icon: "\u{1F4E6}",

  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
  maxFiles: 1,
  maxFileSize: 50 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const { default: imageCompression } = await import("browser-image-compression");
    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 4096,
      useWebWorker: true,
    });

    const ext = file.name.split(".").pop() || "jpg";
    return {
      blob: compressed,
      filename: `compressed.${ext}`,
      mimeType: compressed.type,
    };
  },
};

export default compressImage;
