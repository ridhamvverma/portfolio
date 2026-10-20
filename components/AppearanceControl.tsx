"use client";

import { Sun } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { COLORS, FONTS, applySettings, loadSettings, saveSettings, type Settings } from "@/lib/appearance/config";
import { cn } from "@/lib/utils";
import { DottedSeparator } from "./DottedSeparator";
import { useTranslations } from "@/lib/i18n/language-context";

export function AppearanceControl() {
  const { t } = useTranslations();
  const [settings, setSettings] = useState<Settings>({ font: "jakarta", color: "regular" });
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();
  const colorConfig = COLORS.find(option => option.id === settings.color)!;

  useLayoutEffect(() => {
    const saved = loadSettings();
    setSettings(saved);
    applySettings(saved);
  }, []);

  function update(next: Settings) {
    setSettings(next);
    applySettings(next);
    saveSettings(next);
  }
  function close(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
  }
  function show() { setOpen(true); }
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLButtonElement>('.appearance-font[aria-pressed="true"]')?.focus({ preventScroll: true });
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    const choices = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
    const current = choices.indexOf(document.activeElement as HTMLButtonElement);
    let next: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % choices.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + choices.length) % choices.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = choices.length - 1;
    if (next !== undefined) { event.preventDefault(); choices[next]?.focus({ preventScroll: true }); }
  }

  return (
    <div ref={root} className="preference-control" onBlur={event => {
      if (open && !event.currentTarget.contains(event.relatedTarget)) close();
    }}>
      <button ref={trigger} type="button" className="header-control" aria-label={t("appearance")} aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? id : undefined}
        onClick={() => open ? close(true) : show()}
        onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); show(); } }}>
        <Sun size={17} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div ref={panel} key="appearance-panel" layoutId={`${id}-panel`} id={id} role="dialog" aria-label={t("appearance")}
            initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
            className={cn("appearance-panel w-56 rounded-xl border border-neutral-200 bg-linear-to-b p-4 shadow-sm ring-1 ring-white/20 ring-offset-2 ring-inset", colorConfig.gradientFrom, colorConfig.gradientTo, colorConfig.ringOffset)}
            onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(true); } }}>
            <div role="group" aria-label={t("font")} className="appearance-fonts mb-3" onKeyDown={navigate}>
              {FONTS.map(option => (
                <button key={option.id} type="button"
                  className={cn("appearance-font rounded-md bg-linear-to-b px-2 py-1 text-xs font-light text-white shadow-sm ring-1 shadow-black/10 ring-black/10 transition-all duration-200",
                    settings.font === option.id && [colorConfig.gradientFrom, colorConfig.gradientTo, colorConfig.ringOffset, "shadow-black/60"])}
                  aria-pressed={settings.font === option.id} style={{ fontFamily: option.variable }}
                  onClick={() => update({ ...settings, font: option.id })}>{option.label}</button>
              ))}
            </div>
            <DottedSeparator />
            <div role="group" aria-label={t("accentColor")} className="mt-4 flex gap-2" onKeyDown={navigate}>
              {COLORS.map(option => (
                <button key={option.id} type="button" className="group flex cursor-pointer flex-col items-center gap-1"
                  aria-label={option.label} title={option.label} aria-pressed={settings.color === option.id}
                  onClick={() => update({ ...settings, color: option.id })}>
                  <span aria-hidden="true" className={cn("size-4 rounded-full transition-all", option.swatch,
                    settings.color === option.id ? ["ring-2 ring-offset-2", option.activeRing] : "ring-1 ring-neutral-200 group-hover:ring-neutral-400")} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
