export type FontOption = "jakarta" | "schibsted" | "inter";
export type ColorOption = "regular" | "rose" | "emerald" | "blue" | "amber" | "violet";
export const FONTS = [
  { id: "jakarta", label: "Plus Jakarta Sans", variable: "var(--font-plus-jakarta)" },
  { id: "schibsted", label: "Schibsted", variable: "var(--font-schibsted)" },
  { id: "inter", label: "Inter", variable: "var(--font-inter)" },
] as const;

// Color values and presentation classes from Manu Arora's Settings component.
export const COLORS: {
  id: ColorOption;
  label: string;
  swatch: string;
  bg: string;
  primary: string;
  foreground: string;
  selectionAccent: string;
  writingLinkColor: string;
  writingLinkHover: string;
  gradientFrom: string;
  gradientTo: string;
  ringOffset: string;
  activeRing: string;
}[] = [
  {
    id: "regular",
    writingLinkColor: "#78716C",
    writingLinkHover: "#292524",
    selectionAccent: "#858585",
    label: "Paper",
    swatch: "bg-stone-500",
    bg: "var(--color-stone-50)",
    primary: "var(--color-stone-800)",
    foreground: "var(--color-stone-600)",
    gradientFrom: "from-stone-500",
    gradientTo: "to-neutral-800",
    ringOffset: "ring-offset-stone-600",
    activeRing: "ring-stone-600",
  },
  {
    id: "rose",
    writingLinkColor: "#BE7289",
    writingLinkHover: "#881337",
    selectionAccent: "#C026D3",
    label: "Bloom",
    swatch: "bg-fuchsia-500",
    bg: "var(--color-rose-50)",
    primary: "var(--color-rose-900)",
    foreground: "var(--color-rose-600)",
    gradientFrom: "from-rose-400",
    gradientTo: "to-fuchsia-700",
    ringOffset: "ring-offset-fuchsia-500",
    activeRing: "ring-fuchsia-500",
  },
  {
    id: "emerald",
    writingLinkColor: "#5F9C96",
    writingLinkHover: "#134E4A",
    selectionAccent: "#0D9488",
    label: "Lagoon",
    swatch: "bg-teal-500",
    bg: "var(--color-teal-50)",
    primary: "var(--color-teal-900)",
    foreground: "var(--color-teal-600)",
    gradientFrom: "from-teal-400",
    gradientTo: "to-cyan-700",
    ringOffset: "ring-offset-teal-500",
    activeRing: "ring-teal-500",
  },
  {
    id: "blue",
    writingLinkColor: "#8183B9",
    writingLinkHover: "#1E1B4B",
    selectionAccent: "#4F46E5",
    label: "Nocturne",
    swatch: "bg-indigo-500",
    bg: "var(--color-indigo-50)",
    primary: "var(--color-indigo-950)",
    foreground: "var(--color-indigo-600)",
    gradientFrom: "from-indigo-400",
    gradientTo: "to-violet-700",
    ringOffset: "ring-offset-indigo-500",
    activeRing: "ring-indigo-500",
  },
  {
    id: "amber",
    writingLinkColor: "#B58B59",
    writingLinkHover: "#451A03",
    selectionAccent: "#D97706",
    label: "Honey",
    swatch: "bg-amber-500",
    bg: "var(--color-amber-50)",
    primary: "var(--color-amber-950)",
    foreground: "var(--color-amber-700)",
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-600",
    ringOffset: "ring-offset-amber-500",
    activeRing: "ring-amber-500",
  },
  {
    id: "violet",
    writingLinkColor: "#A18AC5",
    writingLinkHover: "#2E1065",
    selectionAccent: "#9333EA",
    label: "Lilac",
    swatch: "bg-violet-500",
    bg: "var(--color-violet-50)",
    primary: "var(--color-violet-950)",
    foreground: "var(--color-violet-600)",
    gradientFrom: "from-violet-400",
    gradientTo: "to-purple-700",
    ringOffset: "ring-offset-violet-500",
    activeRing: "ring-violet-500",
  },
];

export const STORAGE_KEY = "site-settings";
export type Settings = { font: FontOption; color: ColorOption };

// Self-contained so the same validation/migration runs before paint and on mount.
function readSettings(storage: Storage, fonts: readonly { id: FontOption }[], colors: readonly { id: ColorOption }[]): Settings {
  const settings: Settings = { font: "jakarta", color: "regular" };
  const legacyColors: Record<string, ColorOption> = {
    neutral: "regular", pink: "rose", teal: "emerald", indigo: "blue", orange: "amber", purple: "violet",
  };
  try {
    let saved: Record<string, unknown> = {};
    try {
      const parsed: unknown = JSON.parse(storage.getItem("site-settings") || "null");
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) saved = parsed as Record<string, unknown>;
    } catch { /* Recover legacy preferences if the new record is malformed. */ }
    const font = saved.font ?? storage.getItem("portfolio-font");
    const color = saved.color ?? storage.getItem("portfolio-accent");
    if (fonts.some(option => option.id === font)) settings.font = font as FontOption;
    if (colors.some(option => option.id === color)) settings.color = color as ColorOption;
    else if (typeof color === "string" && Object.hasOwn(legacyColors, color)) settings.color = legacyColors[color];
    storage.setItem("site-settings", JSON.stringify(settings));
  } catch { /* Storage may be blocked; session controls still work. */ }
  return settings;
}

export function loadSettings(): Settings {
  try { return readSettings(localStorage, FONTS, COLORS); }
  catch { return { font: "jakarta", color: "regular" }; }
}
export function saveSettings(settings: Settings) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); }
  catch { /* Keep the in-memory choice when storage is blocked. */ }
}
function applyToRoot(settings: Settings, fonts: typeof FONTS, colors: typeof COLORS) {
  const root = document.documentElement;
  const font = fonts.find(option => option.id === settings.font)!;
  const color = colors.find(option => option.id === settings.color)!;
  root.style.setProperty("--primary-font", font.variable);
  root.style.setProperty("--theme-bg", color.bg);
  root.style.setProperty("--primary", color.primary);
  root.style.setProperty("--foreground", color.foreground);
  root.style.setProperty("--selection-accent", color.selectionAccent);
  root.style.setProperty("--writing-link-color", color.writingLinkColor);
  root.style.setProperty("--writing-link-hover", color.writingLinkHover);
  root.dataset.appearanceColor = settings.color;
}

export function applySettings(settings: Settings) { applyToRoot(settings, FONTS, COLORS); }

export const appearanceInitScript = `(()=>{const FONTS=${JSON.stringify(FONTS)},COLORS=${JSON.stringify(COLORS)};let settings={font:'jakarta',color:'regular'};try{settings=(${readSettings.toString()})(localStorage,FONTS,COLORS)}catch{}(${applyToRoot.toString()})(settings,FONTS,COLORS)})()`;
