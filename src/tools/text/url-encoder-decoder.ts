import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const urlEncoderDecoder: ToolPlugin = {
  id: "url-encoder-decoder",
  category: "text",
  name: "URL Encoder / Decoder",
  description: "Encode and decode URL percent-encoded strings.",
  keywords: ["url encode", "url decode", "percent encoding", "url escape"],
  icon: "🔗",
  inputMode: "text",
  textPlaceholder: "Line 1: encode or decode\nThen paste your URL or text",
  textButtonLabel: "Process",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,
  runtime: "browser",
  previewUI: TextPreview,
  async process(files): Promise<ToolResult> {
    const raw = await files[0].text();
    const newlineIdx = raw.indexOf("\n");
    if (newlineIdx === -1) {
      throw new Error('Please provide "encode" or "decode" on the first line, then your text below.');
    }

    const mode = raw.slice(0, newlineIdx).trim().toLowerCase();
    const text = raw.slice(newlineIdx + 1);

    let result: string;
    if (mode === "encode") {
      result = encodeURIComponent(text);
    } else if (mode === "decode") {
      try {
        result = decodeURIComponent(text);
      } catch {
        throw new Error("Failed to decode: input contains invalid percent-encoded sequences.");
      }
    } else {
      throw new Error(`Unknown mode "${mode}". Use "encode" or "decode".`);
    }

    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: `url-${mode}d.txt`,
      mimeType: "text/plain",
    };
  },
};

export default urlEncoderDecoder;
