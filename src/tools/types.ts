export type Category = "pdf" | "image" | "text" | "convert" | "generator";

/** Labels passed from the server dictionary to client interaction components. */
export interface ToolLabels {
  chooseDifferentFile: string;
  processFallback: string;
  processAnother: string;
  tryAgain: string;
  addMoreFiles: string;
  dropFileHere: string;
  dropFilesHere: string;
  browse: string;
  anyFile: string;
  dragToReorder: string;
  processNFiles: string;
  downloaded: string;
  download: string;
  processing: string;
  dailyLimitTitle: string;
  dailyLimitDesc: string;
  createFreeAccount: string;
  seeProPlans: string;
  upgradeToPro: string;
  maybeLater: string;
  nFiles: string;
}

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
  processButtonLabel?: string; // button label for process (default: "Process")
  acceptedTypes: string[];
  maxFiles: number;
  maxFileSize?: number; // bytes

  // Runtime
  runtime: "browser" | "server";

  // Locales where this tool should be hidden (e.g. OCR hidden for Chinese)
  hiddenLocales?: string[];

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
