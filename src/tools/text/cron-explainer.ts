import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const cronExplainer: ToolPlugin = {
  id: "cron-explainer",
  category: "text",
  name: "Cron Expression Explainer",
  description: "Convert cron expressions to human-readable descriptions.",
  keywords: [
    "cron explainer",
    "cron parser",
    "cron expression",
    "crontab",
    "cron to text",
  ],
  icon: "\u23F0",

  inputMode: "text",
  textPlaceholder:
    "Enter cron expressions (one per line)...\nExamples: */5 * * * *\n0 9 * * 1-5",
  textButtonLabel: "Explain",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",

  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const lines = text.split("\n").filter((line) => line.trim());

    if (lines.length === 0) {
      throw new Error("Please enter at least one cron expression.");
    }

    const cronstrue = (await import("cronstrue")).default;

    const results = lines.map((line) => {
      const expr = line.trim();
      try {
        const desc = cronstrue.toString(expr);
        return `${expr} \u2192 ${desc}`;
      } catch {
        return `${expr} \u2192 Invalid expression`;
      }
    });

    return {
      blob: new Blob([results.join("\n")], { type: "text/plain" }),
      filename: "cron-explained.txt",
      mimeType: "text/plain",
    };
  },
};

export default cronExplainer;
