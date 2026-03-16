import type { ToolPlugin, ToolResult } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";

const barcodeGenerator: ToolPlugin = {
  id: "barcode-generator",
  category: "generator",
  name: "Barcode Generator",
  description: "Generate barcodes from text or numbers.",
  keywords: [
    "barcode",
    "barcode generator",
    "code128",
    "ean",
    "upc",
    "bar code",
  ],
  icon: "\uD83D\uDCCA",

  inputMode: "text",
  textPlaceholder: "Enter text or number to encode as barcode...",
  textButtonLabel: "Generate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: ImagePreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();

    if (!text) {
      throw new Error("Please provide text or a number to encode.");
    }

    if (typeof document === "undefined") {
      throw new Error("Barcode generation requires a browser environment.");
    }

    try {
      // Create a canvas for reliable PNG output
      const canvas = document.createElement("canvas");
      const JsBarcode = (await import("jsbarcode")).default;
      JsBarcode(canvas, text, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        margin: 10,
      });

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Failed to render barcode."))),
          "image/png"
        );
      });

      return {
        blob,
        filename: "barcode.png",
        mimeType: "image/png",
      };
    } catch (e) {
      if (e instanceof Error && e.message.includes("not valid")) {
        throw new Error("Input text is not valid for CODE128 barcode format.");
      }
      throw new Error("Failed to generate barcode. Please check your input.");
    }
  },
};

export default barcodeGenerator;
