"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { articlePath } from "@/lib/articles/be-deep-enough";
import { posts, samplePosts } from "@/lib/data";

export function Writing() {
  const { t } = useLanguage();
  const list = posts.length > 0 ? posts : (process.env.NODE_ENV === "development" ? samplePosts : []);
  const sortedPosts = [...list].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return (
    <section id="writing" aria-labelledby="writing-title" className="section-spacing reveal" style={{ animationDelay: "240ms" }}>
      <h2
        id="writing-title"
        className="mb-[16px] text-headline-md text-ink"
      >
        {t("writing")}
      </h2>
      {sortedPosts.length > 0 ? (
        <ul className="m-0 list-none p-0">
          {sortedPosts.map((post) => (
            <li key={post.href + post.title}>
              <Link
                href={post.href}
                {...(/^https?:\/\//i.test(post.href)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="writing-entry flex flex-col items-start gap-[8px] rounded-[4px] pb-[16px] no-underline min-[640px]:flex-row min-[640px]:items-baseline min-[640px]:justify-between min-[640px]:gap-[24px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="writing-entry-title min-w-0 text-[16px] leading-[1.4] font-medium min-[520px]:text-[17px]">
                  {samplePosts.includes(post) ? t((["sample1", "sample2", "sample3"] as const)[samplePosts.indexOf(post)]) : post.href === articlePath ? t("firstArticleTitle") : post.title}
                </span>
                {post.date && <time
                  dateTime={post.date}
                  className="shrink-0 whitespace-nowrap text-[13px] leading-[18px] font-normal text-muted/70 tabular-nums"
                >
                  {post.date.split("-").reverse().join("-")}
                </time>}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-body-sm font-normal text-muted">
          {t("writingEmpty")}
        </p>
      )}
    </section>
  );
}
