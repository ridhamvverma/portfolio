import { articleSections, type ArticleSection } from "@/lib/articles/be-deep-enough";
import type { Language } from "@/lib/i18n/config";
import { en, type ArticleSectionId, type ArticleTranslation } from "./en";
import { id } from "./id";
import { es } from "./es";
import { fr } from "./fr";
import { de } from "./de";
import { ja } from "./ja";
import { hi } from "./hi";

export const articleTranslations = { en, id, es, fr, de, ja, hi } satisfies Record<Language, ArticleTranslation>;

// Structure, image references, lists, and stable IDs belong to the English source.
// Local dictionaries contain text only, with their exact keys checked by TypeScript.
export function localizeArticle(copy: ArticleTranslation): ArticleSection[] {
  return articleSections.map(section => {
    const fields = copy.sections[section.id as ArticleSectionId] as Record<string, string>;
    const text = (key: string) => {
      const value = fields[key];
      if (typeof value !== "string" || value.length === 0) {
        throw new Error(`Missing article translation: ${section.id}.${key}`);
      }
      return value;
    };
    return {
      ...section,
      title: text("title"),
      blocks: section.blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph": case "quote": return { ...block, text: text(`block${i}`) };
          case "image": return { ...block, alt: text(`block${i}`) };
          case "list": return {
            ...block,
            items: block.items.map((item, j) => ({
              text: text(`block${i}item${j}`),
              ...(item.lead !== undefined ? { lead: text(`block${i}item${j}Lead`) } : {}),
            })),
          };
          case "project": return block;
        }
      }),
    };
  });
}

// Resolve once, locally. No rendering-time requests or paragraph fallbacks.
export const localizedArticleSections = Object.fromEntries(
  Object.entries(articleTranslations).map(([language, copy]) => [language, localizeArticle(copy)]),
) as Record<Language, ArticleSection[]>;
