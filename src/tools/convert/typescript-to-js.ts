import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const typescriptToJs: ToolPlugin = {
  id: "typescript-to-js",
  category: "convert",
  name: "TypeScript to JavaScript",
  description: "Compile TypeScript code to JavaScript.",
  keywords: [
    "typescript to javascript",
    "ts to js",
    "compile typescript",
    "typescript compiler",
    "transpile",
  ],
  icon: "\uD83D\uDD04",

  acceptedTypes: [".ts", ".tsx", ".txt", "text/plain"],
  maxFiles: 1,
  maxFileSize: 2 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    let js;
    try {
      const ts = await import("typescript");
      const result = ts.transpileModule(text, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.React,
          removeComments: false,
        },
      });
      js = result.outputText;
    } catch {
      throw new Error("Failed to compile TypeScript. Please check your code for syntax errors.");
    }
    const baseName = files[0].name.replace(/\.(tsx?|txt)$/i, "");
    return {
      blob: new Blob([js], { type: "text/javascript" }),
      filename: `${baseName}.js`,
      mimeType: "text/javascript",
    };
  },
};

export default typescriptToJs;
