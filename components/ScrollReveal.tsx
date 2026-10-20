"use client";

import { useLayoutEffect } from "react";
import styles from "./ScrollReveal.module.css";
import { lineTiming, revealLines } from "./scroll-reveal-lines";

export type RevealGroup = {
  id: string;
  sequential?: boolean;
  /** The signature follows footer completion, without another viewport gate. */
  followPrevious?: boolean;
  /** Observe the leading element, even when the section is very tall. */
  trigger: string;
  items: readonly { selector: string; delay: number; lines?: boolean }[];
  distance?: number;
  duration?: number;
};

const timing = {
  duration: 550,
  distance: 12,
  threshold: 0.12,
  rootMargin: "0px 0px 64px 0px",
} as const;

/** Enhances existing elements without wrappers, render gates, or scroll handlers. */
export function ScrollReveal({ groups }: { groups: readonly RevealGroup[] }) {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".page-shell");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || reduced.matches || !("IntersectionObserver" in window)) return;

    type Section = {
      id: string;
      sequential: boolean;
      trigger: HTMLElement;
      boundary: HTMLElement;
      elements: HTMLElement[];
      ready: boolean;
      immediate: boolean;
      state: "waiting" | "running" | "done";
    };
    const targets = new Map<HTMLElement, Section>();
    const exits = new Map<HTMLElement, Section>();
    const sections: Section[] = [];
    const owners = new Map<HTMLElement, Section>();
    let initialized = false;
    let disposed = false;
    let batching = false;
    let cursor = 0;
    const lineItems = new Set<HTMLElement>();
    const activeLines = new Map<HTMLElement, { cleanup: () => void; width: number; height: number }>();
    const childCompletions = new Map<HTMLElement, () => void>();
    const childTimers = new Set<number>();
    const cleanups: (() => void)[] = [];
    const properties = ["distance", "duration", "delay", "opacity"] as const;

    const finish = (element: HTMLElement) => {
      if (element.dataset.scrollReveal === "done") return;
      activeLines.get(element)?.cleanup();
      activeLines.delete(element);
      resize?.unobserve(element);
      if (!activeLines.size) mutations.disconnect();
      element.classList.remove(styles.pending, styles.running);
      element.dataset.scrollReveal = "done";
      properties.forEach(key => element.style.removeProperty(`--scroll-reveal-${key}`));
      const section = owners.get(element);
      if (section?.state === "running" && section.elements.every(item => item.dataset.scrollReveal === "done")) {
        section.state = "done";
        for (const exit of [section.boundary, section.elements[section.elements.length - 1]]) {
          observer.unobserve(exit);
          exits.delete(exit);
        }
        // Completion comes from every child's actual animation callback, never
        // an estimated section duration or the viewport observer.
        advance();
      }
      const next = childCompletions.get(element);
      childCompletions.delete(element);
      if (!disposed) next?.();
    };

    // Geometry is measured only at reveal time. If it changes during the brief
    // entrance, show the semantic original immediately; never freeze old wraps.
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(entries => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        const active = activeLines.get(element);
        if (active && (Math.abs(entry.contentRect.width - active.width) > 0.5 ||
          Math.abs(entry.contentRect.height - active.height) > 0.5)) finish(element);
      });
    });
    const mutations = new MutationObserver(records => {
      records.forEach(record => {
        activeLines.forEach((_, element) => {
          if (record.target === document.documentElement || element.contains(record.target)) finish(element);
        });
      });
    });
    const finishLines = () => activeLines.forEach((_, element) => finish(element));

    const play = (entry: Section) => {
      entry.state = "running";
      if (!exits.has(entry.trigger)) observer.unobserve(entry.trigger);
      targets.delete(entry.trigger);
      const playElement = (element: HTMLElement, sequential: boolean) => {
        if (entry.immediate || element.getBoundingClientRect().bottom <= 0) { finish(element); return; }
        // Internal waves manage their own starts; standalone groups use their item stagger.
        const delay = sequential ? 0 : parseFloat(element.style.getPropertyValue("--scroll-reveal-delay")) / 1000;
        element.style.setProperty("--scroll-reveal-delay", `${delay * 1000}ms`);
        if (lineItems.has(element)) {
          const bounds = element.getBoundingClientRect();
          const reveal = revealLines(element, { delay }, () => finish(element));
          if (reveal) {
            activeLines.set(element, { cleanup: reveal.cleanup, width: bounds.width, height: bounds.height });
            resize?.observe(element);
            mutations.observe(element, { childList: true, characterData: true, subtree: true });
            mutations.observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "style", "class"] });
            element.classList.remove(styles.pending);
            element.dataset.scrollReveal = "running";
            return;
          }
        }
        element.classList.replace(styles.pending, styles.running);
        element.dataset.scrollReveal = "running";
        if (getComputedStyle(element).animationName === "none") finish(element);
      };
      if (entry.immediate) entry.elements.forEach(finish);
      else if (entry.sequential) {
        let nextIndex = 0;
        const playNext = () => {
          if (disposed || reduced.matches || entry.state !== "running") return;
          const element = entry.elements[nextIndex++];
          if (!element) return;
          const scheduleNext = (gap: number) => {
            const timer = window.setTimeout(() => {
              childTimers.delete(timer);
              playNext();
            }, gap * 1000);
            childTimers.add(timer);
          };
          // Headings and controls overlap gently. Paragraphs retain their own
          // line wave and hand off only once their final line has settled.
          if (lineItems.has(element)) childCompletions.set(element, () => scheduleNext(element.getBoundingClientRect().bottom <= 0 ? 0 : lineTiming.paragraphGap));
          playElement(element, true);
          if (!lineItems.has(element)) scheduleNext(element.getBoundingClientRect().bottom <= 0 ? 0 : lineTiming.groupStagger);
        };
        playNext();
      } else entry.elements.forEach(element => playElement(element, false));
    };

    const advance = () => {
      if (!initialized || disposed || batching || reduced.matches) return;
      while (sections[cursor]?.state === "done") cursor += 1;
      const section = sections[cursor];
      if (!section || section.state !== "waiting" || !section.ready) return;
      // Recheck the entire section at its turn: its heading may be above the
      // viewport while the paragraph or project row is still visible.
      if (section.elements.every(element => element.getBoundingClientRect().bottom <= 0)) section.immediate = true;
      play(section);
    };

    const ready = (trigger: HTMLElement) => {
      const section = targets.get(trigger);
      if (!section) return;
      section.ready = true;
      if (!exits.has(trigger)) observer.unobserve(trigger);
      advance();
    };

    // Keyboard/fragment navigation must never land on an invisible control.
    // Complete predecessors in order before immediately displaying the target.
    const revealThrough = (section: Section) => {
      batching = true;
      for (const predecessor of sections.slice(0, sections.indexOf(section) + 1)) {
        predecessor.ready = true;
        predecessor.immediate = true;
        if (predecessor.state === "running") predecessor.elements.forEach(finish);
      }
      batching = false;
      advance();
    };

    const observer = new IntersectionObserver(entries => {
      batching = true;
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        const section = exits.get(target);
        // Container and final-content exits share the SAME observer. The former
        // catches jumps past an unseen ending; the latter ignores empty padding.
        // Offscreen work never blocks content while the visitor keeps scrolling.
        if (section && entry.boundingClientRect.bottom <= 0) {
          section.ready = true;
          section.immediate = true;
          observer.unobserve(target);
          exits.delete(target);
          if (section.state === "running") section.elements.forEach(finish);
        }
        if (entry.boundingClientRect.bottom <= 0 || entry.isIntersecting) ready(target);
      });
      batching = false;
      // An entire section can jump across the viewport between observer frames.
      // Reconcile passed predecessors on threshold events, never on every scroll.
      revealSkipped();
    }, { threshold: [0, timing.threshold], rootMargin: timing.rootMargin });

    groups.forEach(group => {
      const trigger = root.querySelector<HTMLElement>(group.trigger);
      if (!trigger) return;
      const elements = group.items.flatMap(item => {
        return [...root.querySelectorAll<HTMLElement>(item.selector)].map(element => {
          if (item.lines) lineItems.add(element);
          const opacity = getComputedStyle(element).opacity;
          element.style.setProperty("--scroll-reveal-opacity", opacity);
          element.style.setProperty("--scroll-reveal-distance", `${group.distance ?? timing.distance}px`);
          element.style.setProperty("--scroll-reveal-duration", `${group.duration ?? timing.duration}ms`);
          element.style.setProperty("--scroll-reveal-delay", `${item.delay}ms`);
          const onEnd = (event: AnimationEvent) => {
            if (event.target === element) finish(element);
          };
          element.addEventListener("animationend", onEnd);
          cleanups.push(() => {
            element.removeEventListener("animationend", onEnd);
            finish(element);
            delete element.dataset.scrollReveal;
            delete element.dataset.scrollRevealSection;
          });
          return element;
        });
      });
      if (!elements.length) return;
      const boundary = trigger.closest<HTMLElement>("section, footer") ?? trigger;
      const section: Section = { boundary, id: group.id, sequential: group.sequential === true || elements.some(element => lineItems.has(element)), trigger, elements, ready: false, immediate: false, state: "waiting" };
      sections.push(section);
      elements.forEach(element => owners.set(element, section));
      targets.set(trigger, section);
      const bounds = trigger.getBoundingClientRect();
      const initiallyVisible = bounds.top < window.innerHeight || Boolean(root.querySelector(":target")?.closest("section, footer")?.contains(trigger));
      elements.forEach(element => {
        element.classList.add(styles.pending);
        element.dataset.scrollReveal = "pending";
        element.dataset.scrollRevealSection = section.id;
      });
      // Eligibility latches independently of the queue, including restored scroll.
      if (group.followPrevious) {
        // Reading-order completion already gates this stage; the artwork sits
        // visually above the footer copy and must never trigger independently.
        section.ready = true;
        targets.delete(trigger);
      } else {
        for (const exit of new Set([boundary, elements[elements.length - 1]])) {
          exits.set(exit, section);
          observer.observe(exit);
        }
        if (initiallyVisible) ready(trigger);
        else observer.observe(trigger);
      }
    });
    initialized = true;
    advance();

    const revealTarget = () => {
      const target = root.querySelector(":target");
      const section = target && sections.find(entry => target.closest("section, footer")?.contains(entry.trigger));
      if (section) revealThrough(section);
    };
    const focus = (event: FocusEvent) => {
      const section = sections.find(entry => entry.elements.some(element => element.contains(event.target as Node)));
      if (section) revealThrough(section);
    };
    // A single scroll-end safety check covers jumps that skip an observed
    // heading completely, without continuous scroll sampling or per-item timers.
    const revealSkipped = () => {
      batching = true;
      targets.forEach((_, trigger) => {
        if (trigger.getBoundingClientRect().bottom <= 0) ready(trigger);
      });
      sections.forEach(section => {
        if (section.state !== "done" && section.elements.every(element => element.getBoundingClientRect().bottom <= 0)) {
          section.ready = true;
          section.immediate = true;
          if (section.state === "running") section.elements.forEach(finish);
        } else if (section.state === "running") {
          section.elements.forEach(element => {
            if (element.dataset.scrollReveal === "running" && element.getBoundingClientRect().bottom <= 0) finish(element);
          });
        }
      });
      batching = false;
      advance();
    };

    const reduce = () => {
      if (reduced.matches) {
        childTimers.forEach(timer => window.clearTimeout(timer));
        childCompletions.clear();
        cleanups.forEach(cleanup => cleanup());
        targets.clear();
        exits.clear();
        observer.disconnect();
      }
    };
    root.addEventListener("focusin", focus);
    window.addEventListener("hashchange", revealTarget);
    window.addEventListener("scrollend", revealSkipped);
    window.addEventListener("pageshow", revealSkipped);
    reduced.addEventListener("change", reduce);
    document.fonts.addEventListener("loadingdone", finishLines);
    revealTarget();

    return () => {
      disposed = true;
      childTimers.forEach(timer => window.clearTimeout(timer));
      childCompletions.clear();
      observer.disconnect();
      resize?.disconnect();
      mutations.disconnect();
      cleanups.forEach(cleanup => cleanup());
      root.removeEventListener("focusin", focus);
      window.removeEventListener("hashchange", revealTarget);
      window.removeEventListener("scrollend", revealSkipped);
      window.removeEventListener("pageshow", revealSkipped);
      reduced.removeEventListener("change", reduce);
      document.fonts.removeEventListener("loadingdone", finishLines);
    };
  }, [groups]);

  return null;
}
