import type { ToolPlugin, ToolResult, ToolOptions } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const ocrImage: ToolPlugin = {
  id: "ocr-image",
  category: "image",
  name: "Image to Text (OCR)",
  description: "Extract text from images using optical character recognition.",
  keywords: ["ocr", "image to text", "extract text", "text recognition", "scan text", "read image"],
  icon: "\uD83D\uDD0D",

  inputMode: "file",
  acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/bmp", "image/tiff"],
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];

    const Tesseract = await import("tesseract.js");
    const { data } = await Tesseract.recognize(file, "eng+chi_sim+chi_tra", {
      logger: () => {},
    });

    const text = data.text.trim();

    if (!text) {
      throw new Error("No text found in the image. Try a clearer image.");
    }

    return {
      blob: new Blob([text], { type: "text/plain" }),
      filename: `ocr-${file.name.replace(/\.[^.]+$/, "")}.txt`,
      mimeType: "text/plain",
    };
  },
};

export default ocrImage;
