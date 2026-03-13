import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const jpgToPng: ToolPlugin = {
  id: "jpg-to-png",
  category: "image",
  name: "JPG to PNG",
  description: "Convert JPG images to PNG format with transparency support.",
  keywords: ["jpg to png", "jpeg to png", "convert jpg", "image converter"],
  icon: "\u{1F5BC}\uFE0F",

  acceptedTypes: ["image/jpeg"],
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
      canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Failed to convert image")), "image/png")
    );
    canvas.width = 0;
    canvas.height = 0;

    const baseName = file.name.replace(/\.jpe?g$/i, "");
    return {
      blob,
      filename: `${baseName}.png`,
      mimeType: "image/png",
    };
  },
};

export default jpgToPng;
