import type { ToolPlugin, ToolResult, ToolOptions } from "../types";
import CropOptions from "@/components/tool/options/CropOptions";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const cropImage: ToolPlugin = {
  id: "crop-image",
  category: "image",
  name: "Crop Image",
  description: "Crop images to a specific region or aspect ratio.",
  keywords: ["crop image", "image cropper", "trim image", "cut image", "crop photo"],
  icon: "\u2702\uFE0F",

  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024,

  runtime: "browser",
  processButtonLabel: "Crop",
  optionsUI: CropOptions,
  previewUI: ImagePreview,

  async process(files, options?: ToolOptions): Promise<ToolResult> {
    const file = files[0];
    const bitmap = await createImageBitmap(file);

    const x = Math.max(0, Math.min(Number(options?.cropX) || 0, bitmap.width - 1));
    const y = Math.max(0, Math.min(Number(options?.cropY) || 0, bitmap.height - 1));
    const w = Math.max(1, Math.min(Number(options?.cropW) || bitmap.width, bitmap.width - x));
    const h = Math.max(1, Math.min(Number(options?.cropH) || bitmap.height, bitmap.height - y));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, x, y, w, h, 0, 0, w, h);

    const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b!), mimeType, 0.92)
    );

    const ext = mimeType === "image/png" ? "png" : "jpg";
    return {
      blob,
      filename: `cropped-${w}x${h}.${ext}`,
      mimeType,
    };
  },
};

export default cropImage;
