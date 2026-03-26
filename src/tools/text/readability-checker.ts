import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length === 0) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function fleschReadingEase(words: number, sentences: number, syllables: number): number {
  if (sentences === 0 || words === 0) return 0;
  return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
}

function fleschKincaidGrade(words: number, sentences: number, syllables: number): number {
  if (sentences === 0 || words === 0) return 0;
  return 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
}

function readingEaseLabel(score: number): string {
  if (score >= 90) return "Very Easy (5th grade)";
  if (score >= 80) return "Easy (6th grade)";
  if (score >= 70) return "Fairly Easy (7th grade)";
  if (score >= 60) return "Standard (8th–9th grade)";
  if (score >= 50) return "Fairly Difficult (10th–12th grade)";
  if (score >= 30) return "Difficult (College level)";
  return "Very Difficult (Professional)";
}

const readabilityChecker: ToolPlugin = {
  id: "readability-checker",
  category: "text",
  name: "Readability Checker",
  description: "Score text with Flesch Reading Ease and Flesch-Kincaid Grade Level.",
  keywords: ["readability", "flesch score", "reading level", "text analysis"],
  icon: "📖",
  inputMode: "text",
  textPlaceholder: "Paste text to analyze readability",
  textButtonLabel: "Analyze",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,
  runtime: "browser",
  previewUI: TextPreview,
  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    const sentenceList = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const wordList = text.trim() ? text.trim().split(/\s+/) : [];
    const sentences = sentenceList.length || 1;
    const words = wordList.length;

    const syllables = wordList.reduce((sum, w) => sum + countSyllables(w), 0);
    const avgWordsPerSentence = words / sentences;
    const avgSyllablesPerWord = words > 0 ? syllables / words : 0;

    const flesch = fleschReadingEase(words, sentences, syllables);
    const fkGrade = fleschKincaidGrade(words, sentences, syllables);

    const report = [
      "=== Readability Report ===",
      "",
      `Words:                    ${words.toLocaleString()}`,
      `Sentences:                ${sentences.toLocaleString()}`,
      `Syllables:                ${syllables.toLocaleString()}`,
      `Avg words/sentence:       ${avgWordsPerSentence.toFixed(1)}`,
      `Avg syllables/word:       ${avgSyllablesPerWord.toFixed(2)}`,
      "",
      `Flesch Reading Ease:      ${flesch.toFixed(1)} / 100`,
      `  → ${readingEaseLabel(flesch)}`,
      "",
      `Flesch-Kincaid Grade:     ${Math.max(0, fkGrade).toFixed(1)}`,
      `  → Approx. grade level ${Math.max(0, Math.round(fkGrade))}`,
    ].join("\n");

    return {
      blob: new Blob([report], { type: "text/plain" }),
      filename: "readability-report.txt",
      mimeType: "text/plain",
    };
  },
};

export default readabilityChecker;
