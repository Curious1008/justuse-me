import { PDFDocument } from "pdf-lib";
import type { ToolPlugin, ToolResult } from "../types";

const mergePdf: ToolPlugin = {
  id: "merge-pdf",
  category: "pdf",
  name: "Merge PDF",
  description: "Combine multiple PDF files into one document.",
  keywords: ["merge pdf", "combine pdf", "join pdf", "merge pdf online free"],
  icon: "\u{1F4D1}",

  acceptedTypes: ["application/pdf"],
  maxFiles: 20,
  maxFileSize: 50 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    if (files.length < 2) {
      throw new Error("Please select at least 2 PDF files to merge.");
    }

    const merged = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = await merged.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => merged.addPage(page));
    }

    const pdfBytes = await merged.save();
    return {
      blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
      filename: "merged.pdf",
      mimeType: "application/pdf",
    };
  },
};

export default mergePdf;
