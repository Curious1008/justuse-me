import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const imageMetadataRemover: ToolPlugin = {
  id: "image-metadata-remover",
  category: "image",
  name: "Image Metadata Remover",
  description: "Strip EXIF and metadata from images by redrawing to a clean canvas.",
  keywords: ["exif remover", "metadata remover", "strip exif", "remove metadata", "privacy image", "clean image"],
  icon: "🧹",

  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
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

    const mimeType = file.type === "image/png" ? "image/png" : file.type === "image/webp" ? "image/webp" : "image/jpeg";
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

    const ext = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    return {
      blob,
      filename: `${baseName}-clean.${ext}`,
      mimeType,
    };
  },
};

export default imageMetadataRemover;
