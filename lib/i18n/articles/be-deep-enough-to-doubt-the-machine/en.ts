// English prose comes directly from the published source; do not rewrite it here.
import { articleSections, articleSummary } from "@/lib/articles/be-deep-enough";
import { translations } from "@/lib/i18n/translations";

function text(section: number, block: number) {
  const value = articleSections[section].blocks[block];
  if (value.type === "paragraph" || value.type === "quote") return value.text;
  if (value.type === "image") return value.alt;
  throw new Error("Expected article text or image alt text");
}
function listText(section: number, block: number, item: number, lead = false) {
  const value = articleSections[section].blocks[block];
  if (value.type !== "list") throw new Error("Expected an article list");
  const result = lead ? value.items[item].lead : value.items[item].text;
  if (result === undefined) throw new Error("Missing article list text");
  return result;
}

export const en = {
  title: translations.en.firstArticleTitle,
  summary: articleSummary,
  byline: "By Ridham Verma",
  backWriting: "← Writing",
  backToWriting: "← Back to Writing",
  onThisPage: "On this page",
  sectionsLabel: "Article sections",
  portfolioLabel: "Back to Ridham Verma’s portfolio",
  sections: {
    "the-demo-that-worked-perfectly": {
      title: articleSections[0].title,
      block0: text(0, 0),
      block1: text(0, 1),
      block2: text(0, 2),
      block3: text(0, 3),
    },
    "the-debate-everyone-knows": {
      title: articleSections[1].title,
      block0: text(1, 0),
      block1: text(1, 1),
    },
    "what-ai-takes-away-from-both-sides": {
      title: articleSections[2].title,
      block0: text(2, 0),
      block1: text(2, 1),
      block2: text(2, 2),
      block3: text(2, 3),
    },
    "depth-is-now-a-verification-skill": {
      title: articleSections[3].title,
      block0: text(3, 0),
      block1: text(3, 1),
      block2: text(3, 2),
      block3: text(3, 3),
    },
    "specialize-in-a-problem-not-a-tool": {
      title: articleSections[4].title,
      block0: text(4, 0),
      block1: text(4, 1),
      block2: text(4, 2),
      block3: text(4, 3),
    },
    "learning-how-to-learn-is-the-durable-specialty": {
      title: articleSections[5].title,
      block0: text(5, 0),
      block1item0: listText(5, 1, 0),
      block1item1: listText(5, 1, 1),
      block1item2: listText(5, 1, 2),
      block1item3: listText(5, 1, 3),
      block2: text(5, 2),
      block3: text(5, 3),
      block4: text(5, 4),
    },
    "the-trap-of-the-fast-answer": {
      title: articleSections[6].title,
      block0: text(6, 0),
      block1: text(6, 1),
      block2: text(6, 2),
      block3: text(6, 3),
    },
    "wont-my-expertise-expire-before-i-finish-building-it": {
      title: articleSections[7].title,
      block0: text(7, 0),
      block1: text(7, 1),
      block2: text(7, 2),
    },
    "what-id-do-if-i-started-today": {
      title: articleSections[8].title,
      block0item0Lead: listText(8, 0, 0, true),
      block0item0: listText(8, 0, 0),
      block0item1Lead: listText(8, 0, 1, true),
      block0item1: listText(8, 0, 1),
      block0item2Lead: listText(8, 0, 2, true),
      block0item2: listText(8, 0, 2),
      block0item3Lead: listText(8, 0, 3, true),
      block0item3: listText(8, 0, 3),
      block2: text(8, 2),
    },
    "back-to-the-demo": {
      title: articleSections[9].title,
      block0: text(9, 0),
      block1: text(9, 1),
      block2: text(9, 2),
    },
  },
};

type StringShape<T> = { [K in keyof T]: T[K] extends string ? string : StringShape<T[K]> };
export type ArticleTranslation = StringShape<typeof en>;
export type ArticleSectionId = keyof ArticleTranslation["sections"];
