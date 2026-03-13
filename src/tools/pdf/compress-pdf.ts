import type { ToolPlugin, ToolResult, ToolOptions } from "../types";
import CompressPdfOptions from "@/components/tool/options/CompressPdfOptions";

const compressPdf: ToolPlugin = {
  id: "compress-pdf",
  category: "pdf",
  name: "Compress PDF",
  description: "Reduce PDF file size while maintaining readability.",
  keywords: [
    "compress pdf",
    "reduce pdf size",
    "pdf compressor",
    "shrink pdf",
    "smaller pdf",
  ],
  icon: "\u{1F4E6}",

  acceptedTypes: ["application/pdf"],
  maxFiles: 1,
  maxFileSize: 30 * 1024 * 1024,

  runtime: "browser",
  processButtonLabel: "Compress",
  optionsUI: CompressPdfOptions,

  async process(files, options?: ToolOptions): Promise<ToolResult> {
    const file = files[0];
    const qualityPercent = (options?.quality as number) ?? 70;
    const quality = qualityPercent / 100;
    const dpi = qualityPercent >= 80 ? 1.5 : 1;

    // Dynamic import to avoid server-side DOMMatrix error
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();

    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    const pageCount = pdf.numPages;

    if (pageCount > 100) {
      throw new Error(
        "PDF has too many pages (max 100). Please split the file first."
      );
    }

    const { PDFDocument } = await import("pdf-lib");
    const newPdf = await PDFDocument.create();

    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: dpi });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;

      await page.render({ canvasContext: ctx, viewport, canvas } as never)
        .promise;

      const jpegBlob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/jpeg", quality)
      );

      const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
      const jpegImage = await newPdf.embedJpg(jpegBytes);

      // Convert rendered pixel dimensions back to PDF points (72 pts/inch)
      const pageWidth = (viewport.width / dpi) * (72 / 96);
      const pageHeight = (viewport.height / dpi) * (72 / 96);
      const newPage = newPdf.addPage([pageWidth, pageHeight]);

      newPage.drawImage(jpegImage, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
      });
    }

    const pdfBytes = await newPdf.save();

    return {
      blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
      filename: `compressed-${file.name}`,
      mimeType: "application/pdf",
    };
  },
};

export default compressPdf;
