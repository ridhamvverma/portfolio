"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SelectionFrame } from "@/components/SelectionFrame";
import { links } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/language-context";

export function Contact() {
  const { t } = useLanguage();
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyRequest = useRef(0);

  useEffect(() => () => {
    copyRequest.current += 1;
    if (resetTimer.current !== null) clearTimeout(resetTimer.current);
  }, []);

  async function copyEmail() {
    const request = ++copyRequest.current;
    if (resetTimer.current !== null) clearTimeout(resetTimer.current);
    setCopyStatus("idle");
    let status: "copied" | "error";
    try {
      await navigator.clipboard.writeText(links.email);
      status = "copied";
    } catch {
      status = "error";
    }
    if (request !== copyRequest.current) return;
    setCopyStatus(status);
    resetTimer.current = setTimeout(() => setCopyStatus("idle"), 2000);
  }

  const buttonClassName = "selection-target contact-control inline-flex h-[44px] shrink-0 items-center justify-center rounded-[8px] bg-surface px-[16px] text-label leading-[1.5] font-medium whitespace-nowrap text-ink no-underline hover:text-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-[32px] section-spacing reveal" style={{ animationDelay: "360ms" }}>
      <h2
        id="contact-title"
        className="text-headline-md text-ink"
      >
        {t("contact")}
      </h2>
      <p className="mt-[16px] text-body text-muted">
        {t("contactDescription")}
      </p>
      <button
        type="button"
        onClick={copyEmail}
        aria-label={t("copyEmail", {email: links.email})}
        className="selection-target contact-control mt-[24px] inline-flex max-w-full cursor-pointer items-center justify-center gap-[8px] rounded-[4px] bg-transparent px-[14px] py-[11px] text-body font-medium text-ink no-underline hover:text-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="contact-control-label min-w-0 text-left wrap-anywhere">{links.email}</span>
        {copyStatus === "copied" ? (
          <Check aria-hidden="true" size={14} className="shrink-0" />
        ) : (
          <Copy aria-hidden="true" size={14} className="shrink-0" />
        )}
        <SelectionFrame />
      </button>
      <span role="status" className="sr-only">
        {copyStatus === "copied" ? t("copied") : copyStatus === "error" ? t("copyError") : ""}
      </span>
      <div className="mt-[24px] flex gap-[8px]">
        <a href={links.x} target="_blank" rel="noopener noreferrer" className={buttonClassName}>
          <span className="contact-control-label">X</span>
          <SelectionFrame />
        </a>
        <button
          type="button"
          aria-disabled="true"
          aria-label={t("linkedinUnavailable")}
          title={t("linkedinTitle")}
          className={buttonClassName}
        >
          <span className="contact-control-label">LinkedIn</span>
          <SelectionFrame />
        </button>
      </div>
    </section>
  );
}
