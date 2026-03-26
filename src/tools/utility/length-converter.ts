import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const lengthConverter: ToolPlugin = {
  id: "length-converter",
  category: "utility",
  name: "Length Converter",
  description: "Convert lengths between metric and imperial units: mm, cm, m, km, in, ft, yd, mi.",
  keywords: [
    "length converter",
    "distance converter",
    "km to miles",
    "meters to feet",
    "unit conversion",
  ],
  icon: "📏",

  inputMode: "text",
  textPlaceholder: "Enter: value unit\nExample: 10 km",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a length value and unit (e.g. 10 km).");

    // Metres per unit
    const toMetres: Record<string, number> = {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.344,
    };

    const unitAliases: Record<string, string> = {
      miles: "mi",
      mile: "mi",
      feet: "ft",
      foot: "ft",
      inches: "in",
      inch: "in",
      yard: "yd",
      yards: "yd",
      meter: "m",
      meters: "m",
      metre: "m",
      metres: "m",
      kilometer: "km",
      kilometers: "km",
      kilometre: "km",
      kilometres: "km",
      centimeter: "cm",
      centimeters: "cm",
      centimetre: "cm",
      centimetres: "cm",
      millimeter: "mm",
      millimeters: "mm",
      millimetre: "mm",
      millimetres: "mm",
    };

    const match = text.match(/^(-?\d+(?:\.\d+)?)\s*(\S+)$/i);
    if (!match) {
      throw new Error(`Could not parse "${text}". Use format: value unit — e.g. "10 km", "5.5 miles".`);
    }

    const value = parseFloat(match[1]);
    const rawUnit = match[2].toLowerCase();
    const unit = unitAliases[rawUnit] ?? rawUnit;

    if (!(unit in toMetres)) {
      throw new Error(`Unknown unit "${match[2]}". Supported: mm, cm, m, km, in, ft, yd, mi.`);
    }

    const metres = value * toMetres[unit];
    const fmt = (n: number) => parseFloat(n.toPrecision(8)).toString();

    const lines = [
      `Input: ${value} ${unit}`,
      "",
      "=== Conversion Results ===",
      `Millimeters (mm): ${fmt(metres / toMetres.mm)}`,
      `Centimeters (cm): ${fmt(metres / toMetres.cm)}`,
      `Meters (m):       ${fmt(metres / toMetres.m)}`,
      `Kilometers (km):  ${fmt(metres / toMetres.km)}`,
      `Inches (in):      ${fmt(metres / toMetres.in)}`,
      `Feet (ft):        ${fmt(metres / toMetres.ft)}`,
      `Yards (yd):       ${fmt(metres / toMetres.yd)}`,
      `Miles (mi):       ${fmt(metres / toMetres.mi)}`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "length-conversion.txt",
      mimeType: "text/plain",
    };
  },
};

export default lengthConverter;
