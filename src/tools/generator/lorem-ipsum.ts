import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const loremIpsum: ToolPlugin = {
  id: "lorem-ipsum",
  category: "generator",
  name: "Lorem Ipsum Generator",
  description: "Generate placeholder text for designs and layouts.",
  keywords: [
    "lorem ipsum",
    "placeholder text",
    "dummy text",
    "filler text",
    "lipsum",
  ],
  icon: "\u{1F4C4}",

  inputMode: "text",
  textPlaceholder: "Enter number of paragraphs to generate (1-50)...",
  textButtonLabel: "Generate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",

  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    let count = parseInt(text, 10);

    if (isNaN(count)) count = 5;
    count = Math.max(1, Math.min(50, count));

    const { LoremIpsum } = await import("lorem-ipsum");
    const lorem = new LoremIpsum({
      sentencesPerParagraph: { max: 8, min: 4 },
      wordsPerSentence: { max: 16, min: 4 },
    });

    const result = lorem.generateParagraphs(count);

    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "lorem-ipsum.txt",
      mimeType: "text/plain",
    };
  },
};

export default loremIpsum;
