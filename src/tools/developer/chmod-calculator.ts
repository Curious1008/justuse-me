import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

interface PermSet {
  read: boolean;
  write: boolean;
  execute: boolean;
}

function octalToPerms(digit: number): PermSet {
  return {
    read: (digit & 4) !== 0,
    write: (digit & 2) !== 0,
    execute: (digit & 1) !== 0,
  };
}

function permsToSymbol(p: PermSet): string {
  return `${p.read ? "r" : "-"}${p.write ? "w" : "-"}${p.execute ? "x" : "-"}`;
}

function permsToOctal(p: PermSet): number {
  return (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
}

function parseSymbolic(sym: string): [PermSet, PermSet, PermSet] | null {
  if (sym.length !== 9) return null;
  const parse3 = (s: string): PermSet | null => {
    if (s.length !== 3) return null;
    return {
      read: s[0] === "r",
      write: s[1] === "w",
      execute: s[2] === "x" || s[2] === "s" || s[2] === "t",
    };
  };
  const owner = parse3(sym.slice(0, 3));
  const group = parse3(sym.slice(3, 6));
  const others = parse3(sym.slice(6, 9));
  if (!owner || !group || !others) return null;
  return [owner, group, others];
}

function describePerms(label: string, p: PermSet): string[] {
  const parts: string[] = [];
  if (p.read) parts.push("read");
  if (p.write) parts.push("write");
  if (p.execute) parts.push("execute");
  const permsStr = parts.length ? parts.join(", ") : "no permissions";
  return [`  ${label}: ${permsStr}`];
}

const chmodCalculator: ToolPlugin = {
  id: "chmod-calculator",
  category: "developer",
  name: "chmod Calculator",
  description: "Convert between numeric (755) and symbolic (rwxr-xr-x) Unix file permission formats with full explanation.",
  keywords: [
    "chmod",
    "file permissions",
    "unix permissions",
    "linux permissions",
    "octal permissions",
    "rwx",
  ],
  icon: "🔐",

  inputMode: "text",
  textPlaceholder: "Enter chmod value (e.g. 755 or rwxr-xr-x)",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim();

    if (!raw) {
      throw new Error("Please enter a chmod value (e.g. 755 or rwxr-xr-x).");
    }

    let owner: PermSet, group: PermSet, others: PermSet;
    let numericStr: string;

    // Numeric input (e.g. 755, 644, 777)
    if (/^\d{3}$/.test(raw)) {
      const digits = raw.split("").map(Number);
      if (digits.some((d) => d > 7)) {
        throw new Error(`Invalid octal digit in "${raw}". Each digit must be 0-7.`);
      }
      owner = octalToPerms(digits[0]);
      group = octalToPerms(digits[1]);
      others = octalToPerms(digits[2]);
      numericStr = raw;
    } else if (/^[rwx\-sStT]{9}$/.test(raw)) {
      // Symbolic input (e.g. rwxr-xr-x)
      const parsed = parseSymbolic(raw);
      if (!parsed) throw new Error(`Cannot parse symbolic permission string "${raw}".`);
      [owner, group, others] = parsed;
      numericStr = `${permsToOctal(owner)}${permsToOctal(group)}${permsToOctal(others)}`;
    } else {
      throw new Error(`Unrecognized format: "${raw}". Use 3-digit octal (e.g. 755) or 9-char symbolic (e.g. rwxr-xr-x).`);
    }

    const symbolic = `${permsToSymbol(owner)}${permsToSymbol(group)}${permsToSymbol(others)}`;

    const lines: string[] = [];
    lines.push("=== chmod Result ===");
    lines.push(`Numeric:  ${numericStr}`);
    lines.push(`Symbolic: ${symbolic}`);
    lines.push("");
    lines.push("=== Permissions Breakdown ===");
    lines.push(...describePerms("Owner ", owner));
    lines.push(...describePerms("Group ", group));
    lines.push(...describePerms("Others", others));
    lines.push("");
    lines.push("=== Bit Values ===");
    lines.push("  r (read)    = 4");
    lines.push("  w (write)   = 2");
    lines.push("  x (execute) = 1");
    lines.push("  - (none)    = 0");
    lines.push("");
    lines.push("=== Common chmod Values ===");
    lines.push("  777  rwxrwxrwx  Everyone has full access");
    lines.push("  755  rwxr-xr-x  Owner full, others read+execute (typical for dirs/executables)");
    lines.push("  644  rw-r--r--  Owner read+write, others read-only (typical for files)");
    lines.push("  600  rw-------  Owner read+write only (private files)");
    lines.push("  400  r--------  Owner read-only (very restricted)");

    const result = lines.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "chmod-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default chmodCalculator;
