import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const metaTagGenerator: ToolPlugin = {
  id: "meta-tag-generator",
  category: "developer",
  name: "Meta Tag Generator",
  description: "Generate complete HTML head meta tags including SEO, Open Graph, and Twitter Card tags.",
  keywords: [
    "meta tags",
    "seo",
    "open graph",
    "twitter card",
    "html meta",
    "og tags",
    "social media tags",
  ],
  icon: "<>",

  inputMode: "text",
  textPlaceholder: "Line 1: Page Title\nLine 2: Description\nLine 3: URL (optional)",
  textButtonLabel: "Generate Tags",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const lines = text.split("\n").map((l) => l.trim());

    const title = lines[0] || "";
    const description = lines[1] || "";
    const url = lines[2] || "";

    if (!title) {
      throw new Error("Please provide at least a page title on line 1.");
    }

    const esc = (s: string) => s.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const tags: string[] = [];
    tags.push("<!-- Primary Meta Tags -->");
    tags.push(`<title>${esc(title)}</title>`);
    tags.push(`<meta name="title" content="${esc(title)}" />`);
    if (description) {
      tags.push(`<meta name="description" content="${esc(description)}" />`);
    }
    tags.push(`<meta name="robots" content="index, follow" />`);
    tags.push(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />`);
    tags.push(`<meta name="language" content="English" />`);
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1" />`);
    tags.push("");

    tags.push("<!-- Open Graph / Facebook -->");
    tags.push(`<meta property="og:type" content="website" />`);
    tags.push(`<meta property="og:title" content="${esc(title)}" />`);
    if (description) {
      tags.push(`<meta property="og:description" content="${esc(description)}" />`);
    }
    if (url) {
      tags.push(`<meta property="og:url" content="${esc(url)}" />`);
    }
    tags.push(`<meta property="og:image" content="https://example.com/og-image.png" />`);
    tags.push("");

    tags.push("<!-- Twitter -->");
    tags.push(`<meta property="twitter:card" content="summary_large_image" />`);
    tags.push(`<meta property="twitter:title" content="${esc(title)}" />`);
    if (description) {
      tags.push(`<meta property="twitter:description" content="${esc(description)}" />`);
    }
    if (url) {
      tags.push(`<meta property="twitter:url" content="${esc(url)}" />`);
    }
    tags.push(`<meta property="twitter:image" content="https://example.com/og-image.png" />`);
    if (url) {
      tags.push("");
      tags.push("<!-- Canonical -->");
      tags.push(`<link rel="canonical" href="${esc(url)}" />`);
    }

    const result = tags.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "meta-tags.html",
      mimeType: "text/plain",
    };
  },
};

export default metaTagGenerator;
