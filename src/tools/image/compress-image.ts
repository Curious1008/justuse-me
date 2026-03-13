import type { ToolPlugin, ToolResult, ToolOptions } from "../types";
import CompressOptions from "@/components/tool/options/CompressOptions";
import ImagePreview from "@/components/tool/previews/ImagePreview";

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
  maxFileSize: 20 * 1024 * 1024,

  runtime: "browser",
  processButtonLabel: "Compress",
  optionsUI: CompressOptions,
  previewUI: ImagePreview,

  async process(files, options?: ToolOptions): Promise<ToolResult> {
    const file = files[0];
    const quality = ((options?.quality as number) ?? 80) / 100;

    const { default: imageCompression } = await import("browser-image-compression");
    const compressed = await imageCompression(file, {
      maxSizeMB: quality >= 0.95 ? 50 : Math.max(0.05, quality * 2),
      initialQuality: quality,
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
