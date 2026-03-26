import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

interface StatusCode {
  code: number;
  name: string;
  description: string;
  useCase: string;
}

const STATUS_CODES: StatusCode[] = [
  // 1xx
  { code: 100, name: "Continue", description: "The server has received the request headers and the client should proceed.", useCase: "Client sends Expect: 100-continue header before large request body." },
  { code: 101, name: "Switching Protocols", description: "Server is switching protocols as requested by the client.", useCase: "WebSocket upgrade from HTTP." },
  { code: 102, name: "Processing", description: "Server has received and is processing the request, no response available yet.", useCase: "Long-running requests (WebDAV)." },
  // 2xx
  { code: 200, name: "OK", description: "The request has succeeded.", useCase: "Standard successful GET, POST, PUT, PATCH responses." },
  { code: 201, name: "Created", description: "The request has been fulfilled and a new resource has been created.", useCase: "Successful POST that creates a new resource." },
  { code: 202, name: "Accepted", description: "The request has been accepted for processing, but processing has not been completed.", useCase: "Async operations or batch processing." },
  { code: 204, name: "No Content", description: "The server successfully processed the request but is not returning any content.", useCase: "Successful DELETE or PUT with no response body." },
  { code: 206, name: "Partial Content", description: "The server is delivering only part of the resource due to a range header.", useCase: "Video streaming, file download resume." },
  // 3xx
  { code: 301, name: "Moved Permanently", description: "The URL of the requested resource has been changed permanently.", useCase: "SEO-friendly permanent redirects (e.g. HTTP → HTTPS)." },
  { code: 302, name: "Found", description: "The URI of requested resource has been changed temporarily.", useCase: "Temporary redirects, login redirects." },
  { code: 304, name: "Not Modified", description: "There is no need to retransmit the requested resources (cached version is still valid).", useCase: "Browser cache validation with ETag/Last-Modified headers." },
  { code: 307, name: "Temporary Redirect", description: "The request should be repeated with another URI but future requests should use the original URI.", useCase: "Temporary redirect preserving the HTTP method." },
  { code: 308, name: "Permanent Redirect", description: "The request and future requests should be repeated using another URI (method preserved).", useCase: "Permanent redirect preserving HTTP method (unlike 301)." },
  // 4xx
  { code: 400, name: "Bad Request", description: "The server cannot or will not process the request due to client error.", useCase: "Malformed request syntax, invalid parameters." },
  { code: 401, name: "Unauthorized", description: "Authentication is required and has failed or has not been provided.", useCase: "Missing or invalid API key/token." },
  { code: 403, name: "Forbidden", description: "The server understood the request but refuses to authorize it.", useCase: "Authenticated but insufficient permissions." },
  { code: 404, name: "Not Found", description: "The server can not find the requested resource.", useCase: "Page or resource does not exist." },
  { code: 405, name: "Method Not Allowed", description: "The request method is not supported for the requested resource.", useCase: "Sending POST to a GET-only endpoint." },
  { code: 408, name: "Request Timeout", description: "The server would like to shut down this unused connection.", useCase: "Client took too long to send a request." },
  { code: 409, name: "Conflict", description: "The request could not be completed due to a conflict with the current state of the resource.", useCase: "Duplicate resource creation, version conflicts." },
  { code: 410, name: "Gone", description: "The resource requested is no longer available and will not be available again.", useCase: "Permanently deleted resources." },
  { code: 422, name: "Unprocessable Entity", description: "The request was well-formed but contained semantic errors.", useCase: "Validation errors in REST APIs." },
  { code: 429, name: "Too Many Requests", description: "The user has sent too many requests in a given amount of time (rate limiting).", useCase: "API rate limiting." },
  // 5xx
  { code: 500, name: "Internal Server Error", description: "The server encountered an unexpected condition that prevented it from fulfilling the request.", useCase: "Unhandled exceptions, server bugs." },
  { code: 501, name: "Not Implemented", description: "The request method is not supported by the server and cannot be handled.", useCase: "Server does not support the functionality required." },
  { code: 502, name: "Bad Gateway", description: "The server, while acting as a gateway or proxy, received an invalid response from the upstream server.", useCase: "Reverse proxy can't reach the backend." },
  { code: 503, name: "Service Unavailable", description: "The server is not ready to handle the request, often due to maintenance or overload.", useCase: "Server is down for maintenance or overloaded." },
  { code: 504, name: "Gateway Timeout", description: "The server, acting as a gateway, did not get a response in time from the upstream server.", useCase: "Backend timed out, slow database queries." },
];

function formatCode(sc: StatusCode): string {
  const lines: string[] = [];
  lines.push(`${sc.code} ${sc.name}`);
  lines.push(`${"─".repeat(sc.name.length + 4)}`);
  lines.push(`Description: ${sc.description}`);
  lines.push(`Use case:    ${sc.useCase}`);
  return lines.join("\n");
}

const httpStatusCodes: ToolPlugin = {
  id: "http-status-codes",
  category: "developer",
  name: "HTTP Status Codes",
  description: "Look up HTTP status codes by number or keyword, with descriptions and common use cases.",
  keywords: [
    "http status",
    "status code",
    "404",
    "500",
    "http error",
    "rest api",
    "http codes",
  ],
  icon: "🌐",

  inputMode: "text",
  textPlaceholder: "Enter HTTP status code (e.g. 404) or search keyword",
  textButtonLabel: "Look Up",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim().toLowerCase();

    let results: StatusCode[];

    if (!raw || raw === "all") {
      // List all codes
      results = STATUS_CODES;
    } else if (/^\d{3}$/.test(raw)) {
      // Exact code lookup
      const code = parseInt(raw, 10);
      results = STATUS_CODES.filter((sc) => sc.code === code);
      if (results.length === 0) {
        throw new Error(`HTTP status code ${raw} is not in the standard reference. It may be a non-standard or vendor-specific code.`);
      }
    } else {
      // Keyword search
      results = STATUS_CODES.filter(
        (sc) =>
          sc.name.toLowerCase().includes(raw) ||
          sc.description.toLowerCase().includes(raw) ||
          sc.useCase.toLowerCase().includes(raw) ||
          String(sc.code).includes(raw)
      );
      if (results.length === 0) {
        throw new Error(`No HTTP status codes found matching "${raw}".`);
      }
    }

    const sections: string[] = [];

    if (!raw || raw === "all") {
      sections.push("=== All HTTP Status Codes ===\n");
    } else {
      sections.push(`=== Results for "${raw}" ===\n`);
    }

    // Group by category
    const groups: Record<string, StatusCode[]> = {
      "1xx Informational": results.filter((s) => s.code < 200),
      "2xx Success": results.filter((s) => s.code >= 200 && s.code < 300),
      "3xx Redirection": results.filter((s) => s.code >= 300 && s.code < 400),
      "4xx Client Errors": results.filter((s) => s.code >= 400 && s.code < 500),
      "5xx Server Errors": results.filter((s) => s.code >= 500),
    };

    for (const [groupName, codes] of Object.entries(groups)) {
      if (codes.length === 0) continue;
      sections.push(`\n${"=".repeat(groupName.length + 4)}`);
      sections.push(`  ${groupName}`);
      sections.push(`${"=".repeat(groupName.length + 4)}\n`);
      sections.push(codes.map(formatCode).join("\n\n"));
    }

    const result = sections.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "http-status-codes.txt",
      mimeType: "text/plain",
    };
  },
};

export default httpStatusCodes;
