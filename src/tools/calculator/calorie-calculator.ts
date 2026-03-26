import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const calorieCalculator: ToolPlugin = {
  id: "calorie-calculator",
  category: "calculator",
  name: "Calorie Calculator",
  description: "Calculate daily calorie needs using the Mifflin-St Jeor formula based on age, gender, height, weight, and activity level.",
  keywords: ["calorie", "tdee", "bmr", "diet", "nutrition", "weight loss", "calories per day"],
  icon: "🔥",

  inputMode: "text",
  textPlaceholder: "Enter: age gender height(cm) weight(kg) activity(1-5)\nExample: 30 male 175 70 3",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter age, gender, height, weight, and activity level (e.g. 30 male 175 70 3).");

    const parts = text.split(/\s+/);
    if (parts.length < 5) throw new Error("Please enter: age gender height(cm) weight(kg) activity(1-5)");

    const age = parseInt(parts[0], 10);
    const gender = parts[1].toLowerCase();
    const heightCm = parseFloat(parts[2]);
    const weightKg = parseFloat(parts[3]);
    const activityLevel = parseInt(parts[4], 10);

    if (isNaN(age) || isNaN(heightCm) || isNaN(weightKg) || isNaN(activityLevel)) {
      throw new Error("Invalid numbers. Example: 30 male 175 70 3");
    }
    if (!["male", "female", "m", "f"].includes(gender)) {
      throw new Error("Gender must be 'male' or 'female'.");
    }
    if (age < 1 || age > 120) throw new Error("Age must be between 1 and 120.");
    if (heightCm < 50 || heightCm > 300) throw new Error("Height must be between 50 and 300 cm.");
    if (weightKg < 1 || weightKg > 700) throw new Error("Weight must be between 1 and 700 kg.");
    if (activityLevel < 1 || activityLevel > 5) throw new Error("Activity level must be between 1 and 5.");

    const isMale = gender.startsWith("m");

    // Mifflin-St Jeor BMR
    let bmr: number;
    if (isMale) {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    const activityMultipliers = [1.2, 1.375, 1.55, 1.725, 1.9];
    const activityNames = [
      "Sedentary (little or no exercise)",
      "Lightly active (light exercise 1-3 days/week)",
      "Moderately active (moderate exercise 3-5 days/week)",
      "Very active (hard exercise 6-7 days/week)",
      "Extra active (very hard exercise, physical job)",
    ];

    const tdee = bmr * activityMultipliers[activityLevel - 1];

    const lines: string[] = [
      "=== Calorie Calculator Result ===",
      `BMR (Basal Metabolic Rate): ${Math.round(bmr)} kcal/day`,
      `TDEE (Total Daily Energy):  ${Math.round(tdee)} kcal/day`,
      "",
      "=== Your Stats ===",
      `Age:             ${age}`,
      `Gender:          ${isMale ? "Male" : "Female"}`,
      `Height:          ${heightCm} cm`,
      `Weight:          ${weightKg} kg`,
      `Activity:        ${activityLevel} - ${activityNames[activityLevel - 1]}`,
      "",
      "=== Weight Goals ===",
      `Lose weight fast: ${Math.round(tdee - 1000)} kcal/day  (~2 lbs/week)`,
      `Lose weight:      ${Math.round(tdee - 500)} kcal/day  (~1 lb/week)`,
      `Maintain weight:  ${Math.round(tdee)} kcal/day`,
      `Gain weight:      ${Math.round(tdee + 500)} kcal/day  (~1 lb/week)`,
      `Gain weight fast: ${Math.round(tdee + 1000)} kcal/day  (~2 lbs/week)`,
      "",
      "=== All Activity Levels ===",
    ];

    for (let i = 0; i < 5; i++) {
      const t = Math.round(bmr * activityMultipliers[i]);
      lines.push(`  ${i + 1}) ${t} kcal/day - ${activityNames[i]}`);
    }

    lines.push("");
    lines.push("Formula: Mifflin-St Jeor (1990)");

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "calorie-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default calorieCalculator;
