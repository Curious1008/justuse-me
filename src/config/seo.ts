import type { Metadata } from "next";
import type { ToolPlugin } from "@/tools/types";
import { getToolSEOContent } from "./tool-seo-content";

const ORG_ID = "https://www.justuse.me/#organization";

function localeUrl(locale: string, path: string): string {
  return locale === "en"
    ? `https://www.justuse.me${path}`
    : `https://www.justuse.me/${locale}${path}`;
}

type FaqItem = { q: string; a: string };

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
      canonical: `https://www.justuse.me/tools/${tool.id}`,
    },
    openGraph: {
      title: `${tool.name} — Free Online Tool | JustUse.me`,
      description,
      url: `https://www.justuse.me/tools/${tool.id}`,
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
export function generateToolJsonLd(
  tool: ToolPlugin,
  locale = "en",
  localeFaq?: FaqItem[],
  localeLongDescription?: string
) {
  const baseSeo = getToolSEOContent(tool.id);
  const faq = localeFaq?.length ? localeFaq : baseSeo?.faq;
  const description = localeLongDescription ?? baseSeo?.longDescription ?? tool.description;

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    dateModified: "2026-04-18",
    url: localeUrl(locale, `/tools/${tool.id}`),
    description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    provider: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
    browserRequirements: "Requires a modern web browser",
    featureList: [
      "100% browser-based processing",
      "No file uploads to servers",
      "No account or sign-up required",
      "No watermarks on output",
      "Free to use",
    ],
    screenshot: {
      "@type": "ImageObject",
      url: localeUrl(locale, `/tools/${tool.id}/opengraph-image`),
      width: 1200,
      height: 630,
    },
  };

  const schemas: object[] = [webApp];

  if (faq?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    });
  }

  return schemas;
}

/** BreadcrumbList JSON-LD for category pages */
export function generateCategoryBreadcrumbJsonLd(category: string, categoryLabel: string, locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: localeUrl(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel,
        item: localeUrl(locale, `/${category}`),
      },
    ],
  };
}

/** BreadcrumbList JSON-LD for tool pages */
export function generateToolBreadcrumbJsonLd(
  tool: ToolPlugin,
  categoryLabel: string,
  locale = "en"
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: localeUrl(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel,
        item: localeUrl(locale, `/${tool.category}`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: localeUrl(locale, `/tools/${tool.id}`),
      },
    ],
  };
}

/** JSON-LD for the homepage (WebSite + Organization) */
export function generateSiteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "JustUse.me",
      url: "https://www.justuse.me",
      description:
        "Free online tools for PDFs, images, and text. No ads, no sign-up, privacy-first.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.justuse.me/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: "JustUse.me",
      legalName: "Paymomentum LLC",
      url: "https://www.justuse.me",
      description:
        "Clean, ad-free online tools. Your files never leave your device.",
      logo: {
        "@type": "ImageObject",
        url: "https://www.justuse.me/favicon.png",
        width: 48,
        height: 48,
      },
    },
  ];
}
