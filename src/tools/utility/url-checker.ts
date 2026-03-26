import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const urlChecker: ToolPlugin = {
  id: "url-checker",
  category: "utility",
  name: "URL Checker",
  description: "Analyze a URL for structure, query parameters, and suspicious patterns like phishing indicators.",
  keywords: [
    "URL checker",
    "URL analyzer",
    "phishing checker",
    "link checker",
    "URL scanner",
    "suspicious URL",
  ],
  icon: "🔗",

  inputMode: "text",
  textPlaceholder: "Enter a URL to analyze\nExample: https://example.com/path?q=test",
  textButtonLabel: "Check URL",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a URL to analyze.");

    // Attempt to parse — add https:// if no protocol given
    let urlStr = text;
    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(urlStr)) {
      urlStr = "https://" + urlStr;
    }

    let url: URL;
    try {
      url = new URL(urlStr);
    } catch {
      throw new Error(`"${text}" is not a valid URL. Include the full URL, e.g. https://example.com.`);
    }

    const lines: string[] = [];

    // === Structure ===
    lines.push("=== URL Structure ===");
    lines.push(`Full URL:    ${urlStr}`);
    lines.push(`Protocol:    ${url.protocol}`);
    lines.push(`Host:        ${url.hostname}`);
    if (url.port) lines.push(`Port:        ${url.port}`);
    lines.push(`Path:        ${url.pathname || "/"}`);
    if (url.search) lines.push(`Query:       ${url.search}`);
    if (url.hash) lines.push(`Fragment:    ${url.hash}`);

    // === Query Parameters ===
    const params = [...url.searchParams.entries()];
    if (params.length > 0) {
      lines.push("");
      lines.push("=== Query Parameters ===");
      for (const [key, val] of params) {
        lines.push(`  ${key} = ${val}`);
      }
    }

    // === Analysis ===
    const warnings: string[] = [];
    const info: string[] = [];

    // IP address hostname
    const ipPattern = /^\d{1,3}(\.\d{1,3}){3}$/;
    if (ipPattern.test(url.hostname)) {
      warnings.push("Hostname is an IP address — legitimate sites rarely use bare IPs.");
    }

    // Non-standard port
    const standardPorts: Record<string, string[]> = {
      "http:": ["80", ""],
      "https:": ["443", ""],
    };
    if (url.port && !standardPorts[url.protocol]?.includes(url.port)) {
      warnings.push(`Non-standard port ${url.port} — verify this is expected.`);
    }

    // Subdomain count
    const parts = url.hostname.split(".");
    const subdomains = parts.length - 2;
    if (subdomains >= 3) {
      warnings.push(`Excessive subdomains (${subdomains}) — phishing sites often use long subdomains to obscure real domain.`);
    }

    // Common phishing TLDs
    const suspiciousTlds = [".xyz", ".top", ".club", ".work", ".click", ".link", ".gq", ".tk", ".ml", ".cf", ".ga"];
    const tldMatch = suspiciousTlds.find((t) => url.hostname.endsWith(t));
    if (tldMatch) {
      warnings.push(`TLD "${tldMatch}" is commonly associated with phishing or spam sites.`);
    }

    // Suspicious keywords in domain
    const phishingKeywords = ["login", "signin", "account", "verify", "secure", "update", "bank", "paypal", "amazon", "apple", "google", "microsoft"];
    const domainLower = url.hostname.toLowerCase();
    for (const kw of phishingKeywords) {
      if (domainLower.includes(kw)) {
        warnings.push(`Suspicious keyword "${kw}" found in domain — may be impersonating a trusted service.`);
        break;
      }
    }

    // HTTP (not HTTPS)
    if (url.protocol === "http:") {
      warnings.push("Connection is not encrypted (HTTP). Avoid submitting sensitive data over HTTP.");
    } else if (url.protocol === "https:") {
      info.push("Uses HTTPS (encrypted connection).");
    }

    // Data URI or javascript:
    if (["javascript:", "data:", "vbscript:"].includes(url.protocol)) {
      warnings.push(`Protocol "${url.protocol}" can be used for code injection attacks.`);
    }

    // Long URL
    if (urlStr.length > 200) {
      info.push(`URL is long (${urlStr.length} chars) — may be obfuscating the destination.`);
    }

    // Encoded characters in path/query (common in phishing)
    const encodedCount = (urlStr.match(/%[0-9a-f]{2}/gi) ?? []).length;
    if (encodedCount > 5) {
      warnings.push(`URL contains many percent-encoded characters (${encodedCount}) — could be obfuscating content.`);
    }

    lines.push("");
    lines.push("=== Security Analysis ===");

    if (warnings.length === 0 && info.length === 0) {
      lines.push("No suspicious patterns detected.");
    }

    for (const w of warnings) {
      lines.push(`[WARNING] ${w}`);
    }
    for (const i of info) {
      lines.push(`[INFO]    ${i}`);
    }

    if (warnings.length > 0) {
      lines.push("");
      lines.push(`Risk indicators: ${warnings.length}. Always verify URLs before clicking or submitting data.`);
    } else if (info.length > 0) {
      lines.push("");
      lines.push("No risk indicators found. The URL appears structurally normal.");
    }

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "url-analysis.txt",
      mimeType: "text/plain",
    };
  },
};

export default urlChecker;
