import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const priorityKeys = [
  "Make",
  "Model",
  "DateTime",
  "DateTimeOriginal",
  "ExposureTime",
  "FNumber",
  "ISOSpeedRatings",
  "FocalLength",
  "GPSLatitude",
  "GPSLongitude",
];

const exifViewer: ToolPlugin = {
  id: "exif-viewer",
  category: "image",
  name: "EXIF Viewer",
  description:
    "View EXIF metadata from photos including camera, GPS, and date info.",
  keywords: [
    "exif viewer",
    "image metadata",
    "photo info",
    "exif data",
    "image properties",
  ],
  icon: "📷",

  acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/tiff"],
  maxFiles: 1,
  maxFileSize: 30 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const buffer = await file.arrayBuffer();

    let tags;
    try {
      const ExifReader = await import("exifreader");
      tags = ExifReader.load(buffer);
    } catch {
      throw new Error("Failed to read EXIF data. The file may be corrupted or unsupported.");
    }

    const entries = Object.entries(tags).filter(
      ([, value]) => value !== undefined && value.description !== undefined
    );

    if (entries.length === 0) {
      const ext = file.name.toLowerCase();
      const hint = ext.endsWith(".png") || ext.endsWith(".webp")
        ? " PNG and WebP files typically don't contain EXIF data. Try a JPG photo from a camera."
        : "";
      throw new Error("No EXIF data found in this image." + hint);
    }

    const lines: string[] = [];
    const seen = new Set<string>();

    // Priority keys first
    for (const key of priorityKeys) {
      const entry = entries.find(([k]) => k === key);
      if (entry) {
        lines.push(`${entry[0]}: ${entry[1].description}`);
        seen.add(entry[0]);
      }
    }

    if (lines.length > 0) {
      lines.push("---");
    }

    // Remaining keys
    for (const [key, value] of entries) {
      if (!seen.has(key)) {
        lines.push(`${key}: ${value.description}`);
      }
    }

    const report = lines.join("\n");
    return {
      blob: new Blob([report], { type: "text/plain" }),
      filename: "exif-data.txt",
      mimeType: "text/plain",
    };
  },
};

export default exifViewer;
