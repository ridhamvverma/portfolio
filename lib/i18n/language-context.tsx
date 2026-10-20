"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { detectLanguage, isLanguage, LANGUAGE_STORAGE_KEY, type Language, type LanguagePreference } from "./config";
import { translate, type TranslationKey } from "./translations";

type LanguageContextValue = {
  language: Language;
  preference: LanguagePreference;
  browserLanguage: Language;
  setPreference: (value: LanguagePreference) => void;
  t: (key: TranslationKey, values?: Record<string, string>) => string;
};
const LanguageContext = createContext<LanguageContextValue | null>(null);
const TranslationContext = createContext<Pick<LanguageContextValue, "language" | "t"> | null>(null);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [preference, setSelection] = useState<LanguagePreference>("auto");
  const [browserLanguage, setBrowserLanguage] = useState<Language>("en");
  useEffect(() => {
    const detect = () => setBrowserLanguage(detectLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]));
    detect();
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === "auto" || isLanguage(saved)) setSelection(saved);
    } catch { /* The in-memory preference remains usable without storage. */ }
    window.addEventListener("languagechange", detect);
    return () => window.removeEventListener("languagechange", detect);
  }, []);
  const language = preference === "auto" ? browserLanguage : preference;
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const setPreference = useCallback((value: LanguagePreference) => {
    setSelection(value);
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, value); } catch { /* Storage may be unavailable. */ }
  }, []);
  const t = useCallback((key: TranslationKey, values?: Record<string, string>) => translate(language, key, values), [language]);
  const value = useMemo(() => ({ language, preference, browserLanguage, setPreference, t }), [language, preference, browserLanguage, setPreference, t]);
  const translationValue = useMemo(() => ({ language, t }), [language, t]);
  return <LanguageContext.Provider value={value}><TranslationContext.Provider value={translationValue}>{children}</TranslationContext.Provider></LanguageContext.Provider>;
}
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage requires LanguageProvider");
  return value;
}
export function useTranslations() {
  const value = useContext(TranslationContext);
  if (!value) throw new Error("useTranslations requires LanguageProvider");
  return value;
}
export function Text({ id, values }: { id: TranslationKey; values?: Record<string, string> }) {
  const { t } = useTranslations();
  return t(id, values);
}
export function SkipLink() {
  const { t } = useTranslations();
  return <a href="#main" className="skip-link">{t("skip")}</a>;
}
