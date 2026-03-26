import type { ToolPlugin, ToolResult, ToolOptions } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";
import FlipRotateOptions from "@/components/tool/options/FlipRotateOptions";

type Operation = "flip-h" | "flip-v" | "rotate-90" | "rotate-180" | "rotate-270";

const imageFlipRotate: ToolPlugin = {
  id: "image-flip-rotate",
  category: "image",
  name: "Image Flip & Rotate",
  description: "Flip or rotate an image horizontally, vertically, or by 90/180/270 degrees.",
  keywords: ["flip image", "rotate image", "mirror image", "flip horizontal", "flip vertical", "rotate 90"],
  icon: "🔄",

  acceptedTypes: ["image/*"],
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024,

  runtime: "browser",
  previewUI: ImagePreview,
  optionsUI: FlipRotateOptions,
  optionsBefore: true,

  async process(files, options?: ToolOptions): Promise<ToolResult> {
    const file = files[0];
    const operation = ((options?.operation as Operation) || "rotate-90") as Operation;

    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;

    const isRotate90or270 = operation === "rotate-90" || operation === "rotate-270";
    const canvas = document.createElement("canvas");
    canvas.width = isRotate90or270 ? height : width;
    canvas.height = isRotate90or270 ? width : height;

    const ctx = canvas.getContext("2d")!;

    ctx.save();
    switch (operation) {
      case "flip-h":
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(bitmap, 0, 0);
        break;
      case "flip-v":
        ctx.translate(0, height);
        ctx.scale(1, -1);
        ctx.drawImage(bitmap, 0, 0);
        break;
      case "rotate-90":
        ctx.translate(height, 0);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(bitmap, 0, 0);
        break;
      case "rotate-180":
        ctx.translate(width, height);
        ctx.rotate(Math.PI);
        ctx.drawImage(bitmap, 0, 0);
        break;
      case "rotate-270":
        ctx.translate(0, width);
        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(bitmap, 0, 0);
        break;
    }
    ctx.restore();
    bitmap.close();

    const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
    const quality = mimeType === "image/jpeg" ? 0.92 : undefined;

    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Failed to process image"))),
        mimeType,
        quality
      )
    );
    canvas.width = 0;
    canvas.height = 0;

    const ext = mimeType === "image/png" ? "png" : "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const suffix = operation.replace("-", "_");
    return {
      blob,
      filename: `${baseName}-${suffix}.${ext}`,
      mimeType,
    };
  },
};

export default imageFlipRotate;
