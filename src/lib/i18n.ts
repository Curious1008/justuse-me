export type Locale = "en" | "zh-CN" | "zh-TW";

export const locales: Locale[] = ["en", "zh-CN", "zh-TW"];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

export type Dictionary = typeof import("@/locales/en").default;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "zh-CN":
      return (await import("@/locales/zh-CN")).default;
    case "zh-TW":
      return (await import("@/locales/zh-TW")).default;
    default:
      return (await import("@/locales/en")).default;
  }
}

/** Build a locale-prefixed path. English uses no prefix. */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}
