"use client";

import { useCreative } from "@/lib/creative-context";
import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./CreativeAnnotations.module.css";

type Side = "left" | "right";
type Note = {
  id: string;
  heading: string;
  text: string;
  side: Side;
  target: string;
  point: "left-edge" | "section-edge" | "last-line";
};
type Placement = Note & {
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

const NOTES: Note[] = [
  { id: "01", heading: "A portrait with personality", text: "Even the avatar likes to follow along.", side: "left", target: '[role="img"]', point: "left-edge" },
  { id: "02", heading: "Learning in public", text: "Building things is how I figure them out.", side: "right", target: 'main > section[aria-label] p:last-child', point: "last-line" },
  { id: "03", heading: "Ideas into tools", text: "Astra helps make complex workflows easier to explore.", side: "left", target: 'section[aria-labelledby="projects-title"] li:first-child', point: "left-edge" },
  { id: "04", heading: "Notes along the way", text: "Small lessons worth sharing.", side: "right", target: "#writing-title", point: "section-edge" },
  { id: "05", heading: "Say hello", text: "Good conversations can start something new.", side: "left", target: "#contact .contact-control", point: "left-edge" },
];

const NOTE_WIDTH = 210;
const NOTE_HEIGHT = 86;
const SIDE_GUTTER_GAP = 64;
const GUIDE_OFFSET = 20;

function subscribeReducedMotion(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function reducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function lastTextLine(element: Element): DOMRect | null {
  const range = document.createRange();
  range.selectNodeContents(element);
  const lines = [...range.getClientRects()];
  return lines.at(-1) ?? element.getBoundingClientRect();
}

function arrowPath(note: Placement) {
  const span = note.toX - note.fromX;
  const rise = note.toY - note.fromY;
  // Draw in local coordinates so each doodle stays between its existing
  // gutter anchors, including when the arrow points left.
  const point = (along: number, bend: number) =>
    `${note.fromX + span * along} ${note.fromY + rise * along + bend}`;
  const loop = note.id === "02" || note.id === "05";
  const bend = note.id === "01" ? 24 : note.id === "03" ? 18 : 22;
  const curve = loop
    ? `M ${point(0, 0)} C ${point(0.12, -22)}, ${point(0.4, -22)}, ${point(0.52, -10)} C ${point(0.75, 10)}, ${point(0.24, 14)}, ${point(0.38, -8)} C ${point(0.52, -28)}, ${point(0.82, -4)}, ${point(1, 0)}`
    : `M ${point(0, 0)} C ${point(0.1, -bend)}, ${point(0.46, -bend)}, ${point(0.57, -12)} C ${point(0.68, 1)}, ${point(0.8, 5)}, ${point(1, 0)}`;
  const lastX = note.fromX + span * (loop ? 0.82 : 0.8);
  const lastY = note.fromY + rise * (loop ? 0.82 : 0.8) + (loop ? -4 : 5);
  const angle = Math.atan2(note.toY - lastY, note.toX - lastX);
  const size = 5.5;
  const wingA = [note.toX - size * Math.cos(angle - 0.68), note.toY - size * Math.sin(angle - 0.68)];
  const wingB = [note.toX - size * 0.9 * Math.cos(angle + 0.75), note.toY - size * 0.9 * Math.sin(angle + 0.75)];
  return {
    curve,
    head: `M ${wingA[0]} ${wingA[1]} L ${note.toX} ${note.toY} M ${wingB[0]} ${wingB[1]} L ${note.toX} ${note.toY}`,
  };
}

function AnnotationLayer({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [guideBounds, setGuideBounds] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const main = root?.parentElement;
    const composition = main?.closest<HTMLElement>(".page-container");
    if (!root || !main || !composition) return;
    let frame = 0;
    let lastSignature = "";
    let lastGuideSignature = "";

    const measure = () => {
      frame = 0;
      const bounds = main.getBoundingClientRect();
      const canvas = composition.getBoundingClientRect();
      const footer = composition.querySelector("footer");
      // End at visible footer content, excluding its existing page-bottom padding.
      const bottom = footer?.lastElementChild?.getBoundingClientRect().bottom ?? canvas.bottom;
      const nextGuide = {
        top: canvas.top - bounds.top - GUIDE_OFFSET,
        left: canvas.left - bounds.left - GUIDE_OFFSET,
        width: canvas.width + GUIDE_OFFSET * 2,
        height: bottom - canvas.top + GUIDE_OFFSET * 2,
      };
      const guideSignature = JSON.stringify(nextGuide);
      if (guideSignature !== lastGuideSignature) {
        lastGuideSignature = guideSignature;
        setGuideBounds(nextGuide);
      }
      const width = window.innerWidth;
      const signature = `${Math.round(bounds.width)}:${Math.round(bounds.height)}:${width}`;
      // Side notes need enough actual whitespace for both a readable note and
      // its short arrow. Below this width the guide remains, but notes are hidden.
      if (
        width < 1152 ||
        bounds.left < NOTE_WIDTH + SIDE_GUTTER_GAP + 12 ||
        width - bounds.right < NOTE_WIDTH + SIDE_GUTTER_GAP + 12
      ) {
        if (lastSignature !== `${signature}:hidden`) {
          lastSignature = `${signature}:hidden`;
          setPlacements([]);
        }
        return;
      }

      const left = -NOTE_WIDTH - SIDE_GUTTER_GAP;
      const right = bounds.width + SIDE_GUTTER_GAP;
      const next: Placement[] = [];

      for (const note of NOTES) {
        const target = main.querySelector(note.target);
        if (!target) continue;
        const rect = note.point === "last-line" ? lastTextLine(target) : target.getBoundingClientRect();
        if (!rect || rect.width === 0 || rect.height === 0) continue;
        const targetY = (note.id === "02" ? rect.bottom + 12 : note.id === "04" ? rect.top + rect.height / 2 : rect.top + rect.height / 2) - bounds.top;
        const targetX = note.side === "right"
          ? bounds.width - 8
          : rect.left - bounds.left - 8;
        const x = note.side === "left" ? left : right;
        const startY = note.id === "01" ? targetY + 22 : targetY;
        const y = startY - NOTE_HEIGHT / 2;
        next.push({
          ...note,
          x,
          y,
          fromX: note.side === "left" ? x + NOTE_WIDTH + 8 : x - 8,
          fromY: startY,
          toX: targetX,
          toY: targetY,
        });
      }

      const nextSignature = JSON.stringify(next);
      if (nextSignature !== lastSignature) {
        lastSignature = nextSignature;
        setPlacements(next);
      }
    };

    const scheduleMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    const resize = new ResizeObserver(scheduleMeasure);
    resize.observe(main);
    resize.observe(composition);
    composition.querySelectorAll("header, footer, footer > *").forEach(element => resize.observe(element));
    main.querySelectorAll('section, [role="img"], #writing-title, #contact .contact-control').forEach(element => resize.observe(element));
    const contentChanges = new MutationObserver(scheduleMeasure);
    contentChanges.observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "style", "class"] });
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    // Transforms do not trigger ResizeObserver. Refresh only geometry as the
    // entrance settles, including when Creative Mode was already saved ON.
    composition.addEventListener("animationend", scheduleMeasure);
    document.fonts.addEventListener("loadingdone", scheduleMeasure);
    measure();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resize.disconnect();
      contentChanges.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      composition.removeEventListener("animationend", scheduleMeasure);
      document.fonts.removeEventListener("loadingdone", scheduleMeasure);
    };
  }, []);

  const duration = reducedMotion ? 0 : 0.28;

  return (
    <motion.div
      key={reducedMotion ? "static" : "animated"}
      ref={rootRef}
      aria-hidden="true"
      data-creative-layer=""
      className={styles.layer}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.18, ease: "easeOut" }}
    >
      {guideBounds && (
        <motion.div
          aria-hidden="true"
          data-creative-guide=""
          className={styles.guide}
          style={guideBounds}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18, ease: "easeOut" }}
        />
      )}
      {placements.length > 0 && (
        <svg className={styles.arrows} aria-hidden="true" width="100%" height="100%">
          {placements.map((placement, index) => {
            const path = arrowPath(placement);
            return (
              <g key={placement.id} className={styles.arrow}>
                <motion.path
                  d={path.curve}
                  data-creative-arrow=""
                  style={{ opacity: 0.8 }}
                  initial={reducedMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.15, delay: 0 } }}
                  transition={{ duration: reducedMotion ? 0 : 0.62, delay: reducedMotion ? 0 : 0.22 + index * 0.08, ease: "easeOut" }}
                />
                <motion.path
                  d={path.head}
                  data-creative-arrow=""
                  style={{ opacity: 0.8 }}
                  initial={reducedMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.15, delay: 0 } }}
                  transition={{ duration: reducedMotion ? 0 : 0.1, delay: reducedMotion ? 0 : 0.8 + index * 0.08, ease: "easeOut" }}
                />
              </g>
            );
          })}
        </svg>
      )}
      {placements.map((placement, index) => (
        <motion.div
          key={placement.id}
          className={styles.note}
          data-creative-note={placement.id}
          style={{ left: placement.x, top: placement.y, width: NOTE_WIDTH }}
          initial={reducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -2, transition: { duration: reducedMotion ? 0 : 0.16, delay: 0 } }}
          transition={{ duration, delay: reducedMotion ? 0 : 0.1 + index * 0.07, ease: "easeOut" }}
        >
          <span className={styles.heading}>{placement.id} / {placement.heading}</span>
          <span className={styles.text}>{placement.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function CreativeAnnotations() {
  const { creative } = useCreative();
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, reducedMotionSnapshot, () => true);

  return (
    <AnimatePresence>
      {creative && <AnnotationLayer key="creative-annotations" reducedMotion={Boolean(reducedMotion)} />}
    </AnimatePresence>
  );
}
