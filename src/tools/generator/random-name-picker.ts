import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const randomNamePicker: ToolPlugin = {
  id: "random-name-picker",
  category: "generator",
  name: "Random Name Picker",
  description: "Randomly pick a winner from a list of names.",
  keywords: [
    "random name picker",
    "name picker",
    "random winner",
    "name lottery",
    "draw names",
    "raffle",
  ],
  icon: "\u{1F3AB}",

  inputMode: "text",
  textPlaceholder: "Enter names (one per line):\nAlice\nBob\nCharlie",
  textButtonLabel: "Pick Random",

  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const names = text
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    if (names.length === 0) {
      throw new Error("Please enter at least one name.");
    }

    // Shuffle using Fisher-Yates
    const shuffled = [...names];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const winner = shuffled[0];
    const runnerUps = shuffled.slice(1, 4);

    const lines = [
      `Total entries: ${names.length}`,
      "",
      `Winner: ${winner}`,
    ];

    if (runnerUps.length > 0) {
      lines.push("", "Runner-ups:");
      runnerUps.forEach((name, i) => lines.push(`  ${i + 1}. ${name}`));
    }

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "picked-name.txt",
      mimeType: "text/plain",
    };
  },
};

export default randomNamePicker;
