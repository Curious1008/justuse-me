import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const weightConverter: ToolPlugin = {
  id: "weight-converter",
  category: "utility",
  name: "Weight Converter",
  description: "Convert weights between mg, g, kg, oz, lb, and stone.",
  keywords: [
    "weight converter",
    "kg to lbs",
    "pounds to kilograms",
    "mass converter",
    "unit conversion",
  ],
  icon: "⚖️",

  inputMode: "text",
  textPlaceholder: "Enter: value unit\nExample: 70 kg",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a weight value and unit (e.g. 70 kg).");

    // Grams per unit
    const toGrams: Record<string, number> = {
      mg: 0.001,
      g: 1,
      kg: 1000,
      oz: 28.349523125,
      lb: 453.59237,
      st: 6350.29318,
    };

    const unitAliases: Record<string, string> = {
      milligram: "mg",
      milligrams: "mg",
      gram: "g",
      grams: "g",
      kilogram: "kg",
      kilograms: "kg",
      ounce: "oz",
      ounces: "oz",
      pound: "lb",
      pounds: "lb",
      lbs: "lb",
      stone: "st",
      stones: "st",
    };

    const match = text.match(/^(-?\d+(?:\.\d+)?)\s*(\S+)$/i);
    if (!match) {
      throw new Error(`Could not parse "${text}". Use format: value unit — e.g. "70 kg", "154 lb".`);
    }

    const value = parseFloat(match[1]);
    const rawUnit = match[2].toLowerCase();
    const unit = unitAliases[rawUnit] ?? rawUnit;

    if (!(unit in toGrams)) {
      throw new Error(`Unknown unit "${match[2]}". Supported: mg, g, kg, oz, lb, st.`);
    }

    const grams = value * toGrams[unit];
    const fmt = (n: number) => parseFloat(n.toPrecision(8)).toString();

    const lines = [
      `Input: ${value} ${unit}`,
      "",
      "=== Conversion Results ===",
      `Milligrams (mg):  ${fmt(grams / toGrams.mg)}`,
      `Grams (g):        ${fmt(grams / toGrams.g)}`,
      `Kilograms (kg):   ${fmt(grams / toGrams.kg)}`,
      `Ounces (oz):      ${fmt(grams / toGrams.oz)}`,
      `Pounds (lb):      ${fmt(grams / toGrams.lb)}`,
      `Stone (st):       ${fmt(grams / toGrams.st)}`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "weight-conversion.txt",
      mimeType: "text/plain",
    };
  },
};

export default weightConverter;
