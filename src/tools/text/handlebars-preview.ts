import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const handlebarsPreview: ToolPlugin = {
  id: "handlebars-preview",
  category: "text",
  name: "Handlebars Preview",
  description: "Render Handlebars templates with JSON data.",
  keywords: [
    "handlebars",
    "template engine",
    "handlebars preview",
    "hbs",
    "mustache",
  ],
  icon: "\uD83D\uDCD1",

  inputMode: "text",
  textPlaceholder: '<h1>{{title}}</h1>\n<p>{{message}}</p>\n---DATA---\n{"title": "Hello", "message": "World"}',
  textButtonLabel: "Render",
  acceptedTypes: [".hbs", ".handlebars", ".html", ".txt", "text/plain"],
  maxFiles: 1,
  maxFileSize: 2 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    if (!text.trim()) {
      throw new Error("Please provide a Handlebars template with data.");
    }

    const separator = "---DATA---";
    const separatorIndex = text.indexOf(separator);

    if (separatorIndex === -1) {
      throw new Error(
        "File must contain template and data separated by a line containing only ---DATA---\n\nExample:\n<h1>{{title}}</h1>\n---DATA---\n{\"title\": \"Hello\"}"
      );
    }

    const templateStr = text.substring(0, separatorIndex).trim();
    const dataStr = text.substring(separatorIndex + separator.length).trim();

    let data;
    try {
      data = JSON.parse(dataStr);
    } catch {
      throw new Error("Invalid JSON in the data section after ---DATA---.");
    }

    let rendered;
    try {
      const Handlebars = (await import("handlebars")).default;
      const template = Handlebars.compile(templateStr);
      rendered = template(data);
    } catch {
      throw new Error("Failed to render Handlebars template. Please check your template syntax.");
    }

    return {
      blob: new Blob([rendered], { type: "text/html" }),
      filename: "rendered.html",
      mimeType: "text/html",
    };
  },
};

export default handlebarsPreview;
