import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const passwordGenerator: ToolPlugin = {
  id: "password-generator",
  category: "generator",
  name: "Password Generator",
  description: "Generate strong random passwords with uppercase, lowercase, numbers, and symbols.",
  keywords: [
    "password generator",
    "random password",
    "strong password",
    "secure password",
    "password creator",
  ],
  icon: "\u{1F510}",

  inputMode: "text",
  textPlaceholder: "Enter password length (default: 16)",
  textButtonLabel: "Generate",

  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();

    let length = parseInt(text, 10);
    if (isNaN(length) || length < 4) length = 16;
    if (length > 128) length = 128;

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    const all = upper + lower + digits + symbols;

    const rand = (charset: string) => charset[Math.floor(Math.random() * charset.length)];

    // Ensure at least one character from each set
    const chars: string[] = [rand(upper), rand(lower), rand(digits), rand(symbols)];
    for (let i = chars.length; i < length; i++) {
      chars.push(rand(all));
    }
    // Shuffle
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    const password = chars.join("");

    // Strength rating
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const rating =
      score <= 2 ? "Weak" : score <= 4 ? "Fair" : score <= 6 ? "Strong" : "Very Strong";

    const output = [
      `Password: ${password}`,
      `Length: ${length}`,
      `Strength: ${rating} (${score}/7)`,
    ].join("\n");

    return {
      blob: new Blob([output], { type: "text/plain" }),
      filename: "password.txt",
      mimeType: "text/plain",
    };
  },
};

export default passwordGenerator;
