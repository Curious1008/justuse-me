import type { ToolPlugin, ToolResult, ToolOptions } from "../types";
import PageNumberOptions from "@/components/tool/options/PageNumberOptions";

const pageNumbersPdf: ToolPlugin = {
  id: "page-numbers-pdf",
  category: "pdf",
  name: "Add Page Numbers",
  description: "Add page numbers to every page of your PDF.",
  keywords: ["add page numbers", "pdf page numbers", "number pdf pages", "pdf pagination"],
  icon: "\u{1F522}",

  acceptedTypes: ["application/pdf"],
  maxFiles: 1,
  maxFileSize: 30 * 1024 * 1024,

  runtime: "browser",
  processButtonLabel: "Add Numbers",
  optionsUI: PageNumberOptions,

  async process(files, options?: ToolOptions): Promise<ToolResult> {
    const file = files[0];
    const position = (options?.position as string) || "bottom-center";
    const startFrom = Number(options?.startFrom) || 1;

    const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await PDFDocument.load(data);
    const pages = pdf.getPages();

    if (pages.length > 200) {
      throw new Error("PDF has too many pages (max 200).");
    }

    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const fontSize = 10;

    pages.forEach((page, i) => {
      const { width, height } = page.getSize();
      const text = String(startFrom + i);
      const textWidth = font.widthOfTextAtSize(text, fontSize);

      let x: number;
      let y: number;

      switch (position) {
        case "bottom-left":
          x = 40;
          y = 30;
          break;
        case "bottom-right":
          x = width - 40 - textWidth;
          y = 30;
          break;
        case "top-center":
          x = (width - textWidth) / 2;
          y = height - 35;
          break;
        case "top-left":
          x = 40;
          y = height - 35;
          break;
        case "top-right":
          x = width - 40 - textWidth;
          y = height - 35;
          break;
        default: // bottom-center
          x = (width - textWidth) / 2;
          y = 30;
          break;
      }

      page.drawText(text, { x, y, size: fontSize, font, color: rgb(0.3, 0.3, 0.3) });
    });

    const pdfBytes = await pdf.save();
    return {
      blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
      filename: `numbered-${file.name}`,
      mimeType: "application/pdf",
    };
  },
};

export default pageNumbersPdf;
