export type Category = "pdf" | "image" | "text" | "convert" | "generator";

export interface ToolOptions {
  [key: string]: unknown;
}

export interface ToolResult {
  blob: Blob;
  filename: string;
  mimeType: string;
}

export interface ToolPlugin {
  // Metadata
  id: string;
  category: Category;
  name: string;
  description: string;
  keywords: string[];
  icon: string;

  // Input config
  inputMode?: "file" | "text"; // default: "file"
  textPlaceholder?: string; // placeholder for text input mode
  textButtonLabel?: string; // button label for text input (default: "Generate")
  acceptedTypes: string[];
  maxFiles: number;
  maxFileSize?: number; // bytes

  // Runtime
  runtime: "browser" | "server";

  // Processing
  process: (files: File[], options?: ToolOptions) => Promise<ToolResult>;

  // When true, optionsUI is shown before file upload (e.g. Base64 encode/decode toggle)
  optionsBefore?: boolean;

  // Optional custom UI components (lazy-loaded)
  optionsUI?: React.ComponentType<{
    options: ToolOptions;
    onChange: (opts: ToolOptions) => void;
    fileInfo?: Record<string, unknown>;
  }>;
  previewUI?: React.ComponentType<{ result: ToolResult }>;
}
