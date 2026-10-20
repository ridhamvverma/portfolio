"use client";

import { Component, type ReactNode, type RefObject } from "react";
import type { Language } from "@/lib/i18n/config";

type Props = { language: Language; articleRef: RefObject<HTMLElement | null>; children: ReactNode };
type ReadingAnchor = { id: string; fraction: number; viewportTop: number } | null;

// React's snapshot lifecycle reads the old layout before translated text changes
// its height. It needs no scroll listeners and adds no wrapper to the layout.
export class PreserveReadingPosition extends Component<Props> {
  private pendingAnchor: ReadingAnchor = null;

  private readAnchor(): ReadingAnchor {
    const headings = [...(this.props.articleRef.current?.querySelectorAll<HTMLElement>("h2") ?? [])];
    const index = headings.findLastIndex(heading => heading.getBoundingClientRect().top <= 96);
    if (index < 0) return null;
    const activeId = this.props.articleRef.current?.querySelector('nav a[aria-current="location"]')?.getAttribute("href")?.slice(1);
    const heading = headings.find(heading => heading.id === activeId) ?? headings[index];
    const top = heading.getBoundingClientRect().top;
    const section = heading.closest("section")!;
    const height = section.getBoundingClientRect().height;
    return { id: heading.id, fraction: Math.max(0, (96 - top) / height), viewportTop: Math.max(96, top) };
  }

  capture(reset = false) {
    // Save before the existing menu moves keyboard focus back to its trigger.
    const anchor = this.readAnchor();
    if (reset || anchor) this.pendingAnchor = anchor;
  }

  getSnapshotBeforeUpdate(previous: Props): ReadingAnchor {
    if (previous.language === this.props.language) return null;
    const anchor = this.pendingAnchor ?? this.readAnchor();
    this.pendingAnchor = null;
    return anchor;
  }

  componentDidUpdate(_previous: Props, _state: unknown, anchor: ReadingAnchor) {
    if (!anchor) return;
    const heading = document.getElementById(anchor.id);
    const section = heading?.closest("section");
    if (!heading || !section) return;
    const height = section.getBoundingClientRect().height;
    const top = heading.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + Math.min(anchor.fraction, 1) * height - anchor.viewportTop, behavior: "instant" });
  }

  render() { return this.props.children; }
}
