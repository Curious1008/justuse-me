import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const gifToPng: ToolPlugin = {
  id: "gif-to-png",
  category: "image",
  name: "GIF to PNG",
  description: "Extract the first frame of a GIF animation and save it as a PNG image.",
  keywords: ["gif to png", "gif frame", "extract gif frame", "convert gif", "gif converter"],
  icon: "🖼️",

  acceptedTypes: ["image/gif"],
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
        (b) => (b ? resolve(b) : reject(new Error("Failed to extract GIF frame"))),
        "image/png"
      )
    );
    canvas.width = 0;
    canvas.height = 0;

    const baseName = file.name.replace(/\.gif$/i, "");
    return {
      blob,
      filename: `${baseName}-frame1.png`,
      mimeType: "image/png",
    };
  },
};

export default gifToPng;
