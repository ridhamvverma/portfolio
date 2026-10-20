"use client";

import { LinkPreview } from "@/components/ui/link-preview";
import { intro } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/language-context";

export function Intro() {
  const { t } = useLanguage();
  const inlineLinks = {
    "{astra}": {text:"Astra", href:intro[1][1].href!},
    "{x}": {text:"X / Twitter", href:intro[2][1].href!},
  };
  return (
    <section aria-label={t("introLabel")} className="mt-[20px] flex flex-col gap-[14px] text-left text-body text-muted section-spacing reveal" style={{animationDelay:"120ms"}}>
      {(["intro1", "intro2", "intro3"] as const).map(key => (
        <p key={key}>
          {t(key).split(/(\{astra\}|\{x\})/).map((text,index) => {
            const link = inlineLinks[text as keyof typeof inlineLinks];
            return link ? (
              <LinkPreview key={index} url={link.href} target="_blank" rel="noopener noreferrer" className="intro-link-underline rounded-[4px] font-normal text-ink transition-[text-decoration-color] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{link.text}</LinkPreview>
            ) : text;
          })}
        </p>
      ))}
    </section>
  );
}
