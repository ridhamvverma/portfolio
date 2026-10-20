"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { useId, useState } from "react";
import { SelectionFrame } from "@/components/SelectionFrame";
import { useCreative } from "@/lib/creative-context";

export function CreativeToggle() {
  const { t } = useLanguage();
  const { creative, setCreative } = useCreative();
  const tooltipId = useId();
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <button
      type="button"
      role="switch"
      aria-label={t("creative")}
      aria-describedby={tooltipId}
      aria-checked={creative}
      data-tooltip-dismissed={tooltipDismissed}
      onClick={() => setCreative((current) => !current)}
      onPointerEnter={() => setTooltipDismissed(false)}
      onFocus={() => setTooltipDismissed(false)}
      onBlur={() => setTooltipDismissed(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setTooltipDismissed(true);
      }}
      className="creative-switch selection-target"
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-8)",
        background: "var(--surface)",
      }}
    >
      <SelectionFrame />
      <span aria-hidden="true" className="creative-switch-track">
        <span className="creative-switch-thumb" />
      </span>
      <span id={tooltipId} role="tooltip" className="creative-tooltip">
        {t("creative")}
      </span>
    </button>
  );
}
