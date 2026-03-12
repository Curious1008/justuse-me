import { PDFDocument } from "pdf-lib";
import type { ToolPlugin, ToolResult } from "../types";

const splitPdf: ToolPlugin = {
  id: "split-pdf",
  category: "pdf",
  name: "Split PDF",
  description: "Extract pages from a PDF into separate files.",
  keywords: [
    "split pdf",
    "extract pdf pages",
    "separate pdf",
    "split pdf online free",
  ],
  icon: "\u2702\uFE0F",

  acceptedTypes: ["application/pdf"],
  maxFiles: 1,
  maxFileSize: 50 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pageCount = pdf.getPageCount();

    if (pageCount < 2) {
      throw new Error("This PDF only has one page — nothing to split.");
    }

    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(page);
      const pageBytes = await newPdf.save();
      zip.file(`page-${i + 1}.pdf`, pageBytes);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    return {
      blob: zipBlob,
      filename: "split-pages.zip",
      mimeType: "application/zip",
    };
  },
};

export default splitPdf;
