import type { ToolPlugin, ToolResult } from "../types";
import RotateOptions from "@/components/tool/options/RotateOptions";

const rotatePdf: ToolPlugin = {
  id: "rotate-pdf",
  category: "pdf",
  name: "Rotate PDF",
  description: "Rotate PDF pages by 90, 180, or 270 degrees.",
  keywords: ["rotate pdf", "turn pdf", "pdf rotation", "flip pdf pages"],
  icon: "\u{1F504}",

  acceptedTypes: ["application/pdf"],
  maxFiles: 1,
  maxFileSize: 30 * 1024 * 1024,

  runtime: "browser",
  processButtonLabel: "Rotate",
  optionsUI: RotateOptions,

  async process(files, options): Promise<ToolResult> {
    const angle = (options?.degrees as number) || 90;

    if (![90, 180, 270].includes(angle)) {
      throw new Error("Rotation must be 90, 180, or 270 degrees.");
    }

    const { PDFDocument, degrees } = await import("pdf-lib");
    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pages = pdf.getPages();

    if (pages.length > 500) {
      throw new Error("PDF has too many pages (max 500).");
    }

    for (const page of pages) {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees(currentRotation + angle));
    }

    const pdfBytes = await pdf.save();
    return {
      blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
      filename: "rotated.pdf",
      mimeType: "application/pdf",
    };
  },
};

export default rotatePdf;
