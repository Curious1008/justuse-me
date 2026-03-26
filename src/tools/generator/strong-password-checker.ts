import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

function estimateCrackTime(password: string): string {
  // Estimate charset size
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

  const combinations = Math.pow(charsetSize || 1, password.length);
  // Assume 10 billion guesses/second (modern GPU cluster)
  const guessesPerSec = 1e10;
  const seconds = combinations / guessesPerSec / 2; // average half the space

  if (seconds < 1) return "Instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 3.154e9) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 3.154e12) return `${Math.round(seconds / 3.154e9)} thousand years`;
  if (seconds < 3.154e15) return `${Math.round(seconds / 3.154e12)} million years`;
  return "Billions of years";
}

const strongPasswordChecker: ToolPlugin = {
  id: "strong-password-checker",
  category: "generator",
  name: "Password Strength Checker",
  description: "Check password strength with score, crack time estimate, and detailed feedback.",
  keywords: [
    "password checker",
    "password strength",
    "password tester",
    "password security",
    "how strong is my password",
  ],
  icon: "\u{1F512}",

  inputMode: "text",
  textPlaceholder: "Enter a password to check its strength",
  textButtonLabel: "Check Strength",

  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const password = await files[0].text();
    // Do not trim — spaces may be intentional in passwords

    if (!password) {
      throw new Error("Please enter a password to check.");
    }

    const feedback: string[] = [];
    let score = 0;

    // Length checks
    if (password.length < 8) {
      feedback.push("Too short — use at least 8 characters");
    } else if (password.length >= 8) {
      score += 15;
      if (password.length >= 12) score += 15;
      if (password.length >= 16) score += 10;
      if (password.length >= 20) score += 10;
    }

    // Character type checks
    if (/[a-z]/.test(password)) { score += 10; } else { feedback.push("Add lowercase letters (a-z)"); }
    if (/[A-Z]/.test(password)) { score += 10; } else { feedback.push("Add uppercase letters (A-Z)"); }
    if (/[0-9]/.test(password)) { score += 10; } else { feedback.push("Add numbers (0-9)"); }
    if (/[^a-zA-Z0-9]/.test(password)) { score += 15; } else { feedback.push("Add symbols (!@#$%^&*)"); }

    // Pattern checks (deduct)
    if (/(.)\1{2,}/.test(password)) {
      score -= 10;
      feedback.push("Avoid repeating characters (e.g. 'aaa')");
    }
    if (/^[a-zA-Z]+$/.test(password)) {
      feedback.push("Mix in numbers or symbols — letters only is weak");
    }
    if (/^[0-9]+$/.test(password)) {
      score -= 10;
      feedback.push("Avoid numbers only");
    }
    if (/password|123456|qwerty|abc123|letmein|welcome/i.test(password)) {
      score -= 20;
      feedback.push("Contains a commonly used password pattern");
    }

    score = Math.max(0, Math.min(100, score));

    const strength =
      score < 20 ? "Very Weak" :
      score < 40 ? "Weak" :
      score < 60 ? "Fair" :
      score < 80 ? "Strong" : "Very Strong";

    const crackTime = estimateCrackTime(password);

    const lines = [
      `Score: ${score}/100`,
      `Strength: ${strength}`,
      `Estimated crack time: ${crackTime}`,
      `Length: ${password.length} characters`,
      "",
    ];

    if (feedback.length > 0) {
      lines.push("Suggestions:");
      feedback.forEach((f) => lines.push(`  - ${f}`));
    } else {
      lines.push("No issues found. This is a strong password!");
    }

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "password-check.txt",
      mimeType: "text/plain",
    };
  },
};

export default strongPasswordChecker;
