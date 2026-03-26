import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const ATTR_MAP: Record<string, string> = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  rowspan: "rowSpan",
  colspan: "colSpan",
  usemap: "useMap",
  frameborder: "frameBorder",
  contenteditable: "contentEditable",
  crossorigin: "crossOrigin",
  accesskey: "accessKey",
  enctype: "encType",
  formenctype: "formEncType",
  inputmode: "inputMode",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
};

// Self-closing tags in HTML5
const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

function convertStyleAttr(styleStr: string): string {
  // Convert CSS inline style string to JSX object notation
  const pairs = styleStr.split(";").filter((s) => s.trim());
  const entries = pairs.map((pair) => {
    const colonIdx = pair.indexOf(":");
    if (colonIdx === -1) return null;
    const prop = pair.slice(0, colonIdx).trim();
    const val = pair.slice(colonIdx + 1).trim();
    // camelCase the property
    const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return `${camel}: "${val}"`;
  }).filter(Boolean);
  return `{{ ${entries.join(", ")} }}`;
}

function convertHtmlToJsx(html: string): string {
  let result = html;

  // Convert style attributes
  result = result.replace(/style="([^"]*)"/g, (_, styleStr) => {
    return `style=${convertStyleAttr(styleStr)}`;
  });

  // Convert attribute names
  result = result.replace(/\b([a-zA-Z-]+)=/g, (match, attr) => {
    const lower = attr.toLowerCase();
    if (ATTR_MAP[lower]) {
      return `${ATTR_MAP[lower]}=`;
    }
    return match;
  });

  // Convert event handlers: onclick -> onClick, onchange -> onChange, etc.
  result = result.replace(/\bon([a-z]+)=/gi, (_, event) => {
    return `on${event.charAt(0).toUpperCase()}${event.slice(1)}=`;
  });

  // Self-close void elements that aren't already self-closed
  VOID_ELEMENTS.forEach((tag) => {
    const regex = new RegExp(`<(${tag})(\\s[^>]*)?>(?!\\s*</${tag}>)`, "gi");
    result = result.replace(regex, (_, t, attrs) => {
      return `<${t}${attrs || ""} />`;
    });
  });

  // Convert HTML comments to JSX comments (best effort)
  result = result.replace(/<!--([\s\S]*?)-->/g, (_, content) => {
    return `{/*${content}*/}`;
  });

  return result;
}

const htmlToJsx: ToolPlugin = {
  id: "html-to-jsx",
  category: "developer",
  name: "HTML to JSX",
  description: "Convert HTML markup to JSX-compatible React syntax (className, htmlFor, self-closing tags, style objects).",
  keywords: [
    "html to jsx",
    "react jsx",
    "convert html",
    "className",
    "react component",
    "html converter",
  ],
  icon: "</>",

  inputMode: "text",
  textPlaceholder: "Paste HTML to convert to JSX",
  textButtonLabel: "Convert to JSX",
  acceptedTypes: ["text/plain", "text/html"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const html = await files[0].text();

    if (!html.trim()) {
      throw new Error("Please provide some HTML to convert.");
    }

    const jsx = convertHtmlToJsx(html);

    const result = `// JSX output — paste inside a React component's return statement\n\n${jsx}`;
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "component.jsx",
      mimeType: "text/plain",
    };
  },
};

export default htmlToJsx;
