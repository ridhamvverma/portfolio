import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        border: "var(--border)",
        "muted-surface": "var(--muted-surface)",
        accent: "var(--accent)",
      },
      fontFamily: { sans: ["var(--portfolio-font, var(--font-plus-jakarta))", "var(--font-script, sans-serif)"] },
      fontSize: {
        "project-title": ["var(--type-project-title)", { lineHeight: "1.3", letterSpacing: "0", fontWeight: "600" }],
        display: ["var(--type-display)", { lineHeight: "1.12", letterSpacing: "-0.035em", fontWeight: "700" }],
        "headline-md": ["var(--type-headline-md)", { lineHeight: "1.25", letterSpacing: "-0.025em", fontWeight: "700" }],
        body: ["var(--type-body)", { lineHeight: "1.65", letterSpacing: "0", fontWeight: "400" }],
        "body-sm": ["var(--type-body-sm)", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        label: ["var(--type-label)", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "500" }],
      },
      borderRadius: {
        DEFAULT: "var(--radius-8)",
        md: "var(--radius-8)",
        lg: "var(--radius-10)",
        pill: "var(--radius-pill)",
      },
      spacing: { base: "var(--space-base)" },
    },
  },
} satisfies Config;
