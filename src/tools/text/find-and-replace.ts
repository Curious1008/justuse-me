import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const findAndReplace: ToolPlugin = {
  id: "find-and-replace",
  category: "text",
  name: "Find and Replace",
  description: "Bulk find and replace text using a simple separator format.",
  keywords: ["find and replace", "bulk replace", "text substitution", "search replace"],
  icon: "🔍",
  inputMode: "text",
  textPlaceholder: "Line 1: search|||replacement\nThen paste your text below",
  textButtonLabel: "Replace",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,
  runtime: "browser",
  previewUI: TextPreview,
  async process(files): Promise<ToolResult> {
    const raw = await files[0].text();
    const newlineIdx = raw.indexOf("\n");
    if (newlineIdx === -1) {
      throw new Error("Please provide the find|||replace pair on the first line, then your text below.");
    }

    const ruleLine = raw.slice(0, newlineIdx);
    const text = raw.slice(newlineIdx + 1);

    const separatorIdx = ruleLine.indexOf("|||");
    if (separatorIdx === -1) {
      throw new Error('First line must use the format: search|||replacement (using "|||" as separator).');
    }

    const searchStr = ruleLine.slice(0, separatorIdx);
    const replaceStr = ruleLine.slice(separatorIdx + 3);

    if (searchStr === "") {
      throw new Error("Search string cannot be empty.");
    }

    // Escape special regex characters in the search string
    const escaped = searchStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "g");
    const count = (text.match(regex) || []).length;
    const result = text.replace(regex, replaceStr);

    const header = `# Replaced ${count} occurrence(s) of "${searchStr}" with "${replaceStr}"\n\n`;

    return {
      blob: new Blob([header + result], { type: "text/plain" }),
      filename: "replaced.txt",
      mimeType: "text/plain",
    };
  },
};

export default findAndReplace;
