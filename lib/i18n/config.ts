export const languageCodes = ["en", "id", "es", "fr", "de", "ja", "hi"] as const;
export type Language = (typeof languageCodes)[number];
export type LanguagePreference = Language | "auto";
export const languageNames: Record<Language, string> = {
  en: "English", id: "Bahasa Indonesia", es: "Español", fr: "Français", de: "Deutsch", ja: "日本語", hi: "हिन्दी",
};
export const LANGUAGE_STORAGE_KEY = "portfolio-language";
export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && languageCodes.includes(value as Language);
}
export function detectLanguage(preferences: readonly string[]): Language {
  for (const locale of preferences) {
    const base = locale.toLowerCase().split(/[-_]/)[0];
    if (isLanguage(base)) return base;
  }
  return "en";
}
