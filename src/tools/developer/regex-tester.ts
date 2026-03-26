import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const regexTester: ToolPlugin = {
  id: "regex-tester",
  category: "developer",
  name: "Regex Tester",
  description: "Test regular expressions and find all matches with positions in your text.",
  keywords: [
    "regex",
    "regular expression",
    "pattern matching",
    "regexp",
    "regex tester",
    "find matches",
  ],
  icon: ".*",

  inputMode: "text",
  textPlaceholder: "Line 1: /your-regex/flags\nThen paste test text below",
  textButtonLabel: "Test Regex",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const lines = text.split("\n");
    const firstLine = lines[0].trim();
    const testString = lines.slice(1).join("\n");

    // Parse the regex from the first line
    let pattern: RegExp;
    const regexLiteralMatch = firstLine.match(/^\/(.+)\/([gimsuy]*)$/);
    if (regexLiteralMatch) {
      try {
        pattern = new RegExp(regexLiteralMatch[1], regexLiteralMatch[2] || "g");
      } catch {
        throw new Error(`Invalid regex pattern: ${firstLine}`);
      }
    } else {
      // Treat as plain pattern without flags
      try {
        pattern = new RegExp(firstLine, "g");
      } catch {
        throw new Error(`Invalid regex pattern: ${firstLine}`);
      }
    }

    // Ensure global flag for matchAll
    const flags = pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g";
    const globalPattern = new RegExp(pattern.source, flags);

    const matches = [...testString.matchAll(globalPattern)];

    const lines2: string[] = [];
    lines2.push(`Regex: /${pattern.source}/${pattern.flags}`);
    lines2.push(`Test string length: ${testString.length} characters`);
    lines2.push(`Total matches: ${matches.length}`);
    lines2.push("");

    if (matches.length === 0) {
      lines2.push("No matches found.");
    } else {
      matches.forEach((match, i) => {
        lines2.push(`Match ${i + 1}:`);
        lines2.push(`  Value:    "${match[0]}"`);
        lines2.push(`  Position: index ${match.index} to ${(match.index ?? 0) + match[0].length}`);
        if (match.length > 1) {
          for (let g = 1; g < match.length; g++) {
            lines2.push(`  Group ${g}: "${match[g]}"`);
          }
        }
        lines2.push("");
      });
    }

    const result = lines2.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "regex-matches.txt",
      mimeType: "text/plain",
    };
  },
};

export default regexTester;
