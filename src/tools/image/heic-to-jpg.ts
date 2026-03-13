import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const heicToJpg: ToolPlugin = {
  id: "heic-to-jpg",
  category: "image",
  name: "HEIC to JPG",
  description: "Convert iPhone HEIC photos to JPG format.",
  keywords: [
    "heic to jpg",
    "heic converter",
    "iphone photo convert",
    "heif to jpeg",
  ],
  icon: "\u{1F4F1}",

  acceptedTypes: ["image/heic", "image/heif", ".heic", ".heif"],
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024,

  runtime: "browser",
  previewUI: ImagePreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const { default: heic2any } = await import("heic2any");
    const result = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.92,
    });

    const blob = Array.isArray(result) ? result[0] : result;

    const baseName = file.name.replace(/\.hei[cf]$/i, "");
    return {
      blob,
      filename: `${baseName}.jpg`,
      mimeType: "image/jpeg",
    };
  },
};

export default heicToJpg;
