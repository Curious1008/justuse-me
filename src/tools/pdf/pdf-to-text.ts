import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const pdfToText: ToolPlugin = {
  id: "pdf-to-text",
  category: "pdf",
  name: "PDF to Text",
  description: "Extract all text content from a PDF document.",
  keywords: [
    "pdf to text",
    "extract text pdf",
    "pdf text extractor",
    "copy text from pdf",
  ],
  icon: "\u{1F4DD}",

  acceptedTypes: ["application/pdf"],
  maxFiles: 1,
  maxFileSize: 50 * 1024 * 1024,

  runtime: "browser",

  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    // Dynamic import to avoid server-side DOMMatrix error
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const bytes = await files[0].arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
    const pageCount = pdf.numPages;
    const textParts: string[] = [];

    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .filter((item) => "str" in item)
        .map((item) => (item as { str: string }).str)
        .join(" ");
      textParts.push(pageText);
    }

    const fullText = textParts.join("\n\n");
    return {
      blob: new Blob([fullText], { type: "text/plain" }),
      filename: "extracted-text.txt",
      mimeType: "text/plain",
    };
  },
};

export default pdfToText;
