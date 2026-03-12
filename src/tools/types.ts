export type Category = "pdf" | "image" | "video" | "text";

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
  acceptedTypes: string[];
  maxFiles: number;
  maxFileSize?: number; // bytes

  // Runtime
  runtime: "browser" | "server";

  // Processing
  process: (files: File[], options?: ToolOptions) => Promise<ToolResult>;

  // Optional custom UI components (lazy-loaded)
  optionsUI?: React.ComponentType<{
    options: ToolOptions;
    onChange: (opts: ToolOptions) => void;
  }>;
  previewUI?: React.ComponentType<{ result: ToolResult }>;
}
