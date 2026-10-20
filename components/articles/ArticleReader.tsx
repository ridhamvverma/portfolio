"use client";

import { useMemo, useRef } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { articleTranslations, localizedArticleSections } from "@/lib/i18n/articles/be-deep-enough-to-doubt-the-machine";
import { PreserveReadingPosition } from "./PreserveReadingPosition";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { ArticleNavigation } from "@/components/articles/ArticleNavigation";
import type { ArticleBlock } from "@/lib/articles/be-deep-enough";
import { projects } from "@/lib/data";
import demo from "@/public/images/articles/be-deep-enough-to-doubt-the-machine/demo-that-worked-perfectl.webp";
import review from "@/public/images/articles/be-deep-enough-to-doubt-the-machine/depth-verification-code-review-des.webp";
import problem from "@/public/images/articles/be-deep-enough-to-doubt-the-machine/specialize-in-a-problem-hub.webp";
import judgment from "@/public/images/articles/be-deep-enough-to-doubt-the-machine/judgment-and-curiosity-t-diagram.webp";
import untangle from "@/public/images/articles/be-deep-enough-to-doubt-the-machine/trap-of-the-fast-answer-untangle.webp";
import issues from "@/public/images/articles/be-deep-enough-to-doubt-the-machine/project-issues-dashboard.webp";
import styles from "@/app/writing/be-deep-enough-to-doubt-the-machine/page.module.css";

const images = {
  "demo-that-worked-perfectl": demo,
  "depth-verification-code-review-des": review,
  "specialize-in-a-problem-hub": problem,
  "judgment-and-curiosity-t-diagram": judgment,
  "trap-of-the-fast-answer-untangle": untangle,
  "project-issues-dashboard": issues,
};

function Block({ block }: { block: ArticleBlock }) {
  const { t } = useLanguage();
  switch (block.type) {
    case "paragraph": return <p>{block.text}</p>;
    case "quote": return <blockquote><p>{block.text}</p></blockquote>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return <List>{block.items.map(item => <li key={item.lead ?? item.text}>{item.lead && <strong>{item.lead}</strong>}{item.text}</li>)}</List>;
    }
    case "project": {
      const astra = projects.find(project => project.title === "Astra");
      return astra ? <p><a href={astra.href} target="_blank" rel="noopener noreferrer">{astra.title}</a> — {t("projectDescription")}</p> : null;
    }
    case "image": return (
      <figure>
        <Image src={images[block.name as keyof typeof images]} alt={block.alt}
          sizes="(max-width: 719px) calc(100vw - 40px), 680px" />
      </figure>
    );
  }
}

export function ArticleReader() {
  const { language } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const readingPosition = useRef<PreserveReadingPosition>(null);
  const copy = articleTranslations[language];
  const sections = localizedArticleSections[language];
  const items = useMemo(() => sections.map(({ id, title }) => ({ id, label: title })), [sections]);
  return (
    <div className={styles.shell}>
      <div className={styles.topbar}
        onPointerDownCapture={event => {
          if ((event.target as Element).closest('[aria-haspopup="menu"]')) readingPosition.current?.capture(true);
          if ((event.target as Element).closest('[role="menuitemradio"]')) readingPosition.current?.capture();
        }}
        onClickCapture={event => {
          if ((event.target as Element).closest('[aria-haspopup="menu"], [role="menuitemradio"]')) readingPosition.current?.capture();
        }}>
        <TopBar />
      </div>
      <main id="main" tabIndex={-1}>
        <PreserveReadingPosition ref={readingPosition} language={language} articleRef={root}>
          <article ref={root} lang={language} className={styles.article} aria-labelledby="article-title">
            <header className={styles.header}>
              <Link href="/#writing" className={styles.back}>{copy.backWriting}</Link>
              <h1 id="article-title">{copy.title}</h1>
              <p className={styles.author}>{copy.byline}</p>
              <p className={styles.summary}>{copy.summary}</p>
            </header>
            <ArticleNavigation items={items} title={copy.onThisPage} sectionsLabel={copy.sectionsLabel} />
            <div className={styles.body}>
              {sections.map(section => (
                <section key={section.id} aria-labelledby={section.id}>
                  <h2 id={section.id} tabIndex={-1}>{section.title}</h2>
                  {section.blocks.map((block, index) => <Block key={index} block={block} />)}
                </section>
              ))}
              <footer className={styles.ending}>
                <Link href="/#writing">{copy.backToWriting}</Link>
                <Link href="/" aria-label={copy.portfolioLabel}>Ridham Verma ↗</Link>
              </footer>
            </div>
          </article>
        </PreserveReadingPosition>
      </main>
    </div>
  );
}
