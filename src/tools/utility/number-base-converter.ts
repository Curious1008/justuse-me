import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const numberBaseConverter: ToolPlugin = {
  id: "number-base-converter",
  category: "utility",
  name: "Number Base Converter",
  description: "Convert numbers between decimal, hexadecimal, binary, and octal bases.",
  keywords: [
    "number base converter",
    "binary to decimal",
    "hex to decimal",
    "decimal to binary",
    "octal converter",
    "base conversion",
  ],
  icon: "🔢",

  inputMode: "text",
  textPlaceholder: "Enter a number in any base:\n255, 0xFF, 0b11111111, or 0o377",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a number to convert.");

    let value: number;
    let inputBase: string;

    if (/^0x[0-9a-f]+$/i.test(text)) {
      value = parseInt(text, 16);
      inputBase = "Hexadecimal (0x...)";
    } else if (/^0b[01]+$/i.test(text)) {
      value = parseInt(text.slice(2), 2);
      inputBase = "Binary (0b...)";
    } else if (/^0o[0-7]+$/i.test(text)) {
      value = parseInt(text.slice(2), 8);
      inputBase = "Octal (0o...)";
    } else if (/^\d+$/.test(text)) {
      value = parseInt(text, 10);
      inputBase = "Decimal";
    } else {
      throw new Error(
        `Could not parse "${text}". Use: decimal (255), hex (0xFF), binary (0b11111111), or octal (0o377).`
      );
    }

    if (isNaN(value) || !isFinite(value)) {
      throw new Error(`"${text}" is not a valid number.`);
    }

    if (value < 0) {
      throw new Error("Negative numbers are not supported for base conversion.");
    }

    const lines = [
      `Input: ${text} (${inputBase})`,
      "",
      "=== Conversion Results ===",
      `Decimal:     ${value.toString(10)}`,
      `Hexadecimal: 0x${value.toString(16).toUpperCase()}`,
      `Binary:      0b${value.toString(2)}`,
      `Octal:       0o${value.toString(8)}`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "number-base-conversion.txt",
      mimeType: "text/plain",
    };
  },
};

export default numberBaseConverter;
