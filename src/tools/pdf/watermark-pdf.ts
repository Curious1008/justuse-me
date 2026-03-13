import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import type { ToolPlugin, ToolResult } from "../types";

const watermarkPdf: ToolPlugin = {
  id: "watermark-pdf",
  category: "pdf",
  name: "Watermark PDF",
  description: "Add a text watermark to every page of a PDF.",
  keywords: ["watermark pdf", "stamp pdf", "pdf watermark", "add text to pdf"],
  icon: "\u{1F4A7}",

  acceptedTypes: ["application/pdf"],
  maxFiles: 1,
  maxFileSize: 50 * 1024 * 1024,

  runtime: "browser",

  async process(files, options): Promise<ToolResult> {
    const text = (options?.text as string) || "CONFIDENTIAL";

    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const pages = pdf.getPages();

    for (const page of pages) {
      const { width, height } = page.getSize();
      const fontSize = Math.min(width, height) * 0.1;
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const textHeight = font.heightAtSize(fontSize);

      page.drawText(text, {
        x: (width - textWidth) / 2,
        y: (height - textHeight) / 2,
        size: fontSize,
        font,
        color: rgb(0.5, 0.5, 0.5),
        opacity: 0.3,
        rotate: degrees(45),
      });
    }

    const pdfBytes = await pdf.save();
    return {
      blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
      filename: "watermarked.pdf",
      mimeType: "application/pdf",
    };
  },
};

export default watermarkPdf;
