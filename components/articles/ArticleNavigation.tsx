"use client";

import { useSyncExternalStore } from "react";
import { RailToc } from "@/components/ui/rail-toc";
import type { RailTocItem } from "@/components/ui/rail-toc";

const query = "(min-width: 1120px)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => false;

export function ArticleNavigation({ items, title, sectionsLabel }: { items: RailTocItem[]; title: string; sectionsLabel: string }) {
  const desktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Only one interactive rail is mounted, including when crossing the breakpoint.
  return desktop ? (
    <aside className="article-navigation">
      <div className="article-navigation-sticky">
        <RailToc items={items} title={title} />
      </div>
    </aside>
  ) : (
    <details className="article-navigation article-navigation-mobile">
      <summary>{title}</summary>
      <RailToc items={items} title={sectionsLabel} />
    </details>
  );
}
