import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toPascalCase(s: string): string {
  return s
    .replace(/[_\-\s]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

function inferType(
  value: unknown,
  key: string,
  interfaces: Map<string, string>,
  depth: number
): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  const type = typeof value;
  if (type === "string") return "string";
  if (type === "number") return "number";
  if (type === "boolean") return "boolean";

  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    // Infer from first element
    const elementType = inferType(value[0], key, interfaces, depth);
    return `${elementType}[]`;
  }

  if (type === "object") {
    const interfaceName = toPascalCase(key || `Type${depth}`);
    const obj = value as Record<string, unknown>;
    const fields: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
      const fieldType = inferType(v, k, interfaces, depth + 1);
      const optional = v === null || v === undefined ? "?" : "";
      fields.push(`  ${k}${optional}: ${fieldType};`);
    }
    const body = `interface ${interfaceName} {\n${fields.join("\n")}\n}`;
    interfaces.set(interfaceName, body);
    return interfaceName;
  }

  return "unknown";
}

const jsonToTypescript: ToolPlugin = {
  id: "json-to-typescript",
  category: "developer",
  name: "JSON to TypeScript",
  description: "Convert a JSON object into TypeScript interface definitions, handling nested objects and arrays.",
  keywords: [
    "json to typescript",
    "json to ts",
    "generate interface",
    "typescript types",
    "json types",
    "type generation",
  ],
  icon: "{}",

  inputMode: "text",
  textPlaceholder: "Paste a JSON object to generate TypeScript interfaces",
  textButtonLabel: "Generate Interface",
  acceptedTypes: ["text/plain", "application/json"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON. Please check your input and try again.");
    }

    const interfaces = new Map<string, string>();
    inferType(parsed, "Root", interfaces, 0);

    // Output Root first, then nested
    const allInterfaces: string[] = [];
    const root = interfaces.get("Root");
    if (root) allInterfaces.push(root);
    for (const [name, body] of interfaces) {
      if (name !== "Root") allInterfaces.push(body);
    }

    const result = allInterfaces.join("\n\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "types.ts",
      mimeType: "text/plain",
    };
  },
};

export default jsonToTypescript;
