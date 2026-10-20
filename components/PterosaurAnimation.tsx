"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { useCreative } from "@/lib/creative-context";

const DURATION = 4200;
const WIDTH = 32;
const HEIGHT = 18;
type Zone = { left: number; top: number; width: number; height: number };

// Conservative corridor: beside the portrait, before the controls (including
// their hidden tooltip), and entirely above the name. All coordinates are local.
function safeZone(hero: HTMLElement): Zone | null {
  if (window.innerWidth < 768) return null;
  const bounds = hero.getBoundingClientRect();
  const avatar = hero.querySelector('[role="img"]')?.getBoundingClientRect();
  const controls = hero.querySelector(".hero-controls")?.getBoundingClientRect();
  const tooltip = hero.querySelector(".creative-tooltip")?.getBoundingClientRect();
  const heading = hero.querySelector("h1")?.getBoundingClientRect();
  if (!avatar || !controls || !heading) return null;
  const left = avatar.right + 20;
  const right = Math.min(controls.left, tooltip?.left ?? controls.left, bounds.right) - 16;
  const top = Math.max(bounds.top, avatar.top) + 8;
  const bottom = Math.min(avatar.bottom - 12, heading.top - 20);
  if (right - left < 160 || bottom - top < 56) return null;
  return { left: left - bounds.left, top: top - bounds.top, width: right - left, height: bottom - top };
}

