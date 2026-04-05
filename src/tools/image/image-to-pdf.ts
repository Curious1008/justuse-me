import type { ToolPlugin, ToolResult } from "../types";

const imageToPdf: ToolPlugin = {
  id: "image-to-pdf",
  category: "image",
  name: "Image to PDF",
  description: "Convert images to a PDF document.",
  keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photo to pdf", "picture to pdf", "images to pdf"],
  icon: "\u{1F4C4}",

  acceptedTypes: ["image/jpeg", "image/png"],
  maxFiles: 20,
  maxFileSize: 20 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const { PDFDocument } = await import("pdf-lib");
    const pdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = new Uint8Array(await file.arrayBuffer());
      let img;
      if (file.type === "image/png") {
        img = await pdf.embedPng(bytes);
      } else {
        img = await pdf.embedJpg(bytes);
      }

      const page = pdf.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    const pdfBytes = await pdf.save();
    return {
      blob: new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" }),
      filename: "images.pdf",
      mimeType: "application/pdf",
    };
  },
};

export default imageToPdf;
