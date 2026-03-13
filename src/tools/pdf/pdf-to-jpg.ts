import type { ToolPlugin, ToolResult } from "../types";

const pdfToJpg: ToolPlugin = {
  id: "pdf-to-jpg",
  category: "pdf",
  name: "PDF to JPG",
  description: "Convert PDF pages to high-quality JPG images.",
  keywords: [
    "pdf to jpg",
    "pdf to image",
    "convert pdf to jpg",
    "pdf to jpeg online",
  ],
  icon: "\u{1F5BC}\uFE0F",

  acceptedTypes: ["application/pdf"],
  maxFiles: 1,
  maxFileSize: 30 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    // Dynamic import to avoid server-side DOMMatrix error
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();

    const bytes = await files[0].arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
    const pageCount = pdf.numPages;
    if (pageCount > 100) {
      throw new Error("PDF has too many pages (max 100). Please split the file first.");
    }

    const renderPage = async (pageNum: number): Promise<Blob> => {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx, viewport, canvas } as never)
        .promise;
      return new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.92)
      );
    };

    if (pageCount === 1) {
      const blob = await renderPage(1);
      return { blob, filename: "page-1.jpg", mimeType: "image/jpeg" };
    }

    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();

    for (let i = 1; i <= pageCount; i++) {
      const blob = await renderPage(i);
      zip.file(`page-${i}.jpg`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    return {
      blob: zipBlob,
      filename: "pdf-images.zip",
      mimeType: "application/zip",
    };
  },
};

export default pdfToJpg;
