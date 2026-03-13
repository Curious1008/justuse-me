import type { Metadata } from "next";
import type { ToolPlugin } from "@/tools/types";
import { getToolSEOContent } from "./tool-seo-content";

export function generateToolMetadata(tool: ToolPlugin): Metadata {
  const seo = getToolSEOContent(tool.id);
  const description = seo
    ? `${tool.description} ${seo.longDescription.split(". ").slice(0, 2).join(". ")}.`
    : `${tool.description} Free, no ads, no sign-up. Your files stay on your device.`;

  return {
    title: `${tool.name} Online Free`,
    description,
    keywords: tool.keywords,
    alternates: {
      canonical: `https://justuse.me/tools/${tool.id}`,
    },
    openGraph: {
      title: `${tool.name} — Free Online Tool | JustUse.me`,
      description,
      url: `https://justuse.me/tools/${tool.id}`,
      type: "website",
      siteName: "JustUse.me",
    },
    twitter: {
      card: "summary",
      title: `${tool.name} — JustUse.me`,
      description: tool.description,
    },
  };
}

/** JSON-LD for a tool page (WebApplication + FAQPage) */
export function generateToolJsonLd(tool: ToolPlugin) {
  const seo = getToolSEOContent(tool.id);

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: `https://justuse.me/tools/${tool.id}`,
    description: seo?.longDescription ?? tool.description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires a modern web browser",
  };

  const schemas: object[] = [webApp];

  if (seo?.faq?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seo.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    });
  }

  if (seo?.steps?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use ${tool.name}`,
      step: seo.steps.map((text, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text,
      })),
    });
  }

  return schemas;
}

/** JSON-LD for the homepage (WebSite + Organization) */
export function generateSiteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "JustUse.me",
      url: "https://justuse.me",
      description:
        "Free online tools for PDFs, images, and text. No ads, no sign-up, privacy-first.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://justuse.me/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "JustUse.me",
      url: "https://justuse.me",
      description:
        "Clean, ad-free online tools. Your files never leave your device.",
    },
  ];
}
