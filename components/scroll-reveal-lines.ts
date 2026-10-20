import { animate } from "motion";
import styles from "./ScrollReveal.module.css";

export const lineTiming = {
  duration: 0.65,
  stagger: 0.11,
  paragraphGap: 0.13,
  groupStagger: 0.14,
  distance: 12,
  ease: [0.22, 1, 0.36, 1] as const,
};

/** Only plain text is eligible; links and controls retain their original DOM. */
export function revealLines(
  element: HTMLElement,
  options: { delay: number },
  complete: () => void,
): { cleanup: () => void; duration: number } | null {
  const text = element.firstChild;
  if (element.childNodes.length !== 1 || text?.nodeType !== Node.TEXT_NODE ||
    !text.textContent?.trim() || /[\t\r\n]| {2}/.test(text.textContent) ||
    document.fonts.status !== "loaded") return null;

  const value = text.textContent;
  const bounds = element.getBoundingClientRect();
  const computed = getComputedStyle(element);
  const lineHeight = parseFloat(computed.lineHeight);
  if (!Number.isFinite(lineHeight)) return null;
  const paddingTop = parseFloat(computed.paddingTop);
  const range = document.createRange();
  const lines: { start: number; end: number; top: number; left: number; row: number }[] = [];
  let offset = 0;
  // Read-only ranges preserve browser wrapping, including CJK text and combining
  // marks. All geometry reads finish before any layers or animation are added.
  for (const character of value) {
    range.setStart(text, offset);
    range.setEnd(text, offset + character.length);
    const rect = range.getBoundingClientRect();
    const row = Math.floor((rect.top + rect.height / 2 - bounds.top - paddingTop) / lineHeight);
    let line = lines[lines.length - 1];
    if (!line || line.row !== row) {
      line = { start: offset, end: offset, top: rect.top, left: rect.left, row };
      lines.push(line);
    }
    line.end = offset + character.length;
    offset += character.length;
  }
  range.detach();
  if (!lines.length || lines.length > 40) return null;

  const overlay = document.createElement("span");
  overlay.className = styles.lineOverlay;
  overlay.setAttribute("aria-hidden", "true");
  overlay.dataset.lineRevealOverlay = "";
  const animations: { stop: () => void }[] = [];
  const spans = lines.map((line, index) => {
    const span = document.createElement("span");
    span.className = styles.line;
    span.textContent = value.slice(line.start, line.end);
    span.dataset.revealLine = String(index);
    span.dataset.lineStart = String(line.start);
    span.style.top = `${line.top - lines[0].top + paddingTop}px`;
    span.style.left = `${line.left - bounds.left}px`;
    span.style.color = computed.color;
    overlay.append(span);
    return span;
  });
  element.classList.add(styles.lineSource);
  element.style.setProperty("--scroll-reveal-source-color", computed.color);
  element.append(overlay);
  // Align glyph baselines as well as line boxes: Japanese/Hindi fallback fonts
  // can have different ascent metrics. Batch reads, then writes (never per frame).
  const corrections = spans.map((span, index) => {
    const glyph = document.createRange();
    glyph.setStart(span.firstChild!, 0);
    glyph.setEnd(span.firstChild!, [...span.textContent!][0].length);
    const rect = glyph.getBoundingClientRect();
    glyph.detach();
    return lines[index].top - rect.top;
  });
  spans.forEach((span, index) => {
    span.style.top = `${parseFloat(span.style.top) + corrections[index]}px`;
  });
  const cleanup = () => {
    animations.forEach(animation => animation.stop());
    overlay.remove();
    element.classList.remove(styles.lineSource);
    element.style.removeProperty("--scroll-reveal-source-color");
  };
  let cancelled = false;
  let completed = 0;
  // A shared native timeline gives the lines a continuous reading-order wave.
  // All geometry is measured once above; no reads occur during playback.
  const startTimer = setTimeout(() => {
    if (cancelled) return;
    try {
      spans.forEach((span, index) => {
        animations.push(animate(span, {
          opacity: [0, 1],
          transform: [`translateY(${lineTiming.distance}px)`, "translateY(0px)"],
        }, {
          duration: lineTiming.duration,
          delay: options.delay + index * lineTiming.stagger,
          ease: [...lineTiming.ease],
          onComplete: () => {
            if (!cancelled && ++completed === spans.length) complete();
          },
        }));
      });
    } catch {
      cleanup();
      complete();
    }
  }, 0);
  return {
    cleanup: () => {
      cancelled = true;
      clearTimeout(startTimer);
      cleanup();
    },
    duration: lineTiming.duration + (spans.length - 1) * lineTiming.stagger,
  };
}
