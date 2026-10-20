"use client";

import { Check } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type Item = { value: string; label: ReactNode; description?: string; separatorAfter?: boolean; lang?: string };
export function PreferenceMenu({ label, heading, trigger, items, value, onSelect }: {
  label: string; heading: string; trigger: ReactNode; items: Item[]; value: string; onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const initialIndex = useRef(0);
  const close = (restore = false) => { setOpen(false); if (restore) button.current?.focus(); };
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')[initialIndex.current]?.focus();
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div ref={root} className="preference-control" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button ref={button} type="button" className="header-control" aria-label={label} aria-haspopup="menu" aria-expanded={open} aria-controls={open ? id : undefined}
        onClick={() => { initialIndex.current = Math.max(0, items.findIndex(item => item.value === value)); setOpen(current => !current); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault(); initialIndex.current = event.key === "ArrowUp" ? items.length - 1 : 0; setOpen(true);
          }
        }}>
        {trigger}
      </button>
      {open && (
        <div ref={menu} id={id} role="menu" aria-label={heading} className="preference-menu" onKeyDown={(event) => {
          const options = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')];
          const current = options.indexOf(document.activeElement as HTMLButtonElement);
          let next: number | undefined;
          if (event.key === "ArrowDown") next = (current + 1) % options.length;
          if (event.key === "ArrowUp") next = (current - 1 + options.length) % options.length;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = options.length - 1;
          if (next !== undefined) { event.preventDefault(); options[next]?.focus(); }
          if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(true); }
          if (event.key === "Tab") close(true);
          if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && event.key !== " ") {
            const nextMatch = [...options.slice(current + 1), ...options.slice(0, current + 1)].find(option => option.textContent?.trim().toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));
            if (nextMatch) { event.preventDefault(); nextMatch.focus(); }
          }
        }}>
          <div className="preference-heading">{heading}</div>
          {items.map(item => (
            <div key={item.value} role="none">
              <button type="button" role="menuitemradio" aria-checked={value === item.value} tabIndex={-1} lang={item.lang}
                className="preference-option" onClick={() => { onSelect(item.value); close(true); }}>
                <span className="min-w-0"><span className="preference-option-label">{item.label}</span>{item.description && <span className="preference-description">{item.description}</span>}</span>
                <Check size={14} aria-hidden="true" className={value === item.value ? "shrink-0" : "invisible shrink-0"} />
              </button>
              {item.separatorAfter && <div role="separator" className="preference-separator" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
