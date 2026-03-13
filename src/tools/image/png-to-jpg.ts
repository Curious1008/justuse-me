import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const pngToJpg: ToolPlugin = {
  id: "png-to-jpg",
  category: "image",
  name: "PNG to JPG",
  description: "Convert PNG images to JPG format.",
  keywords: ["png to jpg", "png to jpeg", "convert png", "image converter"],
  icon: "\u{1F5BC}\uFE0F",

  acceptedTypes: ["image/png"],
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
      canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Failed to convert image")), "image/jpeg", 0.92)
    );
    canvas.width = 0;
    canvas.height = 0;

    const baseName = file.name.replace(/\.png$/i, "");
    return {
      blob,
      filename: `${baseName}.jpg`,
      mimeType: "image/jpeg",
    };
  },
};

export default pngToJpg;
