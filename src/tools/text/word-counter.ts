import type { ToolPlugin, ToolResult } from "../types";

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

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
    const lines = text.split("\n").length;

    const report = [
      `Word Count Report`,
      `=================`,
      ``,
      `Words:                 ${words.toLocaleString()}`,
      `Characters:            ${characters.toLocaleString()}`,
      `Characters (no space): ${charactersNoSpaces.toLocaleString()}`,
      `Sentences:             ${sentences.toLocaleString()}`,
      `Paragraphs:            ${paragraphs.toLocaleString()}`,
      `Lines:                 ${lines.toLocaleString()}`,
      ``,
      `File: ${files[0].name}`,
    ].join("\n");

    return {
      blob: new Blob([report], { type: "text/plain" }),
      filename: "word-count.txt",
      mimeType: "text/plain",
    };
  },
};

export default wordCounter;
