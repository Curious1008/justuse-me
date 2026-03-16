import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const slugGenerator: ToolPlugin = {
  id: "slug-generator",
  category: "text",
  name: "Slug Generator",
  description: "Convert text into URL-friendly slugs.",
  keywords: [
    "slug generator",
    "url slug",
    "slugify",
    "url friendly",
    "permalink",
  ],
  icon: "\u{1F517}",

  inputMode: "text",
  textPlaceholder: "Enter text to convert to slugs (one per line)...",
  textButtonLabel: "Generate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",

  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const lines = text.split("\n").filter((line) => line.trim());

    if (lines.length === 0) {
      throw new Error("Please enter at least one line of text.");
    }

    const slugify = (await import("slugify")).default;

    const results = lines.map((line) => {
      const input = line.trim();
      const slug = slugify(input, { lower: true, strict: true });
      return `${input} \u2192 ${slug}`;
    });

    return {
      blob: new Blob([results.join("\n")], { type: "text/plain" }),
      filename: "slugs.txt",
      mimeType: "text/plain",
    };
  },
};

export default slugGenerator;
