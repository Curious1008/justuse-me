import { getToolById } from "@/tools/registry";
import type { ToolResult, ToolOptions } from "@/tools/types";

export async function processServerTool(
  toolId: string,
  files: File[],
  options?: ToolOptions
): Promise<ToolResult> {
  const tool = getToolById(toolId);

  if (!tool) throw new Error(`Tool "${toolId}" not found`);
  if (tool.runtime !== "server") throw new Error(`Tool "${toolId}" is not a server tool`);

  return tool.process(files, options);
}
