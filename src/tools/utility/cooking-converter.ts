import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const cookingConverter: ToolPlugin = {
  id: "cooking-converter",
  category: "utility",
  name: "Cooking Converter",
  description: "Convert cooking measurements between tsp, tbsp, cups, ml, liters, and fl oz.",
  keywords: [
    "cooking converter",
    "cups to ml",
    "tablespoon to teaspoon",
    "recipe converter",
    "measurement converter",
  ],
  icon: "🥄",

  inputMode: "text",
  textPlaceholder: "Enter: value unit\nExample: 2 cups",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a measurement value and unit (e.g. 2 cups).");

    // Millilitres per unit
    const toMl: Record<string, number> = {
      tsp: 4.92892,
      teaspoon: 4.92892,
      teaspoons: 4.92892,
      tbsp: 14.7868,
      tablespoon: 14.7868,
      tablespoons: 14.7868,
      cup: 236.588,
      cups: 236.588,
      c: 236.588,
      ml: 1,
      milliliter: 1,
      milliliters: 1,
      millilitre: 1,
      millilitres: 1,
      l: 1000,
      liter: 1000,
      liters: 1000,
      litre: 1000,
      litres: 1000,
      "fl oz": 29.5735,
      floz: 29.5735,
      "fluid ounce": 29.5735,
      "fluid ounces": 29.5735,
    };

    const match = text.match(/^(-?\d+(?:\.\d+)?)\s+(.+)$/i);
    if (!match) {
      throw new Error(`Could not parse "${text}". Use format: value unit — e.g. "2 cups", "250 ml".`);
    }

    const value = parseFloat(match[1]);
    const rawUnit = match[2].trim().toLowerCase();
    const unit = rawUnit;

    if (!(unit in toMl)) {
      throw new Error(`Unknown unit "${match[2]}". Supported: tsp, tbsp, cup, ml, l, fl oz.`);
    }

    const ml = value * toMl[unit];
    const fmt = (n: number) => parseFloat(n.toPrecision(6)).toString();

    const lines = [
      `Input: ${value} ${match[2]}`,
      "",
      "=== Conversion Results ===",
      `Teaspoons (tsp):    ${fmt(ml / toMl.tsp)}`,
      `Tablespoons (tbsp): ${fmt(ml / toMl.tbsp)}`,
      `Cups:               ${fmt(ml / toMl.cup)}`,
      `Fluid Ounces:       ${fmt(ml / toMl.floz)}`,
      `Milliliters (ml):   ${fmt(ml)}`,
      `Liters (l):         ${fmt(ml / toMl.l)}`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "cooking-conversion.txt",
      mimeType: "text/plain",
    };
  },
};

export default cookingConverter;
