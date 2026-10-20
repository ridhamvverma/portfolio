"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import Image from "next/image";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-[12px] rounded-[8px] no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Image
        src={project.image}
        alt={t("appIcon", { name: project.title })}
        width={36}
        height={36}
        sizes="36px"
        className="size-[36px] shrink-0 rounded-[8px] object-contain"
      />
      <div className="min-w-0 text-[14px] leading-[1.6] min-[520px]:text-[15px]">
        <h3 className="inline font-medium text-ink">
          {project.title}
        </h3>{" "}
        <span aria-hidden="true" className="text-muted">·</span>{" "}
        <p className="inline font-normal text-muted">{t("projectDescription")}</p>
      </div>
    </a>
  );
}
