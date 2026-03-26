import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const bmiCalculator: ToolPlugin = {
  id: "bmi-calculator",
  category: "calculator",
  name: "BMI Calculator",
  description: "Calculate Body Mass Index (BMI) from height and weight, with health category classification.",
  keywords: ["bmi", "body mass index", "weight", "height", "health", "obesity"],
  icon: "⚖️",

  inputMode: "text",
  textPlaceholder: "Enter: height(cm) weight(kg)\nExample: 175 70",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter height and weight (e.g. 175 70).");

    const parts = text.split(/\s+/);
    if (parts.length < 2) throw new Error("Please enter height (cm) and weight (kg) separated by space.");

    const heightCm = parseFloat(parts[0]);
    const weightKg = parseFloat(parts[1]);

    if (isNaN(heightCm) || isNaN(weightKg)) throw new Error("Invalid numbers. Example: 175 70");
    if (heightCm <= 0 || weightKg <= 0) throw new Error("Height and weight must be positive numbers.");
    if (heightCm < 50 || heightCm > 300) throw new Error("Height must be between 50 and 300 cm.");
    if (weightKg < 1 || weightKg > 700) throw new Error("Weight must be between 1 and 700 kg.");

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    let category: string;
    let healthNote: string;
    if (bmi < 18.5) {
      category = "Underweight";
      healthNote = "Below healthy weight range. Consider consulting a healthcare provider.";
    } else if (bmi < 25) {
      category = "Normal weight";
      healthNote = "Within the healthy weight range.";
    } else if (bmi < 30) {
      category = "Overweight";
      healthNote = "Above healthy weight range. Lifestyle changes may be beneficial.";
    } else if (bmi < 35) {
      category = "Obese (Class I)";
      healthNote = "Moderately obese. Consult a healthcare provider for guidance.";
    } else if (bmi < 40) {
      category = "Obese (Class II)";
      healthNote = "Severely obese. Medical advice is recommended.";
    } else {
      category = "Obese (Class III)";
      healthNote = "Very severely obese. Immediate medical consultation is recommended.";
    }

    // Healthy weight range for this height
    const minHealthyKg = 18.5 * heightM * heightM;
    const maxHealthyKg = 24.9 * heightM * heightM;

    const lines: string[] = [
      "=== BMI Result ===",
      `BMI:             ${bmi.toFixed(2)}`,
      `Category:        ${category}`,
      "",
      "=== Your Stats ===",
      `Height:          ${heightCm} cm (${(heightCm / 2.54).toFixed(1)} in)`,
      `Weight:          ${weightKg} kg (${(weightKg * 2.205).toFixed(1)} lbs)`,
      "",
      "=== Healthy Weight Range ===",
      `For your height: ${minHealthyKg.toFixed(1)} kg – ${maxHealthyKg.toFixed(1)} kg`,
      `                 (${(minHealthyKg * 2.205).toFixed(1)} lbs – ${(maxHealthyKg * 2.205).toFixed(1)} lbs)`,
      "",
      "=== BMI Scale ===",
      "  < 18.5   Underweight",
      "  18.5-24.9  Normal weight",
      "  25.0-29.9  Overweight",
      "  30.0-34.9  Obese (Class I)",
      "  35.0-39.9  Obese (Class II)",
      "  >= 40.0  Obese (Class III)",
      "",
      `Note: ${healthNote}`,
      "BMI is a screening tool only and does not directly measure body fat.",
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "bmi-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default bmiCalculator;
