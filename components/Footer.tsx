"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import Image from "next/image";
import { links } from "@/lib/data";

export function Footer() {
  const { t } = useLanguage();
  const linkClassName = "rounded-[4px] text-ink underline decoration-dotted decoration-[#a0a4a8] decoration-[2px] underline-offset-[4px] transition-[text-decoration-color] duration-150 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <footer className="flex flex-col items-center mt-0 pt-0 pb-[64px] text-center text-label leading-[1.5] font-normal text-[#a0a4a8]">
      <Image
        src="/images/ridham-signature.png"
        alt={t("signature")}
        width={141}
        height={57}
        priority={false}
        className="signature-image"
        style={{ width: 96, height: "auto", opacity: 0.85 }}
      />
      <p className="mt-[16px]">
        {t("built")}
        {links.code ? (
          <>
            {t("codePrefix")}
            <a href={links.code} target="_blank" rel="noopener noreferrer" className={linkClassName}>
              {t("code")}
            </a>.
          </>
        ) : null}
      </p>
      <p className="mt-[8px]">
        {t("inspired")}{" "}
        <a href="https://daniasyrofi.com/" target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Dani Asyrofi
        </a>{" "}
        {t("and")}{" "}
        <a href="https://www.manuarora.in/" target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Manu Arora
        </a>.
      </p>
    </footer>
  );
}
