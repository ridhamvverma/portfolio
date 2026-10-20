"use client";

import Image from "next/image";
import { useTranslations } from "@/lib/i18n/language-context";
import { useEffect, useRef, useState } from "react";

// atan2 uses screen coordinates: positive y points down.
const SECTORS = [
  "right",
  "down-right",
  "down",
  "down-left",
  "left",
  "up-left",
  "up",
  "up-right",
] as const;
const DIRECTIONS = ["center", ...SECTORS] as const;
type Direction = (typeof DIRECTIONS)[number];
const TRACKING = {
  centerExitRadius: 65,
  centerEnterRadius: 55,
  angularHysteresis: (6 * Math.PI) / 180,
} as const;
const SECTOR_ANGLE = Math.PI / 4;

export function Avatar() {
  const { t } = useTranslations();
  const avatarRef = useRef<HTMLDivElement>(null);
  const readyDirections = useRef(new Set<Direction>());
  const scheduleUpdateRef = useRef<(() => void) | null>(null);
  const displayedDirection = useRef<Direction>("center");
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState<Direction>("center");

  useEffect(() => {
    const avatar = avatarRef.current;
    if (!avatar) return;

    // A touchscreen can be the primary pointer while a connected mouse is fine.
    const finePointer = window.matchMedia("(any-pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    let tracking = false;

    const display = (next: Direction) => {
      if (next === displayedDirection.current) return;
      displayedDirection.current = next;
      setDirection(next);
    };

    const updateDirection = () => {
      frame = null;
      const pointer = pointerRef.current;
      if (!tracking || !pointer) return;

      // One measurement per requested frame also catches ancestor transforms,
      // scrolling and layout shifts that a cached ResizeObserver rect misses.
      const bounds = avatar.getBoundingClientRect();
      const dx = pointer.x - (bounds.left + bounds.width / 2);
      const dy = pointer.y - (bounds.top + bounds.height / 2);
      const current = displayedDirection.current;
      const distance = Math.hypot(dx, dy);
      if (distance <= TRACKING.centerEnterRadius) {
        if (readyDirections.current.has("center")) display("center");
        return;
      }
      if (current === "center" && distance <= TRACKING.centerExitRadius) return;

      const angle = Math.atan2(dy, dx);
      if (current !== "center") {
        const currentAngle = SECTORS.indexOf(current) * SECTOR_ANGLE;
        // atan2(sin, cos) wraps the difference across the -pi/pi seam.
        const delta = Math.atan2(Math.sin(angle - currentAngle), Math.cos(angle - currentAngle));
        if (Math.abs(delta) <= SECTOR_ANGLE / 2 + TRACKING.angularHysteresis) return;
      }
      const sector = (Math.round(angle / SECTOR_ANGLE) + 8) % 8;
      const next = SECTORS[sector];
      // Keep the existing decoded portrait until the requested layer is ready.
      // One delayed or failed image must not disable all other directions.
      if (readyDirections.current.has(next)) display(next);
    };

    const scheduleUpdate = () => {
      if (tracking && pointerRef.current && frame === null) {
        frame = window.requestAnimationFrame(updateDirection);
      }
    };

    const cancelFrame = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!tracking) return;
      // Hybrid devices can deliver touch events even with a fine primary pointer.
      if (event.pointerType === "touch") {
        pointerRef.current = null;
        cancelFrame();
        display("center");
        return;
      }
      pointerRef.current = { x: event.clientX, y: event.clientY };
      scheduleUpdate();
    };

    const syncTracking = () => {
      tracking = finePointer.matches && !reducedMotion.matches;
      cancelFrame();
      pointerRef.current = null;
      display("center");
    };

    // Recalculate for a stationary cursor when the page moves beneath it.
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(avatar);
    resizeObserver.observe(document.body);

    syncTracking();
    scheduleUpdateRef.current = scheduleUpdate;
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true, capture: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    finePointer.addEventListener("change", syncTracking);
    reducedMotion.addEventListener("change", syncTracking);

    return () => {
      scheduleUpdateRef.current = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", scheduleUpdate, true);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
      finePointer.removeEventListener("change", syncTracking);
      reducedMotion.removeEventListener("change", syncTracking);
      cancelFrame();
    };
  }, []);

  return (
    <div
      ref={avatarRef}
      role="img"
      aria-label={t("portrait")}
      className="relative size-[112px] shrink-0 overflow-hidden rounded-full"
      style={{
        maskImage: "radial-gradient(ellipse closest-side, #000 72%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse closest-side, #000 72%, transparent 100%)",
      }}
    >
      {DIRECTIONS.map((look) => (
        <Image
          key={look}
          src={`/images/look/${look}.webp`}
          alt=""
          aria-hidden="true"
          width={112}
          height={112}
          sizes="112px"
          preload
          draggable={false}
          onLoad={(event) => {
            // next/image invokes onLoad after its own decode attempt settles.
            // Unlike a mount-time Promise.all, this also handles cached loads
            // and later srcset changes without permanently locking tracking.
            if (!event.currentTarget.naturalWidth) return;
            readyDirections.current.add(look);
            scheduleUpdateRef.current?.();
          }}
          data-look={look}
          data-active={direction === look}
          className="avatar-portrait pointer-events-none absolute inset-0 size-full object-cover object-center grayscale contrast-[1.05]"
          style={{ opacity: direction === look ? 1 : 0, zIndex: direction === look ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
