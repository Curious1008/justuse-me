import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const wordCounter: ToolPlugin = {
  id: "word-counter",
  category: "text",
  name: "Word Counter",
  description:
    "Count words, characters, sentences, and paragraphs in any text file.",
  keywords: [
    "word counter",
    "character counter",
    "word count online",
    "text counter",
  ],
  icon: "\u{1F522}",

  acceptedTypes: [".txt", ".md", ".csv", "text/plain"],
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",

  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
    const lines = text.split("\n").length;
    const readingTimeMin = Math.max(1, Math.ceil(words / 238));
    const speakingTimeMin = Math.max(1, Math.ceil(words / 150));

    const report = [
      `Words:                 ${words.toLocaleString()}`,
      `Characters:            ${characters.toLocaleString()}`,
      `Characters (no space): ${charactersNoSpaces.toLocaleString()}`,
      `Sentences:             ${sentences.toLocaleString()}`,
      `Paragraphs:            ${paragraphs.toLocaleString()}`,
      `Lines:                 ${lines.toLocaleString()}`,
      `Reading time:          ~${readingTimeMin} min`,
      `Speaking time:         ~${speakingTimeMin} min`,
    ].join("\n");

    return {
      blob: new Blob([report], { type: "text/plain" }),
      filename: "word-count.txt",
      mimeType: "text/plain",
    };
  },
};

export default wordCounter;
