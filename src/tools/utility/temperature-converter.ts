import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const temperatureConverter: ToolPlugin = {
  id: "temperature-converter",
  category: "utility",
  name: "Temperature Converter",
  description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly.",
  keywords: [
    "temperature converter",
    "celsius to fahrenheit",
    "fahrenheit to celsius",
    "kelvin converter",
    "temperature conversion",
  ],
  icon: "🌡️",

  inputMode: "text",
  textPlaceholder: "Enter: value unit (C, F, or K)\nExample: 100 C",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a temperature value and unit (e.g. 100 C).");

    const match = text.match(/^(-?\d+(?:\.\d+)?)\s*([CcFfKk])$/);
    if (!match) {
      throw new Error(`Could not parse "${text}". Use format: value unit — e.g. "100 C", "212 F", or "373.15 K".`);
    }

    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();

    let celsius: number;
    if (unit === "C") {
      celsius = value;
    } else if (unit === "F") {
      celsius = (value - 32) * 5 / 9;
    } else {
      celsius = value - 273.15;
    }

    const fahrenheit = celsius * 9 / 5 + 32;
    const kelvin = celsius + 273.15;

    const fmt = (n: number) => parseFloat(n.toFixed(4)).toString();

    const lines = [
      `Input: ${value} °${unit}`,
      "",
      "=== Conversion Results ===",
      `Celsius:    ${fmt(celsius)} °C`,
      `Fahrenheit: ${fmt(fahrenheit)} °F`,
      `Kelvin:     ${fmt(kelvin)} K`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "temperature-conversion.txt",
      mimeType: "text/plain",
    };
  },
};

export default temperatureConverter;
