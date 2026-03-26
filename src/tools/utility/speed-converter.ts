import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const speedConverter: ToolPlugin = {
  id: "speed-converter",
  category: "utility",
  name: "Speed Converter",
  description: "Convert speeds between kph, mph, m/s, ft/s, and knots.",
  keywords: [
    "speed converter",
    "kph to mph",
    "miles per hour",
    "knots converter",
    "velocity converter",
  ],
  icon: "💨",

  inputMode: "text",
  textPlaceholder: "Enter: value unit\nExample: 100 kph",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a speed value and unit (e.g. 100 kph).");

    // Metres per second per unit
    const toMps: Record<string, number> = {
      "kph": 1 / 3.6,
      "kmh": 1 / 3.6,
      "km/h": 1 / 3.6,
      "mph": 0.44704,
      "m/s": 1,
      "ms": 1,
      "ft/s": 0.3048,
      "fps": 0.3048,
      "knots": 0.514444,
      "knot": 0.514444,
      "kn": 0.514444,
      "kt": 0.514444,
    };

    const match = text.match(/^(-?\d+(?:\.\d+)?)\s*(\S+(?:\/\S+)?)$/i);
    if (!match) {
      throw new Error(`Could not parse "${text}". Use format: value unit — e.g. "100 kph", "60 mph".`);
    }

    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();

    if (!(unit in toMps)) {
      throw new Error(`Unknown unit "${match[2]}". Supported: kph, mph, m/s, ft/s, knots.`);
    }

    const mps = value * toMps[unit];
    const fmt = (n: number) => parseFloat(n.toPrecision(8)).toString();

    const lines = [
      `Input: ${value} ${match[2]}`,
      "",
      "=== Conversion Results ===",
      `Kilometers/hour (kph):  ${fmt(mps / toMps.kph)}`,
      `Miles/hour (mph):       ${fmt(mps / toMps.mph)}`,
      `Meters/second (m/s):    ${fmt(mps)}`,
      `Feet/second (ft/s):     ${fmt(mps / toMps["ft/s"])}`,
      `Knots:                  ${fmt(mps / toMps.knots)}`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "speed-conversion.txt",
      mimeType: "text/plain",
    };
  },
};

export default speedConverter;
