import type { ToolPlugin, ToolResult } from "../types";
import QRPreview from "@/components/tool/previews/QRPreview";

const qrCode: ToolPlugin = {
  id: "qr-code",
  category: "generator",
  name: "QR Code Generator",
  description: "Generate QR codes from any text or URL.",
  keywords: [
    "qr code",
    "qr generator",
    "create qr",
    "qr code maker",
    "barcode",
  ],
  icon: "\u{1F4F1}",

  inputMode: "text",
  textPlaceholder: "Enter text or URL to generate QR code...",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",

  previewUI: QRPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();

    if (!text) {
      throw new Error("Please provide text or a URL to encode.");
    }

    const QRCode = (await import("qrcode")).default;
    const dataUrl = await QRCode.toDataURL(text, {
      width: 512,
      margin: 2,
    });

    const response = await fetch(dataUrl);
    const blob = await response.blob();

    return {
      blob,
      filename: "qrcode.png",
      mimeType: "image/png",
    };
  },
};

export default qrCode;
