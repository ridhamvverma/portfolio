"use client";

import { ChevronDown, Languages } from "lucide-react";
import { languageCodes, languageNames, type LanguagePreference } from "@/lib/i18n/config";
import { useLanguage } from "@/lib/i18n/language-context";
import { AppearanceControl } from "./AppearanceControl";
import { PreferenceMenu } from "./PreferenceMenu";
export function HeaderControls() {
  const { language, preference, browserLanguage, setPreference, t } = useLanguage();
  return (
    <div className="header-controls">
      <PreferenceMenu label={t("languageLabel", {language: languageNames[language], code: language.toUpperCase()})} heading={t("language")} value={preference}
        onSelect={value => setPreference(value as LanguagePreference)}
        trigger={<><Languages size={16} aria-hidden="true" /><span className="language-code">{language.toUpperCase()}</span><ChevronDown size={12} aria-hidden="true" /></>}
        items={[
          {value:"auto", label:t("automatic"), description:`${t("browserLanguage")} · ${languageNames[browserLanguage]}`, separatorAfter:true},
          ...languageCodes.map(code => ({value:code, label:languageNames[code], lang:code})),
        ]} />
      <span aria-hidden="true" className="header-separator" />
      <AppearanceControl />
    </div>
  );
}
