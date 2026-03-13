import type { ToolPlugin, ToolResult, ToolOptions } from "../types";
import ProtectPdfOptions from "@/components/tool/options/ProtectPdfOptions";

const protectPdf: ToolPlugin = {
  id: "protect-pdf",
  category: "pdf",
  name: "Protect PDF",
  description: "Add password protection to your PDF file.",
  keywords: ["protect pdf", "encrypt pdf", "password pdf", "lock pdf", "secure pdf"],
  icon: "\u{1F512}",

  acceptedTypes: ["application/pdf"],
  maxFiles: 1,
  maxFileSize: 30 * 1024 * 1024,

  runtime: "browser",
  processButtonLabel: "Protect",
  optionsUI: ProtectPdfOptions,

  async process(files, options?: ToolOptions): Promise<ToolResult> {
    const file = files[0];
    const password = ((options?.password as string) || "").trim();

    if (!password) {
      throw new Error("Please enter a password.");
    }
    if (password.length < 4) {
      throw new Error("Password must be at least 4 characters.");
    }

    const { PDFDocument } = await import("pdf-lib");
    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await PDFDocument.load(data);

    const pages = pdf.getPages();
    if (pages.length > 200) {
      throw new Error("PDF has too many pages (max 200).");
    }

    const pdfBytes = await pdf.save({
      userPassword: password,
      ownerPassword: password,
    } as Parameters<typeof pdf.save>[0]);

    return {
      blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
      filename: `protected-${file.name}`,
      mimeType: "application/pdf",
    };
  },
};

export default protectPdf;