export function PterosaurAnimation() {
  const { creative } = useCreative();
  const spriteRef = useRef<SVGSVGElement>(null);
  // Read the latest mode only when scheduling; context renders never restart a pass.
  const nextDelay = useEffectEvent(() => creative
    ? 4000 + Math.random() * 3000
    : 7000 + Math.random() * 5000);

  useEffect(() => {
    const sprite = spriteRef.current;
    const hero = sprite?.parentElement;
    if (!sprite || !hero || typeof sprite.animate !== "function") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let animations: Animation[] = [];
    let zone: Zone | null = null;
    let disposed = false;
    let initialDelayPending = true;

    function cancel() {
      clearTimeout(timer);
      timer = undefined;
      animations.forEach(animation => animation.cancel());
      animations = [];
      zone = null;
    }

    function schedule() {
      if (disposed || timer !== undefined || animations.length || document.hidden || reduced.matches || window.innerWidth < 768) return;
      timer = setTimeout(fly, initialDelayPending ? 2000 + Math.random() * 1000 : nextDelay());
    }

    function fly() {
      timer = undefined;
      if (disposed || document.hidden || reduced.matches) return;
      initialDelayPending = false;
      const available = safeZone(hero!);
      if (!available) { schedule(); return; }
      zone = available;
      const { left, top, width, height } = available;
      const travel = width - WIDTH - 4;
      // Sample a shallow cubic Bézier, with a small initial dip and final lift.
      // Browser interpolation handles the whole pass; there are no frame callbacks.
      const frames = Array.from({ length: 43 }, (_, index) => {
        const t = index / 42;
        const eased = t * t * (3 - 2 * t);
        const y = (1 - eased) ** 3 * 0.38 + 3 * (1 - eased) ** 2 * eased * 0.8 + 3 * (1 - eased) * eased ** 2 * 0.45 + eased ** 3 * 0.12;
        return {
          offset: t,
          transform: `translate3d(${left + 2 + travel * (1 - eased)}px, ${top + 4 + y * (height - HEIGHT - 8)}px, 0) rotate(${-1 + 4 * eased}deg)`,
          opacity: Math.min(1, t * 10.5, (1 - t) * 10.5) * 0.64,
        };
      });
      const flight = sprite!.animate(frames, { duration: DURATION, easing: "linear" });
      animations = [flight];

      // Fixed head/torso in every frame. Only the pixel wings change, twice.
      const times = [0, 1800, 1900, 2050, 2200, 3400, 3500, 3650, 3800, 4200];
      const states = [0, 0, 1, 2, 0, 0, 1, 2, 0, 0];
      sprite!.querySelectorAll("[data-wing]").forEach((wing, frame) => {
        animations.push(wing.animate(times.map((time, index) => ({
          offset: time / DURATION,
          opacity: states[index] === frame ? 1 : 0,
          easing: "step-end",
        })), { duration: DURATION }));
      });
      flight.onfinish = () => { cancel(); schedule(); };
    }

    function sync() {
      if (document.hidden || reduced.matches || window.innerWidth < 768) { cancel(); return; }
      if (zone) {
        const available = safeZone(hero!);
        // A resize, font change or translation must never move content into a pass.
        if (!available || zone.left < available.left || zone.top < available.top ||
          zone.left + zone.width > available.left + available.width ||
          zone.top + zone.height > available.top + available.height) cancel();
      }
      schedule();
    }

    const resize = new ResizeObserver(sync);
    [hero, ...hero.querySelectorAll('[role="img"], .hero-controls, .hero-message, .creative-tooltip, h1')].forEach(element => resize.observe(element));
    const preferences = new MutationObserver(sync);
    preferences.observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "style", "class"] });
    document.fonts.addEventListener("loadingdone", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", sync, { passive: true });
    reduced.addEventListener("change", sync);
    schedule();
    return () => {
      disposed = true;
      cancel();
      resize.disconnect();
      preferences.disconnect();
      document.fonts.removeEventListener("loadingdone", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <svg
      ref={spriteRef}
      data-pterosaur=""
      aria-hidden="true"
      focusable="false"
      width={WIDTH}
      height={HEIGHT}
      viewBox="0 0 32 18"
      fill="currentColor"
      shapeRendering="crispEdges"
      style={{
        position: "absolute", left: 0, top: 0, opacity: 0,
        pointerEvents: "none", overflow: "hidden", imageRendering: "pixelated",
        color: "color-mix(in srgb, var(--muted) 18%, #666666)",
        transformOrigin: "16px 10px",
      }}
    >
      {/* Original left-facing silhouette: long beak, rear crest, compact torso. */}
      <g data-wing="glide">
        <path d="M12 9H10V7H8V5H6V3H8V4H11V5H13V7H16V9H21V7H24V5H28V4H31V5H29V7H26V9H23V11H18V12H14Z" />
        <path fill="var(--surface)" opacity=".24" d="M9 5H11V6H13V8H15V10H13V8H11V7H9ZM23 8H26V7H28V6H25V7H23Z" />
      </g>
      <g data-wing="up" opacity="0">
        <path d="M12 10V7H11V5H10V3H9V1H11V2H13V4H15V7H17V10H20V7H22V4H24V2H27V1H29V2H27V4H25V7H23V10H20V12H14Z" />
        <path fill="var(--surface)" opacity=".24" d="M11 3H13V5H14V8H13V6H12V4H11ZM23 5H25V4H26V3H24V4H23Z" />
      </g>
      <g data-wing="down" opacity="0">
        <path d="M13 9H16V11H18V14H20V16H18V15H16V13H14V11H12ZM19 10H22V11H24V13H27V15H29V17H26V16H24V15H22V13H20Z" />
        <path fill="var(--surface)" opacity=".24" d="M15 11H16V13H18V14H17V13H15ZM23 12H24V14H26V15H24V14H23Z" />
      </g>
      <path d="M1 8H5V6H8V5H11V6H12V8H14V9H20V10H23V11H20V13H15V14H12V13H10V11H8V10H1ZM9 5V3H11V6ZM15 13H17V15H16V16H14V15H15ZM20 12H22V14H21V15H19V14H20Z" />
      <path opacity=".4" fill="var(--surface)" d="M5 8H9V7H11V9H9V10H6ZM12 10H18V11H20V12H15V13H13V12H12Z" />
    </svg>
  );
}
