import type { ToolPlugin, ToolResult, ToolOptions } from "../types";
import ImagePreview from "@/components/tool/previews/ImagePreview";
import BarcodeOptions from "@/components/tool/options/BarcodeOptions";

const FORMAT_LABELS: Record<string, string> = {
  CODE128: "CODE128",
  EAN13: "EAN-13",
  UPC: "UPC-A",
  CODE39: "CODE39",
  ITF14: "ITF-14",
  pharmacode: "Pharmacode",
};

const barcodeGenerator: ToolPlugin = {
  id: "barcode-generator",
  category: "generator",
  name: "Barcode Generator",
  description: "Generate barcodes from text or numbers.",
  keywords: [
    "barcode",
    "barcode generator",
    "code128",
    "ean-13",
    "ean13",
    "upc",
    "upc-a",
    "code39",
    "bar code",
    "barcode online free",
  ],
  icon: "\uD83D\uDCCA",

  inputMode: "text",
  textPlaceholder: "Enter text or number to encode as barcode...",
  textButtonLabel: "Generate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  optionsBefore: true,
  optionsUI: BarcodeOptions,
  previewUI: ImagePreview,

  async process(files, options?: ToolOptions): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    const format = (options?.format as string) || "CODE128";

    if (!text) {
      throw new Error("Please provide text or a number to encode.");
    }

    if (typeof document === "undefined") {
      throw new Error("Barcode generation requires a browser environment.");
    }

    try {
      const canvas = document.createElement("canvas");
      const JsBarcode = (await import("jsbarcode")).default;
      JsBarcode(canvas, text, {
        format,
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

      const label = FORMAT_LABELS[format] || format;
      return {
        blob,
        filename: `barcode-${label.toLowerCase()}.png`,
        mimeType: "image/png",
      };
    } catch (e) {
      if (e instanceof Error && e.message.includes("not valid")) {
        const label = FORMAT_LABELS[format] || format;
        throw new Error(`Input is not valid for ${label} format. Check the required format (e.g. EAN-13 needs exactly 13 digits, UPC-A needs 12 digits).`);
      }
      throw new Error("Failed to generate barcode. Please check your input.");
    }
  },
};

export default barcodeGenerator;
