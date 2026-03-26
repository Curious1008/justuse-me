import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    } as Pbkdf2Params,
    keyMaterial,
    { name: "AES-GCM", length: 256 } as AesDerivedKeyParams,
    false,
    ["encrypt", "decrypt"] as KeyUsage[]
  );
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function fromBase64(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

const textEncryptDecrypt: ToolPlugin = {
  id: "text-encrypt-decrypt",
  category: "utility",
  name: "Text Encrypt / Decrypt",
  description: "Encrypt or decrypt text using AES-256-GCM with a passphrase. Runs entirely in your browser.",
  keywords: [
    "text encryption",
    "AES encryption",
    "encrypt text online",
    "decrypt text",
    "password encryption",
    "secure text",
  ],
  icon: "🔐",

  inputMode: "text",
  textPlaceholder: "Line 1: encrypt or decrypt\nLine 2: your passphrase\nLine 3+: text to process",
  textButtonLabel: "Process",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = await files[0].text();
    const lines = raw.split("\n");

    if (lines.length < 3) {
      throw new Error(
        "Input must have at least 3 lines:\nLine 1: encrypt or decrypt\nLine 2: your passphrase\nLine 3+: text to process"
      );
    }

    const mode = lines[0].trim().toLowerCase();
    const passphrase = lines[1]; // preserve as-is
    const content = lines.slice(2).join("\n");

    if (mode !== "encrypt" && mode !== "decrypt") {
      throw new Error(`Line 1 must be "encrypt" or "decrypt", got "${lines[0].trim()}".`);
    }

    if (!passphrase.trim()) {
      throw new Error("Line 2 (passphrase) must not be empty.");
    }

    if (!content.trim()) {
      throw new Error("No text to process (Lines 3+).");
    }

    const enc = new TextEncoder();
    const dec = new TextDecoder();

    if (mode === "encrypt") {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(passphrase, salt);

      const cipherBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        enc.encode(content)
      );

      // Format: salt(16) + iv(12) + ciphertext — all base64 encoded together
      const combined = new Uint8Array(salt.length + iv.length + cipherBuffer.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(cipherBuffer), salt.length + iv.length);

      const b64 = toBase64(combined);

      const result = [
        "=== Encrypted Text ===",
        b64,
        "",
        "To decrypt: use this tool with mode=decrypt, same passphrase, and the above ciphertext.",
      ].join("\n");

      return {
        blob: new Blob([result], { type: "text/plain" }),
        filename: "encrypted.txt",
        mimeType: "text/plain",
      };
    } else {
      // Decrypt
      let combined: Uint8Array;
      try {
        combined = fromBase64(content.trim());
      } catch {
        throw new Error("Invalid ciphertext — expected base64 encoded text produced by this tool.");
      }

      if (combined.length < 28) {
        throw new Error("Ciphertext is too short to be valid (minimum 28 bytes: 16 salt + 12 IV).");
      }

      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const ciphertext = combined.slice(28);

      let key: CryptoKey;
      try {
        key = await deriveKey(passphrase, salt);
      } catch {
        throw new Error("Failed to derive key from passphrase.");
      }

      let plainBuffer: ArrayBuffer;
      try {
        plainBuffer = await crypto.subtle.decrypt(
          { name: "AES-GCM", iv },
          key,
          ciphertext
        );
      } catch {
        throw new Error("Decryption failed. The passphrase may be wrong or the ciphertext is corrupted.");
      }

      const plaintext = dec.decode(plainBuffer);
      const result = [
        "=== Decrypted Text ===",
        plaintext,
      ].join("\n");

      return {
        blob: new Blob([result], { type: "text/plain" }),
        filename: "decrypted.txt",
        mimeType: "text/plain",
      };
    }
  },
};

export default textEncryptDecrypt;
