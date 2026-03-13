import type { ToolPlugin, ToolResult } from "../types";

const jpgToPdf: ToolPlugin = {
  id: "jpg-to-pdf",
  category: "pdf",
  name: "JPG to PDF",
  description: "Convert JPG/PNG images into a PDF document.",
  keywords: [
    "jpg to pdf",
    "image to pdf",
    "png to pdf",
    "convert image to pdf",
  ],
  icon: "\u{1F4C4}",

  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
  maxFiles: 20,
  maxFileSize: 20 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const { PDFDocument } = await import("pdf-lib");
    const pdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      let image;

      if (file.type === "image/png") {
        image = await pdf.embedPng(bytes);
      } else if (file.type === "image/webp") {
        const bitmap = await createImageBitmap(new Blob([bytes]));
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(bitmap, 0, 0);
        bitmap.close();
        const jpegBlob = await new Promise<Blob>((resolve, reject) =>
          canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Failed to convert image")), "image/jpeg", 0.92)
        );
        canvas.width = 0;
        canvas.height = 0;
        const jpegBytes = await jpegBlob.arrayBuffer();
        image = await pdf.embedJpg(jpegBytes);
      } else {
        image = await pdf.embedJpg(bytes);
      }

      const page = pdf.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdf.save();
    return {
      blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
      filename: "images.pdf",
      mimeType: "application/pdf",
    };
  },
};

export default jpgToPdf;
