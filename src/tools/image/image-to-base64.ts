import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const imageToBase64: ToolPlugin = {
  id: "image-to-base64",
  category: "image",
  name: "Image to Base64",
  description: "Convert an uploaded image to a Base64 data URL string.",
  keywords: ["image to base64", "base64 encode image", "data url", "embed image", "base64 converter"],
  icon: "🔤",

  acceptedTypes: ["image/*"],
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

    const base64 = dataUrl.split(",")[1];
    const lines: string[] = [];
    lines.push("=== Base64 Data URL ===");
    lines.push("");
    lines.push(dataUrl);
    lines.push("");
    lines.push("=== Base64 Only (no prefix) ===");
    lines.push("");
    lines.push(base64);
    lines.push("");
    lines.push("=== Usage Examples ===");
    lines.push("");
    lines.push(`<img src="${dataUrl.slice(0, 60)}..." />`);
    lines.push(`url("${dataUrl.slice(0, 60)}...")`);
    lines.push("");
    lines.push(`File: ${file.name}`);
    lines.push(`Type: ${file.type}`);
    lines.push(`Size: ${(file.size / 1024).toFixed(1)} KB`);
    lines.push(`Base64 length: ${base64.length} characters`);

    const result = lines.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: `${file.name.replace(/\.[^.]+$/, "")}-base64.txt`,
      mimeType: "text/plain",
    };
  },
};

export default imageToBase64;
