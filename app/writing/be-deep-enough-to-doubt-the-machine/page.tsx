import type { Metadata } from "next";
import { articlePath, articleSummary, articleTitle } from "@/lib/articles/be-deep-enough";
import { ArticleReader } from "@/components/articles/ArticleReader";

export const metadata: Metadata = {
  title: `${articleTitle} · Ridham Verma`,
  description: articleSummary,
  authors: [{ name: "Ridham Verma" }],
  alternates: { canonical: articlePath },
  openGraph: { title: articleTitle, description: articleSummary, type: "article", url: articlePath, authors: ["Ridham Verma"] },
  twitter: { card: "summary_large_image", title: articleTitle, description: articleSummary },
};

export default function ArticlePage() {
  return <ArticleReader />;
}
